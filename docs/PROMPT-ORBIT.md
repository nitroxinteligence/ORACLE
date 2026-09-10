# Órbita de prompts

## Atmosfera discreta e enquadramento

Sete anéis decorativos se expandem a partir de fora da última órbita real, com traço de 0,6 px e opacidade inferior a 7,5%. O ciclo de 48 segundos desaparece antes de reiniciar. Os anéis não entram no catálogo, nas contagens, no cálculo de enquadramento ou nos alvos clicáveis. Somem nas cenas dedicadas de pasta/especialista. O relógio é o mesmo da animação orbital e respeita pausa, modal, janela oculta e redução de movimento.

Um campo de estrelas SVG fica atrás de todo o aplicativo, inclusive dos painéis flutuantes e da visualização em lista. Os pontos têm posição determinística, densidade limitada e tamanho em pixels de tela: não ampliam nem se deslocam quando a pessoa usa pan/zoom no gráfico. A antiga camada WebGL de estrelas restrita ao centro foi substituída, sem acrescentar outro renderizador ou timer.

A abertura, o reenquadramento e o retorno ao universo usam 118%; o zoom manual continua disponível e o indicador acompanha a escala real. Pessoal usa `#D4A1CC`, Profissional `#83B9D7` e Prompts `#CEC08B`, também nas pastas e notas descendentes.

Última verificação: 21 testes de geometria/dados/atmosfera e 25 verificações no AppKit/WKWebView passaram. As capturas nativas e o recibo dessa rodada ficam em `.work/atmosphere-review/`; os dados são de teste, não uma auditoria do vault pessoal. Não foi realizada nova medição de FPS.

Prompts ocupa anéis concêntricos imediatamente externos aos anéis Pessoal/Profissional. Usa os mesmos círculos preenchidos (raio 10 na raiz e 6,5 nos itens), traço e distância de 38 unidades entre anéis. A biblioteca existente permanece disponível no botão superior.

Cada área tem uma cor fixa, herdada por todas as suas pastas e notas: Pessoal `#D4A1CC`, Profissional `#83B9D7` e Prompts `#CEC08B`. As cenas internas mantêm a mesma cor da área.

O zoom padrão é 118% do enquadramento calculado. Abrir o aplicativo, reenquadrar, restaurar posições ou retornar ao universo recupera esse valor sem acumular ampliações. Os controles manuais continuam disponíveis e o indicador acompanha a escala real. Voltar entre pastas preserva o contexto anterior.

## Navegação

A fonte é `SISTEMA/prompts` no snapshot autorizado do Obsidian. Diretórios aparecem como pastas; somente arquivos Markdown contam como prompts. Cada caminho aparece uma vez. Não há classificação pessoal/profissional nem cópias semânticas dos prompts.

Clique numa pasta para explorar seus filhos. Clique num prompt para abrir a biblioteca existente com o documento selecionado. Breadcrumb, Voltar, teclado, cópia e rolagem usam os mecanismos existentes. A biblioteca continua consultando o snapshot atual; a representação no mapa acompanha a projeção temporal do próprio mapa.

## Densidade e movimento

O panorama desenha no máximo 50 elementos, incluindo a raiz. A contagem real e a existência de itens adicionais ficam no tooltip. As cenas de pasta paginam 50 filhos, mantendo todos acessíveis. Bibliotecas ausentes não geram pontos fictícios; pastas vazias continuam sendo pastas, nunca prompts inventados.

O movimento utiliza o agendador existente, sem outro timer. Hover/foco pausa o anel inteiro; redução de movimento, janela oculta, modal e pausa da atmosfera interrompem o movimento. Um anel cabe na folga existente entre conhecimento e especialistas. Se o volume exigir outro anel, a separação mínima se amplia apenas o necessário; os shaders, o Sol e a hierarquia dos especialistas não mudam.

## Verificação

`node --test scripts/test-prompts-orbit.mjs scripts/test-knowledge.mjs scripts/test-orbit-motion.mjs`: 16 verificações, incluindo ausência, deduplicação, crescimento, 153 documentos paginados, hierarquia real, preservação do layout e espaçamento orbital.

`scripts/test-prompts-orbit-native.py`: 14 verificações no AppKit/WKWebView, com catálogo público e arquivos de prompts sintéticos no vault descartável. Cobriu entrada por teclado, tooltip, pastas, abertura do Markdown na biblioteca, retorno, pausa e janela 840×620. As notas sintéticas foram removidas e não integram o aplicativo distribuído.

Imagens e recibo local: `.work/prompt-orbit-review/mailbox/` e `.work/prompt-orbit-review/native-checks.json`. Esses registros verificam o ambiente de teste, não alegam auditoria de todas as notas pessoais do usuário ou uma nova medição de FPS.
