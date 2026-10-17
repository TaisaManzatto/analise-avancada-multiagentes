# Relatório do Revisor — rodada 05

## Versão examinada e hashes

Sem Git no diretório. Recalculei hashes com `Get-FileHash -Algorithm SHA256`; os hashes do SVG, HTML e testes coincidem com `rodada-05/construtor.md` e `rodada-05/tester.md` (maiúsculas/minúsculas não alteram o valor).

| Arquivo | SHA-256 |
|---|---|
| `projeto-dashboard/site/images/papelaria.svg` | `577ABA1A246225169E57D945EC796A26A114DCEBB9EE74844E2D41F58986C50D` |
| `projeto-dashboard/site/index.html` | `9BC04D6C5C9A7D47375DBE0E2B4703401DA126541CF11135F725BAC539FFA007` |
| `projeto-dashboard/site/styles.css` | `A06400887BD00AB40C5CDC53CA9880C795CE30EB482DA46B0FF515B1F8EEAF87` |
| `projeto-dashboard/site/app.js` | `774060715FBEAC1082DD03A6B56F39E4C7AC7450487BA7BE6D615DEA5929F9C8` |
| `projeto-dashboard/tests/test_dashboard.py` | `49D429EF9D3BADCE1FEE05F4FCD785D651A071BA4236F9C32ACCB065CB99DC06` |
| `projeto-dashboard/tests/dashboard_harness.js` | `409250D6E18B15BC74C968884DD59EAF404FF525C1FBA2F324A77D0E4F28566E` |
| `projeto-dashboard/README.md` | `961E5BA42625CDC254A0994E4A88106CE8B52E571667A70B7126E0796A40D361` |

## Inspeção e evidências

- Rodei `python -m unittest discover -s projeto-dashboard/tests -v`: **13 testes, 12 passaram e 1 foi ignorado**, sem falhas. O ignorado é `test_filter_interaction_in_real_browser`; não o considero aprovado.
- Rodei um `python -c` independente com `xml.etree.ElementTree` e SHA-256: XML válido; raiz SVG e `viewBox="0 0 360 300"` presentes; `role="img"`, `aria-labelledby="title description"`, título/descrição, fundo `#f1f2ef` e ausência de `href`, `src`, `@import` e `url()` conferidos. Resultado: **1.447 bytes**, hash `577aba1a246225169e57d945ec796a26a114dcebb9ee74844e2d41f58986c50d`.
- O SVG usa formas vetoriais simples e paleta discreta; o retângulo de fundo é cinza muito claro/neutro. A ilustração representa um caderno aberto (duas páginas, lombada e linhas) e um lápis. Não depende de fontes, imagens, scripts ou recursos externos.
- `grep` em `site/index.html` encontrou as duas referências locais `./images/papelaria.svg` (tela de acesso e cabeçalho). Ambas usam `alt=""`; no cabeçalho há ainda `aria-hidden="true"`, e a ilustração de acesso está dentro de um contêiner `aria-hidden="true"`. A imagem está, portanto, tratada como decorativa na interface; isso é consistente com o texto próximo e não duplica conteúdo para leitor de tela. O SVG mantém título e descrição acessíveis quando usado isoladamente.
- A suíte também executou `test_site_assets_load_over_local_http_and_javascript_parses`, que verifica resposta HTTP dos recursos locais referenciados e sintaxe JS. O relatório do Tester registra ainda uma checagem específica do SVG em HTTP: status 200, MIME `image/svg+xml`, 1.447 bytes e igualdade byte a byte/hash com o arquivo local. Isso é evidência registrada pelo Tester; não alego inspeção visual do recurso no browser.
- **Ressalva de conteúdo:** a descrição/título e o relatório do Construtor dizem que o lápis está “ao lado”, mas a geometria do caminho do lápis (`site/images/papelaria.svg`, linha 9) ocupa aproximadamente x=281–321; a página direita do caderno se estende até x=312 na mesma faixa vertical (linhas 6–7). Assim, boa parte do lápis está sobreposta à página, não claramente posicionada ao lado do caderno. O teste do Tester confere elementos, cores, metadados e recursos externos, mas não verifica essa relação espacial. Recomendo ao Construtor deslocar o lápis para fora da silhueta do caderno se “ao lado” for requisito literal. Esta avaliação decorre das coordenadas do SVG, não de renderização em navegador.
- Os arquivos de skills `.agents/skills/*/SKILL.md` não foram encontrados; não afirmo uso de skills.

## Pendências e status

- **PENDENTE:** inspeção visual/interação em navegador real. `chrome`, `msedge`, `chromium`, `playwright` e `selenium` não estão disponíveis; módulos Python Playwright/Selenium também ausentes. Layout, aparência renderizada e acessibilidade observada em browser não foram aprovados.
- **REPROVADO quanto ao requisito literal de posicionar o lápis ao lado:** o path atual sobrepõe a página. A estrutura SVG, o fundo neutro, a simplicidade, a acessibilidade intrínseca e as referências locais estão conformes. Browser real permanece **PENDENTE**, sem inferência de aprovação visual.
