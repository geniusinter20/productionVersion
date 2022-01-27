require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const passport = require('passport');
const bodyParser = require('body-parser');
const timeout = require('connect-timeout');
const haltOnTimedout = require('./haltOnTimedout');
const savePost = require('./savePost')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
// Load User model
const User = require('../DB/models/Client');
const url = process.env.MONGO_URI

//update user information
//KH
router.route('/updateinfo/:id').post(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
  savePost(req.body, (err, id) => {
    if (err) {
      console.log('I in if err')
      return next(err)
    }
    if (req.timedout) {
      console.log('Timedout occur')
      res.json({ "msg": 408 })
      process.exit(0);
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    mongoose.connect(url);

    // Finde By ID and Update it
    User.update(
      { _id: req.params.id },
      {
        $set: {
          fullName: req.body.fullName,
          address: req.body.address,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber
        }
      },
      { upsert: true },
      (err, updating) => {
        if (err) console.log(err);
        else {
          console.log(updating);
          res.json({msg:'Updating Success'});
        }
      }
    );
  })
});
//update image
router.route('/updateimage/:id').post(timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
  savePost(req.body, (err, id) => {
    if (err) {
      //console.log('I in if err')
      return next(err)
    }
    if (req.timedout) {
      console.log('Timedout occur')
      res.json({ "msg": 408 })
      process.exit(0);
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    mongoose.connect(url);

    // Finde By ID and Update it
    User.update(
      { _id: req.params.id },
      {
        $set: {
          imageID: req.body.imageID
        }
      },
      { upsert: true },
      (err, updating) => {
        if (err) console.log(err);
        else {
          console.log(updating);
          res.json('Updating success');
        }
      }
    );
  })
});


// Login Page
router.get('/login',timeout('12s', { respond: false }), bodyParser.json(),authenticateToken, (req, res, next) => {
  
    User.find({}, (err, docs) => {
      if (err) throw err;
      res.json(docs.filter(doc => doc.email === req.body.email));
    })
  
});

// Register Page
//router.get('/register', forwardAuthenticated, timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => res.render('register'));

// Register
router.post('/register', timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
    const { fullName, email, password, address, accountType } = req.body;
    //let errors = [];
    User.findOne({ email: email }).then(user => {
      if (user) {

        res.json({ msg: 'Email already exists' });
        /* res.render('register', {
           errors,
           fullName,
           email,
           password,
           address
         });*/
      } else {
        const newUser = new User({
          fullName,
          email,
          password,
          address,
          accountType,
          phoneNumber,
        });

        bcryptjs.genSalt(10, (err, salt) => {
          bcryptjs.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            //console.log("nu", newUser)
            const { email, password } = newUser
            const token = jwt.sign({ email: email, password: password }, process.env.ACCESS_TOKEN_SECRET);
            const Cart = require('../DB/models/Cart');
            const newCart = new Cart({
              clientID: newUser._id,
              productsWithID: []
            });
            newCart.save((err, _) => {
              if (err) return console.error(err);
            });
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.json(token)
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  })
});

// Login
router.post('/login',timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) =>{
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
    const user = {
      email: req.body.email,
      password: req.body.password
    };
    User.findOne({ email: user.email }, async (err, result) => {
      if (err) throw err;
      if (!result) {
        console.log(result)
        res.json({ msg: "Can't find Email Address" })
      }
      else try {
        //console.log(`result = ${result[0]['password']}`)
        const cond = await bcryptjs.compare(req.body.password, result.password);
        if (cond) {
          //res.json('OK');
          const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
          res.json(token)
        } else {
          res.json({ msg: "Wrong Password" });
        }
      } catch {
        res.status(500).json({ msg: "fail" })
      }
    })
  })

});

// Logout
router.get('/logout', timeout('12s', { respond: false }), bodyParser.json(), haltOnTimedout, (req, res, next) => {
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
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.json('loged out');
  })
});

function authenticateToken(req, res, next) {
  const jwt = require('jsonwebtoken')
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!req.timedout) {
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, usr) => {
      if (err) {
        console.log(`err = ${err}`)
        return res.sendStatus(403);
      }
      req.body = usr;
      next()
    })
  }
}

module.exports = router;
