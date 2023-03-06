import axios from "axios";

const key = "8fbe4136881bc7177d21109fb97304c6"

export default axios.create({
    baseURL:"https://api.openweathermap.org",
    params: {
        appid: key
    }
})