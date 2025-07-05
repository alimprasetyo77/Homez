import Hero from "@/components/sections/home-page/hero-section";
import PropertyType from "@/components/sections/home-page/property-type-section";
import PopularProperty from "@/components/sections/home-page/popular-property-section";
import PropertyByCity from "@/components/sections/home-page/property-city-section";

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
