import { cn } from "@/lib/utils";

const Container = ({ children, className, ...props }) => {
  return (
    <section
      className={cn("lg:w-[1440px] w-full mx-auto py-10 lg:py-20", className)}
      {...props}
    >
      {children}
    </section>
  );
};

export default Container;
