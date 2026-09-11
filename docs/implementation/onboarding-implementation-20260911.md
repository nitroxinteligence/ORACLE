# Oracle — captura e manutenção consentidas em 11/09/2026

Esta seção substitui o estado da integração anterior preservado abaixo.
Worktree e branch originais mantidos; nenhuma instalação, publicação, staging,
commit, merge, push ou fetch. Contas, históricos, vault e Keychain pessoais não
foram usados como fixtures.

## Funcionalidades concluídas nesta retomada

Captura com opt-in explícito para `codex_workspace_hooks_v1`: somente
`UserPromptSubmit.prompt` e `Stop.last_assistant_message`, exigindo sessão,
turno e workspace Oracle autorizado. Não abre `transcript_path`, históricos
privados, raciocínio ou saídas de ferramentas. A captura é deduplicada e
vinculada ao vault e à autorização vigente. Revogar/reativar não reenvia o
conteúdo da autorização anterior. Não há captura retroativa de outras conversas.

As mensagens recebidas são projetadas em
`INBOX/oracle-history/conversations`; edições existentes são preservadas.
A síntese tem consentimento remoto separado, recebe somente mensagens capturadas
em lotes limitados, usa modelo anunciado pela conexão Codex e salva notas em
`INBOX/oracle-history/syntheses`, com referências às mensagens originais.
Não altera identidade nem transforma conclusões do modelo em fatos confirmados.
Resposta persistida e verificada pode ser reutilizada após falha local de escrita.

O executor usa uma conexão Codex exclusiva com perfil nomeado efêmero:
`:root=deny`, leitura apenas do workspace vazio de síntese, rede de comandos
desativada e sem herança de perfil. A configuração exata precisa retornar como
`sessionFlags`, e a thread precisa confirmar o mesmo perfil. Os argumentos não
reescrevem a configuração global nem exportam credenciais. Recursos de ferramentas,
apps, MCP, hooks e descoberta de skills são desativados; pedidos ou eventos de
ferramentas interrompem a execução. O antigo campo `readOnly.access`, ausente no
contrato do CLI instalado, não é mais usado.

Pausa e revisão do consentimento permanecem disponíveis durante a síntese.
Cancelamento, falha, resposta incompleta ou lote pendente não avançam o sucesso
da rotina completa. Sincronização e backup continuam sob os locks existentes,
sem aquisição recursiva do escritor GBrain. O backup mantém consentimento próprio.

## Validação efetivamente executada

| Camada | Resultado desta composição |
|---|---|
| Swift release | 365 checks: onboarding/ORACLE2/políticas 135, updates 34, editor 20, Core 24, backup 13, manutenção 139 |
| Interface WKWebView com ponte simulada | 19/19, incluindo ORACLE2 e consentimentos separados de captura/síntese/backup |
| Swift + GBrain + adapter | 45/45 sobre o binário final, incluindo captura pelo CLI, projeção Markdown, índice oficial e pausa |
| Backup físico do adapter | 31/31, com restauração nova e inativa e preservação do banco ativo |
| MCP determinístico | 15/15, com o mesmo adapter, em fixture descartável |
| Grafo/replay | 76 testes e 2 contratos |
| Links canônicos | 9/9 + 4/4 |
| Empacotador e espelho | 21/21 e 34 testes sem falhas/erros |
| Método oficial | 73 métodos, 1.672 arquivos e 87.014.517 bytes verificados |
| Novo bundle local | 365/365 reexecutados nas seis suítes, sem override de recursos; assinatura ad-hoc verificada |

Swift e E2E final confirmaram fontes inalteradas durante a execução. O teste de
interface possui hashes dos recursos efetivamente carregados. Contagens misturam
escopos distintos e não representam certificação geral nem inferência real.

SHA-256 do executável antes da assinatura do novo bundle:
`2902df7743c102fe9d444b1f5d434b7b6a677c218752fef4cfe3c7c89c917052`.
Adapter preservado e retestado:
`33c281fe404a5cb48f0b095bd2bdc84796218ea9aa98e598df598a3665e8ab7c`.
E2E final e vínculos de hash: `.work/maintenance-final-20260911/e2e-run.json`.
Regressão nativa: `.work/validation-20260911/native-result.json`.
Interface: `.work/atlas-worker/native/result.json`.

