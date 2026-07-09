import { useEffect } from "react";
import { motion } from "framer-motion";

import CategoryItem from "../components/CategoryItem";
import useProductStore from "../store/useProductStore";
import Carousel from "../components/Carousel";
import MiniSpinner from "../components/MiniSpinner";

const categories = [
  { href: "/jeans", name: "Jeans", imageURL: "/jeans.jpg" },
  { href: "/t-shirts", name: "T-Shirts", imageURL: "/tshirts.jpg" },
  { href: "/shoes", name: "Shoes", imageURL: "/shoes.jpg" },
  { href: "/glasses", name: "Glasses", imageURL: "/glasses.png" },
  { href: "/jackets", name: "Jackets", imageURL: "/jackets.jpg" },
  { href: "/suits", name: "Suits", imageURL: "/suits.jpg" },
  { href: "/bags", name: "Bags", imageURL: "/bags.jpg" },
];

function Homepage() {
  const { featuredProducts, getFeaturedProducts, loading } = useProductStore();

  useEffect(() => {
    getFeaturedProducts();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="text-center text-6xl sm:text-6xl font-bold text-primary-600 mb-4"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Explore our categories
        </motion.h1>

        <motion.p
          className="text-center text-xl text-gray-500 mb-12"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Discover the latest trends in an eco-friendly fashion
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {categories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>

        {loading ? (
          <MiniSpinner />
        ) : (
          <div className="mx-auto">
            <h2 className="text-center text-2xl sm:text-3xl font-bold text-primary-600 mb-4">
              Featured Products
            </h2>
            <Carousel featuredProducts={featuredProducts} />
          </div>
        )}
      </div>
    </div>
  );
}
export default Homepage;
