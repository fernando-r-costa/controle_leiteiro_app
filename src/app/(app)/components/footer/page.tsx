import Image from "next/image";
import {
  LuMail,
  LuInstagram,
  LuLinkedin,
  LuYoutube,
} from "react-icons/lu";

import { BiLogoWhatsapp } from "react-icons/bi";

const Footer = () => {
  return (
    <footer className="flex justify-end items-center h-[10vh] bg-primary-color text-light-color text-[1.2em] sm:text-[1.5em] font-light">
      <div className="flex mx-10 items-center gap-4">
        <Image
          src="/frc_logo_removebg.png"
          alt="Logo FRC"
          width={60}
          height={60}
        />
        <div className="flex gap-4">
          <a
            href="mailto:fernando.r.costa@outlook.com"
            className=" hover:text-tertiary-color transition-colors"
            aria-label="Link para E-mail"
          >
            <LuMail className="h-6 w-6" />
          </a>
          <a
            href="https://www.youtube.com/@controle.leiteiro"
            className="hover:text-tertiary-color transition-colors"
            aria-label="Link para YouTube"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LuYoutube className="h-6 w-6" />
          </a>

          <a
            href="https://wa.me/553499633063"
            className="hover:text-tertiary-color transition-colors"
            aria-label="Link para WhatsApp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BiLogoWhatsapp className="h-6 w-6" />
          </a>
          <a
            href="https://www.instagram.com/fernandorcosta25"
            className="hover:text-tertiary-color transition-colors"
            aria-label="Link para Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LuInstagram className="h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/fernando-r-costa"
            className="hover:text-tertiary-color transition-colors"
            aria-label="Link para Linkedin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LuLinkedin className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
