import { BiSolidDish } from 'react-icons/bi'
import { MdOutlineSoupKitchen } from 'react-icons/md'
import RecipeImage from '@/assets/images/recipes/pizza.jpg'
import { IoTimerOutline, IoArrowBackOutline, IoMedical } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

export const RecipeDetailsPage = (): JSX.Element => {
    const navigate = useNavigate()
    const handleGoBack = () => navigate(-1)

    return (
        <>
            <span
                onClick={handleGoBack}
                className="flex flex-row items-center mb-4 bg-black text-white p-2 w-20 rounded-md cursor-pointer shadow-md"
            >
                <IoArrowBackOutline />
                <span>Volver</span>
            </span>

            <div className="bg-white shadow-md rounded-md p-10 dark:bg-black">
                <div className="flex flex-col lg:flex-row lg:justify-between">
                    <div className="flex flex-row items-center">
                        <BiSolidDish size={26} className="text-black font-semibold mr-2 dark:text-white" />
                        <h2 className="text-title-md2 font-semibold text-black dark:text-white">Pizza</h2>
                    </div>
                    <span className="mt-3 shadow-sm text-sm font-bold border p-2 rounded-md bg-gray-200 lg:mt-0 dark:text-black">
                        Fecha de creación: <span className="text-sm font-normal">10-11-2024</span>
                    </span>
                </div>
                <div className="mt-4">
                    <span>Esta es una receta para hacer una pizza con masa casera</span>
                </div>

                <hr className="my-6 h-0.5 bg-neutral-100 dark:bg-white/10" />

                <div className="flex-row mt-4 lg:mt-3 lg:flex gap-8">
                    <div className="order-3 flex-1 py-4 lg:order-1">
                        <p className="text-lg font-bold text-black dark:text-white mb-4">Preparación</p>
                        <ul className="lg:text-justify">
                            <li>
                                - Calentamos una cazuela grande de agua, la más ancha de casa. Cuando empiece a hervir
                                echamos 2 puñados generosos de sal.
                            </li>
                            <li>
                                - Introducimos las láminas de lasaña una a una sin que se toquen (para que no se peguen
                                entre ellas). Ahora podemos encontrar infinidad de tipos de lasaña donde no hace
                                hidratarla como se hacía antes. En casa muchas veces para ahorrar tiempo empleo las que
                                se hidratan con la bechamel y el jugo que suelta la salsa al hornear. Si lo hacéis de la
                                manera tradicional tenemos que remover con una cuchara de madera y en unos 10 minutos
                                sacamos las láminas. Las estiramos encima de unas hojas de papel absorbente de cocina.
                                Aunque os parezca que no están, acabarán haciéndose en el horno.
                            </li>
                            <li>
                                - El siguiente paso será lavar muy bien todas las verduras que vamos a emplear en el
                                relleno. En la receta os aconsejo el relleno de la clásica salsa boloñesa, zanahorias,
                                ajo, pimientos y cebolla.
                            </li>
                            <li>
                                - Introducimos las láminas de lasaña una a una sin que se toquen (para que no se peguen
                                entre ellas). Ahora podemos encontrar infinidad de tipos de lasaña donde no hace
                                hidratarla como se hacía antes. En casa muchas veces para ahorrar tiempo empleo las que
                                se hidratan con la bechamel y el jugo que suelta la salsa al hornear. Si lo hacéis de la
                                manera tradicional tenemos que remover con una cuchara de madera y en unos 10 minutos
                                sacamos las láminas. Las estiramos encima de unas hojas de papel absorbente de cocina.
                                Aunque os parezca que no están, acabarán haciéndose en el horno.
                            </li>
                            <li>
                                - El siguiente paso será lavar muy bien todas las verduras que vamos a emplear en el
                                relleno. En la receta os aconsejo el relleno de la clásica salsa boloñesa, zanahorias,
                                ajo, pimientos y cebolla.
                            </li>
                            <li>
                                - Introducimos las láminas de lasaña una a una sin que se toquen (para que no se peguen
                                entre ellas). Ahora podemos encontrar infinidad de tipos de lasaña donde no hace
                                hidratarla como se hacía antes. En casa muchas veces para ahorrar tiempo empleo las que
                                se hidratan con la bechamel y el jugo que suelta la salsa al hornear. Si lo hacéis de la
                                manera tradicional tenemos que remover con una cuchara de madera y en unos 10 minutos
                                sacamos las láminas. Las estiramos encima de unas hojas de papel absorbente de cocina.
                                Aunque os parezca que no están, acabarán haciéndose en el horno.
                            </li>
                            <li>
                                - El siguiente paso será lavar muy bien todas las verduras que vamos a emplear en el
                                relleno. En la receta os aconsejo el relleno de la clásica salsa boloñesa, zanahorias,
                                ajo, pimientos y cebolla.
                            </li>
                        </ul>
                    </div>
                    <div className="order-2 px-0 flex-1 py-4 lg:px-6 lg:order-2">
                        <h2 className="text-lg font-bold text-black dark:text-white mb-4">Ingredientes</h2>
                        <ul className="text-justify">
                            <li>- 1 Cda colmada de café</li>
                            <li>- 1 Tarro de leche condensada</li>
                            <li>- 1 Tarro grande de crema de Leche de 236 g</li>
                        </ul>
                    </div>
                    <div className="order-1 px-0 w-auto lg:w-[400px] flex-1 py-4 lg:order-3">
                        <img className="w-full rounded-md shadow-md" src={RecipeImage} alt="recipe" />
                        <div className="divide-y flex-col flex items-center justify-center mt-6 lg:flex-row lg:p-4 lg:divide-x lg:divide-blue-800 text-sm lg:text-blue-800 lg:border lg:border-blue-300 rounded-lg lg:bg-blue-50 lg:divide-y-0 dark:bg-gray-800 dark:text-white dark:border-white dark:divide-white">
                            <span className="py-4 flex flex-row items-center lg:py-0 lg:px-4">
                                <MdOutlineSoupKitchen size={22} className="text-blue-800 dark:text-gray-100" />
                                <p className="ml-1">8 Porciones</p>
                            </span>
                            <span className="py-4 flex flex-row items-center lg:py-0 lg:px-4">
                                <IoTimerOutline size={22} className="text-blue-800 dark:text-gray-100" />
                                <p className="ml-1">15 minutos</p>
                            </span>
                            <span className="py-4 flex flex-row items-center lg:py-0 lg:px-4">
                                <IoMedical size={22} className="text-blue-800 dark:text-gray-100" />
                                <p className="ml-1">Fácil</p>
                            </span>
                        </div>
                        <p className="mt-6">
                            Notas: Estas son unas notas de ejemplo Estas son unas notas de ejemplo Estas son unas notas
                            de ejemplo Estas son unas notas de ejemplo Estas son unas notas de ejemplo Estas son unas
                            notas de ejemplo
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
