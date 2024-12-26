import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTag } from '@/lib/tagsApi'
import { TagForm } from '../forms/TagForm'
import { toast, Toaster } from 'sonner'
import { useNewTag } from '@/hooks/use-new-tag'
import { useAuthStore } from '@/store/useAuthStore'

export const CreateTagSheet = () => {
    const { isOpen, onClose } = useNewTag()
    const { user } = useAuthStore()
    const queryClient = useQueryClient()

    const createTagMutation = useMutation({
        mutationFn: (value: string) => createTag(value, user!.id),
        onSuccess: () => {
            toast.success('Etiqueta creada correctamente')
            onClose()
            queryClient.invalidateQueries({ queryKey: ['tags'] })
        }
    })

    const onSubmit = (value: { name: string }) => {
        createTagMutation.mutate(value.name.replace(/\s+/g, '').toLocaleLowerCase())
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <Toaster />
            <SheetContent className="bg-white space-y-4">
                <SheetHeader>
                    <SheetTitle>Crear Etiqueta</SheetTitle>
                    <SheetDescription>Crea una nueva etiqueta</SheetDescription>
                </SheetHeader>
                <TagForm onSubmit={onSubmit} disabled={createTagMutation.isPending} />
            </SheetContent>
        </Sheet>
    )
}
