import { useWishList } from '../context/WishListContext/WishListContext'
import WishList from '../components/wishList/WishList'
import EmptyList from '../components/wishList/EmptyList'
const WishListPage = () => {
    const { wishList } = useWishList()
    return (
        <div>

            {/* WishList Section */}
            {wishList.length === 0 ? (<EmptyList />) : (<WishList />)}

        </div>
    )
}

export default WishListPage
