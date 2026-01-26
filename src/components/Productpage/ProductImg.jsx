import { Check, Crown, Globe, MessageSquareText, ShieldCheck, ShoppingCart, X, Zap } from "lucide-react"
import { useEffect, useState } from "react"
import products from "../../data/Products"
import { useParams } from 'react-router-dom'
import StarRating from "../common/Rating/StarRating"

const ProductImg = () => {

    const { id } = useParams()
    const product = products[id]

    const [activeImg, setActiveImg] = useState(product.images[0])

    useEffect(() => {

        if (product?.images?.length) {
            setActiveImg(product.images[0])
        }
    }, [product])

    return (
        <div>
            <div key={product.id} >

                <section className=" border border-gray-300 rounded-lg p-6">

                    {/* Image Showcase Section  */}
                    <section className=' md:grid grid-cols-8 gap-6'>
                        <section className="col-span-3 flex flex-col gap-2">

                            <section className="">
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
                            <section className="w-full">
                                <div className="flex justify-between items-center gap-2">

                                    <button className="w-[50%] py-3 px-4 bg-red-400 rounded-lg text-white flex gap-2 hover:cursor-pointer hover:bg-red-500 shadow-xl text-sm font-light cursor-pointer active:scale-95 transition-all duration-200 items-center justify-center" >
                                        <ShoppingCart />
                                        <span>Add To Cart</span>
                                    </button>

                                    <button className=" w-[50%] py-3 px-4 bg-orange-400 rounded-lg text-white flex gap-2 hover:cursor-pointer hover:bg-orange-500 shadow-xl text-sm font-light cursor-pointer active:scale-95 transition-all duration-200 items-center justify-center" >
                                        <Zap />
                                        <span>Buy Now</span>
                                    </button>

                                </div>
                            </section>

                        </section>

                        <section className="col-span-3 flex flex-col justify-between lg:p-0 py-4">

                            <div className="h-[50%] flex flex-col gap-2 ">
                                <div className={`flex ${product.inStock ? 'text-lime-500' : 'text-red-400'}`}>
                                    {product.inStock ? <Check /> : <X />}
                                    <h1>{product.inStock ? 'In Stock' : 'Not Available'}</h1>
                                </div>
                                <div className="w-[85%] text-2xl font-semibold">
                                    <h1>{product.title}</h1>
                                </div>
                                <div className="flex gap-7">

                                    <div className="flex items-center gap-2 text-yellow-500">
                                        <StarRating value={product.rating.stars} precision={0.5} readOnly size="small" />
                                        <h2>{product.rating.score}</h2>
                                    </div>

                                    <div className="flex gap-2 text-gray-400 text-xs lg:text-base">
                                        <MessageSquareText />
                                        <h2>{product.rating.reviews} reviews</h2>
                                    </div>
                                    <div className="flex gap-2  text-gray-400 text-xs lg:text-base ">
                                        <Crown />
                                        <h2>{product.rating.sold} sold</h2>
                                    </div>

                                </div>

                                <div className="py-">
                                    {/* Sale Price/Current price */}
                                    <div className="flex  items-end gap-2">
                                        <div className="flex items-end gap-2">
                                            <h1 className="font-bold text-3xl">₹{product.pricing.retail.salePrice}</h1>
                                            <h2 className="text-gray-400 text-lg line-through">₹{product.pricing.retail.originalPrice}</h2>
                                        </div>
                                        <h2 className="text-lime-500 text-lg font-semibold">{product.pricing.retail.discountPercentage}% off</h2>
                                    </div>
                                </div>

                                {/*Multiple Color Section */}
                                <div className="flex-1 flex flex-col py-3">
                                    <div className="text-gray-500">
                                        <h1>Colours:</h1>
                                    </div>
                                    <div>
                                        <div className='w-full flex gap-2 py-2 overflow-scroll '>
                                            {product.images.map((img, i) => (
                                                <img className="h-16 w-16 border border-gray-300 rounded-lg hover:cursor-pointer" key={i} src={img} alt={`thumb-${i}`} onClick={() => setActiveImg(img)} />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className=" flex-1 flex flex-col gap-2 justify-end ">
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

                                <hr className="text-gray-300" />

                                <div className="grid grid-cols-[180px_1fr] gap-y-3 text-gray-600 font-light">
                                    <h1 className="text-gray-400">Customization: :</h1>
                                    <h2>{product.details.customization}</h2>

                                    <h1 className="text-gray-400">Protection:</h1>
                                    <h2>{product.details.protection}</h2>

                                    <h1 className="text-gray-400">Warranty:</h1>
                                    <h2>{product.details.warranty}</h2>
                                </div>
                                <hr className="text-gray-300 " />
                            </div>

                        </section>

                        <section className="col-span-2 flex flex-col gap-5">
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
                                            className="h-4 w-6 object-cover"
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
                                    <button className="p-2 bg-blue-600 rounded-lg text-white cursor-pointer active:scale-95 transition-all duration-200">Send inquiry</button>
                                    <button className="p-2 text-blue-600 rounded-lg bg-white border border-gray-300 cursor-pointer active:scale-95 transition-all duration-200">Seller’s profile</button>
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
