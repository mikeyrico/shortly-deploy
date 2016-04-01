var db = require('../config');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var userSchema = mongoose.Schema({
  username: {type: String, required: true, index: {unique: true} },
  password: {type: String, required: true} 
});

var User = mongoose.model('User', userSchema);
 
userSchema.pre('save', function(next) {
  User.hashPassword();
  next();
});

User.comparePassword = function(attemptedPassword, savedPassword, callback) {
  bcrypt.compare(attemptedPassword, savedPassword, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    callback(null, isMatch);
  });
},

module.exports = User;