## Bundle final desta composição — retomada de empacotamento

Bundle: `.work/developer-delivery-maintenance-20260911/Oracle.app`.
Montagem concluída em `2026-09-11T19:18:49Z`, com 6.607 arquivos,
409.984.572 bytes e 940 skills de catálogo. O destino é novo, com estado próprio;
os bundles anteriores foram preservados. Não houve instalação nem publicação.

Nesta retomada, as fontes e os recibos existentes foram reconferidos por hashes
antes da montagem. As seis suítes foram efetivamente reexecutadas dentro do novo
bundle: onboarding/ORACLE2/políticas 135, updates 34, editor 20, Core 24,
backup 13 e manutenção 139, totalizando 365 verificações aprovadas.
Os demais testes da tabela pertencem à validação anterior da mesma composição;
não foram reexecutados durante este empacotamento.

`codesign --verify --deep --strict` passou com assinatura ad-hoc, sem identidade
pessoal. Fontes, entradas testadas e bytes do bundle permaneceram inalterados
durante a validação, salvo as mudanças de assinatura registradas no manifesto.
Os testes usaram rede negada e escritas restritas ao novo destino, sem conta
Codex, vault ou Keychain pessoais. Não foi necessária nova alteração funcional.

Recibo: `.work/developer-delivery-maintenance-20260911/bundle-evidence.json`.
Manifesto: `bundle-fingerprints.json`, no mesmo diretório, SHA-256
`1dbf442862ec37196109e3ee14125e5cc8b0d2f4e0d04d787d994275e13a6813`.
O manifesto distingue entradas de executáveis após assinatura. O fechamento
consolidado fica em `.work/validation-20260911/closeout-evidence.json` e
`closeout-fingerprints.json`; os recibos anteriores ao empacotamento foram
preservados em `.work/maintenance-resume-20260911/prior-evidence`.

## Verificação do host e limites reais

CLI instalado `0.153.4`, SHA-256
`87a08119b8effa519f0ecb552dc98043f58a8200bf2ec5da60f76890c33e9c3a`.
O host confirmou o perfil nomeado via `initialize`, `config/read` e
`permissionProfile/list`, com diretórios HOME/CODEX_HOME/TMPDIR descartáveis.
A listagem de recursos também aceitou os controles adicionais usados na síntese.
Nenhum desses exercícios conectou uma conta ou executou inferência.

Quatro tentativas de `command/exec` no probe de permissões pararam antes de
executar o comando, com `sandbox_apply: Operation not permitted`. Isso não
comprova a contenção no kernel, nem invalida o contrato de configuração aceito.
Evidência: `.work/maintenance-host-20260911/named-permissions-v2/result.json`.

Agendamento externo continua não registrado. Nenhum método público de registro
foi encontrado no CLI/protocolo instalado; um pedido ou arquivo local não vale
como confirmação. Não foi criada tarefa apontando para fixture. O timer da
manutenção requer Oracle aberto e desbloqueado; os hooks consentidos podem
registrar mensagens enquanto a interface estiver fechada.

Ainda exigem ambiente e autorização próprios: execução autenticada de síntese,
acionamento real dos hooks confiados pelo host, registro de tarefa no perfil
final e integração física de licença/Keychain. Os testes ORACLE2 foram sintéticos.
O backup cobre o banco, não todos os arquivos/anexos do vault, e a restauração
não ativa o novo estado. Não houve upgrade do Codex nem alteração do aplicativo
atualmente instalado para contornar esses limites.

## Histórico da integração anterior

# Oracle — integração final local de 11/09/2026

Esta seção substitui os resultados, hashes e pendências do histórico abaixo.
A implementação existente foi continuada no mesmo worktree/branch, sem staging,
commit, merge, push, fetch, instalação sobre o aplicativo atual ou acesso à outra
auditoria. Contas, vault e Keychain pessoais não foram usados como fixtures.

## O que foi integrado

Backup nos Ajustes, CLI e ponte nativa, com consentimento separado vinculado ao
perfil/vault. Troca de vault, perfil externo e revogação não reutilizam autorização
como ativa. Integridade não é apresentada como restauração; restaurar exige outra
confirmação, cria estado novo e não substitui/ativa o banco atual.

