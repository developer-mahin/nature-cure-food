import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Simple Slot replacement for Radix UI Slot
const Slot = React.forwardRef(({ children, ...props }, ref) => {
  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      ...children.props,
      className: cn(props.className, children.props.className),
      ref,
    });
  }
  return <>{children}</>;
});
Slot.displayName = "Slot";

const buttonVariants = cva(
  "flex items-center justify-center gap-2 whitespace-nowrap rounded text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-[#097B35] text-white shadow hover:bg-[#00662A] focus-visible:ring-[#007E33]/50",
        secondary:
          "bg-[#00AF44] text-white hover:bg-[#00963B] shadow-md focus-visible:ring-[#A5D6A7]/50 transition-colors duration-200",
        outline:
          "border border-[#00AF44] text-[#000] bg-transparent hover:bg-[#00AF44] focus-visible:ring-[#00AF44]/50 hover:text-white",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3 text-sm",
        lg: "h-12 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);


function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
