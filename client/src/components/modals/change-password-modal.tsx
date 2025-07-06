import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import FormChangePassword from "../forms/user/change-password-form";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PiWarning } from "react-icons/pi";
import { changePassword } from "@/services/user-service";
import { changePasswordSchema, IChangePassword } from "@/types/user-type";

const ChangePassword = () => {
  const [open, setOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: changePassword,
    onSuccess: ({ message }) => {
      toast.success(message);
      form.reset();
      setOpen(false);
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });

  const form = useForm<IChangePassword>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_new_password: "",
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        !value && form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button variant={"outline"}>Change Password</Button>
      </DialogTrigger>
      <DialogContent className="min-w-2xl!">
        <DialogHeader>
          <DialogHeader className="space-y-3">
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription className="bg-amber-50 p-3 shadow shadow-amber-100 rounded-sm text-xs flex items-center gap-x-2.5">
              <PiWarning className="text-amber-500 min-w-6 h-auto" />
              <span className="text-gray-800">
                For your security, regularly updating your password is strongly recommended. Avoid reusing old
                passwords. Weak or reused passwords may put your account at risk.
              </span>
            </DialogDescription>
          </DialogHeader>
        </DialogHeader>
        <div className="*:w-full flex flex-col items-center justify-center p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
              <FormChangePassword />

              <Button
                className="w-full px-[30px] py-[13px] h-auto"
                variant={"animate"}
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              >
                <span>{mutation.isPending ? "Submitting..." : "Submit"}</span>
                <ArrowUpRight />
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePassword;
