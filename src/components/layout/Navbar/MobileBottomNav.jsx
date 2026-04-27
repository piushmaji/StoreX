import { Home, Store, Heart, ShoppingCart, UserRound } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../../../context/CartContext/CartContext";
import { useAuth } from "../../../context/Auth/AuthContext";

const NAV_ITEMS = [
  { to: "/", label: "Home", Icon: Home },
  { to: "/product", label: "Store", Icon: Store },
  { to: "/cart", label: "Cart", Icon: ShoppingCart, showBadge: true },
  { to: "/wishlist", label: "Wishlist", Icon: Heart },
  { to: "/profile", label: "Profile", Icon: UserRound, authRequired: true },
];

const MobileBottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { user, profile } = useAuth();

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleClick = (item, e) => {
    if (item.authRequired && !user) {
      e.preventDefault();
      navigate("/login", { state: { from: item.to } });
      return;
    }
    if (item.to === "/profile" && profile?.role === "admin") {
      e.preventDefault();
      navigate("/admin/dashboard");
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      {/* Frosted glass background */}
      <div className="relative bg-white/80 backdrop-blur-xl border-t border-blue-100/60 shadow-[0_-4px_20px_rgba(37,99,235,0.06)]">
        {/* Safe area spacer for notched phones */}
        <div className="flex items-center justify-around px-2 pt-1.5 pb-[calc(0.375rem+env(safe-area-inset-bottom))]">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.to);
            const { Icon } = item;

            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={(e) => handleClick(item, e)}
                className="relative flex flex-col items-center justify-center w-16 py-1 group"
              >
                {/* Active indicator pill */}
                {active && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    className="absolute -top-1.5 w-8 h-1 bg-blue-500 rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 35,
                    }}
                  />
                )}

                {/* Icon container */}
                <div className="relative">
                  <motion.div
                    whileTap={{ scale: 0.85 }}
                    className={`flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 ${
                      active
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-400 group-active:bg-gray-50"
                    }`}
                  >
                    <Icon
                      size={20}
                      strokeWidth={active ? 2.5 : 1.8}
                      className="transition-all duration-200"
                    />
                  </motion.div>

                  {/* Cart badge */}
                  {item.showBadge && cartItems.length > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-4.5 h-4.5 min-w-[18px] bg-blue-600 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                    >
                      {cartItems.length > 9 ? "9+" : cartItems.length}
                    </motion.div>
                  )}
                </div>

                {/* Label */}
                <span
                  className={`text-[10px] font-semibold mt-0.5 transition-colors duration-200 ${
                    active ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
