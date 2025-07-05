interface CityCardProps {
  name: string;
  image: string;
  countProperty: number;
}

const CityCard = (props: CityCardProps) => {
  return (
    <div className="group flex flex-col items-center justify-center gap-y-2 transition-all duration-300 ease-in-out ">
      <img
        alt="Logo"
        loading="lazy"
        decoding="async"
        src={props.image}
        style={{ color: "transparent" }}
        className="max-h-44 min-h-44 min-w-44 object-cover group-hover:scale-105 group-hover:-rotate-2 transition-all duration-300 ease-in-out rounded-full"
      />
      <div className="space-y-2">
        <span className="block text-center mt-2 font-medium">{props.name}</span>
        <span className="block text-center mt-2 text-xs">{props.countProperty} Properties</span>
      </div>
    </div>
  );
};

export default CityCard;
