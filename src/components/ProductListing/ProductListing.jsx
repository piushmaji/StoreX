import { useState } from 'react'
import FilteredCategory from './FilteredCategory'
import ProductCategory from './ProductCategory'

const ProductListingPage = () => {
    // Lifted state: This component controls all active filters for the listing page
    // adhering to a production-level architecture for e-commerce filtering.
    const [activeFilters, setActiveFilters] = useState({
        categoryId: "",
        brands: [],
        materials: [],
        styles: [],
        sizes: [],
        colors: [],
        minPrice: 0,
        maxPrice: 10000,
        rating: null,
    });

    const handleApplyFilters = (newFilters) => {
        setActiveFilters(newFilters);
    };

    return (
        <div className='flex w-full min-h-screen lg:px-12 xl:px-20 lg:pt-8 bg-[#FAFAFA] gap-8'>

            {/* FilteredCategory/Side bar 20% width  */}
            {/* We pass the activeFilters and the update handler down to the sidebar */}
            <div className='hidden lg:block w-[280px] shrink-0 sticky top-8 h-fit'>
                <FilteredCategory 
                   activeFilters={activeFilters} 
                   onApplyFilters={handleApplyFilters} 
                />
            </div>

            {/* ProductCategory 80% width */}
            {/* We pass the activeFilters down to the product list to fetch dynamic data */}
            <div className='flex-1 pb-16'>
                <ProductCategory activeFilters={activeFilters} />
            </div>
        </div>
    )
}

export default ProductListingPage
