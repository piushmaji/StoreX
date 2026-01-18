import FilteredCategory from './FilteredCategory'
import ProductCategory from './ProductCategory'

const ProductListingPage = () => {
    return (
        <div className='flex w-full min-h-screen lg:p-18 lg:pt-4 lg:pb-0 overflow-x-hidden'>

            {/* FilteredCategory/Side bar 20% width  */}
            <div className=' hidden lg:block w-1/5 border-r border-gray-200'>
                <FilteredCategory />
            </div>

            {/* ProductCategory 80% width */}
            <div className='w-full lg:w-4/5 '>
                <ProductCategory />
            </div>
        </div>
    )
}

export default ProductListingPage
