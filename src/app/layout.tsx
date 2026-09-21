import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Suspense } from "react";

const APP_NAME = "Controle Leiteiro";
const APP_DEFAULT_TITLE = "Controle Leiteiro | Gestão simples da produção leiteira";
const APP_TITLE_TEMPLATE = "Controle Leiteiro | Gestão simples da produção leiteira";
const APP_DESCRIPTION =
  "Registre a produção por animal, acompanhe a evolução dos controles e gere relatórios para apoiar a gestão da sua fazenda.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "manifest.json",
  metadataBase: new URL("https://www.controleleiteiro.com.br"),
  alternates: {
    canonical: "https://www.controleleiteiro.com.br/",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    startupImage: "/icon_CL.png",
  },
  icons: {
    icon: "/icon_CL.png",
    shortcut: "/icon_CL.png",
    apple: "/icon_CL.png",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    url: "https://www.controleleiteiro.com.br/",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: ["/logo_H_CL.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: ["/logo_H_CL.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#6d7275ff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="scroll-smooth">
      <body className="flex flex-col h-dvh font-primaryFont text-[14px] bg-secondary-color text-dark-color">
        <Suspense
          fallback={
            <div className="flex-1 flex items-center justify-center">
              <div className="text-xl font-bold">Carregando...</div>
            </div>
          }
        >
          {children}
        </Suspense>
      </body>
    </html>
  );
}
