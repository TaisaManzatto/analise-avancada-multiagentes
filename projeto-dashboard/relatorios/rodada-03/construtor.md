# Relatório do Construtor — rodada 03

## Versão examinada

Sem Git no diretório. Versão identificada pelos hashes SHA-256 abaixo. Nesta rodada foram alterados apenas README e arquivos de produto em `site/`; CSVs e JSON preparados permaneceram sem alteração.

| Arquivo | SHA-256 |
|---|---|
| `README.md` | `961E5BA42625CDC254A0994E4A88106CE8B52E571667A70B7126E0796A40D361` |
| `site/index.html` | `9BC04D6C5C9A7D47375DBE0E2B4703401DA126541CF11135F725BAC539FFA007` |
| `site/styles.css` | `A06400887BD00AB40C5CDC53CA9880C795CE30EB482DA46B0FF515B1F8EEAF87` |
| `site/app.js` | `C03DDB09229D7B4E12B71EEC92CA6C6164D3485DB0C766DEAB3C50E0C17696AE` |
| `site/images/papelaria.svg` | `5E35F8CE88A29BCD50454DE89C7F7913303AE853A38BE75805FDF6DE75071353` |
| `site/dados/dashboard.json` (inalterado) | `A5AF9587578E4BB8AD73FC9D4B77AFA7BCC1F8CCF2BEDB1782ED5A208B817589` |
| `dados/papelaria_preparados.csv` (inalterado) | `A4EB6C4890CFFCEF04E1F99E6C4C342974D88221C3E9B2C8D2C4E59B99199219` |
| `papelaria_limpa.csv` (inalterado) | `04F66503149BFAC2B9A61B2E9D284A6D0F8C87B48D72AEBF8D7ACC36A7A1A562` |
| `vendas_papelaria.csv` (inalterado) | `BF95B7609E30EB7E3E6A30CFC16E43D9FB5BDFC48A410E49148CCEB92E2494FF` |

## Construído

- Correção documental posterior: README agora diz que os testes automatizados em `projeto-dashboard/tests/` já existem e mostra o comando `unittest`; nenhum produto, dado ou teste foi alterado nesta correção.
- Refatorado o visual para estilo vintage/pastel com fundo creme, sage/mint, rosa antigo, amarelo manteiga, azul tinta e tipografia serifada local, mantendo contraste escuro para textos e dados.
- Criada ilustração original de papelaria em `site/images/papelaria.svg`, sem dependência externa, usada na tela de acesso e no cabeçalho.
- Adicionada tela de login demonstrativa com IDs `login-form`, `login-user`, `login-password`, `login-error`, shell `dashboard-app` e botão `logout-button`. Credenciais visíveis na tela: `demo` / `papelaria2026`; a constante `DEMO_CREDENTIALS` em `site/app.js` é o local para alterá-las. JSON só é carregado após autenticação no site; logout retorna à tela de acesso.
- Atalho de teclado para pular conteúdo acompanha a tela ativa: aponta para o título do login antes da autenticação e para o painel depois de entrar.
- Mantidos sem alteração semântica os filtros de cidade/categoria, indicadores, agregações, tabela, estados vazios e mensagens existentes. README documenta uso, limitações do login no cliente, edição de credenciais/cores/fonte e publicação estática.
- Não foi atribuído nome final à empresa. Recomendação ao Coordenador para o `relatorios/FINAL.md`: registrar que o nome comercial permanece indefinido; “Caderno de vendas” é somente texto genérico/provisório da interface.

## Comandos e verificações

Executados a partir da raiz do projeto:

| Comando/verificação | Resultado | Evidência |
|---|---|---|
| `node --check .\projeto-dashboard\site\app.js` | Passou | Sem erros de sintaxe, saída vazia. |
| `node .\projeto-dashboard\tests\dashboard_harness.js .\projeto-dashboard\site\dados\dashboard.json .\projeto-dashboard\site\app.js` | Passou no smoke de integração | Login inválido impede submit e não carrega JSON; login válido abre o painel e carrega uma vez; logout volta ao login. Indicadores renderizados com 180 linhas e total R$ 20.059,00. |
| `python -m unittest discover -s projeto-dashboard/tests -v` | Reexecutado após a correção documental: 12 testes executados, 11 passaram e 1 foi ignorado | Cobertura de dados, contrato estático/HTTP, sintaxe JS e lógica de filtros. O teste de navegador foi ignorado por indisponibilidade de Playwright/Selenium e navegador; não há declaração de teste em navegador. |
| GET em `http://localhost:8000/{index.html,styles.css,app.js,images/papelaria.svg,dados/dashboard.json}` | Todos retornaram HTTP 200 | Checagem PowerShell usando `Invoke-WebRequest`; servidor preexistente refletiu os arquivos locais. |
| Checagem de skills `.agents/skills/*/SKILL.md` | Não disponíveis | Nenhuma dessas skills foi lida ou usada nesta execução. |

## Pendências e retorno

- Interação em navegador real, visualização em telas pequenas/grandes, teclado/foco e console permanecem **PENDENTES**; devem ser conferidos pelo Tester/Revisor em navegador compatível. O teste ignorado não conta como aprovação.
- Não editei `tests/`, dados ou relatórios Tester/Revisor. Não há retorno pendente ao Construtor nesta versão, salvo defeitos que sejam encontrados na revisão/testes de navegador.

## Status

**Construtor: APROVADO** para as alterações de produto desta rodada; smoke automatizado e suíte disponível passaram, com um teste de navegador pendente.

**Status global: BLOQUEADO/PENDENTE** até a execução e revisão independente dos testes de interface em navegador real.
