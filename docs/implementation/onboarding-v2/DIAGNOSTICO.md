# Diagnóstico do backend e das fontes

**Levantamento de 12/09/2026.** Consulta autenticada de metadados, árvores e releases pelo GitHub; leitura do checkout ORACLE e de arquivos técnicos selecionados. Não houve instalação, emissão de licença, execução de skills, publicação ou alteração de dados pessoais.

Este arquivo registra **o que existe**. O comportamento desejado está em [IMPLEMENTAR.md](IMPLEMENTAR.md).

Revisão posterior na mesma data: [AUDITORIA.md](AUDITORIA.md) registra brechas encontradas no plano, evidência atual de código e contratos acrescentados. O diagnóstico original abaixo não é recibo de implementação.

## 1. GitHub: estado conferido

| Repositório | Estado | Conteúdo e papel |
|---|---|---|
| [ORACLE](https://github.com/nitroxinteligence/ORACLE/tree/1272ed4ef29ce248f091e3304cee51efb007d9d5) | Público; `main=1272ed4`; 646 arquivos na árvore Git | App Swift/WKWebView, adapter, interface, catálogo descritivo, scripts e docs |
| [oracle-workspace](https://github.com/nitroxinteligence/oracle-workspace/tree/a16ef530498076db1e1ad3fa7dc2577fc1f797b1) | Privado; `main=a16ef53`; 209 arquivos; sem releases | Workspace com identidade, estado, scripts pessoais, docs de produto e 63 entradas SKILL.md; não é pacote de aluno |
| [ORACLE-SKILLS](https://github.com/nitroxinteligence/ORACLE-SKILLS) | Público, vazio, tamanho Git informado 0; sem commits/releases | Destino configurado no updater, ainda sem fonte consumível |
| [garrytan/gbrain](https://github.com/garrytan/gbrain/tree/a6be012a3bcfac42e279630aedec5cda4a450e29) | Público; `master=a6be012`; 4.972 arquivos | Engine, CLI, MCP, métodos, plugins, templates, docs e testes oficiais |

As árvores retornaram completas, sem truncamento. Contagem de arquivos Git não equivale ao número de itens instaláveis; inclui documentação, testes e variantes.

O ORACLE possui [release pública v0.3.0-rc.1](https://github.com/nitroxinteligence/ORACLE/releases/tag/v0.3.0-rc.1), publicada em 11/09, apontando ao mesmo commit local: ZIP arm64 de 108.026.219 bytes e SHA256SUMS. A própria release declara assinatura ad hoc, sem notarização e sem qualificação física da licença/segundo Mac. Assets foram inventariados, não baixados ou executados nesta análise.

GBrain tem [release v0.50.0.0](https://github.com/garrytan/gbrain/releases/tag/v0.50.0.0). Oracle fixa `0.48.4.0`, commit `2efaaf8f8a817b5b82e023383618fdcdb1cc5f7d`; trocar só o binário não garante compatibilidade com o adapter compilado a partir desse pin.

## 2. O que há em cada conjunto

| Conjunto | Inventário | Implicação |
|---|---|---|
| ORACLE / Sources | 46 arquivos nativos | Controlador, instalação, licença, sincronização, edição, integração, testes |
| ORACLE / packages | 19 arquivos | Atlas/contratos/adapter; não contém um instalador completo de todo o acervo remoto |
| ORACLE / scripts | 91 arquivos | Build, catálogo, espelho, release e validações reutilizáveis |
| ORACLE / skills | 2 entradas | Roteamento/setup distribuídos com o produto, não todo o catálogo |
| oracle-workspace / skills | 124 arquivos, 63 SKILL.md | Método/workspace existente; não assumir equivalência com catálogo comercial completo |
| oracle-workspace / scripts + deployment | 24 scripts e 3 launchagents | Referência técnica pessoal; não distribuir configurações do proprietário aos alunos |
| oracle-workspace / docs | 34 arquivos | Contém arquitetura e estrutura de pastas antigas; parte propõe Tauri/React, já divergente do Swift atual |
| oracle-workspace / demais diretórios | Identidade, memória, estado, runtime, modelos e plugin Obsidian | Manter fora do pacote público; selecionar somente templates genéricos necessários |
| GBrain upstream | `src`, `skills`, `templates`, `plugin`, `docs`, `recipes`, testes | Snapshot completo serve à proveniência; runtime executável e método têm escopos diferentes |

Não foi identificado pacote autônomo de **prompts e tutoriais Oracle** publicado nesses três repositórios Oracle. Isso não afirma que conteúdo equivalente inexista em notas, docs ou referências internas; significa que falta a distribuição tipada e verificável pedida pelo instalador.

### Catálogo declarado no checkout

`Resources/catalog/manifest.json`: **940 skills**, 4.902 arquivos, 35.637.252 bytes declarados.

| Coleção | Skills | Origem registrada |
|---|---:|---|
| ads | 34 | AgriciDaniel/claude-ads |
| code | 37 | Gentleman-Programming/gentle-ai |
| customer-finder | 1 | Kappaemme-git/codex-first-customer-finder-skill |
| cyber-security | 818 | mukul975/Anthropic-Cybersecurity-Skills |
| marketing | 50 | coreyhaines31/marketingskills |
| contents | 0 | Coleção sem entradas |
| personal-branding | 0 | Coleção sem entradas |

São declarações do manifesto lido; não houve nova verificação de todos os bytes dos packs. Não contabilizar as duas coleções vazias como especialistas instalados. O método GBrain do checkout declara separadamente **73 métodos e 1.671 arquivos no manifesto**, no pin `0.48.4.0`.

### Fonte canônica confirmada posteriormente pelo usuário

OS → `SISTEMA/prompts`, `SISTEMA/skills`, `SISTEMA/tutoriais`. Caminho local: `/Users/mateusmpz/Documents/Obsidian Vault/OS/`. Inventário por metadados em 12/09, sem abrir/hidratar os arquivos:

| Pasta | Arquivos | Bytes declarados | SKILL.md | Arquivos dataless |
|---|---:|---:|---:|---:|
| prompts | 17 | 70.473 | 0 | 0 |
| skills | 8.619 | 152.132.281 | 1.017 | 4.643 |
| tutoriais | 24 | 476.316 | 0 | 0 |

`Dataless` indica arquivo sem bytes locais disponíveis: bloqueia uma publicação completa. Não foi realizada hidratação nem verificação de hashes. Esta contagem bruta pode incluir recursos auxiliares e material a excluir explicitamente no preflight; não equivale a 1.017 skills prontas/compatíveis.

Há formatos que o publisher atual rejeita, incluindo `.mjs`, `.go`, `.gif`, `.mp3`, `.mp4` e outros. Além de ampliar de uma para três raízes, será necessário tratar formatos e volume com manifesto particionado. O acervo real supera a seleção de 940 skills do catálogo antigo.

## 3. O que já funciona no código e o que falta mudar

| Parte | Existe hoje | Diferença para o pedido |
|---|---|---|
| Acesso | ORACLE2 local; vínculo Mac/Chaves; ramo por convite/Secure Enclave | Animação e botão Prosseguir; qualificação física ainda separada |
| Vault | Seletor nativo, acesso persistido, baseline e limites de caminho | Escolha direta, criação automática da estrutura definida |
| Plano | Hash, confirmação, journal e retomada | Gerar plano técnico no clique Instalar; retirar tela de revisão |
| Identidade | Sete campos, bootstrap interview, readback, SOUL/USER obrigatórios | Remover dependência em todo o caminho novo, sem respostas artificiais |
| Motor | GBrain empacotado, PGLite local e adapter fixado | Coordenar obtenção/validação do runtime e snapshot no onboarding |
| Acervo inicial | `applyCatalog` copia packs locais com hashes; wizard força seleção vazia | Instalar integralmente a release Oracle remota e todos os tipos de conteúdo |
| Updater | Baixa `oracle-skills.json` de releases GitHub e preserva edições | Formato atual só permite `SISTEMA/skills`; faltam prompts/tutoriais e integração ao primeiro setup |
| Fonte de distribuição | ORACLE-SKILLS configurado | Fonte definida nas três pastas OS; faltam hidratação completa, espelho, manifesto e release |
| Skills no Codex | Apenas duas skills de roteamento no workspace técnico | Falta expor o acervo completo na descoberta local do Codex e atualizar esses destinos |
| Memória | Sync incremental, checkpoints, fontes canônicas, busca textual | Separar de identidade e coordenar lotes até completude no novo executor |
| Mapa | Projeção de itens verificados e polling a cada 1,8 s | Fechar modal ao iniciar; ampliar eventos para todos os tipos e formar grafo durante instalação |
| Bibliotecas | Raízes `SISTEMA/prompts` e `SISTEMA/Tutoriais` previstas | Pacotes e instalação/população dessas raízes |
| Distribuição | Pipeline com gates; RC público ad hoc | Artefato final notarizado e primeira instalação em outro Mac comprovada |

## 4. Acoplamentos que a implementação precisa remover

| Arquivo / símbolo | Acoplamento atual |
|---|---|
| `Resources/web/onboarding.js`: `groups`, `plan`, `render`, `resolveStage` | Entrevista, revisão, readback e `catalogCollections: []` |
| `Sources/Oracle/Core.swift`: `makePlan`, `validatedPlan` | Campos de identidade e `answers_hash`; escopo mínimo |
| `Sources/Oracle/Onboarding.swift`: `plan`, `runLocalPhases`, `onboardingFinalVerification` | Força catálogo vazio, para para confirmação e exige identidade verificada |
| `Sources/Oracle/GBrain.swift`: `prepareGBrain`, `finishGBrain` | Inicialização/sync misturados à entrevista e renderização |
| `Sources/Oracle/GBrainMethod.swift`: `installOfficialGBrainMethod`, `verifyGBrainBridge` | Instalação nova exige SOUL/USER; recibo vincula ponte à identidade |
| `Sources/Oracle/Catalog.swift`: `prepareBridge` | Exige recibo `identity_and_index_verified` antes do MCP novo |
| `Sources/Oracle/Updates.swift`: `skillPathAllowed`, `decodeSkillsBundle` | Restrição a skills; até 5.000 arquivos/50 MB; JSON base64 até 72 MB |
| `scripts/build-skills-release.py`, `source-mirror.py` | Só `SISTEMA/skills`; builder restringe sete coleções; não publicam |
| `Resources/web/installation-visual.js` | Verificação de novos SKILL.md; não é contrato geral de todos os tipos |
| `Sources/Oracle/Onboarding.swift`: `onboardingProgress` | Progresso centrado em core, conectores e SKILL.md; total atual desconhecido |

Reutilizar `Catalog.swift` para validação de arquivos/conflitos e instalação por lotes, `Updates.swift` para rede/ownership/recuperação, `MemorySyncCoordinator.swift`/`GBrainSync.swift` e `packages/gbrain-adapter/` para índice. Unificar recibos de instalação e atualização: hoje há caminhos diferentes de catálogo inicial e update.

## 5. Bloqueios reais para entrega integral

1. **Acervo:** ORACLE-SKILLS precisa receber as três pastas OS indicadas; 4.643 arquivos de skills estão dataless no inventário, e os limites/formatos do publisher atual são insuficientes. A existência de um espelho local ou manifesto no app não publica esse conteúdo.
2. **Instalador:** falta executor único de download → acervo completo no vault e Codex → memória sem identidade → mapa incremental → verificação final; updater deve manter os mesmos destinos.
3. **Compatibilidade:** runtime, adapter e método devem permanecer no mesmo conjunto homologado. Não atualizar automaticamente para o upstream mais recente.
4. **Entrega física:** RC atual não comprova instalação/ativação no Mac do aluno. A nova jornada precisa dessa evidência com o pacote final.

Decisão final de acesso: ORACLE-SKILLS permanece público; licença é exigida apenas no Oracle, inclusive para Atualizar. Não haverá serviço adicional de autenticação de downloads. Nenhuma visibilidade GitHub foi alterada.

## 6. Evidência e limites do levantamento

Metadados/árvores/releases e arquivos técnicos consultados foram guardados localmente em `.work/onboarding-backend-audit-20260912/`. O levantamento não leu o conteúdo da identidade pessoal, não auditou cada skill individualmente e não homologou dependências externas. As contagens remotas são do snapshot consultado; o catálogo é do manifesto do checkout.

Fontes técnicas locais: `Resources/updates/sources.json`, `Resources/catalog/manifest.json`, `Resources/gbrain-method/manifest.json`, arquivos da tabela acima, `Sources/Oracle/LibraryPreferences.swift`, `packages/gbrain-adapter/mcp.ts`, `owned-runtime.ts` e `docs/implementation/distribution-pipeline.md`.

Fontes upstream: [init no pin usado pelo Oracle](https://github.com/garrytan/gbrain/blob/2efaaf8f8a817b5b82e023383618fdcdb1cc5f7d/src/commands/init.ts), [instalação headless no snapshot atual](https://github.com/garrytan/gbrain/blob/a6be012a3bcfac42e279630aedec5cda4a450e29/docs/operations/headless-install.md). A inicialização do banco sem embeddings é separada do bootstrap de identidade; esse isolamento fundamenta o caminho novo proposto.

Alterações de ícone/identidade visual já estavam em andamento no checkout e foram preservadas. Esta tarefa acrescenta apenas documentação.
