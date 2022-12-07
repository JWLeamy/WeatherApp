//STEP BY STEP REMAINING TASKS

// 1. Somehow obtain user input

// 2. make varibale 'city' equal user input

// 3. fetch all neccesary data in API for the user input, create different elements
//    that store this data, and append them to main page when hitting 'submit' button.

// 4. make everything look pretty with css adjustments and possible icons
var sbar = $('.form-control')
var searchbutton = $('#basic-addon1')
var WeatherAPI = '599f458e6722253dc1ab98813d04b95b';
var city = ''

searchbutton.on('click', function(event){
    event.preventDefault()
    console.log($('.form-control').val())
    city = $('.form-control').val()

    var apicall = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + WeatherAPI;
    console.log(city)
    console.log(apicall)

fetch(apicall)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        todaysforecast(data)
    })

fetch(apicall)
    .then(function (response) {
        return response.json();
    })
    .then (function (data) {
        fivedayforcast(data)
    })
})

function todaysforecast(today) {
    $(".tname").text(`${today.name}`)
    $(".ttempt").text(`Temp: ${today.main.temp}°F`)
    $(".twind").text(`Wind: ${today.wind.speed} MPH`)
    $(".thumidity").text(`Humidity: ${today.main.humidity} %`)
}

function fivedayforcast(fiveday) {
    var fivedayAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${fiveday.coord.lat}&lon=${fiveday.coord.lon}&appid=${WeatherAPI}`
    fetch(fivedayAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
        })
    }

function fivedaycard(info) {
    
}
//temp
//wind
//humidity
//variable that stores my personal API key