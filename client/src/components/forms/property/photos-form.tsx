import PreviewPhoto from "@/components/preview-photo";
import { Button } from "@/components/ui/button";
import { ICreateProperty } from "@/types/property-type";
import { Camera } from "lucide-react";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
interface IPreviewPhoto {
  main_photo: string;
  photo_1: string;
  photo_2: string;
  photo_3: string;
  photo_4: string;
}
const PhotosForm = () => {
  const { setValue, getValues } = useFormContext<ICreateProperty>();
  const [previewPhoto, setPreviewPhoto] = useState<IPreviewPhoto>({
    main_photo: getValues("photos.main_photo")
      ? URL.createObjectURL(getValues("photos.main_photo") as Blob)
      : "",
    photo_1: getValues("photos.photo_1") ? URL.createObjectURL(getValues("photos.photo_1") as Blob) : "",
    photo_2: getValues("photos.photo_2") ? URL.createObjectURL(getValues("photos.photo_2") as Blob) : "",
    photo_3: getValues("photos.photo_3") ? URL.createObjectURL(getValues("photos.photo_3") as Blob) : "",
    photo_4: getValues("photos.photo_4") ? URL.createObjectURL(getValues("photos.photo_4") as Blob) : "",
  });
  const fileInputRefs = useRef<Record<keyof IPreviewPhoto, HTMLInputElement | null>>({
    main_photo: null,
    photo_1: null,
    photo_2: null,
    photo_3: null,
    photo_4: null,
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>, photoKey: keyof IPreviewPhoto) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue(`photos.${photoKey}`, file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPhoto((prev) => ({ ...prev, [photoKey]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
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
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-96 text-center hover:border-gray-400 transition-colors flex flex-col items-center justify-center">
            {previewPhoto.main_photo ? (
              <PreviewPhoto
                url={previewPhoto.main_photo}
                alt="previewImage"
                handleDelete={() => {
                  setPreviewPhoto((prev) => ({ ...prev, main_photo: "" }));
                  setValue("photos.main_photo", "");
                }}
              />
            ) : (
              <>
                <Camera className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Property Photos</h3>
                <p className="text-gray-600 mb-4">
                  Drag & drop photos or click to select files
                  <br />
                  <span className="text-sm">Format: JPG, PNG (Max 5MB per file)</span>
                </p>
                <input
                  ref={(el) => {
                    fileInputRefs.current.main_photo = el;
                  }}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handlePhotoChange(e, "main_photo")}
                />
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
              <div
                key={item}
                className="aspect-video bg-gray-100 rounded-lg border-2 p-4 border-dashed border-gray-300 flex items-center justify-center cursor-pointer"
                onClick={() => handleUploadClick(item as keyof IPreviewPhoto)}
              >
                {previewPhoto[item as keyof IPreviewPhoto] ? (
                  <PreviewPhoto
                    url={previewPhoto[item as keyof IPreviewPhoto]}
                    alt={`preview-${item}`}
                    handleDelete={() => {
                      setPreviewPhoto((prev) => ({ ...prev, [item]: "" }));
                      setValue(`photos.${item as keyof IPreviewPhoto}`, "");
                    }}
                  />
                ) : (
                  <>
                    <input
                      ref={(el) => {
                        fileInputRefs.current[item as keyof IPreviewPhoto] = el;
                      }}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handlePhotoChange(e, item as keyof IPreviewPhoto)}
                    />
                    <div className="text-center">
                      <Camera className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Photo {index + 1}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotosForm;
