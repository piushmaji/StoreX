import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext/CartContext.jsx'
import { WishListProvider } from './context/WishListContext/WishListContext.jsx'

createRoot(document.getElementById('root')).render(
  <CartProvider>
    <WishListProvider>
      <App />
    </WishListProvider>
  </CartProvider>
)
