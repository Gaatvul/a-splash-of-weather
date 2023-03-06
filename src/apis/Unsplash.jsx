import axios from "axios";

const key = "dkxziKdBSuKQwj-GULdXC9ShAe9ptS1noSEz8NmGB6w"

export default axios.create({
    baseURL:"https://api.unsplash.com/search",
    params: {
        client_id: key
    }
})