"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const DISMISSAL_KEY = "cl_install_prompt_dismissed_v1";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const isStandaloneMode = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true;

const isIosSafari = () => {
  const userAgent = navigator.userAgent;
  const isIos =
    /iPad|iPhone|iPod/.test(userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  return isIos && /Safari/.test(userAgent) && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(userAgent);
};

const wasDismissed = () => {
  try {
    return localStorage.getItem(DISMISSAL_KEY) === "true";
  } catch {
    return false;
  }
};

const InstallPwaPrompt = () => {
  const pathname = usePathname();
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIosInstructions, setShowIosInstructions] = useState(false);
  const [isStandalone, setIsStandalone] = useState(true);
  const [isDismissed, setIsDismissed] = useState(true);
  const [isPrompting, setIsPrompting] = useState(false);

  useEffect(() => {
    const standalone = isStandaloneMode();
    const dismissed = wasDismissed();
    setIsStandalone(standalone);
    setIsDismissed(dismissed);
    setShowIosInstructions(!standalone && !dismissed && isIosSafari());

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      if (!isStandaloneMode() && !wasDismissed()) {
        setInstallEvent(event as BeforeInstallPromptEvent);
      }
    };

    const handleAppInstalled = () => {
      dismiss();
      setIsStandalone(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISSAL_KEY, "true");
    } catch {
      // O convite ainda é ocultado nesta sessão se o armazenamento estiver indisponível.
    }
    setIsDismissed(true);
    setInstallEvent(null);
    setShowIosInstructions(false);
  };

  const install = async () => {
    if (!installEvent || isPrompting) return;

    setIsPrompting(true);
    try {
      await installEvent.prompt();
      const choice = await installEvent.userChoice;
      if (choice.outcome === "dismissed") {
        dismiss();
      } else {
        setInstallEvent(null);
      }
    } catch {
      setInstallEvent(null);
    } finally {
      setIsPrompting(false);
    }
  };

  const isPublicRoute = pathname === "/login" || pathname === "/cadastro_produtor";
  if (isPublicRoute || isStandalone || isDismissed || (!installEvent && !showIosInstructions)) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-4 sm:px-8">
      <aside
        aria-label="Instalação do Controle Leiteiro"
        className="rounded-lg border border-primary-color/30 bg-light-color p-4 shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-6"
      >
        <div>
          <h2 className="text-lg font-semibold text-dark-color">
            Tenha o Controle Leiteiro na tela inicial
          </h2>
          <p className="mt-1 text-sm text-dark-color">
            {showIosInstructions
              ? "Adicione o Controle Leiteiro à tela inicial para acessar mais facilmente."
              : "Instale neste dispositivo para acessar mais facilmente."}
          </p>
          {showIosInstructions && (
            <p className="mt-2 text-sm text-dark-color">
              Toque em Compartilhar e depois em “Adicionar à Tela de Início”.
            </p>
          )}
        </div>
        <div className="mt-4 flex flex-wrap gap-3 sm:mt-0 sm:shrink-0">
          {!showIosInstructions && (
            <button
              type="button"
              onClick={install}
              disabled={isPrompting}
              className="min-h-11 rounded-lg bg-tertiary-color px-4 py-2 font-semibold text-dark-color focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-color focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Instalar Controle Leiteiro
            </button>
          )}
          <button
            type="button"
            onClick={dismiss}
            className="min-h-11 rounded-lg border border-primary-color px-4 py-2 font-medium text-dark-color focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-color focus-visible:ring-offset-2"
          >
            Agora não
          </button>
        </div>
      </aside>
    </div>
  );
};

export default InstallPwaPrompt;
