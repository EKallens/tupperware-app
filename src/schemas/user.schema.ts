import { z } from 'zod'

export const updateUserSchema = z.object({
    name: z.string().min(1, 'Debes ingresar un nombre válido'),
    email: z.string().min(1, 'El correo no puede estar vacío').email('Debes ingresar un email válido')
})
