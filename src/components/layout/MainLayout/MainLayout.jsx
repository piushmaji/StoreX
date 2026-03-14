import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ScrollToTop from "../../common/ScrollToTop";

const MainLayout = () => {
    const location = useLocation();

    return (
        <>
            <ScrollToTop />
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