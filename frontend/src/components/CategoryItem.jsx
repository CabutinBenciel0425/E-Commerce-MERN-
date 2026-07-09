import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function CategoryItem({ category }) {
  return (
    <motion.div
      className="relative w-full rounded-lg group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{ aspectRatio: "4/3" }}
    >
      <Link
        to={`/products/category/${category?.href}`}
        className="block w-full h-full"
      >
        <div
          className="relative w-full h-full overflow-hidden rounded-lg bg-cover bg-center bg-no-repeat transition-transform duration-500 ease-out group-hover:scale-110"
          style={{ backgroundImage: `url(${category?.imageURL})` }}
        >
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-gray-900 opacity-50 z-10" />
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <h3 className="text-white text-2xl font-bold mb-2">
              {category?.name}
            </h3>
            <p className="text-gray-200 text-sm">Explore {category?.name}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default CategoryItem;
