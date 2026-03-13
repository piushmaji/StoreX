import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const MainLayout = () => {
    const location = useLocation();

    return (
        <>
            <Navbar />
            <div
                key={location.pathname}
                style={{
                    animation: "fadeIn 0.25s ease-in-out"
                }}
            >
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default MainLayout;