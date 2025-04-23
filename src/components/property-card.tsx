import { IProperties } from "@/constants/home/types";

const PropertyCard = ({ property }: { property: IProperties }) => {
  return (
    <div className="flex items-center justify-center bg-white rounded-full p-2">
      <img
        alt="Logo"
        loading="lazy"
        decoding="async"
        src={property.image}
        className="aspect-[1.5/1] object-cover rounded-xl"
      />
    </div>
  );
};

export default PropertyCard;
