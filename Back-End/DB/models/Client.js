const mongoose = require('mongoose');
const  {str, date} = require('./datatypes');
const Schema = mongoose.Schema;


const ClientSchema = new Schema({
  fullName: str,
  email: str,
  password: str,
  address: str,
  joinDate:date,
  image: str,
  accountType:str,
});

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;

