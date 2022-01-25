const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const timeout = require('connect-timeout');
const haltOnTimedout = require('./haltOnTimedout');
const savePost = require('./savePost')
const Cart = require('../DB/models/Cart');

const url = 'mongodb://localhost:27017/newDB';

const cartRouter = express.Router();

//Middleware
cartRouter.use(bodyParser.json());


//Routing 
//GET Method for a specific Client Cart
cartRouter.route('/:id').get(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
        Cart.findOne({ clientID: req.params.id }, (err, docs) => {
            //console.log(docs)
            if (err) throw err;
            res.json(docs);
        });
    })
});
//POST Method for Update a specifice Client Cart and Restor it
cartRouter.route('/update/:id').post(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
        const condition = { clientID: req.params.id };
        const update = {
            clientID: req.params.id,
            productsWithID: [...req.body.productsWithID]
        };
        // Finde By ID and Update it
        console.log("hu", update)
        Cart.updateOne(condition, update, () => {
            //console.log(update)
            res.json('OK');
        });
    })
});
module.exports = cartRouter;