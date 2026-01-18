import Footer from '../components/layout/Footer/Footer'
import Navbar from '../components/layout/Navbar/Navbar'
import ProductListing from '../components/ProductListing/ProductListing'

const ProductListingPage = () => {
    return (
        <div>
            {/* navbar */}
            <Navbar />

            {/* Product Listing Section */}
            <ProductListing />

            {/* Footer Section */}
            <Footer />
        </div>
    )
}

export default ProductListingPage
