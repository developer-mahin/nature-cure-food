import { cn } from "@/lib/utils";

const TypographyH1 = ({ children, className, ...props }) => {
  return (
    <h1
      className={cn(
        "text-4xl lg:text-5xl font-extrabold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
};

export default TypographyH1;
