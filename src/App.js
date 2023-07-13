import './App.css';
import { useState } from 'react';
import Home from './components/home.jsx';
import CurrentWeather from './components//CurrentWeather.jsx'
import { fetchWeather } from './api/WeatherService.js'
import { formattedWeatherData } from './formats/format.js';

function App() {
  const [currentData, setCurrentData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  const handleSearchChange = async (cityInfo) => {
    const [lat, lon] = cityInfo.location.split(" ") 
    if(cityInfo.unit === undefined) { cityInfo.unit = "metric"}
    const weatherData = await fetchWeather(lat, lon, cityInfo.unit, "current");
    const currentD = formattedWeatherData(weatherData, "current")
    setCurrentData({currentD, cityInfo})
    const forecastD = formattedWeatherData(weatherData, "daily")
    setForecastData({forecastD, cityInfo})
  }
  
  return (
    <div>
      <Home errorInfo searchInfo={handleSearchChange} />
      {currentData && 
      <CurrentWeather currentData={currentData} searchInfo ={handleSearchChange} forecastData={forecastData} />
      }
      {/* {forecastData && <Forecast forecastData={forecastData} />} */}
    </div>
  )
}

export default App; 