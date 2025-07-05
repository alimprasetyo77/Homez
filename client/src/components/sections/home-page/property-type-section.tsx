import { typeProperties } from "@/constants/property";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const PropertyType = () => {
  const navigate = useNavigate();

  return (
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
              onClick={() =>
                navigate("/properties/search", { state: { propertyType: property.title.toLowerCase() } })
              }
            >
              <img src={property.image} alt="property" className="aspect-[1/1] object-cover rounded-sm" />
              <span className="text-[#181a20] text-[15px] font-semibold">{property.title}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default PropertyType;
