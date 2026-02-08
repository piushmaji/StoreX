import { Trash2 } from "lucide-react"
import { useWishList } from "../../context/WishListContext/WishListContext"
import { useCart } from '../../context/CartContext/CartContext'
const WishList = () => {

    const { wishList } = useWishList()
    const { addToCart } = useCart()
    const { removeWishListItem } = useWishList()

    return (
        <div className='px-4 py-4 sm:px-8 sm:pt-6 lg:px-20 lg:pt-8'>
            <section className="flex flex-col gap-4">
                {/* WishList name Section */}
                <div className="text-xl sm:text-2xl">
                    <h1>My Wishlist ({wishList.length})</h1>
                </div>

                {/* WishList Cards Section */}
                <div className="">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">

                        {/* Each Card Section */}
                        {wishList.map((item) => (
                            <div key={item.id} className="h-100 border border-gray-300 cursor-pointer">

                                {/* image Section */}
                                <div className="h-[65%] w-full bg-white flex items-center justify-center object-contain p-2 ">
                                    <img
                                        className="h-full w-full object-contain "
                                        src={item.images?.[0]} alt={item.title} />
                                </div>

                                {/* Description Section */}
                                <div className="h-[20%] flex flex-col gap-2 p-2 border-y border-gray-300 ">
                                    <div className="w-full">
                                        <h1 className="truncate text-sm sm:text-base">{item.title}</h1>
                                    </div>
                                    <div className="flex gap-1 sm:gap-2 items-end justify-center flex-wrap text-xs sm:text-sm lg:text-base">
                                        <h1 className="font-bold">₹{item.pricing?.retail.salePrice}</h1>
                                        <h1 className="text-gray-400 line-through">₹{item.pricing?.retail.originalPrice}</h1>
                                        <h1 className="text-orange-400">({item.pricing?.retail.discountPercentage}% OFF)</h1>
                                    </div>
                                </div>

                                {/* Move To Cart Section */}
                                <div className="h-[15%] ">
                                    <button
                                        onClick={() => {
                                            addToCart(item);
                                            removeWishListItem(item.id);
                                        }}
                                        className='h-full w-full flex justify-center items-center gap-1 sm:gap-2 bg-gray-50 font-light text-blue-500 cursor-pointer text-xs sm:text-sm lg:text-base'>
                                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <h1> Move to Cart</h1>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default WishList