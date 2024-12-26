import { TagActionColumn } from '@/components/actions/TagActionColumn'
import { Breadcrumb } from '@/components/breadcrumb/Breadcrumb'
import { DataTable } from '@/components/data-table/DataTable'
import LoadingSpinner from '@/components/loading-spinner/LoadingSpinner'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useNewTag } from '@/hooks/use-new-tag'
import { ITag } from '@/interfaces/tags/tags.interface'
import { getUserTags } from '@/lib/tagsApi'
import { useAuthStore } from '@/store/useAuthStore'
import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { motion } from 'framer-motion'

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
        header: 'Nombre',
        cell: ({ row }) => {
            return <div>{row.original.name}</div>
        }
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            return <TagActionColumn id={row.original.id} />
        }
    }
]

export const TagsPage = (): JSX.Element => {
    const { onOpen } = useNewTag()
    const { user } = useAuthStore()
    const { data, isLoading } = useQuery({
        queryKey: ['tags'],
        queryFn: () => getUserTags(user!.id),
        refetchOnWindowFocus: false
    })

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mx-auto max-w-170">
                <Breadcrumb pageName="Etiquetas" />
                <div className="flex">
                    <Button onClick={onOpen} variant="primary" className="ml-auto mb-4">
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
