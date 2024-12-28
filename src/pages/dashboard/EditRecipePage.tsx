import { RecipeForm } from '@/components/forms/RecipeForm'
import LoadingSpinner from '@/components/loading-spinner/LoadingSpinner'
import { IRecipeFormInputs } from '@/interfaces/recipes/recipes.interface'
import { getRecipeById, updateRecipe } from '@/lib/recipesApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { IoArrowBackOutline } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

export const EditRecipePage = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { id } = useParams<{ id: string }>()
    const { data } = useQuery({
        queryKey: ['recipe', id],
        queryFn: () => getRecipeById(id!)
    })

    const recipeMutation = useMutation({
        mutationFn: (data: IRecipeFormInputs) => updateRecipe(id!, data),
        onSuccess: () => {
            toast.success('Receta actualizada correctamente')
            navigate('/dashboard/recipes')
            queryClient.invalidateQueries({ queryKey: ['user-recipes'] })
            queryClient.invalidateQueries({ queryKey: ['recipe', id] })
        },
        onError: () => {
            toast.error('Error al actualizar la receta', { position: 'top-right' })
        }
    })

    const defaultValues: IRecipeFormInputs = {
        title: data?.title || '',
        notes: data?.notes || '',
        servings: data?.servings || '',
        tags: data?.tags || [],
        ingredients: data?.ingredients || '',
        cookTime: data?.cookTime || '',
        preparation: data?.preparation || '',
        difficulty: data?.difficulty || '',
        description: data?.description || '',
        createdBy: data?.createdBy || '',
        img: ''
    }

    const onSubmit = (values: IRecipeFormInputs) => {
        recipeMutation.mutate(values)
    }

    const handleGoBack = () => navigate(-1)

    if (!data) return <LoadingSpinner />

    return (
        <>
            <span
                onClick={handleGoBack}
                className="flex flex-row items-center mb-4 bg-black text-white p-2 w-20 rounded-md cursor-pointer shadow-md"
            >
                <IoArrowBackOutline />
                <span>Volver</span>
            </span>
            <div className="w-full bg-white p-6 rounded-lg">
                <RecipeForm
                    id={id}
                    defaultValues={defaultValues}
                    onSubmit={onSubmit}
                    disabled={recipeMutation.isPending}
                />
            </div>
        </>
    )
}
