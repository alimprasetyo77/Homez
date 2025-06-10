import SignIn from "../modals/sign-in";
import SignUp from "../modals/sign-up";
import UpdateUser from "../modals/update-user";
import Footer from "./footer";
import Navbar from "./navbar";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen">
      <Navbar />
      <SignIn />
      <SignUp />
      <Outlet />

      {!pathname.startsWith("/dashboard") ? <Footer /> : null}
    </div>
  );
};

export default Layout;
