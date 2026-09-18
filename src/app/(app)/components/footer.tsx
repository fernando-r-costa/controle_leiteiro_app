import Image from "next/image";
import { LuMail, LuInstagram } from "react-icons/lu";

import { BiLogoWhatsapp } from "react-icons/bi";

/*
 * Publicidade futura:
 * manter anúncios desacoplados deste Footer.
 * Um futuro <AdSlot /> poderá ser renderizado acima do Footer pelo layout.
 *
 * Prioridade:
 * 1. anúncio direto/patrocinador ativo;
 * 2. fallback para rede automática/programática;
 * 3. sem anúncio disponível -> não renderizar nada.
 *
 * Anúncios diretos poderão futuramente ser controlados por configuração
 * externa (ex.: Cloudflare R2), sem necessidade de novo deploy.
 */
const Footer = () => {
  return (
    <footer className="bg-primary-color px-4 py-4 text-light-color font-light sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
        <div className="flex items-center gap-3">
          <Image
            src="/tepeyac-icon.png"
            alt="Logo da Tepeyac Tech"
            width={40}
            height={40}
          />
          <span className="text-lg sm:text-xl">Tepeyac Tech</span>
        </div>

        <div className="flex items-center justify-center gap-2">
          <a
            href="mailto:tepeyactechsoftwares@gmail.com"
            className="p-2 hover:text-tertiary-color transition-colors"
            aria-label="Link para E-mail"
          >
            <LuMail className="h-6 w-6" />
          </a>
          <a
            href="https://wa.me/553499633063"
            className="p-2 hover:text-tertiary-color transition-colors"
            aria-label="Link para WhatsApp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BiLogoWhatsapp className="h-6 w-6" />
          </a>
          <a
            href="https://www.instagram.com/fernandorcosta25"
            className="p-2 hover:text-tertiary-color transition-colors"
            aria-label="Link para Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LuInstagram className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
