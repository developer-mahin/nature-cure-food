import Image from "next/image";
import Link from "next/link";

const SiteLogo = () => {
  return (
    <div className="min-w-10 max-w-16 xs:max-w-14 md:min-w-16 lg:max-w-32">
      <Link href={"/"}>
        <Image
          width={500}
          height={500}
          src="/assets/images/Netural Cure 1.svg"
          alt="Brand Logo"
          className="w-full h-full object-contain"
        />
      </Link>
    </div>
  );
};

export default SiteLogo;
