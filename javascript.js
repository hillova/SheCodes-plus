let now = new Date();

let currentDay = document.querySelector("h2.date");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let time = now.getHours();
if (time < 10) {
  time = `0${time}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

currentDay.innerHTML = `${day} ${time}:${minutes}`;

function showCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("input");
  let heading = document.querySelector("h1");
  heading.innerHTML = `${inputCity.value}`;
  let apiKey = "9d6be2d6ae989b89ba01f7b622ef3053";
  let city = inputCity.value;
  console.log(city);
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemp);
}

function showTemp(response) {
  let temperature = document.querySelector("#currentTemp");
  temperature.innerHTML = Math.round(response.data.main.temp);
  console.log(temperature);
}

function showTempFa(event) {
  //showTemp.preventDefault();
  let celsToFahr = document.querySelector("span");
  celsToFahr.innerHTML = "66";
}

function showTempCe(event) {
  //showTemp.preventDefault();
  let celsToFahr = document.querySelector("span");
  celsToFahr.innerHTML = "17";
}

function currentLocTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let place = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `Current temperature in ${place} is ${temperature}°C.`;
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "9d6be2d6ae989b89ba01f7b622ef3053";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(currentLocTemp);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getLocation);

let form = document.querySelector("form");
form.addEventListener("submit", showCity);

let switchTempFa = document.querySelector("#fahr");
switchTempFa.addEventListener("click", showTempFa);

let switchTempCe = document.querySelector("#cels");
switchTempCe.addEventListener("click", showTempCe);
