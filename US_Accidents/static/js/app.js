// jQuery requires this to be the first registered line in a script in order to function properly. It will essentially initialize the page.
// Took the opportunity to encase all functions within for the sake of functionality and simplicity.
$(document).ready(function() {   

// Selecting dropdown menus.
    var weatherMenu = $("#selWeather");
    var envMenu = $("#selEnvironment");

// Due to the nature of the visualizations relating to the environments, and the fact that the different environments are individual columns, using a static list.

    envList = ["Bump",
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
                "Turning_Loop"]
    for (var i = 0; i < envList.length; i++){
        var o = new Option(envList[i], envList[i]);
        $(o).html(envList[i]);
        envMenu.append(o);
    }
    
    weaList = ['Fair',
        'Mostly Cloudy',
        'Fog',
        'Partly Cloudy',
        'Cloudy',
        'Partly Cloudy / Windy',
        'Light Rain',
        'Wintry Mix',
        'Light Snow',
        'Rain',
        'Haze',
        'Snow',
        'Heavy Rain',
        'Mostly Cloudy / Windy',
        'Patches of Fog',
        'Heavy Snow',
        'Heavy Rain / Windy',
        'Light Drizzle',
        'Light Freezing Rain',
        'Mist',
        'Light Rain / Windy',
        'Showers in the Vicinity',
        'Drizzle',
        'T-Storm',
        'Shallow Fog',
        'Cloudy / Windy',
        'Light Rain Shower',
        'N/A Precipitation',
        'Freezing Rain',
        'Light Rain with Thunder',
        'Rain / Windy',
        'Thunder',
        'Light Snow / Windy',
        'Snow / Windy',
        'Heavy Drizzle',
        'Fair / Windy',
        'Snow and Sleet',
        'Sleet',
        'Heavy T-Storm',
        'Light Drizzle / Windy',
        'Light Freezing Rain / Windy',
        'Light Sleet',
        'Heavy Sleet',
        'Wintry Mix / Windy',
        'Light Snow Shower',
        'Smoke',
        'Drizzle and Fog',
        'T-Storm / Windy',
        'Funnel Cloud',
        'Thunder in the Vicinity',
        'Heavy Snow / Windy',
        'Light Freezing Drizzle',
        'Fog / Windy',
        'Light Snow and Sleet',
        'Light Snow Grains',
        'Thunder / Windy',
        'Haze / Windy',
        'Sand / Dust Whirlwinds',
        'Heavy T-Storm / Windy',
        'Blowing Snow',
        'Blowing Dust',
        'Light Rain Shower / Windy',
        'Small Hail',
        'Squalls / Windy',
        'Blowing Dust / Windy',
        'Drizzle / Windy',
        'Partial Fog / Windy',
        'Light Snow with Thunder',
        'Blowing Snow / Windy',
        'Partial Fog',
        'Rain Shower',
        'Widespread Dust / Windy',
        'Sand / Dust Whirlwinds / Windy',
        'Tornado',
        'Snow and Thunder',
        'Light Snow and Sleet / Windy',
        'Snow and Sleet / Windy',
        'Heavy Snow with Thunder',
        'Thunder / Wintry Mix / Windy',
        'Clear',
        'Overcast',
        'Light Ice Pellets',
        'Scattered Clouds',
        'Light Thunderstorms and Rain',
        'Heavy Thunderstorms and Rain',
        'Thunderstorms and Rain',
        'Light Freezing Fog',
        'Rain Showers',
        'Thunderstorm',
        'Light Thunderstorms and Snow',
        'Widespread Dust',
        'Light Snow Showers',
        'Heavy Blowing Snow',
        'Squalls',
        'Light Rain Showers',
        'Ice Pellets',
        'Low Drifting Snow',
        'Smoke / Windy',
        'Hail',
        'Heavy Freezing Drizzle',
        'Thunder and Hail / Windy']

    for (var i = 0; i < weaList.length; i++){
        var o = new Option(weaList[i], weaList[i]);
        $(o).html(weaList[i]);
        weatherMenu.append(o);
    }

    $.get('/data', function(response) {
            console.log(response);
        }
    );

    function createMap(carAccidents) {

        var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
            maxZoom: 10,
            id: "streets-v11",
            accessToken: API_KEY
        });

        var baseMaps = {
            "Light Map": lightmap
        };

        var overlayMaps = {
            "Car Accidents": carAccidents
        };

        var map = L.map("countryMap", {
            center: [31.51073, -96.4247],
            zoom:13,
            layers: [lightmap, carAccidents]
        });

        L.control.layers(baseMaps, overlayMaps, {
            collapsed: false
        }).addTo(map);
    }
    
    function createMarkers(response) {
            
        var accidentLocations = [];

        for (var index=0; index < response.length; index++) {

            var accidentMarker = L.marker([response.start_lat, response.start_lng])
                .bindPopup("<h3>Weather: " + response.Weather_Condition + 
                "<h3><h3>Severity: " + response.Severity + 
                "<h3><h3>Time of Accident: " + response.Start_Time + "</h3>")

            accidentLocations.push(accidentMarker);
        }

        createMap(L.layerGroup(carAccidents));
    
    }

// menuChange function will take the place of updatePlotly. 
// When any selection fields register a change, this function will trigger and attempt to update all visualizations based on current selection.
    var menuChange = function(){
        
    // defining the values of each dropdown menu as variables.
        var weather = $('#selWeather').value;
        var env = $('#selEnvironment').value;

        $.post('/data',
            {
                weather: weather,
                env: env,
            },
            function(response) {
                console.log(response);
            // maybe start to flatten response for marker work here?
            }
        );
        
        function createMarkers(response) {
            
            var accidentLocations = [];

            for (var index=0; index < response.length; index++) {

                var accidentMarker = L.marker([response.start_lat, response.start_lng])
                    .bindPopup("<h3>Weather: " + response.Weather_Condition + 
                    "<h3><h3>Severity: " + response.Severity + 
                    "<h3><h3>Time of Accident: " + response.Start_Time + "</h3>")

                accidentLocations.push(accidentMarker);
            }

            createMap(L.layerGroup(carAccidents));
        
        }

    createMarkers();
    // ---- Visualizations based on user selection begin here ---- ~Still needs work~
    // these will need to be coded to be dynamic using the outputs generated from the conditionals above.

        // // Heatmap layer for map
        //     $.getJSON(newtry, function(response){
        //         console.log(response);
        //         var heatArray = [];
            
        //         for (var i = 0; i<response.length; i++){
        //             var location = response[i].location;
            
        //             if(location){
        //                 heatArray.push([location.coordinates[1], location.coordinates[0]]);
        //             }
        //         }
            
        //         var heat = L.heatLayer(heatArray, {
        //             radius: 20,
        //             blur: 35
        //         }).addTo(myMap);
        //     });

        //     L.control.layers(baseMaps, overlayMaps, heat, {
        //         collapsed: false
        //     }).addTo(map);

        // Graph of weather distribution

        // Graph of road environment distribution

    }

// Event listeners that will trigger the menuChange function on any selection change.
    $('#selWeather').change(menuChange);
    $('#selEnvironment').change(menuChange);
    createMap();
    createMarkers();
});