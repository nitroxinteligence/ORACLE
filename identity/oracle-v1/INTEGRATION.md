**Integração executada em 08/09/2026:** direção A / Órbita solar incorporada ao build, ícone do aplicativo e cabeçalho, atendendo ao pedido de consolidar as três frentes. O procedimento abaixo documenta a origem da integração.

# Integração futura — executar depois da escolha

Esta tarefa alterou somente `identity/oracle-v1/`. O app, seu bundle e `Resources/Oracle.icns` foram preservados. Não executar as instruções abaixo como autorização implícita para integrar: a escolha da identidade ainda pertence a Mateus.

## Pipeline atual

No checkout consultado, `scripts/build.sh` linhas 5–7 executa `scripts/make-icon.swift` e `iconutil`, gravando novamente `Resources/Oracle.icns` a cada build. O mesmo script escreve `CFBundleIconFile` com valor `Oracle` no `Info.plist` do bundle.

**Trocar apenas o arquivo de Resources não é uma integração durável**, pois a próxima compilação o sobrescreve.

Depois da aprovação, a tarefa de integração deve:

1. Confirmar o checkout e copiar a pasta desta identidade aprovada para ele, sem substituir alterações das outras frentes.
2. Selecionar o asset clássico aprovado, por exemplo `recommended/legacy/Oracle-dark.icns`, ou adotar o pipeline moderno depois de validado.
3. Ajustar a etapa geradora do build para usar o asset aprovado de modo reproduzível. Preservar um único nome de destino `Resources/Oracle.icns` enquanto `CFBundleIconFile` continuar `Oracle`. Evitar alterar nome de bundle, identificador, versão ou interface apenas para integrar a imagem.
4. Gerar um bundle de teste e conferir no Finder, Dock e busca do macOS em tamanho normal e reduzido. Observar caches de ícone; uma cópia em Resources não comprova que o sistema mostra o novo desenho.
5. Se o símbolo entrar em janela/toolbar, importar o SVG/PDF de marca, com a área livre especificada. Para um ícone de template, usar o símbolo monocromático com alpha; não usar a placa do ícone do aplicativo dentro da interface.

## Caminho moderno: Icon Composer

Há camadas preparadas, não um projeto `.icon` pronto. Para criar o projeto:

1. Criar documento para macOS, canvas 1024 × 1024.
2. Importar `icon-composer-layers/default/01-field.svg` e `02-sun.svg` na posição original de canvas. Configurar o fundo opaco em `#EEECE6`.
3. Anotar dark com fundo `#1E252A`, órbita branca e sol `#F4B860`; os SVG da pasta `dark` servem como referências equivalentes de geometria/cor. Mono usa as mesmas duas formas, sem informação dependente de matiz.
4. Começar com poucos efeitos. Conferir contraste, separação entre as formas e visibilidade do sol nos modos Default, Dark, Mono, clear light/dark e tinted light/dark, especialmente nas menores escalas.
5. Salvar/exportar o projeto `.icon` pela própria ferramenta e integrá-lo conforme a versão de Xcode escolhida. O build atual é um script Swift e não foi migrado nesta proposta; avaliar essa mudança como trabalho de integração separado.

Não importar `icon-dark.svg` completo como camada moderna: ele inclui a placa arredondada de apresentação. Não empilhar as três pastas default/dark/mono como seis camadas ao mesmo tempo: são referências alternativas da mesma dupla de formas.

## Verificação já concluída

- Quatro iconsets: dark, light, mono-dark e mono-light.
- Dez PNGs por iconset: 16, 32, 128, 256 e 512 pt em 1× e 2×.
- Cada ICNS contém oito recursos PNG sem perda e dois recursos ARGB premultiplicados para 16/32 px (`ic04`/`ic05`). `iconutil` reconverteu cada pacote. O alpha foi preservado exatamente; os pixels compostos sobre preto e branco coincidiram com os PNGs originais. A conversão ARGB pode diferir em até um nível no RGB reto, sem diferença visível nesses fundos.
- `NSImage`/AppKit abriu os quatro ICNS e os renderizou em 16, 32, 64, 128, 256 e 512 pt, em 1× e 2×: 48 amostras.
- Os 19 SVG recomendados foram parseados, sem texto ativo, raster, filtros ou recursos externos. As seis camadas têm canvas 1024 × 1024 e nenhuma máscara.

Recibos: `qa/verification.json` e `qa/native/render-receipt.json`. A prancha `boards/04-native-icns.png` mostra amostras reais do renderizador AppKit; não é uma captura de um ícone aplicado ao Dock. Nenhum lint, typecheck ou build do aplicativo foi necessário ou executado.

A codificação explícita de alpha foi motivada por uma diferença observada nos canais RGB das bordas semitransparentes ao usar a criação padrão por `iconutil` neste host. A correção final preserva a leitura sobre claro e escuro. A estrutura PNG/RLE foi consultada no código primário [Pillow / IcnsImagePlugin](https://github.com/python-pillow/Pillow/blob/main/src/PIL/IcnsImagePlugin.py); os tipos ARGB foram observados na saída do `iconutil` do próprio Mac. A aceitação e os pixels compostos foram verificados com as ferramentas nativas Apple.
