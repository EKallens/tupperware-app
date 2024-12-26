import { Link } from 'react-router-dom'
import { IoTimerOutline } from 'react-icons/io5'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn, transformDifficulty } from '@/utils/utils'
import defaultRecipeImage from '@/assets/images/recipes/default-recipe.jpg'
import { IRecipe } from '@/interfaces/recipes/recipes.interface'
import { motion } from 'framer-motion'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateRecipe } from '@/lib/recipesApi'
import { Loader } from 'lucide-react'

interface RecipeProps {
    recipe: IRecipe
}

export const Recipe = ({ recipe }: RecipeProps): JSX.Element => {
    const queryClient = useQueryClient()
    const recipeMutation = useMutation({
        mutationFn: () => updateRecipe(recipe.id, { isFavorite: !recipe.isFavorite }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['user-recipes']
            })
        }
    })

    const handleFavorite = () => {
        recipeMutation.mutate()
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full overflow-hidden"
            key={recipe.id}
        >
            <Card className="bg-white shadow-md w-[350px] dark:bg-primaryDark dark:border-none">
                <CardHeader>
                    <div className="flex flex-row justify-between mb-4">
                        <CardTitle>{recipe.title}</CardTitle>
                        {recipeMutation.isPending ? (
                            <Loader className="animate-spin" />
                        ) : (
                            <div>
                                {recipe.isFavorite ? (
                                    <FaHeart
                                        onClick={handleFavorite}
                                        className="cursor-pointer"
                                        size={22}
                                        fill="#d7447c"
                                    />
                                ) : (
                                    <FaRegHeart onClick={handleFavorite} className="cursor-pointer" size={22} />
                                )}
                            </div>
                        )}
                    </div>
                    <CardDescription>
                        <div className="flex items-center">
                            <IoTimerOutline />
                            <span className="ml-2">{recipe.cookTime} min</span>
                        </div>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <img src={recipe.img || defaultRecipeImage} alt="recipe" />
                    <div className="flex flex-col gap-4 mt-4">
                        <div className="flex flex-wrap items-center">
                            <span className="text-sm">Dificultad:</span>
                            <span
                                className={cn(
                                    'ml-1 font-bold text-xs me-2 px-2.5 py-0.5 rounded-full',
                                    recipe.difficulty === 1 &&
                                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-white',
                                    recipe.difficulty === 2 &&
                                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-white',
                                    recipe.difficulty === 3 && 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-white'
                                )}
                            >
                                {transformDifficulty(recipe.difficulty)}
                            </span>
                        </div>
                        <div className="flex flex-wrap items-center">
                            <span className="text-sm">Porciones:</span>
                            <span className="text-sm ml-1">{recipe.servings}</span>
                        </div>
                    </div>
                    <Link to={`/dashboard/recipes/${recipe.id}`}>
                        <Button variant="primary" className="w-full mt-4">
                            Ver receta
                        </Button>
                    </Link>
                </CardContent>
                <CardFooter className="break-all">
                    {recipe.tags.map((tag) => (
                        <span key={tag.id} className="mr-1">
                            #{tag.name}{' '}
                        </span>
                    ))}
                </CardFooter>
            </Card>
        </motion.div>
    )
}
