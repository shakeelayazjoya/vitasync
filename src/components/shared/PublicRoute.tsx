import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, role } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={role === "admin" ? "/admin" : "/dashboard"} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
