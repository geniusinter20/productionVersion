const mongoose = require('mongoose');
const  {str, num} = require('./datatypes');


const questionSchema = new mongoose.Schema({
    qesText: str,
    qesType: str,
    ansExp: str,
    options: [],
    key: str,
    qesAns: [],
    //order:num
  
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;