import { useForm } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, Form } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader } from 'lucide-react'

type Props = {
    id?: string
    defaultValues?: { name: string }
    onSubmit: (values: { name: string }) => void
    onDelete?: () => void
    disabled?: boolean
}

export const EditTagForm = ({ id, defaultValues, onSubmit, disabled }: Props): JSX.Element => {
    const form = useForm<{ name: string }>({
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
                                <Input disabled={disabled} placeholder="p.ej. queso, tomate..." {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button variant="primary" className="w-full" disabled={disabled}>
                    {id ? 'Guardar cambios' : 'Crear etiqueta'}{' '}
                    {disabled ? <Loader className="ml-2 animate-spin" /> : null}
                </Button>
            </form>
        </Form>
    )
}
