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
      <body className="font-primaryFont bg-secondary-color">
        <Banner />
        <main className="h-[80vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
