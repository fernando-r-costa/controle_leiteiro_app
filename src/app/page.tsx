"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LuSquareArrowOutUpRight,
  LuChartNoAxesCombined,
  LuCircleGauge,
  LuMail,
  LuInstagram,
  LuLinkedin,
  LuYoutube,
  LuHandshake,
} from "react-icons/lu";
import { BiEdit, BiLogoWhatsapp } from "react-icons/bi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Configurações globais
const CONFIG = {
  YOUTUBE_VIDEO_ID: "WUjOxBLZARU",
  COMPANY: {
    name: "Controle Leiteiro",
    email: "fernando.r.costa@outlook.com",
    whatsapp: "553499633063",
    social: {
      youtube: "@controle.leiteiro",
      instagram: "fernandorcosta25",
      linkedin: "fernando-r-costa",
    },
  },
  DATES: {
    pioneerDeadline: "31/12/2025",
  },
} as const;

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
        <VideoSection />
        <WhySection />
        <BenefitSection />
        <AboutSection />
        <FinalCTASection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

// Seções como componentes individuais

const Header = () => (
  <header className="bg-primary-color/90 backdrop-blur-md sticky top-0 z-50 border-none">
    <div className="container mx-auto md:px-8 p-3 flex justify-between items-center">
      <div className="flex items-center gap-2 text-light-color font-light  text-[1.7em] md:scale-110">
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
      <nav className="hidden lg:flex items-center gap-6 text-light-color font-medium text-lg">
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="hover:text-tertiary-color transition-colors"
        >
          Início
        </a>
        <a
          href="#funcionalidades"
          className="hover:text-tertiary-color transition-colors"
        >
          Funcionalidades
        </a>
        <a
          href="#beneficios"
          className="hover:text-tertiary-color transition-colors"
        >
          Benefícios
        </a>
        <a
          href="#sobre"
          className="hover:text-tertiary-color transition-colors"
        >
          Sobre
        </a>
        <a
          href="#contato"
          className="hover:text-tertiary-color transition-colors"
        >
          Contato
        </a>
      </nav>
      <Link
        href="/login"
        className="inline-block text-light-color font-bold px-4 py-2 md:px-8 md:py-3 text-lg rounded-lg shadow-md shadow-tertiary-color hover:scale-110 transition-transform hover:shadow-tertiary-color hover:shadow-xl border-2 border-tertiary-color"
        aria-label="Acessar o aplicativo"
      >
        <span className="md:hidden">Entrar</span>
        <span className="hidden md:inline">Entrar no aplicativo</span>
      </Link>
    </div>
  </header>
);

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
          SCREENSHOTS.length - newItemsPerPage
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
  <section className="container mx-auto px-6 py-20 md:py-32 text-center">
    <h1 className="text-5xl md:text-7xl font-extrabold text-dark-color leading-tight">
      Mais leite,
      <br />
      menos papelada,
      <br />
      onde você estiver.
    </h1>
    <p className="mt-6 text-lg md:text-2xl text-dark-color max-w-3xl mx-auto">
      Teste agora a versão experimental do nosso aplicativo para o controle
      leiteiro e tenha as informações da produção na palma da mão.
    </p>
    <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
      <Link
        href="/login"
        className="flex items-center justify-center gap-2 bg-tertiary-color text-dark-color font-bold px-10 py-4 text-xl rounded-xl shadow-2xl hover:scale-110 transition-all"
        aria-label="Acessar o App gratuitamente"
      >
        Acessar o App Gratuitamente
        <LuSquareArrowOutUpRight className="h-10 w-10 md:h-6 md:w-6" />
      </Link>
      <a
        href={`https://youtu.be/${CONFIG.YOUTUBE_VIDEO_ID}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-light-color border-2 border-tertiary-color text-dark-color font-bold px-10 py-4 text-xl rounded-xl shadow-2xl hover:scale-110 transition-all"
        aria-label="Assistir vídeo demonstrativo"
      >
        Veja como funciona
        <LuYoutube className="h-10 w-10 md:h-6 md:w-6 text-red-600" />
      </a>
    </div>
    <div className="mt-10 text-sm text-highlight-color bg-highlight-color/15 rounded-lg py-2 px-4 inline-block">
      Seja um <strong className="font-extrabold">Pioneiro</strong> e garanta
      acesso exclusivo a benefícios nos serviços futuros da plataforma.
      Cadastre-se agora!
    </div>
    <div className="mt-16 relative">
      <PhotoCarousel />
    </div>
  </section>
);

const FeaturesSection = () => (
  <section id="funcionalidades" className="bg-secondary-color py-20 md:py-28">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-dark-color">
        O controle diário da produção, simplificado!
      </h2>
      <p className="mt-4 text-xl text-dark-color max-w-3xl mx-auto">
        Deixe as planilhas para trás. Cadastre os animais, registre a produção e
        tenha os números do dia em um só lugar, de forma fácil e organizada.
      </p>
      <div className="mt-12 grid md:grid-cols-4 gap-8 text-left">
        <div className="bg-light-color p-6 rounded-lg shadow-md transition-shadow hover:shadow-lg hover:shadow-tertiary-color">
          <BiEdit className="w-10 h-10 text-tertiary-color mb-4" />
          <h3 className="font-bold text-xl mb-2">Rebanho organizado</h3>
          <p className="text-dark-color">
            Cadastre cada vaca com nome, número e datas importantes como último
            parto e previsão. Tenha o histórico de cada animal sempre à mão,
            mesmo com várias fazendas.
          </p>
        </div>
        <div className="bg-light-color p-6 rounded-lg shadow-md transition-shadow hover:shadow-lg hover:shadow-tertiary-color">
          <LuCircleGauge className="w-10 h-10 text-tertiary-color mb-4" />
          <h3 className="font-bold text-xl mb-2">
            Lançamento rápido da pesagem
          </h3>
          <p className="text-dark-color">
            Registre a produção de leite individual de cada vaca no dia da
            pesagem. Um processo rápido e prático para não perder nenhuma
            informação importante.
          </p>
        </div>
        <div className="bg-light-color p-6 rounded-lg shadow-md transition-shadow hover:shadow-lg hover:shadow-tertiary-color">
          <LuChartNoAxesCombined className="w-10 h-10 text-tertiary-color mb-4" />
          <h3 className="font-bold text-xl mb-2">
            Análise de desempenho diário
          </h3>
          <p className="text-dark-color">
            Com um clique, acesse o resumo da sua produção: totalização, médias
            e DEL. Identifique rapidamente a performance do rebanho e planeje
            suas próximas ações.
          </p>
        </div>
        <div className="bg-light-color p-6 rounded-lg shadow-md transition-shadow hover:shadow-lg hover:shadow-tertiary-color">
          <LuHandshake className="w-10 h-10 text-tertiary-color mb-4" />
          <h3 className="font-bold text-xl mb-2">Gestão da consultoria</h3>
          <p className="text-dark-color">
            Cadastre todas as propriedades que você assiste e facilite a
            assistência. Acesse os dados de cada rebanho em qualquer lugar.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const VideoSection = () => (
  <section className="py-16 bg-light-color/50">
    <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      <div className="order-2 md:order-1">
        <h2 className="text-3xl md:text-4xl font-bold text-dark-color mb-6">
          Veja na prática como é simples!
        </h2>
        <div className="bg-secondary-color border-l-4 border-tertiary-color rounded-r-xl p-6">
          <h3 className="font-bold text-2xl mb-3">
            Como o vídeo vai te ajudar:
          </h3>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>Conheça todas as funcionalidades em apenas 5 minutos.</li>
            <li>Veja o passo a passo do lançamento da produção.</li>
            <li>Entenda como acessar e interpretar os relatórios.</li>
            <li>Descubra como o app facilita sua rotina no campo.</li>
          </ul>
          <div className="mt-6">
            <a
              href={`https://youtu.be/${CONFIG.YOUTUBE_VIDEO_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-dark-color font-bold hover:text-terciary-color transition-colors"
            >
              <LuYoutube className="h-6 w-6 text-red-600" />
              Assistir em tela cheia no YouTube
            </a>
          </div>
        </div>
      </div>
      <div className="order-1 md:order-2 aspect-video w-full max-w-xl mx-auto rounded-xl overflow-hidden shadow-2xl">
        <YouTubeEmbed />
      </div>
    </div>
  </section>
);

