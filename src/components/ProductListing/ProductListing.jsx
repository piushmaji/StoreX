import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import FilteredCategory from "./FilteredCategory";
import ProductCategory from "./ProductCategory";

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

  // State for mobile drawer
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const handleApplyFilters = (newFilters) => {
    setActiveFilters(newFilters);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen px-4 lg:px-12 xl:px-20 pt-4 lg:pt-8 bg-[#FAFAFA] gap-8">
      {/* Mobile Filter Drawer / Overlay */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          {/* Drawer */}
          <div className="relative w-[85vw] max-w-[340px] bg-[#FAFAFA] h-full flex flex-col shadow-2xl animate-in slide-in-from-left duration-300">
            {/* Drawer Header */}
            <div className="p-4 bg-white border-b border-gray-100 flex justify-between items-center shrink-0">
              <span className="font-bold text-lg text-gray-800">Filters</span>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 bg-gray-50 hover:bg-red-50 hover:text-red-600 transition-colors rounded-full text-gray-500"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-4 pb-28 no-scrollbar">
              <FilteredCategory
                activeFilters={activeFilters}
                onApplyFilters={(filters) => {
                  handleApplyFilters(filters);
                  setIsMobileFilterOpen(false); // Auto close on apply
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* FilteredCategory/Side bar (Desktop) */}
      <div className="hidden lg:block w-[240px] shrink-0 sticky top-8 h-fit">
        <FilteredCategory
          activeFilters={activeFilters}
          onApplyFilters={handleApplyFilters}
        />
      </div>

      {/* ProductCategory 80% width */}
      {/* We pass the activeFilters down to the product list to fetch dynamic data */}
      <div className="flex-1 pb-16">
        <ProductCategory
          activeFilters={activeFilters}
          onOpenMobileFilters={() => setIsMobileFilterOpen(true)}
        />
      </div>
    </div>
  );
};

export default ProductListingPage;
