/**
 * LandingController
 *
 * @description :: Server-side logic for managing landings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	home: function(req, res) {
		if(req.user) {
			User.findOne({ id: req.user.id }).exec(function(err, user) {
				if(err || user == undefined) {
					res.view('landing/landing', {
						user: null
					});
				}
				else {
					res.view('landing/landing', {
						user: user.displayName
					});
				}
			});
		}
		else {
			res.view('landing/landing', {
				user: null
			});
		}
	},

	login: function(req, res) {
		if(req.user) {
			res.redirect('/');
		}
		else {
			res.view('landing/login');
		}
	}
};
