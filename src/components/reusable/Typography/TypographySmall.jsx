import { cn } from "@/lib/utils";

const TypographySmall = ({ children, className, ...props }) => {
  return (
    <small
      className={cn("text-sm font-medium leading-none block", className)}
      {...props}
    >
      {children}
    </small>
  );
};

export default TypographySmall;
