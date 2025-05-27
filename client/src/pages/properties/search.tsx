import Radio from "@/components/radio";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { propertiesTypeOptions } from "@/constants/home";
import { convertToUrlSlug, usdCurrencyFormat } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
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
import { useQuery } from "@tanstack/react-query";
import { getLocation, searchOrFilterProperties } from "@/utils/apis/properties/api";
import { ISearchOrFilterProperties, PropertyStatus, PropertyType } from "@/utils/apis/properties/types";

const Search = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get query params from URL
  const querySearch = searchParams.get("q") || "";
  const locationSearch = searchParams.get("location") || "";

  const [keyword, setKeyword] = useState(querySearch || "");
  const [propertyStatus, setPropertyStatus] = useState<PropertyStatus | "all">(
    state?.propertyStatus ?? "all"
  );
  const [propertyType, setPropertyType] = useState<(PropertyType | "all")[]>(["all"]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 5000000,
  });
  const [location, setLocation] = useState(locationSearch || "All Cities");
  const [filteredProperties, setFilteredProperties] = useState<ISearchOrFilterProperties>();

  const { data, refetch } = useQuery({
    queryKey: ["searchOrFilter-properties", filteredProperties],
    queryFn: () => searchOrFilterProperties(filteredProperties as ISearchOrFilterProperties),
    enabled: false,
  });

  const { data: locationProperties } = useQuery({
    queryKey: ["location-properties", filteredProperties],
    queryFn: () => getLocation(),
  });

  const handlePropertyTypeChange = (type: PropertyType | "all") => {
    setPropertyType((prev) => {
      if (type === "all") return ["all"];

      if (prev.includes("all")) return [type];

      if (prev.includes(type)) {
        const updated = prev.filter((item) => item !== type);
        return updated.length > 0 ? updated : ["all"];
      }

      return [...prev, type];
    });
  };

  const handleSearch = () => {
    let filter: ISearchOrFilterProperties = {
      title: keyword.trim(),
      price: {
        min: priceRange.min,
        max: priceRange.max,
      },
      page: 1,
      limit: 8,
    };

    if (propertyStatus !== "all") {
      filter.status = propertyStatus;
    }
    if (propertyType !== undefined && propertyType.length > 0 && !propertyType.includes("all")) {
      filter.type = propertyType as PropertyType[];
    }

    if (location && location !== "All Cities") {
      filter.location = location;
    }
    setFilteredProperties(filter);
  };

  // Handle search params
  const handleResetFilters = () => {
    setKeyword("");
    setPropertyStatus("all");
    setPropertyType(["all"]);
    setPriceRange({ min: 0, max: 5000000 });
    setLocation("All Cities");
    updateSearchParams("q", null);
    setSearchParams(searchParams);
    setFilteredProperties({ limit: 8, page: 1 });
  };

  // Fn update search param
  const updateSearchParams = (key: string, value: string | null) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
  };
  useEffect(() => {
    const hasQuery = searchParams.get("q");
    if (hasQuery) {
      handleSearch();
    }
  }, [searchParams]);

  useEffect(() => {
    if (filteredProperties) {
      refetch();
    } else {
      setFilteredProperties({
        page: 1,
        limit: 8,
      });
    }
  }, [filteredProperties]);

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
                        <Checkbox
                          checked={propertyType.includes(type as PropertyType)}
                          id={type.toLowerCase()}
                          onCheckedChange={() => handlePropertyTypeChange(type as PropertyType)}
                        />

                        <label
                          htmlFor={type.toLowerCase()}
                          className="block font-sans text-sm capitalize antialiased leading-relaxed text-blue-gray-900"
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
                        setPriceRange({ min: value[0] * 50000, max: value[1] * 50000 })
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
                      {locationProperties?.data.map((item, index) => (
                        <SelectItem key={index} value={item.city}>
                          {item.city}
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
              {data ? (
                <span className="absolute top-0 text-slate-800 font-sans ">
                  Showing {Math.max(1, (data.page - 1) * data.limit)} -{" "}
                  {Math.min((data.page - 1) * data.limit + data.limit, data.total)} of {data.total} results
                </span>
              ) : null}
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
                  <PaginationItem
                    onClick={() =>
                      setFilteredProperties((prev) => {
                        if (prev && prev.page > 1) {
                          return { ...prev, page: prev.page - 1 };
                        }
                        return prev;
                      })
                    }
                  >
                    <PaginationPrevious />
                  </PaginationItem>
                  {Array.from({ length: Number(data?.totalPages) }, (_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        onClick={() =>
                          setFilteredProperties((prev) => {
                            if (prev) {
                              return { ...prev, page: index + 1 };
                            }
                          })
                        }
                        isActive={data?.page === index + 1}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  {/* <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem> */}
                  <PaginationItem
                    onClick={() =>
                      setFilteredProperties((prev) => {
                        if (prev && data && prev.page < data.totalPages) {
                          return { ...prev, page: prev.page + 1 };
                        }
                        return prev;
                      })
                    }
                  >
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
