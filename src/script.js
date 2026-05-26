const searchInput = document.getElementById("search-input");
const searchIcon = document.getElementById("search-icon");

const inputValidationMessage = document.getElementById("inputValidationMessage")

const weatherContainer = document.getElementById("weather-result");
const loadingSkeleton = document.getElementById("skeleton");

const currentLocation = document.getElementById("location");
const weatherIcon = document.getElementById("weather-icon");
const weatherDescription = document.getElementById("weather-desc");
const temperature = document.getElementById("temperature");
const day = document.getElementById("day");

const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const windSpeed = document.getElementById("wind-speed");



window.addEventListener("load", () => {

 //note that getCurrentPosition has 3 parameters (success callback, error callback and options object)
 if(navigator.geolocation){
  //success callback 
     navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude

      await getWeatherByCoords(lat, lon)
     },
     //error callback
    ()=> {
       //give weather of random city on page load
   getRandomCity()
   console.log("geolocation not supported")
    })
 }

});

//get current location lat and lon coordinates
async function getWeatherByCoords(lat, lon){
  const apiKey = "8038ecd13485738574daee006d794fac";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

  const response = await fetch(url)
  const data = await response.json()

  displayWeather(data)
}

//get random city 
function getRandomCity(){
   const cities = [
  "New York",
  "London",
  "Tokyo",
  "Paris",
  "Sydney",
  "Accra",
  "Lagos",
  "Ouagadougou",
];

  const randomCity = cities[Math.floor(Math.random() * cities.length)];
  getWeather(randomCity);
 

}

//get weather data from api
async function getWeather(city) {
  
  const apiKey = "8038ecd13485738574daee006d794fac";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    //show skeleton while fetching weather data
    let loadingWeather = true;

    if (loadingWeather) {
      weatherContainer.style.display = "none";
      loadingSkeleton.style.display = "flex";
    } 

    validateInput(city)

    const response = await fetch(url);
    const data = await response.json();

    //hide skeleton when data is done fetching
    loadingWeather = false;
    if(!loadingWeather){
      weatherContainer.style.display = "flex";
      loadingSkeleton.style.display = "none";
    }
    

    if (data.cod === "404") {
      currentLocation.textContent = "City not found";
      temperature.textContent = "";
      weatherDescription.textContent = "";
      weatherIcon.src = `https://i.pinimg.com/736x/1e/2a/ab/1e2aab34c103fdaaca4855e283064f5a.jpg`;
      day.textContent = "";
      humidity.textContent = "";
      windSpeed.textContent = "";
      pressure.textContent = "";

      return;
    }

    //display weather when fetch succeeds
    displayWeather(data);

  } catch(e) {
      //console.error("Error fetching weather: ", e);
      currentLocation.textContent = "City not found";
      temperature.textContent = "";
      weatherDescription.textContent = "";
      weatherIcon.src = `https://i.pinimg.com/736x/1e/2a/ab/1e2aab34c103fdaaca4855e283064f5a.jpg`;
      day.textContent = "";
      humidity.textContent = "";
      windSpeed.textContent = "";
      pressure.textContent = "";
  }
}

function displayWeather(data) {
  const today = new Date();
  const weekDay = today.toLocaleDateString("en-US", { weekday: "long" });

  currentLocation.textContent = `${data.name}`;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  day.textContent = `${weekDay}`;
  humidity.innerHTML = `<span class="material-symbols-outlined">
cool_to_dry
</span>Humidity <br/> ${data.main.humidity}%`;
  windSpeed.innerHTML = `<span class="material-symbols-outlined">
air
</span>Wind Speed <br/> ${data.wind.speed} m/s`;
  pressure.innerHTML = `<span class="material-symbols-outlined">
compare_arrows
</span>Pressure <br/> ${data.main.pressure} hPa`;
}

function validateInput(input){
  if(input === ""){
    inputValidationMessage.classList.remove("invisible")
    inputValidationMessage.textContent = "Please enter a city name"
    //console.log(inputValidationMessage.innerText)
    return
  }

  if(!/^[a-zA-Z]+$/.test(input)){
    inputValidationMessage.classList.remove("invisible")
    inputValidationMessage.textContent = "Please enter a valid city name"
   // console.log(inputValidationMessage.innerText)
    return
  }

  if(input.length < 3){
    inputValidationMessage.classList.remove("invisible")
    inputValidationMessage.textContent = "Please enter a valid city name"
    //console.log(inputValidationMessage.innerText)
    return
  }

  inputValidationMessage.classList.add("invisible")
  //console.log(inputValidationMessage.innerText)
}

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = e.target.value;


    getWeather(city);
    searchInput.value = "";
  }
});
