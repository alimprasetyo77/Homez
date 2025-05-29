import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import About from "@/pages/about";
import Search from "@/pages/properties/search";
import Layout from "@/components/layouts/layout";
import DetailProperty from "@/pages/properties/detail";
import Login from "@/pages/auth/login";
import { useCallback, useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { refreshToken } from "@/services/auth/api";
import { toast } from "sonner";
import ProtectedRoute from "./protected-route";
import Register from "@/pages/auth/register";

function App() {
  const { token, fetchUser, setToken, logout } = useAuthStore();
  const init = useCallback(async () => {
    try {
      const response = await refreshToken();
      if (response.status === 204) return;
      setToken(response.data.accessToken);
    } catch (error) {
      toast("Session expired please login again");
      logout();
    }
  }, [setToken, logout]);
  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (token) fetchUser();
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/properties">
              <Route path="search" element={<Search />} />
              <Route path=":slug" element={<DetailProperty />} />
            </Route>
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<>Dashboard page</>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
