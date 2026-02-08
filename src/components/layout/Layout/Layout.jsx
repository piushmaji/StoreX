import { Outlet, useLocation } from "react-router-dom";
import PageTransition from "../../Animation/PageTransition/PageTransition";
import { AnimatePresence } from "motion/react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Layout = () => {
    const location = useLocation();

    return (
        <>
            <Navbar />
            <AnimatePresence mode="wait">
                <PageTransition key={location.pathname}>
                    <Outlet />
                </PageTransition>
            </AnimatePresence>
            <Footer />

        </>
    );
};

export default Layout;