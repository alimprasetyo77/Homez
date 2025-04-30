import Radio from "@/components/radio";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ITypeProperties, Properties, propertiesTypeOptions, typeProperties } from "@/constants/home";
import { ListLinkSearch } from "@/constants/home/types";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export type PropertyStatusType = "all" | "buy" | "rent";

const Search = () => {
  const [searchParams] = useSearchParams();
  const querySearch = searchParams.get("q") || "";
  const [propertyStatus, setPropertyStatus] = useState<ListLinkSearch | "all">("all");
  const [propertyType, setPropertyType] = useState<(ITypeProperties | "all")[]>(["all"]);
  const handlePropertyTypeChange = (type: ITypeProperties | "all") => {
    if (type === "all") {
      setPropertyType(["all"]);
      return;
    }

    setPropertyType((prev) => {
      if (prev.includes("all")) return [type];
      if (prev.includes(type)) return prev.filter((item) => item !== type);
      return [...prev, type];
    });
  };
  return (
    <div className="bg-[#f7f7f7] min-h-screen py-20">
      <div className="max-w-[1230px] mx-auto">
        <div>
          <h1 className="text-3xl font-semibold">Search</h1>
          <p className="text-gray-500 text-sm mt-2">Find your dream home with our advanced search options.</p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-12 gap-x-16">
            <div className="col-span-5">
              <div className="bg-white rounded-md shadow p-6 space-y-10">
                <div className="space-y-2">
                  <h2 className="font-medium ">Find your properties</h2>
                  <div className="p-2 border rounded-lg flex items-center">
                    <SearchIcon />
                    <Input
                      name="search-property"
                      className="outline-none  border-none focus-visible:border-none focus-visible:ring-0 h-auto"
                      placeholder="Search by city, neighborhood, or address"
                      defaultValue={querySearch || ""}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <h2 className="font-medium ">Property Status</h2>
                  <div className="flex flex-col">
                    <Radio label="All" isChecked={propertyStatus === "all"} onChange={setPropertyStatus} />
                    <Radio label="Buy" isChecked={propertyStatus === "buy"} onChange={setPropertyStatus} />
                    <Radio label="Rent" isChecked={propertyStatus === "rent"} onChange={setPropertyStatus} />
                  </div>
                </div>
                <div className="space-y-2">
                  <h2 className="font-medium ">Property Type</h2>
                  <div className="flex flex-col">
                    {propertiesTypeOptions.map((type, index) => (
                      <div key={index} className="flex items-center gap-x-4 text-sm ">
                        <Checkbox
                          id={type.toLowerCase()}
                          checked={propertyType.includes(type.toLowerCase() as ITypeProperties)}
                          onClick={() => handlePropertyTypeChange(type.toLowerCase() as ITypeProperties)}
                        />
                        <label
                          htmlFor={type.toLowerCase()}
                          className="block font-sans text-sm  antialiased leading-relaxed text-blue-gray-900"
                        >
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 col-span-7">
              {Properties.map((property) => (
                <div key={property.id} className="col-span-1 bg-white rounded-md shadow p-4 m-2">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <h3 className="text-lg font-semibold mt-2">{property.title}</h3>
                  <p className="text-gray-500">{property.type}</p>
                  <p className="text-gray-500">{property.location.city}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
