import API from '@/config/axios'
import { User } from '@/interfaces/users/users.interface'

const apiUrl = import.meta.env.VITE_API_URL

export const updateUser = async (userInfo: Omit<User, 'isVerified'>): Promise<Omit<User, 'isVerified'>> => {
    const { id, name, email } = userInfo
    const response = await API.patch<Omit<User, 'isVerified'>>(`${apiUrl}/api/users/${id}`, { name, email })
    return response.data
}

export const updateImageUser = async (userId: string, file: File): Promise<User> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('id', userId)
    const response = await API.post<User>(`${apiUrl}/api/users/image`, formData)
    return response.data
}
