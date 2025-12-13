import { cn } from "@/lib/utils";

const TypographyLarge = ({ children, className, ...props }) => {
  return (
    <div className={cn("text-xl text-muted-foreground", className)} {...props}>
      {children}
    </div>
  );
};

export default TypographyLarge;
