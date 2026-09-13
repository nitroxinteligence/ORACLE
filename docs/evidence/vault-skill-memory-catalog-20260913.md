# Skill do vault, memória e acervo — 2026-09-13

A instalação gera `obsidian-<nome-do-vault>` no vault selecionado, em `SISTEMA/skills/Pesquisa/obsidian/`. A descoberta local usa um link em `.agents/skills`. Nomes iguais em destinos diferentes recebem um sufixo; reinstalação idêntica é idempotente e alterações do usuário são preservadas. A skill consulta a estrutura atual, sem inventário fixo ou leitura integral por rotina.

O aplicativo libera buffers temporários por arquivo/bloco, e a indexação mantém metadados de preflight em vez de reter o texto de todas as notas. A coleta de objetos temporários ocorre em lotes; recibos, hashes e transações de exclusões/links permanecem obrigatórios.

## Verificações

- Suíte nativa de distribuição: 56 verificações, incluindo seis casos da skill do vault, em perfil isolado.
- Hash SHA-256, 32 MiB repetidos 12 vezes: pico de 406.356.664 para 4.063.640 bytes, com hashes idênticos. Medição limitada a essa operação.
- Indexação real PGLite, 400 notas sintéticas (~24 MB) e 400 links: pico de 1.220,8 MiB para 948,4 MiB. Tempo de 22,9 para 29,6 segundos neste ensaio. A redução de memória tem custo de coleta; não representa aceleração nem limite garantido do aplicativo completo.
- Quatro testes transacionais reais: checkpoint sem mudanças, reconciliação de mudanças, rollback atômico após falha e recuperação.
- Build developer e verificação de assinatura ad hoc; não equivale a notarização.
- Parser Swift do produto verificou assinatura e todos os pacotes da distribuição `acervo-2026.09.13`: 8.968 arquivos e 240 itens.

## Remoção do especialista

A nova distribuição remove 818 skills e 4.533 arquivos da coleção Cybersecurity. Mantém 199 skills, 17 prompts e 24 tutoriais. Os dois índices do acervo foram ajustados; o conteúdo dos demais arquivos foi conferido por hash. O bundle inclui somente os arquivos listados no catálogo revisado, mesmo que um cache compartilhado ainda contenha coleções antigas. A atualização usa os recibos existentes para remover arquivos gerenciados sem sobrescrever edições pessoais.

Os resultados de fixtures, consumo da indexação, pacote assinado e descoberta efetiva no Codex são verificações distintas.
