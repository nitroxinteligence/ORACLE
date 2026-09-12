# AGENTS.md — Oracle

## Escopo e modo de trabalho

- Estas instruções se aplicam a todo este repositório. Respeite instruções mais específicas nos subdiretórios e o pedido atual do usuário.
- Responda em português, de forma direta e concreta. Faça apenas o trabalho solicitado; informe dependências e limitações sem ampliar o escopo.
- Antes de editar, confira `git status --short`, leia os arquivos envolvidos e preserve alterações de outras tarefas. Ao criar uma branch, use o prefixo `codex/`, salvo orientação diferente.
- Faça staging por caminhos explícitos. Não inclua dados pessoais, fixtures, logs ou artefatos de outras tarefas em commits.
- Não transforme evidência histórica em estado atual. Confira o código e o comportamento da branch antes de reutilizar decisões, comandos ou resultados antigos.

## Conclusão e decisões

- Em pedidos de implementação, execute as etapas necessárias dentro do escopo autorizado, inspecione o resultado e corrija falhas causadas pela mudança. Não pare apenas por ter produzido uma primeira versão. Em auditorias ou planos, entregue a análise solicitada; não implemente sem autorização.
- Considere concluído quando o comportamento solicitado estiver verificado pelas checagens pertinentes. Repita verificações somente após mudanças, falhas ou dúvidas concretas; preserve a regra específica para ajustes visuais abaixo.
- Escolhas rotineiras e reversíveis de implementação dentro do pedido não exigem nova confirmação. Pergunte quando faltar informação que altere materialmente o resultado ou quando a próxima ação ultrapassar a autorização existente. Continue o trabalho independente enquanto isso e não peça novamente uma autorização já concedida.
- Publicação, mensagens a terceiros, alterações destrutivas e mudanças de consentimento exigem autorização correspondente; um pedido de implementação não a concede automaticamente. Preserve os gates explícitos de identidade, retomada e confiança de hooks, mesmo em tarefas longas.

## Produto e arquitetura

Oracle é um aplicativo macOS para explorar conhecimento local, editar notas originais do Obsidian e configurar um Second Brain com o GBrain oficial.

- Alvo atual: macOS 13+, arm64, Swift 5.9, AppKit e WKWebView com recursos locais.
- `Sources/Oracle/`: aplicativo nativo, ponte com a interface, estado, edição, onboarding, licenças, integração GBrain, manutenção e testes nativos.
- `Resources/web/`: interface em HTML, CSS e JavaScript. `index.html` define os scripts carregados; `app.js` coordena a interface; `atlas.js` e `flat-universe.js` implementam o mapa atual.
- `packages/atlas/`: modelos e lógica do Atlas, departamentos, layout e movimento. O renderer ativo é SVG 2D; a presença de Three.js e código WebGL histórico não autoriza reativá-los.
- `packages/gbrain-adapter/`: adapter TypeScript/Bun para GBrain, MCP, leitura, limites de fontes, atualização do índice e backup.
- `packages/contracts/`: contratos compartilhados, incluindo replay.
- `Resources/catalog/`, `Resources/gbrain-method/` e `Resources/updates/`: catálogos, método oficial e fontes de atualização.
- `skills/`: skills distribuídas com o produto. Leia a skill correspondente quando executar um fluxo de setup ou onboarding.
- `scripts/`: geração de recursos, fixtures, validação, build, empacotamento e emissão de licenças.
- `docs/implementation/` e `docs/decisions/`: contratos e decisões. `docs/evidence/` e `docs/benchmarks/` contêm resultados com escopo e data próprios.
- `.work/`: estado descartável, builds e relatórios locais. `vendor/` e `node_modules/` podem ser dependências compartilhadas por symlink; não as modifique incidentalmente.

Use o `README.md` para orientação inicial quando o contexto do projeto ainda não estiver claro; não o releia por rotina em ajustes pontuais. Para alterações de integração, consulte `docs/implementation/integrated-delivery-20260911.md`; para dados, `docs/implementation/data-reliability-20260910.md`; para distribuição, `docs/implementation/distribution-pipeline.md`.

## Contratos do produto

