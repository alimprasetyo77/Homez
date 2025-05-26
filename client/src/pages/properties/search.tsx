import Radio from "@/components/radio";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ListCities, propertiesTypeOptions } from "@/constants/home";
import { convertToUrlSlug, usdCurrencyFormat } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RxExternalLink } from "react-icons/rx";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { RiArrowGoBackFill } from "react-icons/ri";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useMutation } from "@tanstack/react-query";
import { searchOrFilterProperties } from "@/utils/apis/properties/api";
import { IProperty, ISearchOrFilterProperties, PropertyStatus } from "@/utils/apis/properties/types";
import { toast } from "sonner";
import { ResponsePagination } from "@/utils/types/type";

export type PropertyStatusType = "all" | "buy" | "rent";

const Search = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [data, setData] = useState<ResponsePagination<IProperty>>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 20000000,
  });
  const querySearch = searchParams.get("q") || "";
  const locationSearch = searchParams.get("location") || "";
  const [propertyStatus, setPropertyStatus] = useState<PropertyStatus | "all">(
    state?.propertyStatus ?? "all"
  );
  const [keyword, setKeyword] = useState(querySearch || "");
  const [location, setLocation] = useState(locationSearch || "All Cities");

  const mutation = useMutation({
    mutationFn: searchOrFilterProperties,
    onSuccess: (data) => {
      setData(data);
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred while searching properties.");
    },
  });
  const handleSearch = () => {
    let filteredProperties: ISearchOrFilterProperties = {
      limit: 8,
      page: 1,
      title: searchParams.get("q") ?? keyword,
    };
    mutation.mutate(filteredProperties);
  };

  const handleResetFilters = () => {
    updateSearchParams("q", null);
    setSearchParams(searchParams);
  };

  // Fn update search param
  const updateSearchParams = (key: string, value: string | null) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
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
            <div className="col-span-4">
              <div className="bg-white rounded-[12px] shadow p-6 space-y-10">
                <div className="space-y-2">
                  <h2 className="font-medium ">Find your properties</h2>
                  <div className="p-2 border rounded-lg flex items-center">
                    <SearchIcon />
                    <Input
                      name="search-property"
                      className="outline-none  border-none focus-visible:border-none focus-visible:ring-0 h-auto"
                      placeholder="Search by city, neighborhood, or address"
                      value={keyword}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSearch();
                        }
                      }}
                      onChange={(e) => setKeyword(e.target.value)}
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
                        <Checkbox id={type.toLowerCase()} />
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
                <div className="space-y-2">
                  <h2 className="font-medium">Price Range</h2>
                  <div className="flex flex-col items-center gap-4">
                    <Slider
                      defaultValue={[0, 100]}
                      max={100}
                      step={1}
                      onValueChange={(value) =>
                        setPriceRange({ min: value[0] * 200000, max: value[1] * 200000 })
                      }
                    />
                    <div className="flex items-center gap-x-4 ">
                      <Input
                        className="disabled:opacity-75"
                        value={`${usdCurrencyFormat(priceRange.min)}`}
                        disabled
                      />
                      {"-"}
                      <Input
                        className="disabled:opacity-75"
                        value={`${usdCurrencyFormat(priceRange.max)}`}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                {/* Location */}
                <div className="space-y-2">
                  <h2 className="font-medium">Location</h2>
                  <Select
                    defaultValue={locationSearch}
                    value={location}
                    onValueChange={(value) => setLocation(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Cities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Cities">All Cities</SelectItem>
                      {ListCities.slice(0, 6).map((city) => (
                        <SelectItem key={city.id} value={city.name}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* Submit */}
                <div className="space-y-4">
                  <Button
                    className="bg-[#ee4c34] hover:bg-[#ee4c34]/70 cursor-pointer w-full"
                    onClick={handleSearch}
                  >
                    <SearchIcon />
                    <span>Search</span>
                  </Button>
                  <a
                    className="flex items-center gap-x-1 text-sm underline underline-offset-2 cursor-pointer"
                    onClick={handleResetFilters}
                  >
                    <RiArrowGoBackFill />
                    <span>Reset All Filters</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="relative grid grid-cols-2 col-span-8 gap-4 pt-12 ">
              <span className="absolute top-0 text-slate-800 font-sans ">Showing 1- 8 of20 results</span>
              {data && data.data.length > 0 ? (
                data.data.map((property) => (
                  <div
                    key={property.id}
                    className="bg-white rounded-[12px] shadow overflow-clip aspect-square"
                  >
                    <div className="relative">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-[248px] object-cover "
                      />
                      <span className="absolute bottom-3 left-3 bg-white p-2 rounded-sm text-sm font-medium">
                        {usdCurrencyFormat(property.price) +
                          `${property.status === "rent" ? " / Month" : ""}`}
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="space-y-2">
                        <h3
                          className="text-[15px] text-[#181a20] font-semibold mt-2 hover:underline"
                          onClick={() => navigate(`/properties/${convertToUrlSlug(property.title)}`)}
                        >
                          {property.title}
                        </h3>
                        <p className="text-[#717171] text-sm">
                          {property.city}, {property.state}, {property.country}
                        </p>
                      </div>
                      <hr className="my-2" />
                      <div className="flex items-center justify-between ">
                        <span className="text-[13px] capitalize text-[#181a20] ">for {property.status}</span>
                        <div className="flex items-center gap-x-4 text-[#454545]">
                          <RxExternalLink />
                          <MdOutlineLibraryAdd />
                          <CiHeart />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h1 className="text-lg capitalize ">no result {keyword ? `for "${keyword}"` : null}</h1>
              )}

              <Pagination className="col-span-2">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious />
                  </PaginationItem>
                  {Array.from({ length: Number(data?.totalPages) }, (_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink>{index + 1}</PaginationLink>
                    </PaginationItem>
                  ))}
                  {/* <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem> */}
                  <PaginationItem>
                    <PaginationNext />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
