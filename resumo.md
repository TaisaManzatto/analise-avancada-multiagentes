# Tratamento e análise — vendas_papelaria.csv

## Estrutura
- Original: **182 linhas e 8 colunas**.
- Grão: uma linha por venda; `id_venda` identifica a venda.
- Cópia tratada: **180 linhas e 9 colunas** (inclui `valor_venda`).

## Problemas encontrados
- **2 duplicatas exatas** de linhas, removidas na cópia.
- **6** valores de cidade com espaços no início/fim.
- Categorias inconsistentes: {'Papelaria': 63, 'Acessórios': 62, 'Livros': 54, 'acessórios': 3} (variação de caixa em `acessórios`).
- **4** valores de forma de pagamento vazios.
- `quantidade`: 0 valores ausentes/inválidos e 0 negativos; intervalo válido: 1–5.
- `preco_unitario`: 0 valores ausentes/inválidos e 0 negativos; intervalo válido: 3.5–95.0.
- Após deduplicar linhas idênticas, há **0 linhas em IDs repetidos**.

## Tratamento aplicado
O original `vendas_papelaria.csv` foi preservado. Na cópia `papelaria_limpa.csv` foram removidas somente linhas integralmente idênticas; espaços externos foram removidos de `cidade`; categorias foram padronizadas para `Livros`, `Papelaria` e `Acessórios`; pagamentos vazios foram substituídos por `Não informado`; e `valor_venda` foi calculado como `quantidade * preco_unitario`. Nenhuma outra linha foi removida.

Soma de `valor_venda` na cópia: **20059.00**.