- Preserve a navegação departamentos → especialistas → skills, a paginação e a possibilidade de alcançar todos os itens. Organização visual não deve mover arquivos nem inventar relações entre skills.
- Preserve a identidade visual e o comportamento aprovados, salvo solicitação de mudança. Na implementação atual, a escala do mapa é 120% do enquadramento, com translação; estrelas e círculos de expansão são decorativos.
- Use linguagem compreensível ao usuário. Detalhes internos só devem aparecer quando ajudarem a decidir ou resolver um problema.
- Salvar uma nota atualiza o `.md` original. Preserve rascunhos, alterações concorrentes e limites do vault; o índice é derivado. Uma leitura parcial não autoriza purgar exclusões.
- Instalação e retomada locais não exigem conta ou modelo Codex. Conectar ao Codex é uma ação opcional e explícita. Não adicione exercício inicial ou treinamento obrigatório.
- Preserve o plano e os recibos do onboarding. Confirmação de identidade no readback e retomada são ações separadas; não fabrique confirmação nem conclua com índice parcial.
- Pacote encontrado, ponte preparada, ferramenta disponível, conexão ativa e execução verificada são estados distintos. Não apresente hooks como confiados por terem sido preparados.
- Licenças e papel owner dependem de assinaturas válidas. Vault existente, UUID ou preferência de interface não concedem administração. Não adicione bypasses.
- Captura, manutenção, síntese remota e backup têm consentimentos próprios. Não confunda consulta/indexação sem modelo com inferência de IA offline.

## Validação

- Escolha verificações pertinentes à mudança. Para documentação, revise conteúdo, caminhos e diff; não compile o app por esse motivo.
- Em ajustes visuais iterativos, não execute lint, typecheck ou build sem solicitação explícita. Inspecione a interface renderizada no contexto afetado, preferindo WKWebView para comportamento nativo.
- Testes devem usar perfis isolados e notas sintéticas em `.work/`. Nas suítes nativas que exigem `--state`, forneça um diretório descartável explícito. Nunca reinstale a configuração pessoal para testar.
- Não execute simultaneamente testes de UI nativa que disputem foco. Preserve os relatórios e descreva o que foi realmente exercitado.
- Não some verificações de escopos diferentes como se fossem uma única jornada. Fixture de interface, protocolo MCP real, pacote assinado e integração pessoal ativa exigem evidências próprias.

Exemplos de verificações unitárias existentes, a selecionar conforme o escopo:

```sh
node --test scripts/test-departments.mjs scripts/test-department-navigation.mjs
node --test scripts/test-library-model.mjs scripts/test-reader.mjs
node --test scripts/test-atlas-audit.mjs
python3 scripts/build-manifest.py self-test
bash -n scripts/build.sh scripts/package.sh scripts/release.sh
```

Para integração nativa, consulte os requisitos de `scripts/test-native-ui.py`, `scripts/run-audit-integration.py`, `scripts/test-integrated-web-native.py` e `scripts/test-mcp-offline.py` antes de executar. `scripts/test-audit-ui.js` é código para o harness WKWebView, não um teste Node independente. Não existe script genérico `npm test` no `package.json` atual.

## Build e distribuição

Ferramentas necessárias: Swift da Apple, Bun e Python 3, com dependências e GBrain previamente provisionados nos pins revisados. Use o pipeline existente; não execute bootstrap ou instalação de dependências como efeito colateral de um build.

```sh
bash scripts/build.sh --channel developer --preflight
bash scripts/build.sh --channel developer
bash scripts/package.sh --channel developer --preflight
```

- O build regenera recursos: confira o diff ao final. Edite a fonte dos bundles, não apenas a saída gerada; por exemplo, `Resources/web/universe.js` vem de `packages/atlas/universe.js` e `Resources/web/replay.js` de `packages/contracts/replay.js`.
- O bundle developer fica em `.work/build/developer/Oracle.app`; pacotes ficam em `dist/<versão-buildID-canal-arquitetura>/`. Package preflight exige um bundle existente com manifesto válido.
- Assinatura ad hoc não equivale a Developer ID, notarização, ativação física homologada ou teste em segundo Mac.
- Release exige fonte limpa, configuração explícita de assinatura, entitlements e perfil de notarização. `scripts/release.sh` faz somente preflight por padrão. Não remova gates para fazer uma entrega passar.
- Build e empacotamento não instalam nem publicam o aplicativo. Quando a tarefa incluir substituir `/Applications/Oracle.app`, preserve o bundle anterior em um caminho de recuperação, copie com `ditto` e verifique com `codesign --verify --deep --strict`.
- Chaves privadas do emissor, ledger, credenciais e perfis pessoais ficam fora do repositório, do app e do DMG. `Resources/licensing/public-keys.json` contém somente chaves públicas revisadas.
