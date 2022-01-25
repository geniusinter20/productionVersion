const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const timeout = require('connect-timeout');
const haltOnTimedout = require('./haltOnTimedout');
const savePost = require('./savePost')
const fileRouter = express.Router();



// Mongo URI
const url = 'mongodb://localhost:27017/gridfs';

// Create mongo connection
const conn = mongoose.createConnection(url);

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage.GridFsStorage({
  url,
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

fileRouter.route('/').get(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
  })
});

// @route POST /upload
// @desc  Uploads file to DB
fileRouter.route('/upload').post(upload.single('file'), timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
    res.json(req.file);
    console.log(req.file.id.toString())
  })
});

// @route GET /files
// @desc  Display all files in JSON
/*app.get('/files', timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
  })
});*/

// @route GET /files/:filename
// @desc  Display single file object
fileRouter.route('/files/:id').get(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
    gfs.files.findOne({ _id: req.params.id }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
      // File exists
      return res.json(file);
    });
  })
});


// @route GET /image/:filename
// @desc Display Image
fileRouter.route('/image/:id').get(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
    gfs.files.findOne({ _id: req.params.id }, (err, file) => {
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
  })
});
//update image for Client
fileRouter.route('/updateimage/:id').post(upload.single('file'), timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
    const Client = require('../DB/models/Client');
    Client.findOne({ _id: req.params.id }, (err, doc) => {
      gfs.remove({ _id: doc.image, root: 'uploads' }, (err, gridStore) => {
        if (err) {
          return res.status(404).json({ err: err });
        }
        Client.update(
          { _id: req.params.id },
          {
            $set: {
              image: req.file.id.toString()
            }
          },
          { upsert: true },
          (err, updating) => {
            if (err) console.log(err);
            else console.log(updating);
          }
        );

      });
    })
  })
})
// @route DELETE /files/:id
// @desc  Delete file
fileRouter.route('/deletefile/:id').post(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
    gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
      if (err) {
        return res.status(404).json({ err: err });
      }

      res.json('OK');
    });
  })
});
module.exports = fileRouter