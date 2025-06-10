import { linkProfile } from "@/constants/home";
import { useAuthStore } from "@/stores/auth-store";
import { Link, Outlet, useLocation } from "react-router-dom";

const LayoutDashboard = () => {
  const { user } = useAuthStore();
  const { pathname } = useLocation();
  return (
    <div className="h-[calc(100vh-85px)] flex">
      <aside className="border grid px-8 py-10 min-w-[300px]">
        <ul className="flex flex-col space-y-4">
          {linkProfile.map((link) => {
            const linkValidForAgent = [1, 2, 3];
            if (linkValidForAgent.includes(link.id) && user?.role !== "AGENT") return;
            return (
              <Link to={link.path}>
                <li
                  className={`py-3 px-5 hover:bg-[#181a20] hover:text-white rounded-xl flex items-center gap-x-6 font-medium transition-all duration-200 cursor-pointer text-nowrap ${
                    pathname === link.path ? "bg-[#181a20] text-white" : "bg-transparent"
                  }`}
                >
                  {link.icon()}
                  {link.title}
                </li>
              </Link>
            );
          })}
        </ul>
      </aside>
      <main className=" bg-zinc-100 p-10 overflow-y-scroll grow">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutDashboard;
