import { linkNavbar } from "@/constants/home";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname.split("/")[1];
  const isActive = (path: string) => {
    return `${
      currentPath === path.split("/")[1] ? "text-[#eb6753]" : "text-[#181a20]"
    } px-5.5 hover:text-[#eb6753]`;
  };
  return (
    <nav className="py-6">
      <div className="max-w-[1230px] mx-auto flex items-center justify-between font-semibold text-[15px]">
        <img
          alt="Header Logo"
          loading="lazy"
          width="138"
          height="44"
          decoding="async"
          data-nimg="1"
          src="https://homez-appdir.vercel.app/images/header-logo2.svg"
          style={{ color: "transparent" }}
        />
        <div className="flex gap-x-2">
          {linkNavbar.map((link) => (
            <Link to={link.path} key={link.id}>
              <span className={isActive(link.path)}> {link.title}</span>
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-x-2">
          <FaRegUserCircle className="size-4.5" /> <span>Login / Register</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
