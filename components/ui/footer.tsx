// components/ui/footer.tsx
import * as React from "react";

import { cn } from "@/lib/utils";

function Footer({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="footer"
      className={cn("bg-background text-foreground pt-12 pb-4", className)}
      {...props}
    />
  );
}

function FooterContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="footer-content"
      className={cn(
        "grid grid-cols-1 gap-0 md:grid-cols-4 md:gap-8 lg:grid-cols-5",
        className,
      )}
      {...props}
    />
  );
}

function FooterColumn({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="footer-column"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    />
  );
}

function FooterBottom({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="footer-bottom"
      className={cn(
        "border-border dark:border-border/15 text-muted-foreground mt-8 flex flex-col items-start justify-between gap-4 border-t pt-6 text-xs sm:flex-row sm:items-center",
        className,
      )}
      {...props}
    />
  );
}

export { Footer, FooterBottom, FooterColumn, FooterContent };
