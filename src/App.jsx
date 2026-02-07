import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProductListingPage from "./pages/ProductListingPage"
import NotFound from "./pages/NotFound"
import ProductDetails from "./pages/ProductDetails"
import CartPage from "./pages/CartPage"
import WishListPage from "./pages/WishListPage"

import ProfilePage from "./pages/ProfilePage"
import Dashboard from "./components/Profile/Dashboard"
import Orders from "./components/Profile/Orders"
import Address from './components/Profile/Address'
import Payment from './components/Profile/Payment'
import { Toaster } from "react-hot-toast"

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFound />
  },
  {
    path: '/product',
    element: <ProductListingPage />
  },
  {
    path: '/product/:id',
    element: <ProductDetails />
  },
  {
    path: '/cart',
    element: <CartPage />
  },
  {
    path: '/wishList',
    element: <WishListPage />
  },
  {
    path: '/profile',
    element: <ProfilePage />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'orders',
        element: <Orders />
      },
      {
        path: 'address',
        element: <Address />
      },
      {
        path: 'payment',
        element: <Payment />
      },
    ]
  }
])
const App = () => {

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center"
        toastOptions={{
          style: {
            marginTop: "60px",
          },
        }} />
    </>
  )
}

export default App