Na manutenção, sync libera o lock GBrain antes do backup consentido. Falha ou
recibo incompleto impede novo sucesso e preserva o sucesso anterior. “Executar
agora” também respeita pausa/consentimento. O status externo permanece
`registered=false`; fases consentidas de captura/síntese não implementadas ficam
em `deferred`, com `complete=false`, sem inventar conclusão da rotina completa.

A entrega ORACLE2 foi preservada e recompilada. A interface cobre solicitação
explícita de identificador, erro/retentativa sem perder o código digitado, cópia
somente do identificador público e ausência de ativação/conexão automática.
O contrato nativo foi testado com provedores sintéticos, não com Keychain pessoal.

## Resultados reexecutados

| Camada | Resultado final |
|---|---|
| Swift release | 226: onboarding/ORACLE2/políticas 135, updates 34, editor 20, Core 24, backup 13 |
| WKWebView real com ponte simulada | 18/18, incluindo ORACLE2, backup e manutenção |
| Grafo e replay | 76 testes TAP + 2 contratos de replay |
| Backup físico do adapter | 31/31, incluindo restauração em estado novo |
| Swift + engine + adapter | 40/40, incluindo comandos, backup, manutenção e pausa |
| MCP determinístico | 15/15 |
| Links | 9/9 + 4/4 |
| Empacotador de release | 21/21 |
| Espelho de fontes | 34 testes; zero falhas/erros e nenhuma mutação Git |
| Método oficial | 73 métodos, 1.672 arquivos, 87.014.517 bytes verificados |
| Bundle montado | 226/226 novamente, sem override de recursos; assinatura ad-hoc verificada |

Os testes usaram rede negada e estado descartável no `.work`. Resultados de escopos
diferentes não são certificação global. O binário inicial do worker não reproduziu
os testes finais e não foi promovido. As mesmas fontes do adapter foram recompiladas
pelo build normal; os 31 testes, E2E e MCP passaram antes da promoção. A cópia
anterior foi preservada. O replay usou outro diretório de trabalho para escrever
relatórios no scratch; não foi preciso alterar código do gráfico.

## Bundle e evidências

Bundle: `.work/developer-delivery-integrated-20260911/Oracle.app`.
6.607 arquivos, 409.780.176 bytes e 940 skills empacotadas. Bundle novo de validação,
com estado próprio; não instalado nem publicado. Assinatura ad-hoc verificada por
`codesign --verify --deep --strict`, sem identidade pessoal de assinatura.

SHA-256 das entradas testadas, antes da assinatura do bundle:

- Swift: `a18b95d670c8ff3c3643794f49feb1e3c4eb7531b677001c49e5b1aa4bd49921`.
- Adapter: `33c281fe404a5cb48f0b095bd2bdc84796218ea9aa98e598df598a3665e8ab7c`.
- GBrain preservado: `d1a897d8f4d036da81cc9b276b90b2922b0364a2ab097f8b015a137ec044a865`.
- Manifesto do bundle: `02d5999123dfaba87ff9e96e5d26f4162a9aa93baf72ef19c0a1143237d34951`.

`bundle-fingerprints.json` separa entradas e executáveis pós-assinatura.
Relatórios finais: `.work/validation-20260911/closeout-evidence.json`,
`closeout-fingerprints.json` e `.work/developer-delivery-integrated-20260911/bundle-evidence.json`.
Logs desta integração e recibos anteriores preservados:
`.work/validation-20260911/integration-20260911/`.

## Pendências reais

Captura automática de conversas e síntese por modelo não têm executor local.
Agendamento externo permanece não registrado/verificado; o timer local requer
Oracle aberto e desbloqueado. Conta/modelo Codex reais e vínculo físico/Keychain
da licença não foram exercitados; a evidência ORACLE2 é sintética.

O backup cobre somente o banco PGLite, não Markdown/anexos nem todo o aplicativo;
no mesmo disco e sem criptografia própria. Restauração é em estado novo, sem
ativação. Publicação remota, versões posteriores ao pin e qualificação de
distribuição ficam fora desta validação local, não são novos requisitos para
usar o bundle de desenvolvimento.

## Histórico anterior — resultados e pendências substituídos pela seção acima

# Oracle — implementation isolated from the full-audit session

## Workspace boundary

