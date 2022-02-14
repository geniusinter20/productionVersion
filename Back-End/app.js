// openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365  
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const path = require('path');
//const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');
var cors = require('cors')
const methodOverride = require('method-override');
require('dotenv/config');
/*const Activity = require('./DB/models/Activity');
const ActivityCourseState = require('./DB/models/ActivityCourseState');
const ActivityExamState = require('./DB/models/ActivityExamState');
const ActivityPraticalTestState = require('./DB/models/ActivityPraticalTestState');
const Answer = require('./DB/models/Answer');
const Cart = require('./DB/models/Cart');
const certificate = require('./DB/models/Certificate');
const Chapter = require('./DB/models/Chapter');
const Client = require('./DB/models/Client');
const Course = require('./DB/models/Course');
const Exam = require('./DB/models/Exam');
const Person = require('./DB/models/Person');
const PracticalTest = require('./DB/models/PracticalTest');
const PurchasedProduct = require('./DB/models/PurchasedProduct');
const Question = require('./DB/models/Question');
const Review = require('./DB/models/Review');
const Score = require('./DB/models/Score');
const Session = require('./DB/models/Session');
const Video = require('./DB/models/Video');
*/
const DBURL = process.env.MONGO_URI;
mongoose.createConnection(DBURL);

const app = express();
app.use((req, res, next) => {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  next();
});
app.use(express.json())


// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


// Express body parser
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(bodyParser.json());
app.use(methodOverride('_method'));



// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
// app.use(function (req, res, next) {
//   res.locals.success_msg = req.flash('success_msg');
//   res.locals.error_msg = req.flash('error_msg');
//   res.locals.error = req.flash('error');
//   next();
// });


const examRouter = require('./routes/examRouter');
app.use('/exams', examRouter);

const PORT = process.env.PORT || 5000

 const PracticetestsRouter = require('./routes/PracticetestsRouter');
 const questionRouter = require('./routes/questionRouter');
 const activityExamRouter = require('./routes/activityExamRouter');
 const clientRouter = require('./routes/clientRouter');
 const cartRouter = require('./routes/cartRouter');
 const changePasswordRouter = require('./routes/changePasswordRouter');
const imageRouter = require('./routes/imageRouter');
// const answerRouter = require('./routes/answerRouter')
// app.use('/answer',answerRouter);
 app.use('/image', imageRouter);
 app.use('/practicetests', PracticetestsRouter);
 app.use('/question', questionRouter);
 app.use('/activityexamstate', activityExamRouter);
 app.use('/client', clientRouter);
 app.use('/cart', cartRouter);
 app.use('/changepassword', changePasswordRouter);
app.use(helmet());


app.use(cors()) // Use this after the variable declaration



/*
app.get('/secret', (req, res) => {
    return res.send('Your personal secret value is 42!');
});*/

app.get('/', (req, res) => {
  res.send('Hello');
});

const privateKey = fs.readFileSync('./key.pem').toString();
const certificate = fs.readFileSync('./cert.pem').toString();
const ca = fs.readFileSync('./CABUNDLE.pem');
const credentials = {key: privateKey, cert: certificate, ca:ca};

const server = https.createServer(credentials, app).listen(PORT, () => console.log(`Server is running on https://localhost:${PORT}`));

//app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
/*
https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
}, app).listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
*/