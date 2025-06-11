import { PropertyStatus } from "@/types/property-type";

interface CheckboxProps {
  label: string;
  isChecked: boolean;
  onChange: (pStatusType: PropertyStatus) => void;
}
const Radio = (props: CheckboxProps) => {
  const { label, isChecked, onChange } = props;
  return (
    <div role="button" onClick={() => onChange(label.toLowerCase() as PropertyStatus)}>
      <label
        htmlFor={`${label.split(" ").join("")}`}
        className="flex items-center w-full py-1 px-2 cursor-pointer"
      >
        <div className="grid mr-3 place-items-center">
          <div className="inline-flex items-center">
            <label
              className="relative flex items-center p-0 rounded-full cursor-pointer"
              htmlFor={`${label.split(" ").join("")}`}
            >
              <input
                id={`${label.split(" ").join("")}`}
                type="radio"
                checked={isChecked}
                value={label}
                className=" h-4 w-4 cursor-pointer appearance-none rounded-full border border-black/30 transition-all checked:border-black checked:border-[3px]"
              />
            </label>
          </div>
        </div>
        <p className="block font-sans text-sm  antialiased leading-relaxed text-blue-gray-900">{label}</p>
      </label>
    </div>
  );
};

export default Radio;
