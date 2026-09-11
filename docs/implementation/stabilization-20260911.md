# Estabilização integrada — evidência local

Branch `codex/oracle-audit-full-20260910`, base `f14382479cb769f8b57cf5d38db27acf0947a243`.
Este registro continua a implementação existente; não substitui os relatórios históricos
nem altera os requisitos do proprietário. O aplicativo instalado e a raiz/main não foram
modificados. Testes usam apenas fixtures sob `.work` deste worktree, com rede negada e
identidade efêmera quando necessária. Nenhum login, emissor, vault ou Keychain pessoal foi
utilizado. Nenhuma publicação ou instalação está autorizada por este relatório de testes.

## Correções adicionais da integração

O estado da memória é consultado por uma projeção pequena e deduplicada. A atualização do
inventário usa o snapshot já cacheado, sem iniciar varredura na fila da interface. Modal
de memória aberto recebe estados atual/parcial/indisponível sem substituir o campo de
busca ou seu foco. O bloqueio invalida respostas atrasadas. Reler Obsidian é uma ação
explícita de atualização; abrir uma biblioteca não transforma um scan pendente em vazio
definitivo. Quando o scan termina, a biblioteca já aberta recebe os documentos.

Preferências de movimento, transparência e economia passam pela persistência nativa.
Valores do sistema que exigem redução prevalecem; desligar a preferência do macOS volta
à escolha do aplicativo, sem conservar um estado forçado antigo. Falha de gravação não é
apresentada como preferência salva. Estado e envio assíncronos são separados por geração.

Links Markdown relativos e wiki preservam origem e fragmentos. HTML fonte permanece
texto, imagens remotas não são carregadas e links fora do inventário autorizado são
recusados. Nomes de notas ambíguos exigem seleção pela busca. Uma resposta atrasada ao abrir
uma skill não pode iniciar edição de outro documento.

A biblioteca e a órbita agora compartilham a regra de seleção de raiz: `SISTEMA/PROMPTS`
é reconhecida sem renomear arquivos. Duas raízes realmente distintas por caixa não são
mescladas; a escolha persistida em `libraryRoots.prompt` chega ao mapa e à navegação por
pastas. Departamentos, especialistas, foco da skill, retorno, reset e rolagem preservam a
escala real de 118% do enquadramento do contexto, não apenas o texto do indicador.

README e skills atuais não exigem mais login Codex para instalação local. As instruções
de licença com `--days` foram removidas. Confirmar identidade continua deixando o plano
pausado; retomar é outra ação explícita e local por padrão. Não foi criado exercício
didático, primeira entrega ou treinamento obrigatório durante ou após a instalação.

## Execuções do prime

Resultados abaixo são de suítes com granularidades diferentes. Não são um total de
jornadas de usuário e não se somam novamente a execuções antigas das mesmas regressões.

| Execução | Resultado | Evidência sob `.work/integration-prime` |
|---|---:|---|
| Core, confiabilidade de dados e ciclo real do índice | 66 PASS | `self-test-current.log` |
| Editor nativo | 20 PASS | `self-test-editor-current.log` |
| Licenciamento/consentimento e lifecycle/transporte | 132 PASS | `self-test-onboarding-current.log` |
| Atualizações nativas, sem asset de release real | 28 PASS | `self-test-updates-current.log` |
| Emissor com chaves efêmeras, sem emissão real | 13 PASS | `issuer-current.log` |
| Contratos JavaScript, incluindo raízes da órbita | 63 PASS | `frontend-all-current.log` |
| WKWebView real, ponte sintética | 48 PASS | `ui-regressions-current.json` |
| Política e manifestos de distribuição | 30 PASS | `distribution-policy-current.log` |
| Wrapper developer/preflight | PASS com ressalva do Bun | `developer-preflight-current.json` |

As 132 verificações de onboarding usam um driver GBrain falso nas provas de lifecycle,
não constituindo instalação completa com motor real. Suítes próprias com
`NativeOfflineInstallation`, bridge, Core e GBrain real têm evidências separadas em
`native-ui-latest.json` e `.work/integrated-audit/latest.json`. O relatório final deve
identificar a execução efetivamente revalidada, seus hashes e eventuais mudanças de fonte.

As regressões novas de atualização visual inicialmente falharam porque a janela do
harness estava oculta e o produto corretamente não consultava o estado. O host passou a
ativar sua própria janela de teste, sem remover o guard de visibilidade do produto. A
execução corrigida comprova `document.hidden:false` e uma única chamada de estado para
consultas concorrentes. Logs intermediários são preservados como falha de harness, não
uma alegação de correção de código que já estava correto.

Capturas `ui-library.png` e `ui-department.png` vêm do WKWebView sintético, não do app
pessoal. Captura de superfícies com backdrop/filtros não substitui inspeção visual física
da distribuição nem auditoria formal de contraste/VoiceOver. O teste verifica também
geometria DOM, foco e controles na janela mínima de 840 × 620.

## Medição de scan, cache completo e serialização

`scripts/benchmark-cached-snapshot.swift` compila como ferramenta separada, não distribuída.
O resultado está em `snapshot-benchmark-20260911T032557Z/result.json`. Foram feitas cinco
amostras por volume, sem inferência. O primeiro snapshot pendente é medido e rotulado
separadamente; as medidas de cache exigem scan concluído e todos os documentos presentes.

