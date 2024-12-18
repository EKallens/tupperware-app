import { Breadcrumb } from '@/components/breadcrumb/Breadcrumb'

export const TagsPage = (): JSX.Element => {
    return (
        <div className="mx-auto max-w-170">
            <Breadcrumb pageName="Etiquetas" />
            <div className="p-4 bg-white rounded-sm dark:bg-black"></div>
        </div>
    )
}
