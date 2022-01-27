const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const timeout = require('connect-timeout');
const haltOnTimedout = require('./haltOnTimedout');
const savePost = require('./savePost')
const Question = require('../DB/models/Question');

const url = process.env.MONGO_URI;

const questionRouter = express.Router();

//Middleware
questionRouter.use(bodyParser.json());


//Routing 
//GET Method all Questions
questionRouter.route('/').get(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
    Question.find({}, function (err, docs) {
      res.json(docs);
    });
  })
});
//GET Method a specific Question
questionRouter.route('/:id').get(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
    Question.find({ _id: req.params.id }, function (err, docs) {
      res.json(docs);
    });
  })
});
//POST Method for Add a new Question
questionRouter.route('/add').post(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
    const question = new Question({
      qesText: req.body.qesText,
      qesType: req.body.qesType,
      options: req.body.options,
      qesAns: req.body.qesAns,
      ansExp: req.body.ansExp,
      key: '',
      //order: req.body.order
    });
    question.key = question._id;
    // save model to database
    question.save(function (err, result) {
      if (err) return console.error(err);
      console.log("response: ", result._id.toString());
      const res1 = result._id.toString()
      res.json(res1);
    });
  })
});
//POST Method for Update a specifice Exam and Restor it
questionRouter.route('/update/:id').post(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
    const condition = { _id: req.params.id };
    const update = {
      qesText: req.body.qesText,
      qesType: req.body.qesType,
      options: req.body.options,
      qesAns: req.body.qesAns,
      ansExp: req.body.ansExp,
      // order: req.body.order
    };
    // Finde By ID and Update it
    Question.findByIdAndUpdate(condition, update, () => {
      console.log("update", req.params)
      res.redirect('/question');
    });
  })
});
//DELETE Method for delete a specifice practiceTest
questionRouter.route('/delete/:id').delete(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
    Question.deleteOne(condition, (err, docs) => {
      if (err) throw err;

      console.log("Deleted : ", docs);
      res.redirect('/question');
    });
  })
});


module.exports = questionRouter;