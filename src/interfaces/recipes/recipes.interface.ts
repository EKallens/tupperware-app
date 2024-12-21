import { ITag } from '@/interfaces/tags/tags.interface'

export interface IRecipe {
    id: string
    title: string
    notes: string
    servings: number
    tags: ITag[]
    ingredients: string
    cookTime: number
    preparation: string
    difficulty: number
    createdBy: string
    createdAt: string
    updatedAt: string
    isFavorite?: boolean | string
    img?: string
    description?: string
}

export interface RecipeStore {
    recipes: IRecipe[]
    setRecipes: (recipes: IRecipe[]) => void
}