- ONLY this worktree: `ORACLE/.work/worktrees/onboarding-implementation-20260910`.
- Branch: `codex/oracle-onboarding-implementation-20260910`; baseline `f14382479cb769f8b57cf5d38db27acf0947a243`.
- `ORACLE` root/main and `audit-full-20260910` belong to other work. Do not modify, stage, merge, push, install, or interrupt processes there.
- Do not use personal vault, live GBrain, Keychain signing identity, Codex credentials, global config, or personal schedules as test fixtures. State/build/test outputs belong to this worktree's `.work`.
- Shared vendor/node_modules/catalog packs may be READ ONLY links. Engine binaries must be local copies before rebuilding. Never run an installer against linked dependencies.

## User decisions (supersede the original audit proposals)

1. GBrain from `garrytan/gbrain` is the primary second-brain engine and method; Obsidian is the document environment, Codex the AI orchestrator. No replacement engine, token-to-API reuse, paid provider, or fabricated identity.
2. Onboarding: logo/access code, vault, only necessary identity/connection/consent, verified installation, then graph. NO first-memory exercise, post-install tour, forced cold-start, or tutorial. The mentor teaches use.
3. Graph: department -> digital specialist -> actual skills. Overview departments plus their specialists, department click expands its skills. Keep current personal/professional/prompts orbits, fixed colors, 118% overview zoom and restrained 2D appearance. Organize logically without moving user's directories.
4. Prepare per-user maintenance with separate consent for capture/remote use, idempotency and catch-up. Never fabricate a scheduler RPC or use a TOML file as proof of registration. A task runs only while its execution environment is available; it does not train model weights. Mentor publication is NOT a student task.
5. Updates: persistent green soft pulse for known updates, reduced-motion static, automatic check-only discovery, explicit Verificar check-and-apply eligible packages with explanation. Preserve edits, errors, pending incompatibilities and ownership. Do not blindly update a GBrain external profile or mix runtime/schema/adapter versions.
6. Publisher: OS/SISTEMA/skills -> ORACLE-SKILLS is authorized, but source data-less iCloud files must block incomplete publications, never mass-deletions. Sources mirror != release. No publication or hydration during synthetic tests.
7. Offline local access and one-Mac licensing remain requirements; cloud Codex/downloads cannot be claimed offline. No note deletion on license failure. Signing/notarization and real-device validation require release qualification.

## Implementation batches

- Reliability patch: resume/review, serialized drafts, approval queue, update ledger and pulse.
- Department graph and manifest without moving skill content.
- GBrain official skill distribution, effective identity, canonical folder schema, incremental sync and technical diagnostics.
- Publisher/compatible releases and additional update sources.
- Consent-aware maintenance and supported scheduler handoff; disclose pending external registration.
- Full local compile and synthetic regression/integration tests before release.

## Current status

## Entrega local verificada — 11 de setembro de 2026

As alterações abaixo estão nos arquivos reais deste worktree. Não houve staging,
commit, merge, push, publicação, instalação sobre o aplicativo atual nem acesso ao
worktree da outra auditoria. As dependências compartilhadas foram usadas somente
para leitura. Os links locais de `node_modules` e `Resources/catalog/packs` estão
explicitamente ignorados pelo Git para não publicarem caminhos do computador.

### Implementação integrada

**Onboarding mínimo e recuperável.** Código → vault → conexão/modelo realmente
disponível → identidade e consentimento → revisão → instalação verificada →
gráfico. Novos planos não criam um catálogo opcional vazio nem instalam coleções
em massa. Planos já revisados continuam sujeitos ao próprio hash. O estado de
revisão não é tratado como instalação em andamento. Rascunhos são serializados;
falhas permanecem visíveis e bloqueiam transições críticas. Uma nova fonte ou
execução não reutiliza um readback de identidade antigo. Não há exercício de
primeira memória, tour ou cartão de próxima tarefa ao concluir.

**Codex.** Seleção a partir dos modelos e esforços anunciados pela conexão, com
tratamento explícito para conta sem modelo padrão/seleção incompatível. Fila de
autorizações preserva todos os pedidos e seus IDs; recusar o primeiro não esconde
o seguinte. Pedidos de um turno antigo não são reaproveitados. A verificação
procura as duas skills no workspace do Codex e diferencia descoberta de arquivos,
identidade, confiança de hooks e execução real. Os testes não conectaram uma conta.

