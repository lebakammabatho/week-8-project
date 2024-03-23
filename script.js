function updateWeather({ data }) {
  let { temperature, condition, wind, time } = data;
  let weatherValueElement = document.querySelector("#weather-value");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(time * 1000);
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = condition.description;
  weatherValueElement.innerHTML = Math.round(temperature.current);
  humidityElement.innerHTML = `${temperature.humidity}%`;
  windElement.innerHTML = `${wind.speed}Km/h`;
}
function formatDate(date) {
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "d059510f0t7f54boed6ea43f3f206f9c";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let weatherAppCityElement = document.querySelector("#weather-app-city");
  weatherAppCityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[date.getDay()];
}

function getForecast(city){
    let apiKey = "d059510f0t7f54boed6ea43f3f206f9c";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast);

}

function displayForecast(response)    
{ 
    let forecastHtml = "";
    console.log(response.data);

    let forecastElement = document.querySelector("#forecast"); 
    
    response.data.daily.forEach(function(day, index) 
    { 
        if(index < 5) {
        forecastHtml += 
        `<div class="row"> 
        <div class="col-2">
         <div class="weather-forecast-date">${formatDay(day.time)}</div> 
         <img src="${day.condition.icon_url}" />
         <br> <div class="weather-forecast-temperatures"> 
         <span class="weather-forecast-temperatures-max">
         <strong>${Math.round(day.temperature.maximum)}°</strong></span>
          <span class="weather-forecast-temperatures-min">${Math.round(day.temperature.minimum)}°</span> 
          </div> 
          </div> 
          </div>`;
 } }); 
          forecastElement.innerHTML = forecastHtml; }

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Pretoria");

getForecast("Pretoria")
