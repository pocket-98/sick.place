L.mapbox.accessToken = 'pk.eyJ1Ijoic3l6OTkiLCJhIjoiY2o5bTE3ZjJyNHA4NjMzbHNsdjZ1ZzJjZSJ9.O7McJy9z5ioFmv3mxfYyYw';
// Replace 'mapbox.streets' with your map id.
var mapboxTiles = L.tileLayer('https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
    attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var map = L.map('map');

map.on('load', pullNewPoints);

map.addLayer(mapboxTiles)
.setView([35.9132, -79.0558], 15);

map.on('moveend', pullNewPoints); //called on move and zoom


function pullNewPoints() {
    bounds = map.getBounds();
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

function injectPoint(sickPoint) {
    console.log(sickPoint);

    var coord = L.latLng(sickPoint['latitude'], sickPoint['longitude']);

    var marker = L.marker(coord).addTo(map);
}