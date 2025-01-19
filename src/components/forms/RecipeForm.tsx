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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createTag, getUserTags } from '@/lib/tagsApi'
import { MultiSelect } from '../select/MultiSelect'
import { createTagOptions } from '@/utils/utils'
import { useState } from 'react'
import { uploadRecipeImage } from '@/lib/recipesApi'
import { toast } from 'sonner'

export type RecipeFormInputs = Omit<IRecipe, 'id' | 'createdAt' | 'updatedAt'>

type Props = {
    id?: string
    defaultValues?: IRecipeFormInputs
    onSubmit: (values: IRecipeFormInputs) => void
    disabled?: boolean
}

export const RecipeForm = ({ id, defaultValues, onSubmit, disabled }: Props) => {
    const [imageFile, setImageFile] = useState<File | null>(null)
    const { user } = useAuthStore()
    const queryClient = useQueryClient()

    const { data } = useQuery({
        queryKey: ['tags'],
        queryFn: () => getUserTags(user!.id)
    })

    const recipeImageMutation = useMutation({
        mutationFn: (file: File) => uploadRecipeImage(file),
        onError: () => {
            toast.error('Error al subir la imagen')
        }
    })

    const tagMutation = useMutation({
        mutationFn: (name: string) => createTag(name, user!.id),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['tags'] })
            queryClient.invalidateQueries({ queryKey: ['tag', data.id] })
            toast.success('Tag creado correctamente')
        },
        onError: () => {
            toast.error('Error al subir la imagen')
        }
    })

    const form = useForm<IRecipeFormInputs>({
        resolver: zodResolver(recipeSchema),
        defaultValues: { ...defaultValues, tags: createTagOptions(defaultValues?.tags || []) }
    })

    const onRecipeImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0]
        setImageFile(file)
    }

    const handleSubmit = async (values: IRecipeFormInputs) => {
        let recipe: IRecipeFormInputs = {
            title: '',
            notes: '',
            servings: '',
            tags: [],
            ingredients: '',
            cookTime: '',
            preparation: '',
            difficulty: '',
            createdBy: '',
            isFavorite: '',
            description: '',
            img: ''
        }

        let imageUrl = undefined

        if (imageFile) imageUrl = await recipeImageMutation.mutateAsync(imageFile)
        const tagIds = form.getValues('tags').map((tag) => tag.id || tag.value)
        recipe = { ...values, tags: tagIds, createdBy: user!.id, img: imageUrl }
        onSubmit(recipe)
    }

    const onCreateTag = async (name: string) => tagMutation.mutate(name)

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5 pt-5">
                    <FormField
                        name="title"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Título</FormLabel>
                                <FormControl className="w-full">
                                    <Input
                                        className="mb-2"
                                        disabled={disabled || recipeImageMutation.isPending}
                                        {...field}
                                    />
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
                                        disabled={disabled || recipeImageMutation.isPending}
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
                                        disabled={disabled || recipeImageMutation.isPending}
                                        placeholder="Descripción de la receta..."
                                        {...field}
                                        value={field.value || ''}
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
                                            disabled={disabled || recipeImageMutation.isPending}
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
                                    <FormLabel>Tiempo de cocción (En minutos)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            className={`mb-2 ${
                                                form.formState.errors.cookTime
                                                    ? 'border-rose-600 focus:border-rose-600'
                                                    : ''
                                            }`}
                                            disabled={disabled || recipeImageMutation.isPending}
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
                                            disabled={disabled || recipeImageMutation.isPending}
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
                        render={({ field }) => (
                            <>
                                <FormItem className="w-auto mt-6">
                                    <FormLabel>
                                        Tags (Si no has agregado ningún tag, escribe el nombre del tag y presiona Enter
                                        para crearlo)
                                    </FormLabel>
                                    <MultiSelect
                                        defaultValues={field.value || []}
                                        onChange={(selectedTags) => field.onChange(selectedTags)}
                                        options={createTagOptions(data || [])}
                                        className="basic-multi-select text-sm"
                                        placeholder="Selecciona los tags..."
                                        onCreate={onCreateTag}
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
                        render={() => (
                            <FormItem className="w-[350px] mt-6">
                                <FormLabel>Imagen (opcional) </FormLabel>
                                {defaultValues?.img && (
                                    <img className="w-[400px] h-[300px] mb-4" src={defaultValues?.img}></img>
                                )}
                                <FormControl>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="mt-4 mb-4 cursor-pointer p-0 text-sm"
                                        onChange={onRecipeImageChange}
                                        disabled={disabled || recipeImageMutation.isPending}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {form.formState.errors.img?.message ? (
                        <FormError message={form.formState.errors.img.message} />
                    ) : null}

                    <Button
                        variant="primary"
                        className="mt-8 mx-auto"
                        disabled={disabled || recipeImageMutation.isPending}
                    >
                        {id ? 'Guardar cambios' : 'Crear receta'}{' '}
                        {disabled || recipeImageMutation.isPending ? <Loader className="ml-2 animate-spin" /> : null}
                    </Button>
                </form>
            </Form>
        </>
    )
}
