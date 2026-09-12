# Revisão da interface do Oracle — 12/09/2026

Escopo: interface web ativa do worktree 1609, inspecionada pelo CUA no preview local com dados sintéticos. A revisão cobre navegação, componentes compartilhados, bibliotecas, leitura/edição, ajustes e onboarding. Não equivale a validação da ponte nativa nem a instalação de um novo aplicativo.

## Etapas e tarefas

1. Mapear as 64 famílias do inventário existente, distinguindo entradas atuais, funções removidas e superfícies nativas. Abrir os cenários ativos e registrar problemas.
2. Corrigir a base compartilhada: alinhamento da busca/releitura, botões de ícone, rolagem, seletores, cores do fundo e ícones da árvore. Simplificar ajustes.
3. Organizar leitor, editor e comparação; preservar guardas de rascunho, conflito e gravação. Unificar notificações de resultado no topo da janela.
4. Inspecionar novamente estados normais, vazios, erro, conteúdo longo, teclado e janela estreita. Registrar limitações e resultados.

## Achados e implementação

| Prioridade | Problema | Correção |
|---|---|---|
| P2 | Busca tinha margem inferior de 16px dentro de uma linha flex; ícone de releitura parecia deslocado | Margem zerada, alturas compatíveis e busca transparente |
| P2 | Botões de ícone dependiam de alinhamento inline e padding herdado | Centro explícito com flex e SVG de tamanho fixo |
| P2 | Ajustes reuniam ações de onboarding e manutenção sem relação com a configuração cotidiana | Removidas as entradas solicitadas; sem rodapé Concluído; rodapés vazios também foram retirados de modais somente de leitura |
| P2 | Plugins eram expostos no observatório e mapa | Removida a visualização na interface, sem alterar instalações nem conexões externas |
| P2 | Resultado de uma ação dentro de modal aparecia inserido no conteúdo | Toast compartilhado ancorado na janela, em top layer quando disponível |
| P2 | Comparação linha a linha marcava todo o restante após uma inserção | Alinhamento por LCS limitado, números de linha e resumo de adições/remoções |
| P2 | Leitura longa sem navegação interna | Índice de seções, metadados discretos e largura de leitura controlada |
| P2 | Editor não oferecia conferência do Markdown renderizado | Prévia opcional, contagem de linhas e organização de status e ações |
| P3 | Seletor de ordenação usava menu padrão sem identidade visual | Componente compartilhado com listbox, teclado, foco e tipo para localizar |
| P3 | Rolagem lateral espessa e ícones de departamentos neutralizados | Rolagem fina, cores do mapa nos departamentos e bege nas pastas |
| P3 | Fundo inteiramente preto | Fundo cinza quase preto #111111 |

## Critérios de decisão

Aplicadas frontend-design, Impeccable (audit/distill/product) e Richard Design/revenue-centric-design (hierarquia de atenção e redução de excesso de funções). Não foi calculado índice de adoção: não há telemetria de uso para fundamentá-lo. Mantidas tipografia e geometria aprovadas. As transições de modais e toasts receberam os ajustes solicitados nesta rodada.

## Mapa de notificações

- Salvar: sucesso somente após retorno `saved` com hash do documento. Conflito permanece no editor com instrução contextual.
- Descartar: aviso após confirmação e descarte do rascunho.
- Guardar rascunho e sair: aviso após persistência do rascunho.
- Releitura de arquivo: confirmação de atualidade; conflito continua contextual.
- Cópia, exportação, bloqueio e desconexão: mesma apresentação global, preservando confirmação da operação.
- Falhas capturadas pelo wrapper `safe`: toast de erro, sem deslocar conteúdo.
- Progresso de onboarding, conflitos e decisões pendentes continuam no contexto porque exigem acompanhamento ou resposta. Navegar, selecionar e digitar não geram notificações de sucesso.

## Limites

S28–29 e S31–37: sem entrada no fluxo principal após as remoções solicitadas. Código de manutenção nativo permanece preservado; nada foi desativado ou desconectado como efeito colateral.
S60–62: autenticação, seletores de arquivos e menus nativos dependem de um pacote executável atualizado. Não houve build, reinstalação nem exercício dessas operações pessoais nesta rodada visual.


## Resultado da conferência

Etapas 1–4 concluídas para as superfícies web ativas. Navegação executada pelo CUA nas prévias locais 8769 e 8770, com dados sintéticos. A cobertura abaixo identifica famílias abertas, não certifica todos os estados operacionais descritos no inventário original.

