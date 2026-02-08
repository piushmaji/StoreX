import { useEffect, useState } from "react"
import products from "../../data/Products"
import { Link, useParams } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import WishListIcon from "../common/WishListIcon/WishListIcon"
import { useCart } from "../../context/CartContext/CartContext"
import toast from "react-hot-toast"
const RelatedProduct = () => {

    const { id } = useParams()
    const product = products[id]
    const relatedProduct = Object.values(products)
    const [featured, setFeatured] = useState([])
    const { addToCart, cartItem } = useCart()

    const handleCart = (product) => {
        addToCart(product)
    }
    useEffect(() => {

        const shuffled = [...relatedProduct].sort(() => Math.random() - 0.5).slice(0, 6)
        setFeatured(shuffled)

    }, [])

    return (
        <div>
            {/*Related Products Section */}
            <div className='border border-gray-300 rounded-lg bg-gray-50 p-4 mb-4'>
                <div className="text-xl p-2">
                    <h1>Related products</h1>
                </div>
                <div className='flex gap-4 flex-nowrap scroll-smooth snap-x snap-mandatory px-2 overflow-x-auto'>
                    {featured.map((item) => (

                        <div key={item.id} className="relative min-w-40 sm:min-w-45 md:min-w-50 py-4 flex flex-col gap-2 snap-start justify-between">
                            <Link key={item.id} to={`/product/${item.id}`} target="_blank" >
                                <div className='h-48 w-full rounded-lg bg-gray-50 p-4 border border-gray-300'>
                                    <img className='h-full w-full rounded-lg object-contain' src={item.images[0]} alt="" />
                                </div>
                                <div className="h-20 flex flex-col gap-2 justify-between">
                                    <div className="font-light"><h1>{item.title}</h1></div>
                                    <div className='text-gray-400'><h1>₹{item.pricing.retail.salePrice}</h1></div>
                                </div>
                            </Link>

                            <div className="absolute lg:right-0 lg:top-4 -right-1 top-3">
                                <WishListIcon product={item} />
                            </div>

                            <button onClick={() => handleCart(item)} className='p-2 flex gap-2 items-center justify-center text-gray-50 border border-gray-300 rounded-lg font-light bg-blue-500 shadow-md cursor-pointer active:scale-95 transition-all duration-200'>
                                <ShoppingCart />
                                <h1> Add to Cart</h1>
                            </button>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    )
}

export default RelatedProduct
