import axios from 'axios'

console.log(import.meta.env.VITE_API_URL)

const options = {
    baseURL: import.meta.env.VITE_API_URL
}

const API = axios.create(options)

API.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const { status, data } = error.response
        return Promise.reject({ ...status, ...data })
    }
)

export default API
