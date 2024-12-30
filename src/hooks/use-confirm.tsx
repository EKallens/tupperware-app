import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from '@/components/ui/dialog'

export const useConfirm = (title: string, message: string): [() => JSX.Element, () => Promise<unknown>] => {
    const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null)

    const confirm = () =>
        new Promise((resolve) => {
            setPromise({ resolve })
        })

    const handleClose = () => setPromise(null)

    const handleConfirm = () => {
        promise?.resolve(true)
        handleClose()
    }

    const handleCancel = () => {
        promise?.resolve(false)
        handleClose()
    }

    const ConfirmationDialog = () => {
        return (
            <div className="bg-white">
                <Dialog open={promise !== null} onOpenChange={handleCancel}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{title}</DialogTitle>
                            <DialogDescription>{message}</DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="pt-2">
                            <Button onClick={handleCancel} variant="outline">
                                Cancelar
                            </Button>
                            <Button onClick={handleConfirm} variant="primary">
                                Confirmar
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }

    return [ConfirmationDialog, confirm]
}
