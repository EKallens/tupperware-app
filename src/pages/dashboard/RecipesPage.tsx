import { Breadcrumb } from '@/components/breadcrumb/Breadcrumb'
import { DataTable } from '@/components/data-table/DataTable'
import { getUserRecipes } from '@/lib/recipesApi'
import { useAuthStore } from '@/store/useAuthStore'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { ColumnDef } from '@tanstack/react-table'
import { IRecipe } from '@/interfaces/recipes/recipes.interface'
import { transformDifficulty } from '../../utils/utils'
import LoadingSpinner from '@/components/loading-spinner/LoadingSpinner'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

export const columns: ColumnDef<IRecipe>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: 'title',
        header: () => <div className="font-bold">Título</div>
    },
    {
        accessorKey: 'difficulty',
        header: () => <div className="font-bold">Dificultad</div>,
        cell: ({ row }) => <div>{transformDifficulty(row.getValue('difficulty'))}</div>
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
    }
]

export const RecipesPage = (): JSX.Element => {
    const { user } = useAuthStore()
    const { data, isLoading } = useQuery({
        queryKey: ['recipes'],
        queryFn: () => user && getUserRecipes(user?.id)
    })

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mx-auto max-w-170">
                <Breadcrumb pageName="Recetas" />
                <div className="flex">
                    <Button variant="primary" className="ml-auto mb-4">
                        Crear nueva receta
                    </Button>
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
