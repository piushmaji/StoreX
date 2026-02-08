import Cart from '../components/Cart/Cart'
import { useCart } from '../context/CartContext/CartContext'
import EmptyCart from '../components/Cart/EmptyCart'

const CartPage = () => {
    const { cartItem } = useCart()
    return (
        <div>

            {/* Main Home Section */}
            {cartItem.length === 0 ?
                (<EmptyCart />) : (<Cart />)}

        </div>
    )
}

export default CartPage
