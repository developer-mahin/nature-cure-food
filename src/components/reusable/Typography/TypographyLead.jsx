import { cn } from "@/lib/utils";

const TypographyLead = ({ children, className, ...props }) => {
  return (
    <p className={cn("text-xl text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
};

export default TypographyLead;
