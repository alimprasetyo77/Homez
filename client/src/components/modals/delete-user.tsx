import { DialogDescription, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "@/services/user/api";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth-store";
const DeleteUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { clearState } = useAuthStore();
  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess({ message }) {
      toast.success(message);
      clearState();
    },
    onError(error) {
      toast.error(`${error}`);
    },
  });
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="h-auto text-xs cursor-pointer" variant={"destructive"}>
          Delete Account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-sm font-medium pt-4">
            Delete this account Once you delete a account, there is no going back. Please be certain.
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex items-center justify-center mx-auto">
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
            variant={"destructive"}
            className="text-xs h-auto cursor-pointer"
            onClick={() => mutation.mutate()}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUser;
