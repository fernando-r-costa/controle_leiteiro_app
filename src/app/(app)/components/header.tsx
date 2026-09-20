"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { mutate } from "swr";

const Header = () => {
  const pathname = usePathname();
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);
  const isPublicRoute =
    pathname === "/login" || pathname === "/cadastro_produtor";

  const logout = () => {
    const confirmLogout = window.confirm(
      "Tem certeza que deseja sair da sua conta?"
    );

    if (confirmLogout) {
      setShowLogoutMessage(true);
      setTimeout(async () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("authToken");
          localStorage.removeItem("farmerId");
          localStorage.removeItem("farmId");
          localStorage.removeItem("farmName");
          localStorage.removeItem("controlDate");
          localStorage.removeItem("newControl");
          localStorage.removeItem("controlDateList");
          await mutate((key) => true, undefined, { revalidate: false });
        }
        window.location.href = "/login";
      }, 2000);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-primary-color/95 text-light-color backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-3 py-3 md:px-8">
          <Link
            href="/fazenda"
            aria-label="Ir para a seleção de fazenda"
            className="flex shrink-0 items-center gap-2 rounded-md font-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary-color focus-visible:ring-offset-2 focus-visible:ring-offset-primary-color"
          >
            <Image
              src="/icon_CL.png"
              alt="Logo Controle Leiteiro"
              width={40}
              height={40}
              className="rounded-lg"
              priority
            />
            <span className="flex items-center gap-2 whitespace-nowrap text-base sm:text-xl">
              <span>
                <strong className="font-semibold">Controle</strong> Leiteiro
              </span>
              <span className="rounded-full bg-tertiary-color px-2 text-[0.6rem] font-bold text-primary-color">
                v1.0.0
              </span>
            </span>
          </Link>

          {!isPublicRoute && (
            <button
              type="button"
              onClick={logout}
              disabled={showLogoutMessage}
              className="shrink-0 rounded-lg border-2 border-light-color/70 px-4 py-2 text-base font-semibold transition-colors hover:border-tertiary-color hover:text-tertiary-color focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary-color focus-visible:ring-offset-2 focus-visible:ring-offset-primary-color disabled:cursor-not-allowed disabled:opacity-60"
            >
              Sair
            </button>
          )}
        </div>
      </header>

      {showLogoutMessage && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-light-color text-dark-color">
          <p className="animate-pulse text-3xl font-semibold" aria-live="polite">
            Até logo!
          </p>
        </div>
      )}
    </>
  );
};

export default Header;
