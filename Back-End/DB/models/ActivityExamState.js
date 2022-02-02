const mongoose = require('mongoose');
const  {str, date, examID, activityID, questionID, bool, num} = require('./datatypes');


const ActivityExamStateSchema = new mongoose.Schema({
    activityID: activityID,
    clientID: str,
    examID: str,
    finished: bool,
    started: bool,
    finishedQuestionsIDsWithAnswers: [{}],
    timeSpent: num,
    testID: str,
    startDate: date,
});

const ActivityExamState = mongoose.model('ActivityExamState', ActivityExamStateSchema);

module.exports = ActivityExamState;