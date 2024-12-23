import API from '@/config/axios'
import { AuthResponse, CheckAuthResponse, LoginCredentials, RegisterInputs } from '@/interfaces/auth/auth.interface'

const apiUrl = import.meta.env.VITE_API_URL

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await API.post<AuthResponse>(`${apiUrl}/api/auth/login`, credentials)
    return response.data
}

export const register = async (inputs: RegisterInputs): Promise<AuthResponse> => {
    const response = await API.post<AuthResponse>(`${apiUrl}/api/auth/register`, inputs)
    return response.data
}

export const logout = async (): Promise<void> => {
    return await API.post(`${apiUrl}/api/auth/logout`)
}

export const verifyEmail = async (token: string): Promise<void> => {
    return await API.post(`${apiUrl}/api/auth/verify-email`, { token })
}

export const checkAuth = async (): Promise<CheckAuthResponse> => {
    const response = await API.get<CheckAuthResponse>(`${apiUrl}/api/auth/check-auth`)
    return response.data
}

export const forgotPassword = async (email: string): Promise<void> => {
    const response = await API.post(`${apiUrl}/api/auth/forgot-password`, { email })
    return response.data
}
