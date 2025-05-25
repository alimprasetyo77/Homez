import { ListCities, typeProperties } from "@/constants/home";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "motion/react";

import PopularProperties from "@/components/popular-properties";
import Hero from "@/components/hero";
import { useNavigate } from "react-router-dom";
import CityCard from "@/components/city-card";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero  */}
      <Hero />

      {/* Properties by cities  */}
      <section className="py-[120px] px-20 ">
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
                {ListCities.map((city) => (
                  <CarouselItem
                    key={city.id}
                    className="basis-1/6 p-6 cursor-pointer"
                    onClick={() => navigate(`/properties/search?location=${city.name}`)}
                  >
                    <CityCard key={city.id} {...city} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </motion.div>
        </motion.div>
      </section>

      {/* Discover Popular Properties*/}
      <PopularProperties />

      {/* Explore Properties Types */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 100, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="max-w-[1230px] mx-auto w-full py-[120px] space-y-8"
        >
          <div>
            <h2 className="text-[30px] font-semibold ">Explore Properties Types</h2>
            <p className="text-[#181a20] text-[15px] font-normal leading-7  ">
              Discover unique properties styles that suit your lifestyle.
            </p>
          </div>
          <div className="grid grid-cols-4 gap-10">
            {typeProperties.map((property, index) => (
              <div
                key={index}
                className="flex items-center  flex-col gap-2 cursor-pointer gap-y-4 bg-white shadow rounded-md overflow-hidden pb-4"
                onClick={() => navigate("/properties/search", { state: { propertyType: property.title } })}
              >
                <img src={property.image} alt="property" className="aspect-[1/1] object-cover rounded-sm" />
                <span className="text-[#181a20] text-[15px] font-semibold">{property.title}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Home;
