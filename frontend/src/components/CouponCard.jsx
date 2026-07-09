import { Button, Spinner, TextInput } from "flowbite-react";
import { motion } from "framer-motion";

import useCartStore from "../store/useCartStore";
import { useEffect } from "react";

function CouponCard({ couponCode, setCouponCode }) {
  const {
    coupon,
    isCouponApplied,
    loading,
    getMyCoupon,
    applyCoupon,
    removeCoupon,
  } = useCartStore();
  useEffect(() => {
    getMyCoupon();
  }, []);

  const handleSubmitCoupon = (e) => {
    e.preventDefault();
    applyCoupon(couponCode);
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponCode("");
  };

  const hasActiveCoupon = coupon && !isCouponApplied;
  const hasAppliedCoupon = coupon && isCouponApplied;

  if (coupon === null)
    return (
      <div className="border border-gray-200 bg-gray-100 flex items-center justify-start gap-3 py-4 px-8 tracking-wider rounded-lg shadow-sm flex-col w-full">
        <p className="text-gray-500 font-semibold text-center text-wrap">
          If you purchase 200$ and up, you are eligible to have a 10% voucher
          and you can use it on your next purchase.
        </p>
      </div>
    );
  return (
    <motion.div
      className="border border-gray-200 bg-gray-100 flex items-center justify-start gap-3 py-4 px-8 tracking-wider rounded-lg shadow-sm flex-col w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <p className="mt-3">Do you have a coupon or gift card?</p>

      {hasActiveCoupon && (
        <form
          onSubmit={handleSubmitCoupon}
          className="w-[80%] flex flex-col gap-3"
        >
          <TextInput
            id="couponCode"
            type="text"
            placeholder="Apply coupon code here"
            required
            shadow
            className="w-full"
            sizing="sm"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            disabled={false}
          />

          <Button
            type="submit"
            size="sm"
            className="cursor-pointer mb-3 py-6 lg:py-3 flex items-center justify-center"
          >
            {loading ? (
              <Spinner light size="sm" className="me-3">
                Loading
              </Spinner>
            ) : (
              "Apply Code"
            )}
          </Button>
        </form>
      )}

      {hasAppliedCoupon && (
        <div>
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-500">
              Applied Coupon:{" "}
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              {coupon?.code} - {coupon?.discountPercentage}% off
            </p>
          </div>

          <motion.div
            type="button"
            className="mt-2 flex-w-full items-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 mb-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRemoveCoupon}
          >
            Remove Coupon
          </motion.div>
        </div>
      )}

      {hasActiveCoupon && (
        <div className="mt-4 flex items-center justify-center flex-col">
          <h3 className="text-lg font-medium text-gray-500">
            Your available coupon:{" "}
          </h3>
          <p className="mt-2 text-sm text-primary-800">
            <span className="font-bold">{coupon?.code}</span> -{" "}
            {coupon?.discountPercentage}% off
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default CouponCard;
