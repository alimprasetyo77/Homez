import { linkNavbar } from "@/constants/home";
import { useAuthStore } from "@/stores/auth-store";
import { useEffect, useRef } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileMenu from "../profile-menu";

const Navbar = () => {
  const location = useLocation();
  const { isLogin } = useAuthStore();
  const currentPath = location.pathname.split("/")[1];
  const navbarRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => {
    return `${
      currentPath === path.split("/")[1] ? "text-[#eb6753]" : "text-[#181a20]"
    } px-5.5 hover:text-[#eb6753]`;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!navbarRef.current) return;
      const isScrolled = window.scrollY > 10;
      navbarRef.current.className = isScrolled
        ? "sticky top-0 left-0 shadow-md bg-white z-50 w-full py-5 transition-all duration-200 ease-out "
        : "py-5 transition-all duration-200 ";
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="py-5 transition-all duration-200" ref={navbarRef}>
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
        {isLogin ? (
          <ProfileMenu>
            <Avatar className="size-9">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </ProfileMenu>
        ) : (
          <Link to={"/login"} className="flex items-center gap-x-2 cursor">
            <FaRegUserCircle className="size-4.5" /> <span>Login / Register</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
