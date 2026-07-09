import useCartStore from "../store/useCartStore";

export const useQuantityToggle = (item) => {
  const { itemQuantityToggle } = useCartStore();
  const quantity = parseInt(item.quantity);
  const id = item.product._id.toString();

  const handleDecrementQuantity = () => {
    if (quantity <= 1) return;

    itemQuantityToggle(id, quantity - 1);
  };

  const handleIncrementQuantity = () => {
    itemQuantityToggle(id, quantity + 1);
  };

  return { handleDecrementQuantity, handleIncrementQuantity };
};