- Árvore: 62 pastas abertas; rolagem de 5 px; departamentos com suas cores do grafo e pastas em bege.
- Ajustes: seis ações principais; dois grupos superiores e ações do aplicativo abaixo. Em 1280 × 800, modal de 820 × 478, sem breadcrumb nem rodapé vazio.
- Breadcrumb: somente ancestrais reais de navegação. Ajustes e Atualizações são raízes; o título atual não é repetido na trilha.
- Leitor/editor/diff: conteúdo longo, índice, prévia Markdown, salvar, erro sintético, conflito e descarte conferidos. Em 481 × 745, a prévia substitui o editor e o botão retorna ao texto; sem overflow horizontal.
- Seletores: ordenação Z–A e filtro por categoria exercitados na biblioteca. Se faltar espaço, o menu abre para cima; no modelo Codex, lista entre y=359 e y=485 dentro do corpo do modal, sem corte pelo rodapé.
- Bibliotecas: leitura, cópia com toast e abertura do original verificadas. Navegação leitor → editor → voltar terminou com foco em Editar, um diálogo aberto e zero cópias transitórias remanescentes.
- Animações: entrada/saída e troca de conteúdo dos modais em opacidade. Preferência de movimento reduzido respeitada. Toast: 240 ms de entrada, 5 s de permanência, 180 ms de saída; amostragem DOM confirmou y=10 → 20 na entrada e y=20 → 10 na saída, acompanhando a opacidade. Centralização relativa à janela de 1280 px confirmada.
- Timelapse: início, controles ativos e encerramento exercitados; sem overflow em 1280 × 800. Os recibos de operações reais não foram reproduzidos nesta fixture.
- Guardas visuais: bloqueio limpa aviso, tooltip e transições; a estrutura do onboarding preserva o portal do toast ao substituir a etapa.

Validação de lógica já executada nesta rodada: 9 testes passaram nos conjuntos de comparação de documentos e renderização Markdown. `git diff --check` sem problemas. Não foram executados lint, typecheck ou build.

## Cobertura por família

| Inventário | Superfície | Evidência desta rodada |
|---|---|---|
| S01–09 | Shell, grafo, departamentos, especialistas, skills, pastas e inspetor | Abertos; densidade de 117 skills e grupos; árvore expandida; botões compartilhados alinhados |
| S10–11 | Timelapse e replay | Controles de formação visual abertos e exercitados; replay de recibos reais não exercitado |
| S12 | Busca | Aberta com resultados e navegação de teclado |
| S13–15 | Prompts, tutoriais e prévia | Categorias, ordenação, conteúdo, cópia, original, vazio, ambiguidade e erro sintético |
| S16–20 | Leitor, editor, comparação, conflito e saída | Aberto com texto longo e estados de edição; conferência desktop e janela estreita |
| S21–23 | Memória e proveniência | Lista, página, vazio, erro e índice parcial sintéticos |
| S24–27 | Conversas e instruções | Listas, vazio e leitores; sem importação de arquivos pessoais |
| S28–29 | Plugins | Visualização removida conforme pedido |
| S30 | Ajustes | Fluxo comum e capacidade owner sintética; simplificação verificada |
| S31–37 | Organização e manutenção antigas | Entradas removidas do fluxo principal conforme pedido |
| S38 | Desconectar | Somente confirmação aberta; nenhuma pasta desconectada |
| S39–40 | Atualizações e recuperação | Estados disponível/parcial e controles de recuperação visíveis; nenhuma atualização ou restauração executada |
| S41–43 | Owner, diagnóstico e histórico | Superfícies abertas com dados sintéticos |
| S44–58 | Onboarding | Licença, convite, pasta, workspace, identidade, objetivos, preferências, revisão, readback, progresso, pausa, falha, permissão, perguntas, conexão e modelo abertos |
| S59 | Bloqueio web | Tela e limpeza visual verificadas |
| S60–62 | Autenticação, seletores e menus nativos | Não exercitados nesta rodada; exigem app compilado |
| S63 | Componentes transversais | Botões, foco, seletores, tooltip, toast, animações e estados de erro |
| S64 | Lista legada | Sem entrada visível no shell; revisão de código apenas |

## Aviso de atualização na inicialização

Pedido posterior: destacar atualizações disponíveis em verde pulsante e avisar ao abrir o aplicativo.

- O indicador usa `updateStatus.available`, derivado do registro nativo de atualizações instaláveis. Não inventa disponibilidade por falha de rede ou por uma versão que ainda aguarda compatibilidade.
- Verde claro (#78ff98), borda verde (#43ff78), halo e pulso de 1,8 s. A cor continua visível com movimento reduzido, sem animação.
- Um modal por execução, com “Agora não” e “Ver atualização”. A segunda ação abre a tela existente; não instala automaticamente.
- Inicialização e desbloqueio aguardam carregamento, licença/vault e conclusão de onboarding. Um editor, outro modal ou janela oculta adia o aviso; a preferência não é gravada para suprimi-lo na próxima execução.
- A primeira consulta automática da execução pode verificar novidades mesmo se o registro anterior tiver menos de seis horas. Ela usa somente `check-only`; permanecem os limites de repetição e de tentativas após falha.
- A janela nativa encerra o processo ao fechar a última janela (`applicationShouldTerminateAfterLastWindowClosed`), portanto uma nova abertura começa uma nova sessão de aviso.

Validação: 7 testes em `scripts/test-update-notice.mjs` passaram. Conferência CUA em `?scenario=updates-startup` confirmou o modal automático, retorno após recarregar, acesso à tela Atualizações, pulso e preferência de movimento reduzido. Cenário sem atualização não abriu modal nem ativou pulso. `git diff --check` passou. Sem build, instalação ou consulta a fontes remotas reais nesta rodada.
