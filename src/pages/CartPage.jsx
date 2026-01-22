import Navbar from '../components/layout/Navbar/Navbar'
import Footer from '../components/layout/Footer/Footer'
import Cart from '../components/Cart/Cart'
const CartPage = () => {
    return (
        <div>
            {/* navbar */}
            <Navbar />

            {/* Main Home Section */}
            <Cart />

            {/* Footer Section */}
            <Footer />
        </div>
    )
}

export default CartPage
