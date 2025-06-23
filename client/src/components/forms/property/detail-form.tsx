import Map from "@/components/map";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AmenitiesList } from "@/constants/property";
import useDebounce from "@/hooks/use-debounce";
import { forwardGeocode } from "@/services/property-service";
import { ICreateProperty } from "@/types/property-type";
import { useQuery } from "@tanstack/react-query";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

const DetailForm = () => {
  const { control, setValue } = useFormContext<ICreateProperty>();
  const [position, setPosition] = useState<[number, number]>();
  const [openSuggestionAddress, setOpenSuggestionAddress] = useState(false);
  const [keywordAddress, setKeywordAddress] = useState("");
  const keywordDebounce = useDebounce(keywordAddress, 500);

  const { data } = useQuery({
    queryKey: ["forwardGeoCode", keywordDebounce],
    queryFn: () => forwardGeocode(keywordDebounce),
    enabled: !!keywordDebounce,
  });

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-lg p-8 shadow-sm border">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
            <span className="text-red-500 font-bold text-lg">2</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Property Details</h2>
            <p className="text-gray-600">Complete detailed information about your property </p>
          </div>
        </div>

        <div className="space-y-6">
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Listing Title</FormLabel>
                <FormControl>
                  <Input
                    className="w-full p-3 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Contoh: Rumah Modern 3 Kamar di Jakarta Selatan"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <Textarea
                  {...field}
                  placeholder="Deskripsikan properti Anda dengan detail..."
                  maxLength={1000}
                  className="h-full max-h-36"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="location.address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <div className="relative h-11 mb-2">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2  size-5 text-gray-400" />
                    <Input
                      className="h-11 pl-10 "
                      placeholder="Enter address"
                      {...field}
                      onClick={() => setOpenSuggestionAddress(true)}
                      onChange={(e) => {
                        setKeywordAddress(e.target.value);
                        field.onChange(e.target.value);
                      }}
                    />
                    <div
                      className="p-3 absolute inset-x-0 bg-white border shadow-sm rounded-sm z-[2000] max-h-56 overflow-y-scroll "
                      hidden={keywordDebounce.trim() === "" || openSuggestionAddress === false}
                    >
                      <ul className="space-y-2 *border-b">
                        {data?.map((d, i) => (
                          <li
                            key={i}
                            onClick={() => {
                              setPosition([Number(d.lat), Number(d.lon)]);
                              setOpenSuggestionAddress(false);
                              setValue("location.address", d.display_name);
                            }}
                          >
                            {d.display_name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
                <Map interactive position={position} />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={control}
              name="bedrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bedrooms</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="bathrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bathrooms</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="squareFeet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SquareFeet</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name="amenities"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="">Fasilitas</FormLabel>
                <div className="grid grid-cols-2 gap-2">
                  {AmenitiesList.map(({ label, value }) => (
                    <div key={value} className="flex items-center space-x-2 cursor-pointer">
                      <FormControl>
                        <Checkbox
                          id={value}
                          checked={field.value?.includes(value)}
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? [...(field.value || []), value]
                              : (field.value || []).filter((v) => v !== value);
                            field.onChange(newValue);
                          }}
                          {...field}
                        />
                      </FormControl>
                      <FormLabel htmlFor={value} className="text-sm text-gray-700">
                        {label}
                      </FormLabel>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailForm;
