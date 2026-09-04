# Contexto do projeto — Controle Leiteiro Frontend

Este projeto é o frontend atual do Controle Leiteiro.

## Backend e integração

- O backend atual do Controle Leiteiro é o módulo:
  `frc-api/src/modules/controle-leiteiro`.
- As integrações devem consumir `/api/controle-leiteiro` da `frc-api`.
- A URL da API deve permanecer configurável por ambiente.
- Não introduzir URL hardcoded sem necessidade comprovada.
- Não alterar a `frc-api` a partir deste workspace.
- Preservar os contratos atuais entre frontend e backend, salvo alteração explicitamente autorizada.

## Escopo

- Alterar somente os arquivos necessários para a tarefa solicitada.
- Não fazer refatorações, reorganizações ou melhorias paralelas.
- Não mudar arquitetura, bibliotecas, padrões ou estrutura do projeto sem autorização.
- Não instalar, remover ou atualizar dependências sem autorização.
- Não alterar arquivos de ambiente sem necessidade explicitamente autorizada.
- Nunca expor segredos, tokens, credenciais ou valores sensíveis.
- Não acessar nem alterar banco de dados a partir deste projeto ou de seus testes.
- Não alterar backend, infraestrutura ou outros projetos a partir deste workspace.

## Modo de trabalho

- Trabalhar em mudanças pequenas, isoladas e rastreáveis.
- Antes de editar, executar `git status --short` e preservar alterações existentes.
- Quando a tarefa já estiver claramente delimitada, inspecionar somente os arquivos e trechos necessários.
- Evitar auditorias amplas do repositório quando elas não forem necessárias para a tarefa.
- Preferir reutilizar componentes, hooks, helpers, services e padrões já existentes.
- Evitar criar abstrações novas quando a solução puder ser implementada de forma simples dentro do padrão atual.
- Não modificar código fora do escopo apenas para melhorar estilo, nomenclatura ou organização.
- Não avançar automaticamente para outra etapa além da autorizada.
- Se durante a tarefa surgir necessidade de alterar outro arquivo ou ampliar o escopo, parar e explicar antes de editar.
- Não fazer commit, push, merge ou deploy sem autorização explícita.

## Eficiência de execução

- Não repetir análises já concluídas quando o estado relevante do projeto não mudou.
- Não reler arquivos grandes ou áreas não relacionadas sem necessidade.
- Para mudanças simples e localizadas, ir diretamente ao trecho necessário após verificar o estado do Git.
- Usar somente as validações proporcionais ao risco e ao tipo da alteração.
- Não criar harnesses, mocks, testes temporários ou scripts auxiliares quando uma validação direta for suficiente.
- Se um teste temporário for realmente necessário, não deixar artefatos de teste no projeto.

## Validação

Usar somente as validações necessárias para a alteração realizada.

Scripts disponíveis:

- `npm run lint`
- `npm run build`
- `npm run dev`
- `npm run start`

Regras:

- usar `npm run lint` quando relevante aos arquivos alterados;
- usar `npm run build` quando a alteração exigir validação de TypeScript, compilação ou integração do projeto;
- usar `npm run dev` ou `npm run start` somente quando um smoke test for realmente necessário;
- não executar validações pesadas sem necessidade;
- após editar, revisar o diff específico dos arquivos alterados;
- executar `git diff --check`;
- confirmar que nenhum arquivo fora do escopo foi alterado.

## Finalização

Ao concluir uma tarefa:

- informar somente os arquivos efetivamente alterados;
- resumir objetivamente a mudança realizada;
- informar as validações executadas e seus resultados;
- informar `git status --short`;
- mencionar qualquer limitação ou ponto não validado, se existir;
- parar sem iniciar outra tarefa.