"use strict";
var weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let key = `66bc1a87c7474259892190837232702`;
async function getWeatherData() {
  let res = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=London&days=3`
  );
  let finalRes = await res.json();

  displayWeather(finalRes);

  let searchButton = document.getElementById("findLocationInput");
  searchButton.addEventListener("keyup", async function () {
    if (this.value.length > 2) {
      res = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${this.value}&days=3`
      );
      finalRes = await res.json();
      displayWeather(finalRes);
    }
  });
}

getWeatherData();

function displayWeather(forecastArray) {
  displayCurrentDay(
    forecastArray.forecast.forecastday[0],
    forecastArray.location.name
  );

  let nextDayHtmlElements = document.getElementById("nextDayData").children;
  let dayafterTomorrowElements =
    document.getElementById("dayAfterTomorrow").children;

  let forecastDays = document.querySelectorAll(".forecast-day");

  displayFollowingDays(
    forecastDays[0],
    forecastArray.forecast.forecastday[1],
    nextDayHtmlElements
  );
  displayFollowingDays(
    forecastDays[1],
    forecastArray.forecast.forecastday[2],
    dayafterTomorrowElements
  );
}
function displayCurrentDay(currentDay, location) {
  const date = new Date(currentDay.date);
  let weekDay = document.getElementById("currentDay");
  let currentDate = document.getElementById("currentDate");
  let currentLocation = document.getElementById("location");
  let temprature = document.getElementById("currentTemp");
  let currentWeatherIcon = document.getElementById("currentWeatherIcon");
  let currentWeatherStatus = document.getElementById("currentWeatherStatus");
  weekDay.innerHTML = weekday[date.getDay()];
  currentDate.innerHTML =
    date.getDate(currentDay.date) + month[date.getMonth(currentDay.date)];
  currentLocation.innerHTML = location;
  temprature.innerHTML = currentDay.day.avgtemp_c + "°c";
  currentWeatherIcon.setAttribute("src", currentDay.day.condition.icon);
  currentWeatherStatus.innerHTML = currentDay.day.condition.text;
}

function displayFollowingDays(day, dayData, dayHtmlElements) {
  const d = new Date(dayData.date);
  day.innerHTML = weekday[d.getDay(dayData.date)];
  dayHtmlElements[0].setAttribute("src", dayData.day.condition.icon);

  dayHtmlElements[1].innerHTML = dayData.day.avgtemp_c + "°c";
  dayHtmlElements[2].innerHTML = dayData.day.condition.text;
}
