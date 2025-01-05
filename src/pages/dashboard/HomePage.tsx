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
                <Link to="/dashboard/recipes/new">
                    <Button variant="primary">Crear nueva receta</Button>
                </Link>
            </div>
        )
    }

    return data ? (
        <div className="m-4">
            <div className="flex items-center justify-between mb-12">
                <h1 className="text-title-md2 font-semibold text-black dark:text-white">Mis recetas</h1>
                <Link to="/dashboard/recipes/new">
                    <Button variant="primary">Crear nueva receta</Button>
                </Link>
            </div>
            <div className="flex flex-wrap gap-10 items-center">
                {data?.map((recipe) => (
                    <Recipe key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </div>
    ) : (
        <div className="m-4">
            <div className="flex flex-wrap gap-10 items-center justify-center">
                <RecipeSkeleton />
            </div>
        </div>
    )
}
