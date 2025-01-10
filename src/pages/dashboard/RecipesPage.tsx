import { Breadcrumb } from '@/components/breadcrumb/Breadcrumb'
import { DataTable } from '@/components/data-table/DataTable'
import { getUserRecipes } from '@/lib/recipesApi'
import { useAuthStore } from '@/store/useAuthStore'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { ColumnDef } from '@tanstack/react-table'
import { IRecipe } from '@/interfaces/recipes/recipes.interface'
import { getDifficultyLabel } from '@/utils/utils'
import LoadingSpinner from '@/components/loading-spinner/LoadingSpinner'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Link } from 'react-router-dom'
import { RecipeActionColumn } from '@/components/actions/RecipeActionColumn'

const columns: ColumnDef<IRecipe>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value: any) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: 'title',
        header: () => <div className="font-bold">Título</div>,
        cell: ({ row }) => <Link to={`/dashboard/recipes/edit/${row.original.id}`}>{row.getValue('title')}</Link>
    },
    {
        accessorKey: 'difficulty',
        header: () => <div className="font-bold">Dificultad</div>,
        cell: ({ row }) => <div>{getDifficultyLabel(row.getValue('difficulty'))}</div>
    },
    {
        accessorKey: 'isFavorite',
        header: () => <div className="font-bold">Favorita</div>,
        cell: ({ row }) => <div>{row.getValue('isFavorite') ? 'Sí' : 'No'}</div>
    },
    {
        accessorKey: 'servings',
        header: () => <div className="font-bold">Porciones</div>,
        cell: ({ row }) => <div className="">{row.getValue('servings')} personas</div>
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            return <RecipeActionColumn id={row.original.id} />
        }
    }
]

export const RecipesPage = (): JSX.Element => {
    const { user } = useAuthStore()
    const { data, isLoading } = useQuery({
        queryKey: ['user-recipes'],
        queryFn: () => user && getUserRecipes(user?.id),
        refetchOnWindowFocus: false
    })

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mx-auto max-w-170">
                <Breadcrumb pageName="Recetas" />
                <div className="flex">
                    <Link to="/dashboard/recipes/new" className="ml-auto mb-4">
                        <Button variant="primary">Crear nueva receta</Button>
                    </Link>
                </div>
                <div className="p-4 bg-white rounded-sm dark:bg-black">
                    {(data?.length === 0 && isLoading) || !data ? (
                        <LoadingSpinner />
                    ) : (
                        <DataTable columns={columns} data={data || []} filterKey="title" onDelete={() => {}} />
                    )}
                </div>
            </div>
        </motion.div>
    )
}
