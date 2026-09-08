# Oracle V3 — Michroma + planeta

**Confirmado por Mateus:** fonte Michroma, direção do planeta e fundos dos ícones. Na revisão, Mateus gostou da proposta e pediu corrigir as cores/gradientes do planeta nos dois ícones. **Revisão atual:** planeta e órbita inteiramente em uma cor sólida; fundos, geometria e escala preservados. Nenhum asset foi aplicado ao aplicativo.

Abra [a apresentação](index.html), [a prancha PNG](boards/oracle-planet-michroma.png), [o PDF](boards/oracle-planet-michroma.pdf) ou [o pacote ZIP](oracle-planet-michroma-v3.zip).

A proposta concentra a marca em uma esfera com órbita inclinada a −28°. Dois canais transparentes separam a faixa orbital das partes da esfera. A leitura de planeta se mantém em preto e branco. No ícone escuro, esfera e órbita usam branco sólido `#EFF7FF`; no claro, grafite sólido `#101E2C`. O gradiente metálico e a órbita azul foram removidos. Os gradientes originais dos fundos foram preservados.

## Tipografia escolhida

[Michroma no Google Fonts](https://fonts.google.com/specimen/Michroma), Regular 400, de Vernon Adams. Foi consultada no próprio catálogo, e o binário veio do [repositório oficial Google Fonts](https://github.com/google/fonts/tree/main/ofl/michroma). A licença SIL Open Font License 1.1 acompanha o arquivo original em `fonts/OFL-Michroma.txt`.

O wordmark usa os glifos originais em caixa alta, sem distorção horizontal, com espaçamento de 0,12 vezes a altura das maiúsculas entre as letras. Nos SVG/PDF, as letras foram convertidas em contornos. Manrope é usada apenas nos textos da apresentação, também com arquivo e licença incluídos.

## Assets

- `assets/symbol-black.*` e `symbol-white.*`: símbolo em SVG/PDF/PNG.
- `assets/symbol-micro-*.svg`: versão óptica, com mais respiro para 16–24 px.
- `assets/wordmark-*.svg/pdf/png`: nome em Michroma.
- `assets/lockup-*.svg/pdf/png`: assinatura horizontal.
- `assets/icon-dark.*` e `icon-light.*`: ícone estático conceitual, canvas 1024 × 1024.
- `assets/composer-sphere.svg` e `composer-orbit.svg`: duas camadas vetoriais transparentes 1024 × 1024, sem máscara e sem material embutido.
- `boards/oracle-planet-michroma.*`: prancha comparativa com aplicação e redução.

As curvas são arcos circulares/elípticos calculados diretamente, sem autotrace e sem imagens dentro do símbolo ou wordmark. Nos ícones, apenas a placa de fundo conserva seu gradiente; planeta e órbita são planos e sólidos. Não são exportações do Icon Composer. As duas camadas `composer-*` são as fontes apropriadas para uma futura montagem nessa ferramenta.

## Limites desta revisão

A V1 foi rejeitada. A V2 abriu a exploração tecnológica; depois, Mateus escolheu Michroma e reafirmou o tema de planeta, orientando esta V3. As pastas anteriores permanecem preservadas como histórico e não representam identidade aprovada.

O conceito de planeta com órbita é um repertório conhecido; a construção própria não garante exclusividade. A busca figurativa exaustiva e a verificação comercial do nome continuam pendentes. Não copiar ou interpretar como autorizados os logotipos de outras empresas chamadas Oracle.

Esta entrega não gera novo ICNS nem muda `Resources/Oracle.icns`, componentes ou metadados. O pacote de aplicação deve ser fechado após aprovação do desenho, com inspeção do material no Icon Composer e no app. As medidas e variantes atuais são uma proposta revisável, não um padrão já aprovado.

Para regenerar: Python com fonttools e CairoSVG, executando `scripts/build_planet.py`. O script lê fontes locais e escreve somente nesta pasta. A exploração anterior com ImageGen permanece em `../oracle-v2/concepts/`, separada destes vetores; esta V3 foi desenhada diretamente em SVG.
