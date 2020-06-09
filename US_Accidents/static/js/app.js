$(document).ready(function() {   
// Selecting dropdown menus.
    var weatherMenu = $("#selWeather");
    var envMenu = $("#selEnvironment");
    var yearMenu = $("#selYear");
// Due to the nature of the visualizations relating to the environments, using a static list of values.
    var envUniq = ["Bump",
                   "Crossing",
                   "Give_Way",
                   "Junction",
                   "No_Exit",
                   "Railway",
                   "Roundabout",
                   "Station",
                   "Stop",
                   "Traffic_Calming",
                   "Traffic_Signal",
                   "Turning_Loop"];

    $('#selYear').change(function(){
        var year = this.value;
        alert(year);
        if (year == "2016") {

        } else if (year == "2017") {

        } else if (year == "2018") {

        } else if (year == "2019") {

        } else {

        }
    })

    $('#selWeather').change(function(){

    })

    $('#selEnvironment').change(function(){

    })
// Function that can be used to filter arrays by unique values.
    function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
    }
// Using onlyunique function to filter unique values.
    var weatherUniq = $.getJSON("api/weather").filter(onlyUnique);

// Creating option lists using only the unique values.
    for (var i = 0; i < weatherUniq.length; i++){
        var ele = document.createElement("option");
        ele.textContent = weatherUniq[i];
        ele.value = weatherUniq[i];
        weatherMenu.appendChild(ele);
    }
    for (var i = 0; i < envUniq.length; i++){
        var ele = document.createElement("option");
        ele.textContent = envUniq[i];
        ele.value = envUniq[i];
        envMenu.appendChild(ele);
    };

    var usMap = L.map("countryMap", {
        center: [31.51073, -96.4247],
        zoom:13
    });

    L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 10,
        id: "streets-v11",
        accessToken: API_KEY
    }).addTo(usMap);

});