import { cn } from "@/lib/utils";

const TypographyMuted = ({ children, className, ...props }) => {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
};

export default TypographyMuted;
