# Análise avançada multiagentes

Repositório público dos fluxos de trabalho, skills, relatórios de análise e revisão e arquivos estáticos do dashboard.

## Conteúdo

- [`AGENTS.md`](AGENTS.md): critérios e fluxo de trabalho para produzir e validar uma análise com dashboard.
- [Skills](.opencode/skills/): exploração de dados, visualização e validação.
- [Relatórios da análise inicial](.): `resumo.md` e `verificacao.md`.
- [Relatórios do dashboard](projeto-dashboard/relatorios/): histórico por rodada e relatório final.
- [`projeto-dashboard/site/`](projeto-dashboard/site/): arquivos estáticos para publicação do dashboard.

O relatório final do dashboard registra o status **BLOQUEADO para aprovação integral**, pois a validação em navegador real ficou pendente.

## Escopo publicado

O dashboard é estático e pode ser publicado no Render usando `projeto-dashboard/site` como diretório de publicação. O conteúdo dessa pasta, inclusive `dados/dashboard.json`, será público. O acesso `demo` / `papelaria2026` é apenas demonstrativo e não protege os dados.

O CSV original, dados preparados para auditoria, código-fonte de preparação, testes, imagens de análise, caches e o ambiente `.venv` foram intencionalmente excluídos. Os relatórios são registros do trabalho realizado e podem mencionar arquivos locais que não estão publicados aqui.
