# Oracle 0.3 — aceitação dos 23 pedidos

Escopo: briefing de 08/09/2026, oito referências visuais inspecionadas, interface A e integração final B. Perfil de QA separado do vault pessoal. Artefatos são locais; assinatura de desenvolvimento ad hoc, sem notarização ou publicação externa.

## Verificações executadas

O binário consolidado passou em **116 verificações Swift**, **9 verificações do indexador** e **18 testes de geometria/movimento/projeção**. O atualizador foi testado com o binário oficial cujo SHA-256 foi conferido no release fixado. A consulta real `check-only` preservou os hashes de todos os arquivos da fixture.

A interface consolidada passou em **38 verificações nativas e 72 cenários de zoom**. A tarefa B passou no onboarding nativo e na instalação real do GBrain pelo Codex, com retomada do mesmo plano. O inventário consolidado foi consultado novamente por API. A revisão corrigiu uma associação indevida de imagens de plugins dependentes; o ícone do app passa a exigir correspondência de identidade. Os ícones são monocromáticos, com iniciais quando não há imagem própria disponível.

A inspeção foi retomada após o desbloqueio manual do Mac. A versão integrada passou nos 38 testes nativos e nos 72 cenários de zoom. Foram inspecionados mapa, expansão, painéis e modais em janela pequena e grande. A medição final registrou 59,7 FPS em ambiente, 50,4 FPS em expansões repetidas e 60,0 FPS no timelapse. O modo econômico ficou em 15 FPS; movimento reduzido e minimização cessaram a renderização. Detalhes e limites: `docs/benchmarks/organic-report.md`.

A repetição ponta a ponta da instalação no pacote integrado concluiu em 138 segundos, com confirmação sintética da identidade, índice, consulta à memória e descoberta da skill pelo Codex. Nenhuma permissão de hooks foi concedida automaticamente. A memória abriu a biblioteca Obsidian recém-indexada e retornou cinco documentos.

## Método

- macOS 26.6.2, hardware e dimensões registrados em `docs/benchmarks/`.
- Fixture de 940 skills: Ads 34, Code 37, Contents 0, Customer Finder 1, Cybersecurity 818, Marketing 50, Personal Branding 0; mais sete notas sintéticas. São documentos de teste, não evidência de uma integração pessoal.
- Referências `referencia-01.png` a `referencia-08.png` lidas na pasta do briefing. As imagens 1, 2, 7 e 8 orientaram zoom/distribuição; 3 e 4, leitor e ajustes; 5 e 6, Observatório/plugins.
- Testes unitários de contagem/geometria incluem 0, 1, 10, 50, 818 e 1.200 skills, reordenação e crescimento até 128 especialistas. Verificação nativa cruza 8 zooms × 3 estados × 3 janelas = 72 cenários.
- “Skills visíveis” na matriz significa nós efetivamente instanciados no renderer e na árvore acessível. Em 100% todas as posições cabem no viewport; acima disso o recorte muda conforme a câmera, sem limitar a quantidade de folhas a três.
- Edição validada em arquivo sintético, por testes Foundation e pela janela real via teclado/mouse. Nenhuma nota da instalação pessoal foi editada.

## Rastreabilidade

| Item | Implementação | Evidência |
|---|---|---|
| 1 | Header transparente, controles e painéis flutuantes; footer removido; controles macOS preservados | `Resources/web/index.html`, `style.css`; captura nativa |
| 2 | Tokens neutros; cores por identidade só no grafo; exceções de atualização e hover do bloqueio | CSS e estados de disponibilidade |
| 3 | Componente comum de modal com material, cabeçalho, corpo rolável e rodapé; onboarding integrado | Inspeção dos modais e matriz nativa |
| 4 | Escala relativa ao enquadramento; recolhimento em ≤50%; mínimo 10/50 nos demais níveis | 72 cenários nativos e testes `visibleCount` |
| 5 | Editar grava no `.md` original; coordenação, substituição atômica, cópia de recuperação e releitura | `NoteEditing.swift`; 19 testes; interação nativa com nota de teste |
| 6 | Clique fora e Escape; retorno de foco; saída suja oferece guardar ou descartar | Matriz nativa e inspeção com mouse/teclado |
| 7 | Fontes/repos removidos da tela; Cognee apresentado como Memory, sem adoção fictícia | Modal de atualizações |
| 8 | Rótulos técnicos/decorativos removidos da composição de modais | Construtor `modal()` e auditoria de texto |
| 9 | Breadcrumb e voltar no topo; subpáginas retornam aos ajustes | Matriz nativa |
| 10 | Inventário do protocolo público Codex; só connected na borda do SOL | Testes reais B e filtro do renderer |
| 11 | Ruído solar advectado, caústicas, correntes, ondulação limitada e formação contínua | Shaders e medidas; redução de movimento |
| 12 | Recibos/cobertura retirados da experiência principal | Histórico técnico sob Avançado |
| 13 | Texto comum em leitor, busca, ajustes, memória, conexões e atualizações | Inspeção das telas; detalhes técnicos por ação |
| 14 | Plugins com ícones reais quando fornecidos pelo Codex; fallback de iniciais identificado visualmente; botão de recolher | Inventário real e Observatório |
| 15 | Densidade altera folhas extras/rótulos; preserva mínimos | Teste selecionado 50 → 86 em Cybersecurity |
| 16 | Atualizar ao lado de Bloquear; `check-only` sem instalar; verde exige disponibilidade verificada recente | Contratos de atualização e badge |
| 17 | Bloquear vermelho apenas no hover | Regra CSS específica; controle nativo |
| 18 | Código assinado, CLI, conexão, escolha do vault, instalação por Codex, retomada e confirmação | Relatório e testes B; validação consolidada |
| 19 | Timelapse inicialmente recolhido; ícone abre controles | Matriz nativa e captura |
| 20 | Observatório recolhido; viewport se adapta e restaura área ao minimizar | Matriz nativa |
| 21 | Núcleos sem rótulos persistentes; hover/foco anuncia nome e total; ramificações por setores | Geometria, VoiceOver/AX e Marketing 50 |
| 22 | Identidade por ID, posições estáveis e interpolação; atualização sem refazer buffers por quadro | Reordenação/crescimento e resize |
| 23 | Timeline sobre objetos existentes; pausa/retomada/replay/cancelamento sem instalação | Matriz nativa e hashes de arquivos antes/depois |

## Limites práticos

A assinatura ad hoc não substitui Developer ID/notarização. A confiança dos hooks pertence ao Codex e não é ativada automaticamente. A presença de plugins instalados não prova autorização: a órbita exige ferramentas disponíveis confirmadas no runtime. Dados sintéticos de teste jamais são marcados como conexão real na entrega.

Coordenação de arquivo e releitura reduzem conflitos, mas não constituem uma transação universal com editores externos que ignorem as APIs do macOS. Os detalhes desse limite e a fonte Apple dos materiais estão em `organic-ui-design.md`.

O relatório de desempenho registra cadência de desenhos entregues pelo WebGL, CPU do host Oracle e processos WebKit separadamente. Não atribui todos os processos WebKit do Mac ao Oracle, nem confunde custo de submissão CPU com tempo de GPU.

As capturas finais do mapa usam as 940 skills públicas distribuídas no catálogo, copiadas para outro vault de teste e verificadas por SHA-256 (4.902 arquivos). A matriz automatizada usa documentos sintéticos. Nenhuma das amostras lê o vault pessoal. O macOS limitou a janela grande solicitada de 1440×900 a 1440×870 de conteúdo; as imagens registram as dimensões reais.
