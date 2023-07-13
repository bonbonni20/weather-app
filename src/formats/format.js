import cloudy from '../assets/cloudyweather-bg.png'
import rain from '../assets/rainyweather-bg.png'
import snow from '../assets/snowweather-bg.png'
import clear from '../assets/sunnyweather-bg.png'

const formattedWeatherData = (weatherData, type) => {
    if (type === "current") {
        const weatherD = weatherData.current;
        return {
            dt: weatherD.dt,
            temp: roundUpTemperature(weatherD.temp),
            feels_like: roundUpTemperature(weatherD.feels_like),
            clouds: roundUpTemperature(weatherD.clouds),
            humidity: roundUpTemperature(weatherD.humidity),
            wind: roundUpTemperature(weatherD.wind_speed),
            descrip: weatherD.weather[0].description,
            icon: formatWeatherIcon(weatherD.weather[0].icon),
            bg: includeBack(weatherD.weather[0].main)
        }
    }
    else if (type === "daily") {
        const weather = weatherData.daily;
        return weather.slice(1).map(weatherD => {
        return {
                dt: weatherD.dt,
                min: roundUpTemperature(weatherD.temp.min),
                max: roundUpTemperature(weatherD.temp.max),
                clouds: roundUpTemperature(weatherD.clouds),
                humidity: roundUpTemperature(weatherD.humidity),
                wind: roundUpTemperature(weatherD.wind_speed),
                descrip: weatherD.weather[0].description,
                icon: formatWeatherIcon(weatherD.weather[0].icon),
                bg: includeBack(weatherD.weather[0].main)
            }
        })      
    }
}

const roundUpTemperature = (temp) => {
    return Math.round(temp)
}

const includeBack = (weather) => {
    if (weather === "Clear") {
        return (clear)
    }
    else if (weather === "Clouds") {
        return (cloudy)
    }
    else if (weather === "Rain") {
        return (rain)
    }
    else if (weather === "Snow") {
        return (snow)
    }
    else{
        return (clear)
    }
}

const formatWeatherIcon = (iconVal) => { return iconVal + "@2x.png" }

export { formattedWeatherData }