import { RecipeForm } from '@/components/forms/RecipeForm'
import { IRecipeFormInputs } from '@/interfaces/recipes/recipes.interface'
import { createRecipe } from '@/lib/recipesApi'
import { useMutation } from '@tanstack/react-query'
import { IoArrowBackOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const NewRecipePage = () => {
    const navigate = useNavigate()
    const defaultValues = {
        title: '',
        notes: '',
        servings: '',
        tags: ['676ebdd22a0e9dea41a95906'],
        ingredients: '',
        cookTime: '',
        preparation: '',
        difficulty: '',
        description: '',
        createdBy: '',
        img: ''
    }

    const recipeMutation = useMutation({
        mutationFn: createRecipe,
        onSuccess: () => {
            toast.success('Receta creada correctamente')
            navigate('/dashboard/recipes')
        }
    })

    const handleGoBack = () => navigate(-1)

    const onSubmit = (values: IRecipeFormInputs) => {
        recipeMutation.mutate(values)
    }

    return (
        <>
            <span
                onClick={handleGoBack}
                className="flex flex-row items-center mb-4 bg-black text-white p-2 w-20 rounded-md cursor-pointer shadow-md"
            >
                <IoArrowBackOutline />
                <span>Volver</span>
            </span>
            <div className="z-20 w-full bg-white p-6 rounded-lg">
                <RecipeForm defaultValues={defaultValues} onSubmit={onSubmit} disabled={recipeMutation.isPending} />
            </div>
        </>
    )
}
