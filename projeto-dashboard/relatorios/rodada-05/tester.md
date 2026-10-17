# Tester — rodada 05

## Versão examinada

Sem Git no diretório. Hashes SHA-256 conferidos após os testes:

| Arquivo | SHA-256 |
|---|---|
| `projeto-dashboard/site/images/papelaria.svg` | `577ABA1A246225169E57D945EC796A26A114DCEBB9EE74844E2D41F58986C50D` |
| `projeto-dashboard/site/index.html` | `9BC04D6C5C9A7D47375DBE0E2B4703401DA126541CF11135F725BAC539FFA007` |
| `projeto-dashboard/tests/test_dashboard.py` | `49D429EF9D3BADCE1FEE05F4FCD785D651A071BA4236F9C32ACCB065CB99DC06` |
| `projeto-dashboard/tests/dashboard_harness.js` | `409250D6E18B15BC74C968884DD59EAF404FF525C1FBA2F324A77D0E4F28566E` |

O hash do SVG coincide com o registrado pelo Construtor em `rodada-05/construtor.md`.

## Verificações e evidências

- **SVG e conteúdo:** `python -c "import hashlib, xml.etree.ElementTree as ET; from pathlib import Path; p=Path('projeto-dashboard/site/images/papelaria.svg'); data=p.read_bytes(); root=ET.fromstring(data); ns={'s':'http://www.w3.org/2000/svg'}; title=root.find('s:title',ns); desc=root.find('s:desc',ns); assert root.tag=='{http://www.w3.org/2000/svg}svg'; assert title is not None and title.text and 'caderno' in title.text.lower() and 'lápis' in title.text.lower(); assert desc is not None and desc.text and 'caderno aberto' in desc.text.lower() and 'lápis' in desc.text.lower(); rects=root.findall('.//s:rect',ns); assert rects and any(r.get('fill')=='#f1f2ef' for r in rects); assert len(root.findall('.//s:path',ns))>=4; attrs=[(el.tag,k,v) for el in root.iter() for k,v in el.attrib.items()]; assert not [x for x in attrs if x[1].split('}')[-1] in {'href','src'} and (':' in x[2] or x[2].startswith('//'))]; text=data.decode('utf-8'); assert '@import' not in text.lower() and 'url(' not in text.lower(); print('XML válido; title/desc e elementos conferidos; sem referências externas'); print(hashlib.sha256(data).hexdigest())"` — passou. XML é bem-formado; `<title>` é “Caderno aberto e lápis”, `<desc>` descreve caderno aberto com linhas e lápis; retângulo de fundo `#f1f2ef` é neutro; formas vetoriais contêm páginas/separador e lápis. Não há `href`/`src` externo, `@import` ou `url()`.
- **Referência HTML:** busca `grep` por `papelaria.svg` em `site/index.html` encontrou duas referências a `./images/papelaria.svg` (linhas 40 e 51); o caminho permanece igual. Ambas as imagens têm `alt=""`; a segunda também `aria-hidden="true"`, como elemento decorativo. O SVG mantém título e descrição próprios.
- **HTTP:** `python -c "from urllib.request import urlopen; from pathlib import Path; import hashlib; url='http://localhost:8000/images/papelaria.svg'; local=Path('projeto-dashboard/site/images/papelaria.svg').read_bytes(); r=urlopen(url,timeout=5); served=r.read(); print(r.status,r.headers.get_content_type(),len(served),hashlib.sha256(served).hexdigest(),served==local); assert r.status==200 and r.headers.get_content_type()=='image/svg+xml' and served==local"` — passou: HTTP 200, `image/svg+xml`, 1.447 bytes, SHA-256 idêntico ao arquivo local (`577aba1a…86c50d`), bytes iguais.
- **Suíte final:** `python -m unittest discover -s .\projeto-dashboard\tests -v` (usado `python` do ambiente virtual se disponível) — **13 testes: 12 passaram, 1 ignorado, sem falhas**. Inclui verificações de dados, harness de filtros, assets HTTP, sintaxe JS e geometria compacta. O teste ignorado é `test_filter_interaction_in_real_browser`.
- A comparação inicial via `Invoke-WebRequest` converteu a resposta em texto e não comparou bytes de forma confiável; ela não foi usada como evidência. A checagem HTTP acima repetiu a comparação por bytes brutos e passou.

## Pendências e status

- **PENDENTE:** interação e inspeção visual em navegador real. Não declarei validação visual; a suíte ignorou o teste de navegador.
- **BLOQUEADO** para aprovação integral enquanto o teste de navegador permanecer pendente. Critérios do novo SVG, referências HTML e resposta HTTP passaram; suíte automatizada executada sem falhas, com um teste ignorado.
