import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const MainLayout = () => {
    const location = useLocation();
    return (
        <>
            <Navbar />
            <Outlet key={location.pathname} />
            <Footer />

        </>
    );
};

export default MainLayout;