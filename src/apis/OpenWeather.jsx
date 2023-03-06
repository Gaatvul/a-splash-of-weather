import axios from "axios";

const key = import.meta.env.VITE_OPEN_WEATHER_API_KEY

export default axios.create({
    baseURL:"https://api.openweathermap.org",
    params: {
        appid: key
    }
})