import { Controller, useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { IRecipe, IRecipeFormInputs } from '@/interfaces/recipes/recipes.interface'
import { Loader } from 'lucide-react'
import { QuillEditor } from '../editor/Editor'
import { zodResolver } from '@hookform/resolvers/zod'
import { recipeSchema } from '@/schemas/recipe.schema'
import { useAuthStore } from '@/store/useAuthStore'
import { Select } from '../select/Select'
import { difficultyOptions } from '@/utils/constants'
import { FormError } from '../form-error/FormError'
import { useQuery } from '@tanstack/react-query'
import { getUserTags } from '@/lib/tagsApi'
import { MultiSelect } from '../select/MultiSelect'
import { createTagOptions } from '@/utils/utils'

export type RecipeFormInputs = Omit<IRecipe, 'id' | 'createdAt' | 'updatedAt'>

type Props = {
    id?: string
    defaultValues?: IRecipeFormInputs
    onSubmit: (values: any) => void
    disabled?: boolean
}

export const RecipeForm = ({ id, defaultValues, onSubmit, disabled }: Props) => {
    const { user } = useAuthStore()
    const { data } = useQuery({
        queryKey: ['tags'],
        queryFn: () => getUserTags(user!.id)
    })
    const form = useForm<IRecipeFormInputs>({
        resolver: zodResolver(recipeSchema),
        defaultValues: { ...defaultValues, tags: createTagOptions(defaultValues?.tags || []) }
    })

    const handleSubmit = (values: IRecipeFormInputs) => {
        const tagIds = form.getValues('tags').map((tag) => tag.id || tag.value)
        const recipe = { ...values, tags: tagIds, createdBy: user!.id }
        onSubmit(recipe)
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
                    <FormField
                        name="title"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Título</FormLabel>
                                <FormControl className="w-full">
                                    <Input className="mb-2" disabled={disabled} {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {form.formState.errors.title?.message ? (
                        <FormError message={form.formState.errors.title.message} />
                    ) : null}

                    <FormField
                        name="notes"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Notas</FormLabel>
                                <FormControl>
                                    <Input
                                        className="mb-2"
                                        disabled={disabled}
                                        placeholder="Notas adicionales de la receta"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {form.formState.errors.notes?.message ? (
                        <FormError message={form.formState.errors.notes.message} />
                    ) : null}

                    <FormField
                        name="description"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descripción (opcional)</FormLabel>
                                <FormControl>
                                    <Input
                                        className="mb-2"
                                        disabled={disabled}
                                        placeholder="Descripción de la receta..."
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {form.formState.errors.description?.message ? (
                        <FormError message={form.formState.errors.description.message} />
                    ) : null}

                    <div className="flex flex-row gap-4">
                        <FormField
                            name="servings"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full md:w-70">
                                    <FormLabel>Porciones</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            className={`mb-2 ${
                                                form.formState.errors.servings ? 'border-rose-600' : ''
                                            }`}
                                            disabled={disabled}
                                            placeholder="p.ej. 4"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="cookTime"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full md:w-70">
                                    <FormLabel>Tiempo (En minutos)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            className={`mb-2 ${
                                                form.formState.errors.cookTime
                                                    ? 'border-rose-600 focus:border-rose-600'
                                                    : ''
                                            }`}
                                            disabled={disabled}
                                            placeholder="p.ej. 120"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="difficulty"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full md:w-70">
                                    <FormLabel>Dificultad</FormLabel>
                                    <FormControl>
                                        <Select
                                            placeholder="Selecciona una dificultad"
                                            options={difficultyOptions}
                                            value={field.value.toString()}
                                            onChange={field.onChange}
                                            disabled={disabled}
                                            isError={form.formState.errors.difficulty ? true : false}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        name="ingredients"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="w-auto mt-6">
                                <FormLabel>Ingredientes</FormLabel>
                                <FormControl>
                                    {field.value !== undefined && (
                                        <QuillEditor value={field.value || ''} onChange={field.onChange} />
                                    )}
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {form.formState.errors.ingredients?.message ? (
                        <FormError message={form.formState.errors.ingredients.message} />
                    ) : null}

                    <FormField
                        name="preparation"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="w-auto mt-6">
                                <FormLabel>Preparación</FormLabel>
                                <FormControl>
                                    {field.value !== undefined && (
                                        <QuillEditor value={field.value || ''} onChange={field.onChange} />
                                    )}
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {form.formState.errors.preparation?.message ? (
                        <FormError message={form.formState.errors.preparation.message} />
                    ) : null}

                    <Controller
                        name="tags"
                        control={form.control}
                        render={({ field }: any) => (
                            <>
                                <FormItem className="w-auto mt-6">
                                    <FormLabel>Tags</FormLabel>
                                    <MultiSelect
                                        defaultValues={field.value || []}
                                        onChange={(selectedTags) => field.onChange(selectedTags)}
                                        options={createTagOptions(data || [])}
                                        className="basic-multi-select text-sm"
                                        placeholder="Selecciona los tags..."
                                    />
                                </FormItem>
                            </>
                        )}
                    />
                    {form.formState.errors.tags?.message ? (
                        <FormError message={form.formState.errors.tags.message} />
                    ) : null}

                    <FormField
                        name="img"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="w-[350px] mt-6">
                                <FormLabel>Imagen (opcional)</FormLabel>
                                <FormControl>
                                    <Input type="file" className="mb-2" disabled={disabled} {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {form.formState.errors.img?.message ? (
                        <FormError message={form.formState.errors.img.message} />
                    ) : null}

                    <Button variant="primary" className="mt-4 mx-auto" disabled={disabled}>
                        {id ? 'Guardar cambios' : 'Crear receta'}{' '}
                        {disabled ? <Loader className="ml-2 animate-spin" /> : null}
                    </Button>
                </form>
            </Form>
        </>
    )
}
