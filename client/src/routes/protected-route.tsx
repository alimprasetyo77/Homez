import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/auth-store";
import { useMyProperties } from "@/hooks/use-properties";

const ProtectedRoute = () => {
  const { token, user } = useAuthStore();
  const { pathname } = useLocation();

  const isOwner = user?.role === "OWNER";
  const isOnFormPage = pathname.startsWith("/property/form");

  const { properties, isLoading } = useMyProperties({ enabled: isOwner });

  const havePendingProperty = isOwner ? properties?.some((property) => property.status === "pending") : false;

  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  if (isOnFormPage && havePendingProperty && !isLoading) {
    return <Navigate to="/dashboard/property" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
