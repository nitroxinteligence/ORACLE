# Memória Oracle: falha de caminho e contrato de portabilidade

Documento público derivado da investigação de 30/09/2026. Os caminhos, contagens, cronologia e metadados do perfil pessoal foram removidos desta versão. O diagnóstico completo permanece somente na evidência local ignorada pelo Git.

## Falha confirmada e correção

Um setup executado a partir de um bundle temporário podia gravar esse caminho absoluto nos hooks e no servidor MCP do workspace Oracle. Depois de apagar o bundle, os comandos não conseguiam iniciar. Um índice recente podia continuar refletindo notas existentes e mascarar a ausência de novas capturas.

O vínculo de runtime agora verifica o aplicativo instalado e os recursos próprios antes de preparar a integração. Arquivos editados pelo usuário são preservados. Corrigir o caminho não fabrica confiança de hooks, consentimento ou prova de captura. Uma instalação antiga precisa de repreparo da conexão e de verificação própria após carregar os recursos no Codex.

## O que cada camada grava

- O vault selecionado guarda o conhecimento portátil em Markdown original.
- O GBrain mantém um índice derivado das notas; atualização do índice não cria uma conversa ausente.
- O AI Memory conserva wiki Markdown e SQLite operacional em seu perfil próprio, fora do vault. O Codex consulta esse serviço por MCP.
- A captura Oracle abrange somente prompts e respostas finais fornecidos pelos hooks confiados no workspace autorizado. Não acompanha automaticamente todos os chats e projetos Codex.

O upstream fixado usa `<data_dir>/wiki/<workspace>/<project>` para a wiki. Seu exportador não transfere todas as observações ou handoffs do SQLite nem oferece sincronização automática com Obsidian. Fontes: [armazenamento](https://github.com/akitaonrails/ai-memory/blob/a0ca8d1a5fbd5920799411fa891fe6d49c90efc1/crates/ai-memory-wiki/src/wiki.rs#L199), [exportação](https://github.com/akitaonrails/ai-memory/blob/a0ca8d1a5fbd5920799411fa891fe6d49c90efc1/crates/ai-memory-mcp/src/admin.rs#L913), [formato OKF](https://github.com/akitaonrails/ai-memory/blob/a0ca8d1a5fbd5920799411fa891fe6d49c90efc1/docs/okf.md).

## Proteções implementadas

Novos planos do Second Brain incluem preparo do runtime AI Memory e conexão no workspace Codex. A gestão permanece no backend. Integrações globais compatíveis são preservadas; planos antigos conservam seus hashes.

A exportação autorizada de páginas elegíveis usa origem, projeto, versão e hash, entrega em pasta própria e preserva alterações humanas em conflito. É unidirecional. Leitura parcial, página expirada ou memória apagada na origem não autorizam apagar notas pessoais. Trocar de vault invalida a autorização anterior e os recibos precisam ser verificados novamente.

Gravação no Markdown, cobertura dos fatos aprovados, índice completo e recuperação útil são provas separadas. Ter uma pasta, um arquivo ou um índice não confirma toda uma entrevista. SQLite ativo, WAL, modelos e logs permanecem no armazenamento operacional.

## Limites atuais

A exportação contínua de todas as memórias e o backup remoto ao GitHub não estão habilitados ou homologados. Git local da wiki não significa upload. Um destino remoto exige configuração e autorização próprias; notas pessoais nunca devem ser enviadas ao repositório do Oracle.

Testes isolados, preparo de configuração, serviço disponível, confiança, execução real no Codex e captura em um vault pessoal devem ser registrados separadamente. Instalar uma atualização do aplicativo não prova automaticamente o reparo de todas as conexões existentes.
