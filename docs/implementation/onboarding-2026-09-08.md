# Onboarding e conexão Codex — tarefa B

Implementação dos requisitos 18 e infraestrutura do 10 do briefing de 08/09/2026. A interface principal, atlas, edição, modais existentes e pacote final consolidado pertencem à tarefa A.

## Resultado

O app verifica um código Ed25519, conecta à conta ChatGPT pelo **app-server público do Codex**, recebe o vault pelo NSOpenPanel, apresenta a identidade para revisão e envia a **skill `oracle-onboarding` ao Codex GPT-6 Astra/xHigh**. O Codex executa os comandos determinísticos do app. Uma segunda confirmação usa a leitura oficial do GBrain antes de renderizar a identidade. Nenhum timer, texto do agente ou pacote instalado conta como conclusão.

O E2E real, em vault sintético, percorreu criação de estrutura, catálogo, entrevista, confirmação, índice e descoberta da skill pela API `skills/list`. Encontrou uma falha no adaptador antigo ao resolver `references/research-framework.md`; a instalação permaneceu pendente. O adaptador foi corrigido e o mesmo plano/tarefa foi retomado até a verificação completa. Não houve reinstalação da configuração pessoal. A retomada bem-sucedida levou 86 segundos; esse tempo não representa a duração total incluindo diagnóstico.

## Emitir códigos

Na pasta ORACLE:

```sh
# Uma vez, em um Mac emissor. Recusa substituir uma chave que já existe.
scripts/oracle-license init

# Só a chave pública entra no aplicativo e no Git.
scripts/oracle-license export-public > Resources/licensing/public-keys.json

# Emitir um código. A pessoa cola a saída no aplicativo.
scripts/oracle-license issue --to 'Nome da pessoa' --days 365

# Opcional: vincular ao identificador que aparece em "Código para este Mac".
scripts/oracle-license issue --to 'Nome da pessoa' --days 365 --device 'UUID-DA-INSTALACAO'
```

O emissor deste trabalho foi criado em `~/.oracle-issuer`: diretório 700, chave privada 600. **Não copie esse diretório para o repositório ou para o app.** A CLI aceita `--issuer-dir /destino/privado` após o comando e rejeita um destino dentro deste checkout. Faça uma cópia de segurança privada da chave; perdê-la impede emitir códigos para a chave pública incorporada.

Validação: prefixo e versão, payload exato, assinatura, chave pública conhecida, produto, identificador, prazo e vínculo opcional. A assinatura cobre `ORACLE1.` e os bytes exatos do payload, evitando ambiguidades de reserialização. Nenhuma chave de emissão é incorporada ao aplicativo.

A licença funciona offline. Sem `--days`, não expira. Sem `--device`, pode ser reutilizada em outras instalações. O identificador opcional representa uma instalação local; copiar o estado pode copiá-lo. Não há contagem central de assentos, revogação remota instantânea ou proteção absoluta contra alteração do cliente/relógio. Uma atualização pode remover uma chave pública; não revoga versões antigas offline. Perfis Oracle preexistentes são adotados para preservar o setup pessoal; esse caminho é explícito em `legacyAccess` e não se abre apenas por escolher um vault na UI nova.

## Integração com A

Arquivos novos nativos: `License.swift`, `CodexBridge.swift`, `PluginIcons.swift`, `Onboarding.swift`, `OnboardingUIBridge.swift`, `VaultAccess.swift`, `OnboardingTests.swift`.

Pontos no shell compartilhado:

1. `App.onboardingController` inicializado em `applicationDidFinishLaunching`; callback abre apenas URL de autenticação retornada pelo Codex em domínio OpenAI permitido.
2. `handleOnboarding(id,method:params:)` depois de verificar origem local, frame principal e bloqueio do app; gate de licença para perfis novos. O método retorna imediatamente e usa filas nativas.
3. `applicationWillTerminate` chama `shutdown()`. Pode coexistir com `applicationShouldTerminate`/`windowShouldClose` de A: esses devem terminar sua gravação de editor primeiro. Fechar durante instalação grava cancelamento cooperativo, preserva o plano e encerra o app-server.
4. `Core.snapshot()` acrescenta `onboarding` e `codexPlugins`. `Core.vault()` reabre a permissão da mesma pasta por bookmark; pastas movidas exigem nova seleção. Troca/revogação remove bookmark anterior.
5. Verificações de cancelamento entre lotes de catálogo/pastas e durante processos GBrain. O cancelamento não reverte os arquivos já confirmados.

