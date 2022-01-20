const mongoose = require('mongoose');
const  {num, str, date} = require('./datatypes');


const CourseSchema = new mongoose.Schema({
  courseTitle: str,
  courseDescription: str,
  courseRate: num,
  coursePrice: num,
  courseInstructorID: str,
  courseCategory: str,
  courseBrief: str,
  courseLanguage: str,
  courseLastUpdate: date,
  courseChapterNo: num,
  whatStudentWillLearn: str,
  courseValaidationPeriod: date,
  courseRequirments: [str]
  
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;