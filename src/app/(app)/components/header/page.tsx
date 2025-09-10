import Link from "next/link";
import Image from "next/image";
import LogoFRC from "../../../../../public/frc_logo_removebg.png";

const Header = () => {
  return (
    <header className="flex justify-between px-10 py-3 items-center bg-primary-color sticky top-0 z-50">
      <div className="flex items-center gap-2 text-light-color font-light text-[1.8em] md:scale-110">
        <Image
          src="/icon_CL.png"
          alt="Logo Controle Leiteiro"
          width={50}
          height={50}
          className="rounded-lg"
        />
        <span className="flex items-center gap-2">
          <strong className="font-semibold">Controle</strong> Leiteiro
          <span className="bg-tertiary-color text-primary-color text-[0.6rem] font-bold px-2 rounded-full">
            BETA
          </span>
        </span>
      </div>
      <div className="flex items-center text-light-color text-[1.2em] sm:text-[1.5em] font-light">
        {/* <Link
          className="w-1/12 max-w-12 min-w-20 mx-[6vw]"
          href="https://www.linkedin.com/in/fernando-r-costa/"
        >
          <Image src={LogoFRC} alt="Logo FRC" />
        </Link> */}
      </div>
    </header>
  );
};

export default Header;
