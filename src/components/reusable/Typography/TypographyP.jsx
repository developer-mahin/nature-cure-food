import { cn } from "@/lib/utils";

const TypographyP = ({ children, className, ...props }) => {
  return (
    <p className={cn("leading-7", className)} {...props}>
      {children}
    </p>
  );
};

export default TypographyP;
