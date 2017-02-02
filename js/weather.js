/* weather.js - Primary JavaScript for Fantastic Weather */

var geoData = {};
var metric;

/* PAGE FUNCTIONS */

//GET THE METRIC/IMPERIAL PREFERENCE
function isMetric() {
    //CHECK TO SEE IF LOCAL STORAGE IS SUPPORTED
    if (typeof(Storage) !== "undefined") {
        //CHECK TO SEE IF A PREFERENCE HAS BEEN PREVIOUSLY SET
        if (localStorage.fantasticWeatherUseMetric !== undefined) {
            //GUARD AGAINST LOCALSTORAGES THAT DO NOT STORE BOOLEAN VALUES
            if (localStorage.fantasticWeatherUseMetric === "true") {
                return true;
            }
            else if (localStorage.fantasticWeatherUseMetric === "false") {
                return false;
            }

            return localStorage.fantasticWeatherUseMetric;
        }
    }

    //DEFAULT TO METRIC
    return true;
}

//SWITCH UNITS
function setUnits(unit, temp) {
    var metric = unit; //Entirely unnecessary, but reads better in the if/else statement

    localStorage.fantasticWeatherUseMetric = metric ? true : false;

    toggleButtons(unit);
    setTemperature(unit, temp);
}

//TOGGLE THE UNIT SWITCH BUTTONS
function toggleButtons(metric) {
    var btnMetric = document.getElementsByClassName('metric')[0];
    var btnImperial = document.getElementsByClassName('imperial')[0];

    if (!metric) {
        btnMetric.style.display = 'inline-block';
        btnImperial.style.display = 'none';
    }
    else {
        btnMetric.style.display = 'none';
        btnImperial.style.display = 'inline-block';
    }
}

//SWITCH OFF THE LOADER WHEN THE GEO DATA IS READY
function contentLoaded(data, location) {
    var temp = data["currently"]["temperature"];
    metric = isMetric();
    populatePage(data, location);

    document.getElementById("loader").style.display = "none";
    document.getElementById("body").classList.add("site");
    document.getElementById("fantasticWeather").style.display = "block";
    document.getElementById("footer").style.display = "block";

    //APPLY CLICK EVENTS TO THE TOGGLE BUTTONS
    var btnMetric = document.getElementsByClassName('metric')[0];
    var btnImperial = document.getElementsByClassName('imperial')[0];

    if (addEventListener) {
        btnMetric.addEventListener("click", function() {
            setUnits(true, temp);
        }, false);

        btnImperial.addEventListener("click", function() {
            setUnits(false, temp);
        }, false);
    }
    else {
        btnMetric.appendevent("onclick", function() {
            setUnits(true, temp);
        });

        btnImperial.appendevent("onclick", function() {
            setUnits(false, temp);
        });
    }
}


/* WEATHER FUNCTIONS */

//GET THE APPROPRIATE WEATHER OBJECT, BASED ON THE TEMPERATURE
function getWeatherInfo(temp) {
    for (var i = 0; i < weatherFeedback.length; i++) {
        if (temp >= weatherFeedback[i]["min-temp"] && temp < weatherFeedback[i]["max-temp"]) {
            return weatherFeedback[i];
        }
    }
}

//GET THE CURRENT LATITUDE AND LONGITUDE
function getGeoData(position) {
    geoData.lat = position.coords.latitude;
    geoData.lon = position.coords.longitude;

    callApi(geoData.lat, geoData.lon);
}

//CAPITALISE WEATHER TITLE ATTRIBUTE
function capitalise(str) {
    var arr = str.split(' ');

    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1, arr[i].length);
    }

    return arr.join(' ');
}

// First call the Google Maps API in order to obtain the user's location, then call the Dark Sky API to get weather info
function callApi(lat, lon) {
    console.log("You are at: " + lat + ", " + lon);
    var googleAPI = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon + '&sensor=false';

    $.ajax({
        url: googleAPI,
        type: 'GET',
        success: function(data) {
            var loc = data.results[0]["address_components"][2]["long_name"];
            callWeatherAPI(lat, lon, loc);
        },
        error: function(err) {
            callWeatherAPI(lat, lon, 'Location Unavailable');
        }
    });
}

var callWeatherAPI = function callWeatherAPI(lat, lon, location) {
    var apiKey = "3cc258eb89fd9688bf0d783aab428b18/";
    var query = '?units=si';
    var apiCall = "https://api.darksky.net/forecast/" + apiKey + lat + ',' + lon + query;

    $.ajax({
        url: apiCall,
        type: 'GET',
        dataType: 'jsonp',
        success: function(data) {
            console.log('Data loaded successfully');
            contentLoaded(data, location);
        },
        error: function(err) {
            console.log('Failed to load weather data');
            console.log(err);
        }
    });
}

//WIND DIRECTION ROTATE
var transformProp = (function() {
    var testEl = document.createElement("div");

    if (testEl.style.transform == null) {
        var vendors = ["Webkit", "Moz", "ms"];

        for (var vendor in vendors) {
            if (testEl.style[ vendors[vendor] + "Transform" ] !== undefined) {
                return vendors[vendor] + "Transform";
            }
        }
    }

    return "transform";
})();

//CELCIUS TO FEHRENHEIT CONVERSION
function toFahrenheit(temp) {
    return (temp * 1.8) + 32;
}

//SET THE TEMPERATURE BASED UPON THE CHOSEN UNIT OF MEASURE
function setTemperature(metric, temp) {
    var temperature = document.getElementById("temperature");

    if (metric) {
        temperature.textContent = Math.round(temp * 10) / 10 + "\u00b0" + "C";
    }
    else {
        temperature.textContent = Math.round(toFahrenheit(temp) * 10) / 10 + "\u00b0" + "F";
    }
}

//WRITE THE GEO-DATA TO THE PAGE
function populatePage(data, loc) {
    var current = data["currently"];

    var section = document.getElementById("fantasticWeather");
    var location = document.getElementById("location");
    var wind = document.getElementById("wind");
    var conditions = document.getElementById("conditions");

    var weatherInfo = getWeatherInfo(current["temperature"]);
    var comment = document.getElementById("comment");
    var monster = document.getElementById("creatureWarning");
    var portrait = document.getElementById("creaturePortrait");

    location.textContent = loc;

    setUnits(metric, current["temperature"]);

    wind.childNodes[3].textContent = Math.round(current["windSpeed"]) + "mph";
    wind.childNodes[1].style[transformProp] = "rotate(" + current["windBearing"] + "deg)";

    conditions.setAttribute("src", "/img/icons/" + current["icon"] + ".png");
    conditions.setAttribute("alt", current["summary"]);
    conditions.setAttribute("title", capitalise(current["summary"]));

    comment.textContent = weatherInfo["comment"];
    monster.textContent = weatherInfo["warning"];

    section.style.backgroundImage = "url(img/backgrounds/" + weatherInfo["background"] + ")";
    section.style.backgroundSize = "cover";

    if (weatherInfo["creature"] !== null) {
        portrait.setAttribute("src", "img/creatures/" + weatherInfo["creature"]);
    }
}


/* ACTUAL RUNNING CODE */

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        getGeoData(position);
    });
}
