# Relatório do Tester — rodada 02

## Versão examinada

Sem Git no diretório. A rodada foi confirmada isolada antes das alterações: os hashes dos arquivos de produto/testes coincidiam com os registrados na rodada 01 e `rodada-02/` ainda não existia. SHA-256 após os testes:

| Arquivo | SHA-256 |
|---|---|
| `projeto-dashboard/tests/test_dashboard.py` | `DEEF2FA5789D7F5971A82DC4B2016F7B57DDDAB9E32241F1F36889D5CE434C14` |
| `projeto-dashboard/tests/dashboard_harness.js` | `3EA7320AFBCAE506D3CE829EC5738D47F628787033C00ADFDCA5176AE5B93C44` |
| `projeto-dashboard/preparar_dados.py` | `9BF657F562FD67C63004C90CCFE87ECCC83A851BAC140AC68D9105F629FCC788` |
| `papelaria_limpa.csv` | `04F66503149BFAC2B9A61B2E9D284A6D0F8C87B48D72AEBF8D7ACC36A7A1A562` |
| `vendas_papelaria.csv` | `BF95B7609E30EB7E3E6A30CFC16E43D9FB5BDFC48A410E49148CCEB92E2494FF` |
| `projeto-dashboard/dados/papelaria_preparados.csv` | `A4EB6C4890CFFCEF04E1F99E6C4C342974D88221C3E9B2C8D2C4E59B99199219` |
| `projeto-dashboard/site/dados/dashboard.json` | `A5AF9587578E4BB8AD73FC9D4B77AFA7BCC1F8CCF2BEDB1782ED5A208B817589` |

## Alterações e verificações

- Acrescentados cinco testes `unittest` em `projeto-dashboard/tests/test_dashboard.py`: colunas ausentes e extras, valor nulo, ID repetido e valor calculado divergente.
- Para cada caso, o teste chama `preparar()` com entrada e saída temporárias, verifica a exceção esperada e confirma que a fonte inválida, sentinelas na saída, fontes canônicas e artefatos existentes não foram alterados nem sobrescritos.
- Não houve alteração no produto. Os hashes de `preparar_dados.py`, fontes e saídas preparados permanecem iguais aos da rodada 01.
- Skills em `.agents/skills/` continuam ausentes; não foram lidas nem utilizadas.

## Comandos e evidências

- `python -m unittest discover -s projeto-dashboard/tests -v` — **12 testes executados: 11 passaram e 1 foi ignorado**. Saída completa no terminal desta rodada.
- A suíte inclui os cinco cenários inválidos, reconciliação independente dos dados, interação via harness Node, verificação de sintaxe JavaScript e carregamento HTTP dos recursos locais.
- Verificação de disponibilidade: `chrome`, `msedge`, `playwright` e `selenium` não encontrados. Interação em navegador real, teclado/foco e responsividade visual permanecem **PENDENTES**; o teste correspondente foi ignorado, não aprovado.

## Problemas e retorno

- Nenhuma falha nos testes executáveis; nenhuma correção de produto necessária pelo Tester.
- Revisão independente da cobertura e dos resultados permanece necessária.

## Status

**BLOQUEADO** para aprovação completa: suíte executável aprovada, mas testes obrigatórios em navegador real permanecem **PENDENTES** por indisponibilidade de navegador/ferramentas.
