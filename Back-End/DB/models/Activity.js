const mongoose = require('mongoose');
const  {num, str, date, clientID} = require('./datatypes');



const activitySchema = new mongoose.Schema({
    clientID: clientID,
    activityType: str,
    activityDate: date,
    activityScore: num
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;