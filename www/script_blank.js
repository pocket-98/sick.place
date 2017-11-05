var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/syz99/cj9m17jqw24e92ro32edptmca/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3l6OTkiLCJhIjoiY2o5bTE4NmE0MGxtczJxbjQ1cTVlMGlnOCJ9.xFRVGwr05gnSzErdeDTHpw', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoic3l6OTkiLCJhIjoiY2o5bTE3ZjJyNHA4NjMzbHNsdjZ1ZzJjZSJ9.O7McJy9z5ioFmv3mxfYyYw'
}).addTo(map);
