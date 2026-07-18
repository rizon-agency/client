import * as React from "react";
import { Input } from "@repo/ui/components/ui/input";
import { cn } from "@repo/ui/utils";

function CustomInput(props: React.ComponentProps<typeof Input>) {
  return <Input {...props} className={cn("bg-background", props.className)} />;
}

export { CustomInput };
