import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { formatProductName } from "../utils/formatProductName";
import { Spinner } from "flowbite-react";

import QuantityToggle from "./QuantityToggle";
import useCartStore from "../store/useCartStore";

function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, loadingItems } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const productLoading = loadingItems[product._id];

  const handleDecrementQuantity = () => {
    if (quantity <= 1) return;

    setQuantity(quantity - 1);
  };

  const handleIncrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleAddToCart = (id, quantity) => {
    addToCart(id, quantity);
  };

  return (
    <motion.div
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-hidden bg-gray-100 aspect-square">
        <img
          src={product?.image}
          alt={product?.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
          loading="lazy"
        />

        <motion.div
          className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        ></motion.div>

        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
          {product?.category?.toUpperCase()}
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-medium text-gray-600 hover:text-primary-600 transition-colors line-clamp-1">
          {formatProductName(product?.name)}
        </h3>
        <p className="text-sm text-gray-500">{product?.description}</p>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div>
            <span className="text-lg font-bold text-gray-900">
              ${product?.price}
            </span>
          </div>

          <QuantityToggle
            handleDecrementQuantity={handleDecrementQuantity}
            quantity={quantity}
            setQuantity={setQuantity}
            handleIncrementQuantity={handleIncrementQuantity}
            sizeBtn={4}
            sizeText="sm"
            label={"Qty: "}
          />

          <motion.button
            type="button"
            className="inline-flex items-center text-white bg-primary-600 hover:bg-primary-800 box-border border border-transparent focus:ring-4 focus:ring-primary-700 shadow-xs font-medium leading-5 rounded-md text-xs px-3 py-1.5 focus:outline-none cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAddToCart(product._id, quantity)}
          >
            <svg
              className="w-3.5 h-3.5 me-1.5 -ms-0.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
              />
            </svg>
            {productLoading ? (
              <Spinner light size="sm" className="me-3">
                Loading
              </Spinner>
            ) : (
              "Add to Cart"
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
