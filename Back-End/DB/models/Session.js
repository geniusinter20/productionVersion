const mongoose = require('mongoose');
const  {date, personID, activityID} = require('./datatypes');


const SessionSchema = new mongoose.Schema({
    sessionActivities: [activityID] /* || [activityID] */,
    sessionClientID: personID,
    sessionLength: date
});

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;