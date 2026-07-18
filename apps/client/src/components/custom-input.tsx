import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function CustomInput(props: React.ComponentProps<typeof Input>) {
  return <Input {...props} className={cn("bg-background", props.className)} />;
}

export { CustomInput };
