import { useEffect } from "react";
import useProductStore from "../store/useProductStore";
import MiniSpinner from "../components/MiniSpinner";
import ProductCard from "../components/ProductCard";

function RecommendedProducts() {
  const { recommendedProducts, getRecommendedProducts, loading } =
    useProductStore();

  useEffect(() => {
    getRecommendedProducts();
  }, [getRecommendedProducts]);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <MiniSpinner />
      </div>
    );
  }

  if (!recommendedProducts || recommendedProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-500">
        You might also like
      </h2>
      <div className="grid grid-cols-2 gap-10">
        {recommendedProducts.map((product) => (
          <div key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendedProducts;
