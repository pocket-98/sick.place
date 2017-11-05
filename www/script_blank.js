var map = L.map('map').setView([51, -0.00], 13);

L.tileLayer('https://{s}.tiles.mapbox.com/v4/pk.eyJ1Ijoic3l6OTkiLCJhIjoiY2o5bTE3ZjJyNHA4NjMzbHNsdjZ1ZzJjZSJ9.O7McJy9z5ioFmv3mxfYyYw/{z}/{y}/{x}.png', {
    attribution: "Mapbox"}).addTo(mymap);