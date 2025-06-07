import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ReactNode, useEffect } from "react";
import UpdateUserForm from "../forms/user/update-user-form";
import { IUpdateUserType, updateUserSchema } from "@/services/user/types";
import { updateUser } from "@/services/user/api";
import { useDialogStore } from "@/stores/dialog-store";
import { useAuthStore } from "@/stores/auth-store";

const UpdateUser = ({ children }: { children?: ReactNode }) => {
  const { user, fetchUser } = useAuthStore();
  const { activeDialog, closeDialog } = useDialogStore();
  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: ({ message }) => {
      fetchUser();
      handleCloseDialog();
      toast.success(message);
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });

  const form = useForm<IUpdateUserType>({
    resolver: zodResolver(updateUserSchema),
    shouldFocusError: true,
  });
  const handleCloseDialog = () => {
    form.reset();
    closeDialog();
  };

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        bio: user.bio ?? "",
        position: user.position ?? "",
        postalCode: user.postalCode ?? 0,
        taxId: user.taxId ?? "",
        address: {
          city: user.address?.city ?? "",
          state: user.address?.state ?? "",
          country: user.address?.country ?? "",
        },
        socialMedia: {
          facebook: user.socialMedia?.facebook ?? "",
          x: user.socialMedia?.x ?? "",
          instagram: user.socialMedia?.instagram ?? "",
          linkedIn: user.socialMedia?.linkedIn ?? "",
        },
        photoUrl: undefined, // jangan isi default dengan File kosong
      });
    }
  }, [user, form.reset]);
  return (
    <Dialog open={activeDialog === "updateUser"} onOpenChange={(open) => !open && handleCloseDialog()}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-5xl! w-full">
        <DialogHeader>
          <DialogTitle>Edit Personal Information</DialogTitle>
          <DialogDescription className="text-xs">
            Update your details to keep your profile up-to-date.
          </DialogDescription>
        </DialogHeader>
        <div className="*:w-full flex flex-col items-center justify-center p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-8">
              <UpdateUserForm />

              <div className="flex items-center gap-x-4 justify-end">
                <Button type="button" variant={"outline"} onClick={handleCloseDialog}>
                  Cancel
                </Button>
                <Button
                  className=" bg-[#ef4f4f]/90 hover:bg-[#ef4f4f] cursor-pointer"
                  type="submit"
                  disabled={form.formState.isSubmitting || !form.formState.isDirty}
                  aria-disabled={form.formState.isSubmitting}
                >
                  <span>{mutation.isPending ? "Saved..." : "Save Changes"}</span>
                  <ArrowRight />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUser;
