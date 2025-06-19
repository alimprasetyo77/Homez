import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ICreateProperty } from "@/types/property-type";
import { AlertCircle } from "lucide-react";
import { useFormContext } from "react-hook-form";

const PricingForm = () => {
  const { control, getValues } = useFormContext<ICreateProperty>();
  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-lg p-8 shadow-sm border">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
            <span className="text-red-500 font-bold text-lg">3</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Pricing</h2>
            <p className="text-gray-600">Set a competitive price for your property</p>
          </div>
        </div>

        <div className="space-y-6">
          <FormField
            control={control}
            name="listingType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipe Listing</FormLabel>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "buy", label: "For Buy" },
                    { value: "rent", label: "For Rent" },
                  ].map((type) => (
                    <FormControl>
                      <Button
                        type="button"
                        variant={"ghost"}
                        key={type.value}
                        className={`h-14 p-4 border-2 rounded-lg text-center transition-all ${
                          field.value === type.value
                            ? "border-red-500 bg-red-50 text-red-700"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        onClick={() => field.onChange(type.value)}
                      >
                        {type.label}
                      </Button>
                    </FormControl>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Price {getValues("listingType") === "rent" ? "Rent (per month)" : "Buy"}
                </FormLabel>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-1/2 text-gray-500">$</span>
                  <FormControl>
                    <Input placeholder="0" className="h-11 pl-10" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
              <div>
                <h4 className="text-sm font-medium text-blue-800">Pricing Tips</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Research market prices in the surrounding area to get competitive prices. Realistic prices
                  will speed up the transaction process.
                </p>
              </div>
            </div>
          </div>

          {/* {getValues("squareFeet") && getValues("price") && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                Harga per m²:{" "}
                <span className="font-medium text-gray-900">
                  Rp{" "}
                  {Math.round(
                    parseInt(formData.price.replace(/\D/g, "")) / parseInt(formData.area)
                  ).toLocaleString()}
                </span>
              </p>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default PricingForm;
