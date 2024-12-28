import { z } from 'zod'

export const recipeSchema = z.object({
    title: z.string().min(1, 'Debes ingresar un título'),
    description: z.string().optional(),
    ingredients: z.string().min(1, 'Debes ingresar al menos un ingrediente'),
    preparation: z.string().min(1, 'Debes ingresar al menos un paso'),
    tags: z.array(z.string() || z.any()).min(1, 'Debes ingresar al menos una etiqueta'),
    image: z.string().url('Debes ingresar una URL válida').optional(),
    notes: z.string().min(1, 'Debes ingresar las notas'),
    servings: z.string().min(1),
    cookTime: z.string().min(1),
    difficulty: z.string().min(1)
})
