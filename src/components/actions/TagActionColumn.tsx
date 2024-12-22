import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useOpenTag } from '@/hooks/use-open-tag'
import { Edit, MoreHorizontal } from 'lucide-react'

interface ActionProps {
    id: string
}

export const TagActionColumn = ({ id }: ActionProps) => {
    const { onOpen } = useOpenTag()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-8 p-0">
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white" align="end">
                <DropdownMenuItem disabled={false} onClick={() => onOpen(id)}>
                    <Edit className="size-4 mr-2" />
                    Editar
                </DropdownMenuItem>
                <DropdownMenuItem disabled={false} onClick={() => {}}>
                    <Edit className="size-4 mr-2" />
                    Eliminar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
