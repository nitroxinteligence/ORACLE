# Onboarding v2 — etapas e tarefas de execução

Contrato: [IMPLEMENTAR.md](IMPLEMENTAR.md). Execução: 12/09/2026. `[x]` indica implementação exercitada no escopo descrito; não significa homologação de produção. A entrega integral continua pendente dos itens abertos. Detalhes e recibos em [VALIDACAO.md](VALIDACAO.md).

## 1. Distribuição

- [x] Inventariar as três raízes autorizadas, incluindo recursos auxiliares e dataless.
- [x] Materializar e conferir os 8.657 arquivos de conteúdo; registrar três exclusões de metadados e conferir a geração canônica.
- [x] Criar publisher v3 para skills, prompts, tutoriais e snapshot GBrain, com pacotes limitados, hashes e proveniência.
- [x] Implementar validação de frontmatter, referências, identidades, colisões, segredos, licenças e dependências; produzir auditoria do acervo real.
- [x] Implementar assinatura Ed25519 e rejeição de adulteração, chave desconhecida, downgrade e adapter incompatível.
- [x] Ampliar o espelhador para as três bibliotecas, mantendo dry-run, ownership e recuperação.
- [x] Resolver os achados de portabilidade e revisar licenças/dependências do acervo real, com autorização do usuário.
- [x] Configurar a chave privada externa e a raiz pública `oracle-distribution-20260912`; verificar o par localmente.
- [x] Concluir revisão dos 1.058 itens e preservar as 830 licenças originais e os termos autorais autorizados.
- [x] Aplicar 33 adaptações e dez suplementos na cópia distribuível, mantendo os 8.657 arquivos de origem e o OS intacto.
- [x] Gerar, revisar e publicar a release completa `acervo-2026.09.12` em ORACLE-SKILLS, com autorização do usuário.

## 2. Plano e memória

- [x] Versionar planos `memory-only`, baselines e recibos; preservar o caminho dos planos antigos.
- [x] Fazer preflight de vault, acesso, sobreposição, espaço e limites; persistir o plano do clique Instalar.
- [x] Inicializar GBrain sem entrevista/embeddings, registrar fontes e preparar método/workspace genéricos.
- [x] Retomar lotes até um índice completo; corrigir o hash do checkpoint parcial.
- [x] Exercitar 5.001 notas novas, além do conteúdo da fixture, e confirmar busca textual offline.
- [x] Instalar o acervo real completo: 13.501 arquivos, 4.006 documentos e 1.775 links indexados; zero falhas e reabertura verificada.

## 3. Instalação e atualização

- [x] Resolver, baixar, validar e manter staging/cache vinculados ao plano; limitar retentativas e recuperar cache corrompido.
- [x] Compartilhar ledger entre instalador/updater e preservar edições, conflitos, remoções e preimages.
- [x] Validar mapeamentos declarados de renome e identidade estável.
- [x] Instalar links de skills com ownership em host descartável; separar arquivos, descoberta e execução.
- [x] Integrar o botão Atualizar ao acervo, Codex e matriz GBrain, com resultados separados.
- [x] Coordenar instalação, índice e atualização; exercitar duplo clique, segunda janela e retomada.
- [x] Transacionar motor/banco e recuperar crashes em quatro limites de ativação, preservando notas posteriores.
- [x] Trocar e restaurar o vault ativo com perfil anterior preservado; invalidar conexões MCP antigas.
- [ ] Homologar atualização e renome com duas releases públicas reais, falhas de rede reais e disco sem espaço.

## 4. Interface

- [x] Implementar licença → Prosseguir → vault → Instalar; manter retomada legada explícita.
- [x] Abrir o shell imediatamente, com erro/pausa/retomada e sem identidade obrigatória.
- [x] Alimentar mapa e bibliotecas com recibos por plano/geração; usar departamentos declarados e preferências locais.
- [x] Preservar SVG 2D e escala aprovada da versão 0.3.1 (120%); corrigir antecipação de itens na barra lateral.
- [x] Inspecionar WKWebView e medir aparecimento visível do departamento em fixture, em até 2 s.
- [ ] Medir essa latência com a distribuição real completa no Mac de referência.

