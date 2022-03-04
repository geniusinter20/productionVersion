const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const timeout = require('connect-timeout');
const haltOnTimedout = require('./haltOnTimedout');
const savePost = require('./savePost')
const Exam = require('../DB/models/Exam');
const PracticalTest = require('../DB/models/PracticalTest');
const Client = require('../DB/models/Client');
const url = process.env.MONGO_URI;

const HomeRouter = express.Router();

//Middleware
HomeRouter.use(bodyParser.json());

//Routing 
//GET Method all statistics
HomeRouter.route('/statistics').get(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
        let clientsnum = 0, practicesnum = 0, examsnum = 0;
        Exam.find({}, function (err, exams) {
            if (err) throw err;
            PracticalTest.find({}, function (err, practicaltests) {
                if (err) throw err;
                Client.find({}, function (err, clients) {
                    if (err) throw err;
                    res.json({
                        clientsCount: clients.length,
                        testsCount: practicaltests.length,
                        examsCount: exams.length
                    })
                });
            });
        });
    })
});

module.exports = HomeRouter;