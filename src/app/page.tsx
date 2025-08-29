"use client";

import Image from "next/image";
import Link from "next/link";
import {
  SquareArrowOutUpRight,
  UserCircle,
  Edit,
  ChartNoAxesCombined,
  CircleGauge,
  Mail,
  Instagram,
  Linkedin,
  MessageCircle,
} from "lucide-react";

// Componente Principal da Página
export default function LandingPage() {
  return (
    <div className="bg-light-color text-dark-color font-primaryFont">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <WhySection />
        <BenefitSection />
        <AboutSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}

// Seções como componentes individuais para organização

const Header = () => (
  <header className="bg-primary-color backdrop-blur-md sticky top-0 z-50 border-none">
    <div className="container mx-auto  md:px-8 p-3 flex justify-between items-center">
      <div className="flex items-center gap-2 text-light-color font-light text-[1.7em] sm:text-[2em]">
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
      <nav className="hidden md:flex items-center gap-6 text-light-color font-medium text-lg">
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
      Experimente agora a versão experimental do nosso aplicativo para o
      controle leiteiro de sua propriedade e tenha as informações da produção na
      palma da mão.
    </p>
    <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
      <Link
        href="/login"
        className="flex items-center justify-center gap-2 bg-tertiary-color text-dark-color font-bold px-10 py-4 text-xl rounded-xl shadow-2xl hover:scale-110 transition-all"
        aria-label="Acessar o App gratuitamente"
      >
        Acessar o App Gratuitamente
        <SquareArrowOutUpRight className="h-10 w-10 md:h-6 md:w-6" />
      </Link>
    </div>
    <div className="mt-10 text-sm text-highlight-color font-semibold bg-highlight-color/20 rounded-lg py-2 px-4 inline-block">
      Seja um <strong className="font-extrabold">Produtor Pioneiro</strong> e
      garanta acesso exclusivo a benefícios nos serviços futuros da plataforma.
      Cadastre-se agora!
    </div>
    <div className="mt-16 relative">
      <div className="bg-secondary-color h-96 rounded-xl flex items-center justify-center text-dark-color">
        [Mockup do app em celular e desktop]
      </div>
    </div>
  </section>
);

const FeaturesSection = () => (
  <section id="funcionalidades" className="bg-secondary-color py-20 md:py-28">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-dark-color">
        O controle diário da sua produção, simplificado
      </h2>
      <p className="mt-4 text-xl text-dark-color max-w-3xl mx-auto">
        Deixe as planilhas para trás. Cadastre seus animais, registre a produção
        e tenha os números do dia em um só lugar, de forma fácil e organizada.
      </p>
      <div className="mt-12 grid md:grid-cols-3 gap-8 text-left">
        <div className="bg-light-color p-6 rounded-lg shadow-md transition-shadow hover:shadow-lg hover:shadow-tertiary-color">
          <Edit className="w-10 h-10 text-tertiary-color mb-4" />
          <h3 className="font-bold text-xl mb-2">Rebanho organizado</h3>
          <p className="text-dark-color">
            Cadastre cada vaca com nome, número e datas importantes como último
            parto e previsão. Tenha o histórico de cada animal sempre à mão,
            mesmo com várias fazendas.
          </p>
        </div>
        <div className="bg-light-color p-6 rounded-lg shadow-md transition-shadow hover:shadow-lg hover:shadow-tertiary-color">
          <CircleGauge className="w-10 h-10 text-tertiary-color mb-4" />
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
          <ChartNoAxesCombined className="w-10 h-10 text-tertiary-color mb-4" />
          <h3 className="font-bold text-xl mb-2">
            Análise de desempenho diário
          </h3>
          <p className="text-dark-color">
            Com um clique, acesse o resumo da sua produção: totalização, médias
            e DEL. Identifique rapidamente a performance do rebanho e planeje
            suas próximas ações.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const WhySection = () => (
  <section className="py-20 md:py-28">
    <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold ">
          Transforme dados em desempenho
        </h2>
        <p className="mt-4 text-2xl ">
          Aumentar a produtividade em{" "}
          <span className="font-bold">15% a 25%</span> não é sorte, é gestão.
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
      <div className="bg-tertiary-color/30 border-l-4 border-tertiary-color rounded-r-xl p-6">
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
  <section className="bg-highlight-color/20 text-highlight-color">
    <div className="container mx-auto px-6 py-16 text-center">
      <h2 className="text-3xl font-bold">
        Uma parceria que começa hoje e gera frutos amanhã
      </h2>
      <p className="mt-4 text-lg text-highlight-color max-w-3xl mx-auto">
        Você está nos ajudando a construir o futuro da gestão leiteira. Como{" "}
        <strong>Produtor Pioneiro</strong>, sua jornada conosco começa agora, na
        fase experimental. Para celebrar essa parceria, queremos que você seja o
        primeiro a colher os frutos quando a plataforma completa for lançada:
      </p>

      <div className="mt-8 bg-white/40 rounded-lg p-6 max-w-2xl mx-auto text-left">
        <p className="text-xl font-bold text-center mb-4">
          No lançamento, sua conta será atualizada com{" "}
          <span className="underline">3 meses de acesso gratuito</span>,
          liberando ferramentas avançadas como:
        </p>
        <ul className="space-y-3 list-disc list-inside">
          <li>
            <strong>Exportação Profissional de Relatórios:</strong> Gere e baixe
            seus dados em PDF e planilhas (XLS) para compartilhar com sua
            equipe, veterinário ou contador.
          </li>
          <li>
            <strong>Análises com Inteligência Artificial:</strong> Acesse
            relatórios que revelam tendências e insights valiosos sobre seu
            rebanho para otimizar a produção.
          </li>
          <li>
            <strong>Todas as Futuras Inovações:</strong> Acesso garantido a
            qualquer outra ferramenta avançada que for lançada durante seu
            período gratuito.
          </li>
        </ul>
      </div>

      <p className="mt-8 text-md text-highlight-color/80 max-w-2xl mx-auto">
        Além disso, seu status de <strong>Produtor Pioneiro</strong> garantirá
        que você sempre tenha as melhores condições e descontos em nossa jornada
        juntos.
      </p>
    </div>
  </section>
);

const AboutSection = () => (
  <section id="sobre" className="bg-secondary-color py-20 md:py-28">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
      <div className="md:w-1/3 text-center">
        <UserCircle className="w-32 h-32 mx-auto text-dark-color" />
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
            Minha história com a pecuária leiteira começou na infância. Cresci
            vivenciando a rotina da fazenda e aprendi na prática os desafios
            diários para manter um rebanho saudável e produtivo. Eu não apenas
            observei, eu vivi as dificuldades do controle manual e a falta de
            ferramentas realmente pensadas para o nosso dia a dia.
          </p>
          <p>
            A paixão pelo campo me levou à Medicina Veterinária. Atuando
            diretamente em propriedades rurais, pude aprofundar meu conhecimento
            técnico em saúde e manejo, o que me deu um diagnóstico claro sobre
            as necessidades do produtor e a lacuna que a tecnologia ainda não
            havia preenchido de forma simples e eficaz.
          </p>
          <p>
            Inconformado em ver os mesmos problemas persistirem, decidi unir
            minhas duas paixões: a pecuária e a tecnologia. Aprendi a programar
            com o objetivo: criar uma solução que eu mesmo, como veterinário e
            pecuarista, gostaria de usar. Este aplicativo é o resultado dessa
            jornada, feito para facilitar o seu trabalho e trazer resultados
            reais para a sua fazenda.
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
          <SquareArrowOutUpRight className="h-10 w-10 md:h-6 md:w-6" />
        </Link>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer id="contato" className="bg-primary-color text-secondary-color">
    <div className="container mx-auto px-10 py-10">
      <div className="flex flex-col gap-8 md:flex-row justify-between md:items-center text-center md:text-left">
        <div className="flex flex-col items-center md:items-start scale-90">
          <div className="flex items-center gap-2 text-light-color font-light text-[1.7em] sm:text-[2em]">
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

        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="flex gap-4">
            <a
              href="mailto:fernando.r.costa@outlook.com"
              className=" hover:text-tertiary-color transition-colors"
            >
              <Mail className="h-6 w-6" />
            </a>
            <a
              href="https://www.instagram.com/fernandorcosta25"
              className="hover:text-tertiary-color transition-colors"
              aria-label="Link para Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/fernando-r-costa"
              className="hover:text-tertiary-color transition-colors"
              aria-label="Link para Linkedin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="https://wa.me/553499633063"
              className="hover:text-tertiary-color transition-colors"
              aria-label="Link para WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-secondary-color/50 pt-6 text-center text-xs text-secondary-color">
        <p>© 2025 Fernando Costa – Todos os direitos reservados.</p>
        <p className="mt-1">Uberlândia, MG – Brasil</p>
      </div>
    </div>
  </footer>
);
