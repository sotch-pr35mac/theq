/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var passport = require('passport');

module.exports = {

  login: function(req, res) {
    passport.authenticate('local', function(err, user, info) {
      if (err || (!user)) {
        res.view('auth/loginError');
      } else if (!err && user) {
        req.logIn(user, function(err) {
          if (err) {
            res.serverError();
            return;
          } else {
            if (user.accountType != "superuser") {
              res.writeHead(302, {
                location: '/user/dash'
              });
              res.end();
              return;
            } else if (user.accountType == "superuser") {
              res.writeHead(302, {
                location: '/superuser/select'
              });
              res.end();
              return;
            } else {
              res.serverError();
              return;
            }
          }
        });
      }
    })(req, res);
  }

};