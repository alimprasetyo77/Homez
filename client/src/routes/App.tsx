import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import About from "@/pages/about";
import Search from "@/pages/properties/search";
import Layout from "@/components/layouts/layout";
import DetailProperty from "@/pages/properties/detail";
import Login from "@/pages/auth/login";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";
import ProtectedRoute from "./protected-route";
import Register from "@/pages/auth/register";
import CreateUpdateProperty from "@/pages/properties/create-update-property";
import Property from "@/pages/dashboard/property";
import Favorite from "@/pages/dashboard/favorite";
import Profile from "@/pages/dashboard/profile";
import LayoutDashboard from "@/components/layouts/layout-dashboard";
import { FaSpinner } from "react-icons/fa";
import User from "@/pages/dashboard/admin/user";
import PropertyAdmin from "@/pages/dashboard/admin/property-admin";

function App() {
  const { token, fetchUser, isLoading, user } = useAuthStore();

  const isAdmin = user?.role === "ADMIN";

  useEffect(() => {
    if (token && !user) {
      fetchUser();
    }
  }, [token, user]);

  if (isLoading || (token && !user)) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <FaSpinner className="animate-spin size-8" />
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/properties/search" element={<Search />} />
          <Route path="/property/:propertyId" element={<DetailProperty />} />
          <Route path="/about" element={<About />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<LayoutDashboard />}>
            <Route path="/dashboard/user" element={<User />} />
            <Route path="/dashboard/property" element={isAdmin ? <PropertyAdmin /> : <Property />} />
            <Route path="/dashboard/favorite" element={<Favorite />} />
            <Route path="/dashboard/profile" element={<Profile />} />
          </Route>
          <Route path="/property/form/:propertyId?" element={<CreateUpdateProperty />} />
        </Route>

        <Route
          path="*"
          element={
            <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 lg font-semibold">
              Not found page.
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
