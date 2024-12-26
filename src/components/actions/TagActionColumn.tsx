import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useConfirm } from '@/hooks/use-confirm'
import { useOpenTag } from '@/hooks/use-open-tag'
import { deleteTag } from '@/lib/tagsApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Edit, MoreHorizontal } from 'lucide-react'
import { toast } from 'sonner'

interface ActionProps {
    id: string
}

export const TagActionColumn = ({ id }: ActionProps) => {
    const { onOpen } = useOpenTag()
    const queryClient = useQueryClient()
    const deleteMutation = useMutation({
        mutationFn: () => deleteTag(id),
        onSuccess: () => {
            toast.success('Etiqueta eliminada correctamente')
            queryClient.invalidateQueries({ queryKey: ['tags'] })
        }
    })

    const [ConfirmDialog, confirm] = useConfirm(
        '¿Estás seguro de que quieres eliminar esta etiqueta?',
        'Esta acción no se puede deshacer.',
        deleteMutation.isPending
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
                <DropdownMenuItem disabled={false} className="cursor-pointer" onClick={() => onOpen(id)}>
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
