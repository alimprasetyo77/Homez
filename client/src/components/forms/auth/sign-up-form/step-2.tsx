import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormContext } from "react-hook-form";

const FormSignUpStep2 = () => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="role"
      render={({ field }) => (
        <FormItem className="-mt-2 pb-4">
          <FormLabel className="text-sm">Select account type : </FormLabel>
          <FormControl>
            <RadioGroup defaultValue={field.value} onValueChange={field.onChange} className="gap-4 pt-2">
              <FormItem className="flex items-center gap-3 border p-2 rounded-xl">
                <FormControl>
                  <RadioGroupItem value="REGULAR" />
                </FormControl>
                <FormLabel className="grid w-full py-2 px-1.5 ">
                  <span className="font-normal">Regular</span>
                  <FormDescription className="text-xs">
                    I'm looking for a property to buy or rent.
                  </FormDescription>
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center gap-3 border p-2 rounded-xl">
                <FormControl>
                  <RadioGroupItem value="OWNER" />
                </FormControl>
                <FormLabel className="grid w-full py-2 px-1.5 ">
                  <span className="font-normal">Owner Properties</span>
                  <FormDescription className="text-xs">I want to list and manage properties.</FormDescription>
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSignUpStep2;
