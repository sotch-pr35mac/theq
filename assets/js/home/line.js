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

		swal({
			title: "Start Repair",
			text: "Assign Technician",
			type: "input",
			showCancelButton: true,
			closeOnConfirm: true,
			animation: "slide-from-top",
			inputPlaceholder: "Technician Name or Initials"
		},
		function(inputValue) {
			if(inputValue === false) {
				return false;
			}
			if(inputValue === "") {
				swal.showInputError("Please enter an identifier.");
				return false;
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
	});
});
