/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  createUser: function(req, res) {
    var post = req.body;

    User.create(post).exec(function(err, user) {
      if (err || user == undefined) {
        console.log("There was an error when creating the user. Error = " + err);
        res.serverError();
      } else {
        res.send({
          success: true
        });
      }
    });
  },

  changePassword: function(req, res) {
    var post = req.body;

    console.log(post);

    if (post.newPassword1 == post.newPassword2) {
      bcrypt.compare(post.currentPassword, req.user.password, function(err, result) {
        if (err) {
          console.log("There was an error when comparing the passwords. Error = " + err);
          res.serverError();
        } else {
          if (result != true) {
            res.send({
              success: false
            });
          } else {
            bcrypt.genSalt(10, function(err, salt) {
              if (err || salt == undefined) {
                console.log("There was an error generating salt. Error = " + err);
                res.serverError();
              } else {
                bcrypt.hash(post.newPassword1, salt, function() {}, function(err, hash) {
                  if (err || hash == undefined) {
                    console.log("There was an error when hashing the password. Error = " + err);
                    res.serverError();
                  } else {
                    User.update({
                      id: req.user.id
                    }, {
                      password: hash
                    }, function(err, user) {
                      if (err || user == undefined) {
                        console.log("There was an error when updating the user's password. Error = " + err);
                        res.serverError();
                      } else {
                        res.send({
                          success: true
                        });
                      }
                    });
                  }
                });
              }
            })
          }
        }
      });
    } else {
      res.send({
        success: false
      });
    }
  },



};