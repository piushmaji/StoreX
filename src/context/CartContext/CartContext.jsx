import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItemQty,
  clearCartItems,
} from "../../services/cartService/cartService";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  // ── Derived: cart items array (from Supabase join) ──
  const cartItems = cart?.cart_items || [];

  // ── Derived: total price ──
  const totalPrice = cartItems.reduce((sum, item) => {
    const variant = item.product_variants;
    const price = variant?.discount_price || variant?.price || 0;
    return sum + price * item.quantity;
  }, 0);

  // ── Load cart from Supabase ──
  const loadCart = async (userId) => {
    if (!userId) return;
    setLoading(true);
    try {
      const data = await getCart(userId);
      setCart(data);
    } catch (err) {
      console.error("Failed to load cart:", err);
    } finally {
      setLoading(false);
    }
  };

  // ── Add to cart → refresh ──
  const handleAddToCart = async (userId, productId, variantId, quantity = 1) => {
    try {
      await addToCart(userId, productId, variantId, quantity);
      await loadCart(userId);
      toast.success("Added to cart! 🛒");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add item");
    }
  };

  // ── Remove from cart → refresh ──
  const handleRemoveFromCart = async (userId, cartItemId) => {
    try {
      await removeFromCart(cartItemId);
      await loadCart(userId);
      toast.error("Removed from cart");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item");
    }
  };

  // ── Update quantity → refresh ──
  const handleUpdateQty = async (userId, cartItemId, newQty) => {
    try {
      await updateCartItemQty(cartItemId, newQty);
      await loadCart(userId);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update quantity");
    }
  };

  // ── Check if a product is in cart ──
  const isInCart = (productId) => {
    return cartItems.some((item) => item.product_id === productId);
  };

  // ── Clear entire cart → refresh ──
  const handleClearCart = async (userId) => {
    if (!cart?.id) return;
    try {
      await clearCartItems(cart.id);
      await loadCart(userId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItems,
        totalPrice,
        loading,
        loadCart,
        handleAddToCart,
        handleRemoveFromCart,
        handleUpdateQty,
        isInCart,
        handleClearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);