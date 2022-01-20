const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const ActivityExamState = require('../DB/models/ActivityExamState');

const url = 'mongodb://localhost:27017/newDB';

const activityExamRouter = express.Router();

//Middleware
activityExamRouter.use(bodyParser.json());


//Routing 
//GET Method all Activities
activityExamRouter.route('/').get((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    ActivityExamState.find({}, function (err, docs) {
        if (err) throw err;
        res.json(docs);
    });
});
//GET Method a specific Activity for an client
// activityExamRouter.route('/client/:id').get((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     mongoose.connect(url);
//     ActivityExamState.find({ clientID: req.params.id }, function (err, docs) {
//         if (err) throw err;
//         res.json(docs);
//     });
// });
//GET Method a specific ActivityExamState for an exam
activityExamRouter.route('/exam/:examID/:testID').get((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    mongoose.connect(url);
    console.log(req.params.testID)
    ActivityExamState.find({ examID: req.params.examID, testID: req.params.testID }, function (err, docs) {
        if (err) throw err;
        res.json(docs);
    });
});
//GET Method a specific ActivityExamState for an actvity
// activityExamRouter.route('/activity/:id').get((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     mongoose.connect(url);
//     ActivityExamState.find({ activityID: req.params.id }, function (err, docs) {
//         if (err) throw err;
//         res.json(docs);
//     });
// });
//POST Method for Add a new ActivityExamState
activityExamRouter.route('/add').post((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    mongoose.connect(url);
    const activityExamState = new ActivityExamState({
        activityID: req.body.activityID,
        testID: req.body.testID,
        clientID: req.body.clientID,
        examID: req.body.examID,
        finished: req.body.finished,
        started: req.body.started,
        finishedQuestionsIDsWithAnswers: req.body.finishedQuestionsIDsWithAnswers,
        timeSpent: req.body.timeSpent,
    });
    //let ID = activityExamState._id;
    // save model to database
    activityExamState.save( (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json(activityExamState._id);
    });

});
//POST Method for Update a specifice activityExamstate and Restor it
activityExamRouter.route('/update/:examID/:testID').post((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    mongoose.connect(url);
    const condition = { examID: req.params.examID, testID: req.params.testID };
    const update = {
        finished: req.body.finished,
        started: req.body.started,
        finishedQuestionsIDsWithAnswers: req.body.finishedQuestionsIDsWithAnswers,
        timeSpent: req.body.timeSpent
    };
    // Finde By ID and Update it
    ActivityExamState.updateOne(condition, update, () => {
        console.log(update)
        res.json('OK');
    });
});
//DELETE Method for delete a specifice activityExamState
// activityExamRouter.route('/delete/:id').delete((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     mongoose.connect(url);
//     const condition = { activityID: req.params.id };
//     ActivityExamState.deleteOne(condition, (err, docs) => {
//         if (err) throw err;
//         console.log("Deleted : ", docs);
//         res.redirect('/answers');
//     });
// });


module.exports = activityExamRouter;