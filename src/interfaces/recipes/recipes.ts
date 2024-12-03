export interface IRecipe {
    id: string
    title: string
    notes: string
    servings: number
    tags: string[]
    ingredients: string
    cookTime: number
    preparation: string
    difficulty: string
    createdBy: string
    createdAt: string
    updatedAt: string
    isFavorite?: boolean
    img?: string
    description?: string
}
