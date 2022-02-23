const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const timeout = require('connect-timeout');
const haltOnTimedout = require('./haltOnTimedout');
const savePost = require('./savePost')
const Checkout = require('../DB/models/Checkout');
const url = process.env.MONGO_URI;

const CheckoutRouter = express.Router();

//Middleware
CheckoutRouter.use(bodyParser.json());

//Routing 
//GET Method all Checkouts
CheckoutRouter.route('/').get(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
        Checkout.find({}, function (err, docs) {
            if (err) throw err;
            res.json(docs);
        });
    })
});
//GET a specific Checkout by id
CheckoutRouter.route('/:id').get(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
        Checkout.find({ id: req.params.id }, function (err, docs) {
            res.json(docs);
        });
    })
});

//GET a specific practiceTest by create time
CheckoutRouter.route('/:time').get(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
        Checkout.find({ create_time: req.params.time }, function (err, docs) {
            res.json(docs);
        });
    })
});

//POST Method for Add a new Purchased Product
CheckoutRouter.route('/add').post(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
        const newItem = new Checkout({
            create_time: req.body.create_time,
            id: req.body.id,
            links: req.body.links,
            payer: req.body.payer
        });

        // save model to database
        
        newItem.save(function (err, result) {
            if (err) return console.error(err);
            console.log(result);
            res.json({ msg: "Checkout/s Added"});
        });
    })
});

//POST Method for Update a specifice Purchased Product and Restor it
CheckoutRouter.route('/update/:id').post(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
        const condition = { id: req.params.id };
        const update = {
            create_time: req.body.create_time,
            id: req.body.id,
            links: req.body.links,
            payer: req.body.payer
        };
        // Finde By ID and Update it
        Checkout.updateOne(condition, update, () => {
            res.json({ msg: "Checkout updated" });
        });
    })
});
//DELETE Method for delete a specifice practiceTest
CheckoutRouter.route('/delete/:id').delete(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
        const condition = { id: req.params.id };
        Checkout.deleteOne(condition, (err, docs) => {
            if (err) throw err;
            console.log("Deleted : ", docs);
            res.json({ msg: "Purchased Product deleted" });
        });
    })
});


module.exports = CheckoutRouter;