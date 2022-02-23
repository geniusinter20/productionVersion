const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const timeout = require('connect-timeout');
const haltOnTimedout = require('./haltOnTimedout');
const savePost = require('./savePost')
const PurchasedProduct = require('../DB/models/PurchasedProduct');
const url = process.env.MONGO_URI;

const PurchasedProductRouter = express.Router();

//Middleware
PurchasedProductRouter.use(bodyParser.json());

//Routing 
//GET Method all practiceTests
PurchasedProductRouter.route('/').get(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
    savePost(req.body, (err, id) => {
        if (err) {
            console.log('I in if err')
            return next(err)
        }
        if (req.timedout) {
            console.log('I in if req.timedout')
            res.json({ "msg": 408 })
            process.exit(0);
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        mongoose.connect(url);
        PurchasedProduct.find({}, function (err, docs) {
            if (err) throw err;
            res.json(docs);
        });
    })
});
//GET a specific practiceTest by id
PurchasedProductRouter.route('/:id').get(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
    savePost(req.body, (err, id) => {
        if (err) {
            console.log('I in if err')
            return next(err)
        }
        if (req.timedout) {
            console.log('I in if req.timedout')
            res.json({ "msg": 408 })
            process.exit(0);
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        mongoose.connect(url);
        PurchasedProduct.findOne({ _id: req.params.id }, function (err, docs) {
            res.json(docs);
        });
    })
});

//GET a specific practiceTest by client id
PurchasedProductRouter.route('/client/:id').get(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
    savePost(req.body, (err, id) => {
        if (err) {
            console.log('I in if err')
            return next(err)
        }
        if (req.timedout) {
            console.log('I in if req.timedout')
            res.json({ "msg": 408 })
            process.exit(0);
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        mongoose.connect(url);
        PurchasedProduct.find({ clientID: req.params.id }, function (err, docs) {
            res.json(docs);
        });
    })
});
//GET a specific practiceTest by its type
PurchasedProductRouter.route('/type/:type').get(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
    savePost(req.body, (err, id) => {
        if (err) {
            console.log('I in if err')
            return next(err)
        }
        if (req.timedout) {
            console.log('I in if req.timedout')
            res.json({ "msg": 408 })
            process.exit(0);
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        mongoose.connect(url);
        PurchasedProduct.find({ purchasedProductType: req.params.type }, function (err, docs) {
            res.json(docs);
        });
    })
});
//GET a specific practiceTest by its type
PurchasedProductRouter.route('/clienttype/:type/:id').get(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
    savePost(req.body, (err, id) => {
        if (err) {
            console.log('I in if err')
            return next(err)
        }
        if (req.timedout) {
            console.log('I in if req.timedout')
            res.json({ "msg": 408 })
            process.exit(0);
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        mongoose.connect(url);
        PurchasedProduct.find({ purchasedProductType: req.params.type, clientID: req.params.id }, function (err, docs) {
            res.json(docs);
        });
    })
});
//POST Method for Add a new Purchased Product
PurchasedProductRouter.route('/add').post(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
    savePost(req.body, (err, id) => {
        if (err) {
            //console.log('I in if err')
            return next(err)
        }
        if (req.timedout) {
            //console.log('I in if req.timedout')
            res.json({ "msg": 408 })
            process.exit(0);
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        mongoose.connect(url);
        const newItem = new PurchasedProduct({
            clientID: req.body.clientID,
            purchasedProductID: req.body.purchasedProductID,
            purchasedProductType: req.body.purchasedProductType,
            purchaseDetails: req.body.purchaseDetails
        });

        // save model to database
        
        newItem.save(function (err, result) {
            if (err) return console.error(err);
            console.log(result);
            res.json({ msg: "Purchased Product Added"});
        });
    })
});

//POST Method for Update a specifice Purchased Product and Restor it
PurchasedProductRouter.route('/update/:id').post(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
    savePost(req.body, (err, id) => {
        if (err) {
            //console.log('I in if err')
            return next(err)
        }
        if (req.timedout) {
            //console.log('I in if req.timedout')
            res.json({ msg: 408 })
            process.exit(0);
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        mongoose.connect(url);
        const condition = { _id: req.params.id };
        const update = {
            clientID: req.body.clientID,
            purchasedProductID: req.body.purchasedProductID,
            purchasedProductType: req.body.purchasedProductType,
            purchaseDetails: req.body.purchaseDetails
        };
        // Finde By ID and Update it
        PurchasedProduct.findByIdAndUpdate(condition, update, () => {
            res.json({ msg: "Purchased Product updated" });
        });
    })
});
//DELETE Method for delete a specifice practiceTest
PurchasedProductRouter.route('/delete/:id').delete(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
    savePost(req.body, (err, id) => {
        if (err) {
            //console.log('I in if err')
            return next(err)
        }
        if (req.timedout) {
            console.log('I in if req.timedout')
            //res.json({ "msg": 408 })
            process.exit(0);
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        mongoose.connect(url);
        const condition = { _id: req.params.id };
        PurchasedProduct.deleteOne(condition, (err, docs) => {
            if (err) throw err;
            console.log("Deleted : ", docs);
            res.json({ msg: "Purchased Product deleted" });
        });
    })
});


module.exports = PurchasedProductRouter;