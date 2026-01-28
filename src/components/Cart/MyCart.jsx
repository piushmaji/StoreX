import { ArrowLeft } from 'lucide-react'
import { useCart } from '../../context/CartContext/CartContext'
import { Link } from 'react-router-dom'

const MyCart = () => {


    const { cartItem, setCartItem, updateQty, totalPrice, removeItem } = useCart()

    return (
        <div className='flex flex-col gap-4 '>
            <div className='text-2xl '>
                <h1>My Cart
                    <span>({cartItem.length})</span>
                </h1>
            </div>

            {/* Main Cart section  */}
            <main className='flex flex-col'>

                {/* All Product Cart  */}
                <section className='w-full flex flex-col lg:flex-row gap-4'>

                    <div className='lg:w-[75%]'>
                        <div className='flex flex-col rounded-lg border border-gray-300 gap-4 p-4 justify-between'>

                            {cartItem.map((item) => (
                                <div key={item.id} className='w-full flex justify-between border-b border-gray-300'>

                                    <div className='flex gap-4 pb-4'>
                                        <div className='lg:h-40 lg:w-32 h-24 w-24 bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center p-2'>
                                            <img
                                                className='lg:h-full lg:w-full h-20 w-20 object-contain'
                                                src={item.images[0]} alt={item.title} />
                                        </div>
                                        <div className='h-40 w-[80%] flex flex-col font-light text-gray-400 gap-2 justify-between'>
                                            <div className='text-lg font-semibold text-black'>
                                                <h1>{item.title} </h1>
                                            </div>
                                            <div className=' flex flex-col '>
                                                <div className='flex'>
                                                    <p>
                                                        Size: {item.specs.size},
                                                        Material: {item.details.material},
                                                        Colour: {item.specs.color}
                                                    </p>
                                                </div>
                                                <p>Seller: {item.seller.name}</p>
                                            </div>
                                            <div className='flex gap-2'>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className='lg:px-4 lg:py-2 p-2 bg-gray-50 text-sm border border-gray-300 rounded-lg font-light text-red-500 shadow-md cursor-pointer active:scale-95 transition-all duration-200'>Remove</button>
                                                <button className='lg:px-4 lg:py-2 p-2 bg-gray-50 text-sm border border-gray-300 rounded-lg font-light text-blue-500 shadow-md cursor-pointer active:scale-95 transition-all duration-200'>Save to later</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex flex-col items-end gap-2'>

                                        <div>
                                            <h1>₹{item.pricing.retail.salePrice}</h1>
                                        </div>
                                        <div>
                                            <select
                                                value={item.quantity}
                                                onChange={(e) => updateQty(item.id, Number(e.target.value))}
                                                className='px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg font-light shadow-md focus:outline-0 cursor-pointer'
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


                            <div className='flex justify-between'>
                                <Link to={'/product'}>
                                    <button className='px-4 py-2 bg-blue-600 rounded-lg font-light text-white shadow-md cursor-pointer active:scale-95 transition-all duration-200'>
                                        <div className='flex gap-1'>
                                            <ArrowLeft />
                                            <h1>Back to shop</h1>
                                        </div>
                                    </button>
                                </Link>

                                <button
                                    onClick={() => {
                                        setCartItem([])
                                    }}
                                    className='px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg font-light text-blue-500 shadow-md cursor-pointer active:scale-95 transition-all duration-200'>Remove All</button>
                            </div>
                        </div>
                    </div>

                    {/* payment and bill section */}
                    <div className='lg:w-[25%] flex flex-col gap-4'>

                        {/* Coupon code section */}
                        <div className='flex flex-col border border-gray-300 rounded-lg p-4 gap-4'>
                            <div>
                                <h1>Have a coupon?</h1>
                            </div>
                            <div className='w-full flex items-center'>
                                <input
                                    className='lg:w-[80%] w-full bg-gray-50 p-2 border border-gray-300 rounded-l-lg focus:outline-0'
                                    type="text"
                                    placeholder='Add Coupon' />
                                <button className='px-4 py-2 bg-blue-600 border border-blue-600 rounded-r-lg font-light text-white hover:bg-blue-800 cursor-pointer active:scale-95 transition-all duration-200'>Apply</button>
                            </div>
                        </div>

                        {/* payment and bill section */}
                        <div className='p-4 rounded-lg border border-gray-300 shadow-xl '>
                            <div className='flex flex-col gap-4'>
                                <div className='border-b border-gray-300 pb-4'>
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex justify-between'>
                                            <h1>Subtotal:</h1>
                                            <h2>₹{totalPrice}</h2>
                                        </div>
                                        <div className='flex justify-between'>
                                            <h1>Discount:</h1>
                                            <h2 className='text-red-500'>-$60.00</h2>
                                        </div>
                                        <div className='flex justify-between'>
                                            <h1>Tax:</h1>
                                            <h2 className='text-green-500'>+$47.00</h2>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex justify-between text-xl font-bold'>
                                    <h1>Total:</h1>
                                    <h2>$1357.00</h2>
                                </div>

                                <div className='flex justify-center items-center'>
                                    <button className='w-full p-4 bg-green-500 rounded-lg font-light text-white hover:bg-green-600 cursor-pointer active:scale-95 transition-all duration-200'>Checkout</button>
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
