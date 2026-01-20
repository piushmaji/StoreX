import ProductPage from '../components/Productpage/ProductPage'
import Navbar from '../components/layout/Navbar/Navbar'
import Footer from '../components/layout/Footer/Footer'

const ProductDetails = () => {
    return (
        <div>
            {/* navbar */}
            <Navbar />

            {/* Product Listing Section */}
            <ProductPage />

            {/* Footer Section */}
            <Footer />
        </div>
    )
}

export default ProductDetails
