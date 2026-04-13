import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"

import HomePage from "./pages/HomePage"
import ProductListingPage from "./pages/ProductListingPage"
import NotFound from "./pages/NotFound"
import ProductDetails from "./pages/ProductDetails"
import CartPage from "./pages/CartPage"
import WishListPage from "./pages/WishListPage"
import ProfilePage from "./pages/ProfilePage"
import CheckoutPage from "./pages/CheckoutPage"
import OrderConfirmationPage from "./pages/OrderConfirmationPage"

import Dashboard from "./components/Profile/Dashboard"
import Orders from "./components/Profile/Orders"
import Address from "./components/Profile/Address"
import Payment from "./components/Profile/Payment"

import MainLayout from "./components/layout/MainLayout/MainLayout"
import ProfileLayout from "./components/layout/ProfileLayout/ProfileLayout"
import AuthLayout from "./components/layout/AuthLayout/AuthLayout"

import Signup from "./Auth/SignUp"
import Login from "./Auth/Login"
import ForgotPwd from "./Auth/ForgotPwd"
import MainAuth from "./Auth/MainAuth"

import { Toaster } from "react-hot-toast"

import { AuthProvider } from "./context/Auth/AuthContext"
import ProtectedRoute from "./context/Auth/ProtectedRoute"
import AdminRoute from "./routes/AdminRoute"

import AdminDashboard from "./pages/admin/AdminDashboard"
import AddProduct from "./pages/admin/AddProduct"
import EditProduct from "./pages/admin/EditProduct"
import AdminOrders from "./pages/admin/AdminOrders"
import AdminLayout from "./components/layout/admin/AdminLayout"
import AdminProducts from "./pages/admin/AdminProducts"

const RootLayout = () => (
  <AuthProvider>
    <Outlet />
  </AuthProvider>
)

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
  element: <NotFound />
},
          { index: true, element: <HomePage /> },
          { path: "product", element: <ProductListingPage /> },
          { path: "product/:id", element: <ProductDetails /> },

          {
            path: "cart",
            element: (
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            )
          },

          {
            path: "wishList",
            element: (
              <ProtectedRoute>
                <WishListPage />
              </ProtectedRoute>
            )
          }
        ]
      },


      // PROFILE ROUTES
      {
        path: "/",
        element: <ProtectedRoute><ProfileLayout /></ProtectedRoute>,
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
          }
        ]
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
              { path: "forgot-password", element: <ForgotPwd /> }
            ]
          }
        ]
      },


      // CHECKOUT ROUTES
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        )
      },

      {
        path: "/order-confirmation",
        element: (
          <ProtectedRoute>
            <OrderConfirmationPage />
          </ProtectedRoute>
        )
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
                element: <AdminDashboard />
              },
              {
                path: "products",
                element: <AdminProducts />
              },
              {
                path: "add-product",
                element: <AddProduct />
              },
              {
                path: "edit-product/:id",
                element: <EditProduct />
              },
              {
                path: "orders",
                element: <AdminOrders />
              }
            ]
          }
        ]
      }

    ]
  }
])

const App = () => {
  return (
    <>
      <RouterProvider router={router} />

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            marginTop: "60px",
            background: "#ffffff",
            color: "#1e3a5f",
            border: "1px solid #bfdbfe",
            borderRadius: "12px",
            padding: "12px 20px",
            fontSize: "14px",
            fontWeight: "500",
            boxShadow: "0 8px 24px rgba(59, 130, 246, 0.15)",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#2563eb",
              secondary: "#ffffff",
            },
            style: {
              background: "#eff6ff",
              border: "1px solid #93c5fd",
              color: "#1e40af",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
            style: {
              background: "#fef2f2",
              border: "1px solid #fca5a5",
              color: "#991b1b",
            },
          },
        }}
      />
    </>
  )
}

export default App