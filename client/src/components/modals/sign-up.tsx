import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { IRegisterType, registerSchema } from "@/services/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, ChevronLeft } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/services/auth/api";
import { toast } from "sonner";
import { useDialogStore } from "@/stores/dialog-store";
import { useState } from "react";
import FormSignUpStep1 from "../forms/auth/sign-up/step-1";
import FormSignUpStep2 from "../forms/auth/sign-up/step-2";
import { cn } from "@/lib/utils";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const { activeDialog, closeDialog, openDialog } = useDialogStore();

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: ({ message }) => {
      toast.success(message);
      closeDialog();
      form.reset();
    },
    onError: (error) => {
      toast.error(`${error}`);
      setStep(1);
    },
  });

  const form = useForm<IRegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: undefined,
    },
  });

  const handleNextStep = async () => {
    const isValid = await form.trigger(["name", "email", "password"], { shouldFocus: true }); // hanya validasi step 1
    if (isValid) setStep(2);
  };
  const handleCloseDialog = () => {
    form.reset();
    closeDialog();
  };

  return (
    <Dialog open={activeDialog === "signUp"} onOpenChange={(open) => !open && handleCloseDialog()}>
      <DialogContent>
        <DialogHeader>
          {step === 2 ? (
            <DialogTitle>
              <Button variant={"link"} className="cursor-pointer mr-auto " onClick={() => setStep(1)}>
                <ChevronLeft />
                Back
              </Button>
            </DialogTitle>
          ) : (
            <>
              <DialogTitle className="flex flex-col gap-y-4 items-center justify-center py-4 font-semibold text-2xl">
                Sign Up
              </DialogTitle>
              <DialogDescription className="font-medium text-center">
                Find your next home. Manage your listings. All in one place.
              </DialogDescription>
            </>
          )}
        </DialogHeader>
        <div className="*:w-full flex flex-col items-center justify-center p-4">
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault(); // cegah submit otomatis
                if (step === 2) {
                  form.handleSubmit((data) => mutation.mutate(data))(e);
                }
              }}
              className="space-y-4"
            >
              {step === 1 ? <FormSignUpStep1 /> : <FormSignUpStep2 />}

              {step === 1 ? (
                <button
                  className={cn(
                    buttonVariants({ variant: "animate", className: "w-full px-[30px] py-[13px] h-auto" })
                  )}
                  type="button"
                  onClick={handleNextStep}
                >
                  <span>Next</span>
                  <ArrowRight />
                </button>
              ) : (
                <Button className="w-full px-[30px] py-[13px] h-auto" variant="animate" type="submit">
                  <span>{mutation.isPending ? "Signing Up..." : "Sign Up"}</span>
                  <ArrowUpRight />
                </Button>
              )}
            </form>
          </Form>
        </div>
        <DialogFooter className="flex items-center justify-center mx-auto">
          {step !== 2 ? (
            <p className="text-sm ">
              Already Have an Account?{" "}
              <span
                className="cursor-pointer font-medium hover:text-[#ef4f4f] duration-300"
                onClick={() => {
                  form.reset();
                  openDialog("signIn");
                }}
              >
                Sign In
              </span>
            </p>
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignUp;
