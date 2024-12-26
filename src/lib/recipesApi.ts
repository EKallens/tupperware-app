import API from '@/config/axios'
import { IRecipe } from '@/interfaces/recipes/recipes.interface'

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

export const updateRecipe = async (recipeId: string, recipeInfo: Partial<IRecipe>): Promise<IRecipe> => {
    const response = await API.patch<IRecipe>(`${apiUrl}/api/recipes/${recipeId}`, recipeInfo)
    return response.data
}
