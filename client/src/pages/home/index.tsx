import Hero from "@/components/sections/hero";
import PropertyType from "@/components/sections/property-type";
import PopularProperty from "@/components/sections/popular-property";
import PropertyByCity from "@/components/sections/property-city";

const Home = () => {
  return (
    <>
      {/* Hero  */}
      <Hero />

      {/* Properties by cities  */}
      <PropertyByCity />

      {/* Discover Popular Properties*/}
      <PopularProperty />

      {/* Explore Properties Types */}
      <PropertyType />
    </>
  );
};

export default Home;
