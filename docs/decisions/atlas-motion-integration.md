# Integração da frente de animação

Base: `065cdb4`. Implementação: `b76875e`. Branch: `codex/atlas-galactic-motion`. O commit seguinte reúne testes e evidências. A frente foi implementada e verificada neste worktree; não foi integrada automaticamente a outro checkout.

## Arquivos e responsabilidade

| Arquivo | Contrato |
|---|---|
| `packages/atlas/universe.js` | Cena, batches, uniforms, scheduler, adaptação de qualidade e lifecycle |
| `packages/atlas/shaders.js` | Sol, núcleos, fitas de conexão, folhas, órbitas e atmosfera |
| `packages/atlas/motion.js` | Timeline puramente visual, métricas limitadas e orçamento de qualidade |
| `Resources/web/universe.js` | Bundle gerado por `bun run build:atlas`; regenerar depois de resolver conflitos |
| `Resources/web/atlas.js` | Controller compartilhado: câmera/SVG, hover/foco, drag, teclado, formação e descarte |
| `Resources/web/atlas-motion.css` | Overrides exclusivos do renderer, inclusive remoção visual do texto no sol |
| `Resources/web/index.html` | Única alteração: link para `atlas-motion.css` após `style.css` |

Os arquivos de modais, busca, textos gerais, Cognee, atualizador, backend e instalação pessoal não foram alterados. `Sources/Oracle/main.swift` permanece intacto. A árvore lateral continua consumindo as mesmas sete coleções e caminhos das folhas.

Ao integrar, preserve os ajustes de UI feitos pela outra frente em `atlas.js` e `index.html`; porte os contratos abaixo e regenere o bundle. Não resolva o bundle minificado manualmente. O arquivo CSS novo deve ser carregado após o CSS geral. Sua ocultação de `.core-word` é compatível com a remoção definitiva daquele elemento na outra frente.

## Formação e controles no topo direito

Os controles podem ocupar o layout escolhido pela outra frente. O renderer não adiciona botões nem move a barra do journal.

```js
atlasController.setFormation({ progress: 0, playing: true, duration: 4200, rate: 1 });
atlasController.setFormation({ playing: false });
atlasController.setFormation({ progress: sliderValue }); // 0..1; preserva playing
atlasController.setFormation({ rate: 2 });
atlasController.setFormation({ progress: 1, playing: false });
const state = atlasController.getFormation();
// {progress, playing, duration, rate, phase, visualOnly:true}

document.getElementById('atlas').addEventListener('oracle:formation', ({ detail }) => {
  // Atualizar somente o indicador/controle. Não chamar renderAtlas recursivamente.
  // detail.phase: sun | collections | skills | complete
});
```

`duration` está em milissegundos (500–60.000); `rate`, entre 0,25 e 4. A entrada inicial dura 4,2 s. Um clique, foco por teclado ou seleção conclui a entrada para manter os alvos disponíveis. Reduzir movimento conclui a sequência imediatamente. Pausar a atmosfera ou ocultar a janela congela a formação. `setFormation` também está disponível no fallback, que retorna estado completo e não depende de WebGL.

Para vincular o scrub do journal, primeiro aplique sua projeção de dados existente e então envie o progresso visual. A timeline não consulta, escreve ou reexecuta eventos. Como alternativa, `OracleAtlas.update` aceita `data.formation` com o mesmo formato; envie um novo objeto somente quando o comando mudar. O replay real continua sob responsabilidade de `replay.js`/`app.js`.

## Modelo e lifecycle preservados

`OracleUniverse.sync(atlas)` continua aceitando `nodes`, `leaves`, `palette`, `camera`, `width`, `height`, `selected`, `selectedLeaf`, `reduced`, `paused` e `data`. IDs de coleção são opacos. `node.index` define cor e ordem da formação; `leaf.parent` aponta para uma coleção.

O controller acrescenta `hovered` e `keyboardFocus` (`{category?, skill?, core?}`) e encaminha o estado de `drag`. Há `setPaused`, `diagnostics`, `dispose`, `setFormation`, `getFormation` e `signalReceipt`. `signalReceipt` recebe o evento original com `source`, `event_id` e `received_at`; não inventar recibos para efeitos ambientais. Eventos de teste ficam exclusivamente nos scripts de validação.

Preservar a integração nativa existente `window.oracleVisibility(false/true)` e os flags `data.hidden`, `data.paused`, `data.economy` e `data.reduced`. O renderer respeita também `document.hidden`. A preferência de movimento reduzido do sistema é acompanhada pelo controller. A pausa da atmosfera permite uma atualização estática decorrente de seleção ou câmera; janela oculta suspende ambos os schedulers.

Ao substituir/desmontar o atlas, chamar `atlasController.dispose()` e liberar a referência. Isso aborta listeners, desconecta observadores, cancela timers/frames, descarta geometrias/materiais/textura únicos e retira o canvas. Perda de WebGL expõe o SVG; restauração retoma a cena sem reposicionar alvos. O app não salva coordenadas de câmera neste contrato; a persistência já existente continua limitada às posições de nós e folhas.

## Reprodução da validação

```sh
bun install --frozen-lockfile
bun run build:atlas
node --test scripts/test-atlas-motion.mjs
node scripts/test-replay.mjs
python3 scripts/make-atlas-fixture.py
python3 scripts/build-atlas-qa.py
ORACLE_ATLAS_QA_DIR="$PWD/.work/atlas-qa/mailbox" \
  '.work/atlas-qa/Oracle Atlas QA.app/Contents/MacOS/OracleAtlasQA' \
  --state "$PWD/.work/native-fixture/state"
# Em outro terminal, com a janela de QA visível:
python3 scripts/benchmark-atlas.py after
python3 scripts/test-atlas-native.py
python3 scripts/record-atlas.py after
python3 scripts/atlas-qa.py close
```

`build-atlas-qa.py [pasta-web]` permite executar o baseline original com o mesmo App/Core e viewport. O pacote de QA usa o perfil sintético por padrão, inclusive ao abrir por duplo clique. A ponte só é compilada nesse pacote, exige `fixture:true` e uma variável explícita e usa mailbox em `.work`. A janela de QA usa um nome/processo próprios e fica acima de outras janelas durante a medição para evitar oclusão acidental. O teste de arraste por ponteiro real foi realizado com CUA; `drag_geometry` do benchmark percorre o caminho de atualização da geometria com trajetória determinística.

O build normal permanece `bash scripts/build.sh`, com os pré-requisitos já documentados no README. Nenhum instalador pessoal foi executado nesta frente. Antes de considerar integração concluída, validar no checkout combinado: carregar a cena, scrub/play no novo local dos controles, zoom, arraste e persistência, foco/teclado, modo econômico, redução de movimento, abertura de modal e minimização. A validação isolada não substitui esse teste conjunto.
