const mongoose = require('mongoose');
const  {str} = require('./datatypes');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    answer: str,
    questionAswer: [str],
    answerExplaination: str
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;