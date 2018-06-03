var Post = require('../models/Singlesignup');
var mongoose = require('mongoose');

module.exports.Singlesignup = Singlesignup;

function Singlesignup (req, res) {
   var url = "mongodb://localhost:27017/hndb";
   mongoose.Promise = global.Promise;
   mongoose.connect(url);
   var myData = new Singlesignup();
   myData.save(function (err, fluffy) {
      if (err) return console.error(err);
   });
}
