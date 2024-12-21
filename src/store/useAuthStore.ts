import { create } from 'zustand'
import { checkAuth } from '@/lib/authApi'
import { AuthState } from '@/interfaces/auth/auth.interface'

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
