# AI Memory no onboarding Oracle

Novos planos de instalação do Second Brain incluem AI Memory como componente obrigatório no backend. O plano registra o requisito antes de calcular seu hash e confirmar a instalação. Planos anteriores permanecem íntegros; não são migrados silenciosamente.

## Sequência implementada

1. Inicializar ou reaproveitar o perfil GBrain do vault selecionado.
2. Preparar o runtime AI Memory oficial v2.4.2, commit `a0ca8d1a5fbd5920799411fa891fe6d49c90efc1`. Conferir SHA256 do archive e do executável, arquitetura arm64 e versão mínima de macOS. O download usa o artefato público fixado; um archive local só é aceito com os mesmos hashes.
3. Inicializar um perfil operacional separado do vault e do GBrain, sem modelo, embeddings, captura ou watcher. Conferir o protocolo local usando os caminhos finais da instalação.
4. Preparar um serviço HTTP local compartilhado, com LaunchAgent próprio e porta em `127.0.0.1`. Conferir autoria do plist, executável, argumentos, PID, endpoint, health e protocolo MCP com dois clientes. As portas das instalações existentes, 49374 e 49375, não são usadas para esse novo serviço.
5. Preparar `[mcp_servers.oracle_ai_memory]` na configuração do workspace Oracle do Codex, com a URL HTTP verificada. Não alterar aprovações, sandbox, hooks globais ou configuração global do Codex.
6. Gerar instruções para consultar histórico relevante usando os valores exatos de workspace e project verificados no serviço. Consulta textual usa `answer:false`. O conhecimento durável do vault segue pelo Oracle MCP e exige readback no Markdown e no GBrain.
7. Concluir somente depois de conferir recibos do runtime, serviço, configuração Codex e plano atual. Alteração externa ou serviço indisponível impede uma conclusão falsa e preserva arquivos para retomada.

Uma instalação global compatível de AI Memory v2.4.1 ou v2.4.2 é descoberta e preservada. O Oracle não cria outra instância, não troca seus hooks e não modifica o Hermes. Configurações que não puderem ser interpretadas com segurança exigem revisão, sem instalação duplicada.

A conexão Oracle MCP gerada para o Codex identifica o vault e a revisão exatos. Um processo que carregue configuração anterior deve recusar o perfil depois de uma troca de vault, mesmo se for iniciado novamente por um chat antigo. A retomada prepara novamente a configuração gerenciada e conserva edições humanas.

A troca de vault arquiva somente o estado de onboarding daquele vault. Licença do Mac, dispositivo, grants e arquivos globais desconhecidos permanecem no perfil ativo. A recuperação de archives antigos mantém os arquivos atuais e informa metadados unsigned ainda pendentes de recuperação revisada; não fabrica consentimento ou confiança. O teste integrado compara os bytes de acesso antes e depois da troca, retorno e interrupção, sem reativar a licença para esconder uma falha.

## Fronteiras de dados e evidência

Markdown no vault selecionado é o registro portátil. GBrain indexa esse conteúdo. AI Memory conserva estado operacional próprio fora do vault. Sua instalação não exporta automaticamente todas as conversas, observações ou SQLite para o Obsidian. A exportação autorizada de páginas wiki mantém origem e conflitos; backup remoto GitHub exige destino e autorização próprios.

`runtimePrepared`, `serviceAvailable`, protocolo local verificado, configuração preparada, descoberta pelo Codex, confiança de hooks e execução real são provas distintas. Os recibos de instalação não fabricam confiança, captura ou execução pelo Codex.

A gestão de memória fica no backend. Não foi acrescentado painel AI Memory às configurações nem uma etapa obrigatória de conta, treinamento ou primeira memória ao onboarding.

## Implementação modular

- `AIMemoryProvisioning*`: release fixada, admissão, descoberta e preparo do runtime.
- `AIMemoryService*`: serviço HTTP, identidade, recibos e recuperação.
- `AIMemoryOnboarding.swift`: requisito do plano, configuração e prova de conclusão.
- `Onboarding.swift`: sequência da instalação.
- `Catalog.swift` e `GBrainMethod.swift`: workspace e instruções do Codex.

As suítes sintéticas usam `.work/` e licenças de teste. O driver Core de teste exige `--self-test-distribution`, raiz explícita e opção de ambiente própria; não registra LaunchAgents reais. Uma prova temporária do adapter nativo deve registrar e remover apenas o job do perfil descartável, com ausência final conferida. Homologação em outro Mac, distribuição assinada e notarizada, configuração pessoal ativa e captura real no vault são etapas próprias.

Resultados datados, manifesto do build e limites finais ficam em `.work/client-readiness-final-report.md` e nos relatórios vinculados por ele.
