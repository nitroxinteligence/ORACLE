# Oracle V3 — implementação visual

Área isolada: worktree 1609. Origem preservada. V3 é a direção vigente; RELATORIO.md é somente inventário histórico.

## Plano e arquivos

1. `Resources/web/orbital-v3.css`, `index.html`, apresentação em `app.js`: tokens, vidro neutro, busca na lateral, navegação e dock flutuantes.
2. `Resources/web/atlas.js`, utilizando o relógio existente de `flat-universe.js`: apresentação SVG, gradientes por departamento, órbitas locais e pausas acessíveis. As fontes ativas são editadas diretamente; nenhum bundle histórico é regenerado.
3. CSS compartilhado: pastas, busca, bibliotecas, leitor/editor/diff, memória, conversas, projetos e plugins.
4. CSS compartilhado: Ajustes e onboarding, confirmações, estados parciais, campos e rodapés.
5. Preview sintético nas dimensões 1440×900 e 840×620, capturas por etapa, matriz de 64 famílias e revisão do diff.

## Preparação

- Git inicialmente limpo. AGENTS.md e PRODUCT.md copiados da origem, junto ao inventário e instruções V3. Nenhum arquivo da origem alterado.
- Todas as 25 imagens abertas individualmente: 25 como composição principal, 24 para vidro e marca; 01–23 como repertório secundário. Nenhum conteúdo dessas imagens vira dado do produto.
- Skills consultadas: Richard Design, Impeccable (registro product), frontend-design e redesign-skill. frontend-design encontrada em `.codex/skills`, pois o caminho `.agents/skills` não existe.
- O renderer ativo é `OracleUniverse2D` + `OracleAtlas`. `packages/atlas/layout.js` fornece hierarquia/páginas pelo bundle existente. A camada V3 trata apenas geometria e aparência; contratos de navegação e escala 118% preservados.
- Sem lint, typecheck, build, instalação de dependências, deploy ou substituição de aplicativo.

## Limites funcionais observados

- A ambiguidade Verificar/check-apply permanece fora do escopo.
- S64 continua sem entrada no shell; não se cria um recurso para expor a lista legada.
- Estados de segurança e operações externas serão inspecionados com fixtures; isso não comprova autenticação, instalação, backup, atualização ou conexão real.

## Ajustes de Mateus durante a implementação

- Especialistas digitais e skills sem rótulos permanentes no grafo: nome e informações no hover ou foco de teclado; o ramo correspondente recebe destaque.
- Clique em departamento usa a transição existente para uma cena exclusiva: departamento + seus especialistas + skills da página. O universo e os outros departamentos ficam fora dessa cena. Esta orientação posterior prevalece sobre a expansão em contexto do mockup V3.

## Resultado final após as revisões diretas

- Lateral: busca e releitura no topo, árvore e Memórias. Saíram Meu universo, Atlas, recolher lateral, Tutoriais, Prompts, Instruções dos projetos e Ferramentas dessa superfície. O controle de navegação superior continua disponível.
- Memórias abre a consulta de memória existente. Os renderizadores antigos de conversas e instruções permanecem no código, sem a antiga entrada lateral.
- Dock: 118%, ícone de enquadrar e voltar. Botão Detalhes retirado.
- Universo: sem textos permanentes; hover/foco mostra só o nome e desfoca os outros nós. Sem card com contagens. Nomes acessíveis continuam nos elementos.
- Departamento: transição exclusiva para departamento, especialistas e skills da página; nomes dos especialistas visíveis. Mensagem de departamento sem especialistas retirada.
- Especialista: nome do especialista e das skills visíveis. O algoritmo existente de colisão de rótulos preserva legibilidade nas cenas densas; nomes omitidos por colisão continuam disponíveis no hover/foco e nas páginas/grupos.
- Departamentos menores (raios visuais 33 global / 36 dedicado, antes 43 / 48 nesta revisão). Especialistas menores, luminosos, sem ícone. Bordas finas.
- Prompts e tutoriais com cores fixas e pontos de 4 px de raio em tela. Círculo principal de Prompts sem glow. Tutoriais abre uma cena de pastas no grafo; documentos continuam acessíveis pelo leitor existente; seus pontos usam somente o inventário real projetado para a cena, limitado a 49 documentos mais a raiz, com o catálogo completo na biblioteca.
- Camada gráfica usa o SVG 2D e o relógio existentes. Movimento decorativo para com redução de movimento, diálogo, janela inativa e contextos dedicados. Posições manuais não são substituídas pela órbita local.
- Leitor, editor, diff, bibliotecas, busca, memória, Ajustes, onboarding e confirmações usam vidro neutro e os mesmos tokens. Rótulos de estado e consentimentos continuam distinguíveis por texto e forma.

