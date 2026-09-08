# Oracle 0.2.1 — consolidação

Integradas as três frentes: interface/atualizador, animações Three.js e identidade A / Órbita solar.

Resolução preservou controles de timelapse no topo, busca/modal, tooltips, snapshot de layout, bloqueio de mutações durante replay, scheduler e descarte completo do renderer/controller. O build agora copia o ícone da identidade integrada, sem gerar o antigo. A marca vetorial entra no cabeçalho e na tela de bloqueio.

Validação: 19 contratos nativos de core, 27 de atualização com release oficial, 20 do atlas, 10 cruzados UI/animação/identidade, 6 testes puros de movimento, 15 posições de formação, round-trip GBrain e MCP. Janela nativa inspecionada com perfil sintético; fontes pessoais preservadas. Ver ../evidence/consolidation-0.2.1.json e consolidation-native-tests.json.

Artefatos: dist/Oracle.app e dist/Oracle-0.2.1-arm64.dmg. Assinatura ad hoc, sem notarização Apple. Cognee continua avaliado, não adotado; URL do catálogo central ainda não fornecido. Estas dependências externas não foram inventadas.

As métricas de desempenho das tarefas anteriores são evidência das versões isoladas, não novas medições da consolidação. A origem dos três worktrees foi preservada; .serena não foi incorporado.
