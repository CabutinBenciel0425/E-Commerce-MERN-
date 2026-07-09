import { Navigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";
import LoadingSpinner from "./LoadingSpinner";

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, checkingAuth } = useUserStore();

  if (checkingAuth) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
