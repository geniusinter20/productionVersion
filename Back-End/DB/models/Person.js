const mongoose = require('mongoose');
const  str = require('./datatypes').str;

const Schema = mongoose.Schema;

const personSchema = new Schema({
  firstName: str,
  middleName: str,
  lastName: str
  
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;