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
import { useEffect, useState } from "react";
import UpdateUserForm from "../forms/user/update-user-form";
import { IUpdateUserType, updateUserSchema } from "@/types/user-type";
import { useAuthStore } from "@/stores/auth-store";
import { useUpdateUser } from "@/hooks/use-users";

const UpdateUser = () => {
  const { user } = useAuthStore();
  const [open, setOpen] = useState(false);
  const { updateUserAsync, pendingUpdateUser } = useUpdateUser({
    onSuccess() {
      handleCloseDialog();
    },
  });

  const form = useForm<IUpdateUserType>({
    resolver: zodResolver(updateUserSchema),
    shouldFocusError: true,
    defaultValues: {
      name: "",
      phone: "",
      bio: "",
      email: "",
      location: {
        address: "",
        city: "",
        country: "",
        postalCode: "",
        state: "",
      },
      password: "",
      photoProfile: "",
      socialMedia: {
        facebook: "",
        instagram: "",
        linkedIn: "",
        x: "",
      },
    },
  });
  const handleCloseDialog = () => {
    form.reset();
    setOpen(false);
  };
  console.log(form.watch());
  useEffect(() => {
    if (user) {
      form.reset(user);
    }
  }, [user]);

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
            <form onSubmit={form.handleSubmit((data) => updateUserAsync(data))} className="space-y-8">
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
                  <span>{pendingUpdateUser ? "Saved..." : "Save Changes"}</span>
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
