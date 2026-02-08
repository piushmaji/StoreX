import { Outlet, useLocation } from "react-router-dom";
import PageTransition from "../../Animation/PageTransition/PageTransition";
import { AnimatePresence } from "motion/react";

const Layout = () => {
    const location = useLocation();

    return (
        <>

            <AnimatePresence mode="wait">
                <PageTransition key={location.pathname}>
                    <Outlet />
                </PageTransition>
            </AnimatePresence>

        </>
    );
};

export default Layout;