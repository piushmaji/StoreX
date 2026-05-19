import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ScrollToTop from "../../common/ScrollToTop";
import MobileBottomNav from "../Navbar/MobileBottomNav";
import LokiAssistant from "../../common/LokiAssistant";

const MainLayout = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      {/* Navbar Spacer */}
      <div className="h-[105px] lg:h-[72px]" />
      <div
        key={location.pathname}
        className="pb-20 md:pb-0"
        style={{
          animation: "fadeIn 0.25s ease-in-out",
        }}
      >
        <Outlet />
      </div>
      <Footer />
      <MobileBottomNav />
      <LokiAssistant />
    </>
  );
};

export default MainLayout;
