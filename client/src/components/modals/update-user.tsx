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
import { ReactNode } from "react";
import UpdateUserForm from "../forms/user/update-user-form";
import { IUpdateUserType, updateUserSchema } from "@/services/user/types";
import { updateUser } from "@/services/user/api";

const UpdateUser = ({ children }: { children: ReactNode }) => {
  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: ({ message }) => {
      toast.success(message);
      form.reset();
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });

  const form = useForm<IUpdateUserType>({
    resolver: zodResolver(updateUserSchema),
    shouldFocusError: true,
  });

  return (
    <Dialog>
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

              <Button
                className="w-full px-[30px] py-[13px] h-auto bg-[#ef4f4f]/90 hover:bg-[#ef4f4f] cursor-pointer"
                type="submit"
                disabled={form.formState.isSubmitting || !form.formState.isDirty}
                aria-disabled={form.formState.isSubmitting}
              >
                <span>{mutation.isPending ? "Saved..." : "Save Changes"}</span>
                <ArrowRight />
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUser;
