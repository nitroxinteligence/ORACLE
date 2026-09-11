# Implantação independente — onboarding Oracle

## Escopo e isolamento

Autorizado pelo proprietário: implementar auditoria de onboarding, revalidação e complemento de agendamentos/atualizações, com as correções posteriores do usuário. O worktree exclusivo é `.work/worktrees/onboarding-implementation-20260910`, branch `codex/oracle-onboarding-implementation-20260910`, base `f14382479cb769f8b57cf5d38db27acf0947a243`.

Não editar, testar, copiar mudanças nem controlar processos de `.work/worktrees/audit-full-20260910` (outra sessão). Não editar a raiz principal, fazer staging/commit/merge/push nem instalar o aplicativo nesta etapa. `vendor`, `node_modules` e `Resources/catalog/packs` inicialmente são symlinks compartilhados: somente leitura. Os binários de engine são cópias locais. Builds e fixtures ficam no `.work` deste worktree. Nunca executar bootstrap.sh contra o vendor compartilhado.

## Requisitos definitivos

- GBrain oficial é a estrutura principal; Obsidian é a camada documental e Codex é o orquestrador. Sem motor paralelo, reaproveitamento de tokens como API ou provedores pagos habilitados por conveniência.
- Onboarding mínimo: código, vault, configuração/autorizações realmente necessárias, instalação por recibos, gráfico. Nenhum exercício de primeira memória, tour, cold-start automático ou CTA posterior; o mentor ensina.
- Departamentos → especialistas → skills. Panorama mostra departamentos e especialistas, sem todas as folhas; seleção revela as skills correspondentes, busca alcança todas. Classificação lógica preserva caminhos, conteúdo e IDs. Preservar Pessoal, Profissional, Prompts, zoom padrão 118% e atmosfera 2D discreta.
- Identidade nova usa respostas reais e confirmação oficial; instalações existentes são preservadas. Sessão efetiva do Codex deve receber a identidade correta e procedimentos oficiais utilizáveis.
- Corrigir revisão/retomada, salvamento de rascunhos, fila de autorização, recibos do gráfico, indexação incremental e contratos de atualização.
- Manutenção automática consentida por aluno; último sucesso, retomada, exclusão mútua e pausa. Não falsificar registro de schedule a partir de TOML. Não copiar tarefa do mentor nem publicar dados de alunos. Não executar manutenção, inferência ou capturar conversas pessoais durante testes.
- Atualizações: verde pulsante suave enquanto houver novidades pendentes, estático com movimento reduzido; consulta automática somente leitura; Verificar consulta e aplica versões elegíveis com explicação visível. Preservar customizações e diferenciar falha, pendência, incompatibilidade e sucesso.
- Publicação de fontes OS/SISTEMA/skills e release instalável são contratos separados. Bloquear fontes iCloud dataless, segredos e mudanças remotas conflitantes. Sem executar conteúdo de skills.
- Offline permanente não permite prometer inferência cloud/download offline. Licença não apaga notas; restrição de dispositivo e migrações precisam de verificação explícita. Não reconfigurar identidades reais, Keychain, contas ou preferências globais em testes.

## Frentes e propriedade dos arquivos

Prime: integração, confiabilidade Onboarding.swift/Updates.swift, UI onboarding.js e região de atualizações app.js, manutenção/consentimento, testes integrados, documentação e verificação final.

Worker gráfico: packages/atlas e manifesto de departamentos, CSS específico e testes de navegação. Não editar região de atualizações/onboarding de app.js; coordenar pontos de integração com prime.

Worker GBrain: Core.swift, Catalog.swift, GBrain.swift, packages/gbrain-adapter, empacotamento de procedimentos oficiais, indexação/identidade e testes próprios. Não editar Onboarding.swift/main.swift sem coordenação; comunicar APIs de integração ao prime.

## Entrega e validação

Manter matriz do que foi implementado e do que depende de validação real. Compilar Swift no macOS e executar testes nativos com Core isolado/FixtureCodex; rodar regressões JavaScript, Python e GBrain sintético. Não contar mocks como autenticação/execução real do Codex, nem uma compilação como qualificação de distribuição. Documento de encerramento deve informar pendências e evidências, sem declarar “tudo pronto” indevidamente.
