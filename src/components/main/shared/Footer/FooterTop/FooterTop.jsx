import Container from "@/components/reusable/Container";
import TypographyH4 from "@/components/reusable/Typography/TypographyH4";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FooterTop = () => {
  return (
    <Container className="py-10 lg:py-10">
      <div className="flex flex-col sm:flex-row justify-between gap-y-4">
        <TypographyH4 className={"text-primary-foreground uppercase text-2xl"}>
          Nature Cure Food
        </TypographyH4>

        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="email"
            placeholder="Enter your email"
            className="text-sm placeholder:text-primary-foreground text-primary-foreground focus-visible:ring-0 focus:border-white border-white"
          />
          <Button
            type="submit"
            className="bg-white hover:bg-green-100 text-green-600 font-semibold"
          >
            Subscribe
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default FooterTop;
