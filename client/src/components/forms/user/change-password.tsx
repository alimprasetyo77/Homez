import InputPassword from "@/components/input-password";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { useFormContext } from "react-hook-form";

const FormChangePassword = () => {
  const { control } = useFormContext();
  return (
    <>
      <FormField
        control={control}
        name="current_password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Current Password</FormLabel>
            <FormControl>
              <InputPassword {...field} placeholder="********" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="new_password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>New Password</FormLabel>
            <FormControl>
              <InputPassword {...field} placeholder="********" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="confirm_new_password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm New Password</FormLabel>
            <FormControl>
              <InputPassword {...field} placeholder="********" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default FormChangePassword;
