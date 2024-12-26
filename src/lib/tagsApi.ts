import API from '@/config/axios'
import { ITag } from '@/interfaces/tags/tags.interface'

const apiUrl = import.meta.env.VITE_API_URL

export const getUserTags = async (userId: string): Promise<ITag[]> => {
    const response = await API.get<ITag[]>(`${apiUrl}/api/tags/user/${userId}`)
    return response.data
}

export const getTagById = async (id: string): Promise<ITag> => {
    const response = await API.get<ITag>(`${apiUrl}/api/tags/${id}`)
    return response.data
}

export const updateTag = async (id: string, name: string): Promise<ITag> => {
    const response = await API.patch<ITag>(`${apiUrl}/api/tags/${id}`, { name })
    return response.data
}

export const createTag = async (name: string, createdBy: string): Promise<ITag> => {
    const response = await API.post<ITag>(`${apiUrl}/api/tags`, { name, createdBy })
    return response.data
}
