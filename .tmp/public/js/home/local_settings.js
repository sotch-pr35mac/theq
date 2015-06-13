/*
 * Author: Preston Stosur-Bassett (www.stosur.info)
 * Date: June 13 2015
 * Description: This file handles all the local settings logic
 * File: /js/home/local_settings.js
*/

$(document).ready(function() {
	$("#clear_defaults").click(function() {
		localStorage.clear();
		swal("Woo!", "Default values have been cleared.", "success");
	});
});
