import Image from "next/image";
import Link from "next/link";
import BackButton from "./back-button";

const listClassName = "list-disc space-y-2 pl-6";
const sectionClassName = "space-y-4";

export default function TermsOfUsePage() {
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
              Termos de Uso — Controle Leiteiro
            </h1>
            <p className="text-sm text-primary-color">
              <strong>Última atualização: 21 de setembro de 2026</strong>
            </p>
          </header>

          <div className="space-y-4 leading-relaxed">
            <p>
              Estes Termos de Uso regulam o acesso e a utilização da plataforma{" "}
              <strong>Controle Leiteiro</strong>, disponibilizada pela{" "}
              <strong>Tepeyac Tech Softwares Ltda.</strong>, inscrita no CNPJ sob
              o nº <strong>68.719.219/0001-89</strong>.
            </p>
            <p>
              Ao utilizar a plataforma, o usuário declara estar de acordo com
              estes Termos e com a Política de Privacidade aplicável ao serviço.
            </p>
          </div>

          <section className={sectionClassName}>
            <h2 className="text-2xl font-semibold text-primary-color">1. Sobre o Controle Leiteiro</h2>
            <p>
              O Controle Leiteiro é uma ferramenta digital destinada a auxiliar
              produtores e demais usuários autorizados no registro, organização
              e acompanhamento de informações relacionadas à produção leiteira.
            </p>
            <p>
              Entre suas funcionalidades podem estar o cadastro de fazendas e
              animais, registro de controles leiteiros, acompanhamento de dados
              produtivos, geração de planilhas, relatórios e análises auxiliadas
              por inteligência artificial.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className="text-2xl font-semibold text-primary-color">2. Natureza das informações e relatórios</h2>
            <p>O Controle Leiteiro é uma ferramenta de apoio à gestão.</p>
            <p>
              As informações, indicadores, classificações, relatórios e análises
              apresentados pela plataforma, inclusive os produzidos com auxílio
              de inteligência artificial, possuem caráter informativo e de apoio
              à tomada de decisão.
            </p>
            <p>
              Eles não substituem avaliação veterinária, zootécnica, agronômica,
              contábil, financeira ou qualquer outra orientação profissional
              especializada quando ela for necessária.
            </p>
            <p>
              Cabe ao usuário avaliar as informações apresentadas considerando a
              realidade de sua propriedade e, quando apropriado, consultar
              profissional habilitado.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className="text-2xl font-semibold text-primary-color">3. Cadastro e conta</h2>
            <p>
              Para utilizar determinadas funcionalidades, o usuário deverá criar
              uma conta e fornecer informações verdadeiras, completas e
              atualizadas.
            </p>
            <p>O usuário é responsável:</p>
            <ul className={listClassName}>
              <li>pela utilização de sua conta;</li>
              <li>pela confidencialidade de suas credenciais;</li>
              <li>pelos dados registrados por meio dela;</li>
              <li>por comunicar eventual uso não autorizado de sua conta.</li>
            </ul>
            <p>
              Não é permitido utilizar identidade falsa, cadastrar informações
              fraudulentas ou acessar conta pertencente a terceiro sem
              autorização.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className="text-2xl font-semibold text-primary-color">4. Idade mínima</h2>
            <p>O Controle Leiteiro não é destinado a menores de 18 anos.</p>
            <p>
              Ao criar uma conta, o usuário declara possuir capacidade para
              utilizar o serviço e assumir as obrigações previstas nestes Termos.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className="text-2xl font-semibold text-primary-color">5. Dados inseridos pelo usuário</h2>
            <p>
              O usuário permanece responsável pelas informações que cadastrar
              na plataforma, incluindo dados relativos a fazendas, animais,
              controles leiteiros e produção.
            </p>
            <p>
              O usuário declara possuir legitimidade para inserir e utilizar
              essas informações no Controle Leiteiro.
            </p>
            <p>
              A Tepeyac Tech poderá processar esses dados na medida necessária
              para disponibilizar as funcionalidades contratadas, conforme
              descrito na Política de Privacidade.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className="text-2xl font-semibold text-primary-color">6. Funcionalidades gratuitas e pagas</h2>
            <p>
              O Controle Leiteiro pode disponibilizar funcionalidades gratuitas,
              benefícios promocionais, períodos experimentais e recursos pagos.
            </p>
            <p>
              As condições, limites, valores e benefícios aplicáveis serão
              apresentados na própria plataforma antes da contratação.
            </p>
            <p>
              A disponibilização gratuita de determinada funcionalidade não cria
              obrigação de sua manutenção gratuita por prazo indeterminado.
            </p>
            <p>
              Alterações futuras não afetarão direitos já adquiridos pelo usuário
              em relação a produtos efetivamente pagos e disponibilizados,
              observadas as características do produto contratado.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className="text-2xl font-semibold text-primary-color">7. Pagamentos</h2>
            <p>
              Determinados relatórios ou recursos poderão ser adquiridos mediante
              pagamento, inclusive por PIX processado pelo Mercado Pago.
            </p>
            <p>
              O acesso ao produto pago será liberado após a confirmação do
              pagamento pelo sistema responsável pelo processamento da transação.
            </p>
            <p>
              Caso ocorra alguma inconsistência, como pagamento confirmado sem
              liberação do produto, dificuldade de acesso ao arquivo adquirido
              ou outra divergência relacionada à cobrança, o usuário deverá
              entrar em contato pelo endereço:
            </p>
            <p>
              <a
                href="mailto:tepeyactechsoftwares@gmail.com"
                className="break-all font-semibold text-primary-color underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-color"
              >
                tepeyactechsoftwares@gmail.com
              </a>
            </p>
            <p>
              A situação será analisada e, quando cabível, serão adotadas as
              medidas necessárias para correção, nova disponibilização do
              produto ou outra solução adequada.
            </p>
            <p>
              Eventuais direitos de cancelamento, restituição ou reembolso
              previstos pela legislação aplicável permanecem preservados.
            </p>
            <p>
              Nota fiscal: a Tepeyac Tech Softwares Ltda. realizará a emissão do
              documento fiscal correspondente às operações, conforme a legislação
              e os procedimentos fiscais aplicáveis. Caso o usuário necessite de
              nota fiscal emitida individualmente em seu nome ou empresa, poderá
              solicitá-la pelo e-mail tepeyactechsoftwares@gmail.com, fornecendo os
              dados necessários para emissão.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className="text-2xl font-semibold text-primary-color">8. Relatórios e inteligência artificial</h2>
            <p>
              Alguns relatórios podem utilizar inteligência artificial para
              elaboração de análises narrativas e interpretação de informações
              produtivas.
            </p>
            <p>
              Sistemas de inteligência artificial podem produzir resultados
              incompletos, imprecisos ou inadequados ao contexto específico de
              uma propriedade.
            </p>
            <p>
              Por isso, o usuário não deve utilizar uma análise gerada por IA
              como único fundamento para decisões que possam afetar saúde animal,
              nutrição, reprodução, manejo, investimentos ou outras decisões
              relevantes.
            </p>
            <p>
              A forma como os dados são tratados e minimizados antes do
              processamento por serviços de inteligência artificial é descrita
              na Política de Privacidade.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className="text-2xl font-semibold text-primary-color">9. Disponibilidade do serviço</h2>
            <p>
              Buscamos manter o Controle Leiteiro disponível e funcionando
              adequadamente, mas não garantimos operação ininterrupta ou livre
              de falhas.
            </p>
            <p>
              A plataforma poderá ficar temporariamente indisponível em razão de
              manutenção, atualização, falhas de infraestrutura, serviços de
              terceiros, problemas de conexão, eventos de segurança ou outras
              circunstâncias técnicas.
            </p>
            <p>
              Funcionalidades também poderão ser corrigidas, aprimoradas,
              substituídas ou descontinuadas quando necessário.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className="text-2xl font-semibold text-primary-color">10. Uso adequado da plataforma</h2>
            <p>O usuário não poderá utilizar o Controle Leiteiro para:</p>
            <ul className={listClassName}>
              <li>prática de atividade ilícita ou fraudulenta;</li>
              <li>acesso não autorizado a contas, dados ou sistemas;</li>
              <li>tentativa de explorar vulnerabilidades;</li>
              <li>interferência no funcionamento da plataforma;</li>
              <li>distribuição de código malicioso;</li>
              <li>reprodução ou exploração indevida do software;</li>
              <li>utilização que viole direitos de terceiros ou a legislação aplicável.</li>
            </ul>
            <p>
              Medidas de proteção poderão ser adotadas quando houver indícios de
              abuso, fraude ou comprometimento da segurança do serviço.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className="text-2xl font-semibold text-primary-color">11. Propriedade intelectual</h2>
            <p>
              O software, identidade visual, interfaces, textos, elementos
              gráficos, estrutura da plataforma e demais materiais próprios do
              Controle Leiteiro e da Tepeyac Tech são protegidos pela legislação
              aplicável.
            </p>
            <p>
              O uso da plataforma não transfere ao usuário direitos de
              propriedade sobre o software ou seus elementos.
            </p>
            <p>
              Os dados produtivos cadastrados pelo usuário não passam a pertencer
              à Tepeyac Tech em razão do uso da plataforma.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className="text-2xl font-semibold text-primary-color">12. Responsabilidade</h2>
            <p>
              A Tepeyac Tech buscará prestar o serviço de forma adequada e
              corrigir problemas identificados.
            </p>
            <p>
              Entretanto, respeitados os direitos assegurados pela legislação
              aplicável, não nos responsabilizamos por decisões tomadas
              exclusivamente com base em informações ou análises automatizadas
              sem a avaliação adequada do contexto pelo usuário ou por
              profissional habilitado.
            </p>
            <p>
              Nenhuma disposição destes Termos pretende excluir ou limitar
              responsabilidade quando tal exclusão ou limitação for proibida pela
              legislação, especialmente pelas normas de proteção ao consumidor.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className="text-2xl font-semibold text-primary-color">13. Privacidade e proteção de dados</h2>
            <p>
              O tratamento de dados pessoais relacionado ao Controle Leiteiro é
              disciplinado pela Política de Privacidade, que integra estes Termos
              para fins de informação e transparência.
            </p>
            <p>Recomendamos sua leitura antes da utilização da plataforma.</p>
          </section>

          <section className={sectionClassName}>
            <h2 className="text-2xl font-semibold text-primary-color">14. Suspensão ou encerramento</h2>
            <p>
              O usuário poderá deixar de utilizar o serviço e solicitar
              providências relacionadas à sua conta por meio dos canais
              disponibilizados.
            </p>
            <p>
              A Tepeyac Tech poderá restringir ou suspender o acesso em situações
              de fraude, uso ilícito, comprometimento da segurança, violação
              relevante destes Termos ou quando necessário para cumprimento de
              obrigação legal.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className="text-2xl font-semibold text-primary-color">15. Alterações dos Termos</h2>
            <p>
              Estes Termos poderão ser atualizados em razão de mudanças no
              serviço, legislação, fornecedores, funcionalidades ou práticas
              operacionais.
            </p>
            <p>
              A versão vigente ficará disponível na plataforma acompanhada da
              data de sua última atualização.
            </p>
            <p>
              Quando uma alteração tiver impacto relevante sobre a relação com
              os usuários, poderão ser adotadas medidas adicionais de comunicação
              quando apropriado.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className="text-2xl font-semibold text-primary-color">16. Legislação e foro</h2>
            <p>
              Estes Termos são regidos pelas leis da República Federativa do
              Brasil.
            </p>
            <p>
              Fica indicado o foro da comarca de Uberlândia, Minas Gerais, para
              solução de questões relacionadas a estes Termos, sem prejuízo do
              foro assegurado ao consumidor ou de outras regras legais de
              competência aplicáveis.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className="text-2xl font-semibold text-primary-color">17. Contato</h2>
            <div className="space-y-1">
              <p><strong>Tepeyac Tech Softwares Ltda.</strong></p>
              <p><strong>CNPJ:</strong> 68.719.219/0001-89</p>
              <p><strong>Produto:</strong> Controle Leiteiro</p>
              <p className="break-words">
                <strong>E-mail:</strong>{" "}
                <a
                  href="mailto:tepeyactechsoftwares@gmail.com"
                  className="break-all font-semibold text-primary-color underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-color"
                >
                  tepeyactechsoftwares@gmail.com
                </a>
              </p>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
