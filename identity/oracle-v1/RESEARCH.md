# Brief e pesquisa aplicada

Pesquisa delimitada em 07/09/2026, America/Recife. Objetivo: uma identidade para aplicativo macOS local que apresenta conhecimento, memória e atividade compreensível, com universo/sol/constelações como linguagem do produto.

## Base real e decisões

Foram lidos `README.md`, `docs/decisions/atlas-renderer.md`, `docs/evidence/frontend-validation.md`, `scripts/make-icon.swift` e o pipeline `scripts/build.sh`. Foi examinada visualmente a captura real `docs/evidence/oracle-native-atlas-v5.png`, identificada pelo projeto como ambiente com dados sintéticos. O ícone existente usa um sol luminoso com sete pontos e ligações. A nova proposta reduz essa complexidade sem alterar o atlas.

O contexto canônico de decisões foi recuperado por GBrain e lido integralmente em `get_page`, fonte `obsidian-os`: `/Users/mateusmpz/Documents/Obsidian Vault/OS/INBOX/oracle-memory/projects/oracle-app.md`. Esse registro contém a aprovação visual V4 e a definição de especialistas como coleções. Seus estados históricos de implementação foram tratados como históricos; o checkout atual e o briefing desta tarefa prevalecem para o estado atual. Nenhum conteúdo privado do vault foi incorporado às peças visuais.

Nome mantido: **Oracle**. O tom é preciso, simples e reservado. A marca não promete consciência, onisciência ou agentes sem limites. A frase “Seu universo, em perspectiva.” já aparece na interface examinada e é usada aqui como aplicação, não como novo posicionamento aprovado.

## Método e amostra

Agent Reach foi usado pela rota Exa, com leitura de páginas primárias e inspeção visual no navegador. Após o limite gratuito de Exa, a leitura documental continuou via Jina, como previsto na skill, e as verificações pontuais usaram páginas oficiais. Nenhuma API paga foi configurada. `agent-reach check-update` informou v1.5.0 atual.

A amostra principal tem **seis produtos**, escolhidos para cobrir conhecimento, software Mac e astronomia/cartografia. Em cada caso, a unidade examinada foi a marca e/ou o ícone apresentados na página indicada — não um levantamento de todo o produto. Sky Guide foi consultado textualmente, mas não entrou na amostra principal porque o ícone não ficou claramente visível na página examinada. A tabela registra **observações visuais e interpretação de design**, não resultados de testes com usuários.

