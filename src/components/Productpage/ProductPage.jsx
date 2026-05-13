import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductImg from "./ProductImg";
import ProductDesc from "./ProductDesc";
import RelatedProduct from "./RelatedProduct";
import { getProductBySlug } from "../../services/productService";

const ProductPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getProductBySlug(slug);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product by slug:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-bold text-gray-500 animate-pulse">
          Loading Product...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-bold text-red-500">
          Product not found.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between gap-4 lg:px-20 lg:pt-8 p-2 overflow-x-hidden bg-gray-50">
      {/*Product Image Section */}
      <ProductImg product={product} />

      {/*Product Description wala Section */}
      <ProductDesc product={product} />
      
      {/*Related Products Section */}
      <RelatedProduct product={product} />
    </div>
  );
};

export default ProductPage;
