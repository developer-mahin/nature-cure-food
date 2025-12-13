import { cn } from "@/lib/utils";

const TypographyH2 = ({ children, className, ...props }) => {
  return (
    <h2
      className={cn("text-3xl font-semibold tracking-tight", className)}
      {...props}
    >
      {children}
    </h2>
  );
};

export default TypographyH2;
