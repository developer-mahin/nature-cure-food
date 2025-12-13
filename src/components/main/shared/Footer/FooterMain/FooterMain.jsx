import FooterBottom from "../FooterBottom/FooterBottom";
import FooterMiddle from "../FooterMiddle/FooterMiddle";
import FooterTop from "../FooterTop/FooterTop";

const FooterMain = () => {
  return (
    <>
      <FooterTop />

      <FooterMiddle />

      <hr className="mt-7 border-gray-600 container w-[87%] mx-auto" />

      <FooterBottom />
    </>
  );
};

export default FooterMain;
