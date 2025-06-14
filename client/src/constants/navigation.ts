import { MdDashboard } from "react-icons/md";
import { FolderHeart, HouseIcon, HousePlusIcon, UserCog } from "lucide-react";
import { ILinkNavbar } from "./types";
import { ElementType } from "react";

export const linkNavbar: ILinkNavbar[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
  },
  {
    id: 2,
    title: "About",
    path: "/about",
  },
  {
    id: 3,
    title: "Contact",
    path: "/contact",
  },
  {
    id: 4,
    title: "Blog",
    path: "/blog",
  },
];

export const linkProfile: (ILinkNavbar & {
  icon: ElementType;
})[] = [
  {
    id: 1,
    path: "/dashboard",
    title: "Dashboard",
    icon: MdDashboard,
  },
  {
    id: 2,
    path: "/dashboard/add-property",
    title: "Add New Property",
    icon: HousePlusIcon,
  },
  { id: 3, path: "/dashboard/property", title: "My Property", icon: HouseIcon },
  {
    id: 4,
    path: "/dashboard/favorite",
    title: "My Favorite",
    icon: FolderHeart,
  },
  {
    id: 5,
    path: "/dashboard/profile",
    title: "My Profile",
    icon: UserCog,
  },
];
