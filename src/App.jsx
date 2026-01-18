import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProductListingPage from "./pages/ProductListingPage"


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/product',
    element: <ProductListingPage />
  }
])
const App = () => {

  return (
    <RouterProvider router={router} />
  )
}

export default App
