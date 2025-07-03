import { FolderHeart, HouseIcon, UserCog, Users } from "lucide-react";
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

export const linkUserOwner: (ILinkNavbar & {
  icon: ElementType;
})[] = [
  { id: 1, path: "/dashboard/property", title: "My Property", icon: HouseIcon },
  {
    id: 2,
    path: "/dashboard/favorite",
    title: "My Favorite",
    icon: FolderHeart,
  },
  {
    id: 3,
    path: "/dashboard/profile",
    title: "My Profile",
    icon: UserCog,
  },
];

export const linkAdmin: (ILinkNavbar & {
  icon: ElementType;
})[] = [
  { id: 1, path: "/dashboard/property", title: "List Properties", icon: HouseIcon },
  {
    id: 2,
    path: "/dashboard/user",
    title: "List Users",
    icon: Users,
  },
  {
    id: 3,
    path: "/dashboard/profile",
    title: "My Profile",
    icon: UserCog,
  },
];
