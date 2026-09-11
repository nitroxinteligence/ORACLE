# Backup privado do banco GBrain

APIs: gbrainBackupStatus(), configureGBrainBackupConsent(enabled:), createGBrainBackup(), verifyGBrainBackup(id:), restoreGBrainBackup(id:confirmed:). Teste Swift: runGBrainBackupTests(). Default desabilitado; consentimento próprio vinculado ao profile/vault, separado de captura/remote/manutenção. Restore exige confirmação separada.

Create adquire gbrain-backup e gbrain: não chamar já segurando gbrain; na manutenção chamar depois de sync liberar lock. Adapter mantém o escritor exclusivo real GBrain/PGLite durante PGLiteEngine.db.dumpDataDir(gzip). Sem cópia de diretório vivo, SQL próprio, Git, sync, publicação, modelo ou provedor. GBRAIN_PGLITE_WAL_REPAIR=off impede reparação automática. Pin GBrain0.48.4.0 commit2efaaf8f8a817b5b82e023383618fdcdb1cc5f7d / PGLite0.4.3.

Pacotes em state/gbrain-backups/UUID: snapshot.tgz, profile-config.json, owner.json, readback.json, manifest.json e journal.json. Manifesto de origem/pin/tamanho/SHA256 vem após dados e fechamento; seu hash deve coincidir com journal concluído. Parcial não passa. last-run.json guarda a última operação verificada bem-sucedida; erros ficam no journal reservado ou são retornados antes da criação.

Verify mantém restore_verified=false. Restore usa PGlite.create(loadDataDir), fecha e reabre via GBrain oficial sem initSchema/migração. Compara fontes/stats/config/referências e até8 páginas: conteúdo, versões, tags, chunks, links, timeline e até100 fatos inclusive inativos. Amostra não é auditoria de todas as linhas; hash cobre snapshot completo.

Restore sempre cria novo UUID em state/gbrain-backups/restores sem caminho arbitrário/overwrite/ativação live. Tem restore-owned.json purpose restore_verification_only e config gbrainAccess=false; sem oracle-owned.json nem vault configurado. MCP normal recusa perfil. Caminhos originais no banco são dados, não write-through executado; loader/engine são sequenciais.

Dump oficial usa raiz VIRTUAL PGDATA; nenhum tar do host. Validação recusa traversal/links/devices/duplicações/cabeçalhos estendidos/truncamento. Dump original inclui .gbrain-lock; só a cópia em memória carregada no destino novo exclui esse mutex administrativo/PID. Original e locks vivos intactos.

Banco completo não equivale a vault/app completos: Markdown canônico, anexos externos, identidade e outras preferências fora. Pastas0700/arquivos0600 sem criptografia própria; mesmo disco não protege contra perda física. Hash é integridade, não assinatura. Backups/restores/fixtures privados nunca entram em release. Limites512MiB comprimidos/1GiB expandidos/100mil entradas: recusa acima disso, nunca parcial fingido. Sem poda automática/migração/ativação real.

## Integração local verificada em 2026-09-11

O backup foi integrado aos Ajustes, à ponte nativa e à CLI. O consentimento é
separado da manutenção, da captura e do processamento remoto; troca de vault,
revogação ou perfil externo não apresentam a autorização antiga como ativa.

Comandos disponíveis no executável do bundle, sempre com `--state` explícito:
`--backup status`, `--backup enable`, `--backup disable`, `--backup create`,
`--backup verify --backup-id UUID` e
`--backup restore --backup-id UUID --confirm-restore`. A última opção confirma
somente uma restauração de teste em estado novo, sem ativar/substituir o banco.

Na manutenção, a sincronização libera o lock GBrain antes do backup consentido.
Falha ou recibo incompleto impede novo sucesso; pausa e revogação também são
respeitadas por `--maintenance run-now`. A captura agora recebe os campos documentados
dos hooks do workspace Oracle, com consentimento próprio. A síntese tem executor
pela ponte Codex e testes injetados; exige confirmação das restrições pelo host
antes de enviar conteúdo. Isso não comprova inferência real. O agendamento externo
permanece não confirmado. Resultados atualizados constam no relatório principal.

Na retomada de empacotamento em 2026-09-11, as seis suítes Swift foram
reexecutadas dentro do novo bundle: 365/365, incluindo 13 de backup e 139 de
manutenção. A composição de entrada já tinha adapter 31/31, Swift + engine +
adapter 45/45, testes Swift 365/365 e WKWebView 19/19. Esses testes externos
ao bundle pertencem à validação anterior da mesma composição, reconferida por
hashes; não foram reexecutados nesta retomada. A interface usou ponte simulada;
nenhuma conta, vault ou Keychain pessoal foi usada como fixture.

Adapter promovido à cópia local `Resources/engine/oracle-gbrain-read`, SHA-256
antes da assinatura do bundle:
`33c281fe404a5cb48f0b095bd2bdc84796218ea9aa98e598df598a3665e8ab7c`.
Bundle atual: `.work/developer-delivery-maintenance-20260911/Oracle.app`, não
instalado nem publicado. O bundle anterior `developer-delivery-integrated-20260911`
foi preservado. `bundle-fingerprints.json`, ao lado do bundle atual, distingue
hashes das entradas daqueles obtidos após assinatura ad-hoc.

Evidências atuais: `.work/validation-20260911/closeout-evidence.json`,
`closeout-fingerprints.json` e
`.work/developer-delivery-maintenance-20260911/bundle-evidence.json`.
O manifesto do bundle tem SHA-256
`1dbf442862ec37196109e3ee14125e5cc8b0d2f4e0d04d787d994275e13a6813`.
Os recibos anteriores a esta atualização foram preservados em
`.work/maintenance-resume-20260911/prior-evidence`.

## Evidência histórica do worker — substituída pela integração acima

scripts/test-gbrain-backup.ts:31/31 PASS com rede negada e escrita só .work/worker4-backup. Restore real confirma keyword/conteúdo/versões/links/config DB-only/fatos privados+TTL UTC/tombstones, preservando live modificado após backup. Negativas cobrem consentimento/revogação/vínculo/writer/corrupção/pin/traversal/symlink/hardlink/credenciais/modelo.

Entrega original: adapter .work/worker4-backup/build/oracle-gbrain-read SHA256 f3400cae244a42839a4793f6636262b790510f0e18a26d202b9c5cf6f3877cff. O worker não promoveu esse binário nem executou o build Swift completo. A integração posterior recompilou as mesmas fontes e promoveu somente o adapter retestado identificado acima; o caminho latest-result.json é mutável e não deve ser interpretado como recibo imutável desta entrega original.

Referências oficiais locais somente leitura: vendor/gbrain/scripts/build-pglite-snapshot.ts; vendor/gbrain/src/core/pglite-engine.ts, pglite-lock.ts, pglite-embedded-assets.ts, pglite-repair.ts; tipos públicos vendor/gbrain/node_modules/@electric-sql/pglite/dist.
