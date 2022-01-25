const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const timeout = require('connect-timeout');
const haltOnTimedout = require('./haltOnTimedout');
const savePost = require('./savePost')
const Exam = require('../DB/models/Exam');

const url = 'mongodb://localhost:27017/newDB';

const examRouter = express.Router();

//Middleware
examRouter.use(bodyParser.json());


//Routing 
//GET Method all exams
examRouter.route('/').get(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    mongoose.connect(url);
    Exam.find({}, function (err, docs) {
      if (err) {throw err;}
      res.json(docs);
    });
  })
  
});
//GET Method a specific Exam
examRouter.route('/:id').get(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    mongoose.connect(url);
    Exam.find({ _id: req.params.id }, (err, docs) => {
      console.log("docs", req.params.id)
      if (err) throw err;
      res.json(docs);
    });
  })
});
//POST Method for Add a new Exam
examRouter.route('/add').post(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    mongoose.connect(url);
    const exam = new Exam({
      examName: req.body.examName,
      examImageID: req.body.examImageID,
      examPeriod: req.body.examPeriod,
      examPasinRate: req.body.examPasinRate,
      examDescription: req.body.examDescription,
      examQuestionsIDs: [...req.body.examQuestionsIDs],
      examBrief: req.body.examBrief,
      examStatus: req.body.examStatus,
      examQuestionNo: req.body.examQuestionNo,
      examCategory: req.body.examCategory,
      examCreatedDate: req.body.examCreatedDate,
      key: ''
    });
    //console.log("req", req.body)
    exam.key = exam._id;
    // save model to database
    exam.save(function (err, result) {
      if (err) return console.error(err);
      res.json({msg: "exam created", id: exam._id});
    });
  })
});
//POST Method for Update a specifice Exam and Restor it
examRouter.route('/update/:id').post(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
  savePost(req.body, (err, id) => {
    if (err) {
      //console.log('I in if err')
      return next(err)
    }
    if (req.timedout) {
      //console.log('I in if req.timedout')
      res.json({ msg: 408 })
      process.exit(0);
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    mongoose.connect(url);
    const condition = { _id: req.params.id };
    const update = {
      "examName": req.body.examName,
      "examPeriod": req.body.examPeriod,
      "examPasinRate": req.body.examPasinRate,
      "examDescription": req.body.examDescription,
      "examQuestionsIDs": req.body.examQuestionsIDs,
      "examBrief": req.body.examBrief,
      "examQuestionNo": req.body.examQuestionNo,
      "examCategory": req.body.examCategory,
      "examImageID": req.body.examImageID,
    }
    // Finde By ID and Update it
    Exam.findByIdAndUpdate(condition, update, () => {
      //console.log("res", res.body)
      res.json({msg: "exam updated"})
    });
  })
});
//DELETE Method for delete a specifice practiceTest
examRouter.route('/delete/:id').delete(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
  savePost(req.body, (err, id) => {
    if (err) {
      //console.log('I in if err')
      return next(err)
    }
    if (req.timedout) {
      //console.log('I in if req.timedout')
      res.json({ msg: 408 })
      process.exit(0);
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    mongoose.connect(url);
    const condition = { _id: req.params.id };
    const PracticalTest = require('../DB/models/PracticalTest');
    PracticalTest.find({}, (err, docs) => {
      docs.forEach(doc => {
        if (doc.testExamsIDs.includes(req.params.id)) {
          tmp = [];
          doc.testExamsIDs.forEach((d) => {
            if (d != req.params.id)
              tmp.push(d);
          });
          PracticalTest.update(
            { _id: doc._id },
            {
              $set: {
                testExamsIDs: tmp // updating record via MongoDB operators         
              }
            },
            { upsert: true },
            (err, updating) => {
              if (err) console.log(err);
              else console.log(updating);
            }
          )
        }

      });
    })
    Exam.find({ _id: req.params.id }, (err1, docs1) => {
      if (err1) throw err1;
      const Question = require('../DB/models/Question');
      console.log('docs1')
      console.log(docs1);
      docs1.forEach((doc) => {
        doc.examQuestionsIDs.forEach((id) => {
          Question.deleteOne({ _id: id }, (err, deleted) => {
            if (err) throw err;
            console.log("Deleted : ", deleted);
          })
        })
      })
    })
    Exam.deleteOne(condition, (err, docs) => {
      if (err) throw err;

      console.log("Deleted : ", req.params.id);
      res.json(req.params.id)
    });
  })
});


module.exports = examRouter;