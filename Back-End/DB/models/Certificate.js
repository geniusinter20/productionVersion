const mongoose = require('mongoose');
const  {num, str, clientID} = require('./datatypes');



const CertificateSchema = new mongoose.Schema({
    certificateName: str,
    certificateClientID: clientID,
    certificateDegree: num
  
});

const Certificate = mongoose.model('Certificate', CertificateSchema);

module.exports = Certificate;