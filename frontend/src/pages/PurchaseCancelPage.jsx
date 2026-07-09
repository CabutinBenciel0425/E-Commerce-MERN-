import { ArrowLeft, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

function PurchaseCancelPage() {
  return (
    <div className="h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-100 rounded-lg shadow-md overflow-hidden relative z-10 -mt-50">
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <XCircle className="text-red-600 w-16 h-16 mb-4" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-center text-red-600 mb-2">
            Purchase Cancelled
          </h1>

          <p className="text-gray-500 text-center mb-2">
            Your order has been cancelled. No charges has been made
          </p>
          <div className="bg-gray-200 rounded-lg p-4 text-sm">
            <p>
              If you encountered any issues during the checkout process, please
              don't hesistate to contact our support team.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="w-full bg-gray-300 hover:bg-gray-400 font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
          >
            <ArrowLeft className="mr-2" size={18} />
            Return to shop
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PurchaseCancelPage;
