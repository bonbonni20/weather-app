import axios from "axios";

const fetchMobileConfirmation = async(mobileNo, lat, lon, date) => {
    const baseUrl = process.env.REACT_APP_SERVICE_URL
    const response = await axios.get(`${baseUrl}forecast/mobile?mobileNo=${mobileNo}&lat=${lat}&lon=${lon}&date=${date}`)
    .then(res => res.data)
    return response    
}

export {fetchMobileConfirmation}