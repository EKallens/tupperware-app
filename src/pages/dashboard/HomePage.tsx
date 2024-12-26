import { Recipe } from '@/components/recipe/Recipe'
import { RecipeSkeleton } from '@/components/recipe/RecipeSkeleton'
import { Button } from '@/components/ui/button'
import { getUserRecipes } from '@/lib/recipesApi'
import { useAuthStore } from '@/store/useAuthStore'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

export const HomePage = (): JSX.Element => {
    const { user } = useAuthStore()
    const { data } = useQuery({
        queryKey: ['user-recipes'],
        queryFn: () => user && getUserRecipes(user.id),
        refetchOnWindowFocus: false
    })

    if (data?.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-4">
                <p>No tienes recetas creadas</p>
                <Link to="/dashboard/recipes">
                    <Button variant="primary">Crear nueva receta</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="m-4">
            <div className="flex flex-wrap gap-10 items-center justify-center">
                {data ? data?.map((recipe) => <Recipe key={recipe.id} recipe={recipe} />) : <RecipeSkeleton />}
            </div>
        </div>
    )
}
