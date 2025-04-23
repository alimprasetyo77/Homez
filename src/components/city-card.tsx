import { ICity } from "@/constants/home/types";

const CityCard = (city: ICity) => {
  return (
    <div className="group size-44 shrink-0 flex flex-col items-center justify-center gap-y-2 transition-all duration-300 ease-in-out ">
      <img
        alt="Logo"
        loading="lazy"
        width="175"
        height="175"
        decoding="async"
        src={city.image}
        style={{ color: "transparent" }}
        className="size-44 object-cover group-hover:scale-105 group-hover:-rotate-2 transition-all duration-300 ease-in-out"
      />
      <span className="block text-center mt-2">{city.name}</span>
    </div>
  );
};

export default CityCard;
