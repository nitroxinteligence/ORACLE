# Validação do frontend nativo

A cena foi observada no Oracle.app, não apenas no navegador. Ambiente: Mac14,7, Apple M2, 8 GB; build Swift release, WKWebView; vault sintético de 22 documentos. O preview do navegador possui uma fixture separada de 25 documentos e está explicitamente marcado como demonstração.

| Cenário | Evidência observada | Limite |
|---|---|---|
| Janela macOS | Menus Oracle/Editar/Janela, controles da janela, WebKit carregando assets locais | Pacote de desenvolvimento com assinatura ad hoc |
| Atlas completo Three.js | Sol procedural, sete núcleos, conexões, órbitas, labels SVG e inspetor | Nós de catálogo são organização, não agentes em execução |
| Seleção Marketing | Estado pressionado, caminho Oracle/Marketing e cinco skills reveladas | Fonte é fixture |
| Duplo clique | Zoom observado de 100% para 174% durante transição, 175% estabilizado | Não é benchmark de trackpad físico |
| Seleção AB Testing | Caminho Oracle/Marketing/ab-testing e ações de leitura/versão pessoal | Não executa a skill |
| Arraste Code | config de teste registrou x=246.5638, y=-239.3344 | Apenas layout |
| Reinício | Code reapareceu na posição alterada, com a mesma configuração | Persistência de posição; câmera não persistida |
| Leitura de nota | Markdown formatado, fonte e SHA-256 821e5f0d0c8ddc8701a91f3584492e84a9a2837fb214d15cb0d4de5ce10d59c0 | Conteúdo sintético |
| Editor/diff | Alteração mostrada antes de gravar; frontmatter inválido rejeitado | Teste identificou substituição tipográfica na entrada automatizada; editor recebeu autocorrect/spellcheck desativados |

## Defeitos corrigidos nesta unidade

| Antes | Depois | Por quê |
|---|---|---|
| Captura no pointerdown interceptava dblclick | Captura começa somente após limiar de movimento | Clique e arraste preservam seus destinos |
| Novas folhas usavam uma distribuição diferente das anteriores | Posições padrão usam a distribuição total limitada da coleção | Expansão não empilha os rótulos |
| Corte superior rígido interrompia o sol ao aproximar | Canvas ocupa a área inteira atrás do card; enquadramento reserva a área de leitura | Continuidade espacial sem esconder o foco |
| Mensagem de erro fora do modal | Feedback dentro do modal, com role alert | Erro não fica atrás do backdrop |
| Árvore repetia busca completa para cada diretório | Índice por diretório pai | A construção não repete varreduras para cada pasta |

A amostra de processos visíveis foi registrada em `docs/benchmarks/native-visible-processes.json`: média agregada aproximada de 110.7 MiB RSS e 8.3% CPU nos três processos identificados durante seis amostras. RSS, compressão e processos WebKit não equivalem a memória total de GPU; esta amostra não mede bateria. Não anunciar metas de 50 mil notas como atingidas.

A gravação pela UI foi concluída: o hash da fonte permaneceu intacto e uma versão pessoal com procedência foi criada. Recibo em `native-editor-receipt.json`. O arraste de AB Testing, inclusive com a atmosfera pausada, gravou apenas coordenadas de layout; recibo em `native-skill-drag.json`. O próprio app exportou `oracle-native-atlas-v5.png`, incluindo o conteúdo WebGL.

O modo econômico foi observado no WebKit com intervalo mediano de 65 ms e p95 de 66 ms em 360 amostras. A ação de minimizar foi executada; o processo foi amostrado separadamente. A pausa de atmosfera preserva seleção e arraste. A camada de acessibilidade expõe os controles e alvos, mas uma sessão completa de VoiceOver e um trackpad físico ainda não foram auditados.
