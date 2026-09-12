# Onboarding Oracle v2 — contrato para implementação

**Status:** especificação; não implementado. **Decisões do usuário:** 12/09/2026, incluindo origem OS, atualização e skills no Codex Desktop.
**Base examinada:** ORACLE `1272ed4`. Leia também [DIAGNOSTICO.md](DIAGNOSTICO.md) e a [revisão de brechas](AUDITORIA.md). Especificação revisada não equivale a produto homologado; os gates de evidência continuam abertos.

## 1. Resultado obrigatório

O usuário ativa o Oracle, escolhe o vault e clica em instalar. O aplicativo instala o segundo cérebro e todo o conteúdo da distribuição; o mapa se forma conforme os itens são realmente instalados. Ao concluir, notas, especialistas, skills, prompts, tutoriais, busca e edição local estão disponíveis. As skills também são instaladas na superfície local reconhecida pelo Codex, inclusive no modo Codex do ChatGPT Desktop; isso faz parte do onboarding, não de uma configuração manual posterior.

Não haverá perguntas de identidade, contexto, objetivos ou preferências; tela de revisão; confirmação de identidade; nem clique de retomada no caminho normal. Não gerar respostas fictícias ou copiar a identidade de Mateus para substituir essas telas.

Somente download do GitHub e instalação local. **Nenhum upload do vault, dados pessoais ou configuração do aluno para GitHub.** A publicação do acervo de Mateus é um fluxo separado, limitado às três pastas autorizadas do OS. Confirmado expressamente pelo usuário nesta tarefa.

## 2. Fluxo visual aprovado

| Tela | Ação | Transição real |
|---|---|---|
| Código de acesso | Colar código e ativar | Animação de processamento; sucesso apenas após validação da licença. Mostrar **Prosseguir**, sem avanço automático |
| Obsidian | Escolher o vault já criado | Validar acesso à pasta; **Voltar** e **Prosseguir** |
| Instale seu segundo cérebro | **Voltar** ou **Instalar** | Uma frase informa o vault de destino e que serão baixados os componentes. Sem formulário/revisão adicional |
| Aplicativo em instalação | Acompanhar o mapa e indicador discreto | Fechar o modal e mostrar imediatamente a interface completa, com barra lateral. Formação progressiva por eventos verificados |
| Aplicativo pronto | Usar normalmente | Remover indicador de instalação após verificação integral; sem tutorial obrigatório |

Erro: mensagem curta e **Tentar novamente**. Interrupção após fechar o app: **Continuar instalação**, preservando avanços. Esses estados excepcionais não acrescentam etapas ao percurso normal. Respeitar redução de movimento na animação.

## 3. Fontes e distribuição

| Origem | Entrega ao aluno | Regra |
|---|---|---|
| Obsidian OS de Mateus | `SISTEMA/prompts`, `SISTEMA/skills`, `SISTEMA/tutoriais` completos | Fonte canônica do acervo; publicar cópia versionada no ORACLE-SKILLS |
| `nitroxinteligence/ORACLE` | App macOS, adapter compatível e matriz de versões confiável | Release assinada e notarizada antes de entrega geral |
| `garrytan/gbrain` | Executável oficial arm64, método/skills oficiais e snapshot do repositório no commit homologado | Baixar versão fixada; nunca executar `master`, `latest` ou compilação improvisada no Mac do aluno |
| `nitroxinteligence/ORACLE-SKILLS` | Todos os especialistas, skills, prompts, tutoriais, recursos auxiliares e manifesto de departamentos da distribuição | Precisa ser populado e publicado; hoje está vazio |
| `nitroxinteligence/oracle-workspace` | Referência técnica; não é a fonte do acervo definido por Mateus | Não clonar o workspace privado/pessoal na máquina do aluno |

**“Tudo” = todos os arquivos e itens declarados na release homologada.** O manifesto deve listar o acervo completo; não declarar completude com coleções vazias ou inventário parcial. A fonte está definida: as três pastas do OS. Ainda precisam ser materializadas integralmente em ORACLE-SKILLS; os 940 itens do catálogo antigo não substituem esse inventário.

