/*
 * File: /js/home/alert.js
 * Description: This file handles the addAlert page, all the client side logic for adding alerts to the system
 * Author: Preston Stosur-Bassett (www.stosur.info)
 * Date: June 11, 2015
*/

$(document).ready(function() {

	//On Click Listeners
	$("#addAlert-Button").click(function() {
		var storeLocation = $("#storeLocation").val();
		if(storeLocation == "invalid") {
			alert("Please select a location.");
		}
		else {
			var alertText = $("#alert-text").val();
			var alertType = $("#alert-type").val();

			$.ajax({
				type: 'POST',
				url: '/home/add',
				data: {
					storeLocation: storeLocation,
					alertText: alertText,
					alertType: alertType
				},
				success: function(data) {
					if(data.success == true) {
						swal("Alert Added", "The alert has been added to "+storeLocation+" .", "success");
					}
					else {
						swal("Failed to Add Alert", "There was an error adding the alert to "+storeLocation+" .", "error");
						console.log(data);
					}
				},
				error: function(data) {
					swal("Failed to Add Alert", "There was an error adding the alert to "+storeLocation+" .", "error");
					console.log(data);
				}
			});
		}
	});

	$("#removeAlert-Button").click(function() {

	});
});
