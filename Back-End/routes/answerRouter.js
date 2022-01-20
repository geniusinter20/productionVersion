const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Answer = require('../DB/models/Answer');

const url = 'mongodb://localhost:27017/newDB';

const answerRouter = express.Router();

//Middleware
answerRouter.use(bodyParser.json());


//Routing 
//GET Method all Questions
answerRouter.route('/').get((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  mongoose.connect(url);
  Answer.find({}, function (err, docs) {
    if(err) throw err;
    res.json(docs);
  });
});
//GET Method a specific Question
answerRouter.route('/:id').get((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  mongoose.connect(url);
  Answer.find({ _id: req.params.id }, function (err, docs) {
    if(err) throw err;
    res.json(docs);
  });
});
//POST Method for Add a new Question
answerRouter.route('/add').post((req, res) => {
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
    if(err) throw err;
    console.log(result);
    res.redirect('/answers');
  });

});
//POST Method for Update a specifice Exam and Restor it
answerRouter.route('/update/:id').post((req, res) => {
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
});
//DELETE Method for delete a specifice practiceTest
answerRouter.route('/delete/:id').delete((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  mongoose.connect(url);
  const condition = { _id: req.params.id };
  Answer.deleteOne(condition, (err, docs) => {
    if (err) throw err;

    console.log("Deleted : ", docs);
    res.redirect('/answers');
  });
});


module.exports = answerRouter;