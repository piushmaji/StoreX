import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const ProfileLayout = () => {
  const location = useLocation();
  return (
    <>
      <Navbar />
      {/* Navbar Spacer */}
      <div className="h-[105px] lg:h-[72px]" />
      <div className="min-h-screen">
        <Outlet key={location.pathname} />
      </div>
      <Footer />
    </>
  );
};

export default ProfileLayout;
