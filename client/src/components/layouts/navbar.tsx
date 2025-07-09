import { linkNavbar } from "@/constants/navigation";
import { useAuthStore } from "@/stores/auth-store";
import { useEffect, useRef, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileMenu from "../profile-menu";
import { useDialogStore } from "@/stores/dialog-store";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import SidebarNavigation from "./sidebar-nav";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token } = useAuthStore();
  const { openDialog } = useDialogStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
        ? "sticky top-0 left-0 shadow-md bg-white z-50 w-full py-4 transition-all duration-200 ease-out "
        : "py-4 transition-all duration-200 ";
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav className="py-4 h-[80px] transition-all duration-200" ref={navbarRef}>
      <SidebarNavigation isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} isActiveLink={isActive} />
      <div
        className={`max-w-[1230px] px-8 lg:px-0 mx-auto flex items-center justify-between font-semibold text-[15px]`}
      >
        <img
          alt="Header Logo"
          loading="lazy"
          width="138"
          height="44"
          decoding="async"
          data-nimg="1"
          src="https://homez-appdir.vercel.app/images/header-logo2.svg"
          style={{ color: "transparent" }}
          className="w-28 lg:w-auto cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div className="hidden lg:flex gap-x-2">
          {linkNavbar.map((link) => (
            <Link to={link.path} key={link.id}>
              <span className={isActive(link.path)}> {link.title}</span>
            </Link>
          ))}
        </div>

        {token ? (
          <ProfileMenu>
            <Avatar className="size-9">
              <AvatarImage src={user?.photoProfile} alt="@shadcn" />
              <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </ProfileMenu>
        ) : (
          <>
            <Button
              variant={"ghost"}
              className="cursor-pointer hidden lg:flex items-center gap-x-2 font-semibold"
              onClick={() => {
                openDialog("signIn");
              }}
            >
              <FaRegUserCircle className="size-4.5" /> <span>Login / Register</span>
            </Button>
            <Button variant={"outline"} className="flex lg:hidden " onClick={() => setSidebarOpen(true)}>
              <Menu className="size-5" />
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
