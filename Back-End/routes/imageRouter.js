const express = require('express');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const { ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const timeout = require('connect-timeout');
const haltOnTimedout = require('./haltOnTimedout');
const savePost = require('./savePost')
const imageRouter = express.Router();
// Mongo URI
const mongoURI = process.env.MONGO_URI;

// Create mongo connection
const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

// @route GET /
// @desc Loads form
// imageRouter.route('/').get((req, res) => {

//     gfs.files.find().toArray((err, files) => {
//       // Check if files
//       if (!files || files.length === 0) {
//         res.render('index', { files: false });
//       } else {
//         files.map(file => {
//           if (

//             file.contentType === 'image/jpeg' ||
//             file.contentType === 'image/png'
//           ) {
//             file.isImage = true;
//           } else {
//             file.isImage = false;
//           }
//         });
//         res.render('index', { files: files });
//       }
//     });

// });

// @route POST /upload
// @desc  Uploads file to DB
imageRouter.route('/upload').post(upload.single('file'), timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
  savePost(req.body, (err, id) => {
    if (err) {
      console.log('I in if err')
      return next(err)
    }
    if (req.timedout) {
      console.log('I in if req.timedout')
      res.json({ "msg": 408 })
      process.exit(0);
    }
    //console.log(req.file)
    res.json(req.file);
  })
});

// @route GET /files
// @desc  Display all files in JSON
/*imageRouter.route('/files').get((req, res) =>{
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }

    // Files exist
    return res.json(files);
  });
});
*/
// @route GET /files/:filename
// @desc  Display single file object
/*imageRouter.route('/files/:id').get((req, res) =>{
 // console.log(gfs.files);
  
  gfs.files.findOne({ _id: ObjectId(req.params.id) }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // File exists
    console.log(file)
    return res.json(file);
  });
});*/

// @route GET /image/:filename
// @desc Display Image
imageRouter.route('/:id').get(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
  savePost(req.body, (err, id) => {
    if (err) {
      //console.log('I in if err')
      return next(err)
    }
    if (req.timedout) {
      //console.log('I in if req.timedout')
      res.json({ "msg": 408 })
      process.exit(0);
    }
    console.log("imid", req.params.id);
    if(req.params.id && req.params.id!=="no image") {
      gfs.files.findOne({ _id: ObjectId(req.params.id) }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
          return res.status(404).json({
            err: 'No file exists'
          });
        }
        // Check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
          // Read output to browser
          const readstream = gfs.createReadStream(file.filename);
          readstream.pipe(res);
        } else {
          res.status(404).json({
            err: 'Not an image'
          });
        }
      });
    }
    else{
      return res.status(404).json({
        err: 'No file exists'
      });
    }
  })
});

// @route DELETE /files/:id
// @desc  Delete file
imageRouter.route('/delete/:id').post(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
  savePost(req.body, (err, id) => {
    if (err) {
      console.log('I in if err')
      return next(err)
    }
    if (req.timedout) {
      console.log('I in if req.timedout')
      res.json({ "msg": 408 })
      process.exit(0);
    }
    // console.log(gfs)
    gfs.remove({ _id: ObjectId(req.params.id), root: 'uploads' }, (err, gridStore) => {
      if (err) return next(err)
      res.json('OK')
    })
  })

});


module.exports = imageRouter