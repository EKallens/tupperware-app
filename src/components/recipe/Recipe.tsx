import { Link, useLocation } from 'react-router-dom'
import { IoTimerOutline } from 'react-icons/io5'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn, getDifficultyLabel } from '@/utils/utils'
import defaultRecipeImage from '@/assets/images/recipes/default-recipe.jpg'
import { IRecipe } from '@/interfaces/recipes/recipes.interface'
import { motion } from 'framer-motion'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateRecipe } from '@/lib/recipesApi'
import { useState } from 'react'
import { toast } from 'sonner'

interface RecipeProps {
    recipe: IRecipe
}

export const Recipe = ({ recipe }: RecipeProps): JSX.Element => {
    const [isFavorite, setIsFavorite] = useState<IRecipe['isFavorite']>(recipe.isFavorite)
    const { pathname } = useLocation()
    const queryClient = useQueryClient()

    const recipeMutation = useMutation({
        mutationFn: () =>
            updateRecipe(recipe.id, {
                ...recipe,
                isFavorite: isFavorite,
                tags: recipe.tags.map((tag) => tag.id)
            }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['user-recipes']
            })
            if (data.isFavorite) return toast.success('Receta guardada como favorita')
            toast.success('Receta eliminada de favoritas')
        },
        onError: () => {
            toast.error('Error al guardar la receta como favorita')
            setIsFavorite(recipe.isFavorite!)
        }
    })

    const handleFavorite = () => {
        setIsFavorite(!isFavorite)
        recipeMutation.mutate()
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
            key={recipe.id}
        >
            <Card className="bg-white shadow-sm max-w-[290px] min-h-[450px] max-h-[450px] dark:bg-primaryDark dark:border-none">
                <CardHeader>
                    <div className="flex flex-row justify-between mb-4">
                        <CardTitle className="break-all pr-4">{recipe.title}</CardTitle>
                        {!pathname.includes('favorites-recipes') ? (
                            <div>
                                {isFavorite ? (
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
                        ) : null}
                    </div>
                    <CardDescription>
                        <div className="flex items-center">
                            <IoTimerOutline />
                            <span className="ml-2">{recipe.cookTime} min</span>
                        </div>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <a href={recipe.img || defaultRecipeImage} target="_blank">
                        <img
                            className="w-[250px] h-[150px] rounded-sm object-cover"
                            src={recipe.img || defaultRecipeImage}
                            alt="recipe"
                        />
                    </a>
                    <div className="flex flex-col gap-4 mt-4">
                        <div className="flex flex-wrap items-center">
                            <span className="text-sm">Dificultad:</span>
                            <span
                                className={cn(
                                    'ml-1 font-bold text-xs me-2 px-2.5 py-0.5 rounded-full',
                                    recipe.difficulty.toString() === '1' &&
                                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-white',
                                    recipe.difficulty.toString() === '2' &&
                                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-white',
                                    recipe.difficulty.toString() === '3' &&
                                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-white'
                                )}
                            >
                                {getDifficultyLabel(recipe.difficulty)}
                            </span>
                        </div>
                        <div className="flex flex-wrap items-center">
                            <span className="text-sm">Porciones:</span>
                            <span className="text-sm ml-1">{recipe.servings}</span>
                        </div>
                    </div>
                    <Link to={`/dashboard/recipes/${recipe.id}`}>
                        <Button variant="primary" className="w-full mt-3">
                            Ver receta
                        </Button>
                    </Link>
                </CardContent>
                <CardFooter className="h-auto">
                    {recipe.tags.length > 3 ? (
                        <span className="mr-1 font-bold text-sm">#{recipe.tags[0].name}...</span>
                    ) : (
                        recipe.tags.map((tag) => (
                            <span key={tag.id} className="mr-1 font-bold text-sm">
                                #{tag.name}{' '}
                            </span>
                        ))
                    )}
                </CardFooter>
            </Card>
        </motion.div>
    )
}
