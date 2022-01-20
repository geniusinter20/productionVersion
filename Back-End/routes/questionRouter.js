const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Question = require('../DB/models/Question');

const url = 'mongodb://localhost:27017/newDB';

const questionRouter = express.Router();

//Middleware
questionRouter.use(bodyParser.json());


//Routing 
//GET Method all Questions
questionRouter.route('/').get((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  mongoose.connect(url);
  Question.find({}, function (err, docs) {
    res.json(docs);
  });
});
//GET Method a specific Question
questionRouter.route('/:id').get((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  mongoose.connect(url);
  Question.find({ _id: req.params.id }, function (err, docs) {
    res.json(docs);
  });
});
//POST Method for Add a new Question
questionRouter.route('/add').post((req, res) => {
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
  question.key= question._id;
  // save model to database
  question.save(function (err, result) {
    if (err) return console.error(err);
    console.log("response: ",result._id.toString());
    const res1= result._id.toString()
    res.json(res1);
  });

});
//POST Method for Update a specifice Exam and Restor it
questionRouter.route('/update/:id').post((req, res) => {
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
    console.log("update",req.params)
    res.redirect('/question');
  });
});
//DELETE Method for delete a specifice practiceTest
questionRouter.route('/delete/:id').delete((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  mongoose.connect(url);
  const condition = { _id: req.params.id };
  Question.deleteOne(condition, (err, docs) => {
    if (err) throw err;

    console.log("Deleted : ", docs);
    res.redirect('/question');
  });
});


module.exports = questionRouter;