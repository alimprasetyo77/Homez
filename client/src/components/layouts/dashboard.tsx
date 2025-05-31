import { linkProfile } from "@/constants/home";
import { Link, Outlet, useLocation } from "react-router-dom";

const LayoutDashboard = () => {
  const { pathname } = useLocation();
  return (
    <div className="h-[calc(100vh-85px)]  grid grid-cols-12 ">
      <aside className="col-span-2 border grid px-8 py-10">
        <ul className="flex flex-col space-y-4">
          {linkProfile.map((link) => (
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
          ))}
        </ul>
      </aside>
      <main className="col-span-10 bg-gray-100 p-10 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutDashboard;
