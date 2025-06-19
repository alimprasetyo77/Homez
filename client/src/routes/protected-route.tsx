import { useAuthStore } from "@/stores/auth-store";
import { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children?: ReactNode }) => {
  const { token } = useAuthStore();
  const { pathname } = useLocation();

  // const protectedByToken = ["/dashboard", "/dashboard/profile"];

  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return <Navigate to={"/"} />;
    }
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
