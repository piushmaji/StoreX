import Navbar from '../components/layout/Navbar/Navbar'
import Footer from '../components/layout/Footer/Footer'
import { useWishList } from '../context/WishListContext/WishListContext'
import WishList from '../components/wishList/WishList'
import EmptyList from '../components/wishList/EmptyList'
const WishListPage = () => {
    const { wishList } = useWishList()
    return (
        <div>
            {/* navbar */}
            <Navbar />

            {/* WishList Section */}
            {wishList.length === 0 ? (<EmptyList />) : (<WishList />)}
            
            {/* Footer Section */}
            <Footer />
        </div>
    )
}

export default WishListPage
