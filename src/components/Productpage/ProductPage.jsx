import ProductImg from "./ProductImg"
import ProductDesc from "./ProductDesc"
import RelatedProduct from "./RelatedProduct"
const ProductPage = () => {

    return (
        <div className='min-h-screen flex flex-col justify-between gap-4 lg:px-20 lg:pt-8 p-2 overflow-x-hidden bg-gray-50 '>
            {/*Product Image Section */}
            <ProductImg />

            {/*Product Description wala Section */}
            <ProductDesc />

            {/*Related Products Section */}
            <RelatedProduct />
        </div >
    )
}

export default ProductPage
