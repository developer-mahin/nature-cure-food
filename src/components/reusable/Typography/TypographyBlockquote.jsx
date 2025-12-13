import { cn } from "@/lib/utils";

const TypographyBlockquote = ({ children, className, ...props }) => {
  return (
    <blockquote className={cn("border-l-2 pl-6 italic", className)} {...props}>
      {children}
    </blockquote>
  );
};

export default TypographyBlockquote;
