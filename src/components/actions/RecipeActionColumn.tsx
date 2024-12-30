import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useConfirm } from '@/hooks/use-confirm'
import { deleteRecipe } from '@/lib/recipesApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Edit, MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

interface ActionProps {
    id: string
}

export const RecipeActionColumn = ({ id }: ActionProps) => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const deleteMutation = useMutation({
        mutationFn: () => deleteRecipe(id),
        onSuccess: () => {
            toast.success('Receta eliminada correctamente')
            queryClient.invalidateQueries({ queryKey: ['user-recipes'] })
        }
    })

    const [ConfirmDialog, confirm] = useConfirm(
        '¿Estás seguro de que quieres eliminar esta receta?',
        'Esta acción no se puede deshacer.'
    )

    const onDelete = async () => {
        const result = await confirm()
        if (result) deleteMutation.mutate()
    }

    return (
        <DropdownMenu>
            <ConfirmDialog />
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-8 p-0">
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white" align="end">
                <DropdownMenuItem
                    disabled={false}
                    className="cursor-pointer"
                    onClick={() => navigate(`/dashboard/recipes/edit/${id}`)}
                >
                    <Edit className="size-4 mr-2" />
                    Editar
                </DropdownMenuItem>
                <DropdownMenuItem disabled={false} className="cursor-pointer" onClick={onDelete}>
                    <Edit className="size-4 mr-2" />
                    Eliminar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
