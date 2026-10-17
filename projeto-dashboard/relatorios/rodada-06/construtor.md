# Construtor — rodada 06

- **Versão examinada:** `site/images/papelaria.svg`; SHA-256 `2367ef7a24c799cb497b419bf33bec71c3c6658f43300dc728e1451fe903de31`.
- **Alteração:** ampliei o `viewBox` para `0 0 400 300` e reposicionei o lápis à direita do caderno, mantendo título, descrição acessível e caminho do asset.
- **Conferência geométrica:** a página direita do caderno termina aproximadamente em `x=312`; com contorno, borda externa em `x≈314,5`. O lápis transladado tem borda esquerda aproximada em `x≈327` (incluindo contorno), deixando vão visível de cerca de `12,5` unidades. Sua borda direita fica em `x≈376`, dentro do fundo claro (`x=16..384`) e do `viewBox`.
- **Comando:** `python -c "import hashlib,xml.etree.ElementTree as ET; p='projeto-dashboard/site/images/papelaria.svg'; data=open(p,'rb').read(); root=ET.fromstring(data); print('XML: válido'); print('viewBox:',root.attrib.get('viewBox')); print('title:',root.find('{http://www.w3.org/2000/svg}title').text); print('desc:',root.find('{http://www.w3.org/2000/svg}desc').text); print('SHA256:',hashlib.sha256(data).hexdigest())"` — XML válido; `viewBox` e acessibilidade conferidos; hash acima.
- **Escopo:** alterados somente `site/images/papelaria.svg` e este relatório.
- **Navegador:** verificação visual **PENDENTE**; não executada.
- **Status:** **APROVADO** para a correção geométrica e validação XML solicitadas; não representa aprovação visual em navegador ou do projeto completo.
