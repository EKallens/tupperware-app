import { create } from 'zustand'

type OpenSidebarState = {
    isOpen: boolean
    setOpen: (isOpen: boolean) => void
}

export const useOpenSidebar = create<OpenSidebarState>((set) => ({
    isOpen: false,
    setOpen(isOpen) {
        set({ isOpen })
    }
}))
