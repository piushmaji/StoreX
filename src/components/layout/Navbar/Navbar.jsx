import { Heart, User } from 'lucide-react'
import { Search } from 'lucide-react'
import { ShoppingCart } from 'lucide-react'
import { Store } from 'lucide-react'
import { UserRound } from 'lucide-react'

import storex from "../../../assets/images/Logo/storex.png"
import { Link } from 'react-router-dom'
import SideDrawer from './SideDrawer'
import { useCart } from '../../../context/CartContext/CartContext'
import { useEffect, useState } from 'react'
import products from '../../../data/Products'
import Dropdown from '../SearchBar/Dropdown'


import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { FirebaseContext } from '../../../context/Firebase/Firebase'

const Navbar = () => {

    const { user } = useContext(FirebaseContext)
    const navigate = useNavigate()

    const items = Object.values(products)
    const { cartItem } = useCart()

    const [query, setQuery] = useState('')
    const [show, setShow] = useState(false)

    const filtered = items.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))


    return (
        <div>
            <div className='grid grid-cols-12 w-full lg:px-20 lg:py-4 p-2 bg-gray-50 gap-4 border-b border-gray-300 '>


                {/* BrandName section */}
                <div className='flex h-full lg:col-span-2 col-span-6 items-center gap-2'>
                    <div className='md:hidden'>
                        <SideDrawer />
                    </div>
                    <Link to='/'> <img className='md:h-10 md:w-10 h-7 w-7 drop-shadow-lg bg-gray-50 border-2 border-blue-500 md:rounded-2xl rounded-xl p-1' src={storex} /></Link>
                    <Link to='/'><h1 className='md:text-3xl text-2xl text-blue-500'>StoreX</h1></Link>
                </div>

                {/* Profile section */}
                <div className='flex items-center justify-end lg:col-span-3 col-span-6 gap-4 text-gray-500 lg:order-3'>


                    <Link to={'/product'}>
                        <div className='md:flex flex-col items-center justify-center hidden hover:text-blue-400'>
                            <Store />
                            <h2>Store</h2>
                        </div>
                    </Link>

                    <Link to={'/wishlist'}>
                        <div className='md:flex flex-col items-center justify-center hidden hover:text-blue-400 '>
                            <Heart />
                            <h2>Wishlist</h2>
                        </div>
                    </Link>
                    <div className='flex flex-col items-center justify-center hover:text-blue-400 '>

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

                    <div>
                        {user ? (
                            <button onClick={() => navigate("/profile")}>
                                <div className='md:flex flex-col items-center justify-center hidden hover:text-blue-400'>
                                    <img
                                        src='https://i.pinimg.com/736x/b2/66/f7/b266f7c8ecb53960c5eaa19d2a40dc41.jpg'
                                        className="h-6 w-6 rounded-full" />
                                    <h1>Profile</h1>
                                </div>
                            </button>
                        ) : (
                            <button
                                onClick={() => navigate("/login")}
                            >
                                <div className='md:flex flex-col items-center justify-center hidden hover:text-blue-400 '>
                                    <img
                                        src='https://i.pinimg.com/1200x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg'
                                        className="h-6 w-6 rounded-full" />
                                    <h2>Profile</h2>
                                </div>
                            </button>
                        )}
                    </div>


                </div>

                {/* Search bar section */}
                <div className='relative flex justify-center items-center col-span-12 lg:col-span-7 lg:order-2 '>
                    <Search className="absolute lg:left-6 left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value)
                            setShow(true)
                        }}
                        onFocus={() => setShow(true)}
                        onBlur={() => {
                            setTimeout(() => setShow(false), 200);
                        }}

                        className='w-full h-10 rounded-l-2xl px-12 focus:outline-none focus:ring-0 bg-zinc-200 '
                        type="text" placeholder='Search' />

                    <div className='absolute left-0 right-0 top-12 z-50'>
                        {show && query &&
                            (<Dropdown data={filtered} close={() => setShow(false)} />
                            )}
                    </div>

                    {/* <select className='flex-1 h-10 border-l-0 p-2 focus:outline-none focus:ring-0 hidden sm:block bg-zinc-300'>
                        <option value="Category">Category</option>
                        <option value="Phone">Phone</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Gadgets">Gadgets</option>
                        <option value="Cloths">Cloths</option>
                    </select> */}

                    <button className='h-10 w-32 border-l-0 rounded-r-2xl p-2 focus:outline-none focus:ring-0 bg-blue-500 text-white cursor-pointer'>Search</button>
                </div>

            </div>
        </div >
    )
}

export default Navbar
