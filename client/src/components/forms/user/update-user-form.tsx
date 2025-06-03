import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IUpdateUserType } from "@/services/user/types";
import { useFormContext } from "react-hook-form";

const UpdateUserForm = () => {
  const { control } = useFormContext<IUpdateUserType>();

  return (
    <div className="grid grid-cols-2 gap-8 overflow-y-scroll max-h-[500px]">
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
        name="position"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">Position</FormLabel>
            <FormControl>
              <Input placeholder="Enter Position" className="h-[45px]" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="postalCode"
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
      <FormField
        control={control}
        name="taxId"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">Tax ID</FormLabel>
            <FormControl>
              <Input placeholder="Enter Tax ID" className="h-[45px]" {...field} />
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
                <Textarea placeholder="Tell us a little bit about yourself" className="" {...field} />
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
          name="address.city"
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
          name="address.country"
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
          name="address.state"
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
