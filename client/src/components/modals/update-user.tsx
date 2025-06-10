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
import { useEffect, useState } from "react";
import UpdateUserForm from "../forms/user/update-user-form";
import { IUpdateUserType, updateUserSchema } from "@/services/user/types";
import { updateUser } from "@/services/user/api";
import { useAuthStore } from "@/stores/auth-store";

const UpdateUser = () => {
  const { user, resetUser } = useAuthStore();
  const [open, setOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: ({ message, data }) => {
      resetUser(data);
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
    defaultValues: {
      phone: "",
      position: "",
      taxId: "",
      bio: "",
    },
  });
  const handleCloseDialog = () => {
    form.reset();
    setOpen(false);
  };

  useEffect(() => {
    if (user) {
      form.reset({
        ...user,
        photoUrl: undefined,
      });
    }
  }, [user]);
  console.log("LOG FORM EDIT PERSONAL INFO : ", form.getValues());
  console.log(user);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="cursor-pointer">
          Edit
        </Button>
      </DialogTrigger>
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
