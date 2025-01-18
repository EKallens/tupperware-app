import { useAuthStore } from '@/store/useAuthStore'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const setIsAuthenticated = useAuthStore.getState().setIsAuthenticated
            setIsAuthenticated(false)
            const navigate = useNavigate()
            navigate('/auth/login')
        }
        return Promise.reject(error)
    }
)

API.defaults.withCredentials = true

export default API
