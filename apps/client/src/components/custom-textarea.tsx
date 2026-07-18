import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

function CustomTextarea(props: React.ComponentProps<typeof Textarea>) {
  return (
    <Textarea {...props} className={cn("bg-background", props.className)} />
  );
}

export { CustomTextarea };
