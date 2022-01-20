const express = require('express');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const {ObjectId} = require('mongodb');



const imageRouter = express.Router();



// Mongo URI
const mongoURI = 'mongodb://localhost:27017/newDB';

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
imageRouter.route('/').get((req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      res.render('index', { files: false });
    } else {
      files.map(file => {
        if (
          file.contentType === 'image/jpeg' ||
          file.contentType === 'image/png'
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
      });
      res.render('index', { files: files });
    }
  });
});

// @route POST /upload
// @desc  Uploads file to DB
imageRouter.route('/upload').post(upload.single('file'), (req, res) => {
  console.log(req.file)
   res.json( req.file );
  
});

// @route GET /files
// @desc  Display all files in JSON
/*imageRouter.route('/files').get((req, res) => {
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
/*imageRouter.route('/files/:id').get((req, res) => {
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
imageRouter.route('/:id').get((req, res) => {
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
});

// @route DELETE /files/:id
// @desc  Delete file
imageRouter.route('/delete/:id').post((req, res) => {
 // console.log(gfs)
 
  gfs.remove({_id: req.params.id, root: 'uploads'}, (err, gridStore) => {
    if(err)throw err;
    res.json('OK')
  })
});


module.exports = imageRouter