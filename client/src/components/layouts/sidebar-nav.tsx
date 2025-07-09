import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { linkNavbar } from "@/constants/navigation";
import { useDialogStore } from "@/stores/dialog-store";

interface SidebarNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  isActiveLink: (link: string) => void;
}

const SidebarNavigation = ({ isOpen, onClose, isActiveLink }: SidebarNavigationProps) => {
  const navigate = useNavigate();
  const { openDialog } = useDialogStore();
  return (
    <div
      className={`fixed inset-y-0 left-0 ${
        isOpen ? "right-8" : "right-full"
      } bg-gray-50 z-50 overflow-hidden duration-300 ease-in-out`}
    >
      <div className="w-full flex items-center justify-between gap-x-2 bg-[#eb6753]/5 px-6 py-8 border-b">
        <h1 className="text-lg font-semibold whitespace-nowrap">Welcome to Homez</h1>
        <Button variant={"animate"} className="rounded-full" onClick={onClose}>
          <X />
        </Button>
      </div>

      <ul className="px-4 py-10 flex flex-col items-start gap-7">
        {linkNavbar.map((link) => (
          <li
            key={link.id}
            className={`${isActiveLink(link.path)} font-medium`}
            onClick={() => {
              onClose();
              navigate(link.path);
            }}
          >
            {link.title}
          </li>
        ))}
        <li className="w-full py-4 border-b ">
          <Button
            variant={"ghost"}
            className="cursor-pointer items-center gap-x-2 font-semibold text-chart-1/80 hover:text-chart-1"
            onClick={() => {
              onClose();
              openDialog("signIn");
            }}
          >
            <span>Login / Register</span>
          </Button>
        </li>
      </ul>

      <div className="px-8 py-10 border-b *:block space-y-4 *:whitespace-nowrap">
        <span className="text-sm">Total Free Customer Care</span>
        <span className="font-semibold">+(0) 123 050 945 02</span>
        <span className="text-sm">Need Live Support?</span>
        <span className="font-semibold">hi@homez.com</span>
      </div>
    </div>
  );
};

export default SidebarNavigation;
