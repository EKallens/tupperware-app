import { Breadcrumb } from '@/components/breadcrumb/Breadcrumb'
import { DataTable } from '@/components/data-table/DataTable'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Edit, MoreHorizontal } from 'lucide-react'

type Props = {
    id: string
}

const data = [
    { id: '1', title: 'Pizza', description: 'Pizza de pepperoni' },
    { id: '2', title: 'Hamburguesa', description: 'Hamburguesa de res' },
    { id: '3', title: 'Tacos', description: 'Tacos de pastor' },
    { id: '4', title: 'Sushi', description: 'Sushi de salmón' },
    { id: '5', title: 'Pasta', description: 'Pasta a la bolognesa' },
    { id: '6', title: 'Ensalada', description: 'Ensalada cesar' },
    { id: '7', title: 'Pescado', description: 'Pescado frito' },
    { id: '8', title: 'Pollo', description: 'Pollo a la naranja' },
    { id: '9', title: 'Carne', description: 'Carne asada' },
    { id: '10', title: 'Tamales', description: 'Tamales de rajas' }
]

//TODO: We should receive the id from the row as parameter
const Actions = () => {
    const onDelete = async () => {}

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-8 p-0">
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white" align="end">
                <DropdownMenuItem className="cursor-pointer" disabled={false} onClick={() => {}}>
                    <Edit className="size-4 mr-2" />
                    Editar
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" disabled={false} onClick={onDelete}>
                    <Edit className="size-4 mr-2" />
                    Eliminar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const columns: ColumnDef<any>[] = [
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
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Receta
                </Button>
            )
        }
    },
    {
        accessorKey: 'description',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Descripción
                </Button>
            )
        }
    },
    {
        id: 'actions',
        cell: () => <Actions />
    }
]

export const RecipesPage = (): JSX.Element => {
    return (
        <div className="mx-auto max-w-170">
            <Breadcrumb pageName="Recetas" />
            <div className="p-4 bg-white rounded-sm dark:bg-black">
                <DataTable
                    columns={columns}
                    data={data}
                    filterKey="title"
                    onDelete={() => {
                        console.log('onDelete')
                    }}
                />
            </div>
        </div>
    )
}
