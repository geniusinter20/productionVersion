const mongoose = require('mongoose');
const  {num, str, date, clientID, courseID, practicalTestID, certificateID} = require('./datatypes');



const PurchasedProductSchema = new mongoose.Schema({
    productClientID: clientID,
    purchasedDate: date,
    purchasedProductID: courseID || practicalTestID || certificateID,
    purchasePrice: num,
    cardNo: str
});

const PurchasedProduct = mongoose.model('PurchasedProduct', PurchasedProductSchema);

module.exports = PurchasedProduct;