const YouTubeEmbed = () => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="aspect-video w-full max-w-xl mx-auto rounded-xl overflow-hidden shadow-2xl"
    >
      {isIntersecting ? (
        <iframe
          src={`https://www.youtube.com/embed/${CONFIG.YOUTUBE_VIDEO_ID}`}
          title="Vídeo demonstrativo do Controle Leiteiro"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      ) : (
        <div className="w-full h-full bg-tertiary-color/25 animate-pulse" />
      )}
    </div>
  );
};

const WhySection = () => (
  <section className="py-16 md:pb-28">
    <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold ">
          Transforme dados em desempenho
        </h2>
        <p className="mt-4 text-2xl ">
          Aumentar a produtividade em{" "}
          <span className="font-bold border-b-4 border-tertiary-color">
            até 25%
          </span>{" "}
          não é sorte,{" "}
          <span className="font-bold border-b-4 border-tertiary-color text-">
            é gestão.
          </span>
        </p>
        <p className="mt-4 text-xl">
          Propriedades que adotam o controle leiteiro preciso alcançam esses
          resultados por tomarem decisões mais inteligentes, baseadas em dados
          confiáveis.
        </p>
        <p className="mt-4 text-xl">
          Com nossa ferramenta, a gestão baseada em dados se torna simples.
          Visualize a performance de cada animal e tenha a confiança para agir
          no momento certo, otimizando o potencial do seu rebanho.
        </p>
      </div>
      <div className="bg-secondary-color border-l-4 border-tertiary-color rounded-r-xl p-6">
        <h3 className="font-bold text-2xl mb-3">
          O que você ganha com o controle preciso:
        </h3>
        <ul className="list-disc list-inside text-lg space-y-2">
          <li>
            Identificação rápida de problemas de saúde e quedas na produção.
          </li>
          <li>Planejamento eficiente da nutrição e do manejo do rebanho.</li>
          <li>Decisões claras sobre seleção e descarte de animais.</li>
          <li>Otimização do seu tempo com a eliminação da papelada.</li>
        </ul>
      </div>
    </div>
  </section>
);

