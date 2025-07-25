import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { linkAdmin, linkUserOwner } from "@/constants/navigation";
import { useAuthStore } from "@/stores/auth-store";
import { ChevronDown, LogOut } from "lucide-react";
import { createElement, ReactNode, useState } from "react";
import { Link } from "react-router-dom";

const ProfileMenu = ({ children }: { children: ReactNode }) => {
  const { user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const isAdmin = user?.role === "ADMIN";
  const isOwner = user?.role === "OWNER";
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="cursor-pointer h-11 rounded-full border-none ">
          {children}
          <span className="capitalize ">{user?.name}</span>
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 mt-4 pt-3" align="start">
        <div className="grid gap-4 text-sm">
          <div className="grid gap-0.5">
            {[...(isAdmin ? linkAdmin : linkUserOwner)].map((link) => {
              if (link.id === 1 && !isOwner && !isAdmin) return;
              return (
                <Link to={link.path} key={link.id} onClick={() => setIsOpen(false)}>
                  <div className="py-3 px-4 hover:bg-[#181a20] hover:text-white rounded-xl flex items-center gap-x-6 font-medium transition-all duration-200">
                    {createElement(link.icon, { className: "size-4" })}
                    {link.title}
                  </div>
                </Link>
              );
            })}
          </div>
          <hr />
          <Button
            className="bg-transparent border text-slate-800 hover:text-white"
            variant={"animate"}
            onClick={logout}
          >
            <LogOut />
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ProfileMenu;
