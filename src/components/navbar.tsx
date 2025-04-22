import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
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
          <a href="#" className="px-5.5 text-[#eb6753] hover:opacity-90">
            Home
          </a>
          <a href="#" className="px-5.5 text-[#181a20] hover:opacity-90">
            About
          </a>

          <a href="#" className="px-5.5 text-[#181a20] hover:opacity-90">
            Contact
          </a>
          <a href="#" className="px-5.5 text-[#181a20] hover:opacity-90">
            Blog
          </a>
        </div>
        <div className="flex items-center gap-x-2">
          <FaRegUserCircle className="size-4.5" /> <span>Login / Register</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
