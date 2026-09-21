import Image from "next/image";
import Link from "next/link";
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
      <div className="mx-auto flex max-w-6xl flex-row items-center justify-between gap-3">
        <div className="flex flex-col items-start gap-1">
          <Image
            src="/logo_horiz_tepeyac.png"
            alt="Logo da Tepeyac Tech"
            width={384}
            height={95}
            className="h-10 w-auto"
          />
          <Link
            href="/politica-de-privacidade"
            className="whitespace-nowrap rounded-sm text-xs text-secondary-color underline underline-offset-2 transition-colors hover:text-tertiary-color focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary-color"
          >
            Política de Privacidade
          </Link>
          <Link
            href="/termos-de-uso"
            className="whitespace-nowrap rounded-sm text-xs text-secondary-color underline underline-offset-2 transition-colors hover:text-tertiary-color focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary-color"
          >
            Termos de Uso
          </Link>
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
            href="https://www.instagram.com/fernandocosta.tepeyac"
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
