import axios from "axios";
import conf from "../conf/conf";


const getWeather = async (lat, lon) => {
    let weather = {

    }

    // current weather data - free
    const currentWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${conf.openWeatherApiKey}`

    // 5 day weather forecast - free
    const weatherForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${conf.openWeatherApiKey}`

    try {
        const response = await axios.get(currentWeather)
        weather = { ...response.data }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }

    try {
        const response = await axios.get(weatherForecast)
        weather = { ...weather, ...response.data }
    } catch (error) {
        console.error("Error fetching weather forecast:", error);
    }

    // console.log(weather);
    return weather
};


export default getWeather



//     // const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${place.lat}&lon=${place.lon}&exclude=hourly,daily&appid=${openWeatherApiKey}`

//     // Call current weather data - free
//     const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}`

//     // Call hourly forecast data - paid
//     // const url = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${place.lat}&lon=${place.lon}&appid=${openWeatherApiKey}`

//     // 5 day weather forecast - free
//     // const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${place.lat}&lon=${place.lon}&appid=${openWeatherApiKey}`

//     // Current air pollution data - free
//     // const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${place.lat}&lon=${place.lon}&appid=${openWeatherApiKey}`

//     // Forecast air pollution data - free
//     // const url = `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${place.lat}&lon=${place.lon}&appid=${openWeatherApiKey}`

//     // Historical air pollution data - free
//     // const start = '1606488670'
//     // const end = '1606747870'
//     // const url = `http://api.openweathermap.org/data/2.5/air_pollution/history?lat=${place.lat}&lon=${place.lon}&start=${start}&end=${end}&appid=${openWeatherApiKey}`

//     // const date = '2024-08-05'  // `YYYY-MM-DD`
//     // const url = `https://api.openweathermap.org/energy/1.0/solar/data?lat=${place.lat}&lon=${place.lon}&date=${date}&appid=${openWeatherApiKey}`