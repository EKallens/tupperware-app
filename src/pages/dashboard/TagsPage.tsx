import { Breadcrumb } from '@/components/breadcrumb/Breadcrumb'
import { motion } from 'framer-motion'

export const TagsPage = (): JSX.Element => {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mx-auto max-w-170">
                <Breadcrumb pageName="Etiquetas" />
                <div className="p-4 bg-white rounded-sm dark:bg-black"></div>
            </div>
        </motion.div>
    )
}
