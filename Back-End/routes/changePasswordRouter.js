const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcryptjs = require('bcryptjs');
const Client = require('../DB/models/Client');

const url = 'mongodb://localhost:27017/newDB';

const changePasswordRouter = express.Router();

//Middleware
changePasswordRouter.use(bodyParser.json());

changePasswordRouter.route('/:id').post((req, res) => {
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
                        {_id: req.params.id},
                        {$set: {
                         password: newPassword // updating record via MongoDB operators         
                        }},
                        {upsert: true},
                        (err, updating) => {
                            if(err)console.log(err);
                            else console.log(updating);
                        }   
                    );
                    res.json('Password Changed');
                });
            })
        } else {
            res.json({msg: "Please Input Your Current Password Correctly"});
        }
    });
});
module.exports = changePasswordRouter