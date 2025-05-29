import { useForm } from "react-hook-form";
import image from "../../../public/images/real-estate.jpeg";
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
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useAuthStore();
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: ({ message, data }) => {
      setToken(data.token);
      toast.success(message);
      navigate("/");
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });

  const form = useForm<ILoginType>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="container grid grid-cols-12 bg-white  rounded-md shadow-sm overflow-hidden">
        <div className="col-span-5 *:w-full flex flex-col items-center justify-center py-20 px-28 space-y-10">
          <div className="flex flex-col gap-y-4 items-center justify-center">
            <h1 className="font-semibold text-3xl">Sign In</h1>
            <span className="text-sm">Find your next home. Manage your listings. All in one place.</span>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Email" className="h-[55px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Password" className="h-[55px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <span className="text-sm flex justify-end hover:underline underline-offset-2 cursor-pointer">
                Lost your password?
              </span>
              <Button className="w-full px-[30px] py-[13px] h-auto" variant={"animate"}>
                <span>{mutation.isPending ? "Logging in..." : "Sign In"}</span>
                <ArrowUpRight />
              </Button>
            </form>
          </Form>

          <p className="text-sm text-center">
            Not signed up?{" "}
            <span className="cursor-pointer hover:underline underline-offset-2">Create an account.</span>
          </p>
        </div>
        <div className="col-span-7 -">
          <img src={image} alt="real-estate-freepik" className=" object-center h-full" />
        </div>
      </div>
    </div>
  );
};

export default Login;
