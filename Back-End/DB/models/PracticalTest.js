const mongoose = require('mongoose');
const  {num, str, date, examID, bool} = require('./datatypes');



const PracticalTestSchema = new mongoose.Schema({
  testTitle: str,
  testType: str,
  testCategory: str,
  testImageID: str,
  testPrice:num,
  testRate:num,
  testValidationPeriod: num,
  testDescription: str,
  testExamsIDs: [str],
  testBrief: str,
  testInstructorID:str,
  whatStudentWillPractice: [str],
  testNo: num, 
  testStatus: bool,
  testExamsNumber:num,
  testCreatedDate:date,
  key: str
});

const PracticalTest = mongoose.model('PracticalTest', PracticalTestSchema);

module.exports = PracticalTest;