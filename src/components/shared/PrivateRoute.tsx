import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface PrivateRouteProps {
  children: React.ReactNode;
  role?: "admin" | "user";
}

const PrivateRoute = ({ children, role }: PrivateRouteProps) => {
  const { isAuthenticated, role: userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role === "admin" && userRole !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
