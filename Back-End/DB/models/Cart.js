const mongoose = require('mongoose');
const { num, str, date, bool } = require('./datatypes');


const CartSchema = new mongoose.Schema({
    clientID: str,
    products: [{}]

});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;