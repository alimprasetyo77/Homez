import Radio from "@/components/radio";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { propertiesTypeOptions } from "@/constants/property";
import { usdCurrencyFormat } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { ISearchOrFilterProperties, PropertyStatus, PropertyType } from "@/types/property-type";
import { useLocationProperties, useSearchFilterProperties } from "@/hooks/use-properties";
import { FavoriteCard } from "@/components/cards/property-card";
import { useMyFavorites } from "@/hooks/use-favorite";

const Search = () => {
  const { state } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const statePropertyStatus = state?.propertyStatus;
  const statePropertyType = state?.propertyType;
  // Get query params from URL
  const querySearch = searchParams.get("q") || "";
  const locationSearch = searchParams.get("location") || "";

  const [keyword, setKeyword] = useState(querySearch || "");
  const [propertyStatus, setPropertyStatus] = useState<PropertyStatus | "all">(statePropertyStatus ?? "all");
  const [propertyType, setPropertyType] = useState<(PropertyType | "all")[]>([statePropertyType ?? "all"]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 5000000,
  });
  const [location, setLocation] = useState(locationSearch || "All Cities");
  const [filteredProperties, setFilteredProperties] = useState<ISearchOrFilterProperties>();

  const { properties, fetchSearchFilterProperties } = useSearchFilterProperties(
    filteredProperties as ISearchOrFilterProperties
  );

  const { locationProperties } = useLocationProperties();

  const { favorites } = useMyFavorites();

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
      page: 1,
      limit: 8,
    };
    if (keyword) {
      filter.title = keyword.trim();
    }
    if (priceRange.min >= 0 && priceRange.max < 5000000) {
      filter.price = { min: priceRange.min, max: priceRange.max };
    }
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
    updateSearchParams("location", null);
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
    if (statePropertyType || statePropertyStatus || searchParams.has("q") || searchParams.has("location")) {
      handleSearch();
    }
  }, [statePropertyType, statePropertyStatus, searchParams.has("q"), searchParams.has("location")]);

  useEffect(() => {
    if (filteredProperties) {
      fetchSearchFilterProperties();
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
                    <Radio
                      label="All"
                      isChecked={propertyStatus === "all"}
                      onChange={() => setPropertyStatus("all")}
                    />
                    <Radio
                      label="Buy"
                      isChecked={propertyStatus === "buy"}
                      onChange={() => setPropertyStatus("buy")}
                    />
                    <Radio
                      label="Rent"
                      isChecked={propertyStatus === "rent"}
                      onChange={() => setPropertyStatus("rent")}
                    />
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
                      {locationProperties?.map((location, index) => (
                        <SelectItem key={index} value={location}>
                          {location}
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
              {properties?.data ? (
                <span className="absolute top-0 text-slate-800 font-sans ">
                  Showing {Math.max(1, (properties.page - 1) * properties.limit)} -{" "}
                  {Math.min((properties.page - 1) * properties.limit + properties.limit, properties.total)} of{" "}
                  {properties.total} results
                </span>
              ) : null}
              {properties && properties.data.length > 0 ? (
                properties.data.map((property) => {
                  const favorite = favorites?.find((favorite) => favorite.property.id === property.id);
                  return (
                    <FavoriteCard
                      key={property.id}
                      property={property}
                      favoriteId={favorite ? favorite.id : null}
                    />
                  );
                })
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
                  {Array.from({ length: Number(properties?.totalPages) }, (_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        onClick={() =>
                          setFilteredProperties((prev) => {
                            if (prev) {
                              return { ...prev, page: index + 1 };
                            }
                          })
                        }
                        isActive={properties?.page === index + 1}
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
                        if (prev && properties && prev.page < properties.totalPages) {
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
