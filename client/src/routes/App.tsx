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
import MainDashboard from "@/pages/dashboard";
import AddProperty from "@/pages/dashboard/add-property";
import Property from "@/pages/dashboard/property";
import Favorite from "@/pages/dashboard/favorite";
import Profile from "@/pages/dashboard/profile";
import LayoutDashboard from "@/components/layouts/layout-dashboard";
import { FaSpinner } from "react-icons/fa";

function App() {
  const { token, fetchUser, isLoading } = useAuthStore();
  useEffect(() => {
    if (token === null) return;
    fetchUser();
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            isLoading ? (
              <div className="absolute top-1/2 right-1/2 translate-y-1/2 translate-x-1/2 ">
                <FaSpinner className="animate-spin size-8" />
              </div>
            ) : (
              <ProtectedRoute />
            )
          }
        >
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/properties/search" element={<Search />} />
            <Route path="/properties/:slug" element={<DetailProperty />} />
            <Route path="/about" element={<About />} />
          </Route>
          <Route element={<LayoutDashboard />}>
            <Route path="/dashboard" element={<MainDashboard />} />
            <Route path="/dashboard/add-property" element={<AddProperty />} />
            <Route path="/dashboard/property" element={<Property />} />
            <Route path="/dashboard/favorite" element={<Favorite />} />
            <Route path="/dashboard/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
