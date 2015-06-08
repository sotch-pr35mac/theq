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
	$("#action_buttons-start").click(function() {
		
	});
	$("#action_buttons-complete").click(function() {

	});
});
