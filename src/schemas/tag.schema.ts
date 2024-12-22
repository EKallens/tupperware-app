import { z } from 'zod'

export const updateTagSchema = z.object({
    name: z.string().min(1)
})
