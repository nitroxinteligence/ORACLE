# Atlas galáctico — implementação e validação

O atlas inteiro agora compartilha uma linguagem de luz: corona filamentar, superfície solar advectada, arcos nos sete núcleos, energia nas conexões, pontos de conexão pulsantes e revelação progressiva das skills. As posições permanecem estáveis durante repouso, hover e seleção. O sol não contém texto. Nenhuma folha foi promovida a especialista de primeiro nível.

[Comparação em vídeo, 18 s — antes à esquerda, depois à direita](atlas-motion-comparison.mp4) · [App depois, 18 s](atlas-motion-after.mp4) · [Captura antes](atlas-motion-before.png) · [Captura depois](atlas-motion-after.png)

Os vídeos são gravações da janela nativa, com estados visuais sequenciados pelo script de demonstração. O arraste por ponteiro nativo foi validado separadamente por CUA e tem [recibo de persistência](atlas-motion-native-pointer.json). Todas as fontes exibidas são sintéticas.

## Escolha técnica e pesquisa

Mantido Three.js **0.185.1 / WebGL2** dentro de WKWebView. A pesquisa delimitada usou Agent Reach pela rota web/Jina, complementada pela leitura direta das páginas oficiais quando Jina devolveu apenas a navegação. Foram consultadas as skills Three.js Shaders, Three.js Animation e Fixing Motion Performance. Sem novas dependências, serviços pagos, engine alternativa ou subagentes.

Sete núcleos compartilham uma geometria instanciada; todas as conexões usam outro lote de fitas Bézier, com os pulsos calculados no shader. Órbitas formam um único buffer; folhas usam um lote de pontos. A textura de ruído solar tem 128 × 128 texels, gerados localmente com seed estável. São 78 estrelas discretas, sem deslocamento dos alvos, bloom ou render targets intermediários. Buffers só aumentam quando a capacidade é excedida; movimento ambiental não recria arrays, cores ou árvore DOM por frame.

Bundle: **540.699 → 555.030 bytes**, acréscimo de 14.331 bytes (2,65%). Com gzip: 136.533 → 140.296 bytes. Nenhum pacote foi adicionado. Instancing e shaders existentes ofereceram ganho verificável em draw calls; não surgiu vantagem demonstrável que justificasse integrar outro renderer e ampliar o bundle/contratos do macOS.

A prova pequena no WKWebView detectou a inversão de faces das fitas causada pela conversão de coordenadas Y; a normal foi corrigida antes da validação final. A medição também detectou que o temporizador ambiental atrasava os gestos; entradas agora o interrompem. A hipótese de melhoria foi validada no renderer real, sem substituir a cena por imagens.

Fontes primárias: [InstancedBufferGeometry](https://threejs.org/docs/pages/InstancedBufferGeometry.html), [BufferAttribute e atualizações](https://threejs.org/docs/pages/BufferAttribute.html), [renderização sob demanda](https://threejs.org/manual/en/rendering-on-demand.html), [WebGLRenderer e estatísticas](https://threejs.org/docs/pages/WebGLRenderer.html), [WKWebView](https://developer.apple.com/documentation/webkit/wkwebview).

## Comparação medida

Apple M2, macOS 26.6.2; mesmo App/Core e fixture de **63 documentos**, sete coleções com oito skills cada. Janela **1200 × 760**, atlas **691 × 534**, DPR do monitor **2**. Buffer normal **1036 × 801** (limite 1,5×); econômico **691 × 534** (1×). Visão geral: 14 folhas renderizadas; foco: 26. Os JSONs verificam o mesmo SHA-256 dos caminhos, dimensões e contagens em todas as fases.

| Medida | Antes | Depois |
|---|---:|---:|
| Draw calls, visão geral | 16 | **7** |
| Geometrias / texturas | 9 / 1 | **6 / 1** |
| Triângulos, visão geral | 18 | 1.026 |
| Renderizações/s, atmosfera | 39,7 | **29,4** |
| Intervalo de renderização da atmosfera, mediana / p95 | 25 / 26 ms | 33 / 46 ms |
| Intervalo de renderização no zoom, p95 | 17 ms | 19 ms |
| Intervalo de renderização no arraste, p95 | 17 ms | 18 ms |
| Renderizações/s durante zoom / arraste | 89,5 / 89,7 | **57,7 / 58,6** |
| Submissão CPU do renderer, p95 | 1 ms | 1 ms |
| Renderizações/s, econômico | 15,3 | 15,0 |
| Novos frames em pausa / movimento reduzido / minimizado | 0 / 0 / 0 | **0 / 0 / 0** |
| RSS mediano do processo principal, atmosfera | 19,88 MiB | 19,52 MiB |
| CPU mediana do processo principal, atmosfera | 2,85% | **4,40%** |

O renderer anterior fazia submissões redundantes durante gestos; 89 renderizações/s não significam 89 quadros apresentados pelo monitor. O controlador SVG teve p95 de 18 → 21 ms no zoom. O novo repouso limita a cadência, mas apresentou jitter de até 46 ms no p95 desta amostra. A CPU do processo principal aumentou; não há evidência suficiente para afirmar redução do consumo total ou da bateria. O modo econômico e a pausa são os caminhos explícitos para reduzir atividade.

Os tempos são do callback/submissão CPU, com resolução de relógio próxima de 1 ms. `EXT_disjoint_timer_query_webgl2` não estava disponível: **tempo de GPU não foi medido**. RSS acima exclui helpers WebKit. Os registros de processos incluem todos os helpers visíveis, inclusive os de outros apps, e não são somados como memória do Oracle. A ponte de QA acorda a cada 100 ms em ambos os casos. Outras tarefas estavam abertas na máquina; uma amostra coberta por outra janela foi descartada. Captura de vídeo ocorreu fora das medições. Não é uma garantia de 60 fps, teste de 50 mil notas ou benchmark de energia.

Dados: [antes](../benchmarks/atlas-motion-before.json) · [depois](../benchmarks/atlas-motion-after.json).

## Comportamentos verificados

**6 testes puros + 20 contratos no app nativo passaram**, além do teste existente de projeção determinística do journal. Foram cobertos shaders, hover sem deslocamento, buffers estáveis, prioridade de entrada, zoom ancorado, foco, teclado, persistência pelo bridge real, formação, recibos, redução de movimento, minimização, restauração de contexto WebGL, fallback SVG, descarte idempotente e remontagem. [Resultados nativos](atlas-motion-native-tests.json).

Pulsos ambientais não leem telemetria. Um recibo `codex-hook` recente pode produzir um anel duplo neutro de duração limitada; fonte incorreta, replay, data futura, recibo antigo e duplicata são rejeitados. O efeito indica recebimento, sem declarar conclusão de trabalho.

Implementação no worktree `codex/atlas-galactic-motion`, sobre `065cdb4`. **Não houve merge com a frente de UI, instalação pessoal ou alteração de backend.** O app de QA compila o App/Core real com uma ponte de teste isolada; essa ponte não entra no app distribuído. [Contratos e integração](../decisions/atlas-motion-integration.md).
