$(document).ready(function() {
	//get current location
	getLocation();

	//initialize map
	main.map = L.map("map");
	L.mapbox.accessToken = "pk.eyJ1Ijoic3l6OTkiLCJhIjoiY2o5bTE3ZjJyNHA4NjMzbHNsdjZ1ZzJjZSJ9.O7McJy9z5ioFmv3mxfYyYw";
	var url = "https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=" + L.mapbox.accessToken;
	var copyright = { attribution: '\xA9 <a href="https://www.mapbox.com/feedback/">Mapbox</a> \xA9 <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' };
	var mapboxTiles = L.tileLayer(url, copyright);
	main.map.on('load', pullNewPoints);
	main.map.addLayer(mapboxTiles).setView([main.latitude, main.longitude], 15);
	main.map.on('moveend', pullNewPoints); //called on move and zoom

	//create layer group
	main.markerGroup = L.layerGroup();
	main.markerGroup.addTo(main.map);
});

function getLocation() {
	navigator.geolocation.getCurrentPosition(function(position) {
		var precision = 5;
		main.latitude = position.coords.latitude.toFixed(precision);
		main.longitude = position.coords.longitude.toFixed(precision);
		$("#latitude").val(main.latitude + "\xB0");
		$("#longitude").val(main.longitude + "\xB0");
		main.map.panTo([main.latitude, main.longitude]);
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
	var severity = parseFloat($("#severity").val()).toFixed(3);
	if (!checkSeverity() && main.latitude && main.longitude) {
		request = {
			latitude: main.latitude,
			longitude: main.longitude,
			severity: severity,
			sicknessType: 0
		};
		$.get("api/submitreport", request, function(data) {
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

    $.get("api/sicknessinarea", request, function(sickPoints) {
		main.sickPoints = sickPoints;
		main.markerGroup.clearLayers();
		
        for (var i in sickPoints) {
			var sickPoint = sickPoints[i];
			var coord = L.latLng(sickPoint['latitude'], sickPoint['longitude']);
			var marker = L.marker(coord).addTo(main.markerGroup);
			
			var secondsAgo = ((new Date()).getTime()/1000 - sickPoint['timestamp']);
			if (secondsAgo < 3600) {
				var timeAgo = Math.floor(secondsAgo / 60);
				var timeUnit = "minute";
			}
			else if (secondsAgo < 3600 * 24) {
				var timeAgo = Math.floor(secondsAgo / 3600);
				var timeUnit = "hour";
			}
			else {
				var timeAgo = Math.floor(secondsAgo / (3600 * 24));
				var timeUnit = "day";
			}

			var timeString = timeAgo + " " + timeUnit;
			if (timeAgo > 1) {
				timeString += "s";
			}
			timeString += " ago";

			marker.bindPopup(sickPoint['sicknessName'] + ", " + timeString);
        }
    });
}