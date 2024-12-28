import { useForm } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, Form } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateTagSchema } from '@/schemas/tag.schema'
import { toast } from 'sonner'

type TagFormInputs = { name: string }

type Props = {
    id?: string
    defaultValues?: TagFormInputs
    onSubmit: (values: TagFormInputs) => void
    onDelete?: () => void
    disabled?: boolean
}

export const TagForm = ({ id, defaultValues, onSubmit, disabled }: Props): JSX.Element => {
    const form = useForm<TagFormInputs>({
        resolver: zodResolver(updateTagSchema),
        defaultValues
    })

    const handleSubmit = (values: TagFormInputs) => {
        if (values.name.includes('#')) {
            return toast.error('El nombre de la etiqueta no puede contener el símbolo #', {
                duration: 6000
            })
        }
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
