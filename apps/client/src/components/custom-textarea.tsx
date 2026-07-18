import * as React from "react";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { cn } from "@repo/ui/utils";

function CustomTextarea(props: React.ComponentProps<typeof Textarea>) {
  return (
    <Textarea {...props} className={cn("bg-background", props.className)} />
  );
}

export { CustomTextarea };
