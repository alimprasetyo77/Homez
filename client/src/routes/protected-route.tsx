import { useAuthStore } from "@/stores/auth-store";
import { ReactNode, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children?: ReactNode }) => {
  const { token } = useAuthStore();
  const { pathname } = useLocation();

  const [havePendingProperty, setHavePendingProperty] = useState(false);
  // const protectedByToken = ["/dashboard", "/dashboard/profile"];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return <Navigate to={"/"} />;
    }
    if (pathname == "/property/form" && havePendingProperty) {
      return <Navigate to={"/dashboard/property"} />;
    }
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