**Departamentos.** Manifesto lógico sem mover documentos: departamento →
especialistas realmente encontrados → skills. Panorama não desenha as folhas;
departamento/especialista possuem paginação e histórico. Busca alcança todas as
entradas em páginas de 100 resultados e revela a skill selecionada no gráfico,
inclusive quando estava em outra página. Áreas Pessoal/Profissional/Prompts,
identidades dos documentos e zoom de 118% foram preservados. Escape também retorna
à visão anterior quando o foco está na árvore lateral de um departamento.

**Método e índice GBrain oficiais.** Versão fixada `0.48.4.0`, commit
`2efaaf8f8a817b5b82e023383618fdcdb1cc5f7d`, validado no manifesto.
O pacote contém 73 procedimentos, 1.672 arquivos e 87.014.517 bytes, com referências
e licença MIT preservadas a partir dos objetos Git fixados. A biblioteca completa
fica fora da descoberta automática; duas skills explícitas fazem o roteamento.
SOUL/USER e demais arquivos de identidade são projetados com hashes no workspace;
edições externas ou identidades ausentes impedem uma falsa confirmação.

O índice deriva do Markdown canônico no vault. A sincronização distingue arquivo
inalterado, edição, renomeação, remoção e links explícitos; mantém hashes de arquivo
e página, impede colisões e recusa inventários incompletos antes de remover dados.
`oracle-memory` não é reindexado como cópia duplicada em `oracle-vault`. O MCP
permite operações determinísticas e memória autorizada com escrita no Markdown;
provedores, credenciais, outra origem de memória e operações de inferência não são
habilitados por conveniência. Instalações externas são preservadas.

**Sincronização e manutenção local.** Executor serial enquanto Oracle está aberto
e desbloqueado, com oportunidades periódicas e após salvamento. A rotina diária
é separada da indexação básica: consentimento por perfil/vault, horário/fuso,
retomada de uma oportunidade perdida, exclusão mútua com setup/atualizações e pausa.
Somente `status=verified` com `complete=true` produz `local_complete` e atualiza
último sucesso. Fontes externas, troca de vault, revogação e falhas não produzem
falso sucesso. Ajustes mostram esses limites. O pedido de tarefa externa não é
tratado como registro de tarefa. Captura, síntese por modelo e backup integral do
banco continuam explicitamente pendentes no recibo, não concluídos pelo executor.

**Atualizações e pacote instalável.** Consulta automática sem aplicação; Verificar
consulta e aplica somente pacotes elegíveis, com explicação. Falhas/offline não
apagam novidades previamente conhecidas. Pulso verde discreto; movimento reduzido
fica estático. Contrato de catálogo v2/Oracle 0.3 preserva licenças, SQL, SVG e
imagens além dos formatos anteriores; v1/0.2 continua legível. Limites, checksums,
colisões Unicode/caixa e propriedade por repositório são validados antes da escrita.
Alterações pessoais e fontes estrangeiras não são adotadas silenciosamente.

O empacotador recusa inventários vazios/inacessíveis, iCloud dataless, links,
formatos não suportados, mudanças durante leitura e padrões comuns de credenciais.
Falhar não substitui o pacote anterior. A detecção de credenciais é conservadora,
mas não substitui revisão humana de conteúdo/licenças. Nenhum script de skill é
executado pelo empacotador. Preparar um pacote não equivale a publicá-lo.

**Espelho conservador de fontes.** `scripts/source-mirror.py` mantém um contrato
separado do pacote instalável. O padrão é gerar um plano sem copiar conteúdo;
aplicar/retomar exige o hash revisado, as mesmas origens/destinos, HEAD e referência
base local. Preserva arquivos não pertencentes ao espelho, edições, mudanças de
permissão e exclusões do usuário. A remoção na origem não apaga o original no
destino. O diário antecipado e os backups permitem retomada verificável; não se
afirma atomicidade de toda a árvore nem se faz commit Git.

Antes de qualquer controle/aplicação, `.oracle-source-mirror/` precisa estar
integralmente ignorado e sem caminhos rastreados pelo Git. `.gitignore` e
`.git/info/exclude` são vinculados ao plano; a ferramenta não altera essas regras.
Os metadados e backups de controle são privados, não são fonte/release e não
devem ser publicados. A proteção contra inclusão acidental não impede `git add -f`
ou a retirada deliberada da regra. O estado remoto continua sempre
`remote_sync=unverified-no-fetch`; a ref armazenada localmente não prova frescor
remoto. Protocolo: `docs/implementation/source-mirror-protocol.md`.

