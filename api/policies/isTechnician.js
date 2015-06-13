module.exports = function isTechnician(req, res, next) {
  var id = req.session.passport.user;
  if (id) {
    User.findOne({
      id: id
    }).exec(function(err, user) {
      if (err || user == undefined) {
        console.log("Issue authenticating user.");
        if (err) {
          console.log("Error = " + err);
        }
        res.forbidden();
      } else {
        if (user.accountType == "technician") {
          return next();
        } else {
          res.forbidden();
        }
      }
    });
  } else {
    console.log("Issue authenticating user.");
    res.redirect('/admin')
  }
}