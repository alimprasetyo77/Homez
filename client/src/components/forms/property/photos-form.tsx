import PreviewPhoto from "@/components/preview-photo";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { useDeleteUploadFile, useUploadFile } from "@/hooks/use-upload-file";
import { ICreateProperty } from "@/types/property-type";
import { Camera } from "lucide-react";
import { ChangeEvent, useRef } from "react";
import { useController, useFormContext } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
interface IPreviewPhoto {
  main_photo: string | File;
  photo_1: string | File;
  photo_2: string | File;
  photo_3: string | File;
  photo_4: string | File;
}
const fieldsPhoto = ["main_photo", "photo_1", "photo_2", "photo_3", "photo_4"] as const;
const PhotosForm = () => {
  const { control, setValue, resetField } = useFormContext<ICreateProperty>();
  const {} = useController({ control, name: "photos.main_photo" });
  const { propertyId } = useParams();
  const isEdit = !!propertyId;
  const fileInputRefs = useRef<Record<keyof IPreviewPhoto, HTMLInputElement | null>>({
    main_photo: null,
    photo_1: null,
    photo_2: null,
    photo_3: null,
    photo_4: null,
  });

  // Inisialisasi semua hook
  const uploadHooks = fieldsPhoto.reduce(
    (acc, field) => {
      acc[field] = useUploadFile({
        onSuccess: (res) => {
          const field = res.data.field as keyof ICreateProperty;
          const url = res.data.url;
          setValue(`photos.${field as keyof ICreateProperty["photos"]}`, url, { shouldDirty: true });
        },
        onError: (err) => {
          toast.error(err?.message);
        },
      });
      return acc;
    },
    {
      main_photo: useUploadFile(),
    } as Record<(typeof fieldsPhoto)[number], ReturnType<typeof useUploadFile>>
  );

  const deleteHooks = fieldsPhoto.reduce(
    (acc, field) => {
      acc[field] = useDeleteUploadFile({
        onSuccess: (res) => {
          const field = res.field as keyof ICreateProperty;
          resetField(`photos.${field as keyof ICreateProperty["photos"]}`, { defaultValue: "" });
        },
        onError: (err) => {
          toast.error(err?.message);
          resetField(`photos.${field as keyof ICreateProperty["photos"]}`, { defaultValue: "" });
        },
      });
      return acc;
    },
    {
      main_photo: useDeleteUploadFile(),
    } as Record<(typeof fieldsPhoto)[number], ReturnType<typeof useDeleteUploadFile>>
  );

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const field = e.target.name.split(".")[1] as keyof typeof uploadHooks;
    await uploadHooks[field].uploadAsync({ field, file });
  };

  const handleDelete = async (field: any) => {
    const cleanField = field.split(".")[1] as (typeof fieldsPhoto)[number];
    await deleteHooks[cleanField].deleteUploadFileAsync({
      field: cleanField,
      ...(isEdit && { propertyId }),
    });
  };

  const handleUploadClick = (key: keyof IPreviewPhoto) => {
    fileInputRefs.current[key]?.click();
  };
  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-lg p-8 shadow-sm border">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
            <span className="text-red-500 font-bold text-lg">4</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Property Photos</h2>
            <p className="text-gray-600">Upload high-quality photos to attract buyers' interest.</p>
          </div>
        </div>

        <div className="space-y-6">
          <FormField
            control={control}
            name="photos.main_photo"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    ref={(el) => {
                      fileInputRefs.current.main_photo = el;
                    }}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    name={field.name}
                    onChange={handleChange}
                  />
                </FormControl>
                <div
                  className={`border-2 border-dashed border-gray-300 rounded-lg p-4 w-full min-h-[300px] max-h-[600px] text-center hover:border-gray-400 transition-colors flex flex-col items-center justify-center relative`}
                >
                  {/* Loading Delete Photo */}
                  {deleteHooks.main_photo.isLoading ? (
                    <div className="absolute inset-0 bg-muted/50 flex items-center justify-center z-10">
                      <FaSpinner className="animate-spin duration-300 text-white" />
                    </div>
                  ) : null}

                  {/* Preview photo */}
                  {field.value ? (
                    <PreviewPhoto
                      url={field.value}
                      alt="previewImage"
                      handleDelete={() => handleDelete(field.name)}
                    />
                  ) : // loading upload with progress indicator
                  uploadHooks.main_photo.isLoading ? (
                    <div className="flex flex-col max-w-[300px] w-full gap-y-2">
                      <span className="text-sm font-semibold">
                        Uploading: {uploadHooks.main_photo.progress}%
                      </span>
                      <Progress value={uploadHooks.main_photo.progress} max={100} />
                    </div>
                  ) : (
                    <>
                      <Camera className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Property Photos</h3>
                      <p className="text-gray-600 mb-4">
                        Drag & drop photos or click to select files
                        <br />
                        <span className="text-sm">Format: JPG, PNG (Max 5MB per file)</span>
                      </p>

                      <Button
                        size={"sm"}
                        type="button"
                        className="text-white text-xs bg-red-500 hover:bg-red-600"
                        onClick={() => handleUploadClick("main_photo")}
                      >
                        Upload Main Photo
                      </Button>
                    </>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-start">
              <Camera className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
              <div>
                <h4 className="text-sm font-medium text-yellow-800">Best Photo Tips</h4>
                <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                  <li>• Take photos during the day with natural light</li>
                  <li>• Include photos of the exterior, interior, and surrounding area</li>
                  <li>• Make sure the space looks neat and clean</li>
                  <li>• Upload at least 5 photos for best results</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {fieldsPhoto.slice(1).map((item, index) => (
              <FormField
                control={control}
                name={`photos.${item as keyof ICreateProperty["photos"]}`}
                key={item}
                render={({ field }) => (
                  <FormItem>
                    <div
                      className="aspect-video max-w-[464px] bg-gray-100 rounded-lg border-2 p-4 border-dashed border-gray-300 flex items-center justify-center cursor-pointer relative"
                      onClick={() => {
                        if (field.value || uploadHooks[item].isLoading) return;
                        handleUploadClick(item as keyof IPreviewPhoto);
                      }}
                    >
                      {/* Loading Delete Photo */}
                      {deleteHooks[item].isLoading ? (
                        <div className="absolute inset-0 bg-muted/50 flex items-center justify-center z-10">
                          <FaSpinner className="animate-spin duration-300 text-white" />
                        </div>
                      ) : null}

                      <FormControl>
                        <input
                          ref={(el) => {
                            fileInputRefs.current[item as keyof IPreviewPhoto] = el;
                          }}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          name={field.name}
                          onChange={handleChange}
                        />
                      </FormControl>
                      {/* Preview Image */}
                      {field.value ? (
                        <PreviewPhoto
                          url={field.value}
                          alt={`preview-${item}`}
                          handleDelete={() => handleDelete(field.name as (typeof fieldsPhoto)[number])}
                        />
                      ) : // loading upload with progress indicator
                      uploadHooks[item].isLoading ? (
                        <div className="flex flex-col max-w-[300px] w-full gap-y-2">
                          <span className="text-sm font-semibold">
                            Uploading: {uploadHooks[item].progress}%
                          </span>
                          <Progress value={uploadHooks[item].progress} max={100} />
                        </div>
                      ) : (
                        <div className="text-center">
                          <Camera className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">Photo {index + 1}</p>
                        </div>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotosForm;
