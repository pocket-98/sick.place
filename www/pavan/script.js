$(document).ready(function() {
	//make button follow mouse
	$(window).on("mousemove swipe click tap" , function(e) { updateButtonPosition(e.pageX, e.pageY); });
	updateButtonPosition(window.innerWidth/2, window.innerHeight/2);

	//initialize map
	main.map = L.map("map");
	L.mapbox.accessToken = "pk.eyJ1Ijoic3l6OTkiLCJhIjoiY2o5bTE3ZjJyNHA4NjMzbHNsdjZ1ZzJjZSJ9.O7McJy9z5ioFmv3mxfYyYw";
	var url = "https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=" + L.mapbox.accessToken;
	var copyright = { attribution: '\xA9 <a href="https://www.mapbox.com/feedback/">Mapbox</a> \xA9 <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' };
	var mapboxTiles = L.tileLayer(url, copyright);
	main.map.on('load', pullNewPoints);
	main.map.addLayer(mapboxTiles).setView([35.9132, -79.0558], 15);
	main.map.on('moveend', pullNewPoints); //called on move and zoom
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

function pullNewPoints() {
    bounds = main.map.getBounds();
    p1 = bounds.getSouthWest()
    p2 = bounds.getNorthEast();

    var request = {
        lat1: p1.lat,
        lon1: p1.lng,
        lat2: p2.lat,
        lon2: p2.lng,
    };

    $.get("http://localhost:5000/api/sicknessinarea", request, function(sickPoints) {
        console.log(sickPoints);
		        for (var i in sickPoints) {
        		    injectPoint(sickPoints[i]);
				 }
    });
}
