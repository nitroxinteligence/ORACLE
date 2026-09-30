# Descoberta, seleção e prova de uso

O roteador lê metadados locais e ordena candidatos. Não executa modelos, scripts de outras skills ou ferramentas do host. Nome e descrição têm maior peso que o caminho. Intenções PT/EN são conceitos de domínio; palavras genéricas de pedido não produzem correspondências. A ordenação usa relevância, nome, descrição e caminho para ser determinística. Isso é uma heurística auditável, não uma avaliação por modelo nem uma garantia de que o primeiro candidato resolve o pedido.

Na versão 2.1, a cobertura considera intenções de domínio, preservando a busca quando um briefing inclui marca, público e produto. Propósito inicial e categoria declarada pesam mais que exemplos e referências laterais. Oferta, especificação e decomposição precisam ancorar o candidato; menção genérica a code em marketing não admite um briefing técnico. Preço é uma intenção separada de oferta. Apoios contextuais recebem peso menor, permanecendo acessíveis por busca vazia. Essas regras não substituem a leitura do candidato e podem manter vizinhos semânticos.

## Limites e escopo

- Consulta: até 4096 bytes. Arquivo/contexto/inventário do host: até 65536 bytes. Percurso: até 20000 diretórios. Página: até 100 resultados.
- Busca vazia mantém os itens alcançáveis por `--offset` e `next_offset`. Não leia todos os procedimentos em contexto: metadados primeiro, procedimento escolhido depois.
- Com múltiplos perfis, informe `--vault` explicitamente. Vault selecionado ausente produz erro, sem recorrer a outro perfil. Links do acervo precisam resolver dentro do vault selecionado, inclusive links de `SKILL.md`. Raízes adicionais só entram por `--root` explícito.
- `kind` distingue `skill`, `prompt` e `tutorial`. Os dois últimos são apoio contextual, com `automatic: false`. `disable-model-invocation: true` também impede uso automático de skill.
- `--no-host-roots` permite avaliação isolada. Sem essa flag, as raízes locais de skills são pesquisadas; isso não prova que o host as anunciou.
- O parser lê escalares do frontmatter, incluindo descrições YAML multiline. Não interpreta objetos YAML, tags executáveis ou dependências. Arquivos fora dos limites aparecem em `issues`, não são silenciosamente considerados removidos.

## Estados e recibo

`status.files_discovered` informa descoberta de arquivo. `status.host_available` é desconhecido sem inventário do host; com `--host-skills`, compara o nome ao array JSON fornecido pelo chamador. A validade e atualidade desse inventário pertencem ao chamador. `status.instructions_read` e `status.execution_verified` permanecem falsos: leitura de metadados não comprova leitura integral ou aplicação do procedimento.

`--receipt caminho.json` grava um recibo opcional com versão/hash do roteador, hash da consulta, vault e seleção com hashes dos arquivos. Ele não contém o texto do pedido. O recibo preserva `execution_verified: false`. A avaliação de execução precisa registrar separadamente as instruções lidas, ferramentas e artefatos produzidos, resultado observado e responsável pela avaliação. Descoberta do host, listagem de skills ou seleção não promovem automaticamente essa prova.

## Avaliação isolada

Execute `python3 scripts/test-oracle-routing.py` na fonte do aplicativo para casos sintéticos PT/EN, negativos, YAML multiline, paginação, flags, symlinks, limites e honestidade do recibo. `--fixture-vault /caminho/fixture` produz `.work/router-readiness/public-fixture-report.json` sem consultar um vault pessoal. Esse relatório prova roteamento por metadados apenas. A qualificação com modelo e host requer uma jornada separada.