Frontend: incluir `onboarding.css` e `onboarding.js` **antes de app.js**; após boot/unlock e refresh chamar:

```js
await OracleOnboarding.mount({ call, refresh, getState: () => state, toast });
```

Na configuração, substituir a entrada antiga `showSetup` por `OracleOnboarding.open()`. Antes de limpar a UI no bloqueio chamar `OracleOnboarding.suspend()`. O módulo tem um único timer, preserva rascunhos, gerencia Escape/clique fora/foco e mantém um card central flutuante. Usa os tokens `--panel`, `--ink`, `--muted`, `--line`, imagem `brand/symbol-white.svg` e suporta classes `reduce-motion`/`reduce-transparency` e media queries equivalentes. A pode trocar símbolo/copy pela identidade V3 sem alterar comportamento.

### Progresso e reprodução

`snapshot.onboarding` inclui:

```json
{
  "schemaVersion": 1,
  "licensed": true,
  "legacyAccess": false,
  "status": "running",
  "phase": "installing",
  "runID": "UUID do plano",
  "codexConnected": true,
  "confirmed": [{"id":"sol","kind":"core","label":"Oracle","evidence":"Codex turn/start"}],
  "completed": 1,
  "total": null
}
```

O evento DOM `oracle:onboarding-progress` transporta `schemaVersion`, `runID`, `status`, `phase`, `confirmed`, `completed`, `total`. Tipos de itens: `core`, `connector`, `skill`; skills também têm `path`. A sequência é SOL após turno aceito → Obsidian/Second Brain após verificação → skills após hashes dos arquivos do catálogo. O número mede itens confirmados, **não percentual da instalação**. Duração desconhecida mantém `total:null`. Ao concluir, a formação confirmada fica persistida com `confirmedAt`, para evitar rehash em idle; representa a confirmação histórica, enquanto o atlas usa seu snapshot atual de arquivos.

Estados: `not_started`, `configuring`, `review`, `starting`, `running`, `waiting_user`, `paused`, `cancelling`, `cancelled`, `interrupted`, `failed`, `completed`. `waiting_user` pode trazer `readback` ou `request`. `completed` exige estrutura, consulta GBrain, recibo de índice, bytes da skill e descoberta real por Codex. Um `turn/completed` sem esses resultados produz `paused`. Eventos de turnos anteriores são ignorados.

**Replay é projeção do journal. Não chamar `onboardingInstall`, `onboardingResume` ou qualquer CLI durante replay/pause/scrub.** Pausa da animação não é cancelamento da instalação. Cancelamento real usa `turn/interrupt`, aguarda evento e cria marcador cooperativo para processos/lotes. Retomada reabre a mesma tarefa e não inicia outro turno se o Codex informar um turno ainda ativo.

### Plugins

Métodos `codexPluginsRefresh` e `codexPlugins` (alias) retornam:

```json
{"status":"available","checkedAt":"ISO8601","plugins":[{"id":"...","name":"...","kind":"app","status":"connected","iconDataURL":"data:image/png;base64,...","detail":"Ferramentas disponíveis no Codex","evidence":"app/installed.enabled+callable"}]}
```

Somente `status:connected` deve orbitar o SOL. Esse estado confirma ferramentas disponíveis no Codex; não executa operações nos serviços externos para testar sua saúde. `installed`, `needs_auth` e `unavailable` ficam com seus estados no Observatório. `app/installed` com `forceRefresh:true` fornece a visão de ferramentas efetivamente disponíveis; `app/read` fornece nomes/logos. `plugin/installed` fornece pacotes. Para MCP, somente `runtimeStatus:connected` com ferramentas confirma conexão; uma lista de ferramentas em cache com `runtimeStatus:null` permanece instalada. `isAccessible` e pacote presente sozinhos não comprovam conexão.

