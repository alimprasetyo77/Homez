import { Trash } from "lucide-react";
import { TooltipDemo } from "./tooltip-demo";
import { Button } from "./ui/button";

interface IPreviewPhotoProps {
  url: string;
  alt: string;
  handleDelete: () => void;
}
const PreviewPhoto = ({ url, alt, handleDelete }: IPreviewPhotoProps) => {
  return (
    <div className="relative group">
      <img src={url} className="rounded-xl object-cover" alt={alt} />
      <TooltipDemo message="Click to remove image">
        <Button
          className="absolute top-2 right-2 rounded-full p-1 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
          variant={"destructive"}
          size={"icon"}
          onClick={handleDelete}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </TooltipDemo>
    </div>
  );
};

export default PreviewPhoto;
