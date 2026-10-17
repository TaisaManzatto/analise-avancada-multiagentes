# Tester — rodada 06

## Versão examinada

Sem Git no diretório. Hashes SHA-256 conferidos após as verificações:

| Arquivo | SHA-256 |
|---|---|
| `projeto-dashboard/site/images/papelaria.svg` | `2367EF7A24C799CB497B419BF33BEC71C3C6658F43300DC728E1451FE903DE31` |
| `projeto-dashboard/site/index.html` | `9BC04D6C5C9A7D47375DBE0E2B4703401DA126541CF11135F725BAC539FFA007` |
| `projeto-dashboard/tests/test_dashboard.py` | `49D429EF9D3BADCE1FEE05F4FCD785D651A071BA4236F9C32ACCB065CB99DC06` |
| `projeto-dashboard/tests/dashboard_harness.js` | `409250D6E18B15BC74C968884DD59EAF404FF525C1FBA2F324A77D0E4F28566E` |
| `projeto-dashboard/relatorios/rodada-06/construtor.md` | `CDF48EBDAFB4278BFCF1932EB90FDBEBB4C9BCB675AD3CBC2A72E3CC3D568027` |

O hash do SVG coincide com o registrado pelo Construtor nesta rodada.

## Verificações e evidências

- **XML e acessibilidade:** `xml.etree.ElementTree.fromstring` parseou o SVG sem erro. Conferidos raiz SVG, `<title>` (“Caderno aberto e lápis”), `<desc>` descritivo, `role="img"` e `aria-labelledby="title description"` resolvendo para os IDs existentes.
- **Referências locais:** inspeção dos atributos e conteúdo do SVG não encontrou `href`/`src`, `@import`, `url()` ou URL externa; o namespace SVG padrão não é um recurso carregado. O HTML foi parseado com `html.parser`: duas imagens continuam apontando a `./images/papelaria.svg`; ambas têm `alt=""` e a segunda tem `aria-hidden="true"`, coerente com o uso decorativo no HTML.
- **Separação geométrica aproximada:** script independente leu os comandos/path points, control points, transformação e `stroke-width` no XML. Com limites conservadores (caixa convexa dos pontos de controle mais metade do stroke), a borda direita da página direita fica em `x <= 314,5`; a borda esquerda do lápis transladado fica em `x >= 327`, e a direita em `x <= 376`. Vão horizontal mínimo calculado: **12,5 unidades**; as caixas não se sobrepõem. É conferência geométrica dos dados vetoriais, não renderização ou validação visual.
- **HTTP:** `python -c "from urllib.request import urlopen; from pathlib import Path; import hashlib; u='http://localhost:8000/images/papelaria.svg'; local=Path('projeto-dashboard/site/images/papelaria.svg').read_bytes(); r=urlopen(u,timeout=5); body=r.read(); typ=r.headers.get_content_type(); print(r.status,typ,len(body),hashlib.sha256(body).hexdigest(),body==local); assert r.status==200 and typ=='image/svg+xml' and body==local"` — passou: HTTP 200, `image/svg+xml`, 1.500 bytes, resposta byte a byte igual ao asset local; SHA-256 `2367ef7a…903de31`.
- **Suíte completa:** `python -m unittest discover -s .\projeto-dashboard\tests -v` (invocado pelo Python disponível; preferido `.venv\Scripts\python.exe` quando presente) — **13 testes: 12 passaram, 1 ignorado, sem falhas**. O ignorado é `test_filter_interaction_in_real_browser`, explicitamente marcado pendente por falta de Playwright/Selenium e navegador.

## Pendências e status

- **PENDENTE:** interação e inspeção visual em navegador real, incluindo cortes, colisões renderizadas, teclado/foco e console. Nenhum resultado de navegador ou validação visual real foi declarado.
- **BLOQUEADO** para aprovação integral até o teste de navegador ser executado. As verificações automatizadas do SVG, referências HTML, geometria aproximada e HTTP passaram; a suíte não teve falhas, mas manteve um teste obrigatório ignorado/pendente.
