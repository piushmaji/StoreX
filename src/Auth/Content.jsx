import { ShoppingBag, Heart, Truck, ArrowLeft } from 'lucide-react'
import storex from '../assets/images/Logo/storex.png'
import { Link } from 'react-router-dom'

const Content = () => {
    return (
        <div>
            {/* Left Side - Branding */}
            <div className='relative h-screen hidden lg:flex bg-linear-to-br from-blue-300 via-blue-700 to-blue-800 overflow-hidden '>


                {/* Background Pattern */}
                <div className='absolute inset-0 opacity-10'>
                    <div className='absolute top-20 left-20 w-64 h-64 border-2 border-white rounded-full'></div>
                    <div className='absolute bottom-20 right-20 w-96 h-96 border-2 border-white rounded-full'></div>
                    <div className='absolute top-1/2 left-1/2 w-72 h-72 border-2 border-white transform -translate-x-1/2 -translate-y-1/2'></div>
                </div>

                {/* Content */}
                <div className='relative z-10 flex flex-col justify-center items-center w-full px-12 text-white'>

                    {/* Logo */}
                    <div>
                        <div className='flex items-center gap-3 mb-6'>
                            <img
                                className='h-20 w-20 drop-shadow-2xl bg-white border-4 border-white rounded-3xl p-3'
                                src={storex}
                                alt="StoreX Logo"
                            />
                            <h1 className='text-5xl font-bold drop-shadow-lg'>StoreX</h1>
                        </div>
                    </div>

                    {/* Main Illustration/Image */}
                    <div className='mb-8'>
                        <div className='relative w-96 h-96'>
                            <img
                                src='https://webnox.in/wp-content/uploads/2022/09/E-commerce-Shopping-Cart-Software-Development.png'
                                alt='Shopping Illustration'
                                className='w-full h-full object-contain drop-shadow-2xl'
                            />
                        </div>
                    </div>

                    {/* Features */}
                    <div className='space-y-4 max-w-md'>
                        <h2 className='text-3xl font-bold mb-8'>Welcome to StoreX</h2>
                        <div className='flex items-start gap-4'>
                            <div className='bg-white/20 p-3 rounded-lg'>
                                <ShoppingBag className='w-6 h-6' />
                            </div>
                            <div>
                                <h3 className='font-semibold text-lg mb-1'>Shop with Confidence</h3>
                                <p className='text-blue-100 text-sm'>Browse thousands of products from verified sellers worldwide</p>
                            </div>
                        </div>
                        <div className='flex items-start gap-4'>
                            <div className='bg-white/20 p-3 rounded-lg'>
                                <Truck className='w-6 h-6' />
                            </div>
                            <div>
                                <h3 className='font-semibold text-lg mb-1'>Fast Delivery</h3>
                                <p className='text-blue-100 text-sm'>Get your orders delivered quickly with free shipping on eligible items</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Content