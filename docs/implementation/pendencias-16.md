# Oracle — execução das 16 pendências

Fonte: pedido consolidado de Mateus nesta tarefa, 2026-09-07. Base: `065cdb4`. Entrega: Oracle 0.2.0. A nota Apple Notes **não foi alterada**. Sem subagentes, publicação externa, API paga ou modificação da instalação pessoal/Obsidian, Hermes e projetos de clientes.

| # | Pedido | Resultado | Evidência |
|---|---|---|---|
| 1 | Avaliar Cognee | **Avaliado; adoção pendente de decisão.** Recomendação: manter GBrain por enquanto | [Avaliação com fontes primárias](../decisions/cognee-evaluation.md) |
| 2 | Atualizador unificado | **Implementado.** Consulta e aplicação compatível, hashes, progresso, recuperação e preservação. **URL do catálogo central ausente.** Cognee não é executado | [Contrato e limites](updater.md), [27 verificações](../evidence/update-contract.json), [consulta real](../evidence/update-network.json), [UI](../evidence/native-updates.png) |
| 3 | Remover textos decorativos inferiores direitos | **Implementado** | [App renderizado](../evidence/oracle-native-0.2.png) |
| 4 | Remover rótulo de demonstração inferior esquerdo | **Implementado.** Origem permanece nos ajustes | [App](../evidence/oracle-native-0.2.png), [ajustes](../evidence/native-settings.png) |
| 5 | Remover subtítulo abaixo da marca | **Implementado.** Marca Oracle preservada | [App](../evidence/oracle-native-0.2.png) |
| 6 | Remover abas Mapa/Lista/Pastas | **Implementado.** Árvore e busca mantêm navegação; demais raízes do vault acessíveis | [App](../evidence/oracle-native-0.2.png), `renderTree/openSearch` |
| 7 | Padronizar modais | **Implementado e validado.** Shell comum, dimensões por família, foco, Escape, rodapé, rascunho/diff, estados de erro/vazio; respostas assíncronas vinculadas à fonte e à janela | [Galeria e cenários](../evidence/oracle-0.2-visuals.md), [regressão de fonte](../evidence/memory-source-race.json) |
| 8 | Remover Atlas / 01 | **Implementado** | [App](../evidence/oracle-native-0.2.png) |
| 9 | Remover Oracle do centro do sol | **Implementado.** Sol e animações preservados | [Núcleo](../evidence/native-timelapse-core.png) |
| 10 | Remover Observação Local; barra fina de instalação | **Implementado.** 2px; progresso dirigido por recibos e operação ativa | [Captura](../evidence/native-installation-progress.png), [2.000/4.902 observados e conclusão](../evidence/native-catalog-progress.json) |
| 11 | Produto Second Brain no Observatório | **Implementado.** GBrain permanece identificado tecnicamente | [App](../evidence/oracle-native-0.2.png) |
| 12 | Busca automática por modal | **Implementado e validado.** Campo/⌘K, filtro imediato, setas, Enter, vazio e retorno de foco. `ads-google` original encontrada | [Busca nativa](../evidence/native-search-ads-google.png), [fonte original](../evidence/native-editor-v2.json) |
| 13 | Refinar design geral | **Implementado.** Hierarquia, espaçamento, densidade, campos, controles, estados e transições; universo e painéis preservados | [Galeria nativa](../evidence/oracle-0.2-visuals.md), [janela mínima](../evidence/modal-minimum-window.png) |
| 14 | Levar reprodução ao topo junto ao cadeado | **Implementado.** Play/pausa, estado, velocidade, cursor e retorno ao vivo | [App](../evidence/oracle-native-0.2.png) |
| 15 | Tooltips, nomes acessíveis e teclado | **Implementado.** Ações de ícones nomeadas, tooltip por hover/foco; controles nativos com foco explícito | [Tooltip por Tab](../evidence/native-tooltip.png), controles na árvore de acessibilidade |
| 16 | Formação núcleo → especialistas → skills | **Implementado e validado.** Projeção imutável, pausa e ao vivo separados da instalação; journal preservado nos recibos | [15 etapas](../evidence/timelapse-contract.json), [4.909 arquivos preservados](../evidence/native-timelapse-files.json), [capturas](../evidence/oracle-0.2-visuals.md) |

## Verificações executadas

- `bash scripts/build.sh`: aplicativo release e recursos locais; verificação estrita de assinatura ad hoc.
- `dist/Oracle.app/Contents/MacOS/Oracle --state <perfil de teste> --self-test`: **19 contratos aprovados**, incluindo liveness da instalação, preservação de fonte, concorrência e eventos.
- `Oracle --state <perfil de teste> --self-test-updates --test-release <binário oficial>`: **27 verificações aprovadas**. Testou o release oficial atual e rollback de slot; não alegou migração de banco ou upgrade para uma versão ainda inexistente/aprovada.
- `node scripts/test-replay.mjs`: journal puro e **15 posições de formação** aprovados.
- `python3 scripts/test-gbrain.py`: identidade/indexação e retomada preservadora em perfil sintético.
- `bun scripts/test-mcp.ts`: handshake, escrita canônica com TTL e leitura da UI com MCP conectado, sem inferência.
- Instalador nativo em vault de QA: **4.902 arquivos públicos verificados**. Editor pela UI: versão pessoal gravada e fonte original intacta.
- UI nativa: busca, leitura, editor/diff, ajustes, tooltips, configuração, entrevista, informação, conversas/instruções vazias, reprodução e atualizador. Browser: janela mínima 1000×700, teclado e regressão de resposta assíncrona fora de ordem.
- `bash scripts/package.sh` + inspeção do DMG: artefato de desenvolvimento `Oracle-0.2.0-arm64.dmg`; recibo de pacote em `docs/evidence/package-0.2.json`.

## Dependências externas restantes

1. **URL do futuro catálogo central.** Configuração e gerador de release já existem; não há URL inventado. O transporte público real desse catálogo depende da criação/publicação pelo usuário.
2. **Decisão de adotar Cognee.** Avaliação concluída; não instalado e sem API paga.
3. **Distribuição confiável Apple.** Developer ID/notarização e teste em Mac limpo independente permanecem pendentes. O pacote entregue usa assinatura ad hoc.
4. **Instalação pessoal e confiança de hooks.** Preservadas e não declaradas como validadas por testes sintéticos.

## Unidades e fronteiras de reversão

- Interface: `Resources/web/`, `packages/atlas/universe.js`, `packages/contracts/replay.js` e controles de foco em `main.swift`. Reverter a apresentação não desfaz dados do usuário.
- Atualizador: `Updates.swift`, manifesto em `Resources/updates/`, integração no dispatcher e gerador de skills. Runtime usa ponteiro atômico; skills usam preimagem e comparação de hash. Nenhum rollback de executável é tratado como rollback de schema.
- Avaliação, documentação e pacote: remover/atualizar esses documentos não altera memória pessoal. Nenhum checklist externo foi marcado automaticamente.
