import axios from "axios";

const fetchEmailConfirmation = async(email, lat, lon, date) => {
    const baseUrl = process.env.REACT_APP_SERVICE_URL
    const response = await axios.get(`${baseUrl}forecast/email?email=${email}&lat=${lat}&lon=${lon}&date=${date}`)
    .then(res => res.data)
    return response     
}

export {fetchEmailConfirmation}