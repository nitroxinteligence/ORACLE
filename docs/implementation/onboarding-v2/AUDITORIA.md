# Revisão de brechas — onboarding v2

**12/09/2026, checkout `1272ed4`. Escopo: documentação e inspeção de código; sem implementação ou testes de execução nesta revisão.**

**Conclusão:** a versão anterior não estava fechada em todos os contratos de implementação. As brechas abaixo foram encontradas e receberam regras em [IMPLEMENTAR.md](IMPLEMENTAR.md). Isso fecha ambiguidades identificadas; não comprova funcionamento nem ausência de outros defeitos. A entrega continua dependente de implementação, conteúdo publicável e homologação.

| Brecha identificada | Evidência ou inconsistência | Resolução documentada |
|---|---|---|
| Atualização do adapter sem canal definido | `Updates.swift`, `verifiedRuntime` exige digest do adapter embarcado; `activateRuntime` copia esse adapter. A redação anterior prometia atualizar o conjunto sem explicar como | Commit novo do adapter exige nova versão assinada do Oracle; botão usa a matriz do app instalado e informa dependência |
| Rollback de binário com banco já migrado | `rollbackRuntime` troca metadados do motor, preservando o banco; isso não demonstra compatibilidade reversa | Cópia consistente, migração em cópia, geração transacional e recuperação do banco; validar antes de liberar escritores |
| Manifesto dinâmico sem raiz de confiança decidida | “Assinado ou selado no bundle” não definia como confiar em releases futuras sem reinstalar | Manifesto de conteúdo assinado, chave pública embarcada, sequência e política de rotação/rollback; chave privada fora do repo |
| Acervo cabe no download, mas índice pode ficar parcial | `index.ts`: 128 MB de texto, 60 mil registros no checkpoint e 5 mil upserts; `Core.swift`: leitura Markdown até 2 MB; `MemorySyncCoordinator.swift`: oito retomadas | Preflight do vault mais acervo; geração verificável; paginação; erros explícitos; fronteiras e interrupções nos testes |
| Remoções/renomes não especificados | Preservar edições e substituir arquivos não define o que acontece quando uma release retira uma skill | IDs estáveis, tombstones, recuperação de arquivos gerenciados, conflitos e reconciliação de entradas Codex |
| Links Codex podem ficar inválidos | Proposta aponta para vault; `owned-runtime.ts` vincula memória à raiz canônica e recusa alvo alterado | Um destino ativo, bookmark/ownership, reparo por seleção e validação, sem duplicação ou mudança silenciosa |
| “Tudo instalado” pode esconder skill inutilizável | Inventário anterior foi de metadados; não comprovou frontmatter, caminhos portáveis ou dependências de cada item | Auditoria do snapshot e teste no host; recursos/dependências declarados e funções locais anunciadas verificadas |
| “Segundo cérebro pronto” podia ser lido como inferência pronta | `owned-runtime.ts` exige embeddings desativados, busca por palavras e rejeita provedores; hooks são desativados | Escopo inicial explícito: memória, busca textual, links e edição. Conexão MCP, inferência e confiança têm estados próprios |
| Runtime válido por SHA pode falhar na distribuição macOS | `scripts/build.sh` assina executáveis; updater escreve bytes upstream. Não há prova aqui de equivalência sob Gatekeeper | Digests de origem/distribuição separados e teste físico do runtime instalado; pacote homologado se asset direto não atender |

Também foram explicitados: colisões `tutoriais`/`Tutoriais`, duplo clique/janelas concorrentes, eventos atrasados de outra geração, licença durante recuperação e não purgar índice em leitura parcial. São requisitos preventivos de implementação; não foram reproduzidos como bugs do produto nesta revisão.

## O que ainda impede afirmar “100% funcionando”

1. **Publicação real:** materializar os bytes das três pastas, revisar conteúdo/portabilidade/licenças, assinar manifesto e publicar a distribuição. O inventário anterior tinha 4.643 arquivos dataless; não foram hidratados nesta revisão.
2. **Implementação:** o novo executor, o caminho sem identidade e os novos contratos de atualização ainda não existem conforme esta especificação.
3. **Host Codex:** testar descoberta do inventário completo, colisões, recursos relativos, execução representativa e atualização no host alvo. Documentação de um diretório de skills não prova esses resultados com este acervo.
4. **Mac limpo e falhas:** instalar pelo artefato final com licença física, permissões, runtime baixado e Gatekeeper; exercitar interrupções, banco/migração, disco cheio, vault existente e uso offline.

Não há nova decisão de produto indispensável identificada nesta revisão. Há decisões técnicas agora fixadas e dependências de entrega que exigem provas. Se uma prova falhar, corrigir ou explicitar a limitação antes de distribuir; não reclassificá-la como aprovada por estar descrita no plano.

## Conferência feita nesta revisão

- Leitura integral dos dois documentos anteriores e cruzamento das promessas com updater, runtime isolado, sincronização, limites do adapter, bibliotecas e pipeline de assinatura.
- Consulta dos contratos locais de integração e confiabilidade. Resultados históricos não foram repetidos nem apresentados como validação do onboarding v2.
- Alterações restritas aos documentos deste diretório. Sem build, publicação, instalação, execução de skills ou escrita no vault.

Fontes locais: `Sources/Oracle/{Core,GBrain,GBrainSync,Updates,MemorySyncCoordinator,LibraryPreferences}.swift`, `packages/gbrain-adapter/{index,owned-runtime,mcp}.ts`, `Resources/updates/sources.json`, `scripts/build.sh`, `docs/implementation/data-reliability-20260910.md` e `docs/implementation/integrated-delivery-20260911.md`.
