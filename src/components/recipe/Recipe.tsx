import { Link } from 'react-router-dom'
import { IoTimerOutline } from 'react-icons/io5'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn, transformDifficulty } from '@/utils/utils'
import recipeImg from '@/assets/images/recipes/pizza.jpg'
import { IRecipe } from '@/interfaces/recipes/recipes'
import { motion } from 'framer-motion'

export const Recipe = (recipe: IRecipe): JSX.Element => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full overflow-hidden"
        >
            <Card className="bg-white shadow-md w-[350px] dark:bg-primaryDark dark:border-none">
                <CardHeader>
                    <div className="flex flex-row justify-between mb-4">
                        <CardTitle>{recipe.title}</CardTitle>
                        <div>
                            {recipe.isFavorite ? (
                                <FaHeart className="cursor-pointer" size={22} fill="#d7447c" />
                            ) : (
                                <FaRegHeart className="cursor-pointer" size={22} />
                            )}
                        </div>
                    </div>
                    <CardDescription>
                        <div className="flex items-center">
                            <IoTimerOutline />
                            <span className="ml-2">{recipe.cookTime} min</span>
                        </div>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <img src={recipeImg} alt="recipe" />
                    <div className="flex flex-col gap-4 mt-4">
                        <div className="flex flex-wrap items-center">
                            <span className="text-sm">Dificultad:</span>
                            <span
                                className={cn(
                                    'ml-1 font-bold text-xs me-2 px-2.5 py-0.5 rounded-full',
                                    recipe.difficulty === 'easy' &&
                                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-white',
                                    recipe.difficulty === 'medium' &&
                                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-white',
                                    recipe.difficulty === 'hard' &&
                                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-white'
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
                <CardFooter>
                    {recipe.tags.map((tag, index) => (
                        // TODO: Update with tag id
                        <span key={tag + index} className="mr-1">
                            #{tag}{' '}
                        </span>
                    ))}
                </CardFooter>
            </Card>
        </motion.div>
    )
}