## Verificação e limites

- 69 cenários de interface distintos abertos em 1440×900 e 840×620, sem erro de fixture nem rolagem horizontal da página nos registros finais. Isso é revisão de renderização, não uma jornada nativa de 69 operações. Capturas representativas inspecionadas visualmente; métricas e registro em `evidence/scenarios.json`.
- Departamento Código: exatamente 1 departamento, 5 especialistas e 15 skills sintéticos; núcleo e bibliotecas ocultos na cena dedicada.
- Paginação densa: 50 + 50 + 17 = 117 skills distintas, sem perdas; próximo desabilitado na última página (`evidence/pagination.json`).
- Foco de teclado conferido em especialista e departamento; nome simples, desfoque, nenhum tooltip extra. Nomes permanentes conferidos por nível: universo 0; departamento 5 especialistas; especialista 1 + 3 skills na fixture simples.
- Lateral aberta em 840×620 e Memórias acionado pela interface. Biblioteca de tutoriais aberta pelo círculo da raiz.
- App instalado observado em leitura: janela renderizou normalmente, sem reproduzir a janela preta do relatório antigo. Ele continua com a versão anterior. Não houve instalação nem alteração em `/Applications`.
- As famílias nativas (autenticação, seletores, menus) permanecem sem alteração e não recebem falsa validação por fixture. Replay de recibos e operações de recuperação não foram executados.
- Verificar/check-apply continua com a ambiguidade anterior, fora do escopo.
- Sem lint, typecheck, build, instalação de dependências, deploy, merge ou publicação. `git diff --check` usado somente para conferir o patch.

## Preview e reprodução

Preview base: `http://127.0.0.1:8769/`. Cenários isolados: `http://127.0.0.1:8770/?scenario=department` (troque pelo nome de `COBERTURA.md`). Recarregue a página após uma mudança.

```sh
python3 docs/design/2026-09-12-v3-implementation/preview/serve.py --port 8769 --base-preview
python3 docs/design/2026-09-12-v3-implementation/preview/serve.py --port 8770
```

O servidor lê os arquivos ativos deste worktree e evita cache desatualizado no preview. A fixture só é injetada pelo servidor local; nunca pelo HTML distribuído. Respostas sintéticas de sucesso não comprovam persistência. Métodos externos não listados são recusados.

Para o preview foi reutilizada a cópia já provisionada de `marked.js` e sua licença do aplicativo instalado em `Resources/web/vendor` (ignorado pelo Git). Não foi instalado pacote novo. Essa dependência continua a cargo do provisionamento existente no fluxo normal de build.

Veja [COBERTURA.md](COBERTURA.md) para as 64 famílias e os limites de cada uma. Arquivos editados do produto: `Resources/web/index.html`, `app.js`, `atlas.js`, mais `orbital-v3.css` novo. Fontes Swift, contratos, adapter, bundles gerados e arquivos do vault permanecem sem alteração.

## Revisão: bibliotecas no grafo e fluxo nas conexões

- Prompts e Tutoriais mostram nomes permanentes dentro das cenas de pastas e documentos; o universo geral continua com nomes no hover/foco.
- Clique na raiz Tutoriais abre o grafo dedicado, usando o inventário existente e o planejador de pastas compartilhado. Subpastas, voltar e paginação preservados; nenhum modal é aberto pela raiz ou por uma subpasta.
- Conexões Oracle → departamentos → especialistas em cinza claro. O pulso luminoso usa a cor do departamento e percorre o caminho do pai para o filho. Não representa processamento nem transmissão de dados.
- Fluxo CSS com ciclo de 4,8 segundos; pausa com diálogo/janela inativa e fica oculto quando movimento é reduzido.
- Verificação adicional: 4 cenas de biblioteca × 2 dimensões, sem modal inesperado, com nomes de todas as pastas/documentos da fixture simples. `evidence/library-graph-checks.json` e capturas `prompts-graph`, `prompts-folder`, `tutorials-graph`, `tutorials-folder`.
- Movimento observado por variação do deslocamento do pulso; pausa confirmada ao abrir Ajustes. Conexões do departamento Código usam base cinza e pulso azul. `evidence/flow-checks.json` e capturas `flow-overview`/`flow-department`.
- Esta revisão continua restrita à apresentação e navegação. Sem lint, typecheck ou build.

