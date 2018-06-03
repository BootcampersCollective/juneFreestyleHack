var app = require('express')();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// TODO: Password reset, password change, login error handling and routing, sign up error handling.
var objectId = require("mongodb").ObjectId,
  bcrypt = require("bcrypt-nodejs"),
  nodemailer = require("nodemailer"),
  // xoath2          = require('xoauth2'),
  randomString = require("randomstring"),
  aws = require("aws-sdk"),
  fileUpload = require("express-fileupload");

module.exports = (app, passport) => {
   app.get("/", (req, res) => {
      res.send("Hello World");
   });
   app.post("/singlesignup", (req, res) => {

      //   Somewhere around here, receive the user inputs.
      //   We need user's:
      //   e-mail
      let email = req.body.email;
      let password = req.body.password;
      let firstName = req.body.firstName;
      let lastName = req.body.lastName;
      let specialized = req.body.specialized;
      /*
         With the inputs above, I save them to a database.
      */
      
   });
};
