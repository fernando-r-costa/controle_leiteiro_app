import { Suspense } from "react";
import Header from "./components/header/page";
import Footer from "./components/footer/page";
import FormText from "./components/texts/page";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <Header />
      <Suspense
        fallback={
          <div className="flex-grow flex items-center justify-center animate-pulse">
            <FormText type="title">Carregando...</FormText>
          </div>
        }
      >
        <main className="flex-grow overflow-y-auto">{children}</main>
      </Suspense>
      <Footer />
    </div>
  );
}
