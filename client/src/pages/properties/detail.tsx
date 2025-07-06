import Map from "@/components/map";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useCreateFavorite, useDeleteFavorite, useMyFavorites } from "@/hooks/use-favorite";
import { useProperty } from "@/hooks/use-properties";
import { usdCurrencyFormat } from "@/lib/utils";
import { ArrowUpRight, Dot, Heart, Share2 } from "lucide-react";
import { FaSpinner } from "react-icons/fa";
import { useParams } from "react-router-dom";

const DetailProperty = () => {
  const { propertyId } = useParams();
  const { favorites } = useMyFavorites();
  const favorite = favorites?.find((favorite) => favorite.property.id === propertyId);
  const { property, isLoading, error } = useProperty(propertyId!);
  const { createFavorite, isloadingCreateFavorite } = useCreateFavorite();
  const { deleteFavorite, isloadingDeleteFavorite } = useDeleteFavorite();

  const handleFavoriteClick = () => {
    if (favorite) {
      deleteFavorite(favorite.id);
    } else {
      createFavorite(property?.id!);
    }
  };

  const ContactViaWhatsApp = ({ phone, propertyName }: { phone: string; propertyName: string }) => {
    const message = `Hello, I'm interested in the property "${propertyName}". Is it still available?`;
    const encodedMessage = encodeURIComponent(message);
    const waLink = `https://wa.me/${phone}?text=${encodedMessage}`;

    window.open(waLink, "_blank");
  };

  if (isLoading)
    return (
      <div className="min-h-screen py-16 bg-accent flex items-center justify-center">
        <FaSpinner className="animate-spin size-8 " />
      </div>
    );
  if (property?.status === "pending" || property?.status === "rejected") {
    return (
      <div className="min-h-screen py-16 bg-accent flex items-center justify-center">Property not found.</div>
    );
  }
  if (error)
    return (
      <div className="min-h-screen py-16 bg-accent flex items-center justify-center">{error.message}</div>
    );

  return (
    <div className="min-h-screen py-16 bg-accent">
      <div className="max-w-[1230px] mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">{property?.title}</h1>
          <div className="flex items-center gap-x-2">
            <Button
              variant={"outline"}
              size={"icon"}
              disabled={isloadingCreateFavorite || isloadingDeleteFavorite}
              className="cursor-pointer"
              onClick={handleFavoriteClick}
            >
              <Heart
                className={`size-4 stroke-2 hover:stroke-3 duration-300 cursor-pointer ${
                  favorite ? "fill-accent-foreground" : ""
                }`}
              />
            </Button>
            <Button variant={"outline"} size={"icon"} className="cursor-pointer">
              <Share2 className={`size-4 stroke-2 hover:stroke-3 duration-300 cursor-pointer `} />
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between ">
          <div className="flex items-center *:border-r *:px-2 *:border-black/20 text-sm">
            <p className="pl-0!">
              {property?.location.city}, {property?.location.state}, {property?.location.country}
            </p>
            <span className="capitalize">For {property?.listingType}</span>
            <span>
              {new Date(property?.createdAt as string).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="border-none">{property?.squareFeet}</span>
          </div>
          <span className="text-lg font-semibold">{usdCurrencyFormat(property?.price!)}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8 rounded-md overflow-hidden min-h-[500px]">
          <img src={property?.photos.main_photo} alt={"main_photo"} className="w-full h-full object-cover" />
          <div className="grid grid-cols-2 gap-4 *:w-full *:h-full *:object-cover  ">
            <img src={property?.photos.photo_1} alt={"photo_1"} />
            <img src={property?.photos.photo_2} alt={"photo_2"} />
            <img src={property?.photos.photo_3} alt={"photo_3"} />
            <img src={property?.photos.photo_4} alt={"photo_4"} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 space-y-4 *:bg-white *:shadow-sm *:rounded-md overflow-hidden">
            <div className="space-y-8 p-6">
              <div className="space-y-5">
                <h3 className="text-lg font-medium">Property Description</h3>
                <p className="text-sm">{property?.description}</p>
              </div>
              <div className="space-y-5">
                <h3 className="text-lg font-medium">Property Details</h3>
                <div className="grid grid-cols-2 place-items-start text-sm *:w-full *:max-w-[230px]">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Price</span>
                      <span>{usdCurrencyFormat(property?.price!)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Property Size</span>
                      <span>{property?.squareFeet}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Bathrooms</span>
                      <span>{property?.bathrooms}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Bedrooms</span>
                      <span>{property?.bedrooms}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Property ID</span>
                      <span>{property?.location.postalCode}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Year Built</span>
                      <span>
                        {new Date(property?.createdAt as string).toLocaleDateString("en-US", {
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Property Type</span>
                      <span className="capitalize">{property?.type}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Property Status</span>
                      <span className="capitalize">{property?.listingType}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4 p-6">
              <h3 className="text-lg font-medium">Address</h3>
              <div className="space-y-3 w-full mb-10">
                <div className="text-sm flex items-center ">
                  <span className="font-medium min-w-40">Address</span>
                  <span>{property?.location.address}</span>
                </div>
                <div className="text-sm flex items-center">
                  <span className="font-medium w-40">City</span>
                  <span>{property?.location.city}</span>
                </div>
                <div className="text-sm flex items-center">
                  <span className="font-medium w-40">State / County</span>
                  <span>{property?.location.state}</span>
                </div>
                <div className="text-sm flex items-center">
                  <span className="font-medium w-40">Country</span>
                  <span>{property?.location.country}</span>
                </div>
                <div className="text-sm flex items-center">
                  <span className="font-medium w-40">PostalCode</span>
                  <span>{property?.location.postalCode}</span>
                </div>
              </div>
              <div className="relative z-0">
                <Map position={[property?.location.latitude!, property?.location.longitude!]} />
              </div>
            </div>
            <div className="space-y-6 p-6">
              <h3 className="text-lg font-medium">Features & Amenities</h3>
              <div className="grid grid-cols-3 gap-2">
                {property?.amenities.map((amenity) => (
                  <div className="flex items-center gap-x-2 text-sm font-medium ">
                    <Dot />
                    <span>{amenity.split("_").join(" ")}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="bg-white p-6 space-y-6 shadow-sm rounded-md">
              <h3 className="font-medium">Get More Information</h3>
              <div className="flex items-center gap-x-4">
                <Avatar className="size-24">
                  <AvatarImage src={property?.owner?.photoProfile} alt="@shadcn" />
                  <AvatarFallback className="text-lg">
                    {property?.owner?.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-y-1">
                  <span className="font-medium">{property?.owner.name}</span>
                  <span className="text-sm">{property?.owner.phone ?? "-"}</span>
                  <Button variant={"link"} size={"sm"} className="p-0! m-0! w-auto! ">
                    View listings
                  </Button>
                </div>
              </div>
              <Button
                variant={"outline"}
                className="w-full"
                onClick={() =>
                  ContactViaWhatsApp({
                    phone: property?.owner.phone ?? "",
                    propertyName: property?.title ?? "",
                  })
                }
              >
                <span>Contact Owner </span>
                <ArrowUpRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProperty;
