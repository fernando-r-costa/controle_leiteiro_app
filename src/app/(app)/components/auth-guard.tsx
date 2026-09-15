"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const PUBLIC_ROUTES = new Set(["/login", "/cadastro_produtor"]);

type AuthGuardProps = {
  children: ReactNode;
};

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isClientReady, setIsClientReady] = useState(false);
  const isPublicRoute = PUBLIC_ROUTES.has(pathname);
  const hasRequiredContext =
    isPublicRoute ||
    (isClientReady &&
      Boolean(localStorage.getItem("authToken")) &&
      Boolean(localStorage.getItem("farmerId")));

  useEffect(() => {
    setIsClientReady(true);
  }, []);

  useEffect(() => {
    if (!isClientReady || isPublicRoute || hasRequiredContext) return;

    router.replace("/login");
  }, [hasRequiredContext, isClientReady, isPublicRoute, router]);

  if (isPublicRoute) return children;
  if (!isClientReady || !hasRequiredContext) return null;

  return children;
};

export default AuthGuard;
