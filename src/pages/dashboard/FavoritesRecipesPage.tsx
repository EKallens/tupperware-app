import LoadingSpinner from '@/components/loading-spinner/LoadingSpinner'
import { Recipe } from '@/components/recipe/Recipe'
import { RecipeSkeleton } from '@/components/recipe/RecipeSkeleton'
import { Button } from '@/components/ui/button'
import { getUserRecipes } from '@/lib/recipesApi'
import { useAuthStore } from '@/store/useAuthStore'
import { useQuery } from '@tanstack/react-query'
import { IoArrowBackOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export const FavoritesRecipesPage = (): JSX.Element => {
    const navigate = useNavigate()
    const { user } = useAuthStore()
    const { data, isFetching } = useQuery({
        queryKey: ['user-favorites-recipes'],
        queryFn: () => user && getUserRecipes(user.id, true),
        refetchOnWindowFocus: false
    })

    const handleGoBack = () => navigate(-1)

    if (isFetching) {
        return (
            <div className="flex flex-col items-center justify-center gap-4">
                <LoadingSpinner />
            </div>
        )
    }

    if (data?.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-4">
                <p>No has agregado ninguna receta como favorita</p>
                <Link to="/dashboard">
                    <Button variant="primary">Ir a mis recetas</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="m-4">
            <span
                onClick={handleGoBack}
                className="flex flex-row items-center mb-4 bg-black text-white p-2 w-20 rounded-md cursor-pointer shadow-md"
            >
                <IoArrowBackOutline />
                <span>Volver</span>
            </span>
            <div className="flex flex-wrap gap-10 items-center justify-center">
                {data ? data?.map((recipe) => <Recipe key={recipe.id} recipe={recipe} />) : <RecipeSkeleton />}
            </div>
        </div>
    )
}
