$(document).ready(function() {   

// Selecting dropdown menus.
    var weatherMenu = $("#selWeather");
    var envMenu = $("#selEnvironment");

// Function that can be used to filter arrays by unique values.
    function onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
    }

// Due to the nature of the visualizations relating to the environments, and the fact that the different environments are individual columns, using a static list.
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

// Using onlyunique function to filter unique values.
    var weatherUniq = $.getJSON("/api/weather").filter(onlyUnique);
    
// Populating dropdown menus with values.
    for (var i = 0; i < weatherUniq.length; i++){
        var ele = document.createElement("option");
        ele.textContent = weatherUniq[i];
        ele.value = weatherUniq[i];
        weatherMenu.appendChild(ele);
    };

    for (var i = 0; i < envUniq.length; i++){
        var ele = document.createElement("option");
        ele.textContent = envUniq[i];
        ele.value = envUniq[i];
        envMenu.appendChild(ele);
    };

    var menuChange = function(){
        
        var year = $('#selYear').value;
        var weather = $('#selWeather').value;
        var env = $('#selEnvironment').value;

        if (year == "2016") {
            var data = $.getJSON("/api/data2016");
            if ( weather == ) {

            } else {

            }
            if ( env == ) {

            } else {

            }
        } else if (year == "2017") {
            var data = $.getJSON("/api/data2017");
            if ( weather == ) {

            } else {

            }
            if ( env == ) {

            } else {
                
            }
        } else if (year == "2018") {
            var data = $.getJSON("/api/data2018");
            if ( weather == ) {

            } else {

            }
            if ( env == ) {

            } else {
                
            }
        } else if (year == "2019") {
            var data = $.getJSON("/api/data2019");
            if ( weather == ) {

            } else {

            }
            if ( env == ) {

            } else {
                
            }
        } else {
        
        }
        
    }

    $('#selYear').change(menuChange);
    $('#selWeather').change(menuChange);
    $('#selEnvironment').change(menuChange);

// ---- Visualization creation begins here ----

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