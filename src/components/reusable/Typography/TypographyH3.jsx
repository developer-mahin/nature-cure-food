import { cn } from "@/lib/utils";

const TypographyH3 = ({ children, className, ...props }) => {
  return (
    <h3
      className={cn("text-2xl font-semibold tracking-tight", className)}
      {...props}
    >
      {children}
    </h3>
  );
};

export default TypographyH3;
