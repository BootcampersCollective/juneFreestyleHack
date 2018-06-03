const express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  morgan = require("morgan"),
  fs = require("fs"),
  passport = require("passport"),
  flash = require("connect-flash"),
  cookieParser = require("cookie-parser"),
  session = require("express-session"),
  ObjectId = require("mongodb").ObjectId,
  nodemailer = require("nodemailer"),
  randomString = require("randomstring"),
  aws = require("aws-sdk"),
  multer = require("multer"),
  multerS3 = require("multer-s3");
// helmet       = require('helmet');

// require('./controllers/user')(passport); // pass passport for configuration

const app = express();

// setup the logger
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// setup the helmet
// app.use(helmet());

// make our database connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/hackathon", function(errorTime) {
  errorTime
    ? console.log("NO CONNECTION TO DB")
    : console.log("CONNECTED TO DATABASE");
});

// include static routes for serving up static html files.
//app.use(express.static('public'));

//This is used for testing.
//TODO: Remove this line when we deploy the server.
// app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(
  session({
    secret: "bootcampersCollective",
    resave: true,
    saveUninitialized: true
  })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// call our routes
// routes ======================================================================
require("./controllers/routes.js")(app, passport); // load our routes and pass in our app and fully configured passport

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
