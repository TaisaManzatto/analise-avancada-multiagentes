# Relatório do Revisor — rodada 01

## Versão examinada

Sem Git no diretório. SHA-256 recalculados durante a revisão (hexadecimal):

| Arquivo | SHA-256 |
|---|---|
| `preparar_dados.py` | `9bf657f562fd67c63004c90ccfe87eccc83a851bac140ac68d9105f629fcc788` |
| `README.md` | `76f54f740e2895635122f352c6093688357a3ebe578e65d61d85e8d5c6524f85` |
| `dados/papelaria_preparados.csv` | `a4eb6c4890cffcef04e1f99e6c4c342974d88221c3e9b2c8d2c4e59b99199219` |
| `site/index.html` | `937bd1e239543fefa028fa4ac32f410387bebfe15259d27b8e3cccd86bfd11a8` |
| `site/styles.css` | `bca016d82af30f65b9c17388e7fca174f15e6dbdd601c8c7760354f0dda3ebd9` |
| `site/app.js` | `d696429d68e77a2e5e04b60a4d95bb7e1782010d44589727e08c28bca07a8e93` |
| `site/dados/dashboard.json` | `a5af9587578e4bb8ad73fc9d4b77afa7bcc1f8ccf2bedb1782ed5a208b817589` |
| `tests/test_dashboard.py` | `df2f043cebd694c7e749770a9f83a4cf8c4572ffd6904637b72b74040452eb9b` |
| `tests/dashboard_harness.js` | `3ea7320afbcae506d3ce829ec5738d47f628787033c00adfdca5176ae5b93c44` |
| `relatorios/rodada-01/construtor.md` | `40e295952a889f50ec6b0ee08268c039796df2a1753e4e411493bec83b695694` |
| `relatorios/rodada-01/tester.md` | `f3cc85b9cb147212f8864ef4283b58a25179d7320bc524f93841e54d44189322` |
| `papelaria_limpa.csv` (fonte) | `04f66503149bfac2b9a61b2e9d284a6d0f8c87b48d72aebf8d7acc36a7a1a562` |
| `vendas_papelaria.csv` (original) | `bf95b7609e30eb7e3e6a30cfc16e43d9fb5bdfc48a410e49148cceb92e2494ff` |

Hashes do produto, testes e fontes conferem com `construtor.md` e `tester.md`; os relatórios anteriores correspondem à mesma versão examinada. Não há commit Git.

## Revisão independente e evidências

- Recalculei por leitura CSV/JSON e multiplicação de quantidade × preço, sem usar o cálculo agregado do construtor: 180 linhas/IDs únicos, zero campos vazios na fonte, zero duplicatas de ID, 548 unidades, total R$ 20.059,00 e ticket R$ 111,44 (valor exato antes do arredondamento: R$ 111,438888…). O JSON declara o hash correto da fonte. CSV preparado e JSON reconciliam com a fonte por ID.
- Totais recalculados: categoria Acessórios R$ 10.517,00; Livros R$ 7.438,00; Papelaria R$ 2.104,00. Cidade: Campinas R$ 8.578,00; Santos R$ 6.937,50; Sorocaba R$ 4.543,50. Não encontrei divergências nos números declarados nos relatórios.
- Revisei `preparar_dados.py`, `site/`, `dados/`, `tests/` e `README.md`: regras de uma venda por linha/ID estão documentadas; o script não remove duplicatas, falha se detectar IDs repetidos e verifica colunas, ausências, valores e cálculo. HTML apresenta três KPIs, dois gráficos, tabela, filtros por cidade/categoria, limpeza e estado vazio. O README documenta preparo, suíte `unittest`, servidor HTTP local e pasta `site/` publicável.
- Comando executado: `python -m unittest discover -s projeto-dashboard/tests -v` — 7 testes: 6 passaram; o teste de navegador foi skipped, não aprovado. Evidência de saída: execução nesta revisão; registro persistente: `relatorios/rodada-01/tester.md`.
- Comando executado: `node --check projeto-dashboard/site/app.js; node --check projeto-dashboard/tests/dashboard_harness.js` — ambos retornaram sucesso (sem saída). A suíte também verificou carregamento HTTP dos assets e harness DOM para filtros, estados e agregações; são evidências sem navegador real.
- Comando de hash e recálculo independente executado em PowerShell usando Python embutido; resultados listados acima. A sondagem de executáveis encontrou `node.exe`; não encontrou Chrome/Edge e não há Playwright/Selenium, conforme também registrado pelo Tester.
- Os caminhos `.agents/skills/explore-data/SKILL.md`, `.agents/skills/data-visualization/SKILL.md` e `.agents/skills/validate-data/SKILL.md` não foram encontrados. Não afirmo que foram lidos ou usados.

## Issues e pendências

1. **PENDENTE / bloqueio de ambiente — interface real:** não foram verificados interação real em navegador, foco/teclado, console e apresentação responsiva em viewport pequeno/grande. O harness DOM e testes HTTP não substituem essas verificações. Retorno ao coordenador/construtor para executar a suíte visual quando houver navegador disponível; repetir revisão após evidências.
2. **Cobertura de limites do preparo (observação, não divergência encontrada):** testes registrados validam a fonte atual e os artefatos, mas não exercitam entradas inválidas do script (colunas extras/ausentes, nulos, IDs repetidos e cálculo inconsistente). Recomendo acrescentar testes negativos reproduzíveis em rodada posterior; não os considero aprovados nesta revisão.

Não encontrei defeito factual nos totais conferidos ou discrepância entre os hashes declarados e a versão observada. Isso não elimina a pendência obrigatória de interface.

## Status

**BLOQUEADO** para aprovação conjunta: cálculos, hashes e testes executáveis conferem, mas os testes obrigatórios em navegador, teclado e responsividade permanecem **PENDENTES** por indisponibilidade de ferramentas. A aprovação individual do Construtor não equivale a aprovação conjunta; esta revisão não declara o projeto aprovado.
