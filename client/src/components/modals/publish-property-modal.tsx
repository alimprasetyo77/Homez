import { DialogDescription, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PropsWithChildren, useState } from "react";

interface PublishPropertyProps extends PropsWithChildren {
  onSubmit: () => void;
}

const PublishProperty = ({ onSubmit, children }: PublishPropertyProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className=" font-medium pt-2 mb-2">
            Are you sure you want to submit this property?
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-800">
            Please ensure all details and photos are accurate. Once submitted, your property will be reviewed
            before being published.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex items-center justify-center gap-x-4">
          <Button
            type="button"
            variant={"outline"}
            className="text-xs h-auto cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant={"animate"}
            className="text-xs h-auto cursor-pointer"
            onClick={onSubmit}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PublishProperty;
