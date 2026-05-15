import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProductListingPage from "./pages/ProductListingPage";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import WishListPage from "./pages/WishListPage";
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import Category from "./components/category/Category";

import Dashboard from "./components/Profile/Dashboard";
import Orders from "./components/Profile/Orders";
import Address from "./components/Profile/Address";
import Payment from "./components/Profile/Payment";

import MainLayout from "./components/layout/MainLayout/MainLayout";
import ProfileLayout from "./components/layout/ProfileLayout/ProfileLayout";
import AuthLayout from "./components/layout/AuthLayout/AuthLayout";

import Signup from "./Auth/SignUp";
import Login from "./Auth/Login";
import ForgotPwd from "./Auth/ForgotPwd";
import MainAuth from "./Auth/MainAuth";

import { Toaster, toast, useToasterStore } from "react-hot-toast";
import { useEffect } from "react";

import { AuthProvider } from "./context/Auth/AuthContext";
import ProtectedRoute from "./context/Auth/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminLayout from "./components/layout/admin/AdminLayout";
import AdminProducts from "./pages/admin/AdminProducts";

const RootLayout = () => (
  <AuthProvider>
    <Outlet />
  </AuthProvider>
);

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      // USER WEBSITE ROUTES
      {
        path: "/",
        element: <MainLayout />,
        errorElement: <NotFound />,
        children: [
          {
            path: "*",
            element: <NotFound />,
          },
          { index: true, element: <HomePage /> },
          { path: "product", element: <ProductListingPage /> },
          { path: "products/:slug", element: <ProductDetails /> },
          { path: "category/:slug", element: <Category /> },

          {
            path: "cart",
            element: (
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            ),
          },

          {
            path: "wishList",
            element: (
              <ProtectedRoute>
                <WishListPage />
              </ProtectedRoute>
            ),
          },
        ],
      },

      // PROFILE ROUTES
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <ProfileLayout />
          </ProtectedRoute>
        ),
        errorElement: <NotFound />,
        children: [
          {
            path: "profile",
            element: <ProfilePage />,
            children: [
              { index: true, element: <Dashboard /> },
              { path: "orders", element: <Orders /> },
              { path: "address", element: <Address /> },
              { path: "payment", element: <Payment /> },
            ],
          },
        ],
      },

      // AUTH ROUTES
      {
        element: <AuthLayout />,
        children: [
          {
            element: <MainAuth />,
            children: [
              { path: "login", element: <Login /> },
              { path: "signup", element: <Signup /> },
              { path: "forgot-password", element: <ForgotPwd /> },
            ],
          },
        ],
      },

      // CHECKOUT ROUTES
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },

      {
        path: "/order-confirmation",
        element: (
          <ProtectedRoute>
            <OrderConfirmationPage />
          </ProtectedRoute>
        ),
      },

      // ADMIN ROUTES
      {
        path: "/admin",
        element: <AdminRoute />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              {
                path: "dashboard",
                element: <AdminDashboard />,
              },
              {
                path: "products",
                element: <AdminProducts />,
              },
              {
                path: "add-product",
                element: <AddProduct />,
              },
              {
                path: "edit-product/:id",
                element: <EditProduct />,
              },
              {
                path: "orders",
                element: <AdminOrders />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

const App = () => {
  const { toasts } = useToasterStore();

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= 1)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  return (
    <>
      <RouterProvider router={router} />

      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 4000,
          className: "premium-toast",
          style: {
            background: "#000000",
            color: "#ffffff",
            borderRadius: "100px",
            padding: "14px 28px",
            fontSize: "12px",
            fontWeight: "800",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            marginBottom: "40px",
            fontFamily: "var(--font-sans)",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#000000",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#000000",
            },
          },
        }}
      />
    </>
  );
};

export default App;
