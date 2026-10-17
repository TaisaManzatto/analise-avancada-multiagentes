# Verificação da análise de vendas da papelaria

## Escopo e método
Foram lidos localmente `vendas_papelaria.csv`, `papelaria_limpa.csv`, `resumo.md` e `graficos.py`. Os recálculos abaixo foram feitos com `.venv/Scripts/python.exe` e pandas, diretamente dos CSVs; não foram usadas integrações externas.

## Recálculos independentes
- Original: 182 linhas; cópia limpa: 180 linhas.
- Duplicatas exatas identificadas no original: 2; removê-las reproduz 180 registros.
- Vendas na cópia: **180** (`id_venda` distintos; chave única: True).
- Unidades vendidas (soma de `quantidade`): **548**.
- Total vendido recalculado como `quantidade × preco_unitario` na cópia: **R$ 20.059,00**.
- Soma da coluna salva `valor_venda`: **R$ 20.059,00**; cada valor recalculado confere com a coluna: **True**.
- Checagem do original após remoção das duplicatas exatas: **R$ 20.059,00**, igual ao total da cópia.

## Conferência por categoria e cidade
| Categoria | Total vendido |
|---|---:|
| Acessórios | R$ 10.517,00 |
| Livros | R$ 7.438,00 |
| Papelaria | R$ 2.104,00 |
| **Soma das categorias** | **R$ 20.059,00** |
| **Total geral da cópia limpa** | **R$ 20.059,00** |

As categorias somam exatamente o total geral: **True**.

| Cidade | Total vendido |
|---|---:|
| Campinas | R$ 8.578,00 |
| Santos | R$ 6.937,50 |
| Sorocaba | R$ 4.543,50 |

## Conferência dos gráficos e conclusões
- `graficos.py` carrega explicitamente `papelaria_limpa.csv` no mesmo diretório do script.
- Para ambos os gráficos, agrupa `valor_venda` por categoria/cidade e soma os valores. A lógica e a base correspondem à análise validada.
- Os títulos descrevem valor total vendido; o eixo y é definido para começar em zero. Valores e totais mostrados nos gráficos conferem com os recálculos acima.
- Conclusões sustentadas pelos dados: Acessórios tem o maior total por categoria (**R$ 10.517,00**); Campinas tem o maior total por cidade (**R$ 8.578,00**).
- **Ressalva:** `valor_venda` é quantidade multiplicada por preço unitário e representa vendas, não lucro. O arquivo não contém custos ou margens para calcular lucro.

## Avaliação
**Pronta para compartilhar com a ressalva acima.** Os totais, a contagem de vendas, o somatório por categoria e a origem usada pelo código dos gráficos foram verificados independentemente a partir dos arquivos locais.