O espelho admite especialistas adicionais com caminhos seguros, mas o instalador
v2 continua limitado às sete coleções aprovadas. Não houve acesso ao OS real ou
ao ORACLE-SKILLS real, hidratação, fetch, publicação ou execução de scripts de skills.

**Escritas e isolamento.** A gravação atômica usa arquivo temporário irmão e
operações POSIX, sem depender de temporário global do Foundation. Preserva
permissões POSIX, recusa alvos vinculados e revalida o destino antes da substituição.
Core não apresenta um inventário parcial causado por erro de enumeração como se
fosse uma leitura completa. As suítes exigem estado e raiz temporária explícitos
sob `.work`; não inicializam o perfil pessoal por omissão.

### Evidências executadas

| Camada | Resultado observado | Evidência local |
|---|---|---|
| Swift nativo integrado | 169 checks: onboarding 91, atualizações 34, editor 20, Core 24; todos aprovados | `.work/validation-20260911/native-result.json` e `test-*.log` |
| Interface real WKWebView | 15/15, Three.js/WebGL2 real, sem erro JavaScript ou chamada privilegiada inesperada | `.work/atlas-worker/native/result.json` |
| Gráfico JavaScript | 70 checks reportados na entrega anterior da frente de departamentos; sem nova execução nesta retomada | scripts `test-departments.mjs`, `test-department-navigation.mjs` e regressões existentes |
| GBrain/identidade/sincronização | 27 verificações sintéticas novamente aprovadas com engine oficial e o binário final do prime, já com as travas de `prepareBridge()` | `.work/validation-20260911/test-gbrain-exact-final.log` |
| MCP determinístico | 15 verificações aprovadas; sem conta ou inferência real | `.work/worker4/mcp-final.log` |
| Links e fronteiras canônicas | 9 + 4 verificações aprovadas | `.work/worker4/links-final.log` |
| Pacote oficial | 73 métodos/1.672 arquivos/87.014.517 bytes novamente verificados contra os blobs fixados, sem rede | `.work/validation-20260911/test-official-package-final.log` |
| Empacotador de release | 21 verificações aprovadas após o endurecimento de descritores/ancestrais e a redação de nomes com credenciais | `.work/release-tests/result.json` e `.work/validation-20260911/test-release-builder.log` |
| Espelho de fontes | 34 testes, zero falhas/erros, incluindo privacidade do controle, preservação, concorrência e dez pontos de interrupção | `.work/publisher-worker/result.json` e `tests.log` |

O runner nativo registra hash do binário e dos arquivos Swift e confirmou
`sourcesUnchangedDuringRun=true`. O teste WKWebView registra os hashes dos recursos
web e também confirmou fontes inalteradas durante execução. Seus testes funcionais
usam movimento reduzido; isso não qualifica desempenho contínuo/consumo de GPU.
Contagens representam verificações de escopos diferentes, não certificação geral.

A retomada confirmou os hashes atuais dos arquivos Swift/Package, dos 14 recursos
da interface e dos scripts do espelho contra seus relatórios anteriores. Não foi
necessário atribuir testes antigos a fontes modificadas. O binário nativo final é
`.work/validation-20260911/swift-prime/release/Oracle`, SHA-256
`24ed31f1089fa15995afa2cd4c5a22d453c7d0b212d9e65bddeea957fb0aa543`.
O novo E2E do GBrain usa a fixture descartável
`.work/gbrain-method-sync-ce7b30480df14b65b0f3a92f25d1ae73`, com rede negada,
leitura do home privado negada e escritas restritas ao `.work` deste worktree.
Isso cobre a preparação normal e repetida da ponte após as novas travas; não é
autenticação ou execução real de modelo no Codex.

O relatório consolidado e o inventário final de hashes ficam em
`.work/validation-20260911/closeout-evidence.json` e `closeout-fingerprints.json`.
São registros locais de fontes/recursos e resultados, não um manifesto de release
nem uma assinatura de distribuição. Nenhum novo bundle completo foi montado ou
instalado; `scripts/build.sh` continua sem execução nesta sessão e requer revisão
dos caminhos de scratch/cache antes de uso dentro deste isolamento.

