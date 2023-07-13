import React from 'react'
import DailyWeather from './DailyWeather';

const Forecast = ({ forecastData }) => {
  return (
      <DailyWeather forecastData={forecastData} />
  )
}

export default Forecast