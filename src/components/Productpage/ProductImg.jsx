import { Check, Crown, Globe, MessageSquareText, ShieldCheck, X } from "lucide-react"
import product from "../../data/Product"
import { useState } from "react"

const ProductImg = () => {
    const [activeImg, setActiveImg] = useState(product.images[0])
    return (
        <div>
            <div key={product.id} >

                <section className=" border border-gray-300 rounded-lg p-6">

                    {/* Image Showcase Section  */}
                    <section className=' md:grid grid-cols-8 gap-6'>
                        <section className="col-span-3">
                            <div className='h-96 flex justify-around' >
                                <img
                                    className='h-96 w-full border border-gray-300 rounded-lg object-contain p-4'
                                    src={activeImg} alt={product.title} />
                            </div>

                            {/*ThumbNail Section */}
                            <div className='w-full flex justify-between gap-2 py-2 overflow-scroll '>
                                {product.images.map((img, i) => (
                                    <img className="h-20 w-20 border border-gray-300 rounded-lg hover:cursor-pointer" key={i} src={img} alt={`thumb-${i}`} onClick={() => setActiveImg(img)} />
                                ))}
                            </div>
                        </section>

                        <section className="col-span-3">

                            <div className="flex flex-col gap-2">
                                <div className={`flex ${product.inStock ? 'text-lime-500' : 'text-red-400'}`}>
                                    {product.inStock ? <Check /> : <X />}
                                    <h1>{product.inStock ? 'In Stock' : 'Not Available'}</h1>
                                </div>
                                <div className="w-[85%] text-2xl font-semibold">
                                    <h1>{product.title}</h1>
                                </div>
                                <div className="flex gap-7">

                                    <div className="flex gap-2 text-yellow-500">
                                        <span>{'⭐️'.repeat(Math.floor(product.rating.stars))}</span>
                                        <h2>{product.rating.score}</h2>
                                    </div>

                                    <div className="flex gap-2 text-gray-400">
                                        <MessageSquareText />
                                        <h2>{product.rating.reviews} reviews</h2>
                                    </div>
                                    <div className="flex gap-2  text-gray-400">
                                        <Crown />
                                        <h2>{product.rating.sold} sold</h2>
                                    </div>

                                </div>
                                <div className="flex gap-5 px-6 py-4 bg-orange-200 mb-2">
                                    {product.pricing.map((item, i) => (
                                        <div key={i} className="flex gap-5">
                                            <div>
                                                <h1 className={`font-bold text-xl ${i === 0 ? 'text-red-500' : ''}`}>${item.price}</h1>
                                                <h2 className="text-gray-600 font-light">{product.pricing[0].range}</h2>
                                            </div>
                                            {i !== product.pricing.length - 1 && (
                                                <div className="border-r-2 border-gray-500" />
                                            )}
                                        </div>
                                    ))}

                                </div>
                            </div>




                            <div className=" flex flex-col gap-2">
                                <div className="grid grid-cols-[180px_1fr] gap-y-3 text-gray-600 font-light">
                                    <h1 className="text-gray-400">Price:</h1>
                                    <h2>{product.details.priceType}</h2>

                                    <h1 className="text-gray-400">Type:</h1>
                                    <h2>{product.details.type}</h2>

                                    <h1 className="text-gray-400">Material:</h1>
                                    <h2>{product.details.material}</h2>

                                    <h1 className="text-gray-400">Design:</h1>
                                    <h2>{product.details.design}</h2>
                                </div>

                                <hr className="text-gray-300 mt-2 pt-2" />

                                <div className="grid grid-cols-[180px_1fr] gap-y-3 text-gray-600 font-light">
                                    <h1 className="text-gray-400">Customization: :</h1>
                                    <h2>{product.details.customization}</h2>

                                    <h1 className="text-gray-400">Protection:</h1>
                                    <h2>{product.details.protection}</h2>

                                    <h1 className="text-gray-400">Warranty:</h1>
                                    <h2>{product.details.warranty}</h2>
                                </div>
                                <hr className="text-gray-300 mt-2 pt-2" />
                            </div>

                        </section>

                        <section className="col-span-2">
                            <div className="border border-gray-300 rounded-lg p-6">
                                <div className="flex gap-4 border-b border-gray-300 pb-4">
                                    <div className="h-14 w-14 flex justify-center items-center bg-green-200 rounded-xl text-4xl text-green-500">
                                        <h1>R</h1>
                                    </div>
                                    <div className="font-light">
                                        <h1>Supplier</h1>
                                        <h2>{product.seller.name}</h2>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4 text-gray-400 pt-2">
                                    <div className="flex gap-4 items-center">
                                        <img
                                            className="h-4 w-6 bg-amber-300"
                                            src={product.seller.flag} alt="logo" />
                                        <h1>{product.seller.location}</h1>

                                    </div>
                                    <div className="flex gap-4">
                                        <ShieldCheck />
                                        <h1>{product.seller.verified ? 'Verified' : 'Not Verified'} Seller</h1>
                                    </div>
                                    <div className="flex gap-4">
                                        <Globe />
                                        <h1>{product.seller.shipping}</h1>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4 pt-4">
                                    <button className="p-2 bg-blue-600 rounded-lg text-white">Send inquiry</button>
                                    <button className="p-2 text-blue-600 rounded-lg bg-white border border-gray-300">Seller’s profile</button>
                                </div>
                            </div>
                        </section>
                    </section>
                </section>
            </div>
        </div >
    )
}

export default ProductImg
