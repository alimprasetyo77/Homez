import { BiLink } from "react-icons/bi";
import { BedSingle, Heart, SquareArrowOutUpRight, SquareIcon } from "lucide-react";
import { MdAdd } from "react-icons/md";
import { usdCurrencyFormat } from "@/lib/utils";
import { Button } from "../ui/button";
import { IProperty } from "@/types/property-type";
import { IFavorite } from "@/types/favorite-type";
import { PiShowerLight } from "react-icons/pi";
import { useCreateFavorite, useDeleteFavorite } from "@/hooks/use-favorite";
import { Link } from "react-router-dom";

export const PropertyCard = ({
  property,
  favoriteId,
}: {
  property: IProperty;
  favoriteId: string | null;
}) => {
  const { createFavorite } = useCreateFavorite();
  const { deleteFavorite } = useDeleteFavorite();
  const handleFavoriteClick = () => {
    if (favoriteId) {
      deleteFavorite(favoriteId);
    } else {
      createFavorite(property.id);
    }
  };
  return (
    <div className="relative w-full h-full group rounded-xl overflow-hidden shadow-lg ">
      <img
        alt="Logo"
        loading="lazy"
        decoding="async"
        src={property.photos.main_photo}
        className="aspect-[10/8] object-cover w-full group-hover:scale-105 group-hover:-rotate-1  transition-all duration-300 ease-in"
      />
      <div className="absolute inset-y-0 group-hover:right-0 -right-32 px-2 py-4 duration-500 ease-in-out flex flex-col gap-y-2">
        <Button className="cursor-pointer bg-black/75" onClick={handleFavoriteClick}>
          <Heart fill={favoriteId ? "white" : ""} />
        </Button>
        <Button className="cursor-pointer bg-black/75">
          <MdAdd />
        </Button>
        <Button className="cursor-pointer bg-black/75">
          <BiLink />
        </Button>
      </div>
      <Link
        to={`/property/${property.id}`}
        preventScrollReset={true}
        className="bg-white px-5 py-3 rounded-xl flex justify-between items-center gap-2 absolute bottom-2 inset-x-2 cursor-pointer"
      >
        <div className="flex flex-col">
          <h3 className="text-[15px] font-semibold text-[#181a20]">{property.title}</h3>
          <span className="text-xs text-[#717171] ">
            {property.location.city}, {property.location.state}, {property.location.country}
          </span>
        </div>
        <Button
          disabled
          variant={"outline"}
          className="text-[15px] text-[#181a20] font-semibold opacity-100!"
        >
          {usdCurrencyFormat(property.price)}
        </Button>
      </Link>
    </div>
  );
};

export const FavoriteCard = ({
  property,
  favoriteId,
}: {
  property: IProperty | IFavorite["property"];
  favoriteId: string | null;
}) => {
  const { createFavorite, isloadingCreateFavorite } = useCreateFavorite();
  const { deleteFavorite, isloadingDeleteFavorite } = useDeleteFavorite();
  const handleFavoriteClick = () => {
    if (favoriteId) {
      deleteFavorite(favoriteId);
    } else {
      createFavorite(property.id);
    }
  };
  return (
    <div className="rounded-xl overflow-hidden shadow-sm group">
      <div className="relative">
        <img
          className="aspect-[14/9] object-cover w-full"
          src={property.photos.main_photo}
          alt={property.title}
        />
        <div className="flex items-center gap-x-0.5 p-2 rounded-lg bg-white text-xs font-medium absolute bottom-4 left-4">
          <span>{usdCurrencyFormat(property.price)}</span>
          {property.listingType !== "rent" && <span>/mo</span>}
        </div>
      </div>
      <div className="space-y-4 p-4">
        <div>
          <h2 className="text-[15px] font-semibold text-gray-800">{property.title}</h2>
          <span className="text-[13px] text-muted-foreground">
            {property.location.city}, {property.location.state}, {property.location.country}
          </span>
        </div>
        <div className="flex items-center gap-x-6 *:text-xs">
          <div className="flex items-center gap-x-1">
            <BedSingle className="size-4 stroke-1" />
            <span>{property.bedrooms} bed</span>
          </div>
          <div className="flex items-center gap-x-1 ">
            <PiShowerLight className="size-4 stroke-1" />
            <span>{property.bathrooms} bath</span>
          </div>
          <div className="flex items-center gap-x-1 ">
            <SquareIcon className="size-4 stroke-1" />
            <span>{property.squareFeet} sqft</span>
          </div>
        </div>
        <hr />
        <div className="flex items-center justify-between">
          <span className="text-[13px] capitalize">For {property.listingType}</span>
          <div className="flex items-center gap-x-4">
            <Link to={`/property/${property.id}`}>
              <SquareArrowOutUpRight
                className={`size-4 stroke-1 hover:stroke-2 duration-300 cursor-pointer`}
              />
            </Link>
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={handleFavoriteClick}
              disabled={isloadingCreateFavorite || isloadingDeleteFavorite}
              className="h-auto cursor-pointer"
            >
              <Heart
                className={`size-4 stroke-1 hover:stroke-2 duration-300 cursor-pointer ${
                  favoriteId ? "fill-accent-foreground" : ""
                }`}
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
