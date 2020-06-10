// jQuery requires this to be the first registered line in a script in order to function properly. It will essentially initialize the page.
// Took the opportunity to encase all functions within for the sake of functionality and simplicity.
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

    var weatherUniq = $.ajax({
                    type: "GET",
                    url: '/weather/',
                    success: function(data) {
                        console.log(data);
                    }
    });
    
    
// Populating dropdown menus with values from the lists above.
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

// menuChange function will take the place of updatePlotly. 
// When any selection fields register a change, this function will trigger and attempt to update all visualizations based on current selection.
    var menuChange = function(){
        
    // defining the values of each dropdown menu as variables.
        var year = $('#selYear').value;
        var weather = $('#selWeather').value;
        var env = $('#selEnvironment').value;

        $.ajax({
            type: "GET",
            dataType: "json",
            url: '/dataq/',
            data: {
                year: year,
                weather: weather,
                env: env
            },
            success: function(data) {
                console.log(data);
            }
        });
        // If all selection fields are left blank, the US map will simply be a blank map with no data points.
        // This else statement essentially acts as an init function when the page is first loaded as all values are blank by default.
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
        }
        
    // ---- Visualizations based on user selection begin here ---- ~Still needs work~
    // these will need to be coded to be dynamic using the outputs generated from the conditionals above.

        // Responsive US map
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

            var newtry = "https://data.sfgov.org/resource/cuks-n6tp.json?$limit=1000";

            var map = L.map("countryMap", {
                center: [31.51073, -96.4247],
                zoom:13,
                layers: [lightmap, carAccidents]
            });
        
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
    $('#selYear').change(menuChange);
    $('#selWeather').change(menuChange);
    $('#selEnvironment').change(menuChange);

});