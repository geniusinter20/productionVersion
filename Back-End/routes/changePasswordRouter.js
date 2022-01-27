const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcryptjs = require('bcryptjs');
const Client = require('../DB/models/Client');
const timeout = require('connect-timeout');
const haltOnTimedout = require('./haltOnTimedout');
const savePost = require('./savePost')
const url = process.env.MONGO_URI;

const changePasswordRouter = express.Router();

//Middleware
changePasswordRouter.use(bodyParser.json());

changePasswordRouter.route('/:id').post(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
        Client.findOne({ _id: req.params.id }, async (err, doc) => {
            console.log(`doc = ${doc}`)
            console.log(`password = ${doc.password}`)
            if (err) throw err;
            const cond = await bcryptjs.compare(req.body.currentPassword, doc.password);
            if (cond) {
                bcryptjs.genSalt(10, (err, salt) => {
                    bcryptjs.hash(req.body.newPassword, salt, (err, hash) => {
                        if (err) throw err;
                        newPassword = hash;
                        console.log(`newPassword = ${newPassword}`)
                        Client.update(
                            { _id: req.params.id },
                            {
                                $set: {
                                    password: newPassword // updating record via MongoDB operators         
                                }
                            },
                            { upsert: true },
                            (err, updating) => {
                                if (err) console.log(err);
                                else console.log(updating);
                            }
                        );
                        res.json('OK');
                    });
                })
            } else {
                res.json("Wrong Password");
            }
        });
    })
});
module.exports = changePasswordRouter