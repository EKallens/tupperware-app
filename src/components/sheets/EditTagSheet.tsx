import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Loader } from 'lucide-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getTagById, updateTag } from '@/lib/tagsApi'
import { useOpenTag } from '@/hooks/use-open-tag'
import { TagForm } from '../forms/TagForm'
import { toast, Toaster } from 'sonner'

export const EditTagSheet = () => {
    const { isOpen, onClose, id } = useOpenTag()
    const queryClient = useQueryClient()
    const { data, isLoading } = useQuery({
        queryKey: ['tag', id],
        queryFn: () => getTagById(id!),
        enabled: isOpen && !!id,
        refetchOnWindowFocus: false
    })

    const updateTagMutation = useMutation({
        mutationFn: (value: string) => updateTag(id!, value),
        onSuccess: () => {
            toast.success('Etiqueta actualizada correctamente')
            onClose()
            queryClient.invalidateQueries({ queryKey: ['tag', id] })
            queryClient.invalidateQueries({ queryKey: ['tags'] })
        }
    })

    const onSubmit = (value: { name: string }) => {
        updateTagMutation.mutate(value.name.replace(/\s+/g, '').toLocaleLowerCase())
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <Toaster />
            <SheetContent className="bg-white space-y-4">
                <SheetHeader>
                    <SheetTitle>Editar Etiqueta</SheetTitle>
                    <SheetDescription>Edita una etiqueta existente</SheetDescription>
                </SheetHeader>
                {isLoading || !data ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader className="size-4 text-muted-foreground animate-spin" />
                    </div>
                ) : (
                    <TagForm
                        id={id}
                        onSubmit={onSubmit}
                        defaultValues={{ name: data.name }}
                        disabled={updateTagMutation.isPending}
                    />
                )}
            </SheetContent>
        </Sheet>
    )
}
