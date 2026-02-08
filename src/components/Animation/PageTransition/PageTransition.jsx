import { motion } from "framer-motion"

const PageTransition = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -4 }}
            transition={{
                duration: 0.18,
                ease: "easeInOut"
            }}
        >
            {children}
        </motion.div>
    )
}

export default PageTransition