O pedido de baixar o repositório GBrain completo será atendido por **snapshot do código no commit fixado**, guardado fora do vault. O executável oficial é usado para rodar; o código-fonte não exige Git, Bun, Homebrew ou ferramentas de compilação na máquina do aluno. Preservar licença e referências upstream. Métodos duplicados por variantes de plugin não devem virar especialistas duplicados no mapa.

Primeira instalação exige internet quando faltar pacote válido em cache. Depois, uso local offline. Cache só substitui download se versão, origem e hashes coincidirem com a distribuição selecionada. Não mudar a versão no meio de uma instalação.

**Versão inicial de integração:** manter o pin atual GBrain `0.48.4.0` até homologar outro conjunto motor + adapter + método. A release upstream `0.50.0.0` existe, mas não está homologada pela matriz atual.

### Publicação do acervo de Mateus

Fonte confirmada: `/Users/mateusmpz/Documents/Obsidian Vault/OS/SISTEMA/{prompts,skills,tutoriais}`. Os nomes reais estão em minúsculas; “Prots” corresponde a `prompts` na pasta examinada.

Pipeline do mantenedor: inventariar as três árvores → obter todos os bytes locais → validar integridade/recursos/licenças → gerar snapshot de publicação → espelhar em ORACLE-SKILLS → publicar release versionada. Preservar subpastas e recursos auxiliares; não publicar somente SKILL.md. Não incluir o restante do OS, credenciais ou estado pessoal. Arquivos excluídos por política devem aparecer no relatório e ser resolvidos, nunca desaparecer silenciosamente do inventário.

O publisher deve recusar arquivos ainda não baixados da nuvem e inventários que mudem durante a leitura. Formatos legítimos encontrados fora da allowlist antiga precisam ser suportados e verificados; não descartados para fazer a release passar. Atualizações do aluno consomem a última **release completa publicada**, não alterações ainda não publicadas do OS. Não criar um agendamento automático do mantenedor nesta implementação sem uma definição separada.

### Botão Atualizar

Disponível no Oracle com licença válida. Um clique consulta ORACLE-SKILLS, aplica novos conteúdos nas três bibliotecas e atualiza as skills instaladas para Codex; também consulta releases oficiais GBrain e aplica o conjunto compatível motor/adapter/método. Não troca engine ou versão incompatível silenciosamente. Versão upstream não homologada aparece como pendente de compatibilidade.

Não exigir conta GitHub do aluno. Se houver conteúdo novo, baixar/validar em staging, preservar edições locais, aplicar e reindexar; sem novidades, informar “Tudo atualizado”. Falha parcial discrimina acervo, Codex e GBrain e permite nova tentativa. O botão não atualiza outros produtos nem ativa serviços/IA por conta própria.

A matriz inicial fica selada no app. **Nesta versão, mudar o commit do adapter exige nova versão assinada do Oracle**, distribuída pelo pipeline do aplicativo; o botão não baixa nem compila um adapter avulso. O botão aplica somente conjuntos autorizados pela versão instalada. Mostrar “Atualize o Oracle para instalar esta versão do GBrain” quando houver dependência de um novo adapter. Isso resolve a atualização por conjuntos sem prometer um canal de atualização de código inexistente.

**Acesso definido pelo usuário:** manter ORACLE-SKILLS público e exigir licença somente no Oracle. O download direto pelo GitHub permanece público. Não criar servidor de autenticação de downloads, conta adicional ou credencial GitHub para o aluno. A licença controla o aplicativo, não a redistribuição de arquivos públicos.

## 4. Backend: ordem de execução

Um controlador nativo coordena todas as fases. A interface mostra estado; não executa instalação por JavaScript.

