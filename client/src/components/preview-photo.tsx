import { Trash } from "lucide-react";
import { TooltipDemo } from "./tooltip-demo";

interface IPreviewPhotoProps {
  url: string;
  alt: string;
  handleDelete: () => void;
}
const PreviewPhoto = ({ url, alt, handleDelete }: IPreviewPhotoProps) => {
  return (
    <div className="relative group h-full max-h-full ">
      <img src={url} className="rounded-xl h-full max-h-full w-auto object-contain mx-auto" alt={alt} />
      <TooltipDemo message="Click to remove image">
        <button
          type="button"
          className="absolute bg-red-500 text-white top-2 right-2 rounded-full p-2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleDelete}
        >
          <Trash className="h-4 w-4" />
        </button>
      </TooltipDemo>
    </div>
  );
};

export default PreviewPhoto;
