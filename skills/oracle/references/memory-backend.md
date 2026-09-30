# Memória e portabilidade no backend

Use esta referência somente em pedidos de diagnóstico, exportação ou backup. O usuário trabalha com o Oracle, o Codex e o vault escolhido; os mecanismos internos não precisam de um painel próprio na interface.

## Responsabilidades e estado atual

As notas Markdown do vault são canônicas. GBrain fornece um índice derivado. AI Memory mantém a wiki e o banco operacional em seu próprio diretório. Não copie SQLite, WAL, modelos, logs ou eventos brutos para o vault. A instalação do AI Memory não implica exportação para Obsidian.

Os novos planos de instalação do Second Brain incluem o runtime AI Memory verificado, um serviço local compartilhado e a configuração do Codex no espaço Oracle. A instalação compatível já existente no Codex é preservada. Recibos do runtime, serviço e configuração são exigidos antes da conclusão; isso não concede confiança aos hooks nem prova execução na sessão do Codex. Planos antigos já confirmados permanecem intactos.

O backend também oferece exportação manual e unidirecional de páginas elegíveis, backup local do vault e diagnóstico do vínculo Codex. Instalação não habilita captura nem exporta automaticamente páginas ao Obsidian. Não envia memórias ao GitHub. Não anuncie essas rotinas como automáticas ou ativas sem verificar o perfil efetivamente selecionado.

## Acesso local

Identifique o perfil e o vault em `context.json`; com vários perfis, use a seleção explícita da conversa. Confirme um bundle Oracle instalado em caminho durável e a existência de seu executável. Não procure nem execute bundles temporários apagados. O seguinte exemplo usa o caminho padrão de instalação; verifique o caminho real antes de executar:

```sh
'/Applications/Oracle.app/Contents/MacOS/Oracle' --memory status --state '/caminho/absoluto/do/perfil'
```

O comando retorna JSON. Se a versão instalada não reconhecer `--memory`, informe que é necessária uma versão que implemente o backend; não substitua o aplicativo, o perfil nem os hooks para contornar essa limitação. Falha de licença ou autorização não deve ser contornada.

Para uma operação com dados, crie um arquivo JSON regular local e passe `--memory-input '/caminho/absoluto/input.json'`. Nunca interpole conteúdo de notas, títulos ou destinos em código shell. Os comandos são invocações independentes e aceitam somente `--memory`, `--memory-input` e `--state`.

## Diagnóstico

`status` distingue autorização de exportação, backup, manutenção, roteador e vínculo do runtime. Um caminho válido, arquivos instalados, hooks preparados, hooks confiados, captura observada e recuperação de conteúdo são provas distintas. Uma execução de manutenção ou um índice recente não prova captura de uma nova conversa.

A captura Oracle é limitada ao espaço de trabalho autorizado do próprio Oracle e às mensagens previstas no consentimento. Não interprete a existência do vault como autorização para ler todos os chats privados do Codex.

## Exportar páginas selecionadas

1. Verifique `status` e o `scopeToken` atual. Identifique o projeto wiki exato no AI Memory e confirme com o usuário o destino e os tipos de conteúdo autorizados. Não escolha automaticamente todos os projetos nem use a raiz inteira de dados do serviço.
2. Somente após autorização explícita, execute `ai-configure` com `enabled: true`, `source` absoluto do projeto wiki, `includeSessions` e o `scopeToken`. Sessões têm escopo próprio; o padrão é `false`. A mudança de vault invalida a autorização anterior.
3. Execute `ai-candidates`. Paginação usa `offset` e `nextOffset`; os candidatos incluem um `snapshot` do inventário completo. Não continue uma entrega usando inventários parciais ou tokens de snapshots diferentes.
4. Use `ai-preview` com o `id` e o `snapshot` retornados. Leia as páginas selecionadas e confira os fatos que o usuário quer conservar.
5. Com a seleção aprovada, execute `ai-export` com `ids`, `snapshot` e `confirmed: true`. O limite é de 100 páginas e 16 MB por lote. Se a origem mudar, consulte novamente e reveja a seleção; não force um token antigo.
6. Leia o recibo. As páginas são copiadas para `INBOX/oracle-ai-memory` no vault autorizado, com origem e integridade. Edições humanas divergentes permanecem intactas. Confirme a indexação e a recuperação separadamente se forem parte do pedido.

Se houver interrupção com conflito, `ai-recovery-preview` apresenta a pendência. `ai-recover`, com `confirmed: true` e o `previewID` atual, preserva a edição local e encerra o journal correspondente. A recuperação não equivale a salvar, indexar ou recuperar novas páginas. Não apague uma nota humana nem adote seu hash como se fosse conteúdo gerado pelo serviço.

## Backup local

Consulte `vault-backup-status`. Habilite `vault-backup-configure` somente após autorização para o destino absoluto externo ao vault, com `scopeToken` atual e exclusões explícitas. `vault-backup-create` gera uma cópia e um recibo de cobertura e integridade. A restauração usa `vault-backup-restore` com o `id`, uma pasta nova e vazia, e `confirmed: true` autorizado pelo usuário. Não restaure por cima do vault ativo.

Backup de notas, anexos e `.obsidian` é separado do backup do banco GBrain e do runtime AI Memory. Uma cópia local não implica upload ao GitHub. Não crie nem publique um repositório de memórias por conta própria.

## Informar o resultado

Informe o vault confirmado, as páginas ou arquivos efetivamente gravados, conflitos preservados e o recibo pertinente. Diga separadamente se houve indexação completa e recuperação em uma consulta real. Use linguagem simples e links para os arquivos produzidos; detalhes do runtime só ajudam quando explicam uma pendência.