| Fase | Trabalho | Condição para avançar |
|---|---|---|
| 1. Preflight | Conferir licença, vault, leitura/escrita, sobreposição de caminhos, espaço para downloads/extração/recuperação, versão do app e instalação anterior | Destino acessível e plano compatível |
| 2. Resolver distribuição | Selecionar release aprovada; resolver commits, assets, contagens e hashes | Plano local imutável persistido e associado ao clique **Instalar** |
| 3. Baixar e validar | Baixar GBrain, snapshot e pacotes Oracle para staging; validar origem, digest, conteúdo, licenças e caminhos | Todos os arquivos obrigatórios disponíveis; nenhum pacote incompleto aplicado |
| 4. Preparar motor | Ativar executável compatível no perfil Oracle; inicializar GBrain local com `init --pglite --no-embedding` e ambiente isolado | Configuração e banco respondem; sem entrevista/bootstrap de identidade |
| 5. Criar estrutura | Registrar baseline; criar pastas necessárias sem reorganizar conteúdo existente | Pastas verificadas e journal persistido |
| 6. Instalar acervo | Copiar especialistas, skills, prompts, tutoriais e recursos em lotes; conferir bytes gravados | Emitir item instalado só quando seus arquivos obrigatórios estiverem verificados |
| 7. Preparar memória | Configurar `oracle-vault` derivado e `oracle-memory` com destino canônico; indexar Markdown e links | Inventário completo, sem páginas pendentes; retomar checkpoints automaticamente durante a execução |
| 8. Preparar integração | Instalar todas as skills para descoberta local no Codex, além do método oficial e workspace MCP genérico | Arquivos/registro local conferidos; descoberta do host registrada quando disponível; identidade pessoal **não aplicável** |
| 9. Verificar e concluir | Conferir manifesto inteiro, bibliotecas, árvore/mapa, engine e recuperação por reabertura | Recibo final íntegro e estado `completed` |

O snapshot GBrain não vai para o vault, não instala daemons upstream nem dispara scripts de skills. Dependências de uma skill para execução externa devem estar declaradas; arquivo instalado não significa conta/provedor conectado. Uma dependência necessária ao **uso local anunciado** precisa ser empacotada ou resolvida na instalação, não descoberta depois pelo aluno.

### Retirar a dependência de identidade corretamente

Criar um caminho de instalação `memory-only`, separado de `prepareGBrain`/`finishGBrain` baseados em entrevista. Reutilizar inicialização, registro de fontes, ownership e sync; separar essas operações de renderização de SOUL/USER.

Novos planos: `profile_mode=memory-only`, sem `answers` obrigatórias, sem readback e sem `identity-render.json`. O verificador exige banco, fontes, acervo, método e ponte; não exige SOUL/USER. Não marcar `identity=true` artificialmente. O workspace técnico pode ter AGENTS.md genérico com limites do produto, sem fatos pessoais.

Planos antigos: reconhecer a versão; preservar recibos, documentos e confirmações existentes. Não converter silenciosamente instalação incompleta nem considerar hash antigo válido para escopo novo. Oferecer continuar o plano antigo ou iniciar o novo fluxo com baseline renovado. Perfis GBrain externos continuam acessíveis pelos Ajustes; não são uma pergunta obrigatória do onboarding novo.

## 5. Onde cada componente fica

Raiz técnica = `~/Library/Application Support/OracleCompanion/`.

