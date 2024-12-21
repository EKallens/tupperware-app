import { IRecipe } from '@/interfaces/recipes/recipes.interface'
import { create } from 'zustand'

export const useRecipeStore = create((set) => ({
    recipes: [],
    setRecipes: (recipes: IRecipe[]) => set({ recipes })
}))
