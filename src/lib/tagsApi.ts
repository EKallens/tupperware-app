import API from '@/config/axios'
import { ITag } from '@/interfaces/tags/tags.interface'

const apiUrl = import.meta.env.VITE_API_URL

export const getTags = async (): Promise<ITag[]> => {
    const response = await API.get<ITag[]>(`${apiUrl}/api/tags`)
    return response.data
}
