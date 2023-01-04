## Description

A basic weather application that provides weather conditions suuch as tempurature, humidity, and wind speed for any given city. 



https://user-images.githubusercontent.com/111401066/210025805-56de6004-5bd7-49b4-bd7a-20c1674bc860.mp4




# WeatherApp

AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly

## Acceptance Criteria

GIVEN a weather dashboard with form inputs <br>
WHEN I search for a city <br>
THEN I am presented with current and future conditions for that city and that city is added to the search history <br>
WHEN I view current weather conditions for that city <br>
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed <br>
WHEN I view future weather conditions for that city <br>
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity <br>
WHEN I click on a city in the search history <br>
THEN I am again presented with current and future conditions for that city


## Technologies Used
1. HTML - used to create and structure the given webpage
2. CSS - used to modify the presentation and style of the given webpage
3. Git - used to clone down the original code prior to making modifications
4. Github - used to create this repository, modify and eventually commit each change made, and ultimately deploy the fully edited webpage
5. Javascript - used to render weather data based off specified input
6. Weather API - https://openweathermap.org/forecast5

## Code Snippet
```
//adjust todays forecast box
function todaysforecast(today) {
    console.log(today)
    var iconcode = today.weather[0].icon
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    $(".tname").html(`${today.name}` + `<img class='iconimg' src=${iconurl}>`)
    $(".ttempt").text(`Temp: ${today.main.temp}°F`)
    $(".twind").text(`Wind: ${today.wind.speed} MPH`)
    $(".thumidity").text(`Humidity: ${today.main.humidity} %`)
}

//adjust the 5 day forecast
function fivedayforcast(fiveday) {
    var fivedayAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${fiveday.coord.lat}&lon=${fiveday.coord.lon}&appid=${WeatherAPI}&units=imperial`
    fetch(fivedayAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            console.log(data.city.name)
            fivedaycard(data)
        })
    }

//retrieves data over the next five days for the weather at 4pm
var cardcon = $('#card')
function fivedaycard(info) {
    $('.fivehead').html("5 Day Forecast:")
    for (var i = 0; i < 40; i++) {
        if (i == 5 || i == 13 || i == 21 || i == 29 || i == 37) {
            var blankResultCard = $('<div class="blank-result-card"></div>');

            var iconcode = info.list[i].weather[0].icon
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

            var name = $(`<h2 class="name">${(info.list[i].dt_txt).slice(5, 11)}<img class='iconimg' src=${iconurl}> </h2>`)
            console.log(info.list[i].dt_text)
            blankResultCard.append(name)

            var temp = $(`<p class="tempt">Temp: ${info.list[i].main.temp}°F</p>`)
            console.log(temp)
            blankResultCard.append(temp)
            
            var wind = $(`<p class="wind">Wind: ${info.list[i].wind.speed} MPH</p>`)
            console.log(wind)
            blankResultCard.append(wind)
            
            var humidity = $(`<p class="humidity"> Humidity: ${info.list[i].main.humidity} %</p>`)
            blankResultCard.append(humidity)

            cardcon.append(blankResultCard)

            console.log(blankResultCard)
        }
    }
}
```