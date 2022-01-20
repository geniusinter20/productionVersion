const mongoose = require('mongoose');
const  {num, str, date, clientID, courseID, practicalTestID, certificateID} = require('./datatypes');


const ReviewSchema = new mongoose.Schema({
    clientID: clientID,
    productID: courseID || practicalTestID || certificateID,
    reviewDate: date,
    reviewValue: num,
    reviewText: str
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;