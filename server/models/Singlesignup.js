var mongoose = require('mongoose');

var singleSignUpSchema = mongoose.Schema({
   email: String,
   password: String,
   firstName: String,
   lastName: String,
   specialized: String
});
module.exports = mongoose.model('Singlesignup', singleSignUpSchema);
