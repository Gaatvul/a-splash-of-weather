import axios from "axios";

const key = import.meta.env.VITE_OPEN_WEATHER_API_KEY

export default axios.create({
    baseURL:"http://api.openweathermap.org/data/2.5",
    params: {
        appid: key
    }
})