import { User } from '@/interfaces/users/users.interface'

export interface LoginCredentials {
    email: string
    password: string
}

export interface RegisterInputs {
    email: string
    name: string
    password: string
}

export interface AuthResponse {
    user: CheckAuthResponse
}

export interface CheckAuthResponse {
    id: string
    name: string
    email: string
    isVerified: boolean
}

export interface AuthState {
    user: User | null
    setUser: (user: User | null) => void
    isAuthenticated: boolean
    setIsAuthenticated: (isAuthenticated: boolean) => void
    checkAuth: () => void
    isCheckingAuth: boolean
}
