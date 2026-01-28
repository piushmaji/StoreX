import { createContext, useContext, useState } from "react";

export const CartContext = createContext(null)

export const CartProvider = ({ children }) => {

    const [cartItem, setCartItem] = useState([])

    const addToCart = (product) => {
        setCartItem((prev) => {
            const exist = prev.find((item) => item.id === product.id)

            if (exist) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            }

            return [
                ...prev,
                {
                    ...product,
                    quantity: 1,
                }
            ]
        })
    }

    const totalPrice = cartItem.reduce(
        (total, item) => total + item.pricing.retail.salePrice * item.quantity, 0
    )
    const updateQty = (id, qty) => {

        setCartItem((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: qty } : item)
        )
    }
    const removeItem = (id) => {

        setCartItem((prev) =>
            prev.filter((item) => item.id !== id)
        )
    }
    const isInCart = ((id) => {
        return cartItem.some(item => item.id === id)
    })

    return <CartContext.Provider value={{ cartItem, setCartItem, addToCart, updateQty, totalPrice, removeItem, isInCart }}>
        {children}
    </CartContext.Provider>
}


export const useCart = () => useContext(CartContext)