import { BiSolidDish } from 'react-icons/bi'
import { MdOutlineSoupKitchen } from 'react-icons/md'
import defaultRecipeImage from '@/assets/images/recipes/default-recipe.jpg'
import { IoTimerOutline, IoArrowBackOutline } from 'react-icons/io5'
import { PiChefHat } from 'react-icons/pi'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getDifficultyLabel } from '@/utils/utils'
import dateAdapter from '@/config/date.adapter'
import { useQuery } from '@tanstack/react-query'
import { getRecipeById } from '@/lib/recipesApi'
import LoadingSpinner from '@/components/loading-spinner/LoadingSpinner'
import 'quill/dist/quill.snow.css'
import { Edit } from 'lucide-react'
import { Link } from 'react-router-dom'

export const RecipeDetailsPage = (): JSX.Element => {
    const { id } = useParams()
    const navigate = useNavigate()
    const handleGoBack = () => navigate(-1)

    const { data } = useQuery({
        queryKey: ['recipe', id],
        queryFn: () => getRecipeById(id!),
        refetchOnWindowFocus: false
    })

    if (!data) return <LoadingSpinner />

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span
                onClick={handleGoBack}
                className="flex flex-row items-center mb-4 bg-black text-white dark:bg-primary p-2 w-20 rounded-md cursor-pointer shadow-md"
            >
                <IoArrowBackOutline />
                <span>Volver</span>
            </span>

            <div className="bg-white shadow-md rounded-md p-10 dark:bg-black">
                <div className="flex flex-col lg:flex-row lg:justify-between">
                    <div className="flex flex-row items-center">
                        <BiSolidDish size={26} className="text-black font-semibold mr-2 dark:text-white" />
                        <h2 className="text-title-md2 font-semibold text-black dark:text-white">{data.title}</h2>
                        <Link
                            to={`/dashboard/recipes/edit/${id}`}
                            className="flex flex-row items-center cursor-pointer"
                        >
                            <Edit className="size-4 ml-4 mr-2" />
                            <span className="text-sm">Editar</span>
                        </Link>
                    </div>
                    <span className="mt-3 shadow-sm text-sm font-bold border p-2 rounded-md bg-gray-200 lg:mt-0 dark:text-black">
                        Fecha de creación:{' '}
                        <span className="text-sm font-normal">
                            {dateAdapter.format(new Date(data.createdAt), 'dd-MM-yyyy')}
                        </span>
                    </span>
                </div>
                <div className="mt-4">
                    <span>{data.description}</span>
                </div>

                <hr className="my-6 h-0.5 bg-neutral-100 dark:bg-white/10" />

                <div className="flex-row mt-4 xl:mt-3 xl:flex xl:gap-8">
                    <div className="order-1 xl:order-1 flex-1 px-0 py-4">
                        <h2 className="text-lg font-bold text-black dark:text-white mb-4">Ingredientes</h2>
                        <ul className="lg:text-justify">
                            <li className="ql-editor" dangerouslySetInnerHTML={{ __html: data.ingredients }}></li>
                        </ul>
                    </div>
                    <div className="order-2 xl:order-2 flex-1 px-0 py-4">
                        <p className="text-lg font-bold text-black dark:text-white mb-4">Preparación</p>
                        <ul className="lg:text-justify">
                            <li className="ql-editor" dangerouslySetInnerHTML={{ __html: data.preparation }}></li>
                        </ul>
                    </div>
                    <div className="order-3 xl:order-3 flex-1 px-0 py-4 w-auto">
                        <img
                            className="w-full rounded-md shadow-md"
                            src={data.img ? data.img : defaultRecipeImage}
                            alt="recipe"
                        />
                        <div className="divide-y flex-col flex items-center justify-center mt-6 lg:flex-row lg:p-4 lg:divide-x lg:divide-blue-800 text-sm lg:text-blue-800 lg:border lg:border-blue-300 rounded-lg lg:bg-blue-50 lg:divide-y-0 dark:bg-gray-800 dark:text-white dark:border-white dark:divide-white">
                            <span className="py-4 flex flex-row items-center lg:py-0 lg:px-4">
                                <MdOutlineSoupKitchen size={22} className="text-blue-800 dark:text-gray-100" />
                                <span className="ml-1">{data.servings}</span>
                                <span className="ml-1">porciones</span>
                            </span>
                            <span className="py-4 flex flex-row items-center lg:py-0 lg:px-4">
                                <IoTimerOutline size={22} className="text-blue-800 dark:text-gray-100" />
                                <span className="ml-1">{data.cookTime}</span>
                                <span className="ml-1">minutos</span>
                            </span>
                            <span className="py-4 flex flex-row items-center lg:py-0 lg:px-4">
                                <PiChefHat size={22} className="text-blue-800 dark:text-gray-100" />
                                <p className="ml-1">{getDifficultyLabel(data.difficulty)}</p>
                            </span>
                        </div>
                        <p className="mt-6">Notas: {data.notes}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