| Destino | Conteúdo |
|---|---|
| `runtime/<versão>/` | Executável GBrain e metadados de compatibilidade com o adapter |
| `sources/gbrain/<commit>/` | Snapshot oficial completo, sem execução automática |
| `cache/` e `staging/<install_id>/` | Downloads íntegros, extração provisória e recuperação |
| `gbrain/profile/` | Banco PGLite, configuração isolada e ownership |
| `codex-workspace/` | Método oficial, roteamento genérico, MCP e hooks preparados |
| `~/.agents/skills/` do aluno | Exposição das skills Oracle ao Codex local, com ownership e sem sobrescrever skills existentes |
| `setup/` e `onboarding/` | Plano, baseline, journal, eventos, recibos e estado |
| Vault: `SISTEMA/skills/<especialista>/...` | SKILL.md, referências, scripts e assets da distribuição |
| Vault: `SISTEMA/prompts/` | Prompts, com caminhos internos preservados |
| Vault: `SISTEMA/Tutoriais/` | Tutoriais e recursos; preservar esta capitalização já usada no app |
| Vault: `SISTEMA/oracle/` | Manifesto de conteúdo e mapeamento de departamentos, sem segredos |
| Vault: `INBOX/oracle-memory/{people,projects,signals}/` | Destino da memória escrita por operações autorizadas |

A estrutura nova inclui também `INBOX/oracle`, `PROJETOS`, `AREAS/pessoal`, `AREAS/profissional`, `WIKI/{pessoas,organizacoes,conceitos}`, `FONTES`, `DIARIO`, `OUTPUTS`, `ARQUIVO`, `SISTEMA/{agentes,modelos,indices}`. Reaproveitar equivalentes existentes identificados pelo código; ambiguidades exigem escolha do usuário, sem mesclar/mover automaticamente. Histórico de conversas só é criado/usado quando o recurso correspondente for autorizado.

O índice é derivado. Salvar no Oracle escreve no Markdown original; editar no Obsidian atualiza o índice. Banco, cache, código-fonte GBrain e credenciais não ficam misturados ao acervo do vault.

## 6. Contrato dos pacotes a criar

Criar manifesto versionado de instalação, aproveitando as validações atuais; o formato atual de `oracle-skills.json` sozinho não cobre o pedido.

| Grupo | Campos mínimos |
|---|---|
| Distribuição | `schema_version`, `release_id`, versão mínima do Oracle, versão do adapter, `gbrain_version`, `gbrain_commit` |
| Pacote | `id`, `kind` (`specialists`, `prompts`, `tutorials`, `gbrain-source`, `gbrain-method`, `runtime`), repo/commit, URL, bytes, SHA-256, dependências |
| Arquivo | Caminho relativo, tamanho, SHA-256, tipo, item a que pertence, modo permitido |
| Item visual | ID estável, nome, tipo, `department_id`, `specialist_id` quando aplicável, documento de entrada, arquivos obrigatórios |
| Inventário | Quantidades e bytes por tipo; lista completa de arquivos e licenças; hash do inventário |
| Autenticidade | Assinatura do manifesto e chave pública confiada pelo app, ou manifesto exato selado no bundle assinado |

Para novas releases de conteúdo sem reinstalar o app, usar **manifesto assinado**: raiz de confiança pública embarcada, `key_id`, sequência monotônica de release, assinatura sobre bytes canônicos e hashes de todos os pacotes. HTTPS e um hash publicado junto do arquivo não bastam como autenticação independente. Recusar manifesto alterado, chave desconhecida e downgrade automático; rollback explícito usa recibo local conhecido. Rotação da raiz de confiança exige atualização assinada do Oracle. O publisher precisa de assinatura configurada fora do repositório antes da primeira publicação; não distribuir chave privada.

O mantenedor gera a release a partir de material revisado e a publica antes de distribuí-la aos alunos. Publicação é trabalho de distribuição separado; não faz parte do instalador do aluno nem foi executada nesta tarefa.

Usar pacotes divididos por conjunto, com limites explícitos de download e extração. Não aumentar cegamente o limite atual: o OS inventariado tem 8.619 arquivos em skills e mais 41 em prompts/tutoriais, ultrapassando os 5.000 arquivos/50 MB aceitos pelo updater atual. As contagens são de metadados, não recibo de conteúdo íntegro. Impedir caminhos absolutos, `..`, symlinks, colisões de maiúsculas/Unicode, extração fora do staging e expansão acima do orçamento.

