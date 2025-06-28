import PreviewPhoto from "@/components/preview-photo";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { useDeleteUploadFile, useUploadFile } from "@/hooks/use-upload-file";
import { ICreateProperty } from "@/types/property-type";
import { Camera } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { toast } from "sonner";
interface IPreviewPhoto {
  main_photo: string | File;
  photo_1: string | File;
  photo_2: string | File;
  photo_3: string | File;
  photo_4: string | File;
}
const PhotosForm = () => {
  const { control, getValues, setValue } = useFormContext<ICreateProperty>();
  const [previewPhoto, setPreviewPhoto] = useState<IPreviewPhoto>({
    main_photo: getValues("photos.main_photo") ?? "",
    photo_1: getValues("photos.photo_1") ?? "",
    photo_2: getValues("photos.photo_2") ?? "",
    photo_3: getValues("photos.photo_3") ?? "",
    photo_4: getValues("photos.photo_4") ?? "",
  });
  const [isloadingUpload, setIsloadingUpload] = useState<Record<keyof ICreateProperty["photos"], boolean>>({
    main_photo: false,
    photo_1: false,
    photo_2: false,
    photo_3: false,
    photo_4: false,
  });
  const [isloadingDelete, setIsloadingDelete] = useState<Record<keyof ICreateProperty["photos"], boolean>>({
    main_photo: false,
    photo_1: false,
    photo_2: false,
    photo_3: false,
    photo_4: false,
  });
  const fileInputRefs = useRef<Record<keyof IPreviewPhoto, HTMLInputElement | null>>({
    main_photo: null,
    photo_1: null,
    photo_2: null,
    photo_3: null,
    photo_4: null,
  });

  const { uploadAsync, progress } = useUploadFile({
    onSuccess: (res) => {
      const field = res.data.field;
      const url = res.data.url;
      setIsloadingUpload((prev) => ({ ...prev, [field.split(".")[1]]: false }));
      setValue(field as keyof ICreateProperty, url);
      setPreviewPhoto((prev) => ({ ...prev, [field.split(".")[1]]: url }));
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  const { deleteUploadFileAsync } = useDeleteUploadFile({
    onSuccess: (res) => {
      const field = res.field;
      setIsloadingDelete((prev) => ({ ...prev, [field.split(".")[1]]: false }));
      setValue(field as keyof ICreateProperty, "");
      setPreviewPhoto((prev) => ({ ...prev, [field.split(".")[1]]: "" }));
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const name = e.target.name;
    setIsloadingUpload((prev) => ({ ...prev, [name.split(".")[1]]: true }));
    await uploadAsync({ file: file, field: name });
  };
  const handleDelete = async (field: string) => {
    setIsloadingUpload((prev) => ({ ...prev, [field.split(".")[1]]: true }));
    await deleteUploadFileAsync({ field });
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
                  className={`border-2 border-dashed border-gray-300 rounded-lg p-4 w-full h-full max-h-[600px] text-center hover:border-gray-400 transition-colors flex flex-col items-center justify-center relative`}
                >
                  {isloadingDelete.main_photo ? (
                    <div className="absolute inset-0 bg-muted/50 flex items-center justify-center z-10">
                      <FaSpinner className="animate-spin duration-300 text-white" />
                    </div>
                  ) : null}
                  {previewPhoto.main_photo ? (
                    <PreviewPhoto
                      url={previewPhoto.main_photo as string}
                      alt="previewImage"
                      handleDelete={() => handleDelete(field.name)}
                    />
                  ) : isloadingDelete.main_photo ? (
                    <div className="flex flex-col max-w-[300px] w-full gap-y-2">
                      <span className="text-sm font-semibold">Uploading: {progress}%</span>
                      <Progress value={progress} max={100} />
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
            {["photo_1", "photo_2", "photo_3", "photo_4"].map((item, index) => (
              <FormField
                control={control}
                name={`photos.${item as keyof ICreateProperty["photos"]}`}
                key={item}
                render={({ field }) => (
                  <FormItem>
                    <div
                      className="aspect-video max-w-[464px] bg-gray-100 rounded-lg border-2 p-4 border-dashed border-gray-300 flex items-center justify-center cursor-pointer relative"
                      onClick={() => {
                        if (!previewPhoto[item as keyof IPreviewPhoto])
                          handleUploadClick(item as keyof IPreviewPhoto);
                      }}
                    >
                      {isloadingUpload[item as keyof typeof isloadingUpload] ? (
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
                      {previewPhoto[item as keyof IPreviewPhoto] ? (
                        <PreviewPhoto
                          url={previewPhoto[item as keyof IPreviewPhoto] as string}
                          alt={`preview-${item}`}
                          handleDelete={() => handleDelete(field.name)}
                        />
                      ) : isloadingUpload[item as keyof typeof isloadingUpload] ? (
                        <div className="flex flex-col max-w-[300px] w-full gap-y-2">
                          <span className="text-sm font-semibold">Uploading: {progress}%</span>
                          <Progress value={progress} max={100} />
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
