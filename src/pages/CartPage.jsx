import Navbar from '../components/layout/Navbar/Navbar'
import Footer from '../components/layout/Footer/Footer'
import Cart from '../components/Cart/Cart'
import { useCart } from '../context/CartContext/CartContext'
import EmptyCart from '../components/Cart/EmptyCart'

const CartPage = () => {
    const { cartItem } = useCart()
    return (
        <div>
            {/* navbar */}
            <Navbar />

            {/* Main Home Section */}
            {cartItem.length === 0 ?
                (<EmptyCart />) : (<Cart />)}

            {/* Footer Section */}
            <Footer />
        </div>
    )
}

export default CartPage
