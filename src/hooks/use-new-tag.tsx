import { create } from 'zustand'

type NewTagState = {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

export const useNewTag = create<NewTagState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))
