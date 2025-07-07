import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/auth-store";
import { useMyProperties } from "@/hooks/use-properties";

const ProtectedRoute = () => {
  const { token, user } = useAuthStore();
  const { pathname } = useLocation();

  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  const { role } = user;
  const isOwner = role === "OWNER";
  const isOnFormPage = pathname.startsWith("/property/form");

  const ROUTE_PERMISSIONS = {
    REGULAR: ["/dashboard/favorite", "/dashboard/profile"],
    OWNER: ["/dashboard/property", "/dashboard/favorite", "/dashboard/profile", "/property/form"],
    ADMIN: ["/dashboard/property", "/dashboard/user", "/dashboard/profile", "/dashboard/favorite"],
  };

  const DEFAULT_ROUTES = {
    REGULAR: "/dashboard/favorite",
    OWNER: "/dashboard/property",
    ADMIN: "/dashboard/property",
  };

  const { properties, isLoading } = useMyProperties({
    enabled: isOwner,
  });

  const allowedRoutes = ROUTE_PERMISSIONS[role];
  const hasRouteAccess = allowedRoutes?.includes(pathname);

  if (!hasRouteAccess) {
    const defaultRoute = DEFAULT_ROUTES[role];
    return <Navigate to={defaultRoute} replace />;
  }

  if (isOwner && isOnFormPage && !isLoading) {
    const havePendingProperty = properties?.some((property) => property.status === "pending");

    if (havePendingProperty) {
      return <Navigate to="/dashboard/property" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
