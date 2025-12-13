import PayIcons from "@/components/common/PayIcons";
import Container from "@/components/reusable/Container";
import TypographySmall from "@/components/reusable/Typography/TypographySmall";

const FooterBottom = () => {
  return (
    <Container className={"py-4 lg:py-4"}>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-y-4">
        {/* <div className="flex flex-col md:flex-row gap-x-10 items-center gap-y-4"> */}
        {/* <Select>
            <SelectTrigger className="w-[180px] border-[#3c5873] focus:ring-0 text-primary-foreground">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent className="bg-[#283848] text-primary-foreground">
              <SelectGroup>
                <SelectLabel>Countries</SelectLabel>
                <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select> */}

        <div>
          <TypographySmall
            className={"text-xs text-primary-foreground font-light"}
          >
            Copyright © {new Date().getFullYear()}.| All Rights Reserved
          </TypographySmall>

          {/* <Link href={"https://www.blankspacer.com/"} target="_blank">
              <TypographySmall
                className={
                  "text-xs text-primary-foreground font-light inline hover:underline transition-all duration-300"
                }
              >
                Developed by blankspacer
              </TypographySmall>
            </Link> */}
        </div>

        <PayIcons />
        {/* </div> */}
      </div>
    </Container>
  );
};

export default FooterBottom;
