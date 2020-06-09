var myMap = L.map("map", {
    center: [TODO],
    zoom: TODO
});

L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "streets-v9",
  accessToken: API_KEY
}).addTo(myMap);

var newtry = "https://data.sfgov.org/resource/cuks-n6tp.json?$limit=1000";

d3.json(newtry, function(response){
    console.log(response);
    var heatArray = [];

    for (var i = 0; i<response.length; i++){
        var location = response[i].location;

        if(location){
            heatArray.push([location.coordinates[1], location.coordinates[0]]);
        }
    }

    var heat = L.heatLayer(heatArray, {
        radius: 20,
        blur: 35
    }).addTo(myMap);
});