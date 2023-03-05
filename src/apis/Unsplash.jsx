import axios from "axios";

const key = import.meta.env.VITE_UNSPLASH_API_KEY

export default axios.create({
    baseURL:"https://api.unsplash.com/search",
    params: {
        client_id: key
    }
})