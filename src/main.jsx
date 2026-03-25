import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext/CartContext.jsx'
import { WishListProvider } from './context/WishListContext/WishListContext.jsx'
import "@fontsource/inter";
import { SaveForLaterProvider } from './context/SaveForLater/SaveForLater.jsx'
import { ProductProvider } from './context/admin/ProductContext.jsx'


createRoot(document.getElementById('root')).render(
  
  <SaveForLaterProvider>
    <CartProvider>
      <WishListProvider>
        <ProductProvider>
        <App />
        </ProductProvider>
      </WishListProvider>
    </CartProvider>
  </SaveForLaterProvider>
  
)
