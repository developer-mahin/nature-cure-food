import { cn } from "@/lib/utils";

const TypographyH4 = ({ children, className, ...props }) => {
  return (
    <h4
      className={cn("text-xl font-semibold tracking-tight", className)}
      {...props}
    >
      {children}
    </h4>
  );
};

export default TypographyH4;
