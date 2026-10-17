# Relatório do Tester — rodada 01

## Versão examinada

Sem Git no diretório. SHA-256 dos testes e dos artefatos testados:

| Arquivo | SHA-256 |
|---|---|
| `tests/test_dashboard.py` | `DF2F043CEBD694C7E749770A9F83A4CF8C4572FFD6904637B72B74040452EB9B` |
| `tests/dashboard_harness.js` | `3EA7320AFBCAE506D3CE829EC5738D47F628787033C00ADFDCA5176AE5B93C44` |
| `preparar_dados.py` | `9BF657F562FD67C63004C90CCFE87ECCC83A851BAC140AC68D9105F629FCC788` |
| `README.md` | `76F54F740E2895635122F352C6093688357A3EBE578E65D61D85E8D5C6524F85` |
| `dados/papelaria_preparados.csv` | `A4EB6C4890CFFCEF04E1F99E6C4C342974D88221C3E9B2C8D2C4E59B99199219` |
| `site/index.html` | `937BD1E239543FEFA028FA4AC32F410387BEBFE15259D27B8E3CCCD86BFD11A8` |
| `site/styles.css` | `BCA016D82AF30F65B9C17388E7FCA174F15E6DBDD601C8C7760354F0DDA3EBD9` |
| `site/app.js` | `D696429D68E77A2E5E04B60A4D95BB7E1782010D44589727E08C28BCA07A8E93` |
| `site/dados/dashboard.json` | `A5AF9587578E4BB8AD73FC9D4B77AFA7BCC1F8CCF2BEDB1782ED5A208B817589` |

## Construído e conferido

- Acrescentados testes `unittest` black-box e um harness Node com DOM mínimo, sem dependências adicionais. O harness executa o `app.js` real; não substitui navegador.
- Confirmados hashes de preservação do CSV limpo e do original, schema de 9 colunas, 180 registros, ausência de nulos/duplicatas, IDs únicos, tipos e `valor_venda = quantidade × preco_unitario`.
- Reconciliados independentemente os registros do JSON e do CSV preparado com `papelaria_limpa.csv`; recalculados total R$ 20.059,00, 548 unidades, 180 vendas e ticket médio. A fixture manual conhecida confere total R$ 65,00 e grupos esperados.
- No JavaScript do painel, testados separadamente cidade e categoria, combinação, limpar filtros, KPIs, totais dos dois gráficos, IDs/contagem da tabela e cruzamento vazio em fixture. Não houve `NaN` ou divisão por zero.
- Conferidos controles e rótulos do HTML, sintaxe de `app.js` via Node e carregamento HTTP do HTML, CSS, JavaScript e JSON sem referência local ausente.
- Skills solicitadas em `.agents/skills/explore-data/SKILL.md`, `.agents/skills/data-visualization/SKILL.md` e `.agents/skills/validate-data/SKILL.md` não foram encontradas. Não afirmo tê-las usado.

## Comandos e evidências

- `python -m unittest discover -s projeto-dashboard/tests -v` — **7 testes; 6 passaram e 1 foi ignorado como pendente**. A saída foi executada após o alinhamento de `site/dados/dashboard.json` com o caminho de carga do site.
- O teste HTTP inicia `ThreadingHTTPServer` localmente, busca `/index.html` e referências estáticas/dinâmicas, incluindo `/dados/dashboard.json`; retorna HTTP 200.
- O teste de JavaScript executa `node --check`; o harness interativo executa `node tests/dashboard_harness.js ...` e compara resultados de forma independente com os dados.
- Playwright, Selenium e executáveis de navegador não estão disponíveis. Interação visual real, teclado/foco, console do navegador e responsividade em telas pequenas/grandes: **PENDENTES**. Não substituí essas verificações pelo harness nem as declarei aprovadas.
- `pytest` não está instalado; README usa `unittest` da biblioteca padrão, comando executado acima.

## Problemas e retorno

- Durante a inspeção inicial, o painel buscava o JSON num local diferente da pasta servida. O Construtor alinhou o artefato para `site/dados/dashboard.json`; a suíte HTTP passou depois dessa correção. Nenhum defeito de produto conhecido permaneceu nos testes executáveis.
- Próximo passo: Revisor deve revisar a cobertura e os resultados desta versão; executar testes reais em navegador quando houver acesso. Não há correção de produto pendente identificada pelo Tester.

## Status

**BLOQUEADO** para aprovação completa: testes executáveis passaram, mas validação obrigatória em navegador, acessibilidade por teclado e responsividade visual permanecem **PENDENTES** por falta de ferramenta/acesso. O teste de navegador foi ignorado, não aprovado.
