"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LuChartNoAxesCombined,
  LuFileSpreadsheet,
  LuSparkles,
  LuMail,
  LuInstagram,
} from "react-icons/lu";
import { BiLogoWhatsapp } from "react-icons/bi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Tipos
interface Screenshot {
  src: string;
  alt: string;
  priority?: boolean;
}

// Assets
const SCREENSHOTS: Screenshot[] = [
  {
    src: "/fotos/tela_controle.jpg",
    alt: "Tela de Controle Leiteiro",
    priority: true,
  },
  { src: "/fotos/tela_animal.jpg", alt: "Tela de Animais" },
  { src: "/fotos/tela_relatorio.jpg", alt: "Tela de Relatórios" },
  { src: "/fotos/tela_atividades.jpg", alt: "Tela de Atividades" },
  { src: "/fotos/tela_fazenda.jpg", alt: "Dashboard da Fazenda" },
];

// Componente Principal da Página
export default function LandingPage() {
  return (
    <div className="bg-light-color text-dark-color font-primaryFont">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <ScreenshotsSection />
        <BenefitSection />
        <FrequentlyAskedQuestionsSection />
        <AboutSection />
        <FinalCTASection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

// Seções como componentes individuais

const navigationLinks = [
  { href: "#produto", label: "Produto" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#trial-e-precos", label: "Uso gratuito e relatórios" },
  { href: "#perguntas-frequentes", label: "Perguntas Frequentes" },
] as const;

const navigationFocusClasses =
  "rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary-color focus-visible:ring-offset-2 focus-visible:ring-offset-primary-color";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-primary-color/95 backdrop-blur-md sticky top-0 z-50 border-none">
      <div className="container mx-auto px-3 py-3 md:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="#inicio"
            onClick={closeMenu}
            className={`flex items-center gap-2 text-light-color font-light text-[1.35rem] sm:text-[1.7em] ${navigationFocusClasses}`}
            aria-label="Ir para o início da página"
          >
            <Image
              src="/icon_CL.png"
              alt="Logo Controle Leiteiro"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span>
              <strong className="font-semibold">Controle</strong> Leiteiro
            </span>
          </Link>

          <nav
            className="hidden lg:flex items-center gap-6 text-light-color font-medium text-base xl:text-lg"
            aria-label="Navegação principal"
          >
            {navigationLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`px-1 py-2 hover:text-tertiary-color transition-colors ${navigationFocusClasses}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className={`text-light-color font-semibold px-5 py-2.5 rounded-lg border-2 border-light-color/70 hover:border-tertiary-color hover:text-tertiary-color transition-colors ${navigationFocusClasses}`}
            >
              Entrar
            </Link>
            <Link
              href="/cadastro_produtor"
              className={`bg-tertiary-color text-dark-color font-bold px-5 py-3 rounded-lg shadow-md hover:scale-105 transition-transform ${navigationFocusClasses}`}
            >
              Criar conta
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className={`lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-lg border-2 border-tertiary-color text-light-color hover:bg-tertiary-color/20 transition-colors ${navigationFocusClasses}`}
            aria-label={
              isMenuOpen
                ? "Fechar menu de navegação"
                : "Abrir menu de navegação"
            }
            aria-expanded={isMenuOpen}
            aria-controls="menu-mobile"
          >
            {isMenuOpen ? (
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeWidth={2}
                  d="M6 6l12 12M18 6 6 18"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeWidth={2}
                  d="M4 7h16M4 12h16M4 17h16"
                />
              </svg>
            )}
          </button>
        </div>

        {isMenuOpen && (
          <nav
            id="menu-mobile"
            className="lg:hidden mt-3 border-t border-light-color/30 pt-3 pb-1 flex flex-col gap-2 text-light-color"
            aria-label="Navegação mobile"
          >
            {navigationLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={`px-3 py-2.5 font-medium hover:bg-light-color/10 hover:text-tertiary-color transition-colors ${navigationFocusClasses}`}
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/login"
              onClick={closeMenu}
              className={`px-3 py-2.5 font-semibold border border-light-color/70 text-center hover:border-tertiary-color hover:text-tertiary-color transition-colors ${navigationFocusClasses}`}
            >
              Entrar
            </Link>
            <Link
              href="/cadastro_produtor"
              onClick={closeMenu}
              className={`px-3 py-3 bg-tertiary-color text-dark-color font-bold text-center shadow-md ${navigationFocusClasses}`}
            >
              Criar conta
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

const PhotoCarousel = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      let newItemsPerPage = 1;
      if (window.innerWidth >= 1024) {
        newItemsPerPage = 3;
      } else if (window.innerWidth >= 768) {
        newItemsPerPage = 2;
      }

      setItemsPerPage(newItemsPerPage);

      setCurrentIndex((prevIndex) => {
        const newLastPossibleIndex = Math.max(
          0,
          SCREENSHOTS.length - newItemsPerPage,
        );
        return Math.min(prevIndex, newLastPossibleIndex);
      });
    };

    handleResize();
    setIsMounted(true);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide
      ? Math.max(0, SCREENSHOTS.length - itemsPerPage)
      : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const lastPossibleIndex = Math.max(0, SCREENSHOTS.length - itemsPerPage);
    const isLastSlide = currentIndex >= lastPossibleIndex;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (!isMounted) {
    return (
      <div className="relative w-full max-w-6xl mx-auto">
        <div className="relative rounded-xl shadow-xl bg-tertiary-color/25 h-[450px] animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="overflow-hidden relative rounded-xl shadow-xl bg-tertiary-color/25 h-[450px]">
        <div
          className="grid grid-flow-col auto-cols-auto transition-transform ease-in-out duration-500 h-full"
          style={{
            gridAutoColumns: `${100 / itemsPerPage}%`,
            transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
          }}
        >
          {SCREENSHOTS.map((screen, index) => (
            <div
              className="flex items-center justify-center p-2 md:p-4"
              key={index}
            >
              <Image
                src={screen.src}
                alt={screen.alt}
                width={800}
                height={1692}
                priority={screen.priority}
                loading={screen.priority ? "eager" : "lazy"}
                className="shadow-2xl rounded-xl bg-black h-[400px] w-auto"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-0 sm:-left-4 transform -translate-y-1/2 z-10 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition-colors"
        aria-label="Previous image"
      >
        <FaChevronLeft size={24} />
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-0 sm:-right-4 transform -translate-y-1/2 z-10 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition-colors"
        aria-label="Next image"
      >
        <FaChevronRight size={24} />
      </button>
    </div>
  );
};

const HeroSection = () => (
  <section
    id="inicio"
    className="container mx-auto px-6 py-20 md:py-32 text-center scroll-mt-24"
  >
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-dark-color leading-tight max-w-5xl mx-auto">
      Controle leiteiro simples. Informação para decidir melhor.
    </h1>
    <p className="mt-6 text-lg md:text-2xl text-dark-color max-w-3xl mx-auto">
      Registre a produção por animal, acompanhe a evolução da produção ao longo
      dos controles e gere relatórios para apoiar a gestão da sua fazenda.
    </p>
    <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
      <Link
        href="/cadastro_produtor"
        className="flex w-full sm:w-auto items-center justify-center bg-tertiary-color text-dark-color font-bold px-8 py-4 text-lg md:text-xl rounded-xl shadow-2xl hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-color focus-visible:ring-offset-2 focus-visible:ring-offset-light-color"
      >
        Criar conta
      </Link>
      <Link
        href="/login"
        className="flex w-full sm:w-auto items-center justify-center border-2 border-primary-color bg-light-color text-dark-color font-bold px-8 py-4 text-lg md:text-xl rounded-xl shadow-lg hover:border-tertiary-color hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-color focus-visible:ring-offset-2 focus-visible:ring-offset-light-color"
      >
        Entrar
      </Link>
    </div>
    <p className="mt-4 text-base md:text-lg text-dark-color/80">
      Use a plataforma gratuitamente e experimente Planilha e Relatório
      Inteligente com IA nos primeiros 3 meses.
    </p>
  </section>
);

const FeaturesSection = () => (
  <section id="funcionalidades" className="bg-secondary-color py-16 md:py-20">
    <div id="produto" className="container mx-auto px-6 scroll-mt-24">
      <h2 className="text-center text-3xl font-bold text-dark-color md:text-4xl">
        Relatórios e funcionalidades
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
        <article className="flex flex-col rounded-xl border border-primary-color/15 bg-light-color p-5 shadow-sm md:p-6">
          <LuChartNoAxesCombined
            className="mb-4 h-9 w-9 text-tertiary-color"
            aria-hidden="true"
          />
          <h3 className="text-xl font-bold text-dark-color">
            Relatório visual
          </h3>
          <p className="mt-3 text-base font-semibold leading-relaxed text-dark-color">
            Veja os resultados diretamente no sistema.
          </p>
          <p className="mt-3 text-base leading-relaxed text-dark-color/80">
            Consulte rapidamente os totais e os dados da produção registrados em
            cada controle.
          </p>
          <p className="mt-4 text-base font-semibold leading-relaxed text-tertiary-color">
            Consulta imediata, sem gerar arquivo
          </p>
        </article>

        <article className="flex flex-col rounded-xl border border-primary-color/15 bg-light-color p-5 shadow-sm md:p-6">
          <LuFileSpreadsheet
            className="mb-4 h-9 w-9 text-tertiary-color"
            aria-hidden="true"
          />
          <h3 className="text-xl font-bold text-dark-color">Planilha</h3>
          <p className="mt-3 text-base font-semibold leading-relaxed text-dark-color">
            Leve os dados do controle com você.
          </p>
          <p className="mt-3 text-base leading-relaxed text-dark-color/80">
            Exporte uma planilha para consultar, arquivar ou trabalhar fora da
            plataforma.
          </p>
          <p className="mt-4 text-base font-semibold leading-relaxed text-tertiary-color">
            Dados estruturados para uso externo
          </p>
        </article>

        <article className="flex flex-col rounded-xl border border-primary-color/15 bg-light-color p-5 shadow-sm md:p-6">
          <LuSparkles
            className="mb-4 h-9 w-9 text-tertiary-color"
            aria-hidden="true"
          />
          <h3 className="text-xl font-bold text-dark-color">
            Relatório Inteligente com IA
          </h3>
          <p className="mt-3 text-base font-semibold leading-relaxed text-dark-color">
            Transforme os dados em uma análise mais fácil de interpretar.
          </p>
          <p className="mt-3 text-base leading-relaxed text-dark-color/80">
            Receba uma analise da produção, destacando animais e comparando os
            resultados anteriores.
          </p>
          <p className="mt-4 text-base font-semibold leading-relaxed text-tertiary-color">
            Interpretação e comparação com controles anteriores
          </p>
        </article>
      </div>

      <p className="mx-auto mt-6 max-w-4xl text-center text-sm italic leading-relaxed text-dark-color/80">
        O Relatório Inteligente é uma ferramenta de apoio à análise e não
        substitui a avaliação de um profissional quando necessária.
      </p>
    </div>
  </section>
);

const HowItWorksSection = () => (
  <section id="como-funciona" className="py-20 md:py-28 scroll-mt-24">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-dark-color text-center">
        Como funciona
      </h2>
      <ol className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
        <li className="h-full rounded-xl border-l-4 border-tertiary-color bg-secondary-color p-6 shadow-md">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-full bg-tertiary-color text-xl font-bold text-dark-color"
            aria-hidden="true"
          >
            1
          </span>
          <h3 className="mt-5 text-xl font-bold text-dark-color">
            <span className="sr-only">Passo 1: </span>
            Cadastre sua fazenda e seus animais
          </h3>
          <p className="mt-3 text-base leading-relaxed text-dark-color md:text-lg">
            Adicione as informações da propriedade e dos animais que
            participarão do controle leiteiro.
          </p>
        </li>
        <li className="h-full rounded-xl border-l-4 border-tertiary-color bg-secondary-color p-6 shadow-md">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-full bg-tertiary-color text-xl font-bold text-dark-color"
            aria-hidden="true"
          >
            2
          </span>
          <h3 className="mt-5 text-xl font-bold text-dark-color">
            <span className="sr-only">Passo 2: </span>
            Registre o controle leiteiro
          </h3>
          <p className="mt-3 text-base leading-relaxed text-dark-color md:text-lg">
            Informe a produção de leite de cada animal na data do controle.
          </p>
        </li>
        <li className="h-full rounded-xl border-l-4 border-tertiary-color bg-secondary-color p-6 shadow-md">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-full bg-tertiary-color text-xl font-bold text-dark-color"
            aria-hidden="true"
          >
            3
          </span>
          <h3 className="mt-5 text-xl font-bold text-dark-color">
            <span className="sr-only">Passo 3: </span>
            Consulte os resultados e gere seus relatórios
          </h3>
          <p className="mt-3 text-base leading-relaxed text-dark-color md:text-lg">
            Visualize os dados do controle e, quando precisar, gere a Planilha
            ou o Relatório Inteligente com IA.
          </p>
        </li>
      </ol>
    </div>
  </section>
);

const ScreenshotsSection = () => (
  <section
    className="container mx-auto px-6 pb-20 md:pb-28"
    aria-label="Demonstração visual do aplicativo"
  >
    <PhotoCarousel />
  </section>
);

const BenefitSection = () => (
  <section id="beneficios" className="bg-tertiary-color py-20 md:py-28">
    <div id="trial-e-precos" className="container mx-auto px-6 scroll-mt-24">
      <h2 className="mx-auto max-w-4xl text-center text-3xl font-bold text-dark-color md:text-4xl">
        Use a plataforma gratuitamente. Experimente os relatórios por 3 meses.
      </h2>

      <div className="mx-auto mt-10 max-w-4xl text-center">
        <h3 className="text-2xl font-bold text-dark-color">
          O Controle Leiteiro é gratuito para usar
        </h3>
        <p className="mx-auto mt-3 max-w-3xl text-base leading-relaxed text-dark-color md:text-lg">
          Cadastre sua fazenda e seus animais, registre os controles leiteiros e
          consulte os resultados diretamente na plataforma sem mensalidade.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-4xl border-t border-dark-color/20 pt-10 text-center">
        <h3 className="text-2xl font-bold text-dark-color">
          Nos primeiros 3 meses
        </h3>
        <p className="mx-auto mt-3 max-w-3xl text-base leading-relaxed text-dark-color md:text-lg">
          Além do uso gratuito da plataforma, novos produtores recebem, em cada
          período mensal:
        </p>

        <div className="mx-auto mt-6 max-w-3xl overflow-hidden rounded-xl bg-light-color/70 shadow-sm sm:grid sm:grid-cols-2 sm:divide-x sm:divide-primary-color/20">
          <p className="px-5 py-4 text-lg font-semibold text-dark-color">
            1 Planilha gratuita
          </p>
          <p className="border-t border-primary-color/20 px-5 py-4 text-lg font-semibold text-dark-color sm:border-t-0">
            1 Relatório Inteligente com IA gratuito
          </p>
        </div>

        <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-dark-color/80 md:text-base">
          Cada período mensal possui sua própria cota gratuita. Cotas não
          utilizadas não são transferidas para o período seguinte.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-4xl border-t border-dark-color/20 pt-10 text-center">
        <h3 className="text-2xl font-bold text-dark-color">
          Precisa de mais relatórios?
        </h3>
        <p className="mx-auto mt-3 max-w-3xl text-base leading-relaxed text-dark-color md:text-lg">
          Relatórios adicionais podem ser adquiridos individualmente a qualquer
          momento, inclusive durante os 3 meses iniciais.
        </p>

        <div className="mx-auto mt-6 max-w-3xl overflow-hidden rounded-xl bg-light-color/70 text-left shadow-sm sm:grid sm:grid-cols-2 sm:divide-x sm:divide-primary-color/20">
          <article className="p-6">
            <h4 className="text-xl font-bold text-dark-color">Planilha</h4>
            <p className="mt-2 text-3xl font-bold text-dark-color">R$ 4,90</p>
            <p className="mt-3 text-base leading-relaxed text-dark-color/80">
              Exporte os dados do controle em uma planilha organizada.
            </p>
          </article>
          <article className="border-t border-primary-color/20 p-6 sm:border-t-0">
            <h4 className="text-xl font-bold text-dark-color">
              Relatório Inteligente com IA
            </h4>
            <p className="mt-2 text-3xl font-bold text-dark-color">R$ 24,90</p>
            <p className="mt-3 text-base leading-relaxed text-dark-color/80">
              Receba um PDF com análise da produção e comparação com controles
              anteriores.
            </p>
          </article>
        </div>

        <div className="mt-6 space-y-1 text-sm leading-relaxed text-dark-color/80 md:text-base">
          <p>Pagamento via Pix.</p>
          <p>Os relatórios adquiridos permanecem disponíveis para download.</p>
        </div>
      </div>
    </div>
  </section>
);

const frequentlyAskedQuestions = [
  {
    question: "O Controle Leiteiro é gratuito?",
    answer:
      "Sim. Você pode cadastrar sua fazenda e seus animais, registrar os controles leiteiros e consultar os resultados diretamente na plataforma sem mensalidade. Alguns relatórios são oferecidos separadamente.",
  },
  {
    question: "Como funciona o benefício dos primeiros 3 meses?",
    answer:
      "Durante os primeiros 3 meses, novos produtores recebem, em cada período mensal, 1 Planilha gratuita e 1 Relatório Inteligente com IA gratuito.",
  },
  {
    question: "As cotas gratuitas acumulam?",
    answer:
      "Não. Cada período mensal possui sua própria cota. Se uma Planilha ou um Relatório Inteligente não for utilizado naquele período, a cota não é transferida para o período seguinte.",
  },
  {
    question: "Posso gerar mais relatórios durante os 3 meses iniciais?",
    answer:
      "Sim. Depois de utilizar a cota gratuita do período, você pode adquirir relatórios adicionais normalmente. A Planilha custa R$ 4,90 e o Relatório Inteligente com IA custa R$ 24,90.",
  },
  {
    question: "Como é feito o pagamento dos relatórios adicionais?",
    answer:
      "O pagamento é feito via Pix. Após a confirmação do pagamento, o relatório adquirido fica disponível para o controle selecionado.",
  },
  {
    question: "Posso baixar novamente um relatório que já gerei ou adquiri?",
    answer:
      "Sim. Depois que o acesso ao relatório é liberado, ele permanece associado ao respectivo controle e pode ser baixado novamente pela plataforma.",
  },
  {
    question:
      "O Relatório Inteligente com IA substitui a avaliação de um profissional?",
    answer:
      "Não. O Relatório Inteligente utiliza inteligência artificial para organizar e interpretar os dados registrados, destacar informações relevantes e comparar resultados entre controles. Ele é uma ferramenta de apoio à análise e não substitui a avaliação de um profissional quando necessária.",
  },
  {
    question:
      "Já utilizei uma versão anterior do Controle Leiteiro. O que preciso fazer?",
    answer:
      "O Controle Leiteiro passou por uma atualização completa desde sua versão experimental inicial. Os cadastros e dados daquela versão não foram migrados para a plataforma atual. Se você já utilizou o sistema anteriormente, será necessário criar uma nova conta e realizar novamente seus cadastros.",
  },
] as const;

const FrequentlyAskedQuestionsSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex((currentIndex) => (currentIndex === index ? null : index));
  };

  return (
    <section
      id="perguntas-frequentes"
      className="scroll-mt-24 bg-light-color py-20 md:py-28"
      aria-labelledby="perguntas-frequentes-title"
    >
      <div className="container mx-auto px-6">
        <h2
          id="perguntas-frequentes-title"
          className="text-center text-3xl font-bold text-dark-color md:text-4xl"
        >
          Perguntas frequentes
        </h2>

        <div className="mx-auto mt-10 max-w-4xl border-y border-dark-color/20">
          {frequentlyAskedQuestions.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `pergunta-frequente-resposta-${index + 1}`;
            const questionId = `pergunta-frequente-${index + 1}`;

            return (
              <div
                key={item.question}
                className="border-b border-dark-color/15 last:border-b-0"
              >
                <h3>
                  <button
                    id={questionId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => toggleQuestion(index)}
                    className="flex min-h-14 w-full items-center justify-between gap-5 rounded-sm py-5 text-left text-lg font-semibold text-dark-color transition-colors hover:text-primary-color focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary-color focus-visible:ring-offset-2 focus-visible:ring-offset-light-color md:text-xl"
                  >
                    <span>{item.question}</span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-2xl font-normal leading-none text-primary-color"
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  hidden={!isOpen}
                  className="pb-5 pr-10 text-base leading-relaxed text-dark-color/80 md:text-lg"
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => (
  <section id="sobre" className="bg-secondary-color py-16 md:py-20">
    <div className="container mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 md:flex-row md:gap-12">
      <Image
        src="/perfil_out23.png"
        alt="Foto de Fernando Costa"
        width={180}
        height={180}
        className="h-32 w-32 shrink-0 rounded-full object-cover md:h-40 md:w-40"
      />

      <div className="max-w-3xl text-center md:text-left">
        <h2 className="text-3xl font-bold text-dark-color md:text-4xl">
          Tecnologia com origem no campo.
        </h2>
        <div className="mt-5 space-y-3 text-base leading-relaxed text-dark-color md:text-lg">
          <p>
            O Controle Leiteiro nasceu da experiência prática com a gestão de
            fazendas leiteiras e da necessidade de tornar o acompanhamento da
            produção mais simples e organizado.
          </p>
          <p>
            O projeto combina conhecimento do agronegócio com desenvolvimento de
            software para criar uma ferramenta prática para a rotina do
            produtor.
          </p>
        </div>
        <p className="mt-7 text-sm font-normal leading-relaxed text-dark-color/70 md:text-base">
          Desenvolvido por Fernando Costa, Médico-Veterinário e Desenvolvedor de
          Software.
        </p>
      </div>
    </div>
  </section>
);

const FinalCTASection = () => (
  <section className="bg-light-color py-20 md:py-24">
    <div className="container mx-auto px-6 text-center">
      <h2 className="mx-auto max-w-3xl text-3xl font-bold text-dark-color md:text-4xl">
        Comece a organizar seu controle leiteiro hoje.
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-dark-color/80 md:text-lg">
        Crie sua conta gratuitamente e registre sua fazenda, seus animais e seus
        controles leiteiros em um só lugar.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href="/cadastro_produtor"
          className="inline-flex min-w-40 items-center justify-center rounded-lg bg-tertiary-color px-8 py-3 text-lg font-semibold text-dark-color shadow-md transition-colors hover:bg-tertiary-color/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-color focus-visible:ring-offset-2 focus-visible:ring-offset-light-color"
        >
          Criar conta
        </Link>
        <Link
          href="/login"
          className="inline-flex min-w-40 items-center justify-center rounded-lg border border-primary-color px-8 py-3 text-lg font-semibold text-primary-color transition-colors hover:bg-primary-color hover:text-light-color focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-color focus-visible:ring-offset-2 focus-visible:ring-offset-light-color"
        >
          Entrar
        </Link>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer id="contato" className="bg-primary-color text-secondary-color">
    <div className="container mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
        <div className="max-w-md">
          <div className="flex items-center justify-center gap-2 text-2xl font-light text-light-color md:justify-start">
            <Image
              src="/icon_CL.png"
              alt="Logo Controle Leiteiro"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span>
              <strong className="font-semibold">Controle</strong> Leiteiro
            </span>
          </div>
          <p className="mt-4 text-lg leading-relaxed text-secondary-color">
            Tecnologia para apoiar a gestão da produção leiteira.
          </p>
        </div>

        <div className="flex flex-col items-center gap-5">
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-lg leading-tight text-secondary-color/80">
            <span>Desenvolvido pela</span>
            <span className="inline-flex items-center gap-2">
              <Image
                src="/tepeyac-icon.png"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <span>Tepeyac Tech.</span>
            </span>
          </p>

          <nav aria-label="Contatos e redes sociais">
            <div className="flex items-center gap-5">
              <a
                href="mailto:tepeyactechsoftwares@gmail.com"
                className="rounded-sm text-secondary-color transition-colors hover:text-tertiary-color focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary-color focus-visible:ring-offset-2 focus-visible:ring-offset-primary-color"
                aria-label="Enviar e-mail"
              >
                <LuMail className="h-6 w-6" />
              </a>
              <a
                href="https://wa.me/553499633063"
                className="rounded-sm text-secondary-color transition-colors hover:text-tertiary-color focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary-color focus-visible:ring-offset-2 focus-visible:ring-offset-primary-color"
                aria-label="Contato pelo WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BiLogoWhatsapp className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/fernandorcosta25"
                className="rounded-sm text-secondary-color transition-colors hover:text-tertiary-color focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary-color focus-visible:ring-offset-2 focus-visible:ring-offset-primary-color"
                aria-label="Fernando Costa no Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LuInstagram className="h-6 w-6" />
              </a>
            </div>
          </nav>
        </div>
      </div>

      <div className="mt-8 border-t border-secondary-color/30 pt-6 text-center text-sm text-secondary-color/80">
        <p>© 2026 Controle Leiteiro. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
);

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return isVisible ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 bg-tertiary-color p-3 rounded-full shadow-lg hover:scale-110 transition-transform z-50"
      aria-label="Voltar ao topo"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  ) : null;
};
