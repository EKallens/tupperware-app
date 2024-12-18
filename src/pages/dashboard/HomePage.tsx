import { Recipe } from '@/components/recipe/Recipe'
import { recipesMocked } from '@/utils/constants'

export const HomePage = (): JSX.Element => {
    return (
        <div className="m-4">
            <div className="flex flex-wrap gap-10 items-center justify-center">
                {recipesMocked.map((recipe, index) => (
                    <Recipe key={recipe.id + index} {...recipe} />
                ))}
            </div>
        </div>
    )
}
