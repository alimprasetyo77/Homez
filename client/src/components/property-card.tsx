import { IProperties } from "@/constants/home/types";
import { Button } from "./ui/button";
import { BiLink } from "react-icons/bi";
import { Heart } from "lucide-react";
import { MdAdd } from "react-icons/md";
import { usdCurrencyFormat } from "@/lib/utils";

const PropertyCard = ({ property }: { property: IProperties }) => {
  return (
    <div className="relative w-full h-full group cursor-pointer rounded-xl overflow-hidden shadow-lg ">
      <img
        alt="Logo"
        loading="lazy"
        decoding="async"
        src={property.image}
        className="aspect-[1.3/1] object-cover group-hover:scale-105 group-hover:-rotate-1  transition-all duration-300 ease-in"
      />
      <div className="absolute inset-y-0 group-hover:right-0 -right-32 px-2 py-4 duration-500 ease-in-out flex flex-col gap-y-2">
        <Button className="cursor-pointer bg-black/75">
          <Heart />
        </Button>
        <Button className="cursor-pointer bg-black/75">
          <MdAdd />
        </Button>
        <Button className="cursor-pointer bg-black/75">
          <BiLink />
        </Button>
      </div>
      <div className="bg-white p-5 rounded-xl flex justify-between items-center gap-2 absolute bottom-2 inset-x-2">
        <div className="flex flex-col">
          <h3 className="text-[15px] font-semibold text-[#181a20]">{property.title}</h3>
          <span className="text-xs text-[#717171]">
            {property.location.city}, {property.location.state}, {property.location.country}
          </span>
        </div>
        <Button variant={"outline"} className="text-[15px] text-[#181a20] font-semibold">
          {usdCurrencyFormat(property.price)}
        </Button>
      </div>
    </div>
  );
};

export default PropertyCard;