const BenefitSection = () => (
  <section id="beneficios" className="bg-tertiary-color py-20 md:py-28">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-3xl font-bold">
        Uma parceria que começa hoje e gera frutos amanhã
      </h2>
      <p className="mt-4 text-lg max-w-3xl mx-auto">
        Você está nos ajudando a construir o futuro da gestão leiteira. Como{" "}
        <strong className="underline">Pioneiro</strong>*, sua jornada conosco
        começa agora, na fase experimental. Para celebrar essa parceria,
        queremos que você seja o primeiro a colher os frutos quando novas
        funcionalidades forem lançadas:
      </p>

      <div className="mt-8 bg-light-color/60 rounded-lg p-6 max-w-2xl mx-auto text-left">
        <p className="text-xl font-bold text-center mb-4">
          Sua conta será bonificada com{" "}
          <span className="underline">3 meses de acesso gratuito</span> as novas
          ferramentas avançadas como:
        </p>
        <ul className="space-y-3 list-disc list-inside text-base">
          <li>
            <strong>Exportação profissional de relatórios:</strong> gere e baixe
            os dados em PDF e planilhas para compartilhar com sua equipe ou
            consultor.
          </li>
          <li>
            <strong>Análises com Inteligência Artificial:</strong> acesse
            relatórios que revelam tendências e insights valiosos sobre o
            rebanho para otimizar a produção.
          </li>
          <li>
            <strong>Todas as futuras inovações:</strong> benefício garantido a
            qualquer outra ferramenta avançada que for lançada.
          </li>
        </ul>
      </div>

      <p className="my-8 text-base max-w-2xl mx-auto">
        Além disso, seu status de <strong>Pioneiro</strong> garantirá que você
        sempre tenha as melhores condições e descontos em nossa jornada juntos.
      </p>

      <div className="text-sm text-center text-highlight-color">
        *O status <strong className="font-extrabold">Pioneiro </strong>será
        concedido até dia{" "}
        <strong className="font-extrabold">
          {CONFIG.DATES.pioneerDeadline}
        </strong>
        .
      </div>
    </div>
  </section>
);

