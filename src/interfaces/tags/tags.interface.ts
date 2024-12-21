export interface ITag {
    _id: string
    name: string
}

export interface TagStore {
    tags: ITag[]
    setTags: (tags: ITag[]) => void
}
