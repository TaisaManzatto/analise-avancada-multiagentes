# Relatório do Construtor — rodada 04

## Versão examinada

Sem Git no diretório. A correção de produto desta rodada altera somente `site/app.js`; README, demais arquivos de site, dados e testes não foram editados. SHA-256 da versão final:

| Arquivo | SHA-256 |
|---|---|
| `README.md` (inalterado) | `961E5BA42625CDC254A0994E4A88106CE8B52E571667A70B7126E0796A40D361` |
| `site/index.html` (inalterado) | `9BC04D6C5C9A7D47375DBE0E2B4703401DA126541CF11135F725BAC539FFA007` |
| `site/styles.css` (inalterado) | `A06400887BD00AB40C5CDC53CA9880C795CE30EB482DA46B0FF515B1F8EEAF87` |
| `site/app.js` | `774060715FBEAC1082DD03A6B56F39E4C7AC7450487BA7BE6D615DEA5929F9C8` |
| `site/images/papelaria.svg` (inalterado) | `5E35F8CE88A29BCD50454DE89C7F7913303AE853A38BE75805FDF6DE75071353` |
| `site/dados/dashboard.json` (inalterado) | `A5AF9587578E4BB8AD73FC9D4B77AFA7BCC1F8CCF2BEDB1782ED5A208B817589` |
| `dados/papelaria_preparados.csv` (inalterado) | `A4EB6C4890CFFCEF04E1F99E6C4C342974D88221C3E9B2C8D2C4E59B99199219` |
| `papelaria_limpa.csv` (inalterado) | `04F66503149BFAC2B9A61B2E9D284A6D0F8C87B48D72AEBF8D7ACC36A7A1A562` |
| `vendas_papelaria.csv` (inalterado) | `BF95B7609E30EB7E3E6A30CFC16E43D9FB5BDFC48A410E49148CCEB92E2494FF` |

## Correção

- Atendida a reprovação do Revisor: os dois SVG agora dimensionam o `viewBox` em CSS pixels com `container.clientWidth` quando disponível; quando ausente ou inválido, usam 720 como fallback compatível com o DOM harness.
- Em largura compacta, o gráfico dispõe rótulos, barras e valores em colunas compactas. Fontes são 13 unidades do `viewBox` (correspondem a 13 CSS px quando a largura medida é usada); valor fica alinhado à direita, com coluna reservada de ao menos 96 unidades e margem final. Em 320 px de viewport, a área interna típica medida foi simulada com 254 px.
- Um listener de `resize` redesenha somente os gráficos usando a seleção ativa. Não altera filtros, dados, cálculos, agregações ou agrupamentos.
- Não editei `tests/`, dados ou relatórios de Tester/Revisor.

## Comandos e verificações

Executados na raiz do projeto:

| Comando/verificação | Resultado | Evidência |
|---|---|---|
| `node --check .\projeto-dashboard\site\app.js` | Passou | Sem erros de sintaxe. |
| `node .\projeto-dashboard\tests\dashboard_harness.js .\projeto-dashboard\site\dados\dashboard.json .\projeto-dashboard\site\app.js` | Passou | Login, logout, filtros e resultados anteriores exercitados; DOM harness sem `clientWidth` usou fallback sem erro. Total inicial R$ 20.059,00 e 180 linhas. |
| `python -m unittest discover -s projeto-dashboard/tests -v` | **12 testes: 11 passaram, 1 ignorado** | Suíte completa executada após a alteração. O teste de interação em navegador foi ignorado porque Playwright/Selenium e navegador não estão disponíveis. |
| Smoke de geometria responsiva em memória, adaptando o harness sem gravar/alterar arquivo de teste | Passou | Com containers de 254 px: ambos os `viewBox` ficaram em 254 unidades, textos em 13 unidades, valores ancorados em x=250 e barras sem invadir a âncora dos valores. Alterando a largura para 400 px e disparando resize, ambos os `viewBox` foram atualizados para 400 e âncoras para x=396. |

## Pendências

- **PENDENTE:** inspeção visual e interação em navegador real em viewport de 320 px e telas maiores, incluindo verificação de cortes/colisões, teclado e console. Nenhum teste visual real foi declarado aprovado; encaminhar ao Tester/Revisor para validação independente.

## Status

**Construtor: APROVADO** para a correção de layout e fallback, com checks automatizados e smoke de geometria aprovados.

**Validação visual em navegador: PENDENTE.** A suíte ignorou o caso de navegador; isso não conta como aprovação.
