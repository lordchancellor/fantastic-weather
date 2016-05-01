/* weather.js - Primary JavaScript for Fantastic Weather */

var json;
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
function setUnits(unit) {
    var metric = unit; //Entirely unnecessary, but reads better in the if/else statement

    if (metric) {
        localStorage.fantasticWeatherUseMetric = true;
    }
    else {
        localStorage.fantasticWeatherUseMetric = false;
    }

    toggleButtons(unit);
    setTemperature(unit);
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
function contentLoaded() {
    metric = isMetric();
    populatePage();

    document.getElementById("loader").style.display = "none";
    document.getElementById("body").classList.add("site");
    document.getElementById("fantasticWeather").style.display = "block";
    document.getElementById("footer").style.display = "block";

    //APPLY CLICK EVENTS TO THE TOGGLE BUTTONS
    var btnMetric = document.getElementsByClassName('metric')[0];
    var btnImperial = document.getElementsByClassName('imperial')[0];

    if (addEventListener) {
        btnMetric.addEventListener("click", function() {
            setUnits(true);
        }, false);

        btnImperial.addEventListener("click", function() {
            setUnits(false);
        }, false);
    }
    else {
        btnMetric.appendevent("onclick", function() {
            setUnits(true);
        });

        btnImperial.appendevent("onclick", function() {
            setUnits(false);
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

//CALL THE OPEN WEATHER API AND STORE THE RESULTS IN THE JSON VARIABLE
function callApi(lat, lon) {
    console.log("You are at: " + lat + ", " + lon);
    var apiKey = "1625f9ff65d8544701fddfd57eef8846";
    var apiCall = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&APPID=" + apiKey;

    $.getJSON(apiCall, function(data) {
        json = data;
        console.log("Returning data...");
        console.log(JSON.stringify(data));
        contentLoaded();
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
function setTemperature(metric) {
    var temperature = document.getElementById("temperature");

    if (metric) {
        temperature.textContent = Math.round(json.main.temp * 10) / 10 + "\u00b0" + "C";
    }
    else {
        temperature.textContent = Math.round(toFahrenheit(json.main.temp) * 10) / 10 + "\u00b0" + "F";
    }
}

//WRITE THE GEO-DATA TO THE PAGE
function populatePage() {
    var section = document.getElementById("fantasticWeather");
    var location = document.getElementById("location");
    var wind = document.getElementById("wind");
    var conditions = document.getElementById("conditions");

    var weatherInfo = getWeatherInfo(json.main.temp);
    var comment = document.getElementById("comment");
    var monster = document.getElementById("creatureWarning");
    var portrait = document.getElementById("creaturePortrait");

    location.textContent = json.name;

    setUnits(metric);

    wind.childNodes[3].textContent = Math.round(json.wind.speed) + "mph";
    wind.childNodes[1].style[transformProp] = "rotate(" + json.wind.deg + "deg)";

    conditions.setAttribute("src", "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
    conditions.setAttribute("alt", json.weather[0].description);
    conditions.setAttribute("title", capitalise(json.weather[0].description));

    comment.textContent = weatherInfo["comment"];
    monster.textContent = weatherInfo["warning"];

    //section.style.background = "linear-gradient(rgba(255, 0, 0, 0.1), rgba(255, 0, 0, 0.1)), url(img/backgrounds/" + weatherInfo["background"] + ")";
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