Adapter testado promovido somente à cópia local ignorada
`Resources/engine/oracle-gbrain-read`, SHA-256
`1591c85d5a44dc483505206cdcee059a06bb0eed8ab74e3dcffef628bbeb8152`.
O binário oficial `Resources/engine/gbrain` foi preservado. Evidência consolidada
da frente GBrain: `.work/worker4/final-evidence.json` (55 verificações: 27 + 15 + 13).
O pacote oficial tem 95 referências upstream classificadas como exemplos ou
indisponíveis; elas não foram inventadas nem convertidas em dependências executáveis.

Comandos reproduzíveis nesta cópia:

```sh
bash scripts/test-onboarding-native.sh
python3 scripts/test-integrated-web-native.py
python3 scripts/test-skills-release.py
python3 scripts/build-official-skills.py --check
git diff --check
```

Os dois primeiros runners configuram os próprios ambientes isolados. O runner
Swift bloqueia rede e escritas de runtime fora de seu scratch; o WKWebView usa
ponte simulada, dados não persistentes e bloqueio de leitura do home pessoal.
Os testes GBrain usam seus próprios perfis/cópias da engine e sandbox sem rede.
Os comandos Python de release e espelho, isoladamente, não instalam esse sandbox:
foram executados dentro de perfis externos que negam rede e limitam escritas aos
respectivos diretórios de testes. Para o espelho, o perfil observado está em
`.work/publisher-worker/offline.sb`; o log confirma 34 casos no macOS, com índices
e referências Git sintéticos e nenhuma chamada de mutação Git.

O túnel do Mac voltou a aceitar leitura/execução. A coordenação `agents status`
recusou a chamada e sua única repetição com `WORKER_IDENTITY_LOST`; nenhum status,
mensagem ou freeze foi atribuído a um worker nesta retomada. A entrega do espelho
foi conferida pelo log terminal, pelo resultado em disco e pelos hashes idênticos
dos scripts, sem reatribuir trabalho nem modificar seus arquivos.

Uma repetição adicional dos nove testes JavaScript foi interrompida antes de
iniciar qualquer teste: `node` não estava no PATH da shell sem login e a atribuição
do executável encerrou o comando com código 1. Não houve instalação de runtime,
upgrade ou mudança de PATH global. Isso não é uma falha de asserção do gráfico:
os 70 checks continuam atribuídos à entrega anterior, e os 15 testes WKWebView
continuam vinculados aos recursos atuais por hashes, sem alegação de nova execução.

### Gates ainda abertos — não interpretar testes verdes como liberação

1. Exercício de autenticação, modelos anunciados, confiança de projeto/hooks e
   uso efetivo da identidade/procedimentos no Codex real, com autorização própria.
   Arquivos verificados, `skills/list` e MCP sintético não provam esse exercício.
2. Registro/inspeção de uma tarefa real no mecanismo oficial do host. O estado
   permanece pendente; não há banco privado/TOML alterado para fabricar registro.
   Captura de conversas, síntese noturna por modelo e backup integral ainda não
   foram provisionados pelo executor local e requerem implementação/qualificação
   específica, além de consentimento.
3. Publicação real do espelho/release e validação de atualização remota em dois
   computadores. Nenhum vault OS pessoal foi lido, hidratado ou publicado nesta
   validação; nenhuma referência remota foi avançada.
4. GBrain posterior ao pin, migração de dados/runtime e atualização do próprio
   método precisam de matriz de compatibilidade. Não atualizar uma instalação
   externa nem misturar automaticamente versões de engine/adapter/esquema.
5. Integração futura com a entrega independente da outra auditoria, seguida de
   validação combinada. Licença de um Mac, migração de dispositivo, papéis de
   administrador/aluno, assinatura/notarização e distribuição continuam gates de
   produto. Nenhuma conta, Keychain ou instalação real foi alterada para testá-los.
   A licença atual ainda usa UUID persistido no estado e binding opcional no
   payload; a alteração desta sessão em `License.swift` foi somente a gravação
   atômica, não implementação de vínculo físico/Keychain para um único Mac.

A leitura/escrita local não é inferência cloud offline, e downloads não ficam
disponíveis sem rede. Não houve promessa ou validação de tais capacidades.
