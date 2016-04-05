/* weather.js - Primary JavaScript for Fantastic Weather */

var json;
var geoData = {};

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
    var apiCall = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=" + apiKey;

    $.getJSON(apiCall, function(data) {
        json = data;
        console.log("Returning data...");
        console.log(JSON.stringify(data));
    });
}

//WRITE THE GEO-DATA TO THE PAGE
function populatePage() {
    var pageLat = document.getElementById('lat');
    var pageLon = document.getElementById('lon');
    var pageLoc = document.getElementById('loc');
    
    pageLat.textContent = geoData.lat;
    pageLon.textContent = geoData.lon;
    pageLoc.textContent = json.name;
}

if (navigator.geolocation) {    
    navigator.geolocation.getCurrentPosition(function(position) {
        getGeoData(position);
    });
}

if (addEventListener) {
    document.getElementById('weatherMe').addEventListener('click', populatePage, false);
}
else {
    document.getElementById('weatherMe').attachEvent('onclick', populatePage);
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
