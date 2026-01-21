import { Check } from 'lucide-react'
import products from "../../data/Products"
import { useParams } from 'react-router-dom'

const ProductDesc = () => {

    const { id } = useParams()
    const product = products[id]

    return (
        <div>
            {/*Product Description wala Section */}
            <div className='grid grid-cols-8  gap-4 rounded-lg '>
                <div className='col-span-6 border border-gray-300 rounded-lg'>

                    {/*navbar Section */}
                    <div className='flex w-[60%] justify-between px-2 '>

                        <div className='p-4'><h1>Description</h1></div>
                        <div className='p-4'><h1>Reviews</h1></div>
                        <div className='p-4'><h1>Shipping</h1></div>
                        <div className='p-4'><h1>About Seller</h1></div>

                    </div>

                    {/*Description Section */}
                    <div className='p-6 w-full border-t border-gray-300'>
                        {/*Description */}
                        <div className='w-[90%] text-justify'>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus sequi obcaecati nemo est earum repellat ut dolorem labore corporis, unde deleniti laboriosam rerum autem modi esse, ducimus iusto delectus nam dolorum. Vitae sed, ut necessitatibus recusandae aut ullam praesentium, tempore fuga culpa itaque amet, laboriosam corrupti est libero sit. Odio commodi non amet! Voluptatum nisi dolorem exercitationem sequi, totam quas minima voluptas quasi ipsam hic repellendus porro asperiores ipsum dolorum modi numquam velit aliquid delectus sed officiis. Expedita, tenetur ullam. Aspernatur, doloribus. Iure architecto repellendus aut dolor, delectus laboriosam at ducimus saepe illo neque accusantium, ipsa modi, doloribus reprehenderit nulla?</p>
                        </div>

                        {/*Model Table */}

                        <table className="w-[65%] border border-gray-400 border-collapse my-4">
                            <tbody>

                                <tr className="border-b border-gray-400">
                                    <td className="w-52 bg-gray-200 p-4 text-gray-500">
                                        Model
                                    </td>
                                    <td className="p-4 text-gray-700">
                                        #8786867
                                    </td>
                                </tr>

                                <tr className="border-b border-gray-400">
                                    <td className="bg-gray-200 p-4 text-gray-500">
                                        Style
                                    </td>
                                    <td className="p-4 text-gray-700">
                                        Classic style
                                    </td>
                                </tr>

                                <tr className="border-b border-gray-400">
                                    <td className="bg-gray-200 p-4 text-gray-500">
                                        Certificate
                                    </td>
                                    <td className="p-4 text-gray-700">
                                        ISO-898921212
                                    </td>
                                </tr>

                                <tr className="border-b border-gray-400">
                                    <td className="bg-gray-200 p-4 text-gray-500">
                                        Size
                                    </td>
                                    <td className="p-4 text-gray-700">
                                        34mm x 450mm x 19mm
                                    </td>
                                </tr>

                                <tr>
                                    <td className="bg-gray-200 p-4 text-gray-500">
                                        Memory
                                    </td>
                                    <td className="p-4 text-gray-700">
                                        36GB RAM
                                    </td>
                                </tr>

                            </tbody>
                        </table>

                        {/* Extra Features */}
                        <div className='flex flex-col gap-2'>
                            <div className='flex gap-1 text-gray-500 font-light'>
                                <Check />
                                <h1>Some great feature name here</h1>
                            </div>
                            <div className='flex gap-1 text-gray-500 font-light'>
                                <Check />
                                <h1>Some great feature name here</h1>
                            </div>
                            <div className='flex gap-1 text-gray-500 font-light'>
                                <Check />
                                <h1>Some great feature name here</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-2'>
                    <div className='p-4 border border-gray-300 rounded-lg'>
                        <div>
                            <div className='text-xl font-semibold pb-4'><h1>You may like</h1></div>
                            <div className='flex flex-col gap-2'>
                                <div className='flex gap-4'>
                                    <div className='w-24 rounded-lg border bg-white border-gray-300 p-1'>
                                        <img className='rounded-lg object-contain' src={product.images[0]} alt="" />
                                    </div>
                                    <div className=''>
                                        <div><h1>Men Blazers Sets Elegant Formal</h1></div>
                                        <div className='text-gray-300'><h1>$7.00-$99.5</h1></div>
                                    </div>
                                </div>
                                <div className='flex gap-4'>
                                    <div className='w-24 rounded-lg border bg-white border-gray-300 p-1'>
                                        <img className='rounded-lg object-contain' src={product.images[0]} alt="" />
                                    </div>
                                    <div className=''>
                                        <div><h1>Men Blazers Sets Elegant Formal</h1></div>
                                        <div className='text-gray-300'><h1>$7.00-$99.5</h1></div>
                                    </div>
                                </div>
                                <div className='flex gap-4'>
                                    <div className='w-24 rounded-lg border bg-white border-gray-300 p-1'>
                                        <img className='rounded-lg object-contain' src={product.images[0]} alt="" />
                                    </div>
                                    <div className=''>
                                        <div><h1>Men Blazers Sets Elegant Formal</h1></div>
                                        <div className='text-gray-300'><h1>$7.00-$99.5</h1></div>
                                    </div>
                                </div>
                                <div className='flex gap-4'>
                                    <div className='w-24 rounded-lg border bg-white border-gray-300 p-1'>
                                        <img className='rounded-lg object-contain' src={product.images[0]} alt="" />
                                    </div>
                                    <div className=''>
                                        <div><h1>Men Blazers Sets Elegant Formal</h1></div>
                                        <div className='text-gray-300'><h1>$7.00-$99.5</h1></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDesc
