# Relatório do Revisor — rodada 06

## Versão examinada e hashes

Sem Git no diretório. Recalculei os hashes e comparei com `rodada-06/construtor.md` e `rodada-06/tester.md`; coincidem (maiúsculas/minúsculas apenas variam na apresentação).

| Arquivo | SHA-256 |
|---|---|
| `projeto-dashboard/site/images/papelaria.svg` | `2367EF7A24C799CB497B419BF33BEC71C3C6658F43300DC728E1451FE903DE31` |
| `projeto-dashboard/site/index.html` | `9BC04D6C5C9A7D47375DBE0E2B4703401DA126541CF11135F725BAC539FFA007` |
| `projeto-dashboard/tests/test_dashboard.py` | `49D429EF9D3BADCE1FEE05F4FCD785D651A071BA4236F9C32ACCB065CB99DC06` |
| `projeto-dashboard/tests/dashboard_harness.js` | `409250D6E18B15BC74C968884DD59EAF404FF525C1FBA2F324A77D0E4F28566E` |
| `projeto-dashboard/relatorios/rodada-06/construtor.md` | `CDF48EBDAFB4278BFCF1932EB90FDBEBB4C9BCB675AD3CBC2A72E3CC3D568027` |

## Revisão e evidências

- Rodei `python -m unittest discover -s projeto-dashboard/tests -v`: **13 testes, 12 passaram, 1 foi ignorado**, sem falhas. O ignorado foi `test_filter_interaction_in_real_browser`, pendente por falta de navegador/Playwright/Selenium.
- Rodei inspeção independente do SVG com `python -c` e `xml.etree.ElementTree`: XML válido; `viewBox="0 0 400 300"`, `role="img"`, `aria-labelledby="title description"`, título e descrição presentes. O SHA-256 calculado foi `2367ef7a24c799cb497b419bf33bec71c3c6658f43300dc728e1451fe903de31` (1.500 bytes), igual aos relatórios do Construtor e Tester.
- **Defeito da rodada 05:** a ilustração anterior colocava o lápis sobre a página direita. Nesta versão, o grupo do lápis tem `transform="translate(48 0)"`. A borda direita da página fica aproximadamente em x=312; somando metade do contorno de 5 px, chega a x≈314,5. A borda esquerda do lápis, considerando transformação e metade do stroke de 4 px, fica em x≈327. A folga é, portanto, cerca de **12,5 unidades**, sem sobreposição. A borda direita estimada do lápis é x≈376, dentro do fundo x=16..384 e do `viewBox` até x=400. As coordenadas confirmam que o defeito de posicionamento foi corrigido: **caderno aberto e lápis separado ao lado direito**. Esta é revisão de geometria vetorial, não de renderização visual.
- O relatório do Tester confirma XML/IDs acessíveis, ausência de referências externas, referências locais no HTML, comparação HTTP byte a byte e a conferência geométrica independente com os mesmos limites (folga 12,5). A suíte executada nesta revisão também cobre carregamento HTTP dos assets, sintaxe JS, dados, filtros, login e a geometria responsiva anterior.
- O HTML mantém as duas referências a `./images/papelaria.svg`; ambas são decorativas (`alt=""`), e a do cabeçalho também usa `aria-hidden="true"`. A imagem vetorial mantém `title`/`desc` para uso isolado. Não encontrei dependências externas no SVG conforme o Tester.
- `chrome`, `msedge`, `chromium`, `playwright` e `selenium` indisponíveis; módulos Python Playwright/Selenium ausentes.

## Status

- **Imagem/correção geométrica: APROVADA** com base no XML e nas coordenadas conferidas. A reprovação anterior por sobreposição está corrigida por evidência geométrica.
- **Validação visual em navegador: PENDENTE.** Não alego inspeção visual real; ainda falta confirmar renderização/cortes em navegador.
- **Aprovação conjunta do projeto: BLOQUEADA** enquanto o teste obrigatório de interação/inspeção em navegador permanecer ignorado e pendente.
