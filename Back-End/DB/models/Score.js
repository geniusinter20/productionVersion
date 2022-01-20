const mongoose = require('mongoose');
const  {num, str} = require('./datatypes');



const ScoreSchema = new mongoose.Schema({
    activityScoreID: str,
    scoreValue: num,
    scoreType: num
});

const Score = mongoose.model('Score', ScoreSchema);

module.exports = Score;