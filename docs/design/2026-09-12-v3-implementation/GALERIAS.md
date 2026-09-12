# Galerias de Prompts e Tutoriais

Implementação de 12/09/2026 no worktree 1609.

## Comportamento

- Abas Graph, Tutoriais e Prompts à esquerda de Meu Universo. Graph é a seleção inicial.
- Páginas dedicadas com pesquisa por nome/pasta, categorias do inventário existente, navegação por subpastas, breadcrumb e ordenação A–Z/Z–A.
- Galeria paginada em 24 itens; todos os documentos permanecem alcançáveis.
- Cartões com título e imagem local disponível; sem imagem, apenas o título. Metadados aceitos: title, cover, image, thumbnail, banner, primeira imagem Markdown ou embed Obsidian.
- Documento aberto dentro da página, com copiar, voltar e abrir a nota original no leitor existente. Voltar mantém busca, pasta, página, rolagem e foco.
- Inventário compartilhado com OracleLibrary, incluindo escolha explícita quando existem raízes ambíguas por capitalização.
- Bloquear esvazia a galeria; desbloquear volta ao Graph. As regras nativas de bloqueio e autorização permanecem no dispatcher existente.

## Capas locais

`readLibraryImage` lê imagens dentro do vault autorizado e entrega PNG reduzido à WebView. Não busca imagens remotas. Valida origem em Prompts/Tutoriais, caminhos, symlinks, formato, dimensões e tamanho. SVG passa pelo sanitizador já existente e é rasterizado antes da exibição. Referências ilegíveis deixam o cartão somente com título.

## Evidência

- Preview sintético inspecionado no navegador integrado em 1440×900, 840×900 e 481×745; sem transbordamento horizontal observado.
- Testados: alternância das três abas, Graph inicial, zoom de retorno em 118%, navegação por teclado, categoria/subpasta/busca combinadas, leitura inline e retorno com foco, pesquisa vazia, ordenação, escolha de raiz ambígua, falha de leitura com nova tentativa, atualização, bloqueio e desbloqueio.
- Cenário denso: 67 documentos distintos acessados em páginas de 24, 24 e 19 itens.
- `python3 scripts/test-library-images.py`: 19 verificações aprovadas, usando a implementação Swift real do leitor e um vault temporário com arquivos sintéticos. Inclui thumbnail 960×480, referências relativas e wikilinks, ambiguidade, tentativa de sair do vault, symlink, arquivo inválido, limite de tamanho e SVG permitido/rejeitado.
- Capturas: `evidence/gallery-prompts-final-1440.png` e `evidence/gallery-tutorials-final-1440.png`.
- `git diff --check` sem erros.

Os testes do leitor e a revisão do preview são evidências separadas. Não foi feito build ou instalação de um novo aplicativo nesta alteração; a jornada completa no app macOS instalado e no vault pessoal não foi exercitada. As capas de demonstração são capturas sintéticas já existentes, usadas somente pelo preview.