| Referência primária | Observação delimitada | Princípio aplicado | Aparência a não copiar |
|---|---|---|---|
| [Obsidian — novo ícone](https://obsidian.md/blog/new-obsidian-icon/) | O artigo associa a pedra ao propósito; mostra marca plana e ícone com volume | Escolher uma metáfora e conservar a silhueta em uma cor | Cristal violeta, facetas e contorno irregular |
| [Bear](https://bear.app/) | Cabeça de urso em negativo dentro de forma compacta, visível no cabeçalho | Um conceito único pode identificar uma ferramenta complexa | Animal, recorte de cabeça e disco vermelho |
| [Things](https://culturedcode.com/things/) | Ícone azul com caixa, folha e check grande no hero | Hierarquia forte; o detalhe material serve ao símbolo central | Check, bandeja e desenho de objeto do produto |
| [Raycast](https://www.raycast.com/) | Símbolo diagonal compacto no cabeçalho, aplicado sobre interface escura | Contraste e assinatura curta funcionam junto de uma UI reservada | Barras diagonais, fragmentação do raio e vermelho da marca |
| [Stellarium](https://stellarium.org/) | Ícone com céu, lua, estrelas e horizonte ao lado do wordmark | Atmosfera astronômica pode contextualizar o produto | Miniatura de paisagem, crescente lunar e excesso de estrelas |
| [QGIS](https://qgis.org/) | Q circular verde com saída diagonal em perspectiva, ampliado no hero | Inicial e direção podem coexistir em uma forma simples | Q, seta em perspectiva, verde/laranja e recorte diagonal |

Síntese aplicada: um símbolo deve condensar o produto, sem tentar ser uma versão pequena da tela. O atlas continua multicolorido; a marca principal precisa de forma estável. Volume é opcional no ícone e dispensável no logotipo. As propostas usam desenho plano para permitir avaliar essa estrutura antes de qualquer material.

## Distinção e colisões

**Oracle Corporation — risco de nome alto.** O cabeçalho oficial mostra o O Tag em forma de cápsula horizontal, em vermelho. As [diretrizes oficiais de logotipos](https://www.oracle.com/legal/logos/) tratam o logo e O Tag como ativos protegidos e exigem autorização para seu uso. Esta proposta não usa esses arquivos nem o desenho de letras corporativo. Opta por título “Oracle”, proporções comuns e símbolo circular com sol deslocado. Isso reduz semelhança gráfica; não elimina a coincidência do nome.

Há também proximidade de categoria: o repositório primário [Oracle AI Developer Hub / Second Brain](https://github.com/oracle-devrel/oracle-ai-developer-hub/blob/main/apps/second-brain/README.md) publica um exemplo de segundo cérebro com memória e MCP. A associação possível não se limita a bancos de dados. Esta constatação reforça a necessidade de avaliar o nome antes de distribuição comercial.

**The Oracle — AI Voice / Delphi Labs — risco de busca e listagem relevante.** A [página publicada na App Store](https://apps.apple.com/us/app/the-oracle-ai-voice/id6757133975) apresenta o nome Oracle para um assistente de IA. Foi inspecionado o ícone servido pela própria listagem: composição escura com código/neon verde, coluna luminosa e texto “Delphi labs”. Nossa proposta evita esse tratamento. A diferenciação visual não impede colisões em busca, nome falado ou identificação do desenvolvedor.

**Símbolos circulares no software — atenção residual.** O [CircleCI](https://circleci.com/newsroom/) usa um anel interrompido com ponto central. QGIS também combina círculo e interrupção direcional. Por isso, a direção recomendada tem o disco **na abertura da órbita**, centro (177,79), sem ponto no centro (128,128), sem seta ou cápsula. Essa é uma distinção geométrica verificável, não uma alegação de exclusividade.

Antes do lançamento comercial, cabe busca nominativa e figurativa nas jurisdições relevantes, incluindo registros como [INPI](https://www.gov.br/inpi/pt-br/servicos/marcas) e [WIPO Global Brand Database](https://www.wipo.int/en/web/global-brand-database), lojas de aplicativos e domínios. Esse procedimento não foi executado de forma exaustiva aqui. Classes, territórios e viabilidade de registro dependem de avaliação especializada. **Não há parecer jurídico ou autorização de uso de nome/marca nesta entrega.**

## Apple: especificação atual e consequência prática

As [Human Interface Guidelines de app icons](https://developer.apple.com/design/human-interface-guidelines/app-icons), consultadas ao vivo e com revisão indicada de 08/06/2026, estabelecem para iOS/iPadOS/macOS canvas quadrado de **1024 × 1024**, composição em camadas e máscara aplicada pelo sistema. Recomendam formas simples, conteúdo principal centralizado e consistência entre aparências. O detalhe cosmético não pode destruir a leitura reduzida.

A documentação [Creating your app icon using Icon Composer](https://developer.apple.com/documentation/xcode/creating-your-app-icon-using-icon-composer) orienta exportar SVG quando possível, converter letras em contornos, nomear as camadas e retirar máscara e efeitos embutidos. Por isso, entregamos duas camadas transparentes por aparência; o fundo opaco é configurado na ferramenta. O resultado preparado ainda precisa de importação e inspeção no Icon Composer.

O [Icon Composer](https://developer.apple.com/icon-composer/) permite anotar Default, Dark e Mono; a documentação atual descreve variantes claras/escuras de clear e tint. Não produzimos um `.icon` validado nem uma simulação que pretenda reproduzir o material do sistema.

Para o pipeline clássico existente, a [referência Apple de iconset](https://developer.apple.com/library/archive/documentation/Xcode/Reference/xcode_ref-Asset_Catalog_Format/IconSetType.html) e o guia [Optimizing for High Resolution](https://developer.apple.com/library/archive/documentation/GraphicsAnimation/Conceptual/HighResolutionOSX/Optimizing/Optimizing.html) documentam cinco tamanhos em pontos, cada um em 1× e 2×: 16, 32, 128, 256 e 512. São fontes arquivadas para a via **legada**, não a especificação moderna. Os quatro iconsets entregues têm as dez representações; o AppKit também foi exercitado a 64 pt, por seleção/escalonamento nativo.

## Recomendação por critérios

Escala de 1 a 5, mesma ponderação. **Julgamento do designer sobre as peças, não medição de reconhecimento nem teste de mercado.** “Diferenciação” considera a amostra examinada e permanece conservadora.

| Critério | A / Órbita solar | B / Azimute | C / Fólio solar |
|---|---:|---:|---:|
| Reconhecimento potencial | 4 | 4 | 4 |
| Simplicidade estrutural | 5 | 4 | 4 |
| Leitura em pequena escala | 5 | 3 | 4 |
| Relação com o produto real | 5 | 4 | 3 |
| Diferenciação na amostra | 3 | 2 | 2 |
| **Total / 25** | **22** | **17** | **17** |

Recomendo **A**: duas peças, O reconhecível, referência solar e canal de ar visível entre as partes. B é mais angular e perde respiro no centro quando reduzida; também pode lembrar emblemas de serviços financeiros/cripto, razão adicional para não recomendá-la. C comunica conhecimento com facilidade, mas seu livro aberto tem associações mais genéricas de educação e o conjunto pode lembrar uma pessoa lendo. O risco principal de A continua sendo a saturação do repertório circular, além do próprio nome Oracle.

## Fontes e licenças

| Uso | Família e desenho | Licença e fonte original |
|---|---|---|
| A, B e apresentação | Manrope; A em 600, B em 500; espaçamento óptico documentado | [Google Fonts / Manrope](https://github.com/google/fonts/tree/main/ofl/manrope), [OFL 1.1](https://github.com/google/fonts/blob/main/ofl/manrope/OFL.txt). Copyright 2018 The Manrope Project Authors; projeto de Mikhail Sharanda |
| Wordmark C | Newsreader 500, eixo óptico 24 | [Google Fonts / Newsreader](https://github.com/google/fonts/tree/main/ofl/newsreader), [OFL 1.1](https://github.com/google/fonts/blob/main/ofl/newsreader/OFL.txt). Copyright 2020 The Newsreader Project Authors / Production Type |

Arquivos de fonte originais conservados sem alteração em `fonts/`, junto das licenças completas. A conversão em contornos e o ajuste de espaçamento acontecem apenas nos documentos gráficos. Nenhuma fonte foi comprada ou instalada no sistema. SF Symbols e San Francisco não foram usados como logotipo. Os hashes dos arquivos entregues constam de `qa/manifest-sha256.json`.
