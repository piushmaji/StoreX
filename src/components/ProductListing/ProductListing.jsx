import FilteredCategory from './FilteredCategory'
import ProductCategory from './ProductCategory'

const ProductListingPage = () => {
    return (
        <div className='flex w-full min-h-screen lg:px-12 xl:px-20 lg:pt-8 bg-[#FAFAFA] gap-8'>

            {/* FilteredCategory/Side bar 20% width  */}
            <div className='hidden lg:block w-[280px] shrink-0 sticky top-8 h-fit'>
                <FilteredCategory />
            </div>

            {/* ProductCategory 80% width */}
            <div className='flex-1 pb-16'>
                <ProductCategory />
            </div>
        </div>
    )
}

export default ProductListingPage
