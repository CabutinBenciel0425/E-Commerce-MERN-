import { useState } from "react";
import { Trash } from "lucide-react";
import { formatProductName } from "../utils/formatProductName";
import { useQuantityToggle } from "../hooks/useQuantityToggle";
import { motion } from "framer-motion";

import QuantityToggle from "./QuantityToggle";
import DeleteModal from "./DeleteModal";
import useCartStore from "../store/useCartStore";

function CartItem({ item, index }) {
  const { deleteCartItem } = useCartStore();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { handleIncrementQuantity, handleDecrementQuantity } =
    useQuantityToggle(item);

  const itemTotalPrice = item
    ? parseInt(item.quantity) * parseInt(item.product.price)
    : 0;

  const handleDecrementClick = () => {
    if (item.quantity <= 1) {
      setShowDeleteModal(true);
    } else {
      handleDecrementQuantity();
    }
  };

  return (
    <motion.div
      className="border border-gray-200 bg-gray-100 flex items-center justify-start gap-5 lg:gap-10 py-4 px-5 tracking-wider rounded-lg shadow-sm min-w-150"
      initial={{ opacity: 0, x: -20 * (index + 1) }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 * (index + 1) }}
    >
      <div className="w-1/5">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-40 h-40 rounded-md "
        />
      </div>
      <div className="flex flex-col gap-6 w-1/3">
        <h3 className="text-xl font-semibold">
          {formatProductName(item.product.name)}
        </h3>
        <p className="text-lg text-gray-500">${item.product.price}</p>
        <button
          className="text-red-600 bg-transparent cursor-pointer hover:text-red-800"
          onClick={() => setShowDeleteModal(true)}
        >
          <Trash size={25} />
        </button>
      </div>

      <div className="w-1/6">
        <QuantityToggle
          handleDecrementQuantity={handleDecrementClick}
          quantity={item.quantity}
          handleIncrementQuantity={handleIncrementQuantity}
          sizeBtn={6}
          sizeText="xl"
          label="Quantity: "
        />
      </div>

      <div className="w-1/4 ">
        <h3 className="text-black font-bold text-xl flex flex-col items-center justify-center md:flex-row">
          <span>Total: </span>{" "}
          <span className="text-2xl ml-2">${itemTotalPrice}</span>
        </h3>
      </div>

      <DeleteModal
        isOpen={showDeleteModal}
        productId={item._id.toString()}
        onDelete={() => {
          deleteCartItem(item.product._id.toString());

          setShowDeleteModal(false);
        }}
        onClose={() => setShowDeleteModal(false)}
      />
    </motion.div>
  );
}

export default CartItem;
