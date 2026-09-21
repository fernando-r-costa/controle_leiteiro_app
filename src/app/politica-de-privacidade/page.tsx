import Image from "next/image";
import Link from "next/link";
import BackButton from "./back-button";

const listClassName = "list-disc space-y-2 pl-6";
const sectionClassName = "space-y-4";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-light-color text-dark-color">
      <header className="bg-primary-color text-light-color">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-start justify-between gap-4 px-5 py-4 sm:flex-row sm:items-center sm:px-8">
          <Link
            href="/"
            aria-label="Ir para a página inicial"
            className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary-color focus-visible:ring-offset-2 focus-visible:ring-offset-primary-color"
          >
            <Image
              src="/icon_CL.png"
              alt="Logo Controle Leiteiro"
              width={40}
              height={40}
              className="rounded-lg"
              priority
            />
            <span className="text-base font-light sm:text-xl">
              <strong className="font-semibold">Controle</strong> Leiteiro
            </span>
          </Link>
          <BackButton />
        </div>
      </header>

      <main className="px-5 py-10 sm:px-8 sm:py-14">
        <article className="mx-auto w-full min-w-0 max-w-4xl space-y-10 break-words rounded-2xl bg-white p-6 shadow-sm sm:p-10">
          <header className="space-y-4 border-b border-primary-color/20 pb-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-color">
              Controle Leiteiro
            </p>
            <h1 className="text-3xl font-bold leading-tight text-primary-color sm:text-4xl">
              Política de Privacidade — Controle Leiteiro
            </h1>
            <p className="text-sm text-primary-color">
              Última atualização: 21 de setembro de 2026
            </p>
            <div className="space-y-1 text-sm leading-relaxed sm:text-base">
              <p><strong>Controlador:</strong> Tepeyac Tech Softwares Ltda.</p>
              <p><strong>CNPJ:</strong> 68.719.219/0001-89</p>
              <p><strong>Produto:</strong> Controle Leiteiro</p>
              <p className="break-words">
                <strong>Contato para privacidade:</strong>{" "}
                <a
                  href="mailto:tepeyactechsoftwares@gmail.com"
                  className="break-all underline underline-offset-2 hover:text-primary-color focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-color"
                >
                  tepeyactechsoftwares@gmail.com
                </a>
              </p>
            </div>
          </header>

          <div className="space-y-4 leading-relaxed">
            <p>
              A Tepeyac Tech Softwares Ltda., inscrita no CNPJ sob o nº
              68.719.219/0001-89, é responsável pelo tratamento dos dados
              pessoais realizado por meio da plataforma Controle Leiteiro.
            </p>
            <p>
              Esta Política de Privacidade explica quais dados tratamos, para
              quais finalidades, com quem eles podem ser compartilhados e quais
              são os direitos dos usuários.
            </p>
          </div>

          <section className={sectionClassName}>
            <h2 className="text-2xl font-semibold text-primary-color">1. Dados que tratamos</h2>
            <p>
              Para disponibilizar o Controle Leiteiro, podemos tratar dados
              fornecidos diretamente pelo usuário, como nome completo, e-mail,
              telefone e senha.
            </p>
            <p>
              A senha não é armazenada em texto legível. O sistema utiliza hash
              para seu armazenamento e validação.
            </p>
            <p>
              Também tratamos informações necessárias ao funcionamento da
              plataforma, incluindo dados relacionados às fazendas cadastradas,
              animais, datas de parto, controles leiteiros, pesagens,
              indicadores de lactação e outras informações produtivas
              registradas pelo usuário.
            </p>
            <p>
              Podemos ainda tratar identificadores técnicos, informações de
              sessão e preferências armazenadas no dispositivo do usuário, como
              identificadores de produtor e fazenda, datas de controle e
              informações necessárias ao funcionamento e instalação da
              aplicação.
            </p>
            <p>
              Atualmente, a aplicação não utiliza cookies próprios de
              autenticação; a sessão é mantida por meio de armazenamento local
              do navegador.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className="text-2xl font-semibold text-primary-color">2. Finalidades do tratamento</h2>
            <p>Os dados são tratados para permitir:</p>
            <ul className={listClassName}>
              <li>cadastro e autenticação do usuário;</li>
              <li>organização de fazendas e rebanhos;</li>
              <li>registro e acompanhamento da produção leiteira;</li>
              <li>elaboração de planilhas e relatórios;</li>
              <li>geração de análises com inteligência artificial;</li>
              <li>processamento de pagamentos;</li>
              <li>suporte ao usuário;</li>
              <li>segurança da aplicação;</li>
              <li>diagnóstico de falhas;</li>
              <li>cumprimento de obrigações legais ou regulatórias.</li>
            </ul>
            <p>
              O tratamento poderá ocorrer com fundamento nas bases legais
              aplicáveis previstas na Lei Geral de Proteção de Dados Pessoais —
              LGPD, conforme a finalidade e a situação concreta.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className="text-2xl font-semibold text-primary-color">3. Pagamentos</h2>
            <p>
              Quando o usuário realiza a aquisição de um relatório ou outro
              recurso pago, o Controle Leiteiro utiliza o Mercado Pago para
              processamento da cobrança via PIX.
            </p>
            <p>
              Para essa finalidade, podem ser enviados ao Mercado Pago dados
              como primeiro nome e e-mail do pagador, além do valor, moeda,
              referência da operação e demais informações necessárias ao
              processamento do pagamento.
            </p>
            <p>
              O Controle Leiteiro também mantém registros relacionados à
              transação, como situação do pagamento, identificadores da ordem,
              valor, data de expiração e vínculo com o produto adquirido.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className="text-2xl font-semibold text-primary-color">4. Inteligência artificial</h2>
            <p>
              O Controle Leiteiro utiliza serviços de inteligência artificial
              para auxiliar na geração da parte narrativa do relatório
              inteligente.
            </p>
            <p>
              Na implementação atual, as informações enviadas ao provedor de IA
              são minimizadas.
            </p>
            <p>Não são enviados:</p>
            <ul className={listClassName}>
              <li>nome, e-mail ou telefone do produtor;</li>
              <li>nome da fazenda;</li>
              <li>nome ou número visível dos animais;</li>
              <li>datas;</li>
              <li>pesagens individuais;</li>
              <li>totais brutos de produção.</li>
            </ul>
            <p>
              São enviados identificadores internos dos animais e informações
              produtivas derivadas, como classificações qualitativas,
              tendências, estágio de lactação e contexto necessário à geração
              da análise.
            </p>
            <p>O provedor atualmente utilizado para essa finalidade é a Groq.</p>
          </section>

          <section className={sectionClassName}>
            <h2 className="text-2xl font-semibold text-primary-color">5. Relatórios e armazenamento</h2>
            <p>
              As planilhas básicas são geradas para download e não possuem
              persistência externa identificada na implementação atual.
            </p>
            <p>
              Os relatórios inteligentes em PDF podem conter dados do produtor,
              fazenda, animais, controles, histórico produtivo, indicadores e
              análises.
            </p>
            <p>
              Esses arquivos são armazenados no Cloudflare R2, permitindo sua
              disponibilização e novo download pelo usuário.
            </p>
            <p>
              Informações relacionadas ao relatório também podem ser
              armazenadas no banco de dados da plataforma.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className="text-2xl font-semibold text-primary-color">6. Compartilhamento e fornecedores</h2>
            <p>
              Para disponibilizar o serviço, determinados dados podem ser
              tratados por fornecedores tecnológicos utilizados pela
              plataforma.
            </p>
            <p>Atualmente podem ser utilizados:</p>
            <ul className={listClassName}>
              <li>Vercel, para hospedagem do frontend;</li>
              <li>Render, para hospedagem do backend;</li>
              <li>Aiven/PostgreSQL, para banco de dados;</li>
              <li>Cloudflare R2, para armazenamento de relatórios;</li>
              <li>Mercado Pago, para pagamentos;</li>
              <li>Groq, para processamento de inteligência artificial;</li>
              <li>Sentry, quando habilitado, para monitoramento técnico de erros.</li>
            </ul>
            <p>
              Alguns desses fornecedores podem operar infraestrutura em
              diferentes países. Quando houver transferência internacional de
              dados, ela deverá ocorrer em conformidade com a legislação
              aplicável.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className="text-2xl font-semibold text-primary-color">7. Registros técnicos e segurança</h2>
            <p>
              Podemos manter registros técnicos necessários para diagnóstico de
              erros, segurança, prevenção de abuso e manutenção da aplicação.
            </p>
            <p>
              Esses registros podem incluir identificadores internos,
              informações sobre operações realizadas, rotas acessadas e
              mensagens de erro e, em algumas situações, informações
              relacionadas ao cadastro ou atividade realizada pelo usuário.
            </p>
            <p>
              Adotamos medidas técnicas e organizacionais destinadas à proteção
              das informações tratadas. Entretanto, nenhum sistema conectado à
              internet pode garantir segurança absoluta.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className="text-2xl font-semibold text-primary-color">8. Armazenamento no dispositivo</h2>
            <p>
              A aplicação utiliza recursos de armazenamento do navegador, como
              localStorage, sessionStorage e mecanismos técnicos associados à
              instalação da aplicação.
            </p>
            <p>
              Algumas respostas obtidas pela aplicação também podem permanecer
              temporariamente armazenadas no dispositivo por mecanismos de
              cache do navegador ou da aplicação.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className="text-2xl font-semibold text-primary-color">9. Retenção dos dados</h2>
            <p>
              Os dados serão mantidos pelo período necessário para a prestação
              dos serviços do Controle Leiteiro, atendimento das finalidades
              descritas nesta Política, cumprimento de obrigações legais ou
              regulatórias e exercício regular de direitos.
            </p>
            <p>
              Algumas informações poderão ser conservadas mesmo após uma
              solicitação de exclusão quando sua manutenção for necessária ou
              permitida pela legislação aplicável.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className="text-2xl font-semibold text-primary-color">10. Direitos do titular</h2>
            <p>
              Nos termos da LGPD, o titular poderá exercer, conforme aplicável,
              direitos como:
            </p>
            <ul className={listClassName}>
              <li>confirmação da existência de tratamento;</li>
              <li>acesso aos dados;</li>
              <li>correção de informações incompletas ou desatualizadas;</li>
              <li>informações sobre compartilhamentos;</li>
              <li>anonimização, bloqueio ou eliminação quando aplicável;</li>
              <li>portabilidade nos termos da regulamentação;</li>
              <li>demais direitos previstos na legislação.</li>
            </ul>
            <p>Pedidos relacionados aos dados pessoais devem ser enviados para:</p>
            <p className="break-words">
              <a
                href="mailto:tepeyactechsoftwares@gmail.com"
                className="break-all font-semibold text-primary-color underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-color"
              >
                tepeyactechsoftwares@gmail.com
              </a>
            </p>
            <p>
              A solicitação será analisada considerando a identidade do
              requerente, a natureza do pedido e eventuais obrigações legais de
              conservação.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className="text-2xl font-semibold text-primary-color">11. Exclusão e correção de informações</h2>
            <p>
              O usuário poderá solicitar acesso, correção ou exclusão de seus
              dados pelo endereço de e-mail informado nesta Política.
            </p>
            <p>
              A exclusão poderá estar sujeita à manutenção de determinadas
              informações quando necessária para cumprimento de obrigação legal
              ou regulatória, proteção de direitos ou outras hipóteses
              autorizadas pela LGPD.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className="text-2xl font-semibold text-primary-color">12. Menores de idade</h2>
            <p>O Controle Leiteiro não é destinado a menores de 18 anos.</p>
            <p>
              Caso seja identificado tratamento de dados pessoais de menor de
              idade realizado de forma incompatível com esta Política, o
              responsável poderá entrar em contato para solicitar análise e
              providências.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className="text-2xl font-semibold text-primary-color">13. Serviços e links externos</h2>
            <p>
              A plataforma pode disponibilizar links para serviços externos,
              como WhatsApp e Instagram.
            </p>
            <p>
              Ao acessar esses serviços, o usuário estará sujeito também às
              políticas e práticas de privacidade dos respectivos fornecedores.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className="text-2xl font-semibold text-primary-color">14. Alterações desta Política</h2>
            <p>
              Esta Política poderá ser atualizada para refletir alterações no
              Controle Leiteiro, nos fornecedores utilizados, nas práticas de
              tratamento de dados ou na legislação aplicável.
            </p>
            <p>
              A versão vigente será disponibilizada na própria plataforma,
              acompanhada da data de sua última atualização.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className="text-2xl font-semibold text-primary-color">15. Controlador e contato</h2>
            <div className="space-y-1">
              <p>Tepeyac Tech Softwares Ltda.</p>
              <p>CNPJ: 68.719.219/0001-89</p>
              <p>Produto: Controle Leiteiro</p>
              <p>Contato para privacidade e proteção de dados:</p>
              <p className="break-words">
                <a
                  href="mailto:tepeyactechsoftwares@gmail.com"
                  className="break-all font-semibold text-primary-color underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-color"
                >
                  tepeyactechsoftwares@gmail.com
                </a>
              </p>
            </div>
          </section>

          <div className="border-t border-primary-color/20 pt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-primary-color px-5 py-3 font-semibold text-light-color transition-colors hover:bg-dark-color focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-color focus-visible:ring-offset-2"
            >
              Voltar à página inicial
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
