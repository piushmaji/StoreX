import { Outlet, useLocation } from "react-router-dom"
import { motion } from "framer-motion"

const AnimatedOutlet = () => {

    return (

        <>
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1]
                }}
            >
                <Outlet />
            </motion.div>
        </>

    )
}

export default AnimatedOutlet
