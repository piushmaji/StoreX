import { useEffect } from 'react'
import Cart from '../components/Cart/Cart'
import { useCart } from '../context/CartContext/CartContext'
import { useAuth } from '../context/Auth/AuthContext'
import EmptyCart from '../components/Cart/EmptyCart'

const CartPage = () => {
    const { cartItems, loadCart } = useCart()
    const { user } = useAuth()

    // Load cart from Supabase when page opens
    useEffect(() => {
        if (user?.id) loadCart(user.id)
    }, [user])

    return (
        <div>
            {cartItems.length === 0
                ? (<EmptyCart />)
                : (<Cart />)
            }
        </div>
    )
}

export default CartPage
