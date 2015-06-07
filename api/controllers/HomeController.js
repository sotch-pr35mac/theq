/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @author		 :: Preston Stosur-Bassett (www.stosur.info)
 * @date 		 :: June 6, 2015
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	/*
	 * This function handles the page view request for `/add` and `/`, which is the add ticket page, and the home page
	*/
	index: function(req, res) {
		res.view();
	},

	/*
	 * This function handles the page view request for `/q`, which is the view line/view Queue page
	*/
	line: function(req, res) {
		//Pass in some values here from the Q model
		res.view();
	},

	/*
	 * This functions handles the page view request for `/updates`, which is the page to display the upcoming scheduled updates to the system
	*/
	updates: function(req, res) {
		res.view();
	}

};
