import { create } from 'zustand'

interface SheetState {
    onOpenEditTagSheet: () => void
    editTagSheetOpen: boolean
    setEditTagSheetOpen: (arg: boolean) => void
    addTagSheetOpen: boolean
}

export const useSheetStore = create<SheetState>((set) => ({
    onOpenEditTagSheet: () => set({ editTagSheetOpen: true }),
    editTagSheetOpen: false,
    setEditTagSheetOpen: (isOpen: boolean) => set({ editTagSheetOpen: isOpen }),
    addTagSheetOpen: false,
    setAddTagSheetOpen: (isOpen: boolean) => set({ addTagSheetOpen: isOpen })
}))
