import { Check } from 'lucide-react'
import products from "../../data/Products"
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const ProductDesc = () => {

    const { id } = useParams()
    const product = products[id]

    const relatedProducts = Object.values(products)
    const [featured, setFeatured] = useState([])


    useEffect(() => {
        const shuffled = [...relatedProducts].sort(() => Math.random() - 0.5).slice(0, 5)
        setFeatured(shuffled)
    }, [])


    return (
        <div>
            {/*Product Description wala Section */}
            <div className='grid grid-cols-8  gap-4 rounded-lg '>

                <div className='lg:col-span-6 col-span-8 border border-gray-300 rounded-lg'>

                    {/*navbar Section */}
                    <div className='flex lg:w-[60%] justify-between lg:px-2 p-2 items-center'>

                        <div className='lg:p-4 p-1'><h1>Description</h1></div>
                        <div className='lg:p-4 p-1'><h1>Reviews</h1></div>
                        <div className='lg:p-4 p-1'><h1>Shipping</h1></div>
                        <div className='lg:p-4 p-1'><h1>About Seller</h1></div>

                    </div>

                    {/*Description Section */}
                    <div className='p-6 w-full border-t border-gray-300'>
                        {/*Description */}
                        <div className='lg:w-[90%] text-justify'>
                            <p>{product.description},{product.features},{Object.values(product.specs)},{Object.values(product.details)}</p>
                        </div>

                        {/*Model Table */}

                        <table className="lg:w-[65%] w-[80%] border border-gray-400 border-collapse my-4">
                            <tbody>
                                {Object.entries(product.specs).map(([key, value]) => (
                                    <tr key={key} className="border-b border-gray-400">
                                        <td className="capitalize w-52 bg-gray-200 p-4 text-gray-500">
                                            {key}
                                        </td>
                                        <td className="p-4 text-gray-700">
                                            {value}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Extra Features */}
                        <div className='flex flex-col gap-2'>
                            {product.features.map((item) => [
                                <div key={item} className='flex gap-1 text-gray-500 font-light'>
                                    <Check />
                                    <h1>{item}</h1>
                                </div>
                            ])}
                        </div>
                    </div>
                </div>

                {/* You may like wala extra products wala section */}
                <div className='lg:col-span-2 col-span-8'>
                    <div className='p-4 border border-gray-300 rounded-lg'>
                        <div>
                            <div className='text-xl font-semibold pb-4'><h1>You may like</h1></div>
                            <div className='flex flex-col gap-2'>
                                {featured.map((item) => (
                                    <Link key={item.id} to={`/product/${item.id}`} target="_blank">

                                        <div key={item.id} >
                                            <div className='h-28 flex gap-4'>
                                                <div className='h-28 w-[35%] rounded-lg border bg-gray-200 border-gray-300 p-2 flex items-center justify-center'>
                                                    <img className=' h-24 w-24 rounded-lg object-contain' src={item.images[0]} alt={item.title} />
                                                </div>
                                                <div className='w-[65%]'>
                                                    <div><h1>{item.title}</h1></div>
                                                    <div className='text-gray-300'><h1>$7.00-$99.5</h1></div>
                                                </div>
                                            </div>
                                        </div>

                                    </Link>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDesc
