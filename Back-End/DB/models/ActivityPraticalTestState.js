const mongoose = require('mongoose');
const  {str, clientID, practicalTestID, activityID, examID} = require('./datatypes');


const ActivityPraticalTestStateSchema = new mongoose.Schema({
    activityID: activityID,
    testID: practicalTestID,
    clientID: clientID,
    examsCompleted: [examID],
});

const ActivityPraticalTestState = mongoose.model('ActivityPraticalTestState', ActivityPraticalTestStateSchema);

module.exports = ActivityPraticalTestState;