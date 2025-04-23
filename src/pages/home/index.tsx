import { ITypeProperties, ListCities, listLinkOnSearch, Properties, typeProperties } from "@/constants/home";
import { PiBuildingApartment, PiBuildingOfficeLight, PiHouseSimple } from "react-icons/pi";
import { ListLinkSearch } from "@/constants/home/types";
import PropertyCard from "@/components/property-card";
import { Button } from "@/components/ui/button";
import { MdOutlineVilla } from "react-icons/md";
import CityCard from "@/components/city-card";
import { Input } from "@/components/ui/input";
import Layout from "../../components/layout";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "motion/react";

const Home = () => {
  const [activeLinkOnSearch, setActiveLinkOnSearch] = useState<ListLinkSearch>("buy");
  const [activeLinkOnProperties, setActiveLinkOnProperties] = useState<ITypeProperties>("House");
  return (
    <Layout>
      {/* Hero  */}
      <section className="flex items-center justify-center rounded-3xl rounded-br-[38px] bg-no-repeat  min-h-[660px] max-w-[1600px] w-full mx-auto overflow-hidden bg-[url('https://homez-appdir.vercel.app/_next/static/media/home-4.3e6e2403.jpg')]">
        <div className="max-w-[1230px] mx-auto w-full">
          <div className=" grid grid-cols-12">
            <div className="space-y-6 col-span-9 relative">
              <div className="absolute -top-0 -right-40">
                <img
                  alt="Logo"
                  loading="lazy"
                  width="140"
                  height="120"
                  decoding="async"
                  src="https://homez-appdir.vercel.app/_next/image?url=%2Fimages%2Fabout%2Felement-10.png&w=384&q=75"
                  style={{
                    color: "transparent",
                    animationDuration: "14s",
                  }}
                  className="animate-spin"
                />
              </div>

              <div className="space-y-2">
                <h2 className="text-[40px] font-semibold">
                  Easy Way to Find a <br />
                  Perfect Property
                </h2>
                <p className="text-[#181a20] text-[15px] font-normal leading-7">
                  Find the perfect property for you and your family. We have a wide range of properties to
                  choose from.
                </p>
              </div>

              {/* Search  */}
              <div className="flex flex-col pt-10">
                <ul className="bg-white flex items-center max-w-fit rounded-tr-xl rounded-tl-xl font-semibold text-slate-500 border-b border-black/20 *:px-4 *:py-4 px-4 ">
                  {listLinkOnSearch.map((link) => (
                    <li
                      key={link.id}
                      className={`cursor-pointer
                        ${
                          activeLinkOnSearch === link.title
                            ? "relative before:absolute before:bottom-0 before:bg-black before:w-full before:h-[2px] before:left-0 before:rounded-full text-black"
                            : ""
                        }
                        `}
                      onClick={() => setActiveLinkOnSearch(link.title)}
                    >
                      <span className="capitalize">{link.title}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-3 bg-white p-5 rounded-tr-xl rounded-bl-xl rounded-br-xl">
                  <Input
                    className="outline-none bg-[#f7f7f7] border-none focus-visible:border-none focus-visible:ring-0 p-4 h-auto"
                    placeholder="Search Products for Buy"
                  />
                  <Button
                    asChild
                    variant="default"
                    className="bg-[#181a20] text-white font-semibold rounded-full size-14 p-4.5"
                  >
                    <BiSearch />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center bg-white rounded-full p-2">
                    <PiHouseSimple />
                  </div>
                  <span className="text-[#181a20] text-[15px] font-normal">Houses</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center bg-white rounded-full p-2">
                    <PiBuildingApartment />
                  </div>
                  <span className="text-[#181a20] text-[15px] font-normal">Apartements</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center bg-white rounded-full p-2">
                    <PiBuildingOfficeLight />
                  </div>
                  <span className="text-[#181a20] text-[15px] font-normal">Office</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center bg-white rounded-full p-2">
                    <MdOutlineVilla />
                  </div>
                  <span className="text-[#181a20] text-[15px] font-normal">Villa</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                  <CarouselItem className="basis-1/6 p-6">
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
                    type.title === activeLinkOnProperties && "bg-black text-white"
                  } hover:bg-black hover:text-white transition-all duration-200 ease-in cursor-pointer`}
                  key={index}
                  onClick={() => setActiveLinkOnProperties(type.title as ITypeProperties)}
                >
                  {type.title}
                </Button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {Properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Home;
