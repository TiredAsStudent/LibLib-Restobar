import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LogoLoader from "../components/loaders/LogoLoader";

function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LogoLoader />;
  }

  if (!user) return <Navigate to="/" replace />;

  const normalizedRole = user.role?.toLowerCase();

  if (requiredRole && normalizedRole !== requiredRole.toLowerCase()) {
    // redirect based on actual role
    switch (normalizedRole) {
      case "admin":
        return <Navigate to="/admin" replace />;
      case "staff_menu":
        return <Navigate to="/menu" replace />;
      case "staff_kitchen":
        return <Navigate to="/kitchen" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;
