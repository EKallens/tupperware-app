import { z } from 'zod'

export const forgotPasswordSchema = z.object({
    email: z.string().min(1).email()
})

export const resetPasswordSchema = z
    .object({
        password: z.string().min(1, 'Debes ingresar una contraseña'),
        confirmPassword: z.string().min(1, 'Debes ingresar una contraseña')
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: 'custom',
                message: 'Las contraseña no coinciden',
                path: ['confirmPassword']
            })
        }
    })
