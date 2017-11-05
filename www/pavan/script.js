$(document).ready(function() {
	$(window).on("mousemove swipe click tap" , function(e) { updateButtonPosition(e.pageX, e.pageY); });
	updateButtonPosition(window.innerWidth/2, window.innerHeight/2);
});

function updateButtonPosition(x, y) {
	var button = $("#report-sickness-button");
	var offsetX = button[0].clientWidth / 2;
	var offsetY = button[0].clientHeight / 2;
	button.css({
		left: (x-offsetX) + "px",
		top: (y-offsetY) + "px"
	});
}

function getLocation() {
	navigator.geolocation.getCurrentPosition(function(position) {
		var precision = 5;
		var lat = position.coords.latitude.toFixed(precision);
		var lon = position.coords.longitude.toFixed(precision);
		$("#latitude").val(lat + "\xB0");
		$("#longitude").val(lon + "\xB0");
	});
}

function checkSeverity() {
	var severity = parseFloat($("#severity").val());
	if (severity) {
		if (0.0 <= severity && severity <= 1.0) {
			error = null;
		} else {
			error = "Error: Severity must be between 0.0 and 1.0";
		}
	} else {
		error = "Error: Severity must be a number";
	}
	transitionElement("#severity-error", errorHTML(error), 80);
	return error;
}

function submitReport() {
	var latitude = parseFloat($("#latitude").val());
	var longitude = parseFloat($("#longitude").val());
	var severity = parseFloat($("#severity").val());
	if (!checkSeverity() && latitude && longitude) {
		request = {
			latitude: latitude,
			longitude: longitude,
			severity: severity,
			sicknessType: 0
		};
		$.get("api/asdf", request, function(data) {
			if (data) {
				$("#report-sickness-modal").modal("hide");
			} else {
				error = errorHTML("Error: Internal server error");
				transitionElement("#severity-error", error, 200);
			}
		});
	} else {
		error = errorHTML("Error: Latitude or longitude or severity not defined");
		transitionElement("#severity-error", error, 200);
	}
}

