# Relatório do Tester — rodada 03

## Versão examinada

Sem Git no diretório. SHA-256 dos arquivos examinados:

| Arquivo | SHA-256 |
|---|---|
| `projeto-dashboard/tests/test_dashboard.py` | `D2E4774E080000BE3B144AADFB51E2A76963C02776795619B2130CB890EC11BC` |
| `projeto-dashboard/tests/dashboard_harness.js` | `4A68CCCB9A0138B6558690D294D02952388402CED42467FDB064201E12A4E5C2` |
| `projeto-dashboard/site/index.html` | `9BC04D6C5C9A7D47375DBE0E2B4703401DA126541CF11135F725BAC539FFA007` |
| `projeto-dashboard/site/app.js` | `C03DDB09229D7B4E12B71EEC92CA6C6164D3485DB0C766DEAB3C50E0C17696AE` |
| `projeto-dashboard/site/styles.css` | `A06400887BD00AB40C5CDC53CA9880C795CE30EB482DA46B0FF515B1F8EEAF87` |
| `projeto-dashboard/site/dados/dashboard.json` | `A5AF9587578E4BB8AD73FC9D4B77AFA7BCC1F8CCF2BEDB1782ED5A208B817589` |

## Alterações e verificações

- Adaptado `dashboard_harness.js` para simular formulário, credenciais, erro, carregamento condicionado ao login e logout antes de capturar os estados do dashboard.
- `test_dashboard.py` agora verifica os IDs do contrato, labels, credenciais e aviso demonstrativo no HTML; a interação black-box confere login inválido e válido, ausência de fetch antes da autenticação e retorno à tela no logout. As verificações anteriores de dados, cálculos, filtros, resultados vazios, erros de preparação, HTTP e sintaxe foram mantidas.
- A primeira execução após a atualização do HTML falhou porque o app ainda não havia sido atualizado. Após a chegada do `app.js` e o ajuste do harness ao DOM/formulário final, a suíte completa foi executada novamente.
- Conferi `rodada-03/construtor.md`: hashes finais de `index.html`, `app.js`, `styles.css` e `dashboard.json` coincidem com os hashes medidos após a execução final da suíte. Hashes de testes e produto foram conferidos novamente depois do teste; não houve divergência nessa verificação.

## Comandos e evidências

- `python -m unittest discover -s projeto-dashboard/tests -v` — **Ran 12 tests; OK (skipped=1)**: 11 passaram, 1 ignorado, sem falhas.
- `node --check projeto-dashboard/tests/dashboard_harness.js` — passou.
- A suíte final também validou a sintaxe dos scripts do site, carregamento HTTP dos arquivos locais, integridade/reconciliação dos dados e interações de login/filtros pelo harness Node.
- Disponibilidade consultada: `chrome`, `msedge`, `chromium`, `playwright` e `selenium` não encontrados; módulos Python `playwright` e `selenium` indisponíveis. `test_filter_interaction_in_real_browser` foi **IGNORADO/PENDENTE**, não aprovado.

## Pendências

- Sem navegador, não foram verificadas interação real, teclado/foco, responsividade visual nem console do browser. Esses testes continuam **PENDENTES** e requerem ambiente com navegador e Playwright/Selenium.

## Status

**BLOQUEADO** para aprovação integral: os testes automatizados executáveis passaram, mas a validação obrigatória em navegador permanece pendente.
