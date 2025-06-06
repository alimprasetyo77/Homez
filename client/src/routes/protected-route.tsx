import { useAuthStore } from "@/stores/auth-store";
import { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children?: ReactNode }) => {
  const { isLogin } = useAuthStore();
  const { pathname } = useLocation();

  const protectedByToken = ["/dashboard", "/dashboard/profile"];

  if (protectedByToken.includes(pathname)) {
    if (!isLogin) {
      return <Navigate to={"/"} />;
    }
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
