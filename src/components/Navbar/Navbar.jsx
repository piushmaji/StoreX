import { Heart, Menu, MessageSquareText, Search, ShoppingCart, UserRound } from 'lucide-react'
const Navbar = () => {
    return (
        <div>
            <div className='grid grid-cols-2 lg:grid-cols-8 w-full h-36 lg:h-20 bg-gray-50 items-center overflow-x-hidden md:pl-10'>

                {/* BrandName section */}
                <div className='flex h-full lg:col-span-2 lg:justify-center items-center pl-3'>
                    <Menu className='lg:hidden h-7 w-7' />
                    <img
                        className='lg:h-22 lg:w-22 h-18 w-18 drop-shadow-lg'
                        src="img/mainLogo.png" alt="logo" />
                    <h1 className='text-3xl text-blue-500'>StoreX</h1>
                </div>

                {/* Profile section */}
                <div className='flex grid-span-1 lg:col-span-2 gap-4 text-gray-500 lg:order-3  sm:pl-36 md:pl-52 lg:pl-16'>
                    <div className='flex flex-col items-center justify-center'>
                        <UserRound />
                        <h2>Profile</h2>
                    </div>

                    <div className='flex-col items-center justify-center hidden lg:flex md:flex sm:flex'>
                        <Heart />
                        <h2>Wishlist</h2>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <ShoppingCart />
                        <h2>Cart</h2>
                    </div>
                </div>

                {/* Search bar section */}
                <form className='relative flex justify-center items-center col-span-2 lg:col-span-4 lg:order-2 p-2 '>
                    <Search className="absolute lg:left-6 left-14 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        className='border-2 border-r w-4/6 h-10 rounded-l-xl pl-10 focus:outline-none focus:ring-0 border-blue-500 '
                        type="text" placeholder='Search' />

                    <select className='border-2 w-1/6 h-10 border-l-0 p-2 focus:outline-none focus:ring-0 border-blue-500 hidden lg:block md:block sm:block'>
                        <option value="Category">Category</option>
                        <option value="Phone">Phone</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Gadgets">Gadgets</option>
                        <option value="Cloths">Cloths</option>
                    </select>

                    <input
                        className=' w-1/6 h-10 border-l-0 rounded-r-xl p-2 focus:outline-none focus:ring-0 bg-blue-500 text-white'
                        type="submit" name="search" />

                </form>

            </div>

            <div className='hidden md:block lg:block'>
                <div className='flex justify-between items-center pl-42 pr-32 h-15 border border-l-0 border-r-0 border-gray-300 w-full bg-gray-50 '>

                    <div className='flex gap-2 '>
                        <Menu />
                        <h2>All Category</h2>
                        <div className='flex gap-5'>
                            <a href="#">Hot offers</a>
                            <a href="#">Gift Boxes</a>
                            <a href="#">Projects</a>
                            <a href="#">Menu Item</a>
                            <a href="#">Help</a>
                        </div>
                    </div>

                    <div className='flex '>
                        <select name="lang" id="lang" className='focus:outline-0'>
                            <option value="Lang" disabled>Language</option>
                            <option value="English">English</option>
                            <option value="English">Hindi</option>
                            <option value="English">Bengali</option>
                            <option value="English">Urdu</option>
                        </select>

                        <select name="shipment" id="shipment" className='focus:outline-0'>
                            <option value="Ship" disabled>Ship To</option>
                            <option value="India">India 🇮🇳</option>
                            <option value="Japan">Japan 🇯🇵</option>
                            <option value="UK">UK 🇬🇧</option>
                            <option value="USA">USA 🇺🇸</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
