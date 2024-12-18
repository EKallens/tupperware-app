import axios from 'axios'

console.log(import.meta.env.VITE_API_URL)

const options = {
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDUwYTYyZmQ3M2ZlZjBlNTQ0YTdjMyIsImlhdCI6MTczMzUxMDc3OSwiZXhwIjoxNzMzNTE3OTc5fQ.acCDgUjEfQH1ugW_jEyrEaKey2wTKV0w0piMA_CEDmo`
    }
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
