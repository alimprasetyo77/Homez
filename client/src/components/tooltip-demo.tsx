import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { PropsWithChildren } from "react";

export function TooltipDemo(props: PropsWithChildren<{ message: string }>) {
  const { message, children } = props;
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{message}</p>
      </TooltipContent>
    </Tooltip>
  );
}
