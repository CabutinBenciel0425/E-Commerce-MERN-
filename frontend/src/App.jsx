import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import "./index.css";
import LoadingSpinner from "./components/LoadingSpinner";
import Homepage from "./pages/Homepage";
import SignupPage from "./pages/auth/SignupPage";
import SigninPage from "./pages/auth/SigninPage";
import Navbar from "./components/Navbar";
import useUserStore from "./store/useUserStore";
import ProductsPage from "./pages/ProductsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ProductForm from "./pages/ProductForm";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductList from "./components/ProductList";
import useCartStore from "./store/useCartStore";
import CartPage from "./pages/CartPage";
import Footer from "./components/Footer";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";

function App() {
  const { user, checkingAuth } = useUserStore();

  useEffect(() => {
    useUserStore.getState().checkAuth();
  }, []);

  useEffect(() => {
    useCartStore.getState().getCartItems();
  }, [user]);

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <>
      <div className="min-h-screen bg-[--bg-primary] text-[--text-primary] relative overflow-hidden tracking-wider flex flex-col">
        <Navbar />
        <div className="my-10">
          <Routes>
            <Route
              path="/"
              element={user ? <Homepage /> : <Navigate to="/sign-in" />}
            />
            <Route
              path="/sign-up"
              element={!user ? <SignupPage /> : <Navigate to="/" />}
            />
            <Route
              path="/sign-in"
              element={!user ? <SigninPage /> : <Navigate to="/" />}
            />
            <Route path="/sign-out" element={<Homepage />} />

            <Route
              path="/products/category/:category"
              element={<ProductList />}
            />

            <Route
              path="/cart"
              element={user ? <CartPage /> : <Navigate to="/login" />}
            />

            <Route
              path="/checkout-success"
              element={
                user ? <PurchaseSuccessPage /> : <Navigate to="/login" />
              }
            />

            <Route
              path="/checkout-cancel"
              element={user ? <PurchaseCancelPage /> : <Navigate to="/login" />}
            />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Homepage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute adminOnly>
                  <ProductsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products/create"
              element={
                <ProtectedRoute adminOnly>
                  <ProductForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute adminOnly>
                  <AnalyticsPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
