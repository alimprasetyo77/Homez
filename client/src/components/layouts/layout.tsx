import SignIn from "../modals/sign-in";
import SignUp from "../modals/sign-up";
import Footer from "./footer";
import Navbar from "./navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <SignIn />
      <SignUp />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
