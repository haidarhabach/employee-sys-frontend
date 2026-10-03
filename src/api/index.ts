import axios from "axios"
import { setupInterceptors } from "./interceptors"

const isProduction = import.meta.env.MODE === "production"
export let BASE_URL = "http://localhost:8080"

if(isProduction){
    BASE_URL="http://localhost:8080"
}

const api = axios.create({
    baseURL: BASE_URL,

})

setupInterceptors(api)

export default api