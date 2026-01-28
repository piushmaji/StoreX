import { ShoppingCart } from 'lucide-react'

const SaveForLater = () => {
    return (
        <div className='lg:py-8 pb-8'>
            {/*Saved for later section */}
            <section className='flex flex-col border border-gray-300 rounded-lg px-6 py-4  gap-4'>
                <div className='text-lg font-semibold'>
                    <h1>Saved for later</h1>
                </div>
                <div className='flex gap-4 items-center justify-start overflow-x-scroll'>

                    <div className='flex flex-col gap-2'>
                        <div className='h-52 w-52 object-fill p-2 border border-gray-300 rounded-lg flex items-center justify-center bg-gray-200'>
                            <img className='h-44 w-full' src="https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/r/8/1/-original-imahfz2tenzpsd3p.jpeg?q=70&crop=false" alt="Phone" />
                        </div>
                        <div className='w-[70%] flex flex-col'>
                            <h1 className='font-semibold text-xl'>$78.00</h1>
                            <h2 className='font-light text-gray-400'>GoPro HERO6 4K Action Camera - Black</h2>
                        </div>
                        <div>
                            <button 
                            className='flex px-6 py-2 gap-2 bg-gray-50 border border-gray-300 rounded-lg font-light text-blue-500 shadow-md cursor-pointer active:scale-95 transition-all duration-200'>
                                <ShoppingCart />
                                <h1> Add to Cart</h1>
                            </button>
                        </div>
                    </div>
                    

                </div>
            </section>
        </div>
    )
}

export default SaveForLater
