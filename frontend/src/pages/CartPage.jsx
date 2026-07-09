import { useNavigate } from "react-router-dom";
import { TbShoppingCartX } from "react-icons/tb";
import { Button } from "flowbite-react";

import useCartStore, { useCartLength } from "../store/useCartStore";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import CouponCard from "../components/CouponCard";
import LoadingSpinner from "../components/LoadingSpinner";
import RecommendedProducts from "../components/RecommendedProducts";
import { useEffect, useState } from "react";

function CartPage() {
  const { cart, loading, clearCart } = useCartStore();
  const [couponCode, setCouponCode] = useState(null);
  const navigate = useNavigate();
  const cartLength = useCartLength();

  useEffect(() => {}, [couponCode]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <LoadingSpinner />
        <p className="text-gray-500">Loading your cart...</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen px-40 relative">
      <h1 className="text-center mx-auto text-4xl font-semibold text-primary-600 mb-5">
        Cart
      </h1>
      {cartLength === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 gap-8">
          <div className="flex flex-col items-center justify-center gap-3">
            <TbShoppingCartX size={100} />
            <p className="text-xl font-semibold">Your cart is empty</p>
          </div>
          <p className="text-gray-600">
            Looks like you haven't added anything in your cart yet.
          </p>

          <Button
            type="button"
            size="sm"
            className="cursor-pointer mb-3 py-6 lg:py-3 flex items-center justify-center"
            onClick={() => navigate("/")}
          >
            Start Shopping
          </Button>
        </div>
      ) : (
        <>
          <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-4 min-h-screen">
            <div className="flex-1">
              <div className="text-2xl font-semibold mb-4 text-gray-500">
                <div className="flex justify-between items-center">
                  <div className="flex flex-row items-center gap-4">
                    <h2 className="text-2xl font-semibold">Your Cart</h2>
                    <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                      {cartLength} {cartLength === 1 ? "item" : "items"}
                    </span>
                  </div>
                  {cartLength > 0 && (
                    <button
                      className="text-sm text-red-500 hover:text-red-700 cursor-pointer"
                      onClick={clearCart}
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-5 mb-10">
                {cart?.map((item, index) => (
                  <CartItem item={item} key={item._id} index={index} />
                ))}
              </div>

              <div>
                <RecommendedProducts />
              </div>
            </div>

            <div className="flex flex-col gap-5 mt-12">
              <div className="lg:w-96 lg:sticky lg:top-4 self-start">
                <OrderSummary couponCode={couponCode} />
              </div>

              <div className="lg:w-96 lg:sticky lg:top-4 self-start">
                <CouponCard
                  couponCode={couponCode}
                  setCouponCode={setCouponCode}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
