/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var bcrypt = require('bcrypt-nodejs');

module.exports = {

  adapter: 'mongo',

  attributes: {

    accountType: {
      type: 'String',
      defaultsTo: 'technician'
    },

    username: {
      type: 'String',
      unique: true
    },

    password: 'string',

    fullName: 'string',

    firstName: 'string',

    lastName: 'string',

    email: 'email',

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }

  },

  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err || salt == undefined) {
        console.log("There was an error for generating salt. Error = " + err);
      } else {
        bcrypt.hash(user.password, salt, function() {}, function(err, hash) {
          if (err || hash == undefined) {
            console.log("There was an error hashing the password. Error = " + err);
          } else {
            user.password = hash;
            cb(null, user);
          }
        });
      }
    });
  }
};