import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ILoginType, loginSchema } from "@/services/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/auth/api";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth-store";
import { useDialogStore } from "@/stores/dialog-store";
import InputPassword from "../input-password";
import FormSignIn from "../forms/auth/sign-in";

const SignIn = () => {
  const { setToken } = useAuthStore();
  const { activeDialog, closeDialog, openDialog } = useDialogStore();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: ({ message, data }) => {
      setToken(data.token);
      toast.success(message);
      form.reset();
      closeDialog();
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });

  const form = useForm<ILoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <Dialog open={activeDialog === "signIn"} onOpenChange={(open) => !open && closeDialog()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-col gap-y-4 items-center justify-center py-4 font-semibold text-2xl">
            Sign In
          </DialogTitle>
          <DialogDescription className="font-medium text-center">
            Find your next home. Manage your listings. All in one place.
          </DialogDescription>
        </DialogHeader>
        <div className="*:w-full flex flex-col items-center justify-center p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
              <FormSignIn />
              <span className="text-sm flex justify-end hover:underline underline-offset-2 cursor-pointer">
                Lost your password?
              </span>
              <Button className="w-full px-[30px] py-[13px] h-auto" variant={"animate"}>
                <span>{mutation.isPending ? "Logging in..." : "Sign In"}</span>
                <ArrowUpRight />
              </Button>
            </form>
          </Form>
        </div>
        <DialogFooter className="flex items-center justify-center mx-auto">
          <p className="text-sm ">
            Not signed up?{" "}
            <span
              className="cursor-pointer font-medium hover:text-[#ef4f4f] duration-300"
              onClick={() => openDialog("signUp")}
            >
              Create an account.
            </span>
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignIn;
