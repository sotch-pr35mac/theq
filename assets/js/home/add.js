/*
 * Description: This page handles all the required javascript for the Add Item page
 * Author: Preston Stosur-Bassett (www.stosur.info)
 * Date: June 7th 2015
 * File: /js/home/add.js
 */

$(document).ready(function() {
  //Initialize the Date/Time Picker for Promise Times
  $('#promisetime').datetimepicker({
    inline: true
  });

  //Add OnChangeEventListeners
  $("#storeLocation").change(function() {
    localStorage.storeLocation = $("#storeLocation").val();
  });

  //AddEventListeners
  $("#addItem-Cancel").click(function() {
    //Reset all the fields
    $("#deviceMake").val("");
    $("#deviceModel").val("");
    $("#repairType").val("");
    $("#repairLength").val("");
    $("#ticketNumber").val("");
  });
  $("#addItem-Button").click(function() {
    //Get all the fields values
    var lineItem = {};
    lineItem.storeLocation = $("#storeLocation").val();
    lineItem.deviceMake = $("#deviceMake").val();
    lineItem.deviceModel = $("#deviceModel").val();
    lineItem.repairType = $("#repairType").val();
    lineItem.repairLength = $("#repairLength").val();
    lineItem.ticketNumber = $("#ticketNumber").val();
    lineItem.promiseTime = $("#promisetime").val();

    $.ajax({
      type: 'POST',
      url: '/addItem',
      data: lineItem,
      success: function(result) {
        console.log(result);
        if (result.success == true) {
          swal("Item Added", "Ticket Number " + lineItem.ticketNumber + " has been added to the Q.", "success");
          window.location.href = "/add";
        } else {
          swal("Item Failed to Add", "Ticket Number " + lineItem.ticketNumber + " has NOT beed added to the Q.", "error");
        }
      },
      error: function(result) {
        console.log(result);
        swal("Item Failed to Add", "Ticket Number " + lineItem.ticketNumber + " has NOT been added to the Q.", "error");
      }
    });
  });
});