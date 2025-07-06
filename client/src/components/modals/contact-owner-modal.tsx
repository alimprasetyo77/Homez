import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PropsWithChildren, useState } from "react";
import { Button } from "../ui/button";

const ContactOwner = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="min-w-2xl!">
        <DialogHeader>
          <DialogHeader className="space-y-3">
            <DialogTitle></DialogTitle>
            <DialogDescription className=""></DialogDescription>
          </DialogHeader>
        </DialogHeader>
        <div className="*:w-full flex flex-col items-center justify-center p-4">
          {/* <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
              <FormContactOwner />

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
          </Form> */}
        </div>
        <DialogFooter>
          <Button></Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContactOwner;
