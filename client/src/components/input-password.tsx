import { Input } from "./ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputPasswordProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputPassword = (props: InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        placeholder="Enter Password"
        className="h-[55px] pr-10"
        {...props}
        type={showPassword ? "text" : "password"}
      />
      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
};

export default InputPassword;
