import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  PlusCircle,
  Edit3,
  ChevronRight,
  Store,
  LogOut,
  ChevronLeft,
  X,
} from "lucide-react";
import { useAuth } from "../../context/Auth/AuthContext";
import storex from "../../assets/images/Logo/storex.svg";
import namelogo from "../../assets/images/Logo/namelogo.svg";
import OrderTable from "./OrderTable";

const NAV = [
  {
    label: "Overview",
    items: [
      {
        to: "/admin/dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        file: <OrderTable />,
      },
      {
        to: "/admin/orders",
        label: "Orders",
        icon: ShoppingBag,
        file: <OrderTable />,
      },
    ],
  },
  {
    label: "Catalog",
    items: [
      {
        to: "/admin/products",
        label: "Products",
        icon: Package,
        file: <OrderTable />,
      },
      {
        to: "/admin/add-product",
        label: "Add Product",
        icon: PlusCircle,
        file: <OrderTable />,
      },
    ],
  },
];

/* ─────────────────────────────────────────────
   Shared nav list rendered in both desktop & drawer
───────────────────────────────────────────── */
const NavContent = ({ collapsed, isMobile, onClose, logout }) => {
  const location = useLocation();

  const isActive = (path) =>
    path === "/admin/dashboard"
      ? location.pathname === "/admin/dashboard"
      : location.pathname.startsWith(path);

  return (
    <div
      className="flex flex-col h-full select-none"
      style={{ fontFamily: "'Sora', sans-serif" }}
    >
      {/* ── Brand ── */}
      <Link to={"dashboard"}>
        <div
          className={`flex items-center gap-3 pt-7 pb-6 ${collapsed && !isMobile ? "px-4" : "px-6"}`}
        >
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-xl bg-blue-500 blur-[6px] opacity-20" />
            <div className="relative w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-slate-100">
              <img src={storex} className="w-6 h-6 object-contain" alt="logo" />
            </div>
          </div>

          <AnimatePresence initial={false}>
            {(!collapsed || isMobile) && (
              <motion.div
                key="brand-text"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <img
                  src={namelogo}
                  className="h-4.5 w-auto object-contain"
                  alt="StoreX"
                />
                <p className="text-blue-500 text-[8px] font-black tracking-[0.3em] uppercase mt-1">
                  Admin Panel
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Link>

      {/* ── Nav ── */}
      <nav className="flex-1 overflow-y-auto px-3 pb-2 space-y-5">
        {NAV.map((group) => (
          <div key={group.label}>
            <AnimatePresence initial={false}>
              {(!collapsed || isMobile) && (
                <motion.p
                  key={group.label + "-label"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-[8px] font-extrabold text-slate-400 uppercase tracking-[0.25em] px-3 mb-2 mt-1"
                >
                  {group.label}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="space-y-0.5">
              {group.items.map(({ to, label, icon: Icon }) => {
                const active = isActive(to);
                return (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => isMobile && onClose?.()}
                  >
                    <div
                      className={`
                                                relative flex items-center gap-3 rounded-xl cursor-pointer group
                                                transition-all duration-150
                                                ${collapsed && !isMobile ? "px-2.5 py-2.5 justify-center" : "px-3 py-2.5"}
                                                ${
                                                  active
                                                    ? "bg-blue-600 text-white"
                                                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                                                }
                                            `}
                    >
                      {/* Active pill glow */}
                      {active && (
                        <div className="absolute inset-0 rounded-xl bg-blue-500 opacity-20 blur-sm -z-10" />
                      )}

                      {/* Icon */}
                      <div
                        className={`shrink-0 flex items-center justify-center w-7.5 h-7.5 rounded-lg transition-all duration-150
                                                ${active ? "bg-white/15" : "group-hover:bg-white"}`}
                      >
                        <Icon
                          size={15}
                          strokeWidth={active ? 2.5 : 1.9}
                          className={
                            active
                              ? "text-white"
                              : "text-slate-400 group-hover:text-blue-600"
                          }
                        />
                      </div>

                      {/* Label */}
                      <AnimatePresence initial={false}>
                        {(!collapsed || isMobile) && (
                          <motion.span
                            key={label}
                            initial={{ opacity: 0, x: -4 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -4 }}
                            transition={{ duration: 0.16 }}
                            className="flex-1 text-[12.5px] font-semibold truncate"
                          >
                            {label}
                          </motion.span>
                        )}
                      </AnimatePresence>

                      {active && (!collapsed || isMobile) && (
                        <ChevronRight
                          size={12}
                          className="text-white/60 shrink-0"
                        />
                      )}

                      {/* Collapsed tooltip */}
                      {collapsed && !isMobile && (
                        <span
                          className="
                                                    pointer-events-none absolute left-full ml-3 z-50
                                                    px-2.5 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap
                                                    bg-slate-900 text-white shadow-xl
                                                    opacity-0 group-hover:opacity-100
                                                    translate-x-1 group-hover:translate-x-0
                                                    transition-all duration-150
                                                "
                        >
                          {label}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* ── Divider ── */}
      <div className="mx-4 my-2 h-px bg-slate-100" />

      {/* ── Footer actions ── */}
      <div className="px-3 pb-5 space-y-0.5">
        {/* View Store */}
        <Link to="/" onClick={() => isMobile && onClose?.()}>
          <div
            className={`
                        relative flex items-center gap-3 rounded-xl cursor-pointer group
                        transition-all duration-150 text-slate-500 hover:bg-slate-100 hover:text-slate-800
                        ${collapsed && !isMobile ? "px-2.5 py-2.5 justify-center" : "px-3 py-2.5"}
                    `}
          >
            <div className="shrink-0 w-7.5 h-7.5 rounded-lg flex items-center justify-center group-hover:bg-white transition-all">
              <Store
                size={15}
                strokeWidth={1.9}
                className="text-slate-400 group-hover:text-blue-600"
              />
            </div>
            <AnimatePresence initial={false}>
              {(!collapsed || isMobile) && (
                <motion.span
                  key="vs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[12.5px] font-semibold"
                >
                  View Store
                </motion.span>
              )}
            </AnimatePresence>
            {collapsed && !isMobile && (
              <span className="pointer-events-none absolute left-full ml-3 z-50 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap bg-slate-900 text-white shadow-xl opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-150">
                View Store
              </span>
            )}
          </div>
        </Link>

        {/* Logout */}
        <button
          onClick={logout}
          className={`
                        w-full relative flex items-center gap-3 rounded-xl cursor-pointer group
                        transition-all duration-150 text-slate-500 hover:bg-red-50 hover:text-red-500
                        ${collapsed && !isMobile ? "px-2.5 py-2.5 justify-center" : "px-3 py-2.5"}
                    `}
        >
          <div className="shrink-0 w-7.5 h-7.5 rounded-lg flex items-center justify-center group-hover:bg-red-100/60 transition-all">
            <LogOut
              size={15}
              strokeWidth={1.9}
              className="text-slate-400 group-hover:text-red-500"
            />
          </div>
          <AnimatePresence initial={false}>
            {(!collapsed || isMobile) && (
              <motion.span
                key="lo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[12.5px] font-semibold"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
          {collapsed && !isMobile && (
            <span className="pointer-events-none absolute left-full ml-3 z-50 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap bg-slate-900 text-white shadow-xl opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-150">
              Logout
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Root component
───────────────────────────────────────────── */
const AdminSidebar = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) => {
  const { logout } = useAuth();

  return (
    <>
      {/* ══════════════ DESKTOP ══════════════ */}
      <motion.aside
        animate={{ width: collapsed ? 68 : 232 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative hidden md:flex flex-col h-screen bg-white border-r border-slate-100 shrink-0 overflow-visible"
        style={{ boxShadow: "2px 0 20px rgba(0,0,0,0.04)" }}
      >
        <NavContent collapsed={collapsed} isMobile={false} logout={logout} />

        {/* Collapse pill */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 z-20 w-6 h-6 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-300 transition-colors"
        >
          <motion.div
            animate={{ rotate: collapsed ? 0 : 180 }}
            transition={{ duration: 0.28 }}
          >
            <ChevronLeft size={12} strokeWidth={2.5} />
          </motion.div>
        </motion.button>
      </motion.aside>

      {/* ══════════════ MOBILE ══════════════ */}
      <div className="md:hidden">
        {/* Backdrop */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-slate-900/25 backdrop-blur-[2px]"
            />
          )}
        </AnimatePresence>

        {/* Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.aside
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 left-0 h-full w-[256px] bg-white z-50 flex flex-col border-r border-slate-100"
              style={{ boxShadow: "6px 0 32px rgba(0,0,0,0.10)" }}
            >
              <div className="absolute top-0 inset-x-0 h-[2.5px] bg-linear-to-r from-blue-600 to-sky-400" />

              {/* Close */}
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-5.5 right-4 z-10 w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
              >
                <X size={13} strokeWidth={2.5} />
              </button>

              <NavContent
                collapsed={false}
                isMobile
                onClose={() => setMobileOpen(false)}
                logout={logout}
              />
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default AdminSidebar;
