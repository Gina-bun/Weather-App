

async function getWeather(city){
    const apiKey = "8038ecd13485738574daee006d794fac"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    try {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
    } 
    catch (e) {
        console.error("Error in data fetching: ", e)
    }
}

getWeather("Accra")