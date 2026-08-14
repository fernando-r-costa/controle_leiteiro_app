# Contexto do projeto — Controle Leiteiro Frontend

Este projeto é o frontend atual do Controle Leiteiro.

## Integração com a API

- O objetivo futuro é consumir `/api/controle-leiteiro` da `frc-api`.
- Alterar o frontend somente depois de o backend novo estar validado.
- A URL da API deve continuar configurável por ambiente. Não introduzir nem alterar URL hardcoded sem necessidade comprovada.
- Preservar temporariamente a possibilidade de rollback para a API antiga `controle_leiteiro_API`.

## Modo de trabalho

- Trabalhar em mudanças pequenas, isoladas e rastreáveis.
- Não fazer refatorações, reorganizações ou melhorias paralelas.
- Não acessar nem alterar banco de dados a partir deste projeto ou de seus testes.
- Antes de editar, executar `git status` e preservar mudanças existentes.
- Depois de editar, revisar `git diff` e executar `git diff --check`.
- Não avançar automaticamente para outra etapa além da autorizada.

## Validação

Usar os scripts reais do projeto conforme a tarefa:

- `npm run lint`;
- `npm run build` para validação de TypeScript e compilação;
- `npm run dev` ou `npm run start` somente quando um smoke test for necessário.

