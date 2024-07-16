import type { Metadata } from "next";
import "./globals.css";
import Banner from "./components/banner/page";
import Footer from "./components/footer/page";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "App Controle Leiteiro",
  description: "App para controle leiteiro da ordenha de leite",
  icons: {
    icon: "/frc.gif",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="flex flex-col h-dvh font-primaryFont text-[14px] bg-secondary-color text-dark-color">
        <Banner />
        <Suspense>
          <main className="flex-grow overflow-y-auto">{children}</main>
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
