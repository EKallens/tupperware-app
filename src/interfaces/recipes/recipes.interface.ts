import { ITag } from '@/interfaces/tags/tags.interface'

export interface IRecipe {
    id: string
    title: string
    notes: string
    servings: string
    tags: ITag[]
    ingredients: string
    cookTime: string
    preparation: string
    difficulty: string
    createdBy: string
    createdAt: string
    updatedAt: string
    isFavorite?: boolean | string
    img?: string
    description?: string
}

export interface IRecipeFormInputs {
    title: string
    notes: string
    servings: string
    tags: any[]
    ingredients: string
    cookTime: string
    preparation: string
    difficulty: string
    createdBy: string
    isFavorite?: boolean | string
    description?: string
    img?: string
}
