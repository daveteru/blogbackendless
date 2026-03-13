import axios from "axios"

export const axiosInstance = axios.create({
    baseURL:"https://toughground-us.backendless.app/api"
})