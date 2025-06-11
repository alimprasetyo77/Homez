import Hero from "@/components/sections/hero-section";
import PropertyType from "@/components/sections/property-type-section";
import PopularProperty from "@/components/sections/popular-property-section";
import PropertyByCity from "@/components/sections/property-city-section";

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
