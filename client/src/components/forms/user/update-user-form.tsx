import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IUpdateUserType } from "@/types/user-type";
import { useAuthStore } from "@/stores/auth-store";
import { Trash, UploadCloud } from "lucide-react";
import { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";
import { useDeleteUploadFile, useUploadFile } from "@/hooks/use-upload-file";
import { toast } from "sonner";

const UpdateUserForm = () => {
  const { control, setValue, resetField } = useFormContext<IUpdateUserType>();
  const { user } = useAuthStore();
  const { uploadAsync, isLoading: isLoadingUploadFile } = useUploadFile({
    onSuccess: (res) => {
      setValue("photoProfile", res.data.url);
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  const { deleteUploadFileAsync, isLoading: isLoadingDeleteFile } = useDeleteUploadFile({
    onSuccess: () => {
      resetField("photoProfile", { defaultValue: "" });
    },
    onError: (err) => {
      resetField("photoProfile", { defaultValue: "" });
      toast.error(err?.message);
    },
  });

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    await uploadAsync({ file: file, field: "photoProfile" });
  };

  const handleDelete = async () => {
    await deleteUploadFileAsync({ field: "photoProfile" });
  };
  return (
    <div className="grid grid-cols-2 gap-8 overflow-y-scroll max-h-[500px] p-3">
      <FormField
        control={control}
        name="photoProfile"
        render={({ field }) => (
          <FormItem className="col-span-2 flex  items-center gap-x-4 ">
            <FormControl>
              <Input
                className="hidden"
                type="file"
                onChange={(e) => {
                  if (field.value) return;
                  handleChange(e);
                }}
              />
            </FormControl>

            <Avatar className="size-24 relative group">
              <AvatarImage src={field.value} alt="@shadcn" />
              <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              {field.value == "" || !field.value ? (
                <Button
                  type="button"
                  variant={"outline"}
                  className="p-0 "
                  disabled={isLoadingUploadFile || isLoadingDeleteFile}
                >
                  <FormLabel className="text-xs cursor-pointer h-9 px-4 py-2">
                    <UploadCloud /> <span>Upload Photo</span>
                  </FormLabel>
                </Button>
              ) : (
                <Button
                  type="button"
                  variant={"outline"}
                  className="p-0 text-xs cursor-pointer h-9 px-4 py-2"
                  disabled={isLoadingUploadFile || isLoadingDeleteFile}
                  onClick={handleDelete}
                >
                  <Trash className="text-red-500" /> <span>Delete Photo</span>
                </Button>
              )}
              <FormDescription className="text-xs">
                Photo must be JPEG or PNG format and at least 80x80
              </FormDescription>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter Name" className="h-[45px]" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">Email</FormLabel>
            <FormControl>
              <Input placeholder="Enter Email" className="h-[45px]" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">Phone</FormLabel>
            <FormControl>
              <Input placeholder="Enter Number Phone" className="h-[45px]" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="location.postalCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">Postal Code</FormLabel>
            <FormControl>
              <Input placeholder="Enter Postal Code" className="h-[45px]" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="col-span-2">
        <FormField
          control={control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us a little bit about yourself" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <h3 className="font-medium -mb-4 col-span-2">Address</h3>
      <div className="col-span-2 gap-4 grid grid-cols-2">
        <FormField
          control={control}
          name="location.city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">City</FormLabel>
              <FormControl>
                <Input placeholder="Enter City" className="h-[45px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="location.country"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Country</FormLabel>
              <FormControl>
                <Input placeholder="Enter Country" className="h-[45px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="location.state"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">State</FormLabel>
              <FormControl>
                <Input placeholder="Enter State" className="h-[45px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <h3 className="font-medium -mb-4 col-span-2">Social Media</h3>
      <div className="col-span-2 gap-4 grid grid-cols-2">
        <FormField
          control={control}
          name="socialMedia.facebook"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Facebook Url</FormLabel>
              <FormControl>
                <Input placeholder="Enter Facebook Url" className="h-[45px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="socialMedia.x"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">X Url</FormLabel>
              <FormControl>
                <Input placeholder="Enter X Url" className="h-[45px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="socialMedia.linkedIn"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">LinkedIn Url</FormLabel>
              <FormControl>
                <Input placeholder="Enter LinkedIn Url" className="h-[45px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="socialMedia.instagram"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Facebook Url</FormLabel>
              <FormControl>
                <Input placeholder="Enter Instagram Url" className="h-[45px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default UpdateUserForm;
