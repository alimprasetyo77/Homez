import { typeProperties } from "@/constants/home";
import { getPopular } from "@/utils/apis/properties/api";
import { PropertyType } from "@/utils/apis/properties/types";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "./ui/button";
import PropertyCard from "./property-card";
import { Skeleton } from "./ui/skeleton";

const PopularProperties = () => {
  const [activeLinkOnProperties, setActiveLinkOnProperties] = useState<PropertyType>("house");

  const { data: popularProperties, isLoading } = useQuery({
    queryKey: ["popularProperties", activeLinkOnProperties],
    queryFn: () => getPopular(activeLinkOnProperties, 6),
  });

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
            : popularProperties?.data?.map((property) =>
                property.type === activeLinkOnProperties ? (
                  <PropertyCard key={property.id} property={property} />
                ) : null
              )}
        </div>
      </motion.div>
    </section>
  );
};

export default PopularProperties;
