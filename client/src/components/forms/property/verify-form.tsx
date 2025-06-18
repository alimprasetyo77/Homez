import { Trash, Upload, X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
const VerifyForm = () => {
  const { control } = useFormContext();
  const [previewImage, setPreviewImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-lg p-8 shadow-sm border">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
            <span className="text-red-500 font-bold text-lg">1</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Property Verification</h2>
            <p className="text-gray-600">Let's verify your property ownership and details</p>
          </div>
        </div>

        <div className="space-y-6">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Property Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full border-gray-300 ">
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="office">Office</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="photoDocument"
            render={({ field }) => (
              <FormItem>
                <h3 className="font-semibold text-sm text-gray-700">Upload Document</h3>
                <FormControl>
                  <Input
                    className="hidden"
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => {
                      if (e.target.files) {
                        const file = e.target.files[0];
                        setPreviewImage(URL.createObjectURL(file));
                        field.onChange(file);
                      }
                    }}
                  />
                </FormControl>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors flex flex-col items-center justify-center min-h-96 ">
                  {previewImage ? (
                    <div className="relative group">
                      <img src={previewImage} className="rounded-xl" alt="previewImage" />
                      <Button
                        className="absolute top-2 right-2 rounded-full p-1 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                        variant={"destructive"}
                        size={"icon"}
                        onClick={() => {
                          setPreviewImage("");
                          field.onChange("");
                        }}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-600 mb-2">Certificate, IMB, or other ownership documents</p>
                      <Button
                        type="button"
                        size={"sm"}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                        onClick={handleFileButtonClick}
                      >
                        Select Files
                      </Button>
                    </div>
                  )}
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyForm;
