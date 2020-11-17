/*jslint browser:true */
'use strict';

var weatherConditions = new XMLHttpRequest();
var weatherForecast = new XMLHttpRequest();
var cObj;
var fObj;

// GET THE CONDITIONS
weatherConditions.open('GET', 'http://api.openweathermap.org/data/2.5/weather?zip=84653,US&appid=efd2ac236bbfe9ce45441d423cbafaf7&units=metric', true);
weatherConditions.responseType = 'text';
weatherConditions.send(null);

weatherConditions.onload = function () {
    if (weatherConditions.status === 200) {
        cObj = JSON.parse(weatherConditions.responseText);
        console.log(cObj);
        document.getElementById('location').innerHTML = cObj.name;
        document.getElementById('weather').innerHTML = cObj.weather[0].description;
        document.getElementById('temperature').innerHTML = cObj.main.temp;
        document.getElementById('desc').innerHTML = "Wind Speed " + cObj.wind.speed;

    } //end if
}; //end function

// <div id="location">City UT</div>
// <div id="weather">Current Conditions</div>
// <div id="temperature">00</div>
// <div id="desc">A mix of clouds</div>








// GET THE FORECARST
weatherForecast.open('GET', 'http://api.openweathermap.org/data/2.5/forecast?zip=84653,US&appid=efd2ac236bbfe9ce45441d423cbafaf7&units=metric', true);
weatherForecast.responseType = 'text';
weatherForecast.send();

weatherForecast.onload = function () {
    if (weatherForecast.status === 200) {
        fObj = JSON.parse(weatherForecast.responseText);
        console.log(fObj);


        let nextWeek = 0;
        for (let i = 0; i < 3; i++) {

            let date = fObj.list[nextWeek].dt_txt.substring(5, 11);
            document.getElementById('r1c1').innerHTML = date;

            var iconCode = fObj.list[nextWeek].weather[0].icon;
            var iconPath = 'http://openweathermap.org/img/w/' + iconCode + '.png';
            document.getElementById('r' + (i + 1) + 'c2').src = iconPath;
            document.getElementById('r' + (i + 1) + 'c3').innerHTML = fObj.list[nextWeek].main.temp_min + "&#176;";
            document.getElementById('r' + (i + 1) + 'c4').innerHTML = fObj.list[nextWeek].main.temp_max + "&#176;";
            nextWeek += 9;
        }

    } //end if
}; //end function


