const mongoose = require('mongoose');
const { num, str, date, bool } = require('./datatypes');


const CartSchema = new mongoose.Schema({
    clientID: str,
    productsWithID: [{}]

});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;