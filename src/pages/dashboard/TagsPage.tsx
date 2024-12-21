import { Breadcrumb } from '@/components/breadcrumb/Breadcrumb'
import { DataTable } from '@/components/data-table/DataTable'
import LoadingSpinner from '@/components/loading-spinner/LoadingSpinner'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { ITag } from '@/interfaces/tags/tags.interface'
import { getTags } from '@/lib/tagsApi'
import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { motion } from 'framer-motion'
import { Trash, Edit, MoreHorizontal } from 'lucide-react'

const columns: ColumnDef<ITag>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="dark:border-gray-300"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="dark:border-gray-300"
            />
        ),
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: 'name',
        header: 'Nombre'
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white" align="end">
                        <DropdownMenuItem className="cursor-pointer" onClick={() => console.log(row.original.id)}>
                            <Edit className="size-4 mr-2" />
                            Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onClick={() => console.log(row.original.id)}>
                            <Trash className="size-4 mr-2" />
                            Eliminar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]

export const TagsPage = (): JSX.Element => {
    const { data, isLoading } = useQuery({
        queryKey: ['tags'],
        queryFn: getTags
    })

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mx-auto max-w-170">
                <Breadcrumb pageName="Etiquetas" />
                <div className="flex">
                    <Button variant="primary" className="ml-auto mb-4">
                        Crear nuevo tag
                    </Button>
                </div>
                <div className="p-4 bg-white rounded-sm dark:bg-black">
                    {(data?.length === 0 && isLoading) || !data ? (
                        <LoadingSpinner />
                    ) : (
                        <DataTable columns={columns} data={data || []} filterKey="name" onDelete={() => {}} />
                    )}
                </div>
            </div>
        </motion.div>
    )
}
