const mongoose = require('mongoose');
const  {num, str, courseID, chapterID} = require('./datatypes');


const VideoSchema = new mongoose.Schema({
    videoTitle: str,
    videoLength: num,
    videoRate: num,
    referenceCourses: [courseID],
    referenceChapters: [chapterID], 
    videoResource: str
});

const Video = mongoose.model('Video', VideoSchema);

module.exports = Video;