## 5. Validação e entrega

- [x] Executar 76 verificações nativas de distribuição com motor real, incluindo índice maior que um lote.
- [x] Executar 68 verificações de protocolo MCP offline; 20 de edição; 36 do updater legado.
- [x] Reexecutar regressões legadas: 65 de licença/consentimento, 67 de ciclo de vida e 37 de dispositivo, todas sintéticas.
- [x] Executar 23 testes do publisher, 35 do espelhador, 44 testes dos modelos web/leitor e oito casos WKWebView.
- [x] Produzir e verificar app e DMG developer pelo pipeline existente; preservar alterações preexistentes.
- [x] Registrar alterações, evidências, limites e pendências.
- [x] Exercitar a interface nativa com a release pública completa: instalação, retomada do mesmo plano após ENOSPC, mapa, busca e leitura; seis verificações finais sem falha.
- [x] Conferir descoberta das 1.017 skills no app-server real do ChatGPT Desktop, em host isolado; nenhuma ausente. Execução por modelo e dependências externas de cada skill permanecem verificações distintas.
- [x] Provisionar Bun 1.3.10 em `.work`, conferir o digest oficial e selecionar o compilador explicitamente no pipeline; preflight suportado sem avisos.
- [ ] Qualificar Developer ID, notarização, Gatekeeper, licença física e primeiro uso em Mac limpo.

Continuação: evidências e dependências concretas em [REVISAO-ACERVO.md](REVISAO-ACERVO.md). A autorização de distribuição foi recebida nesta continuação; requisitos externos continuam explícitos.

## Estado preservado

O acervo foi enviado a ORACLE-SKILLS no commit `e8e20120f044cceb93ba01c5e80dc346dc128b42` e publicado na release `acervo-2026.09.12`. Esse era o estado anterior à integração final. O código foi posteriormente integrado à `main` e `/Applications/Oracle.app` foi substituído pela versão 0.3.2, build 73, com cópia recuperável da 0.3.1. Os hashes preexistentes de `Resources/Oracle.icns` e `scripts/package-identity.py` foram preservados. `AGENTS.md`, `PRODUCT.md`, `docs/design/`, `identity/oracle-v3/metallic/` e os documentos originais da especificação não foram tratados como alterações desta implementação. O OS original não foi reescrito.

## Integração da versão 0.3.2

Integrada sobre `5e6527957fbb6144708e5442a1355d0898ac59dc`, preservando as galerias, o mapa, as transições e as chaves curtas da 0.3.1. A integração usa uma worktree isolada para preservar as alterações de outras tarefas. Regressões nesta versão: 44 testes de modelos/leitor; 65 verificações de licença/consentimento; 67 de ciclo de onboarding; 50 de dispositivos/chaves curtas.

O app-server do ChatGPT Desktop `0.154.0-alpha.6.2` descobriu as 1.017 skills preparadas em host descartável. Não houve modificação da configuração global, conexão de contas ou execução por modelo. Recibo local: `.work/codex-discovery/receipt.json`.

## Entrega instalada

App 0.3.2 build 73, commit `c3b65014403dacac4a4e2a7e7196ee2f15fd3f4d`, instalado em `/Applications/Oracle.app`; manifesto idêntico ao bundle gerado e `codesign --verify --deep --strict` aprovado. Backup da 0.3.1 em `.work/onboarding-v2/recovery/Oracle-0.3.1-build70.app` na worktree original. Corrigida a disputa entre sincronização automática e retomada de instalação incompleta; placeholders iCloud continuam no mapa e não entram no índice até estarem locais.

Os contratos nativos finais passaram. A fixture WebKit passou nos oito casos, com entrega visual sintética em 1.434 ms. A jornada real foi retomada após ENOSPC, terminou com o mesmo plano e passou em seis verificações; a retomada levou 11.687 ms para fechar o modal. A latência visual inicial do acervo real não foi registrada, portanto o limite de 2 s não é declarado como homologado nesse escopo.
