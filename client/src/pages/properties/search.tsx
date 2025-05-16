import Radio from "@/components/radio";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ITypeProperties, ListCities, Properties, propertiesTypeOptions } from "@/constants/home";
import { IProperties, ListLinkSearch } from "@/constants/home/types";
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

export type PropertyStatusType = "all" | "buy" | "rent";

const Search = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [dataProperties, setDataProperties] = useState<IProperties[]>();
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 20000000,
  });
  const querySearch = searchParams.get("q") || "";
  const locationSearch = searchParams.get("location") || "";
  const [propertyStatus, setPropertyStatus] = useState<ListLinkSearch | "all">(
    state?.propertyStatus ?? "all"
  );
  const [propertyType, setPropertyType] = useState<(ITypeProperties | "All")[]>(
    state?.propertyType ?? ["All"]
  );
  const [keyword, setKeyword] = useState(querySearch || "");
  const [location, setLocation] = useState(locationSearch || "All Cities");

  const [page, setPage] = useState({
    currentPage: 1,
    totalPage: Math.ceil(Number(dataProperties?.length) / 8),
    perpage: 8,
    startIndex: 0,
    endIndex: 8,
  });
  const handleSearch = () => {
    let filteredProperties = Properties;

    // Property Search
    if (keyword.length > 0) {
      filteredProperties = filteredProperties.filter((property) =>
        property.title.toLowerCase().includes(keyword.toLowerCase())
      );
      updateSearchParams("q", keyword);
    } else {
      updateSearchParams("q", null);
    }

    // Property Status Filter
    if (propertyStatus !== "all") {
      filteredProperties = filteredProperties.filter((property) => property.listingStatus === propertyStatus);
    }

    // Property Type Filter
    if (!propertyType.includes("All")) {
      filteredProperties = filteredProperties.filter((property) =>
        propertyType.includes(property.type as ITypeProperties)
      );
    }

    // Property Price Range Filter
    filteredProperties = filteredProperties.filter(
      (item) => item.price >= priceRange.min && item.price <= priceRange.max
    );

    // Property Location Filter
    if (location.trim() && location !== "All Cities") {
      filteredProperties = filteredProperties.filter(
        (item) => item.location.city.toLowerCase() == location.toLowerCase()
      );
      updateSearchParams("location", location);
    } else {
      updateSearchParams("location", null);
    }

    setSearchParams(searchParams);
    setDataProperties(filteredProperties);
  };

  const handleResetFilters = () => {
    setPriceRange({ min: 0, max: 10000000 });
    setPropertyStatus("all");
    setPropertyType(["All"]);
    setKeyword("");
    setLocation("All Cities");
    updateSearchParams("q", null);
    updateSearchParams("location", null);
    setSearchParams(searchParams);
    setDataProperties(Properties);
  };

  // Fn update search param
  const updateSearchParams = (key: string, value: string | null) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
  };

  const handlePropertyTypeChange = (type: ITypeProperties | "All") => {
    if (type === "All") return setPropertyType(["All"]);

    setPropertyType((prev) => {
      if (prev.includes("All")) return [type];
      if (prev.includes(type)) {
        const result = prev.filter((item) => item !== type);
        return result.length > 0 ? result : ["All"];
      }
      return [...prev, type];
    });
  };
  const handleNextPage = () => {
    if (page.currentPage < page.totalPage) {
      setPage((prev) => {
        const newStartIndex = prev.currentPage * prev.perpage;
        const newEndIndex = newStartIndex + prev.perpage;
        return {
          ...prev,
          currentPage: prev.currentPage + 1,
          startIndex: newStartIndex,
          endIndex: newEndIndex,
        };
      });
    }
  };

  const handlePreviousPage = () => {
    if (page.currentPage > 1) {
      setPage((prev) => {
        const newStartIndex = (prev.currentPage - 2) * prev.perpage;
        const newEndIndex = newStartIndex + prev.perpage;
        return {
          ...prev,
          currentPage: prev.currentPage - 1,
          startIndex: newStartIndex,
          endIndex: newEndIndex,
        };
      });
    }
  };

  const handleChoosePage = (page: number) => {
    window.scrollTo(0, 0);

    setPage((prev) => {
      const newStartIndex = (page - 1) * prev.perpage;
      const newEndIndex = newStartIndex + prev.perpage;
      return {
        ...prev,
        currentPage: page,
        startIndex: newStartIndex,
        endIndex: newEndIndex,
      };
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (querySearch) return setDataProperties(Properties.filter((item) => item.title.includes(querySearch)));
    if (locationSearch) {
      return setDataProperties(
        Properties.filter((item) => item.location.city.toLowerCase() === locationSearch.toLowerCase())
      );
    }
    if (state?.propertyType) {
      return setDataProperties(Properties.filter((item) => item.type === state.propertyType));
    }
    if (state?.propertyStatus) {
      return setDataProperties(Properties.filter((item) => item.listingStatus === state.propertyStatus));
    }

    setDataProperties(Properties);
  }, []);
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
                          id={type.toLowerCase()}
                          checked={propertyType.includes(type as ITypeProperties)}
                          onClick={() => handlePropertyTypeChange(type as ITypeProperties)}
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
              <span className="absolute top-0 text-slate-800 font-sans ">
                Showing {page.startIndex == 0 && dataProperties?.length ? 1 : page.startIndex}-
                {page.endIndex > (dataProperties?.length as number) ? dataProperties?.length : page.endIndex}{" "}
                of {dataProperties?.length} results
              </span>
              {dataProperties && dataProperties.length > 0 ? (
                dataProperties.slice(page.startIndex, page.endIndex).map((property) => (
                  <div
                    key={property.id}
                    className="bg-white rounded-[12px] shadow overflow-clip aspect-square"
                  >
                    <div className="relative">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-[248px] object-cover "
                      />
                      <span className="absolute bottom-3 left-3 bg-white p-2 rounded-sm text-sm font-medium">
                        {usdCurrencyFormat(property.price) +
                          `${property.listingStatus === "rent" ? " / Month" : ""}`}
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
                          {property.location.city}, {property.location.state}, {property.location.country}
                        </p>
                      </div>
                      <hr className="my-2" />
                      <div className="flex items-center justify-between ">
                        <span className="text-[13px] capitalize text-[#181a20] ">
                          for {property.listingStatus}
                        </span>
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
                    <PaginationPrevious onClick={handlePreviousPage} />
                  </PaginationItem>
                  {Array.from({ length: Math.ceil((dataProperties?.length as number) / 8) }, (_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        onClick={() => {
                          handleChoosePage(index + 1);
                        }}
                        isActive={page.currentPage === index + 1}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  {/* <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem> */}
                  <PaginationItem>
                    <PaginationNext onClick={handleNextPage} />
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