const AboutSection = () => (
  <section id="sobre" className="bg-secondary-color py-20 md:py-28">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
      <div className="md:w-1/3 text-center">
        <Image
          src="/perfil_out23.png"
          alt="Foto Fernando Costa"
          width={180}
          height={180}
          className="rounded-full mx-auto"
        />
        <h3 className="mt-4 text-2xl font-bold text-dark-color">
          Fernando Costa
        </h3>
        <p className="text-dark-color font-medium">
          Veterinário, Pecuarista e Desenvolvedor
        </p>
      </div>
      <div className="md:w-2/3">
        <h2 className="text-3xl md:text-4xl font-bold text-dark-color mb-4">
          Tecnologia nascida no campo.
        </h2>
        <div className="space-y-4 text-dark-color text-lg">
          <p>
            Desde a infância na fazenda, minha trajetória foi moldada por duas
            frentes: a vivência na pecuária leiteira e um interesse nato em usar
            a tecnologia para otimizar processos. Antes mesmo da faculdade, eu
            já utilizava planilhas e programas de gestão, buscando mais
            eficiência para os desafios que eu via no dia a dia.
          </p>
          <p>
            A formação em Medicina Veterinária aprofundou meu conhecimento
            técnico e, ao atuar no campo, meu diagnóstico se tornou claro: as
            soluções tecnológicas existentes eram complexas e desconectadas da
            realidade do produtor. Faltava uma ferramenta criada por quem
            realmente vive aquele desafio.
          </p>
          <p>
            Foi essa inconformidade que me levou a dar o próximo passo.
            Mergulhei no desenvolvimento de software para construir a solução
            que, como veterinário e pecuarista, eu mesmo sempre precisei. Este
            aplicativo une o conhecimento prático do campo com a lógica da
            programação, criado para ser uma ferramenta intuitiva que gera
            resultados reais para a sua fazenda.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const FinalCTASection = () => (
  <section className="py-20 md:py-28">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-dark-color">
        Chega de planilhas. Comece a organizar seu rebanho hoje.
      </h2>
      <p className="mt-4 text-lg text-dark-color/80 max-w-2xl mx-auto">
        Experimente a plataforma gratuitamente. Sem cartão de crédito, sem
        burocracia. Apenas controle e clareza para a sua produção.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
        <Link
          href="/login"
          className="flex items-center justify-center gap-2 bg-tertiary-color text-dark-color font-bold px-10 py-4 text-xl rounded-xl shadow-2xl hover:scale-110 transition-all"
          aria-label="Acessar o App gratuitamente"
        >
          Acessar o App Gratuitamente
          <LuSquareArrowOutUpRight className="h-10 w-10 md:h-6 md:w-6" />
        </Link>
        <a
          href={`https://youtu.be/${CONFIG.YOUTUBE_VIDEO_ID}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-light-color border-2 border-tertiary-color text-dark-color font-bold px-10 py-4 text-xl rounded-xl shadow-2xl hover:scale-110 transition-all"
          aria-label="Assistir vídeo demonstrativo"
        >
          Veja como funciona
          <LuYoutube className="h-10 w-10 md:h-6 md:w-6 text-red-600" />
        </a>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer id="contato" className="bg-primary-color text-secondary-color">
    <div className="container mx-auto px-10 py-5">
      <div className="flex flex-col gap-8 md:flex-row justify-between md:items-center text-center md:text-left">
        <div className="flex flex-col items-center md:items-start scale-90">
          <div className="flex items-center gap-2 text-light-color font-light text-[1.7em] sm:text-[1.8em]">
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
        </div>

        <div className="flex flex-col items-center gap-4">
          <Image
            src="/frc_logo_removebg.png"
            alt="Logo FRC"
            width={80}
            height={80}
          />
          <div className="flex gap-4">
            <a
              href="mailto:fernando.r.costa@outlook.com"
              className=" hover:text-tertiary-color transition-colors"
              aria-label="Link para E-mail"
            >
              <LuMail className="h-6 w-6" />
            </a>
            <a
              href="https://www.youtube.com/@controle.leiteiro"
              className="hover:text-tertiary-color transition-colors"
              aria-label="Link para YouTube"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LuYoutube className="h-6 w-6" />
            </a>

            <a
              href="https://wa.me/553499633063"
              className="hover:text-tertiary-color transition-colors"
              aria-label="Link para WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BiLogoWhatsapp className="h-6 w-6" />
            </a>
            <a
              href="https://www.instagram.com/fernandorcosta25"
              className="hover:text-tertiary-color transition-colors"
              aria-label="Link para Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LuInstagram className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/fernando-r-costa"
              className="hover:text-tertiary-color transition-colors"
              aria-label="Link para Linkedin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LuLinkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-5 border-t border-secondary-color/50 pt-6 text-center text-xs text-secondary-color">
        <p>© 2025 Fernando Costa – Todos os direitos reservados.</p>
        <p className="mt-1">Uberlândia, MG – Brasil</p>
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
