import { useEffect, useState } from "react"
import products from "../../data/Products"
import { useParams } from 'react-router-dom'

const RelatedProduct = () => {

    const { id } = useParams()
    const product = products[id]
    const relatedProduct = Object.values(products)
    const [featured, setFeatured] = useState([])

    useEffect(() => {

        const shuffled = [...relatedProduct].sort(() => Math.random() - 0.5).slice(0, 6)
        setFeatured(shuffled)

    }, [])

    return (
        <div>
            {/*Related Products Section */}
            <div className='border border-gray-300 rounded-lg bg-gray-50 p-4 mb-4'>
                <div className="text-xl p-2">
                    <h1>Related products</h1>
                </div>
                <div className='flex gap-4 justify-between overflow-x-scroll'>
                    {featured.map((item) => (
                        <div key={item.id} className="w-44 py-4 flex flex-col gap-2 ">
                            <div className='h-48 w-44 rounded-lg bg-gray-50 p-2 border border-gray-300'>
                                <img className='h-full w-full rounded-lg object-contain' src={item.images[0]} alt="" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="font-light"><h1>{item.title}</h1></div>
                                <div className='text-gray-400'><h1>₹{item.pricing.retail.salePrice}</h1></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RelatedProduct
