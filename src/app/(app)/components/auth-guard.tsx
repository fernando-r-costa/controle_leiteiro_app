"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const PUBLIC_ROUTES = new Set(["/login", "/cadastro_produtor"]);
const FARM_REQUIRED_ROUTES = [
  "/atividades",
  "/cadastro_animais",
  "/novo_animal",
  "/atualiza_animal",
  "/controle_leiteiro",
  "/novo_controle_leiteiro",
  "/controle_individual",
  "/controle_final",
  "/relatorios",
  "/relatorio_final",
];

type AuthGuardProps = {
  children: ReactNode;
};

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isClientReady, setIsClientReady] = useState(false);
  const isPublicRoute = PUBLIC_ROUTES.has(pathname);
  const requiresFarm = FARM_REQUIRED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
  const hasAuthenticationContext =
    isPublicRoute ||
    (isClientReady &&
      Boolean(localStorage.getItem("authToken")) &&
      Boolean(localStorage.getItem("farmerId")));
  const hasFarmContext =
    !requiresFarm ||
    (isClientReady && Boolean(localStorage.getItem("farmId")));

  useEffect(() => {
    setIsClientReady(true);
  }, []);

  useEffect(() => {
    if (!isClientReady || isPublicRoute) return;

    if (!hasAuthenticationContext) {
      router.replace("/login");
      return;
    }

    if (!hasFarmContext) router.replace("/fazenda");
  }, [
    hasAuthenticationContext,
    hasFarmContext,
    isClientReady,
    isPublicRoute,
    router,
  ]);

  if (isPublicRoute) return children;
  if (!isClientReady || !hasAuthenticationContext || !hasFarmContext) {
    return null;
  }

  return children;
};

export default AuthGuard;
