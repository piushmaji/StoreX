import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext/CartContext.jsx'
import { WishListProvider } from './context/WishListContext/WishListContext.jsx'
import { FirebaseProvider } from './context/AuthContext/Firebase.jsx'

createRoot(document.getElementById('root')).render(
  <FirebaseProvider>
    <CartProvider>
      <WishListProvider>
        <App />
      </WishListProvider>
    </CartProvider>
  </FirebaseProvider>
)
