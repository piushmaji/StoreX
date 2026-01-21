import products from "../../data/Products"
import { useParams } from 'react-router-dom'

const RelatedProduct = () => {

    const { id } = useParams()
    const product = products[id]

    return (
        <div>
            {/*Related Products Section */}
            <div className='border border-gray-300 rounded-lg bg-gray-50 p-4 mb-4'>
                <div className="text-xl p-2">
                    <h1>Related products</h1>
                </div>
                <div className='flex gap-4 justify-between'>
                    <div className="w-44 py-4 flex flex-col gap-2">
                        <div className='rounded-lg bg-gray-300 p-1'>
                            <img className='rounded-lg object-contain' src={product.images[0]} alt="" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="font-light"><h1>Men Blazers Sets Elegant Formal</h1></div>
                            <div className='text-gray-400'><h1>$7.00-$99.5</h1></div>
                        </div>
                    </div>

                    <div className="w-44 py-4 flex flex-col gap-2">
                        <div className='rounded-lg bg-gray-300 p-1'>
                            <img className='rounded-lg object-contain' src={product.images[0]} alt="" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="font-light"><h1>Men Blazers Sets Elegant Formal</h1></div>
                            <div className='text-gray-400'><h1>$7.00-$99.5</h1></div>
                        </div>
                    </div>

                    <div className="w-44 py-4 flex flex-col gap-2">
                        <div className='rounded-lg bg-gray-300 p-1'>
                            <img className='rounded-lg object-contain' src={product.images[0]} alt="" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="font-light"><h1>Men Blazers Sets Elegant Formal</h1></div>
                            <div className='text-gray-400'><h1>$7.00-$99.5</h1></div>
                        </div>
                    </div>

                    <div className="w-44 py-4 flex flex-col gap-2">
                        <div className='rounded-lg bg-gray-300 p-1'>
                            <img className='rounded-lg object-contain' src={product.images[0]} alt="" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="font-light"><h1>Men Blazers Sets Elegant Formal</h1></div>
                            <div className='text-gray-400'><h1>$7.00-$99.5</h1></div>
                        </div>
                    </div>

                    <div className="w-44 py-4 flex flex-col gap-2">
                        <div className='rounded-lg bg-gray-300 p-1'>
                            <img className='rounded-lg object-contain' src={product.images[0]} alt="" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="font-light"><h1>Men Blazers Sets Elegant Formal</h1></div>
                            <div className='text-gray-400'><h1>$7.00-$99.5</h1></div>
                        </div>
                    </div>
                    <div className="w-44 py-4 flex flex-col gap-2">
                        <div className='rounded-lg bg-gray-300 p-1'>
                            <img className='rounded-lg object-contain' src={product.images[0]} alt="" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="font-light"><h1>Men Blazers Sets Elegant Formal</h1></div>
                            <div className='text-gray-400'><h1>$7.00-$99.5</h1></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default RelatedProduct
