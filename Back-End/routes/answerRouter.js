const express = require('express');
const mongoose = require('mongoose');
const timeout = require('connect-timeout');
const bodyParser = require('body-parser');
const haltOnTimedout = require('./haltOnTimedout');
const savePost = require('./savePost')
const Answer = require('../DB/models/Answer');

const url = 'mongodb://localhost:27017/newDB';

const answerRouter = express.Router();

//Middleware
answerRouter.use(bodyParser.json());


//Routing 
//GET Method all Questions
answerRouter.route('/').get(timeout('1s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
    Answer.find({}, function (err, docs) {
      if (err) throw err;
      res.json(docs);
    });
  })
});
//GET Method a specific Question
answerRouter.route('/:id').get(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
    Answer.find({ _id: req.params.id }, function (err, docs) {
      if (err) throw err;
      res.json(docs);
    });
  })
});
//POST Method for Add a new Question
answerRouter.route('/add').post(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
    const answer = new Answer({
      answer: req.body.answer,
      questionID: req.body.questionID,
      answerExplaination: req.body.answerExplaination
    });

    // save model to database
    answer.save(function (err, result) {
      if (err) throw err;
      console.log(result);
      res.redirect('/answers');
    });
  })
});
//POST Method for Update a specifice Exam and Restor it
answerRouter.route('/update/:id').post(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
    const condition = { _id: req.params.id };
    const update = {
      answer: req.body.answer,
      questionID: req.body.questionID,
      answerExplaination: req.body.answerExplaination
    };
    // Finde By ID and Update it
    Answer.findByIdAndUpdate(condition, update, () => {
      res.redirect('/answers');
    });
  })
});
//DELETE Method for delete a specifice practiceTest
answerRouter.route('/delete/:id').delete(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
    const condition = { _id: req.params.id };
    Answer.deleteOne(condition, (err, docs) => {
      if (err) throw err;

      console.log("Deleted : ", docs);
      res.redirect('/answers');
    });
  })
});


module.exports = answerRouter;