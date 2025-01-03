import API from '@/config/axios'
import { IRecipe, IRecipeFormInputs } from '@/interfaces/recipes/recipes.interface'

const apiUrl = import.meta.env.VITE_API_URL

export const getUserRecipes = async (userId: string, favorites = false): Promise<IRecipe[]> => {
    const response = await API.get<IRecipe[]>(`${apiUrl}/api/recipes/user/${userId}`, {
        params: { favorites }
    })
    return response.data
}
export const getRecipeById = async (recipeId: string): Promise<IRecipe> => {
    const response = await API.get<IRecipe>(`${apiUrl}/api/recipes/${recipeId}`)
    return response.data
}

export const updateRecipe = async (recipeId: string, recipeInfo: IRecipeFormInputs): Promise<IRecipe> => {
    const response = await API.patch<IRecipe>(`${apiUrl}/api/recipes/${recipeId}`, recipeInfo)
    return response.data
}

export const createRecipe = async (recipeInfo: IRecipeFormInputs): Promise<IRecipe> => {
    const response = await API.post<IRecipe>(`${apiUrl}/api/recipes`, recipeInfo)
    return response.data
}

export const deleteRecipe = async (recipeId: string): Promise<void> => {
    const response = await API.delete<void>(`${apiUrl}/api/recipes/${recipeId}`)
    return response.data
}

export const uploadRecipeImage = async (image: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', image)
    const response = await API.post<{ filePath: string }>(`${apiUrl}/api/recipes/image`, formData)
    return response.data.filePath
}
