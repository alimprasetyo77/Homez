import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useProperty } from "@/hooks/use-properties";
import { usdCurrencyFormat } from "@/lib/utils";
import { ReactNode } from "react";
import Map from "../map";
import { Dot, DownloadCloudIcon } from "lucide-react";
import { Button } from "../ui/button";

const ReviewProperty = ({ children, propertyId }: { children: ReactNode; propertyId: string }) => {
  const { property } = useProperty(propertyId);
  const handleDownload = (imageUrl: string) => {
    window.open(imageUrl, "_blank");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="min-w-7xl max-h-[50rem] overflow-y-auto">
        <DialogHeader>
          <DialogHeader className="space-y-3">
            <DialogTitle>Review Property Submission</DialogTitle>
            <DialogDescription className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-[13px] text-yellow-800 rounded-md ">
              🔔 Please review all details carefully before approving or rejecting this property. Make sure
              the listing is complete, accurate, and complies with platform standards.
            </DialogDescription>
          </DialogHeader>
        </DialogHeader>

        <div className="space-y-4  mt-4">
          <h3 className="font-medium">Details</h3>
          <div className="grid grid-cols-2 gap-20 text-sm p-2">
            <div className="space-y-6 *:space-x-4">
              <div>
                <span className="min-w-16 font-medium">Listing Title</span>
                <span>:</span>
                <span>{property?.title}</span>
              </div>
              <div>
                <span className="min-w-16 font-medium">Description</span>
                <span>:</span>
                <span>{property?.description}</span>
              </div>
              <div>
                <span className="min-w-16 font-medium">Price </span>
                <span>:</span>
                <span>{usdCurrencyFormat(property?.price!)}</span>
              </div>
              <div>
                <span className="min-w-16 font-medium">Property Type</span>
                <span>:</span>
                <span className="capitalize">{property?.type}</span>
              </div>
            </div>
            <div className="space-y-6 *:space-x-4">
              <div>
                <span className="min-w-16 font-medium">Listing Type</span>
                <span>:</span>
                <span className="capitalize">{property?.listingType}</span>
              </div>
              <div>
                <span className="min-w-16 font-medium">Bedrooms</span>
                <span>:</span>
                <span>{property?.bedrooms}</span>
              </div>
              <div>
                <span className="min-w-16 font-medium">Bathrooms</span>
                <span>:</span>
                <span>{property?.bathrooms}</span>
              </div>
              <div>
                <span className="min-w-16 font-medium">SquareFeet</span>
                <span>:</span>
                <span>{property?.squareFeet}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4 mt-4 ">
          <h3 className="font-medium">Location</h3>
          <div className="rounded-lg overflow-hidden">
            <Map position={[property?.location.latitude!, property?.location.longitude!]} />
          </div>
          <div className="*:space-x-4 space-y-3 text-sm p-3">
            <div>
              <span className="min-w-16 font-medium">Address</span>
              <span>:</span>
              <span>{property?.location.address}</span>
            </div>
            <div>
              <span className="min-w-16 font-medium">City</span>
              <span>:</span>
              <span>{property?.location.city}</span>
            </div>
            <div>
              <span className="min-w-16 font-medium">State</span>
              <span>:</span>
              <span>{property?.location.state}</span>
            </div>
            <div>
              <span className="min-w-16 font-medium">Country</span>
              <span>:</span>
              <span>{property?.location.country}</span>
            </div>
            <div>
              <span className="min-w-16 font-medium">Postal Code</span>
              <span>:</span>
              <span>{property?.location.postalCode}</span>
            </div>
          </div>
        </div>
        <div className="space-y-4 mt-4">
          <h3 className="font-medium">Amenities</h3>
          <div className="grid grid-cols-3 gap-2">
            {property?.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-x-2 text-sm">
                <Dot className="stroke-2" />
                <span>{amenity.split("_").join(" ")}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4 mt-4">
          <h3 className="font-medium">Certificate, IMB, or other ownership documents</h3>
          <Button
            variant={"outline"}
            className="text-xs"
            onClick={() => handleDownload(property?.photoDocument!)}
          >
            <DownloadCloudIcon />
            Open Photo Document
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewProperty;
