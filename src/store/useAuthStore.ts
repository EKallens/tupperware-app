import { create } from 'zustand'
import { checkAuth } from '@/lib/authApi'

interface User {
    id: string
    name: string
    email: string
    isVerified?: boolean
}

interface AuthState {
    user: User | null
    setUser: (user: User | null) => void
    isAuthenticated: boolean
    setIsAuthenticated: (isAuthenticated: boolean) => void
    checkAuth: () => void
    isCheckingAuth: boolean
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    isAuthenticated: false,
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
    checkAuth: async () => {
        try {
            const data = await checkAuth()
            set({ user: data, isAuthenticated: true, isCheckingAuth: false })
        } catch (error) {
            console.log(error)
            set({ user: null, isAuthenticated: false, isCheckingAuth: false })
        }
    },
    isCheckingAuth: true
}))
