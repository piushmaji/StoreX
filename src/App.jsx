import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProductListingPage from "./pages/ProductListingPage"
import NotFound from "./pages/NotFound"
import ProductDetails from "./pages/ProductDetails"
import CartPage from "./pages/CartPage"


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
  }
])
const App = () => {

  return (
    <RouterProvider router={router} />
  )
}

export default App
