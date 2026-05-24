const searchInput = document.getElementById("search-input");
const searchIcon = document.getElementById("search-icon");
const currentLocation = document.getElementById("location");
const weatherIcon = document.getElementById("weather-icon");
const weatherDescription = document.getElementById("weather-desc");
const temperature = document.getElementById("temperature");
const day = document.getElementById("day");

const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const windSpeed = document.getElementById("wind-speed");

//give weather of random city on page load
const cities = ["New York", "London", "Tokyo", "Paris", "Sydney", "Accra", "Lagos", "Ouagadougou"];

window.addEventListener("load", () => {
    const randomCity = cities[Math.floor(Math.random() * cities.length)]
    getWeather(randomCity)
})

async function getWeather(city) {
  const apiKey = "8038ecd13485738574daee006d794fac";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      currentLocation.textContent = "City not found";
      temperature.textContent = "";
      weatherDescription.textContent = "";
      weatherIcon.src = "";
      day.textContent = "";
      humidity.textContent = "";
      windSpeed.textContent = "";
      pressure.textContent = "";

      return;
    }

    //display weather when fetch succeeds
    displayWeather(data);
  } catch (e) {
    console.error("Error fetching weather: ", e);
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

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = e.target.value;
    getWeather(city);
    searchInput.value = "";
  }
});
