import { TagStore } from '@/interfaces/tags/tags.interface'
import { create } from 'zustand'

export const useTagStore = create<TagStore>((set) => ({
    tags: [],
    setTags: (tags) => set({ tags })
}))
