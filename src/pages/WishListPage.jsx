import Navbar from '../components/layout/Navbar/Navbar'
import Footer from '../components/layout/Footer/Footer'
import WishList from '../components/wishList/WishList'

const WishListPage = () => {
    return (
        <div>
            {/* navbar */}
            <Navbar />

            {/* WishList Section */}
            <WishList />

            {/* Footer Section */}
            <Footer />
        </div>
    )
}

export default WishListPage