| Notas sintéticas | Scan completo, mediana | Snapshot completo cacheado, mediana | Serialização JSON, mediana |
|---:|---:|---:|---:|
| 100 | 2,68 ms | 57,26 ms | 0,49 ms |
| 1.000 | 22,94 ms | 61,82 ms | 3,84 ms |
| 10.000 | 239,04 ms | 59,81 ms | 37,10 ms |

O snapshot ainda inclui catálogo, metadados e projeções nativas; não é custo zero. Em
10.000 notas, o JSON completo tinha 3.481.771 bytes. Isso fundamenta manter o poll leve
separado e não reenviar inventário completo a cada consulta de atualidade. As amostras não
aprovam orçamento de produção, não medem GPU/bateria e não são teste de carga prolongado.
Mudanças de escopo e de ambiente impedem tratar comparações com a baseline como uma
garantia de aceleração de toda a interface.

## Gates que continuam separados

Secure Enclave físico, segunda máquina, sobrevivência da chave em reinstalação, migração
owner e política de recuperação; taxonomia definitiva; inferência local no hardware-alvo;
toolchain suportada; Developer ID, notarização, ticket, Gatekeeper e instalação offline
em Mac limpo; validação de acessibilidade formal; integração com a outra sessão e
publicação conjunta. Nenhum teste sintético certifica esses critérios por inferência.

O teste de cliente MCP e a investigação final do ORACLE-SKILLS recebem registros próprios.
Uma saída de processo 0 sem relatório e sem chamadas reais não é evidência de aprovação.
# Recuperação da validação nativa — 11 de setembro, 14:15 UTC

O run que estava pendente (`native-ui-6750117b9fad45c69f416cec2ea607ac`)
terminou com exit 1: a inicialização oficial PGLite retornou `ErrnoError (errno 51)`.
O teste antigo só reconhecia `failed`, enquanto o instalador nativo registra
`interrupted`; por isso o relatório final mascarou a causa como timeout de readback.
Não houve reparação do banco, exclusão de locks nem reutilização desse perfil.

A recuperação preserva os checks e acrescenta reconhecimento imediato de estados
terminais, retenção de resultados parciais, validação estrita do relatório concluído
com 13 asserts distintos, proteção de espaço antes de cada fase, hashes antes das
cópias, registro de argv/exit e bloqueio de rede também na compilação. O limite de
3 GiB é margem conservadora desta fixture de desenvolvimento, não requisito do app.
`scripts/test-native-ui-harness.py` passou **15 testes** de gates sintéticos;
isso não substitui a execução real da interface.

Uma primeira tentativa da recuperação (`native-ui-ab83bb5395444aa99c595def29ca8ac8`)
foi corretamente recusada antes de compilar/iniciar o host, com 3.131.805.696 bytes
livres abaixo da margem. Foram removidos apenas três ModuleCache antigos desta
auditoria: 820 arquivos, 829.518.460 bytes lógicos, após verificar ausência de uso,
symlinks e hardlinks. O recibo `compiler-cache-cleanup-recovery.json` preserva o
inventário. Logs, executáveis, fontes, bancos e Markdown das fixtures foram mantidos.

O novo run **`native-ui-d712189576fd4dd3bdf5dbe04ccee66a` passou 13/13**, zero
falhas, `finished:true`, às **2026-09-11T14:15:07Z**, com exit 0. Executou o
WKWebView e os serviços Swift reais, GBrain/PGLite oficial, readback confirmado,
retomada separada, editor, reindexação de edição externa e escala efetiva 1,18 em
840×620. `sourceChangedDuringRun:[]`, rede bloqueada e identidade efêmera.
Não certifica autenticação física nem execução do app instalado.

Evidência sob `.work/integration-prime/`: `native-ui-recovery-second-driver.log`,
`native-ui-gates-recovery.log` e, dentro da fixture aprovada, `native-ui-result.json`
e `provenance.json`. GBrain SHA-256:
`d1a897d8f4d036da81cc9b276b90b2922b0364a2ab097f8b015a137ec044a865`;
adapter compilado com target arm64:
`ba430aeef377486682c7939ec9c59ff1aff44845595ddc19ee8fa17ef7df79b0`.

O encerramento do worker MCP foi recuperado do registro de sessão: freeze explícito
em 2026-09-11T03:53:18Z, finish aceito, duas execuções independentes de **68/68**
(49 chamadas SDK cada), nenhuma fonte pendente. Os dois resultados não são 136
testes distintos. Ver `mcp-protocol-validation.md`; a diferença entre o hash do
binário MCP e o do host nativo decorre de invocações de compilação distintas,
com fontes comparadas, e não é prova de equivalência binária entre eles.

O helper antigo `scripts/test-mcp-integration.ts` foi lido e permanece secundário,
restrito a uma fixture marcada por seu launcher. Não é a evidência principal de
protocolo e não recebeu nova alegação de aprovação nesta recuperação. Os harnesses
alternativos de interface foram mantidos para não perder a cobertura anterior de
22 checks, inclusive digitação durante salvamento. O resultado atual de 13 checks
não pretende substituir esses casos adicionais.

Resultados posteriores de pacote developer e CLI ficam nos relatórios próprios de
`.work/integration-prime/`, sem alterar estas fontes durante o build com fingerprint.
