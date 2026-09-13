# Capas estáticas das galerias

`gallery-metallic-shader.js` adapta o shader fornecido pelo usuário, de @alissa / OpenShaders (https://openshaders.com/@alissa). Preserva o campo dobrado e o acabamento halftone; remove a cor pela redução de chroma e equalização dos canais. O código serve somente para exportar as capas, não é carregado pelo aplicativo.

Abra `gallery-metallic-shader.html` em um servidor local. `renderMetallicShader(canvas, time)` desenha um único quadro e devolve uma imagem WebP. As seis imagens de `Resources/web/gallery/` usam os tempos fixos `[0, 2, 4, 7, 11, 16]`, tamanho 960 × 480 e qualidade 0,94. Não há relógio nem loop de animação.

O card escolhe uma dessas imagens de forma estável pelo caminho do documento. O nome exibido vem da primeira pasta abaixo da raiz da biblioteca, inclusive quando o documento está em uma subpasta. Imagens e texto originais do documento continuam disponíveis na sua página de leitura.
