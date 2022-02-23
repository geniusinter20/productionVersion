const mongoose = require('mongoose');
const  {num, str, date} = require('./datatypes');


const PurchasedProductSchema = new mongoose.Schema({
    clientID: str,
    purchasedProductID: str,
    purchasedProductType: str,
    purchaseDetails: {}
});

const PurchasedProduct = mongoose.model('PurchasedProduct', PurchasedProductSchema);

module.exports = PurchasedProduct;