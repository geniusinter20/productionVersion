const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const timeout = require('connect-timeout');
const haltOnTimedout = require('./haltOnTimedout');
const savePost = require('./savePost')
const PracticalTest = require('../DB/models/PracticalTest');

const url = process.env.MONGO_URI;

const practiceTestsRouter = express.Router();

//Middleware
practiceTestsRouter.use(bodyParser.json());

//Routing 
//GET Method all practiceTests
practiceTestsRouter.route('/').get(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
    PracticalTest.find({}, function (err, docs) {
      if (err) throw err;
      res.json(docs);
    });
  })
});
//GET a specific practiceTest
practiceTestsRouter.route('/:id').get(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
    PracticalTest.find({ _id: req.params.id }, function (err, docs) {
      if (docs.length === 0) res.json({ msg: "not found" })
      else res.json(docs);
      //console.log(err)
    });
  })
});
//POST Method for Add a new practiceTest
practiceTestsRouter.route('/add').post(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
    const practiceTest = new PracticalTest({
      testImageID: req.body.testImageID,
      testTitle: req.body.testTitle,
      testType: req.body.testType,
      testCategory: req.body.testCategory,
      testPrice: req.body.testPrice,
      testRate: req.body.testRate,
      testValidationPeriod: req.body.testValidationPeriod,
      testDescription: req.body.testDescription,
      testExamsIDs: req.body.testExamsIDs,
      testBrief: req.body.testBrief,
      testInstructorID: req.body.testInstructorID,
      whatStudentWillPractice: req.body.whatStudentWillPractice,
      testNo: req.body.testNo,
      testCreatedDate: req.body.testCreatedDate
    });

    // save model to database
    practiceTest.key = practiceTest._id;
    practiceTest.save(function (err, result) {
      if (err) return console.error(err);
      console.log(result);
      res.json({ msg: "test created", id: practiceTest._id });
    });
  })
});
//GET Method for Update a specifice practiceTest
practiceTestsRouter.route('/update/:id').get(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
    PracticalTest.find({ _id: req.params.id }, function (err, docs) {
      if (err) throw err;
      res.json({ msg: "test updated" });
    });
  })
});
//POST Method for Update a specifice practiceTest and Restor it
practiceTestsRouter.route('/update/:id').post(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
      testImageID: req.body.testImageID,
      testTitle: req.body.testTitle,
      testType: req.body.testType,
      testCategory: req.body.testCategory,
      testPrice: req.body.testPrice,
      testRate: req.body.testRate,
      testValidationPeriod: req.body.testValidationPeriod,
      testDescription: req.body.testDescription,
      testExamsIDs: req.body.testExamsIDs,
      testBrief: req.body.testBrief,
      testInstructorID: req.body.testInstructorID,
      whatStudentWillPractice: req.body.whatStudentWillPractice,
      testNo: req.body.testNo
    };
    // Finde By ID and Update it
    PracticalTest.findByIdAndUpdate(condition, update, () => {
      res.json({ msg: "test updated" });
    });
  })
});
//DELETE Method for delete a specifice practiceTest
practiceTestsRouter.route('/delete/:id').delete(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
  savePost(req.body, (err, id) => {
    if (err) {
      //console.log('I in if err')
      return next(err)
    }
    if (req.timedout) {
      console.log('I in if req.timedout')
      //res.json({ "msg": 408 })
      process.exit(0);
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    mongoose.connect(url);
    const condition = { _id: req.params.id };
    PracticalTest.deleteOne(condition, (err, docs) => {
      if (err) throw err;
      console.log("Deleted : ", docs);
      res.json({ msg: "test deleted" });
    });
  })
});


module.exports = practiceTestsRouter;