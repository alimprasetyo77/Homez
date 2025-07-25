import { Upload } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useRef } from "react";
import { ICreateProperty } from "@/types/property-type";
import PreviewPhoto from "@/components/preview-photo";
import { toast } from "sonner";
import { FaSpinner } from "react-icons/fa";
import { Progress } from "@/components/ui/progress";
import { useDeleteUploadFile, useUploadFile } from "@/hooks/use-upload-file";
import { useParams } from "react-router-dom";

const VerifyForm = () => {
  const { control, setValue, resetField } = useFormContext<ICreateProperty>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { propertyId } = useParams();
  const isEdit = !!propertyId;
  const {
    uploadAsync,
    progress,
    isLoading: isLoadingUpload,
  } = useUploadFile({
    onSuccess: (res) => {
      setValue("photoDocument", res.data.url);
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  const { deleteUploadFileAsync, isLoading: isLoadingDeleteFile } = useDeleteUploadFile({
    onSuccess: () => {
      resetField("photoDocument", { defaultValue: "" });
    },
    onError: (err) => {
      resetField("photoDocument", { defaultValue: "" });
      toast.error(err?.message);
    },
  });

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    await uploadAsync({ file: file, field: "photoDocument" });
  };
  const handleDelete = async () => {
    await deleteUploadFileAsync({ field: "photoDocument", ...(isEdit && { propertyId }) });
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
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Property Type</FormLabel>
                  <Select value={field.value || ""} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full border-gray-300 !h-11">
                        <SelectValue placeholder="Select a Type to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="office">Office</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={control}
            name="photoDocument"
            render={({ field }) => {
              return (
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
                  <div
                    className={`border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors flex flex-col items-center justify-center min-h-96 relative`}
                  >
                    {isLoadingDeleteFile ? (
                      <div className="absolute inset-0 bg-muted/50 flex items-center justify-center z-10">
                        <FaSpinner className="animate-spin duration-300 text-white" />
                      </div>
                    ) : null}
                    {field.value ? (
                      <PreviewPhoto url={field.value} alt="previewImage" handleDelete={handleDelete} />
                    ) : isLoadingUpload ? (
                      <div className="flex flex-col max-w-[300px] w-full gap-y-2">
                        <span className="text-sm font-semibold">Uploading: {progress}%</span>
                        <Progress value={progress} max={100} />
                      </div>
                    ) : (
                      <div>
                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-gray-600 mb-2">Certificate, IMB, or other ownership documents</p>
                        <button
                          type="button"
                          className="text-sm h-8 bg-red-500 text-white px-4 font-medium rounded-lg hover:bg-red-600 cursor-pointer"
                          onClick={handleFileButtonClick}
                        >
                          Select Files
                        </button>
                      </div>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyForm;
