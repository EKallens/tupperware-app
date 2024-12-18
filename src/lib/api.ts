import API from '@/config/axios'

export const getTags = async () => {
    return await API.get('/tags')
}
