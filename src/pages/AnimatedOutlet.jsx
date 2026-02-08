import { Outlet, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import PageTransition from "../components/Animation/PageTransition/PageTransition"


const AnimatedOutlet = () => {
    const location = useLocation()

    return (
        <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
                <Outlet />
            </PageTransition>
        </AnimatePresence>
    )
}

export default AnimatedOutlet
