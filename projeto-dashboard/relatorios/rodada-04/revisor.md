# Relatório do Revisor — rodada 04

## Versão examinada

Sem Git no diretório; versão identificada por SHA-256. Recalculei os hashes e comparei com `rodada-04/construtor.md` e `rodada-04/tester.md`. Os valores coincidem; em relação à rodada anterior, o Construtor alterou `site/app.js`, e o Tester atualizou os dois arquivos de teste.

| Arquivo | SHA-256 |
|---|---|
| `projeto-dashboard/README.md` | `961E5BA42625CDC254A0994E4A88106CE8B52E571667A70B7126E0796A40D361` |
| `projeto-dashboard/site/index.html` | `9BC04D6C5C9A7D47375DBE0E2B4703401DA126541CF11135F725BAC539FFA007` |
| `projeto-dashboard/site/styles.css` | `A06400887BD00AB40C5CDC53CA9880C795CE30EB482DA46B0FF515B1F8EEAF87` |
| `projeto-dashboard/site/app.js` | `774060715FBEAC1082DD03A6B56F39E4C7AC7450487BA7BE6D615DEA5929F9C8` |
| `projeto-dashboard/site/images/papelaria.svg` | `5E35F8CE88A29BCD50454DE89C7F7913303AE853A38BE75805FDF6DE75071353` |
| `projeto-dashboard/site/dados/dashboard.json` | `A5AF9587578E4BB8AD73FC9D4B77AFA7BCC1F8CCF2BEDB1782ED5A208B817589` |
| `projeto-dashboard/tests/test_dashboard.py` | `49D429EF9D3BADCE1FEE05F4FCD785D651A071BA4236F9C32ACCB065CB99DC06` |
| `projeto-dashboard/tests/dashboard_harness.js` | `409250D6E18B15BC74C968884DD59EAF404FF525C1FBA2F324A77D0E4F28566E` |
| `projeto-dashboard/dados/papelaria_preparados.csv` | `A4EB6C4890CFFCEF04E1F99E6C4C342974D88221C3E9B2C8D2C4E59B99199219` |
| `papelaria_limpa.csv` | `04F66503149BFAC2B9A61B2E9D284A6D0F8C87B48D72AEBF8D7ACC36A7A1A562` |
| `vendas_papelaria.csv` | `BF95B7609E30EB7E3E6A30CFC16E43D9FB5BDFC48A410E49148CCEB92E2494FF` |

## Revisão e evidências

- Comando `Get-FileHash -Algorithm SHA256` nos arquivos acima: hashes conferidos e sem divergências com os relatórios da rodada 04.
- `python -m unittest discover -s projeto-dashboard/tests -v`: **13 testes; 12 passaram e 1 foi ignorado**, sem falhas. O teste ignorado é `test_filter_interaction_in_real_browser` e permanece pendente, não aprovado.
- `node --check projeto-dashboard/site/app.js` e `node --check projeto-dashboard/tests/dashboard_harness.js`: ambos passaram sem erros de sintaxe.
- **Bug report original:** rodada 03 registrou que o SVG fixo de 720 unidades, escalado ao espaço de cerca de 254 CSS px num viewport de 320 px, tornava fontes de 16/14 unidades aproximadamente 5,6/4,9 CSS px. **A correção calculada foi implementada e confirmada por código e harness:** `app.js` usa `container.clientWidth` como largura do `viewBox` (com fallback quando a medida não existe) e em modo compacto define fontes de 13 unidades; assim, para uma largura medida de 254 px, `viewBox` de 254 unidades mantém as fontes em 13 CSS px, em vez de reduzi-las pela proporção 254/720. O harness de geometria define `clientWidth = 320` nos dois gráficos e `test_compact_viewport_svg_geometry_and_text_are_bounded` verifica `viewBox` de 320, fontes mínimas de 13, âncoras, coordenadas finitas, limites do SVG e estimativas de não colisão/corte. O teste passou.
- Distinção importante: os 320 do harness são `clientWidth` simulado do contêiner do gráfico, não um navegador com viewport real de 320 px. As estimativas de largura de texto no teste são proxy geométrico sem métricas Canvas/browser. Portanto, a reprovação anterior por dimensionamento inadequado está **corrigida pelas evidências de código/harness**, mas a aparência visual real ainda não foi aprovada.
- Os testes preservados e executados conferem reconciliação dos 180 registros, colunas, ausências/duplicatas, cálculos independentes e entradas inválidas; o harness também exercita autenticação inválida/válida, carga condicionada ao login, logout, indicadores, filtros isolados/combinados, limpar filtros e cruzamento vazio. Não encontrei regressão funcional nessa cobertura. As credenciais de demonstração e o aviso de ausência de segurança de produção continuam documentados no produto/README.
- Não fiz afirmação de validação visual. `chrome`, `msedge`, `chromium`, `playwright` e `selenium` estão indisponíveis no ambiente; os módulos Python Playwright/Selenium também não estão instalados.
- Sugestões de nomes comerciais serão fornecidas pelo Coordenador; não as avaliei nem acrescentei opções.

## Pendências e status

- **PENDENTES:** interação visual real em navegador, foco e uso por teclado, responsividade observada (inclusive em 320 px e telas maiores), verificação visual de cortes/colisões e console do navegador. Harness DOM e teste geométrico não substituem essas verificações.
- **BLOQUEADO** para aprovação conjunta, exclusivamente pelas verificações reais de interface ainda pendentes. A reprovação anterior de geometria foi corrigida de forma verificável pelo código e teste geométrico da rodada 04; sem browser, não declaro o resultado visual aprovado.
