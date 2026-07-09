import { useParams } from "react-router-dom";
import { useEffect } from "react";

import useProductStore from "../store/useProductStore";
import ProductCard from "./ProductCard";
import MiniSpinner from "./MiniSpinner";

function ProductList() {
  const { category } = useParams();
  const { products, loading } = useProductStore();

  useEffect(() => {
    useProductStore.getState().getProductsByCategory(category);
  }, [category]);

  if (loading) {
    return (
      <div className="mt-20">
        <MiniSpinner />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold text-gray-600">
          No products found in {category.toUpperCase()}
        </h2>
        <p className="text-gray-400 mt-2">Try browsing other categories</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 py-2 px-10 md:py-5 md:px-20 lg:py-10 lg:px-40">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
