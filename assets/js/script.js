
var sbar = $('.form-control')
var searchbutton = $('#basic-addon1')
var WeatherAPI = '599f458e6722253dc1ab98813d04b95b';
var city = ''
var last = $('.last')

//Generate All Previously Searched Citites
Object.keys(localStorage).forEach((key) => {
    var searcheditem = $(`<button class='last'>${key}</button>`)
        console.log(searcheditem)
        $('.searched').append(searcheditem)
   });
//API Fetch, on "click", remove all previous info and retrieve the information typed within the submit box
searchbutton.on('click', function(event){
    event.preventDefault()
    var cardchild = $('.blank-result-card')
    cardchild.remove()
    console.log($('.form-control').val())
    city = $('.form-control').val()

    var apicall = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + WeatherAPI + '&units=imperial';
    console.log(city)
    console.log(apicall)


    fetch(apicall)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            //if the city does not exist within the API database, return error message
            if (data.message === (('city not found') || ('nothing to geocode'))) {
                window.alert("Please type a valid city")
            } 
            //otherwise return all info, add to local storage, and append the search to the searchlist
            else {
            console.log(data)
            setlocal(city)
            $('.searched').append(`<h2 class='last'>${city}</h2>`)
            todaysforecast(data)
            }
        })

    fetch(apicall)
        .then(function (response) {
            return response.json();
        })
        .then (function (data) {
            console.log(data)
            fivedayforcast(data)
        })
    }
)

last.on('click', function(){
    var cardchild = $('.blank-result-card')
    cardchild.remove()
    console.log(this)
    var city = this.html()
    var apicall = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + WeatherAPI + '&units=imperial';
    console.log(city)
    console.log(apicall)


    fetch(apicall)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {      
            console.log(data)
            setlocal(city)
            $('.searched').append(`<button class='last'>${city}</button>`)
            todaysforecast(data)
        })

    fetch(apicall)
        .then(function (response) {
            return response.json();
        })
        .then (function (data) {
            console.log(data)
            fivedayforcast(data)
        })
    }
)


//setting searches to local storage
function setlocal (place) {
    localStorage.setItem(place, place)
}

//adjust todays forecast box
function todaysforecast(today) {
    console.log(today)
    $(".tname").text(`${today.name}`)
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

            var name = $(`<h2 class="name">${(info.list[i].dt_txt).slice(5, 11)}</h2>`)
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


function ftoc (degree) {
 var final = ((degree - 273.15)*(5/9)+32)
 return final
}