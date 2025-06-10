import { MdDashboard } from "react-icons/md";
import { ICity, ILinkNavbar, ILinkOnSearch } from "./types";
import { FolderHeart, HouseIcon, HousePlusIcon, UserCog } from "lucide-react";
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

export const linkProfile: (ILinkNavbar & { icon: () => any })[] = [
  { id: 1, path: "/dashboard", title: "Dashboard", icon: () => <MdDashboard className="size-4" /> },
  {
    id: 2,
    path: "/dashboard/add-property",
    title: "Add New Property",
    icon: () => <HousePlusIcon className="size-4" />,
  },
  { id: 3, path: "/dashboard/property", title: "My Property", icon: () => <HouseIcon className="size-4" /> },
  {
    id: 4,
    path: "/dashboard/favorite",
    title: "My Favorite",
    icon: () => <FolderHeart className="size-4" />,
  },
  {
    id: 5,
    path: "/dashboard/profile",
    title: "My Profile",
    icon: () => <UserCog className="size-4" />,
  },
];

export const listLinkOnSearch: ILinkOnSearch[] = [
  {
    id: 1,
    title: "buy",
  },
  {
    id: 2,
    title: "rent",
  },
];
export const propertiesTypeOptions = ["all", "house", "villa", "office", "apartment"];

export const typeProperties: { title: string; image?: string }[] = [
  {
    title: "House",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SG91c2V8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Villa",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VmlsbGF8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Office",
    image:
      "https://images.unsplash.com/photo-1574958269340-fa927503f3dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8T2ZmaWNlJTIwYnVpbGRpbmd8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Apartment",
    image:
      "https://images.unsplash.com/photo-1679211934250-aa8512613468?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fEFwYXJ0ZW1lbnRzJTIwQnVpbGRpbmd8ZW58MHx8MHx8fDA%3D",
  },
];

export const ListCities: ICity[] = [
  {
    id: 1,
    name: "Manhattan",
    image: "https://homez-appdir.vercel.app/_next/image?url=%2Fimages%2Flistings%2Fcp-m-1.png&w=384&q=75",
  },
  {
    id: 2,
    name: "San Diego",
    image: "https://homez-appdir.vercel.app/_next/image?url=%2Fimages%2Flistings%2Fcp-m-2.png&w=384&q=75",
  },
  {
    id: 3,
    name: "San Francisco",
    image: "https://homez-appdir.vercel.app/_next/image?url=%2Fimages%2Flistings%2Fcp-m-3.png&w=384&q=75",
  },
  {
    id: 4,
    name: "Los Angeles",
    image: "https://homez-appdir.vercel.app/_next/image?url=%2Fimages%2Flistings%2Fcp-m-4.png&w=384&q=75",
  },
  {
    id: 5,
    name: "California",
    image: "https://homez-appdir.vercel.app/_next/image?url=%2Fimages%2Flistings%2Fcp-m-5.png&w=384&q=75",
  },
  {
    id: 6,
    name: "New Jersey",
    image: "https://homez-appdir.vercel.app/_next/image?url=%2Fimages%2Flistings%2Fcp-m-6.png&w=384&q=75",
  },
  {
    id: 7,
    name: "Manhattan",
    image: "https://homez-appdir.vercel.app/_next/image?url=%2Fimages%2Flistings%2Fcp-m-1.png&w=384&q=75",
  },
  {
    id: 8,
    name: "San Diego",
    image: "https://homez-appdir.vercel.app/_next/image?url=%2Fimages%2Flistings%2Fcp-m-2.png&w=384&q=75",
  },
  {
    id: 9,
    name: "San Francisco",
    image: "https://homez-appdir.vercel.app/_next/image?url=%2Fimages%2Flistings%2Fcp-m-3.png&w=384&q=75",
  },
];
