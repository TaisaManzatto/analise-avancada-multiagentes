# Relatório do Construtor — rodada 01

## Versão examinada

Sem Git no diretório. SHA-256 dos arquivos de produto:

| Arquivo | SHA-256 |
|---|---|
| `preparar_dados.py` | `9BF657F562FD67C63004C90CCFE87ECCC83A851BAC140AC68D9105F629FCC788` |
| `README.md` | `76F54F740E2895635122F352C6093688357A3EBE578E65D61D85E8D5C6524F85` |
| `dados/papelaria_preparados.csv` | `A4EB6C4890CFFCEF04E1F99E6C4C342974D88221C3E9B2C8D2C4E59B99199219` |
| `site/index.html` | `937BD1E239543FEFA028FA4AC32F410387BEBFE15259D27B8E3CCCD86BFD11A8` |
| `site/styles.css` | `BCA016D82AF30F65B9C17388E7FCA174F15E6DBDD601C8C7760354F0DDA3EBD9` |
| `site/app.js` | `D696429D68E77A2E5E04B60A4D95BB7E1782010D44589727E08C28BCA07A8E93` |
| `site/dados/dashboard.json` | `A5AF9587578E4BB8AD73FC9D4B77AFA7BCC1F8CCF2BEDB1782ED5A208B817589` |

## Entrega e verificações do construtor

- Implementado preparo reproduzível com pandas, JSON para o site estático e CSV preparado para auditoria. A rotina valida schema, ausências, IDs e cálculo de valor, sem eliminar registros.
- Dashboard com KPIs de vendas, gráficos de barras acessíveis, tabela, filtros sincronizados por cidade/categoria, estado vazio e botão de limpar.
- Fonte e dados anteriores preservados; hash da fonte confere com o hash registrado nos dados preparados. Recálculo independente conferiu 180 vendas, 548 unidades, R$ 20.059,00 total e R$ 111,44 de ticket médio. Totais por categoria e cidade conferem com `verificacao.md`.
- `.agents/skills/explore-data/SKILL.md`, `.agents/skills/data-visualization/SKILL.md` e `.agents/skills/validate-data/SKILL.md` estão ausentes. Não se afirma leitura nem uso dos arquivos ausentes; essa limitação fica registrada.

## Comandos e evidências

- `& .\.venv\Scripts\python.exe .\projeto-dashboard\preparar_dados.py` — OK; 180 IDs únicos, 0 repetidos, 548 unidades, total 20059.0 e ticket 111.44.
- `& .\.venv\Scripts\python.exe -m py_compile .\projeto-dashboard\preparar_dados.py` — OK.
- Smoke independente com pandas/JSON — OK; linha/colunas/IDs e dimensões do preparado conferem com a fonte; grupos conferem: categoria Acessórios 10517.00, Livros 7438.00, Papelaria 2104.00; cidade Campinas 8578.00, Santos 6937.50, Sorocaba 4543.50.
- `node --check .\projeto-dashboard\site\app.js` — OK.
- Smoke HTTP local via `http.server` — OK após corrigir o caminho do JSON: `/`, `/styles.css`, `/app.js` e `/dados/dashboard.json` retornaram HTTP 200.
- `python -m pytest --version` — indisponível (`No module named pytest`); o README usa `unittest` da biblioteca padrão.
- Suíte do Tester em `projeto-dashboard/tests/` não executada pelo Construtor. Testes de interação real em navegador e responsividade também não foram executados nesta etapa: **PENDENTES**, aguardando Tester/Revisor.

## Pendências e retorno

Nenhum defeito de produto conhecido após os smoke checks. Tester: executar a suíte documentada em README e comunicar falhas ao Construtor. Revisão independente e validação em navegador continuam pendentes.

## Status

**APROVADO — entrega do Construtor e smoke checks locais.** Aprovação conjunta do projeto não declarada; suíte obrigatória e revisão independente permanecem **PENDENTES**.