## Revisão: círculos de áreas e bibliotecas

Pessoal, Profissional, Prompts e Tutoriais usam círculos de raio 16 (antes 24), sem ícones internos e sem glow na borda. O gradiente segue os mesmos pontos e opacidades dos departamentos, com rosa, verde-água, dourado e azul respectivamente. Hover, nomes acessíveis e navegação preservados. Conferido em 1440×900 e 840×620; capturas `area-circles-1440.png` e `area-circles-840.png`.

## Revisão: cores na navegação lateral

Ícones e nomes dos departamentos usam exatamente a mesma função de cores do grafo: Código azul, Marketing verde, Conteúdo roxo, Vendas dourado e a cor própria dos demais. Item Memórias removido da lateral; consulta existente em Ajustes preservada. Conferidos os valores de cor renderizados dos textos, ícones e círculos: iguais para todos os departamentos. Captura `sidebar-colors-1440.png`.

## Revisão: departamentos menores

Círculos dos departamentos reduzidos novamente: raio global 33 → 25 e dedicado 36 → 27, cerca de 25% menores. Conferido no preview de 1440×900, com diâmetro renderizado de 44 px (antes 58 px). Captura `departments-smaller-1440.png`.

## Revisão: grafo central e giro dos departamentos

Referências consultadas: https://skilltree.altari.ai/preview (composição e movimento observados) e https://obsidian.md/help/plugins/graph (nós, conexões, destaque de vizinhos e forças).

- Pessoal, Profissional, Prompts e Tutoriais agora compõem uma malha central contínua, sem os antigos anéis de bibliotecas. Pontos neutros variam de tamanho conforme o grau; cor da área aparece no foco. Pastas e notas mantêm seus caminhos e ações existentes.
- Distribuição com força central, repulsão, tensão e distância das conexões; movimento contínuo pelo relógio SVG existente. Oracle menor no centro, desenhado por cima da rede para preservar o símbolo.
- Hover/foco destaca o ponto e os vizinhos ligados. Inspeção pausa a rede; diálogos, redução de movimento e janela inativa continuam respeitados.
- Scroll vertical/horizontal no universo geral gira departamentos, especialistas e conexões ao redor do núcleo. Câmera e zoom de 118% permanecem fixos durante o gesto. Arraste continua deslocando a câmera. Cenas dedicadas mantêm navegação e paginação.
- Dados: o snapshot atual fornece caminhos e pastas, não backlinks entre notas. As linhas desta revisão são relações reais de ancestralidade de pastas. Não foram inventados links semânticos nem declarada integração com o Graph View nativo do Obsidian. A visão geral exibe até 50 pontos por área e informa a amostra no nome acessível da raiz; abrir a área mantém acesso ao acervo completo.
- Verificação em preview sintético: 200 pontos/200 conexões com ancestrais válidos; movimento observado nos 200 pontos; foco em Prompts destacou 10 pontos/10 conexões; Enter abriu a cena Prompts sem modal; nota de tutorial abriu seu leitor existente; nenhum ponto se moveu durante Ajustes. Scroll nos dois sentidos, câmera estável, e entrada em Código exibindo apenas seu departamento foram conferidos. Capturas em 1440×900 e 840×620. O preview base tem menos arquivos de demonstração e, portanto, menor densidade.
- Evidências: `obsidian-central-dense-1440.png`, `obsidian-central-dense-840.png`, `obsidian-central-focus-1440.png`, `central-rotation-1440.png` e `central-graph-checks.json`. Sem lint, typecheck, build, alteração de backend ou instalação nativa.

## Revisão: departamentos discretos, cores e centro do enquadramento

Círculos dos departamentos reduzidos de raio 25 para 13 no universo e 27 para 14 na cena dedicada; ícones reduzidos em aproximadamente 54%. No preview 1440×900, o círculo de Código mede 22,86 px e o ícone 10,55 px. Pontos centrais agora usam uma paleta variada e estável por caminho, preservando o círculo do Oracle. Junções visuais ligam cada departamento ao núcleo dentro da malha, sem criar notas ou backlinks.

Enquadramento global corrigido: margens verticais simétricas e origem do núcleo no centro da área do mapa, mantendo escala relativa de 118%. Confirmado centro vertical 450 px em uma janela de 900 px e centro (420,310) em 840×620. Capturas `colored-center-small-departments-1440.png` e `colored-center-small-departments-840.png`. Sem lint, typecheck ou build.

## Revisão: nomes Michroma, foco de departamento e encaixe do giro

