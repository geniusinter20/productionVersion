require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
// Load User model
const User = require('../DB/models/Client');


// Login Page
router.get('/login', authenticateToken, (req, res) => {
  User.find({}, (err, docs)=>{
    if(err) throw err;
    res.json(docs.filter(doc => doc.email === req.body.email));
  })
});

// Register Page
//router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const { fullName, email, password, address,accountType } = req.body;
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
        accountType
      });

      bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          //console.log("nu", newUser)
          const {email, password}= newUser
          const token = jwt.sign({email: email, password: password}, process.env.ACCESS_TOKEN_SECRET);
          const Cart = require('../DB/models/Cart');
          const newCart = new Cart({
            clientID: newUser._id,
            products: []
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

});

router.route('/users').get((req, res)=>{
  User.find({},(err, data)=>{
    if(err) throw err;
    res.send(data)
  })
})// Login
router.post('/login',  (req, res, next) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };
  User.findOne({email:user.email}, async(err, result) => {
    if(err) throw err;
    
    if(!result){
      console.log(result)
      res.json({msg:"Can't find Email Address"})
    }
    else try{
      //console.log(`result = ${result[0]['password']}`)
      const cond = await bcryptjs.compare(req.body.password, result.password);
      if(cond){
        //res.json('OK');
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        res.json(token)
      }else{
         res.json({msg:"Wrong Password"});
      }
    }catch{
      res.status(500).json("failed")
    }
  })

  
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.json('loged out');
});

function authenticateToken(req, res, next){
  const jwt = require('jsonwebtoken')
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(token == null)return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, usr)=>{
    if(err){
      console.log(`err = ${err}`)
      return res.sendStatus(403);}
    req.body = usr;
    next()
  })

}

module.exports = router;
