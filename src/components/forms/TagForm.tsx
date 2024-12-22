import { useForm } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, Form } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateTagSchema } from '@/schemas/tag.schema'

type Props = {
    id?: string
    defaultValues?: { name: string }
    onSubmit: (values: { name: string }) => void
    onDelete?: () => void
    disabled?: boolean
}

export const TagForm = ({ id, defaultValues, onSubmit, disabled }: Props): JSX.Element => {
    const form = useForm<{ name: string }>({
        resolver: zodResolver(updateTagSchema),
        defaultValues
    })

    const handleSubmit = (values: { name: string }) => {
        onSubmit(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input
                                    className="mb-2"
                                    disabled={disabled}
                                    placeholder="p.ej. queso, tomate..."
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                {form.formState.errors.name ? (
                    <span className="mb-2 text-sm text-rose-600">Debes ingresar un nombre</span>
                ) : null}
                <Button variant="primary" className="w-full" disabled={disabled}>
                    {id ? 'Guardar cambios' : 'Crear etiqueta'}{' '}
                    {disabled ? <Loader className="ml-2 animate-spin" /> : null}
                </Button>
            </form>
        </Form>
    )
}
