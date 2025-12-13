import Image from "next/image";
import { assets } from "../../../public/assets";
import {
  MotionSocialContainer,
  MotionSocialIcon,
} from "./SocialIcons/MotionWrappers";

const SocialIcons = () => {
  const socialIcons = [
    {
      Icon: assets.icons.youtube,
      link: "https://www.facebook.com/YokeLifestyles/",
    },
    {
      Icon: assets.icons.facebook,
      link: "https://www.facebook.com/YokeLifestyles/",
    },
    {
      Icon: assets.icons.twitter,
      link: "https://www.facebook.com/YokeLifestyles/",
    },
    {
      Icon: assets.icons.linkedin,
      link: "https://www.facebook.com/YokeLifestyles/",
    },
  ];

  return (
    <MotionSocialContainer className="flex items-center gap-2.5 gap-x-6 py-2">
      {socialIcons.map(({ Icon, link }, index) => (
        <MotionSocialIcon
          key={index}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={Icon} alt="social-icon" width={22} height={22} />
        </MotionSocialIcon>
      ))}
    </MotionSocialContainer>
  );
};

export default SocialIcons;
