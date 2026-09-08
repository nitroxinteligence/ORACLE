# Especificação da proposta A / Órbita solar

Status: vetor e exports preparados para revisão; identidade ainda não aprovada.

## Símbolo

Canvas nominal 256 × 256. A órbita tem centro (128,128), raio externo 90, raio interno 64 e arco de 260°. A abertura de 100° ocupa o quadrante nordeste. As duas extremidades são cortes radiais a 5° e 265° no sistema de coordenadas SVG. O disco solar tem centro (177,79) e raio 31.

As partes não se encostam. O sol ocupa o quadrante que falta ao anel; o centro geométrico permanece vazio. A órbita sugere o O de Oracle, sem elipse de Saturno, pupila central ou rede de pontos. O deslocamento do sol é parte da assinatura: não recentralizar o disco, girar o conjunto, arredondar pontas ou fechar o anel.

O símbolo é formado por um setor anular fechado e um círculo. Não há linhas de espessura variável, filtros, raster, máscara, autotrace ou dependência externa no master. Os arcos são circulares exatos, não curvas aproximadas por centenas de nós.

## Espaçamento e tamanhos

- O master tem 38 unidades livres nos extremos máximos da órbita. Esse espaço já acompanha o canvas e funciona como proteção mínima em aplicações de marca.
- A assinatura horizontal usa símbolo nominal de 96 unidades e palavra de 61 unidades tipográficas, com posicionamento óptico descrito no gerador. O símbolo tem bastante ar dentro do próprio canvas; não recortar esse espaço antes de combinar com o wordmark.
- Símbolo isolado: master normal a partir de 32 px; master `symbol-micro-*` em 16–24 px. O micro aumenta a espessura do anel de 26 para 28 unidades e reduz o sol de 31 para 30, mantendo posição e abertura.
- Wordmark: mínimo proposto de 80 px de largura, assinatura completa de 120 px. Esses limites são sugestões desta revisão, não resultados de estudo com usuários. Use somente o símbolo quando a palavra ficar pequena.
- O ícone clássico de 16/32 pt usa ajuste micro; as versões maiores usam o master normal. As camadas modernas conservam o master; sua redução final precisa ser revista no Icon Composer.

## Palavra

Texto **Oracle**, título em Manrope, eixo `wght=600`. O desenho das letras pertence à família original. O ajuste desta proposta está no peso, caixa e ritmo entre letras. O gerador usa tracking geral de −0,012 em e ajustes adicionais nos pares Or −0,028 em, ra −0,034 em, ac −0,014 em, cl −0,008 em, le −0,014 em. O arquivo final está em contornos; não depende de instalação de fonte.

Preservar o título em aplicações principais ajuda a diferenciar do wordmark corporativo ORACLE em caixa alta. “ORACLE” pode continuar como nome textual na interface atual; essa entrega não muda sua tipografia.

## Cores

| Papel | Claro | Escuro |
|---|---|---|
| Fundo do ícone | `#EEECE6` | `#1E252A` |
| Órbita / palavra | `#20252A` | `#FFFFFF` |
| Sol de apoio | `#B97423` | `#F4B860` |

Para impressão ou marca em uma cor, use `symbol-black`, `wordmark-black`, `lockup-black` e seus inversos brancos. As cores são sRGB; não há CMYK certificado ou perfil de impressão nesta entrega.

Razões de contraste calculadas apenas como referência de leitura: branco/escuro 15,52:1; âmbar/escuro 8,77:1; tinta/claro 13,08:1; ocre/claro 3,18:1. O sol ocre não foi definido como cor de texto pequeno. Esses números não constituem certificação de acessibilidade do app.

## Ícone clássico e camadas modernas

O conceito clássico usa canvas 1024 × 1024, placa entre (64,64) e (960,960), raio ilustrativo de 198 e transparência no exterior. A área de desenho é posicionada em (144,144), com escala 736/256. A placa arredondada é **somente o formato visual do export clássico**. Não a importar como máscara na ferramenta moderna.

As camadas em `recommended/icon-composer-layers/` têm canvas 1024 × 1024, transparência, posição compartilhada e nenhuma placa ou sombra. A primeira contém a órbita; a segunda, o sol. Configurar o fundo opaco no Icon Composer. Default, dark e mono mantêm a mesma geometria. As variantes clear e tinted precisam ser geradas e examinadas a partir da anotação mono na ferramenta da Apple.

O contorno do símbolo não chega perto das bordas do canvas. O limite espacial final ainda deve ser conferido com a grade, máscara e efeitos reais do Icon Composer; o arredondamento desta prancha não pretende replicar matematicamente a máscara do sistema.

## Critérios de aprovação

Mateus deve escolher uma direção, aprovar símbolo/wordmark e a relação de claro/escuro. Antes de integrar a direção A: revisar sua leitura reduzida, aceitar ou ajustar a cor solar e avaliar a distinção em relação à amostra de marcas. Antes de distribuir: validar material moderno, pipeline de ícone, nome e símbolo nos mercados de destino. Nenhum clique na apresentação registra aprovação.
