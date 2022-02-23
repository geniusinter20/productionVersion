const mongoose = require('mongoose');
const  {str, date} = require('./datatypes');


const CheckoutSchema = new mongoose.Schema({
    create_time: date,
    id: str,
    links: [],
    payer: {}
});

const checkout = mongoose.model('Checkout', CheckoutSchema);

module.exports = checkout;