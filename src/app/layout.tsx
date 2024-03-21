import type { Metadata } from "next";
import "./globals.css";
import Banner from "./components/banner/page";
import Footer from "./components/footer/page";

export const metadata: Metadata = {
  title: "App Pesagem de Leite",
  description: "App para pesagem da ordenha de leite",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="font-primaryFont text-[14px] bg-secondary-color text-dark-color">
        <Banner />
        <main className="h-[80vh] overflow-y-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
