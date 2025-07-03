import { linkAdmin, linkUserOwner } from "@/constants/navigation";
import { useAuthStore } from "@/stores/auth-store";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ProfileMenu from "../profile-menu";

const LayoutDashboard = () => {
  const { user } = useAuthStore();
  const { pathname } = useLocation();
  const isOwner = user?.role === "OWNER";
  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="h-[100vh] flex">
      <aside className="relative border-r flex flex-col gap-y-8 p-8 min-w-[300px]">
        <Link to={"/"}>
          <img
            alt="Header Logo"
            loading="lazy"
            width="138"
            height="44"
            decoding="async"
            data-nimg="1"
            src="https://homez-appdir.vercel.app/images/header-logo2.svg"
            className="h-12"
            style={{ color: "transparent" }}
          />
        </Link>
        <ul className="flex flex-col space-y-4 ">
          {[...(isAdmin ? linkAdmin : linkUserOwner)].map((link) => {
            if (link.id === 1 && !isOwner && !isAdmin) return;
            return (
              <Link to={link.path} key={link.id}>
                <li
                  className={`p-3 hover:bg-[#181a20] hover:text-white rounded-lg flex items-center gap-x-6 font-medium transition-all duration-200 cursor-pointer text-nowrap ${
                    pathname === link.path ? "bg-[#181a20] text-white" : "bg-transparent"
                  }`}
                >
                  {<link.icon className="size-4" />}
                  <span className="text-sm">{link.title}</span>
                </li>
              </Link>
            );
          })}
        </ul>
        <div className="bottom-0 absolute border-t inset-x-0 p-4">
          <ProfileMenu>
            <Avatar className="size-9 ">
              <AvatarImage src={user?.photoProfile} alt="@shadcn" />
              <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </ProfileMenu>
        </div>
      </aside>
      <main className=" bg-zinc-100 p-10 overflow-y-scroll grow">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutDashboard;
