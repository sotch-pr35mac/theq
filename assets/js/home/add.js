/*
 * Description: This page handles all the required javascript for the Add Item page
 * Author: Preston Stosur-Bassett (www.stosur.info)
 * Date: June 7th 2015
 * File: /js/home/add.js
*/

$(document).ready(function() {
	//Initialize the Date/Time Picker
	$(".form_datetime").datetimepicker({
		format: 'dd MM yyy - HH:ii P',
		showMeridian: true,
		autoclose: true,
		todayBtn: false
	});
});
