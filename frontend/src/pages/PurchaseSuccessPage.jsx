import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { Link } from "react-router-dom";
import { usePaymentStore } from "../store/usePaymentStore";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import LoadingSpinner from "../components/LoadingSpinner";

function PurchaseSuccessPage() {
  const { checkoutSuccess, loading } = usePaymentStore();
  const [orderId, setOrderId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const sessionId = new URLSearchParams(window.location.search).get(
    "session_id",
  );

  useEffect(() => {
    const handleCheckoutSuccess = async () => {
      if (isProcessing || !sessionId) return;

      setIsProcessing(true);
      if (sessionId) {
        try {
          const result = await checkoutSuccess(sessionId);
          if (result?.orderId) {
            setOrderId(result.orderId);
          }
        } catch (error) {
          console.error("Checkout verification failed:", error);
        }
      }
    };

    handleCheckoutSuccess();
  }, [sessionId]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="h-screen flex items-center justify-center px-4">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.2}
        style={{ zIndex: 99 }}
        numberOfPieces={1000}
        recycle={false}
      />

      <div className="max-w-md w-full bg-gray-100 rounded-lg shadow-md overflow-hidden relative z-10 -mt-50">
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <CheckCircle className="text-primary-600 w-16 h-16 mb-4" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-center text-primary-600 mb-2">
            Purchase Successful!
          </h1>

          <p className="text-gray-500 text-center mb-2">
            Thank you for your order. We're processing it now
          </p>

          <p className="text-primary-600 text-center text-sm mb-6">
            Check your emails for details and updates
          </p>

          <div className="bg-gray-200 rounded-lg p-4 text-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Order number:</span>
              <span className="font-semibold text-primary-600">#{orderId}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Estimated delivery: </span>
              <span className="font-semibold text-primary-600">
                3-5 business days
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button className="w-full bg-primary-700 hover:bg-primary-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center">
            <HandHeart className="mr-2" size={18} />
            Thanks for trusting us
          </button>

          <Link
            to="/"
            className="w-full bg-gray-300 hover:bg-gray-400 font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
          >
            Continue Shopping <ArrowRight className="ml-2" size={18} />{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PurchaseSuccessPage;
