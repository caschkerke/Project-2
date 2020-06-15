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

    var weaList = []
    
    // Populating dropdown list with weather options
    $.ajax({
        url: '/dropdown',
        type: 'GET',
        dataType: 'json',
        success: function(res){
            for (var i = 0; i < res.length; i++){
                var o = new Option(res[i], res[i]);
                $(o).html(res[i]);
                weatherMenu.append(o)
                weaList.push(o);
            }
        }
    });

    // Initializing blank map on page load.
    var map = L.map('countryMap').setView([38.51073, -96.4247], 5);
    L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "streets-v11",
        accessToken: process.env.API_KEY
        }).addTo(map);

    // menuChange function will take the place of updatePlotly. 
    // When any selection fields register a change, this function will trigger and attempt to update all visualizations based on current selection.
    var menuChange = function(){

        var weather = $('#selWeather').val();
        var env = $('#selEnvironment').val();
        console.log(weather, env)
        
        // map.removeLayer(accidentLocations)

        // Function to create markers based on the response returned from Flask
        function createMarkers(accidentLocations) {
            
            var accidentLocations = [];

            // // defining the values of each dropdown menu as variables.
            // var weather = $('#selWeather').val();
            // var env = $('#selEnvironment').val();

            // calling on Flask for selected weather and environment variables
            $.post('/data', {'weather': weather, 'env': env}, function(response){
                    console.log(response)
                    for (var i = 0; i < response.length; i++){
        
                        var accidentMarker = L.marker([response[i][0], response[i][1]])
                            .bindPopup("<h3>Weather: " + response[i][5] + 
                            "<h3><h3>City: " + response[i][2] + 
                            "<h3><h3>Zipcode: " + response[i][3] + 
                            "<h3><h3>Visibility (mi): " + response[i][4] + 
                            "<h3><h3>Temperature (F): " + response[i][6] + 
                            "<h3><h3>Severity: " + response[i][7] + 
                            "<h3><h3>Time of Accident: " + response[i][8] + "</h3>")
                
                        accidentLocations.push(accidentMarker);
                    }

                    L.layerGroup(accidentLocations).addTo(map)
                }, "json");
        }
        createMarkers();

    // ---- Visualizations based on user selection begin here ---- Still needs work ----
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

        // pie chart for weather distribution
        // var chart = new CanvasJS.Chart("chartContainer", {
        //     animationEnabled: true,
        //     title: {
        //         text: "Desktop Search Engine Market Share - 2016"
        //     },
        //     data: [{
        //         type: "pie",
        //         startAngle: 240,
        //         yValueFormatString: "##0.00\"%\"",
        //         indexLabel: "{label} {y}",
        //         dataPoints: [
        //             {y: 79.45, label: "Google"},
        //             {y: 7.31, label: "Bing"},
        //             {y: 7.06, label: "Baidu"},
        //             {y: 4.91, label: "Yahoo"},
        //             {y: 1.26, label: "Others"}
        //         ]
        //     }]
        // });
        // chart.render();

        // Chart for environment distribution

    }

    // Event listener that will trigger the menuChange function on button click.
    $("button").click(menuChange);
});