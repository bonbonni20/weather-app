import axios from 'axios';

const fetchWeather = async (lat, lon, unit, type) => {
    const weatherData = await axios.get(`${process.env.REACT_APP_ONE_CALL}lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${process.env.REACT_APP_API_KEY}&units=${unit}`)
        .then(res => res.data)
        .catch(error => console.log(error))
    return weatherData
}
export { fetchWeather } 