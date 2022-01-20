const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PracticalTest = require('../DB/models/PracticalTest');

const url = 'mongodb://localhost:27017/newDB';

const practiceTestsRouter = express.Router();

//Middleware
practiceTestsRouter.use(bodyParser.json());

//Routing 
//GET Method all practiceTests
practiceTestsRouter.route('/').get((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true });
    PracticalTest.find({}, function (err, docs) {
        if (err) throw err;
        res.json(docs);
    });
});
//GET a specific practiceTest
practiceTestsRouter.route('/:id').get((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    mongoose.connect(url);
    PracticalTest.find({ _id: req.params.id }, function (err, docs) {
        res.json(docs);
    });
});
//POST Method for Add a new practiceTest
practiceTestsRouter.route('/add').post((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    mongoose.connect(url);
    const practiceTest = new PracticalTest({
        testImage: req.body.testImage,
        testTitle: req.body.testTitle,
        testType: req.body.testType,
        testCategory: req.body.testCategory,
        testPrice: req.body.testPrice,
        testRate: req.body.testRate,
        testImageID: req.body.testImageID,
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
    practiceTest.key= practiceTest._id;
    practiceTest.save(function (err, result) {
        if (err) return console.error(err);
        console.log(result);
        res.redirect('/practicetests');
    });

});
//GET Method for Update a specifice practiceTest
practiceTestsRouter.route('/update/:id').get((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    mongoose.connect(url);
    PracticalTest.find({ _id: req.params.id }, function (err, docs) {
        if (err) throw err;
        res.json(docs);
    });
});
//POST Method for Update a specifice practiceTest and Restor it
practiceTestsRouter.route('/update/:id').post((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    mongoose.connect(url);
    const condition = { _id: req.params.id };
    const update = {
        testImage: req.body.testImage,
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
        testImageID: req.body.testImageID
    };
    // Finde By ID and Update it
    PracticalTest.findByIdAndUpdate(condition, update, () => {
        res.redirect('/practicetests');
    });
});
//DELETE Method for delete a specifice practiceTest
practiceTestsRouter.route('/delete/:id').delete((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    mongoose.connect(url);
    const condition = { _id: req.params.id };
    PracticalTest.deleteOne(condition, (err, docs) => {
        if (err) throw err;

        console.log("Deleted : ", docs);
        res.redirect('/practicetests');
    });
});


module.exports = practiceTestsRouter;