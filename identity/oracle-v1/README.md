# Oracle — proposta de identidade V1

**Recomendação: A / Órbita solar. Status: proposta, aguardando escolha de Mateus.**

Abra [a apresentação local](index.html), [a comparação em PNG](boards/01-comparison.png) ou [a comparação em PDF](boards/01-comparison.pdf). Todos os recursos da apresentação são locais, sem dependências de rede. Ela foi revisada em servidor local; para abrir sem servidor, use o arquivo `index.html` no navegador pelo Finder.

[Baixar o pacote completo em ZIP](oracle-identity-v1.zip), incluindo fontes, licenças, pranchas, masters, exports, documentação e recibos.

O sol ocupa o quadrante aberto de um O. São duas formas sólidas: uma órbita incompleta e um disco. A composição mantém o universo do aplicativo sem reproduzir seus sete núcleos, suas linhas ou sua atmosfera. A cor solar é um apoio; o desenho sobrevive em preto e branco.

## O que foi entregue

| Pasta / arquivo | Conteúdo |
|---|---|
| `index.html` | Apresentação local com comparação, escolha de preview e teste em claro/escuro |
| `boards/01-comparison.*` | Três direções, mesma escala nominal, claro/escuro, mono e redução |
| `boards/02-recommendation.*` | Aplicação da direção recomendada |
| `boards/03-construction.*` | Geometria e ajuste óptico |
| `boards/04-native-icns.*` | Amostras rasterizadas a partir dos ICNS pelo AppKit |
| `directions/a`, `b`, `c` | Símbolos, wordmarks, assinaturas horizontais e conceitos de ícone das três direções |
| `recommended/` | SVG, PDF e PNG da direção A, com variantes de cor e monocromáticas |
| `recommended/icon-composer-layers/` | Seis camadas SVG 1024 × 1024 sem máscara, com PNG equivalente |
| `recommended/legacy/` | Quatro ICNS e seus quatro iconsets completos, dez representações por família |
| `fonts/` | Manrope e Newsreader originais, com licenças OFL 1.1 |
| `RESEARCH.md`, `SPECIFICATION.md`, `INTEGRATION.md` | Brief, referências, decisão de design, especificação e integração futura |
| `qa/verification.json`, `qa/native/` | Recibos técnicos e 48 amostras renderizadas pelo macOS |
| `scripts/` | Geração vetorial reproduzível, renderização nativa e verificação dos exports |

## Escolha proposta

1. **A / Órbita solar — recomendada.** Melhor síntese entre o O, o sol e a exploração do conhecimento. Título em Manrope 600, com espaçamento óptico.
2. **B / Azimute.** Duas dobras de orientação e um ponto de referência. Mais técnica; seus ângulos e o nome em caixa alta aproximam a marca de ferramentas corporativas.
3. **C / Fólio solar.** Livro aberto sob um sol. Clara para conhecimento, mas pode sugerir educação ou leitura; Newsreader acrescenta caráter editorial.

Os arquivos têm construção vetorial própria, sem autotrace ou imagens geradas. Os wordmarks são tipografia licenciada convertida em contornos e espaçada; não são alfabetos desenhados do zero. As pranchas em SVG/PDF incorporam as aplicações de ícone para apresentação; os masters individuais do símbolo e do wordmark continuam integralmente vetoriais.

## Limites e aprovação

O nome Oracle já estava decidido; as três identidades **não estão aprovadas**. Nenhum componente, renderer, ícone instalado, bundle ou metadado do aplicativo foi alterado. Não houve merge ou publicação.

Os ICNS são exports clássicos completos da proposta, adequados a uma futura integração no pipeline atual após aprovação. As camadas modernas estão preparadas para Icon Composer, mas não constituem um arquivo `.icon` nem comprovam comportamento Liquid Glass, clear ou tinted. O Mac consultado tem Command Line Tools, sem Icon Composer/Xcode completo identificado. Esses modos ainda precisam ser avaliados na ferramenta da Apple.

A investigação encontrou risco relevante de confusão pelo nome, sobretudo com Oracle Corporation e um app de IA homônimo. A pesquisa visual não é liberação jurídica; antes de lançar comercialmente, verificar nome e símbolo nos mercados pretendidos. Detalhes e fontes em [RESEARCH.md](RESEARCH.md).

## Reproduzir

Requisitos: Python com `fonttools`, `cairosvg` e `pillow`, além de Swift/AppKit e `iconutil` no macOS. Versões usadas: fonttools 4.64.0, CairoSVG 2.9.1 e Pillow 12.3.0. Nenhuma chamada de rede é feita pelos scripts.

```sh
python scripts/build_assets.py
swift scripts/render_icns.swift "$(pwd)"
python scripts/verify_assets.py
python scripts/build_assets.py --native-board
```

Execute esses comandos a partir desta pasta. Eles escrevem somente dentro dela e em diretório temporário de verificação; não executam o build do aplicativo.

Produzido em 07/09/2026 (America/Recife). Base consultada: commit `065cdb4b85a55cbb96d7cd9b43017add115f74d7`.
