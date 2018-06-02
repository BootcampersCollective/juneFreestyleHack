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
};
