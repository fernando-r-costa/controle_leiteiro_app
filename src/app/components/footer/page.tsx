import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex justify-end items-center h-[10vh] bg-primary-color text-light-color text-2xl font-light">
      Coded by
      <Link
        className="mx-4"
        href="https://www.linkedin.com/in/fernando-r-costa/"
      >
        <Image src="/frc.gif" alt="Logo FRC" width={50} height={50} />
      </Link>
    </footer>
  );
};

export default Footer;
