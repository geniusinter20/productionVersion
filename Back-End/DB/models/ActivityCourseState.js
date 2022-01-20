const mongoose = require('mongoose');
const  {str, clientID, activityID, courseID} = require('./datatypes');


const ActivityCourseStateSchema = new mongoose.Schema({
    courseID: courseID,
    clientID: clientID,
    activityID: activityID,
    currentState: str
});

const ActivityCourseState = mongoose.model('ActivityCourseState', ActivityCourseStateSchema);

module.exports = ActivityCourseState;