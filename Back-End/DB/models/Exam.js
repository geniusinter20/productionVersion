const mongoose = require('mongoose');
const  {num, str, date, examID, bool} = require('./datatypes');




const ExamSchema = new mongoose.Schema({
  examName: str,
  examDuration: num,
  examPasinRate: num,
  examPeriod: str,
  examDescription: str,
  examImageID: str,
  examQuestionsIDs: [str],
  examBrief: str,
  examStatus: bool,
  examCreatedDate: date,
  examWhatStudentWillLearn:[str],
  key: str,
  examCategory:str,
});

const Exam = mongoose.model('Exam', ExamSchema);

module.exports = Exam;