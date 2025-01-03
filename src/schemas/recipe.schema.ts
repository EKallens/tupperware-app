import { z } from 'zod'

export const recipeSchema = z.object({
    title: z.string().min(1, 'Debes ingresar un título'),
    description: z.string().optional(),
    ingredients: z.string().min(1, 'Debes ingresar al menos un ingrediente'),
    preparation: z.string().min(1, 'Debes ingresar al menos un paso'),
    tags: z.array(z.object({})).nonempty('Debes ingresar al menos una etiqueta'),
    img: z.string().optional(),
    notes: z.string().min(1, 'Debes ingresar las notas'),
    servings: z.string().min(1),
    cookTime: z.string().min(1),
    difficulty: z.string().min(1)
})
