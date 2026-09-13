# Validação e passagem — onboarding v2

Data: 12/09/2026. Base Git: `1272ed4ef29ce248f091e3304cee51efb007d9d5`, com alterações locais. **A instalação do acervo completo passou no controlador nativo com GBrain real e perfil isolado. A homologação de produção continua pendente.** A revisão e a autorização de distribuição estão em [REVISAO-ACERVO.md](REVISAO-ACERVO.md).

## Alterações

- `DistributionManifest.swift`, `DistributionInstall.swift`, `DistributionCodex.swift` e `DistributionUpdates.swift`: manifesto assinado, staging/cache, ownership, conflitos, cópias, remoções, renomes declarados, recuperação e atualização das três bibliotecas/Codex.
- `MemoryOnlyOnboarding.swift`, `Onboarding.swift`, `Core.swift` e `GBrainMethod.swift`: instalação nativa sem entrevista/readback, plano imutável, fontes derivada/canônica, método genérico e recibo de conclusão. Estados antigos continuam separados.
- `RuntimeGeneration.swift`, `runtime-generation.ts` e `runtime-gate.ts`: geração transacional, bloqueio/drain de leitores e escritores, cópia do perfil, validação, ativação/rollback, troca de vault e recuperação após crash.
- `GBrain.swift` e `index.ts`: transporte do inventário por arquivo verificado, retomada automática e hash nos checkpoints parciais. O teste maior que um lote encontrou e corrigiu uma incompatibilidade entre gravação e leitura desses checkpoints.
- Interface e Atlas: ativação com Prosseguir explícito, seleção do vault, Instalar sem formulário, shell imediato, conteúdo progressivo por recibos, escolhas para raízes ambíguas e departamentos coerentes com o manifesto. SVG 2D e escala de 118% preservados.
- `oracle_distribution.py` e `source-mirror.py`: empacotamento e espelhamento das três árvores, recursos auxiliares, snapshot upstream, assinatura, limites e auditoria de portabilidade. Procedimento em [DISTRIBUICAO.md](DISTRIBUICAO.md).

## Provas executadas

Todos os caminhos abaixo são relativos à raiz do repositório. Fixtures não usaram o vault pessoal, contas externas, modelos ou as skills globais do operador.

| Escopo | Resultado | Recibo |
|---|---|---|
| Controlador nativo + GBrain real | 76 verificações passaram: instalação/reabertura, conflitos, Codex isolado, falhas/crashes, vault, rollback, cache/rede simulada e índice maior que um lote | `.work/onboarding-v2/distribution-final-tests.log`, `.work/onboarding-v2/final-tests/distribution-result.json` |
| Guardas finais | 37 verificações sintéticas passaram após bloquear troca de raiz de uma biblioteca vinculada a um plano | `.work/onboarding-v2/distribution-guard-tests.log` |
| Índice maior que um lote | 5.001 notas novas; 5.006 documentos totais, conclusão e busca textual offline; a busca independente retornou 30 resultados | `.work/onboarding-v2/large-index-search.json`, log nativo acima |
| Protocolo MCP real, sem rede | 68 verificações passaram | `.work/onboarding-v2/mcp-offline-final-2.log`, `.work/mcp-protocol/run-8506c86e08cc40eeaf66b9a28c2d5d12/` |
| Edição original e conflitos | 20 verificações passaram | `.work/onboarding-v2/editor-tests.log` |
| Updater legado | 36 verificações passaram, usando matriz legada descartável | `.work/onboarding-v2/legacy-update-tests-2.log` |
| Licença/consentimento, ciclo de vida e dispositivo | 65, 67 e 37 verificações passaram; chaves e dispositivos sintéticos | `.work/onboarding-v2/legacy-onboarding-final.log` |
| Publisher final | 23 testes passaram | `.work/onboarding-v2/publisher-final-corpus-tests.log` |
| Espelhador | 35 testes passaram, incluindo revisão vinculada aos hashes | `.work/onboarding-v2/mirror-reviewed-examples-tests.log` |
| Modelos web/leitor | 44 testes passaram | `.work/onboarding-v2/web-model-tests-final.log` |
| WKWebView com ponte simulada | Oito casos passaram; shell imediato, fluxo sem identidade, recibos, retomada e conclusão | `.work/onboarding-v2/native-ui-tests-7.log`, `.work/onboarding-v2/native-ui/result.json` |
| Formação visível | Departamento apareceu em 1.534 ms na fixture medida; inspeção também identificou e corrigiu itens antecipados na barra lateral | `.work/onboarding-v2/native-ui/installation.png` |
| Build e empacotamento final | Bundle developer ad hoc validado, Bun 1.3.10 e DMG com checksum verificado | `.work/onboarding-v2/developer-build-final-corpus.log`, `.work/onboarding-v2/package-final-corpus.log` |
| Preservação das alterações preexistentes | Dez recursos conservaram os hashes anteriores, incluindo ícone e script de identidade | `.work/onboarding-v2/preservation-final-corpus.json` |
| Acervo completo com motor real | 13.501 arquivos, 1.058 itens, 1.017 skills preparadas; 4.006 documentos e 1.775 links indexados; zero falhas; reabertura verificada | `.work/onboarding-v2/full-acervo-final-native.log`, recibo abaixo |

