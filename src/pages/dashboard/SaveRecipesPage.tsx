import { motion } from 'framer-motion'
export const SaveRecipesPage = (): JSX.Element => {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div>SaveRecipesPage</div>
        </motion.div>
    )
}
