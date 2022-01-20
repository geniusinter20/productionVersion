const Schema = require("mongoose").Schema;

const num = {
    type: Number,
    // required: false
};
const str = {
    type: String,
    // required: false
};
const date = {
    type: Date,
    //default: Date.now,
    // required: false
};
const bool = {
    type: Boolean,
    // required: false
};
const personID = {
    type: Schema.ObjectId,
    ref: 'Person'
};
const activityID = {
    type: Schema.ObjectId,
    ref: 'Activity'
};
const clientID = {
    type: Schema.ObjectId,
    ref: 'Client'
};
const courseID = {
    type: Schema.ObjectId,
    ref: 'Course'
};
const practicalTestID = {
    type: Schema.ObjectId,
    ref: 'PracticalTest'
};
const certificateID = {
    type: Schema.ObjectId,
    ref: 'Certificate'
};
const chapterID = {
    type: Schema.ObjectId,
    ref: 'Chapter'
};
const videosID = {
    type: Schema.ObjectId,
    ref: 'Video'
};
const questionID = {
    type: Schema.ObjectId,
    ref: 'Question'
};
const examID = {
    type: Schema.ObjectId,
    ref: 'Exam'
};

module.exports = {
                    num, str, date, bool, personID, activityID,
                    clientID, courseID, practicalTestID, certificateID,
                    chapterID, videosID, examID, questionID
                 };