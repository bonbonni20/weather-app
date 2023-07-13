import axios from 'axios'

const fetchCities = async (city) => {
    const cities_URL = `${process.env.REACT_APP_GEO_URL}q=${city}&limit=5&appid=${process.env.REACT_APP_API_KEY}`
    return axios.get(cities_URL)
        .then((response) => response.data)
        .then(cityData => {
            return cityData.map((city) => {
                return {
                    label: (city.state !== undefined) ? `${city.name}, ${city.state}, ${city.country}` : `${city.name}, ${city.country}`,
                    location: `${city.lat} ${city.lon}`
                }
            })
        })
}

export { fetchCities }