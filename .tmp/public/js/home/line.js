$(document).ready(function() {
	//Set Refresh Interval
	setTimeout(function() {
		window.location.reload();
	}, 900000);

	//OnChangeEventListeners
	$("#locationSelect").change(function() {
		var locationIndex = $("#locationSelect").val();

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
		alert("store location: "+storeLocation);
		alert("ticketNumber: "+ticketNumber);
	});
	$(".action_buttons-complete").click(function() {

	});
});
