import { ArrowLeft } from 'lucide-react'
import { useCart } from '../../context/CartContext/CartContext'
import { Link } from 'react-router-dom'

const MyCart = () => {


    const { cartItem, setCartItem, updateQty, totalPrice, removeItem } = useCart()

    return (
        <div className='flex flex-col gap-4 p-2 sm:p-4'>
            <div className='text-xl sm:text-2xl'>
                <h1>My Cart
                    <span className='ml-1'>({cartItem.length})</span>
                </h1>
            </div>

            {/* Main Cart section  */}
            <main className='flex flex-col'>

                {/* All Product Cart  */}
                <section className='w-full flex flex-col lg:flex-row gap-4'>

                    <div className='w-full lg:w-[75%]'>
                        <div className='flex flex-col rounded-lg border border-gray-300 gap-4 p-3 sm:p-4 justify-between'>

                            {cartItem.map((item) => (
                                <div key={item.id} className='w-full flex flex-col sm:flex-row justify-between border-b border-gray-300 pb-4 gap-3 sm:gap-0'>

                                    <div className='flex gap-2 sm:gap-4'>
                                        <div className='h-24 w-24 sm:h-32 sm:w-28 lg:h-40 lg:w-32 bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center p-2 shrink-0'>
                                            <img
                                                className='h-full w-full object-contain'
                                                src={item.images[0]} alt={item.title} />
                                        </div>
                                        <div className='flex flex-col font-light text-gray-400 gap-2 justify-between flex-1'>
                                            <div className='text-sm sm:text-base lg:text-lg font-semibold text-black'>
                                                <h1 className='line-clamp-2'>{item.title}</h1>
                                            </div>
                                            <div className='flex flex-col text-xs sm:text-sm'>
                                                <div className='flex flex-wrap'>
                                                    <p className='line-clamp-2'>
                                                        Size: {item.specs.size},
                                                        Material: {item.details.material},
                                                        Colour: {item.specs.color}
                                                    </p>
                                                </div>
                                                <p className='truncate'>Seller: {item.seller.name}</p>
                                            </div>
                                            <div className='flex gap-2 flex-wrap sm:flex-nowrap'>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className='px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-50 text-xs sm:text-sm border border-gray-300 rounded-lg font-light text-red-500 shadow-md cursor-pointer active:scale-95 transition-all duration-200'>Remove</button>
                                                <button className='px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-50 text-xs sm:text-sm border border-gray-300 rounded-lg font-light text-blue-500 shadow-md cursor-pointer active:scale-95 transition-all duration-200 whitespace-nowrap'>Save to later</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex sm:flex-col justify-between sm:justify-start items-end gap-2 sm:gap-2 sm:ml-2'>

                                        <div className='order-2 sm:order-1'>
                                            <h1 className='text-base sm:text-lg font-semibold'>₹{item.pricing.retail.salePrice}</h1>
                                        </div>
                                        <div className='order-1 sm:order-2'>
                                            <select
                                                value={item.quantity}
                                                onChange={(e) => updateQty(item.id, Number(e.target.value))}
                                                className='px-2 py-1.5 sm:px-4 sm:py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs sm:text-sm font-light shadow-md focus:outline-0 cursor-pointer'
                                            >
                                                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                                                    <option key={n} value={n}>
                                                        Qty: {n}
                                                    </option>
                                                ))}
                                            </select>

                                        </div>
                                    </div>
                                </div>
                            ))}


                            <div className='flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 pt-2'>
                                <Link to={'/product'} className='w-full sm:w-auto'>
                                    <button className='w-full sm:w-auto px-4 py-2 sm:py-2.5 bg-blue-600 rounded-lg font-light text-white text-sm sm:text-base shadow-md cursor-pointer active:scale-95 transition-all duration-200'>
                                        <div className='flex gap-1 items-center justify-center'>
                                            <ArrowLeft className='w-4 h-4 sm:w-5 sm:h-5' />
                                            <h1>Back to shop</h1>
                                        </div>
                                    </button>
                                </Link>

                                <button
                                    onClick={() => {
                                        setCartItem([])
                                    }}
                                    className='w-full sm:w-auto px-4 py-2 sm:py-2.5 bg-gray-50 border border-gray-300 rounded-lg font-light text-blue-500 text-sm sm:text-base shadow-md cursor-pointer active:scale-95 transition-all duration-200'>Remove All</button>
                            </div>
                        </div>
                    </div>

                    {/* payment and bill section */}
                    <div className='w-full lg:w-[25%] flex flex-col gap-4'>

                        {/* Coupon code section */}
                        <div className='flex flex-col border border-gray-300 rounded-lg p-3 sm:p-4 gap-3 sm:gap-4'>
                            <div className='text-sm sm:text-base'>
                                <h1>Have a coupon?</h1>
                            </div>
                            <div className='w-full flex items-center'>
                                <input
                                    className='flex-1 bg-gray-50 p-2 border border-gray-300 rounded-l-lg focus:outline-0 text-sm sm:text-base'
                                    type="text"
                                    placeholder='Add Coupon' />
                                <button className='px-3 sm:px-4 py-2 bg-blue-600 border border-blue-600 rounded-r-lg font-light text-white text-sm sm:text-base hover:bg-blue-800 cursor-pointer active:scale-95 transition-all duration-200 whitespace-nowrap'>Apply</button>
                            </div>
                        </div>

                        {/* payment and bill section */}
                        <div className='p-3 sm:p-4 rounded-lg border border-gray-300 shadow-xl'>
                            <div className='flex flex-col gap-3 sm:gap-4'>
                                <div className='border-b border-gray-300 pb-3 sm:pb-4'>
                                    <div className='flex flex-col gap-2 text-sm sm:text-base'>
                                        <div className='flex justify-between'>
                                            <h1>Subtotal:</h1>
                                            <h2>₹{totalPrice}</h2>
                                        </div>
                                        <div className='flex justify-between'>
                                            <h1>Platform fee:</h1>
                                            <h2 className='text-red-500'>+0.00</h2>
                                        </div>
                                        <div className='flex justify-between'>
                                            <h1>Discount:</h1>
                                            <h2 className='text-green-500'>-0.00</h2>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex justify-between text-lg sm:text-xl font-bold'>
                                    <h1>Total:</h1>
                                    <h2>₹{totalPrice}</h2>
                                </div>

                                <div className='flex justify-center items-center'>
                                    <button className='w-full p-3 sm:p-4 bg-green-500 rounded-lg font-light text-white text-sm sm:text-base hover:bg-green-600 cursor-pointer active:scale-95 transition-all duration-200'>Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>

            </main>

        </div>
    )
}

export default MyCart