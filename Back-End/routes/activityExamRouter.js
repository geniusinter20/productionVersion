const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const timeout = require('connect-timeout');
const haltOnTimedout = require('./haltOnTimedout');
const savePost = require('./savePost')
const ActivityExamState = require('../DB/models/ActivityExamState');
const url = process.env.MONGO_URI;

const activityExamRouter = express.Router();

//Middleware
activityExamRouter.use(bodyParser.json());


//Routing 
//GET Method all Activities
activityExamRouter.route('/').get(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
        if (req.timedout) {
            console.log('I in if req.timedout')
            res.json({ "msg": 408 })
            process.exit(0);
        }
        ActivityExamState.find({}, function (err, docs) {
            if (err) throw err;
            res.json(docs);
        });
    })
});
//GET Method a specific ActivityExamState for an actvity
activityExamRouter.route('/exam/:examID/:testID/:clientID').get(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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

        ActivityExamState.find({ examID: req.params.examID, testID: req.params.testID, clientID: req.params.clientID }, (err, docs) => {
            if (err) throw err;
            res.json(docs);
        });
    })
});
//POST Method for Add a new ActivityExamState
activityExamRouter.route('/add').post(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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

        const activityExamState = new ActivityExamState({
            activityID: req.body.activityID,
            testID: req.body.testID,
            clientID: req.body.clientID,
            examID: req.body.examID,
            finished: req.body.finished,
            started: req.body.started,
            finishedQuestionsIDsWithAnswers: req.body.finishedQuestionsIDsWithAnswers,
            timeSpent: req.body.timeSpent
        });
        //let ID = activityExamState._id;
        // save model to database
        activityExamState.save((err, result) => {
            if (err) throw err;
            console.log(result);
            res.json(activityExamState._id);
        });
    })
});
//POST Method for Update a specifice activityExamstate and Restor it
activityExamRouter.route('/update/:examID/:testID/:clientID').post(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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

        const condition = { examID: req.params.examID, testID: req.params.testID, clientID: req.params.clientID };
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
    })
});
//DELETE Method for delete a specifice activityExamState
activityExamRouter.route('/delete/:id').delete(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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

        const condition = { activityID: req.params.id };
        ActivityExamState.deleteOne(condition, (err, docs) => {
            if (err) throw err;
            console.log("Deleted : ", docs);
            res.redirect('/answers');
        });
    })
});


module.exports = activityExamRouter;