A fonte do logotipo foi confirmada no SVG original como Michroma e em https://fonts.google.com/specimen/Michroma. Reutilizado `brand/Michroma-Regular.ttf` já incluído, com sua licença OFL. Nomes permanentes em maiúsculas ficam fora das órbitas dos departamentos; são reposicionados durante o giro e limitados à área visível.

Hover/foco do departamento destaca seu nome, seus especialistas e suas conexões. Corrigida a prioridade do foco por teclado após inspeção por ponteiro. Teste de Código destacou o departamento e seus cinco especialistas, com os demais departamentos em opacidade 0,18.

Ao terminar a rolagem (180 ms sem novo evento), o departamento mais próximo da posição inferior é atraído suavemente até ela. Teste em 1440×900 e 840×620 alinhou Vendas abaixo do Oracle com desvio horizontal de 0 px. Controles movidos ao canto inferior direito (margens 28 px na janela maior e 20 px na menor).

A pedido subsequente, removido o grupo Outros especialistas do mapa global e da barra lateral, preservando os dados e a busca. Departamentos aproximados do núcleo: distância padrão 342 → 260 unidades; a área mínima de enquadramento evita que o auto-fit anule essa aproximação. Captura final `department-michroma-snap-840.png`. Sem lint, typecheck, build ou instalação.

Ajuste seguinte: círculos dos departamentos ampliados para raio 18 no universo e 20 no departamento (mínimo visual 11 px), preservando os ícones pequenos. Repostos 16 anéis concêntricos decorativos, sem preenchimento, com bordas de opacidade 0,055. Conferido no preview renderizado.

### Rede central e janela de conhecimento

O símbolo central do Oracle agora é decorativo, sem tooltip, ação ou foco de teclado. A região da rede ao redor dele recebe hover/foco coletivo, amplia 28% e destaca seus pontos/conexões. O círculo do símbolo fica fora da área de clique. Conforme o refinamento mais recente, a física da rede continua animando durante hover/foco. Pausa de janela, modal e preferência por movimento reduzido seguem existentes.

O clique na rede abre “Seu conhecimento”, com abas Vida pessoal, Vida profissional e Memórias. As duas primeiras consultam apenas as entradas existentes do vault, com pastas, caminhos, busca e paginação; a profissional inclui PROJETOS quando disponível. Memórias usa somente status/list/search/get já existentes, com fonte explícita e verificação da origem. Conversas importadas abre a interface existente; não foi criada captura, sincronização nem conexão automática com contas Codex/Claude Code. O novo módulo é `Resources/web/knowledge-hub.js`.

Verificação no preview sintético: três abas, busca local, leitura de nota e retorno preservado, troca de fonte e busca de memória, leitura indexada e retorno, conversas importadas, pasta vazia, fonte sem resultados e erro de fonte. Renderização em 1440×900, 840×620 e 481×745; sem overflow horizontal observado. Em foco coletivo com escala 1,28, 200/200 posições da rede mudaram entre amostras. Capturas `knowledge-hub-*.png` em evidence. Sem build/lint/typecheck, instalação ou operações nativas; validação de apresentação não comprova integração real.

### Conhecimento como resumo, sem navegação por pastas

A revisão mais recente substitui o navegador de arquivos do modal por um panorama e tópicos: identidade/rotina/planos, atuação/empresa/projetos/direção profissional e preferências/decisões/assuntos em andamento. As referências ficam no disclosure “Sobre este resumo”; não há pastas na visão principal. Codex aparece como “Codex · ChatGPT”, ao lado de Claude Code, com disponibilidade calculada somente a partir dos registros efetivamente lidos.

A apresentação organiza trechos das notas existentes e das memórias/conversas já disponíveis, sem inferência por modelo, escrita, captura ou acesso automático a contas. A leitura inicial de notas é limitada a 12 registros; “Ampliar resumo” acrescenta 12, com cobertura informada na seção de origem. AGENTS.md não compõe o resumo profissional. Memórias preservam escopo por fonte e conferência de source_id. Ausência, leitura parcial e erro têm estados explícitos.

Preview localhost recebeu textos de pessoa/empresa fictícias, identificados na janela. Validação visual em 1440×900, 840×620 e 481×745; nenhum navegador de pastas ou overflow horizontal no modal. Exercitados: três resumos, referência→leitor→retorno, estado vazio, fonte indisponível e ampliação de 12 para 24 de 43 registros sintéticos. Evidências `knowledge-summary-*.png`. Nenhuma verificação de integração real, build, lint, typecheck ou instalação.
