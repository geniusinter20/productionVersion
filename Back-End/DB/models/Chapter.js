const mongoose = require('mongoose');
const  {num, str, courseID, videosID} = require('./datatypes');


const ChapterSchema = new mongoose.Schema({
    chapterBrief: str,
    chapterVideosNo: num,
    chapterVideosIDs: [videosID],
    referencecourses: [courseID]
});

const Chapter = mongoose.model('Chapter', ChapterSchema);

module.exports = Chapter;