Arquivo idêntico existente: verificar e reaproveitar. Arquivo do usuário diferente: preservar e informar conflito com ação de resolução; nunca concluir enquanto houver item obrigatório ausente. Arquivo de release anterior: substituir apenas se o hash ainda corresponder ao último instalado, com recuperação. Manter ledger único de ownership usado pelo instalador e pelo updater.

### Instalação de skills no Codex / ChatGPT Desktop

O alvo confirmado é o **modo Codex do ChatGPT Desktop**, usando o computador local. A [documentação do Desktop](https://learn.chatgpt.com/docs/app) diferencia esse modo de Chat/Work. O [Codex lê skills locais em `~/.agents/skills`](https://learn.chatgpt.com/docs/build-skills), admite links para pastas e detecta mudanças; reiniciar pode ser necessário. Copiar ao vault sozinho não garante descoberta pelo host.

Implementação proposta: manter árvores completas no vault e gerar entradas estáveis `oracle-<id>` em `~/.agents/skills/` apontando às pastas das skills verificadas. Esses links são criados pelo Oracle após validar o destino, não aceitos de arquivos compactados. Preservar caminhos relativos entre recursos. Não duplicar as mesmas skills no escopo global e no workspace Oracle. Manter ledger com origem, destino, versão e hashes; atualizar somente entradas pertencentes ao Oracle. Colisões de nome/frontmatter precisam ser resolvidas no empacotador e verificadas no host, sem alterar skills alheias.

Registrar separadamente `files_installed`, `host_discovered` e `execution_verified`. Se o host estiver disponível, conferir o inventário real de skills. Se estiver ausente/fechado ou sem acesso para consulta, concluir o uso local do Oracle e indicar “Skills preparadas; verificação no Codex pendente”; não exigir login para copiar arquivos e não declarar integração verificada. A entrega do produto deve testar o caminho completo no Desktop instalado. Conta/modelo e confiança dos hooks continuam sob controle do usuário.

Para estender o alcance também a Chat/Work, o caminho documentado é um [plugin com skills](https://learn.chatgpt.com/docs/plugins), distribuído e instalado pelos mecanismos oficiais. Não prometer que pastas locais do Codex aparecerão automaticamente em todos os modos. Uma distribuição Oracle como plugin pode ser preparada a partir do mesmo acervo; instalação silenciosa na conta não foi comprovada e não é requisito assumido deste alvo Codex.

## 7. Formação do gráfico em tempo real

Emitir eventos persistidos, enviados à interface em lotes curtos. Campos: `schema_version`, `install_id`, `event_id`, `sequence`, `phase`, `item_id`, `kind`, `status`, `completed`, `total`, `bytes_downloaded`, `bytes_total`, `verified_paths` e `error_code` quando houver. Quantidade desconhecida deve ser `null`, nunca percentual inventado.

- Clique em instalar abre o shell completo e o Oracle central imediatamente; esse marco indica instalação iniciada.
- Conector Obsidian aparece confirmado após validar a pasta; GBrain após inicializar e verificar a conexão local.
- Departamento aparece ao entrar seu primeiro especialista real; especialista e skill aparecem quando os respectivos arquivos obrigatórios forem verificados.
- Prompts e tutoriais surgem nas bibliotecas e nas representações já existentes do produto. Não criar relações falsas para encaixá-los como skills.
- Não mostrar Codex conectado por ter preparado sua configuração. Exibir disponível para conectar, quando aplicável.
- Separar arquivo instalado de nota indexada. A pessoa pode abrir um arquivo verificado enquanto o restante é instalado; busca completa só após terminar a indexação.
- Consumir deltas sem recarregar/reorganizar o grafo inteiro por arquivo. Meta de aceitação: atualização visível em até 2 s após o recibo, no Mac de referência documentado.
- Persistir cursor; reconectar/reabrir recompõe o estado sem duplicar nós. Replay não alimenta o estado real de instalação.

Preservar o renderer SVG 2D, escala e identidade visual atuais. Não redesenhar o aplicativo nesta implementação.

## 8. Estado, falhas e concorrência

Fluxo interno proposto: `not_started → preparing → downloading → installing → indexing → verifying → completed`. Guardar subfase e checkpoint. `paused`, `interrupted` e `failed` podem voltar à última fase verificável pelo mesmo plano.

Executar fora da thread principal. Downloads podem ocorrer em paralelo com limite; escritas de instalação, updater, manutenção e indexação precisam compartilhar coordenação por perfil/vault. PGLite tem acesso serializado; manter liberação de engine por chamada e locks entre processos. Não criar um servidor com segundo escritor independente.

Queda de internet/429/5xx: retentativas limitadas e cache validado. Falta de espaço, revogação da pasta ou bloqueio de escrita: interromper com instrução concreta. Falha não remove notas nem desfaz arquivos que o usuário editou. Fechar o app cancela/coleta subprocessos e deixa journal recuperável.

Resultado `completed` exige simultaneamente: todos os pacotes obrigatórios verificados; nenhum conflito pendente; índice completo; fontes corretas; método/ponte íntegros; skills locais destinadas ao Codex instaladas; bibliotecas e mapa coerentes. Descoberta/execução no host externo têm recibos próprios e não são inferidas desse estado. Um turno finalizado, exit code isolado ou animação completa não substituem isso.

### Contratos complementares obrigatórios após revisão

1. **Transação de atualização do motor e banco.** Antes da troca, bloquear novos escritores, drenar subprocessos/MCP e fechar PGLite. Criar cópia consistente de banco/configuração/recibos; validar a nova versão sobre uma cópia descartável, incluindo migração oficial quando necessária. Ativar motor, método e banco como uma geração identificada por journal. Em falha antes de liberar uso, restaurar a geração anterior inteira; mudar apenas o executável não é rollback de banco. Depois de novas escritas canônicas, recuperação reindexa os arquivos atuais, sem descartar notas novas. Conservar geração anterior até concluir validação e persistir recibo. Testar queda entre cada gravação e migração incompatível.
2. **Índice com escopo mensurável.** Persistir inventário de Markdown elegível, hashes, exclusões explícitas e geração. Recursos binários são instalados e abertos, não prometidos como conteúdo textual pesquisável. Separar o escopo derivado `oracle-vault` da memória canônica `oracle-memory`, sem duplicação. Retomar lotes enquanto houver progresso; limite de tentativas não transforma índice parcial em completo. Arquivo obrigatório ilegível, dataless ou acima do limite impede conclusão; falha em enumeração não autoriza excluir páginas. Mudanças concorrentes invalidam a geração afetada e são reconciliadas antes de certificar sua completude. Não bloquear indefinidamente esperando que todo o vault pare de mudar: manter a geração concluída e indicar sincronização das mudanças posteriores.
3. **Limites do vault preexistente.** O orçamento precisa considerar acervo novo mais notas existentes, tamanho individual, transporte e relações. O código atual limita Markdown a 2 MB, snapshot textual a 128 MB, inventário a 60 mil notas e cada lote a 5 mil upserts. Paginar o inventário e o trabalho quando necessário; não aumentar limites cegamente. Medir na distribuição real e em fixtures de fronteira. Preflight deve explicar o limite incompatível antes de aplicar arquivos. Não prometer suporte a qualquer tamanho de vault.
4. **Remoções e renomes de conteúdo.** Identidade estável do item independe do caminho. Release nova ausente de um item não autoriza apagar nota: retirar entrada gerenciada do Codex e mover somente arquivo ainda idêntico ao último instalado para recuperação local, registrando tombstone. Arquivo editado permanece e vira conflito explícito. Renomear exige mapeamento anterior/novo no manifesto e validação de links. Reindexar apenas após inventário completo; rollback restaura entradas e arquivos gerenciados sem sobrescrever alterações posteriores. Nunca aplicar esta política a notas que Oracle não instalou.
5. **Vault, caminhos e troca de destino.** Usar um vault ativo por perfil e um destino ativo da distribuição Oracle no Codex por conta macOS; não expor duplicatas ao alternar vaults. Persistir bookmark e identidade canônica do destino. Reabertura precisa renovar acesso, conferir ownership e validar links gerados. Vault movido, desmontado ou permissão revogada deixa integração pendente e oferece selecionar novamente; não cria outro vault silenciosamente. Escolha de novo vault gera plano separado e preserva o anterior. Atualizar links apenas após validar o novo destino. Testar espaços, acentos, APFS sensível a maiúsculas e coexistência de `tutoriais`/`Tutoriais`; uma única raiz resolvida deve alimentar instalador, biblioteca e updater.
6. **Portabilidade efetiva das skills.** O publisher valida frontmatter, nomes descobertos pelo host, referências relativas, recursos compartilhados, links Obsidian e caminhos absolutos ao computador de Mateus. Renomear a pasta para `oracle-<id>` não resolve sozinho duplicação do campo `name`. Qualquer adaptação fica no snapshot distribuído, com mapeamento e proveniência; não reescreve o OS. Não presumir Python/Node/Bun/Git no Mac limpo. Dependências necessárias às funções anunciadas precisam ser provisionadas e testadas; integrações opcionais aparecem como requisitos. Revisão de licenças e segredos acontece antes da publicação pública, com exclusões reportadas, nunca apenas depois do upload.
7. **Sem inferência implícita.** O resultado inicial oferece arquivos, memória estruturada, busca textual, links e edição local. Não promete embeddings, busca semântica, agentes autônomos ou execução de todas as skills sem modelos/dependências. Essa distinção deve constar também do resumo de recursos do produto. Configuração MCP preparada não equivale a servidor registrado no host: testar o registro pelo mecanismo suportado, preservar servidores alheios e verificar protocolo real. Se houver ação de confiança exigida pelo host, mantê-la explícita nos Ajustes; não simular aceite.
8. **Instalação simultânea e recuperação.** Duplo clique, duas janelas e processos concorrentes devem resolver para o mesmo `install_id` ativo. Eventos e operações incluem `plan_hash` e geração; descartar respostas atrasadas de outra instalação. Ordem de locks e uso de `withVaultWrite` seguem o contrato de confiabilidade existente, sem locks aninhados adicionais. Após crash, revalidar bytes e destino antes de reutilizar checkpoint. A licença é conferida antes de iniciar/confirmar atualização; perda de validade não elimina arquivos nem impede recuperação de uma transação interrompida.
9. **Binários baixados no macOS.** Hash de asset upstream identifica os bytes de origem; assinatura de distribuição pode alterar esses bytes. Registrar digest upstream e digest efetivamente distribuído separadamente. Qualificar runtime baixado e adapter com as assinaturas/entitlements necessários no Mac limpo, incluindo quarentena e Gatekeeper. Não re-assinar ad hoc nem remover quarentena no computador do aluno para contornar uma falha. Se o asset direto não passar, distribuir o mesmo código upstream homologado em pacote Oracle assinado/notarizado; esse artefato é uma dependência de release.

As provas desses nove contratos integram os critérios de aceite abaixo. Para cada prova, guardar versão/commit, hashes de app e pacotes, versão do macOS e host, fixture, resultado esperado/observado e caminho do recibo. Não marcar aprovado sem evidência reproduzível.

## 9. Ordem de trabalho para a IA implementadora

| Ordem | Alteração | Ponto principal |
|---|---|---|
| 1 | Extrair as três pastas do OS; publicar distribuição completa; ampliar empacotador e updater para os três tipos | `scripts/build-skills-release.py`, `source-mirror.py`, `Sources/Oracle/Updates.swift`, `Resources/updates/sources.json` |
| 2 | Implementar instalação de memória sem identidade e versionar planos/recibos | `Core.swift`, `GBrain.swift`, `GBrainMethod.swift`, `OfflineOnboarding.swift`, `Onboarding.swift` |
| 3 | Integrar download, staging, instalação no vault/Codex, ownership, botão Atualizar e recuperação | `Catalog.swift`, `Updates.swift`, `Onboarding.swift`, `packages/gbrain-adapter/` |
| 4 | Trocar o wizard pelo fluxo de cinco telas/estados e adicionar Prosseguir após ativação | `Resources/web/onboarding.js`, `onboarding.css`, `OnboardingUIBridge.swift` |
| 5 | Ligar eventos de todos os tipos de conteúdo ao mapa/bibliotecas durante instalação | `InstallationPresentation.swift`, `installation-visual.js`, `app.js`, `atlas.js`, `library.js` |
| 6 | Validar instalação completa, interrupções, atualização e entrega em Mac limpo | Suítes nativas, integração, empacotamento e teste físico |

A etapa 1 pode ter ferramentas preparadas com fixtures enquanto o acervo é reunido, mas **a entrega final permanece bloqueada sem release real e completa**. Não substituir conteúdo faltante por exemplos para declarar conclusão.

## 10. Critérios de aceite

| Prova | Resultado exigido |
|---|---|
| Mac limpo arm64/macOS suportado, sem Git/Bun/Homebrew/Codex | Ativar, escolher vault e instalar sem terminal ou identidade pessoal |
| Release real selecionada | Todos os hashes, contagens, recursos auxiliares e licenças conferem com o manifesto |
| Instalação em andamento | Shell visível imediatamente; nós reais aparecem progressivamente; interface continua responsiva |
| Conclusão funcional | Abrir skill, prompt e tutorial; buscar documento instalado; editar/salvar e confirmar no vault; alterar no Obsidian e observar atualização |
| Codex no ChatGPT Desktop | Conferir todas as skills distribuídas na descoberta do host, recursos auxiliares e invocação representativa em nova tarefa; testar atualização, colisões e host ausente |
| Atualizar | Nova release OS atualiza prompts/skills/tutoriais e destinos Codex; GBrain compatível é atualizado e incompatível preservado; edições do aluno não se perdem |
| Grande inventário | Acervo completo passa pelos lotes/checkpoints e paginação; todos os itens permanecem alcançáveis |
| Falha em cada fase + reinício | Retoma sem duplicação, perda de dados ou falso `completed` |
| Vault existente com arquivo editado/conflito | Preserva original, pede resolução só quando necessária e bloqueia completude falsa |
| Integridade/rede/espaço | Download corrompido, versão incompatível, 429, offline e disco cheio geram falha recuperável |
| Licença física e distribuição | Ativação válida no Mac alvo, rejeição em outro Mac e pacote Developer ID/notarizado/Gatekeeper aprovado |
| Uso posterior offline | Abrir, buscar e editar localmente; recursos remotos continuam identificados separadamente |

Testes automáticos usam perfil descartável e notas sintéticas. Evidência física de licença e primeira instalação exige computador/perfil próprios e autorização. Os testes históricos não homologam este novo fluxo.

## 11. Limites e passagem

Instalação inclui todas as skills e seus recursos; execução de funções com serviços externos exige as respectivas conexões. A instalação local das skills Codex é obrigatória. Login, confiança de hooks, captura, síntese remota e backup mantêm ações/consentimentos próprios. O onboarding mínimo não exige ativá-los.

Esta especificação substitui **para o novo fluxo** os contratos antigos de entrevista/readback e catálogo mínimo vazio. Preservar compatibilidade de estados existentes, fronteiras de confiança e arquitetura. Não fazer alterações globais ou publicar dados do usuário para contornar dependências.

**Instrução para a próxima IA:** implemente este contrato na ordem acima, usando o diagnóstico como mapa de arquivos e dependências. Antes de editar, confira estado Git e instruções aplicáveis; preserve mudanças de outras tarefas. Entregue diferenças implementadas, validações realmente executadas e bloqueios restantes. Não publique ou substitua o app instalado sem autorização correspondente.
