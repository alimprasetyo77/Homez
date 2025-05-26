interface CityCardProps {
  name: string;
  image: string;
}

const CityCard = (props: CityCardProps) => {
  return (
    <div className="group size-44 shrink-0 flex flex-col items-center justify-center gap-y-2 transition-all duration-300 ease-in-out ">
      <img
        alt="Logo"
        loading="lazy"
        decoding="async"
        src={props.image}
        style={{ color: "transparent" }}
        className="size-44 object-cover group-hover:scale-105 group-hover:-rotate-2 transition-all duration-300 ease-in-out rounded-full"
      />
      <span className="block text-center mt-2">{props.name}</span>
    </div>
  );
};

export default CityCard;
