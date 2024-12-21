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
