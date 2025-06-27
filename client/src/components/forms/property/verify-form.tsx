import { FileDiff, Upload } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ICreateProperty } from "@/types/property-type";
import PreviewPhoto from "@/components/preview-photo";
import { deletePhoto, uploadPhoto } from "@/services/upload-service";
import { toast } from "sonner";
const VerifyForm = () => {
  const { control, getValues } = useFormContext<ICreateProperty>();
  const [previewImage, setPreviewImage] = useState<string | File>(getValues("photoDocument") ?? "");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = async (e: any) => {
    if (!e.target.files) return;
    try {
      const file = e.target.files[0];
      const result = await uploadPhoto(file);
      setPreviewImage(result.data.url);
    } catch (error: any) {
      toast.error(error);
    }
  };
  const handleDelete = async () => {
    try {
      const result = await deletePhoto(previewImage as string);
      toast.success(result.message);
    } catch (error: any) {
      toast.error(error);
    }
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
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Property Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full border-gray-300 !h-11">
                      <SelectValue placeholder="Select a Type to display" />
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
                    onChange={(e) => handleChange(e)}
                  />
                </FormControl>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors flex flex-col items-center justify-center min-h-96 ">
                  {previewImage ? (
                    <PreviewPhoto
                      url={previewImage as string}
                      alt="previewImage"
                      handleDelete={handleDelete}
                    />
                  ) : (
                    <div>
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-600 mb-2">Certificate, IMB, or other ownership documents</p>
                      <Button
                        type="button"
                        size={"sm"}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer"
                        onClick={handleFileButtonClick}
                      >
                        Select Files
                      </Button>
                    </div>
                  )}
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

export default VerifyForm;
