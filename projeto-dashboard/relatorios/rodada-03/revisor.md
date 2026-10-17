# Relatório do Revisor — rodada 03

## Versão examinada

Sem repositório Git; versão identificada por SHA-256. Calculei os hashes localmente e confrontei-os com `rodada-03/construtor.md` e `rodada-03/tester.md`: todos os valores abaixo coincidem com os relatórios correspondentes.

| Arquivo | SHA-256 |
|---|---|
| `projeto-dashboard/README.md` | `961E5BA42625CDC254A0994E4A88106CE8B52E571667A70B7126E0796A40D361` |
| `projeto-dashboard/site/index.html` | `9BC04D6C5C9A7D47375DBE0E2B4703401DA126541CF11135F725BAC539FFA007` |
| `projeto-dashboard/site/styles.css` | `A06400887BD00AB40C5CDC53CA9880C795CE30EB482DA46B0FF515B1F8EEAF87` |
| `projeto-dashboard/site/app.js` | `C03DDB09229D7B4E12B71EEC92CA6C6164D3485DB0C766DEAB3C50E0C17696AE` |
| `projeto-dashboard/site/images/papelaria.svg` | `5E35F8CE88A29BCD50454DE89C7F7913303AE853A38BE75805FDF6DE75071353` |
| `projeto-dashboard/site/dados/dashboard.json` | `A5AF9587578E4BB8AD73FC9D4B77AFA7BCC1F8CCF2BEDB1782ED5A208B817589` |
| `projeto-dashboard/tests/test_dashboard.py` | `D2E4774E080000BE3B144AADFB51E2A76963C02776795619B2130CB890EC11BC` |
| `projeto-dashboard/tests/dashboard_harness.js` | `4A68CCCB9A0138B6558690D294D02952388402CED42467FDB064201E12A4E5C2` |
| `projeto-dashboard/dados/papelaria_preparados.csv` | `A4EB6C4890CFFCEF04E1F99E6C4C342974D88221C3E9B2C8D2C4E59B99199219` |
| `papelaria_limpa.csv` | `04F66503149BFAC2B9A61B2E9D284A6D0F8C87B48D72AEBF8D7ACC36A7A1A562` |
| `vendas_papelaria.csv` | `BF95B7609E30EB7E3E6A30CFC16E43D9FB5BDFC48A410E49148CCEB92E2494FF` |

## Revisão e evidências

- Rodei `python -m unittest discover -s projeto-dashboard/tests -v`: **12 testes; 11 passaram e 1 foi ignorado**. O ignorado foi `test_filter_interaction_in_real_browser`, com motivo explícito de indisponibilidade de navegador/Playwright/Selenium. Não contei o harness Node como teste em navegador.
- Evidência independente desta revisão para os hashes: `Get-FileHash -Algorithm SHA256` nos 11 arquivos listados acima. README e hashes de produto/dados coincidem com o Construtor; hashes de produto/dados e testes coincidem com o Tester. Sem divergências.
- A identidade visual está alinhada ao pedido: cores creme, sálvia, rosa antigo, manteiga e azul tinta; títulos e base usam Georgia/Times New Roman locais. O SVG original está em `site/images/papelaria.svg`, é referenciado localmente nas telas e não depende de serviço externo.
- O texto escuro sobre fundos claros tem contraste adequado nas combinações principais. Calculei contraste WCAG de amostras com `node -e` (luminância relativa): tinta `#263747`/papel `#f6f1e5` = **10,83:1**; texto secundário `#4f5d61`/superfície `#fffdf7` = **6,72:1**; sálvia `#45675b`/sálvia clara `#dbe6d8` = **4,88:1**; texto branco quente/sálvia = **6,17:1**; rosa antigo `#80505d`/rosa claro `#efd9d7` = **4,83:1**. São verificações de amostras, não auditoria completa de interface.
- Há um problema de legibilidade móvel verificável no código: os dois gráficos usam SVG com `viewBox` de 720 unidades e largura de 100%, enquanto os rótulos/valores são fixados em 16/14 unidades (`site/app.js`, linhas 42–47, 65–90; `site/styles.css`, linha 90). Em viewport de 375 px, a largura interna aproximada do gráfico é 323 px, reduzindo esses textos para cerca de **7,2 px e 6,3 px**; em 320 px, ficam perto de **6,0 px e 5,2 px**. Portanto os valores/rótulos dos gráficos ficam pequenos demais em telas estreitas, apesar do grid empilhado. Retornar ao **Construtor** para ajustar a apresentação dos gráficos em celular; confirmar visualmente em navegador depois da correção.
- O login é claramente apresentado como demonstração. `demo` / `papelaria2026` estão visíveis no HTML e definidos em `site/app.js`; o aviso diz que a validação ocorre no navegador e não oferece segurança de produção. O harness confirma login inválido, login válido, carga de dados após autenticação e logout. Isso é aceitável somente como demonstração pública, nunca como controle de acesso a dados privados.
- O painel mantém indicadores, gráficos, tabela, filtros por cidade/categoria, limpeza dos filtros e estado vazio; o harness testa filtros isolados/combinados, limpeza e cruzamento vazio, e os testes verificam os resultados e a consistência com os registros. O README agora documenta corretamente o comando unittest, servidor HTTP, pasta publicável e limitações do login.
- Sobre nome comercial: `rodada-03/construtor.md` recomenda não atribuir nome final e tratar “Caderno de vendas” como texto genérico/provisório. Não há opções alternativas de nomes recomendadas no relatório; a marca permanece a definir. Não inferi nem sugeri nomes novos.
- Verifiquei a disponibilidade no ambiente: `chrome`, `msedge`, `chromium`, `playwright` e `selenium` indisponíveis; os módulos Python `playwright` e `selenium` também não estão instalados. Skills `.agents/skills/explore-data/SKILL.md`, `.agents/skills/data-visualization/SKILL.md` e `.agents/skills/validate-data/SKILL.md` ausentes; não afirmo uso delas.

## Pendências

- **PENDENTES:** teste real em navegador, interação visual, uso completo por teclado/foco, responsividade observada em telas pequenas e grandes, e erros de console. A indisponibilidade de browser/harness limita a verificação; não significa que esses testes passaram.
- Correção da escala tipográfica dos gráficos em celular deve voltar ao Construtor. Após ajuste, reexecutar os testes afetados e fazer a validação visual em browser.

## Status

**REPROVADO nesta versão por legibilidade dos rótulos/valores dos gráficos em viewport móvel, conforme escala calculável no SVG.** A aprovação integral também permanece bloqueada pelas verificações reais de navegador, teclado e responsividade, que estão **PENDENTES**.
