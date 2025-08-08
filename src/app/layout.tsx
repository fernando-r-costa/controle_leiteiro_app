import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Suspense } from "react";
import Header from "./components/header/page";
import Footer from "./components/footer/page";
import FormText from "./components/texts/page";

const APP_NAME = "Controle Leiteiro";
const APP_DEFAULT_TITLE = "Controle Leiteiro";
const APP_TITLE_TEMPLATE = "Controle Leiteiro";
const APP_DESCRIPTION = "Controle Leiteiro PWA";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "manifest.json",
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
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
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
    <html lang="pt-br">
      <body className="flex flex-col h-dvh font-primaryFont text-[14px] bg-secondary-color text-dark-color">
        <Header />
        <Suspense
          fallback={
            <div className="flex-grow overflow-y-auto mx-auto mt-8 animate-pulse">
              <FormText type="title">Carregando...</FormText>
            </div>
          }
        >
          <main className="flex-grow overflow-y-auto">{children}</main>
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