Mac de referência desta execução: `Mac14,7`, arm64, macOS 26.6.2. Ambiente e hashes dos motores das fixtures em `.work/onboarding-v2/environment.json`. Os logs de cada execução identificam o motor correspondente; builds posteriores não substituem retrospectivamente seus hashes.

Os testes de interface com ponte simulada e os testes do controlador com motor real são escopos separados. Não constituem prova de uma única jornada física no Desktop ou em outro Mac. Não houve Developer ID, notarização ou remoção de quarentena.

## Acervo real

As três árvores canônicas foram copiadas por APIs normais do macOS. As 29 falhas transitórias de leitura foram repetidas e recuperadas. O consolidado conferiu hashes das cópias, associação com o inventário original, identidade/tamanho/mtime e a mesma relação de arquivos na fonte.

- 8.660 entradas originais; 8.657 arquivos de conteúdo verificados, totalizando 152.672.098 bytes.
- Três metadados excluídos explicitamente; nenhum arquivo de conteúdo foi descartado.
- 1.017 arquivos `SKILL.md`, 17 prompts e 24 tutoriais. A auditoria gerou 1.055 itens provisórios; três SKILL.md tiveram a análise interrompida pelo detector de credenciais.
- Snapshot upstream: 4.834 arquivos, 118.450.469 bytes, no commit fixado `2efaaf8f8a817b5b82e023383618fdcdb1cc5f7d`.

Recibos: `.work/onboarding-v2/materialized-source-receipt.json`, `.work/onboarding-v2/source-audit-complete.json`, `.work/onboarding-v2/source-audit-summary.json` e `.work/onboarding-v2/gbrain-source-inventory.json`. A cópia materializada original está em `.work/onboarding-v2/materialized-source-reviewed-input/`.

A auditoria inicial bloqueou a publicação pelos seguintes achados: 159 arquivos com caminhos absolutos de computador; 13 referências Obsidian ausentes/ambíguas; 11 referências relativas ausentes; dois frontmatters precedidos por marcadores de template; 12 arquivos com padrões de credenciais. Esses padrões podem incluir exemplos e fixtures: não foram classificados como segredos reais nem liberados automaticamente. O hash do inventário de bytes está registrado no relatório.

A revisão final resolveu os achados com 33 adaptações e dez suplementos; os 8.657 arquivos da origem foram preservados. O usuário autorizou a distribuição sob licença própria, com termos de terceiros preservados. A release contém 13.501 arquivos em 20 pacotes e 1.058 itens. Detalhes em [REVISAO-ACERVO.md](REVISAO-ACERVO.md).

O controlador nativo concluiu a instalação e a reabertura em 298,28 segundos após o staging. O primeiro item teve recibo verificado em 28,37 segundos; isso não mede latência visual. Os 4.006 documentos e 1.775 links foram indexados sem falhas e sem inferência. Os 1.017 links de skills foram conferidos em um host isolado. Recibo: `.work/onboarding-v2/full-acervo-final-test/reviewed-distribution-9A3E2644-D9D4-4449-97B7-3CEB77493808/state/reviewed-distribution-result.json`.

A busca textual foi exercitada também com rede bloqueada: “DaVinci” encontrou o tutorial esperado, e a leitura conferiu a integridade do arquivo canônico. Recibo: `.work/onboarding-v2/full-corpus-offline-search.json`.

A primeira tentativa identificou slugs curtos de tutoriais e frontmatter de templates upstream. A correção preserva a identidade pelo caminho e projeta templates como texto no índice, sem alterar a fonte. Regressão: `.work/onboarding-v2/index-source-tests.log`; toda a instalação foi repetida com o adapter corrigido.

## Pendências para fechar o contrato

