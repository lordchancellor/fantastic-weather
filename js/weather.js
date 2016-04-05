/* weather.js - Primary JavaScript for Fantastic Weather */

var json;
var geoData = {};

//SWITCH OFF THE LOADER WHEN THE GEO DATA IS READY
function contentLoaded() {
    populatePage();
    
    document.getElementById("loader").style.display = "none";
    document.getElementById("body").classList.add("site");
    document.getElementById("fantasticWeather").style.display = "block";
    document.getElementById("footer").style.display = "block";
}

//GET THE CURRENT LATITUDE AND LONGITUDE
function getGeoData(position) {
    geoData.lat = position.coords.latitude;
    geoData.lon = position.coords.longitude;
    
    callApi(geoData.lat, geoData.lon);
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

//WRITE THE GEO-DATA TO THE PAGE
function populatePage() {
    var location = document.getElementById("location");
    var temperature = document.getElementById("temperature");
    var wind = document.getElementById("wind");
    var conditions = document.getElementById("conditions");
    
    location.textContent = json.name;
    temperature.textContent = Math.round(json.main.temp * 10) / 10 + "\u2103";
    
    wind.childNodes[3].textContent = Math.round(json.wind.speed) + "mph";
    wind.childNodes[1].style[transformProp] = "rotate(" + json.wind.deg + "deg)";
    
    conditions.setAttribute("src", "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
    conditions.setAttribute("alt", json.weather[0].description);
    conditions.setAttribute("title", json.weather[0].description);
}

if (navigator.geolocation) {    
    navigator.geolocation.getCurrentPosition(function(position) {
        getGeoData(position);
    });
}



/*
function getLocation() {
    console.log("You are at: " + lat + ", " + long);
    var apiCall = "api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&APPID=1625f9ff65d8544701fddfd57eef8846";
    console.log("Calling API with: ");
    console.log(apiCall);

    var request = new XMLHttpRequest();
    request.open('GET', apiCall, true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            //Success!
            var data = JSON.parse(request.responseText);
        }
        else {
            //We reached our target server, but it returned an error
            console.error("Nope");
        }
    };

    request.onerror = function() {
        //There was a connection error of some sort
        console.error("Couldn't establish a connection");
    };

    request.send();
    return data;
}
*/
