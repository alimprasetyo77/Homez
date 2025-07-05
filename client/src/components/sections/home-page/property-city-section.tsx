import { motion } from "motion/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";
import CityCard from "../../cards/city-card";
import { usePropertyOfCities } from "@/hooks/use-properties";
import { Skeleton } from "../../ui/skeleton";

const PropertyByCity = () => {
  const navigate = useNavigate();
  const { propertyOfCities, isLoading } = usePropertyOfCities();
  return (
    <section className="pt-[120px] pb-[40px] px-20 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 100, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="max-w-[1230px] mx-auto w-full"
      >
        <h2 className="text-[30px] font-semibold ">Properties by cities</h2>
        <p className="text-[#181a20] text-[15px] font-normal leading-7  ">
          Discover your dream property from our wide selection.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 100, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <Carousel className="mt-10" opts={{ align: "start" }}>
            <CarouselContent>
              {propertyOfCities?.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/6 p-6 cursor-pointer"
                  onClick={() => navigate(`/properties/search?location=${item.city}`)}
                >
                  {isLoading ? (
                    <Skeleton key={index} className="size-44 rounded-full" />
                  ) : (
                    <CityCard key={index} image={item.imgUrl} name={item.city} countProperty={item.count} />
                  )}
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PropertyByCity;
