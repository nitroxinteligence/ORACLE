# Matriz de cobertura visual V3

As 64 famílias históricas foram mapeadas. **V** = superfície aberta em preview sintético, com captura; **C** = fonte revisada, sem execução completa; **N** = superfície nativa mantida. Uma captura não valida operações externas nem todos os estados de uma família.

Os cenários indicados possuem capturas `evidence/<cenario>-1440.png` e `-840.png`, salvo `navigation-open`, capturada em 840. As imagens `01-*` e `02-*` registram etapas anteriores; use as imagens pelo nome do cenário para a versão final.

| ID | Família | Evidência | Cenários | Escopo / limite |
|---|---|---|---|---|
| S01 | Janela e navegação global | V+C | overview | Busca na lateral; Memórias; entradas removidas conforme revisão. |
| S02 | Atlas geral | V+C | overview | Cores por departamento; nomes somente no hover/foco no universo. |
| S03 | Departamento | V+C | department | Uma cena exclusiva; nomes dos especialistas visíveis. |
| S04 | Especialista e grupos de skills | V+C | specialist,dense,group | Nomes do especialista e skills; 117 itens em 50 + 50 + 17, sem duplicatas. |
| S05 | Skill e inspetor | V+C | skill | Inspetor contextual mantido; leitor original preservado. |
| S06 | Árvore de pastas | V+C | navigation-open | Lateral expandida em 840×620; árvore mantém rolagem. |
| S07 | Pasta no grafo e busca por caminho | V+C | knowledge,knowledge-empty | Apresentação compartilhada aplicada; operação real não executada. |
| S08 | Controles do Atlas | V+C | overview | 118% preservados. Enquadrar sem texto; Detalhes removido. |
| S09 | Observatório geral/contextual | V+C | skill | Botão geral removido a pedido; controles mantidos no inspetor de skill. |
| S10 | Timelapse e formação | V+C | overview | Painel Timelapse aberto em 1440 (timelapse-1440.png); animação de formação preservada. Sem reprodução completa nesta revisão. |
| S11 | Replay de recibos | C | — | Replay de recibos preservado em código; nenhum recibo de instalação forjado. |
| S12 | Busca global | V+C | search | Apresentação compartilhada aplicada; operação real não executada. |
| S13 | Biblioteca de prompts | V+C | prompts,prompts-empty,prompts-partial,prompts-ambiguous,prompts-error | Apresentação compartilhada aplicada; operação real não executada. |
| S14 | Biblioteca de tutoriais | V+C | tutorials,tutorials-empty | Apresentação compartilhada aplicada; operação real não executada. |
| S15 | Prévia Markdown | V+C | reader | Mesmo renderer Markdown compartilhado; prévia de biblioteca recebe os mesmos estilos. |
| S16 | Leitor da nota original | V+C | reader-long | Apresentação compartilhada aplicada; operação real não executada. |
| S17 | Editor | V+C | editor,save-error | Apresentação compartilhada aplicada; operação real não executada. |
| S18 | Diff | V+C | diff | Apresentação compartilhada aplicada; operação real não executada. |
| S19 | Conflito de edição | V+C | conflict | Apresentação compartilhada aplicada; operação real não executada. |
| S20 | Rascunho e saída | V+C | draft,exit | Apresentação compartilhada aplicada; operação real não executada. |
| S21 | Memória / fontes | V+C | memory,memory-empty,memory-error | Apresentação compartilhada aplicada; operação real não executada. |
| S22 | Nota derivada e proveniência | V+C | memory-page | Apresentação compartilhada aplicada; operação real não executada. |
| S23 | Atualidade do índice | V+C | memory-partial | Apresentação compartilhada aplicada; operação real não executada. |
| S24 | Conversas importadas | V+C | conversations,conversations-empty | Entrada retirada da lateral; renderizador legado preservado. |
| S25 | Leitura de conversa | V+C | conversation | Apresentação compartilhada aplicada; operação real não executada. |
| S26 | Instruções de projetos | V+C | projects,projects-empty | Entrada retirada da lateral; renderizador legado preservado. |
| S27 | Leitura de instrução | V+C | instruction | Apresentação compartilhada aplicada; operação real não executada. |
| S28 | Plugins / ferramentas | V+C | plugins | Apresentação compartilhada aplicada; operação real não executada. |
| S29 | Detalhe de plugin | V+C | plugin | Apresentação compartilhada aplicada; operação real não executada. |
| S30 | Ajustes | V+C | settings | Apresentação compartilhada aplicada; operação real não executada. |
| S31 | Organizar departamentos | V+C | departments | Apresentação compartilhada aplicada; operação real não executada. |
| S32 | Revisar contexto | V+C | context | Apresentação compartilhada aplicada; operação real não executada. |
| S33 | Sincronização e manutenção | V+C | maintenance | Apresentação compartilhada aplicada; operação real não executada. |
| S34 | Pedido de agendamento | V+C | schedule | Pedido sintético; não registrado no Codex. |
| S35 | Backup privado do banco | V+C | backup | Apresentação compartilhada aplicada; operação real não executada. |
| S36 | Confirmar restauração de teste | V+C | backup-confirm | Só diálogo de confirmação; restauração não executada. |
| S37 | Codex e plugins | V+C | bridge | Apresentação compartilhada aplicada; operação real não executada. |
| S38 | Desconectar pastas | V+C | revoke | Apresentação compartilhada aplicada; operação real não executada. |
| S39 | Atualizações | V+C | updates,updates-partial | Apresentação compartilhada aplicada; operação real não executada. |
| S40 | Restaurar atualização anterior | V+C | updates-partial | Botões de recuperação visíveis; operação não executada. |
| S41 | Fonte oficial de skills / owner | V+C | owner | Papel administrativo existe somente na fixture deste cenário; assinatura real não testada. |
| S42 | Diagnóstico do Atlas | V+C | diagnostics | Apresentação compartilhada aplicada; operação real não executada. |
| S43 | Histórico técnico | V+C | activity | Apresentação compartilhada aplicada; operação real não executada. |
| S44 | Ativação individual | V+C | license | Apresentação compartilhada aplicada; operação real não executada. |
| S45 | Pedido de acesso / convite | V+C | invitation | Apresentação compartilhada aplicada; operação real não executada. |
| S46 | Escolha do Obsidian | V+C | vault | Apresentação compartilhada aplicada; operação real não executada. |
| S47 | Workspace e perfil existentes | V+C | workspace | Seleção existente apresentada; seletor do sistema não aberto. |
| S48 | Identidade | V+C | identity | Apresentação compartilhada aplicada; operação real não executada. |
| S49 | Objetivos | V+C | objectives | Apresentação compartilhada aplicada; operação real não executada. |
| S50 | Preferências | V+C | preferences | Apresentação compartilhada aplicada; operação real não executada. |
| S51 | Revisão do plano | V+C | review | Apresentação compartilhada aplicada; operação real não executada. |
| S52 | Confirmar identidade / readback | V+C | readback | Readback sintético; confirmação não enviada. |
| S53 | Instalação e retomada local | V+C | progress,paused,failed | Estados sintéticos independentes, sem instalação ou retomada real. |
| S54 | Cartão de continuidade e progresso no shell | V+C | progress-card | Apresentação compartilhada aplicada; operação real não executada. |
| S55 | Permissão pontual | V+C | permission | Solicitação sintética; nenhuma autorização enviada. |
| S56 | Perguntas do Codex | V+C | questions | Formulário aberto; resposta não enviada. |
| S57 | Conexão Codex opcional | V+C | connection | Apresentação sintética; autenticação não iniciada. |
| S58 | Modelo disponível na conta | V+C | model | Lista expandida com nomes sintéticos; nenhuma seleção enviada. |
| S59 | Bloqueio Oracle | V+C | lock | Apresentação compartilhada aplicada; operação real não executada. |
| S60 | Autenticação nativa | N+C | — | AppKit/LocalAuthentication sem alteração. Não acionado. |
| S61 | Seletores nativos | N+C | — | Seletores nativos sem alteração. Não acionados. |
| S62 | Menus e Sobre | N+C | — | Menus nativos preservados; somente janela atual observada. |
| S63 | Avisos, campos e feedback transversais | V+C | save-error,prompts-error,memory-error | Apresentação compartilhada aplicada; operação real não executada. |
| S64 | Lista/pastas legadas sem entrada no shell | C | — | Sem entrada no shell antes e depois. CSS de resultados compartilhado; não exposto como recurso novo. |
