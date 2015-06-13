/*
 * Author: Preston Stosur-Bassett
 * Date: June 8, 2015
 * Description: The script handles all the function for the /home/line.ejs
*/

$(document).ready(function() {
	//Set Refresh Interval
	setTimeout(function() {
		window.location.reload();
	}, 900000);

	//OnChangeEventListeners
	$("#locationSelect").change(function() {
		var locationIndex = $("#locationSelect").val();

		localStorage.storeLocation = document.getElementById("locationSelect").options[locationIndex].text;

		if($("#placeholder").val() == "none") {
			$("#placeholder").val(locationIndex);
			$("#q-index-"+locationIndex).show();
		}
		else {
			$("#q-index-"+$("#placeholder").val()).hide();
			$("#q-index-"+locationIndex).show();
			$("#placeholder").val(locationIndex);
		}
	});

	//OnClickListeners
	$(".action_buttons-start").click(function() {
		var self = this;
		var id = self.id;
		var idDetails = id.split("-", 3);
		var storeLocation = idDetails[1];
		var ticketNumber = idDetails[2];
		var defaultTechnician = "";

		if(localStorage.defaultTechnician != null && localStorage.defaultTechnician != undefined) {
			defaultTechnician = localStorage.defaultTechnician;
		}

		swal({
			title: "Start Repair",
			text: "Assign Technician",
			type: "input",
			showCancelButton: true,
			closeOnConfirm: false,
			animation: "slide-from-top",
			inputPlaceholder: "Technician Name or Initials",
			inputValue: defaultTechnician
		},
		function(inputValue) {
			if(inputValue === false) {
				return false;
			}
			if(inputValue === "") {
				swal.showInputError("Please enter an identifier.");
				return false;
			}

			if(defaultTechnician == "") {
				localStorage.defaultTechnician = inputValue;
			}

			$.ajax({
				type: 'POST',
				url: '/q/startRepair/',
				data: {
					storeLocation: storeLocation,
					ticketNumber: ticketNumber,
					startedBy: inputValue
				},
				success: function(data) {
					if(data.success == true) {
						swal("Woo!", "You've been assigned to this repair.", "success");
						window.location.reload();
					}
					else {
						swal("Uh-oh!", "There was an error assigning you to this repair.", "error");
						console.log(data);
					}
				},
				error: function(data) {
					swal("Uh-oh!", "There was an error assigning you to this repair.", "error");
					console.log(data);
				}
			});
		});

	});
	$(".action_buttons-complete").click(function() {
		var self = this;

		swal({
			title: "Are you sure?",
			text: "Are you sure you want to mark this repair complete and remove it permanantly from the queue?",
			type: "warning",
			showCancelButton: true,
			confirmButtonText: "Yes, Mark Complete",
			cancelButtonText: "No, Keep in Q",
			closeOnConfirm: false,
			closeOnCancel: false,
		},
		function(isConfirm) {
			if(isConfirm) {
				var id = self.id;
				var idDetails = id.split("-", 3);
				var storeLocation = idDetails[1];
				var ticketNumber = idDetails[2];

				$.ajax({
					type: 'POST',
					url: '/q/removeByIndex',
					data: {
						storeLocation: storeLocation,
						ticketNumber: ticketNumber
					},
					success: function(data) {
						if(data.success == true) {
							swal("Completed!", "You have successfully completed the repair!", "success");
							window.location.reload();
						}
						else {
							swal("Uh-oh!", "There was an error marking the repair as complete.", "error");
							console.log(data);
						}
					},
					error: function(data) {
						swal("Uh-oh!", "There was an error marking the reapir as complete.", "error");
						console.log(data);
					}
				});
			}
			else {
				swal("Cancelled", "Repair staying in queue.", "warning");
			}
		});
	});

	$(".removeAlert-Button").click(function() {
		var self = this;
		var locationIndex = $("#locationSelect").val();
		var storeLocation = document.getElementById("locationSelect").options[locationIndex].text;

		if(storeLocation == "invalid" || storeLocation == undefined) {
			alert("Please select a location.");
		}
		else {
			var alertIndex = self.id;
			var id = self.id;
			var idDetails = id.split("-", 3);
			var storeLocation = idDetails[1];
			var alertIndex = idDetails[2];

			$.ajax({
				type: 'POST',
				url: '/remove/alert',
				data: {
					storeLocation: storeLocation,
					alertIndex: alertIndex
				},
				success: function(data) {
					if(data.success == true) {
						swal("Woo!", "Alert successfully deleted.", "success");
						window.location.reload();
					}
					else {
						console.log(data);
						swal("Uh-oh!", "Could not remove alert due to an unknown error.", "error");
					}
				},
				error: function(data) {
					console.log(data);
					swal("Uh-oh!", "Could not remove alert due to an unknown error.", "error");
				}
			});
		}
	});
});
