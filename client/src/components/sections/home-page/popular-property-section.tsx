import { typeProperties } from "@/constants/property";
import { PropertyType } from "@/types/property-type";
import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Skeleton } from "../../ui/skeleton";
import { PropertyCard } from "../../cards/property-card";
import { usePopularProperties } from "@/hooks/use-properties";
import { useMyFavorites } from "@/hooks/use-favorite";

const PopularProperty = () => {
  const [activeLinkOnProperties, setActiveLinkOnProperties] = useState<PropertyType>("house");
  const { popularProperties, isLoading } = usePopularProperties(activeLinkOnProperties);
  const { favorites } = useMyFavorites();

  return (
    <section className="py-[120px] px-20 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 100, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="max-w-[1230px] mx-auto w-full space-y-20"
      >
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-[30px] font-semibold ">Discover Popular Properties</h2>
            <p className="text-[#181a20] text-[15px] font-normal leading-7  ">
              Explore a variety of properties tailored to your needs. Your dream home is just a search away.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {typeProperties.map((type, index) => (
              <Button
                variant={"outline"}
                className={`${
                  type.title.toLowerCase() === activeLinkOnProperties && "bg-black text-white"
                } hover:bg-black hover:text-white transition-all duration-200 ease-in cursor-pointer`}
                key={index}
                onClick={() => setActiveLinkOnProperties(type.title.toLowerCase() as PropertyType)}
              >
                {type.title}
              </Button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }, (_, index) => (
                <Skeleton key={index} className="h-[350px] w-full rounded-xl" />
              ))
            : popularProperties?.map((property) => {
                const favorite = favorites?.find((fav) => fav.property.id === property.id);
                return property.type === activeLinkOnProperties ? (
                  <PropertyCard key={property.id} property={property} favoriteId={favorite?.id || null} />
                ) : null;
              })}
        </div>
      </motion.div>
    </section>
  );
};

export default PopularProperty;
