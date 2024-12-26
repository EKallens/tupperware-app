import axios from 'axios'

const options = {
    baseURL: import.meta.env.VITE_API_URL
}

const API = axios.create(options)

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        return Promise.reject(new Error(error.response.data.error || 'Algo salió mal'))
    }
)

API.defaults.withCredentials = true

export default API
