import Link from "next/link";
import Image from "next/image";
import LogoFRC from "../../../../public/frc.gif";

const Header = () => {
  return (
    <header className="flex justify-between items-center bg-primary-color h-[10vh]">
      <h1 className="text-light-color font-light text-[1.7em] sm:text-[2.2em] p-[8vw]">
        <strong className="font-semibold">Controle</strong> Leiteiro
      </h1>
      <div className="flex items-center text-light-color text-[1.2em] sm:text-[1.5em] font-light">
        <Link
          className="w-1/12 max-w-12 min-w-12 mx-[6vw]"
          href="https://www.linkedin.com/in/fernando-r-costa/"
        >
          <Image src={LogoFRC} alt="Logo FRC" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
