$(document).ready(function() {   
// Assigning dataset variables.
    var dataFirst = $.getJSON("database_2016.json");
    var dataSecond = $.getJSON("database_2017.json");
    var dataThird = $.getJSON("database_2018.json");
    var dataFourth = $.getJSON("database_2019.json");
// Selecting dropdown menus.
    var weatherMenu = $("#selWeather");
    var envMenu = $("#selEnvironment");
// Creating empty lists to hold weather and environment values.
    var weatherAll = [];
    var envAll = [];
// Using onlyunique function to filter unique values.
    var weatherUniq = weatherAll.filter(onlyUnique);
    var envUniq = envAll.filter(onlyUnique);

// Pulling every weather and environment entry from each year.
    for (var i = 0; i < dataFirst.length; i++){
        var weather = dataFirst[i].weather;
        var env = dataFirst[i].environment;
        weatherAll.push(weather);
        envAll.push(env);
    }
    for (var i = 0; i < dataSecond.length; i++){
        var weather = dataSecond[i].weather;
        var env = dataSecond[i].environment;
        weatherAll.push(weather);
        envAll.push(env);
    }
    for (var i = 0; i < dataThird.length; i++){
        var weather = dataThird[i].weather;
        var env = dataThird[i].environment;
        weatherAll.push(weather);
        envAll.push(env);
    }
    for (var i = 0; i < dataFourth.length; i++){
        var weather = dataFourth[i].weather;
        var env = dataFourth[i].environment;
        weatherAll.push(weather);
        envAll.push(env);
    }

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

    $("#selYear").change(updatePlotly())
    $("#selWeather").change(updatePlotly())
    $("#selEnvironment").change(updatePlotly())

});

// Function that can be used to filter arrays by unique values.
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function updatePlotly() {
    
    var dataFirst = $.getJSON("database_2016.json");
    var dataSecond = $.getJSON("database_2017.json");
    var dataThird = $.getJSON("database_2018.json");
    var dataFourth = $.getJSON("database_2019.json");
    var selectedYear = $("#selYear").val();
    var selectedWeather = $("#selWeather").val();
    var selectedEnv = $("#selEnvironment").val();

    console.log(dataFirst)

    // ---- If needed ----
    // var emptylist = [];
    // var emptylist2 = [];
    // var emptylistEtc = [];

    // for (var i = 0; i < 1; i++);
}