Sem login, endpoint incompatível, desconexão ou verificação vencida, o app usa indisponível; dados antigos nunca continuam como conectados indefinidamente. A visão é da conexão Oracle ao Codex, não observação de todos os turnos do Desktop. Reconexão de perfil previamente autorizado é de leitura e não abre login sem ação da pessoa. Nenhum Gmail fixo foi adicionado.

Ícones públicos dos catálogos permitidos são carregados sem cookies/autorização, com limites de tamanho/tempo, e convertidos em PNG até 96 px. SVG e origens fora da allowlist não são executados; a UI deve ter fallback quando o ícone estiver ausente. A conexão é independente da disponibilidade de um ícone. Não usar imagens/nomes para decidir o estado do plugin.

## Build e testes

O adapter deve ser recompilado; `scripts/build.sh` agora faz isso para não distribuir novamente o indexador antigo. Requer a árvore `vendor/gbrain` do bootstrap, fixada no commit `2efaaf8f8a817b5b82e023383618fdcdb1cc5f7d`.

```sh
bash scripts/build.sh
ORACLE_ENGINE_RESOURCES="$PWD/dist/Oracle.app/Contents/Resources/engine" \
  .build/release/Oracle --state "$PWD/.work/onboarding-contracts" --self-test-onboarding
bun scripts/test-index-links.ts
node --check Resources/web/onboarding.js

# Diagnóstico de leitura, sem iniciar uma tarefa/modelo:
.build/release/Oracle --state "$PWD/.work/codex-audit" --codex-inventory
```

`build-onboarding-qa.py` compila um bundle com ID próprio `com.oraclecompanion.onboarding.validation` e mailbox de teste; não é incluído no pacote final. `test-onboarding-native.py` verifica licença real, navegação e conexão/inventário. `test-onboarding-live.py` exige o perfil sintético explicitamente marcado, código ativado e login normal do Codex; executa a skill real, com confirmação automática **somente dos dados sintéticos**. `--resume` reaproveita o teste após uma interrupção. O teste não aceita automaticamente solicitações de permissão do Codex.

Evidências:

- [Conexão e UI nativa](../evidence/onboarding-native.json).
- [Instalação real e retomada](../evidence/onboarding-live.json).
- [Ícones reais e inventário](../evidence/onboarding-plugin-icons.json).
- [Limites da janela, Escape e clique fora](../evidence/onboarding-visual.json).
- Testes Swift cobrem assinatura válida/adulterada/expirada, outra chave/dispositivo, gate, seleção/negação, cancelamento/retomada, turnos atrasados, desconexão e classificação de plugins.
- Testes do indexador cobrem links relativos, espaços/URI, referências desconhecidas, destinos externos e compatibilidade com o extrator GBrain fixado. Candidatos sem páginas correspondentes são contados como não resolvidos, nunca transformados em relações inventadas.

Limites: login pode exigir navegador/internet; APIs públicas de app-server continuam experimentais e falham de forma explícita se incompatíveis. A escolha do executável prioriza o Codex Desktop; a CLI npm 0.150.1 observada não entendia a configuração atual, enquanto o bundled 0.153.4 passou. Hooks preparados continuam exigindo confiança oficial, sem bypass. A UI principal, medições finais e app/DMG consolidado ficam com A; o pacote local permanece ad hoc, sem alegação de notarização.

## Referências de plataforma

As skills Liquid Glass e Design System Patterns foram lidas. O app real é AppKit + WKWebView, com deployment macOS 13; não foi migrado para copiar APIs de iOS. O seletor/autenticação usam UI nativa e o módulo HTML usa superfícies limitadas, fallback opaco e preferências de acessibilidade. Aplicação da orientação Apple: [Adopting Liquid Glass](https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass) e [NSGlassEffectView](https://developer.apple.com/documentation/appkit/nsglasseffectview). O protocolo Codex foi conferido pelos bindings gerados pelo binário instalado (`app-server generate-ts --experimental`), sem banco privado ou tokens extraídos.
