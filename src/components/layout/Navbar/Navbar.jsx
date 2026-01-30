import { Heart, Menu, Search, ShoppingCart, Store, UserRound, X } from 'lucide-react'
import storex from "../../../assets/images/Logo/storex.png"
import { Link } from 'react-router-dom'
import SideDrawer from './SideDrawer'
import { useCart } from '../../../context/CartContext/CartContext'
import { useState } from 'react'

const Navbar = () => {
    const { cartItem } = useCart()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <div className='sticky top-0 z-50 bg-gray-50'>
            <div className='grid grid-cols-12 w-full px-3 py-2 sm:px-6 sm:py-3 lg:px-20 lg:py-4 bg-gray-50 gap-3 sm:gap-4 border-b border-gray-300'>

                {/* BrandName section */}
                <div className='flex h-full col-span-6 sm:col-span-4 lg:col-span-2 items-center gap-2'>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className='lg:hidden p-1.5 hover:bg-gray-200 rounded-lg transition-colors'
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <div className='hidden'>
                        <SideDrawer />
                    </div>
                    <Link to='/' className='flex items-center gap-2'>
                        <img className='h-8 w-8 sm:h-10 sm:w-10 drop-shadow-lg bg-gray-50 border-2 border-blue-500 rounded-2xl p-1' src={storex} alt="StoreX Logo" />
                        <h1 className='text-xl sm:text-2xl lg:text-3xl text-blue-500 font-semibold'>StoreX</h1>
                    </Link>
                </div>

                {/* Desktop Profile section */}
                <div className='hidden lg:flex justify-end col-span-3 gap-4 text-gray-500 order-3'>
                    <Link to={'/profile'}>
                        <div className='flex flex-col items-center justify-center hover:text-blue-500 transition-colors cursor-pointer'>
                            <UserRound size={24} />
                            <h2 className='text-sm'>Profile</h2>
                        </div>
                    </Link>

                    <Link to={'/product'}>
                        <div className='flex flex-col items-center justify-center hover:text-blue-500 transition-colors cursor-pointer'>
                            <Store size={24} />
                            <h2 className='text-sm'>Store</h2>
                        </div>
                    </Link>

                    <Link to={'/wishlist'}>
                        <div className='flex flex-col items-center justify-center hover:text-blue-500 transition-colors cursor-pointer'>
                            <Heart size={24} />
                            <h2 className='text-sm'>Wishlist</h2>
                        </div>
                    </Link>

                    <Link to='/cart'>
                        <div className='flex flex-col items-center justify-center hover:text-blue-500 transition-colors cursor-pointer relative'>
                            <div className='relative'>
                                {cartItem.length > 0 && (
                                    <div className='h-5 w-5 absolute bg-red-400 rounded-full -right-2 -top-2 flex items-center justify-center border-2 border-gray-50'>
                                        <span className='text-white text-xs font-semibold'>{cartItem.length}</span>
                                    </div>
                                )}
                                <ShoppingCart size={24} />
                            </div>
                            <h2 className='text-sm'>Cart</h2>
                        </div>
                    </Link>
                </div>

                {/* Mobile Cart Icon Only */}
                <div className='flex lg:hidden justify-end col-span-6 sm:col-span-4 items-center'>
                    <Link to='/cart'>
                        <div className='relative p-2 hover:bg-gray-200 rounded-lg transition-colors'>
                            {cartItem.length > 0 && (
                                <div className='h-5 w-5 absolute bg-red-400 rounded-full right-0 top-0 flex items-center justify-center border-2 border-gray-50'>
                                    <span className='text-white text-xs font-semibold'>{cartItem.length}</span>
                                </div>
                            )}
                            <ShoppingCart size={24} className='text-gray-700' />
                        </div>
                    </Link>
                </div>

                {/* Search bar section */}
                <div className='relative flex justify-center items-center col-span-12 sm:col-span-12 lg:col-span-7 order-3 lg:order-2'>
                    <Search className="absolute left-3 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none z-10" />
                    <input
                        className='border-2 w-full h-9 sm:h-10 rounded-l-xl pl-9 sm:pl-12 pr-3 text-sm sm:text-base focus:outline-none border-blue-500'
                        type="text"
                        placeholder='Search products...'
                    />

                    <select className='hidden sm:block flex-1 max-w-35 border-2 h-9 sm:h-10 border-l-0 px-2 text-sm sm:text-base focus:outline-none border-blue-500 bg-white'>
                        <option value="Category">Category</option>
                        <option value="Phone">Phone</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Gadgets">Gadgets</option>
                        <option value="Cloths">Cloths</option>
                    </select>

                    <button className='h-9 sm:h-10 w-20 sm:w-28 lg:w-32 border-l-0 rounded-r-xl text-sm sm:text-base font-medium bg-blue-500 hover:bg-blue-600 text-white cursor-pointer transition-colors active:scale-95'>
                        Search
                    </button>
                </div>

            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className='lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-300 shadow-lg z-40 animate-slideDown'>
                    <div className='flex flex-col'>
                        <Link
                            to={'/profile'}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className='flex items-center gap-4 px-6 py-4 hover:bg-gray-100 transition-colors border-b border-gray-200'
                        >
                            <UserRound size={20} className='text-gray-600' />
                            <span className='text-base font-medium text-gray-700'>Profile</span>
                        </Link>

                        <Link
                            to={'/product'}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className='flex items-center gap-4 px-6 py-4 hover:bg-gray-100 transition-colors border-b border-gray-200'
                        >
                            <Store size={20} className='text-gray-600' />
                            <span className='text-base font-medium text-gray-700'>Store</span>
                        </Link>

                        <Link
                            to={'/wishlist'}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className='flex items-center gap-4 px-6 py-4 hover:bg-gray-100 transition-colors border-b border-gray-200'
                        >
                            <Heart size={20} className='text-gray-600' />
                            <span className='text-base font-medium text-gray-700'>Wishlist</span>
                        </Link>

                        <Link
                            to='/cart'
                            onClick={() => setIsMobileMenuOpen(false)}
                            className='flex items-center gap-4 px-6 py-4 hover:bg-gray-100 transition-colors'
                        >
                            <div className='relative'>
                                {cartItem.length > 0 && (
                                    <div className='h-5 w-5 absolute bg-red-400 rounded-full -right-2 -top-2 flex items-center justify-center border-2 border-white'>
                                        <span className='text-white text-xs font-semibold'>{cartItem.length}</span>
                                    </div>
                                )}
                                <ShoppingCart size={20} className='text-gray-600' />
                            </div>
                            <span className='text-base font-medium text-gray-700'>Cart</span>
                        </Link>
                    </div>
                </div>
            )}

            {/* Overlay for mobile menu */}
            {isMobileMenuOpen && (
                <div
                    className='lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30'
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </div>
    )
}

export default Navbar