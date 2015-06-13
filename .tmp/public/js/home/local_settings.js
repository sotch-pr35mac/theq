$(document).ready(function() {
	$("#clear_defaults").click(function() {
		localStorage.clear();
		swal("Woo!", "Default values have been cleared.", "success");
	});
});
