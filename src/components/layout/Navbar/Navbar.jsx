import { Heart, Menu, Search, ShoppingCart, Store, UserRound } from 'lucide-react'
import storex from "../../../assets/images/Logo/storex.png"
import { Link } from 'react-router-dom'
import SideDrawer from './SideDrawer'
import { useCart } from '../../../context/CartContext/CartContext'

const Navbar = () => {
    const { cartItem } = useCart()
    return (
        <div>
            <div className='grid grid-cols-12 w-full lg:px-20 lg:py-4 p-2 bg-gray-50 overflow-x-hidden gap-4 border-b border-gray-300'>



                {/* BrandName section */}
                <div className='flex h-full lg:col-span-2 col-span-6 items-center gap-2'>
                    <div className='hidden'>
                        <SideDrawer />
                    </div>
                    <Link to='/'> <img className='h-10 w-10 drop-shadow-lg bg-gray-50 border-2 border-blue-500 rounded-2xl p-1' src={storex} /></Link>
                    <Link to='/'><h1 className='text-3xl text-blue-500'>StoreX</h1></Link>
                </div>

                {/* Profile section */}
                <div className='flex justify-end lg:col-span-3 col-span-6 gap-4 text-gray-500 lg:order-3'>
                    <div className='flex flex-col items-center justify-center'>
                        <UserRound />
                        <h2>Profile</h2>
                    </div>
                    <Link to={'/product'}>
                        <div className='flex flex-col items-center justify-center'>
                            <Store />
                            <h2>Store</h2>
                        </div>
                    </Link>
                    <div className='lg:flex flex-col items-center justify-center hidden '>
                        <Heart />
                        <h2>Wishlist</h2>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <Link to='/cart'>

                            <div className='relative'>
                                <div className='h-5 w-5 absolute bg-red-400 rounded-full left-4 -top-2 items-center justify-center flex p-1 border-2 border-gray-50'>
                                    <span className='text-white text-xs'>{cartItem.length}</span>
                                </div>
                                <ShoppingCart />
                            </div>
                            <h2>Cart</h2>
                        </Link>
                    </div>
                </div>

                {/* Search bar section */}
                <form className='relative flex justify-center items-center col-span-12 lg:col-span-7 lg:order-2 '>
                    <Search className="absolute lg:left-6 left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        className='border-2 border-r w-full h-10 rounded-l-xl px-12 focus:outline-none focus:ring-0 border-blue-500 '
                        type="text" placeholder='Search' />

                    <select className='flex-1 border-2 h-10 border-l-0 p-2 focus:outline-none focus:ring-0 border-blue-500 hidden sm:block'>
                        <option value="Category">Category</option>
                        <option value="Phone">Phone</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Gadgets">Gadgets</option>
                        <option value="Cloths">Cloths</option>
                    </select>

                    <button className='h-10 w-32 border-l-0 rounded-r-xl p-2 focus:outline-none focus:ring-0 bg-blue-500 text-white'>Submit</button>
                </form>

            </div>
        </div >
    )
}

export default Navbar
