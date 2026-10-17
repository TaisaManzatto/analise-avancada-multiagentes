# Relatório do Tester — rodada 04

## Versão examinada

Sem Git no diretório. SHA-256 conferidos após a suíte final:

| Arquivo | SHA-256 |
|---|---|
| `projeto-dashboard/tests/test_dashboard.py` | `49D429EF9D3BADCE1FEE05F4FCD785D651A071BA4236F9C32ACCB065CB99DC06` |
| `projeto-dashboard/tests/dashboard_harness.js` | `409250D6E18B15BC74C968884DD59EAF404FF525C1FBA2F324A77D0E4F28566E` |
| `projeto-dashboard/site/index.html` | `9BC04D6C5C9A7D47375DBE0E2B4703401DA126541CF11135F725BAC539FFA007` |
| `projeto-dashboard/site/app.js` | `774060715FBEAC1082DD03A6B56F39E4C7AC7450487BA7BE6D615DEA5929F9C8` |
| `projeto-dashboard/site/styles.css` | `A06400887BD00AB40C5CDC53CA9880C795CE30EB482DA46B0FF515B1F8EEAF87` |
| `projeto-dashboard/site/dados/dashboard.json` | `A5AF9587578E4BB8AD73FC9D4B77AFA7BCC1F8CCF2BEDB1782ED5A208B817589` |

Os quatro hashes de produto acima foram comparados com `rodada-04/construtor.md` e coincidem com a versão final reportada pelo Construtor.

## Alterações e verificações

- Usei `rodada-03/revisor.md` como bug report: ele identificou que o SVG fixo de 720 unidades reduziria rótulos/valores em telas estreitas.
- O harness agora define `clientWidth = 320` em ambos os containers antes do login e da primeira renderização. Os snapshots capturam, em cada SVG, `viewBox`, `font-size` e `text-anchor` de rótulos e valores, além de coordenadas/dimensões das áreas (trilhos e barras).
- Acrescentei teste DOM que confere largura do `viewBox` igual a 320, fontes compactas com pelo menos 13 unidades, âncoras esperadas, coordenadas finitas, áreas dentro do `viewBox` e estimativas conservadoras de que rótulos/valores não invadam as barras nem sejam cortados pelas margens. A estimativa textual é um proxy geométrico sem Canvas; não é validação visual.
- Login, filtros, dados, entradas inválidas, HTTP e demais testes black-box foram preservados.

## Comandos e resultados

- `python -m unittest discover -s projeto-dashboard/tests -v` — **13 testes: 12 passaram e 1 foi ignorado; sem falhas**. Inclui o teste novo `test_compact_viewport_svg_geometry_and_text_are_bounded`.
- `node --check projeto-dashboard/tests/dashboard_harness.js` — passou.
- `Get-FileHash ... -Algorithm SHA256` — hashes da tabela acima; os hashes de produto coincidem com o relatório do Construtor.
- Verifiquei disponibilidade: `chrome`, `msedge`, `chromium`, `playwright` e `selenium` não encontrados; módulos Python `playwright` e `selenium` indisponíveis.

## Pendências e status

- `test_filter_interaction_in_real_browser` foi **IGNORADO/PENDENTE**. Não foi feita validação visual real, nem verificados cortes/colisões com métricas de browser, teclado/foco, responsividade observada ou console. O teste DOM de geometria não substitui essas verificações.

**BLOQUEADO** para aprovação integral até os testes de interface em navegador real serem executados; suíte automatizada disponível aprovada.
