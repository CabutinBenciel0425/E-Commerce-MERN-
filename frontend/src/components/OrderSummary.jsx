import { ArrowRightIcon, Button, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { usePaymentStore } from "../store/usePaymentStore";

import useCartStore from "../store/useCartStore";

function OrderSummary({ couponCode }) {
  const { cart, subTotal, total, coupon, loading, isCouponApplied } =
    useCartStore();
  const { createCheckoutSession } = usePaymentStore();

  const discount = (coupon?.discountPercentage / 100) * subTotal;

  const handlePayment = async () => {
    if (!cart || cart.length === 0) return;
    await createCheckoutSession({
      products: cart,
      couponCode: couponCode || null,
    });
  };

  return (
    <motion.div
      className="border border-gray-200 bg-gray-100 flex items-center justify-start gap-3 py-4 px-8 tracking-wider rounded-lg shadow-sm flex-col w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-2xl font-bold text-primary-800 mb-4">
        Order Summary
      </h1>

      <div className="flex items-center justify-between flex-row w-full">
        <span>Subtotal: </span>
        <span className="text-gray-700 font-bold text-md">
          ${subTotal.toFixed(2)}
        </span>
      </div>

      {coupon && isCouponApplied && (
        <div className="flex items-center justify-between flex-row w-full">
          <span>Discount: </span>
          <span className="text-primary-700 font-bold text-md">
            - ${discount.toFixed(2)}
          </span>
        </div>
      )}

      <hr className="border-0 border-t border-gray-300 w-full" />

      <div className="flex items-center justify-between flex-row w-full mb-4">
        <span>Total: </span>
        <span className="text-black font-bold text-xl">
          ${total.toFixed(2)}
        </span>
      </div>

      <Button
        type="submit"
        size="sm"
        className="cursor-pointer mb-3 py-6 lg:py-3 flex items-center justify-center"
        onClick={handlePayment}
      >
        {loading ? (
          <Spinner light size="sm" className="me-3">
            Loading
          </Spinner>
        ) : (
          "Proceed to checkout"
        )}
      </Button>

      <p className="flex flex-row gap-2">
        or{" "}
        <Link to="/" className="underline text-primary-600 font-semibold">
          Continue Shopping
        </Link>
        <ArrowRightIcon size={25} className="text-primary-600 mt-1" />
      </p>
    </motion.div>
  );
}

export default OrderSummary;
