var map = L.map('map',{
    center:[5,28],
    zoom: 3,
    minZoom:2,
    maxZoom:18
});
L.tileLayer('https://api.mapbox.com/styles/v1/syz99/cj9m17jqw24e92ro32edptmca.html?fresh=true&title=true&access_token=pk.eyJ1Ijoic3l6OTkiLCJhIjoiY2o5bTE3ZjJyNHA4NjMzbHNsdjZ1ZzJjZSJ9.O7McJy9z5ioFmv3mxfYyYw#10.8/40.745772/-74.030553/0',{attribution:"Mapbox"}).addTo(map);