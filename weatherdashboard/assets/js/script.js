var searchEl = document.getElementById("searchButton")
var inputEl = document.getElementById("searchTermInput")
var searchTerm = ""
var searchHistory = []
    if (localStorage.getItem("searchHistory")){
        searchHistory = JSON.parse(localStorage.getItem("searchHistory"))
    }
var currentLocation;

// USER INPUT GOT CITY 
searchEl.addEventListener("click", function(){
    event.preventDefault();
    searchTerm=inputEl.value;
    var newSearchTerm = inputEl.value;
    searchHistory.push(newSearchTerm);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    getWeather();
    displaySearchHistory();
})


var getWeather = function () {
    // CURRENT WEATHER FOR INPUTED CITY 
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=03b8660b3c0063cd9b89194405afe9d0&units=imperial`)
        .then(function(response){
            return response.json();
        })
        .then(function(response){

            // INPUTED CITY 
            document.getElementById("cityName").innerHTML = `${searchTerm}`
            var cityNameEl = document.createElement('p');
            cityNameEl.textContent=searchTerm

            // WEATHER ICON
            var currentPicEl = document.querySelector("#icon");
            var iconId = response.weather[0].icon
            currentPicEl.setAttribute("src", `http://openweathermap.org/img/wn/${iconId}@2x.png`);

            // CURRENT TEMP
            var currentTemp = response.main.temp;
            document.getElementById("temperature").innerHTML = `Temperature: ${currentTemp}`
            var tempEl = document.createElement('p');
            tempEl.textContent=currentTemp

            // CURRENTY HUMIDITY
            var currentHumidity = response.main.humidity
            document.getElementById("humidity").innerHTML = `Humidity: ${currentHumidity}`
            var humidityEl = document.createElement('p');
            humidityEl.textContent=currentHumidity

            // WINDSPEED
            var currentWindspeed = response.wind.speed
            document.getElementById("windspeed").innerHTML = `Windspeed: ${currentWindspeed}`
            var windspeedEl = document.createElement('p');
            windspeedEl.textContent=currentWindspeed
        })
        .catch(function(error){
            console.log(error);
            
        })

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&appid=03b8660b3c0063cd9b89194405afe9d0&units=imperial
    `)
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        console.log(response)

        // HIGH FOR EACH DAY
        for (i=0; i<response.list.length; i+=8){
          var colEl=document.createElement("div")
          colEl.className="col-4"

          var newCardEl = document.createElement('div');
          newCardEl.className="card";
          var date = JSON.stringify(response.list[i].dt_txt);
          var dateSplit = date.split(" ");
          var dateFinal = dateSplit[0];
          var dateEl = document.createElement('p');
          dateEl.textContent=dateFinal;
          newCardEl.appendChild(dateEl);

          // TEMP FOR DAY
          var tempEl = document.createElement('p');
          var temp = response.list[i].main.temp
          tempEl.textContent = `Temp: ${temp}`
          newCardEl.appendChild(tempEl);
          
          // HUMIDITY
          var humidityEl = document.createElement('p');
          var humidity = response.list[i].main.humidity
          humidityEl.textContent=`Humidity: ${humidity}`;
          newCardEl.appendChild(humidityEl);

          colEl.appendChild(newCardEl);
          document.querySelector('#forcastCardHolder').appendChild(colEl);
      }

  })
  .catch(function(error){
      console.log(error);
      
  })

}