1. Revisão e adaptações concluídas, limitadas ao snapshot das três bibliotecas. O restante do OS não foi copiado.
2. A chave de distribuição `oracle-distribution-20260912` está configurada: privada externa em 0600, raiz pública no recurso do app e par verificado. Preservar sua cópia segura antes da publicação e verificar o bundle usado na entrega. Não houve backup externo da chave.
3. A [release completa `acervo-2026.09.12`](https://github.com/nitroxinteligence/ORACLE-SKILLS/releases/tag/acervo-2026.09.12) foi publicada: 21 assets com tamanho e SHA-256 conferidos no GitHub. O commit do acervo é `e8e20120f044cceb93ba01c5e80dc346dc128b42`. Atualização e renomes entre duas releases públicas reais continuam como homologação futura; não foi criada uma segunda versão artificial.
4. A descoberta real foi conferida no app-server do ChatGPT Desktop: 1.017 de 1.017 skills habilitadas, nenhuma ausente, em host isolado. Execução por modelo e conflitos no host físico permanecem verificações distintas. A jornada completa da interface tem recibo separado abaixo.
5. Qualificar casos físicos: Mac limpo sem toolchain/Codex, volume sensível a maiúsculas, falta de espaço, rede real, licença vinculada ao Mac e segundo aparelho. As verificações sintéticas não fecham esses itens.
6. O Bun global continua em 1.3.8. Bun 1.3.10 foi provisionado separadamente em `.work`, com o digest do asset oficial conferido. `ORACLE_BUN_BIN` seleciona esse compilador nos três wrappers; o preflight passa sem avisos. Developer ID, notarização e Gatekeeper do runtime baixado ainda não foram homologados.

O app está em `.work/build/developer/Oracle.app`. DMG developer: `.work/onboarding-v2/distribution-final/Oracle-0.3.0-20260912T215417Z-1272ed4ef29c-0191b868-developer-arm64.dmg`. Foram produzidos e verificados localmente; `/Applications/Oracle.app` não foi substituído. A assinatura ad hoc continua distinta de uma entrega Apple notarizada.

## Recibo final de publicação

Release pública e latest conferidas. Os 21 assets têm tamanho e SHA-256 idênticos aos arquivos locais validados. Downloads anônimos conferidos integralmente: 20 de 21; a repetição do download completo foi encerrada a pedido do usuário. Todos os pacotes já haviam passado na instalação nativa completa. Recibo: `.work/onboarding-v2/public-corpus-receipt.json`. A falha transitória de DNS no upload foi recuperada sem reenviar os assets concluídos.

## Integração final 0.3.2

A versão 0.3.2 incorpora a implementação ao código mais recente da 0.3.1, preservando a interface e as chaves curtas. Os números e os caminhos 0.3.0 acima são recibos históricos, substituídos pela entrega 0.3.2. Regressões atuais: 44 testes de modelos/leitor, 65 de licença/consentimento, 67 de ciclo de onboarding e 50 de dispositivos/chaves curtas, sem falhas. A descoberta nativa no Codex está em `.work/codex-discovery/receipt.json`: 1.017 esperadas e 1.017 habilitadas.

### Recibo da entrega instalada

Instalado `/Applications/Oracle.app` 0.3.2 build 73, commit `c3b65014403dacac4a4e2a7e7196ee2f15fd3f4d`. Manifesto conferido com o bundle gerado e assinatura ad hoc verificada com `codesign --verify --deep --strict`. Recuperação: `.work/onboarding-v2/recovery/Oracle-0.3.1-build70.app` na worktree original. Os contratos nativos finais passaram, incluindo a prioridade da retomada sobre indexação automática e a visibilidade de placeholders iCloud sem incluí-los no índice.

A jornada WKWebView + controlador real concluiu após liberar cópias temporárias redundantes e retomar o mesmo plano afetado por ENOSPC. Seis verificações finais passaram: retomada, mapa com itens reais, plano preservado, progresso encerrado, ausência de entrevista e busca no acervo real; a leitura canônica também respondeu. A retomada completa levou 458,049 s e o fechamento do modal 11.687 ms. Recibo: `.work/full-public-ui/native-ui-result.json` na worktree de integração. Essa execução usou recursos nativos do commit `ace3b42`; a alteração posterior de placeholders foi verificada pelos contratos e no app instalado.

Oito casos da fixture WebKit passaram com os recursos web finais inalterados; latência sintética: 1.434 ms. A latência visual inicial da instalação real não foi registrada e não deve ser inferida desse número. Descoberta no Codex foi real e isolada; execução por modelo, homologação em outro Mac, ativação física e Apple continuam fora dessas evidências.

O app instalado foi reaberto e a navegação existente foi conferida: Código 870 skills, Marketing 85 e Vendas 1, com galerias preservadas. Arquivos ainda presentes apenas no iCloud são exibidos; a busca continua parcial enquanto esses conteúdos não estiverem locais.
