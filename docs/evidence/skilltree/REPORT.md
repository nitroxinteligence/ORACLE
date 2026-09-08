# Oracle — entrega do redesign do mapa

Implementado no branch `codex/skilltree-galaxy`, sobre `a2c730f`.

- `bf75b80`: hierarquia, contextos, câmera, formação e testes do mapa.
- `9488aed`: logos originais, resolução de metadata e rasterização segura.

O mapa agora separa universo, especialista, grupo e skill. As conexões representam pertencimento; não existem dependências inventadas entre skills. Grupos vêm de pastas ou de faixas alfabéticas explícitas. O catálogo público de 940 skills, incluindo Cybersecurity com 818, foi usado no app nativo. Foram preservados os mínimos 10/50, corte de zoom em 50%, edição direta de Markdown, onboarding/licença/CLI/GBrain/Codex e identidade V3. Dashboards não foram implementados.

## Validação

- 44 verificações nativas e 60 cenários de zoom em 840×620, 1200×760 e 1440×900.
- 14 verificações nativas adicionais de clique, aparência, SVG fallback e recuperação WebGL.
- 16 testes de geometria/movimento; 41 de logos e isolamento SVG.
- 28 verificações de onboarding, 16 de ciclo de conexão e 20 do editor.
- Histórico de câmera validado também depois de pan e zoom, com abertura/fechamento do inspetor.
- Arquivos Markdown da fixture permanecem com os mesmos hashes após navegação e timelapse.

As capturas são do WKWebView nativo com catálogo público isolado, não do vault pessoal. [Galeria e estados verificados](gallery.json), [matriz nativa](native-tests.json), [cliques e recuperação](native-input-tests.json).

## Imagens

[Universo](global-wide.png) · [Marketing, 50 skills](marketing-50.png) · [Cybersecurity, catálogo de 818](security-818.png) · [Grupo de 50](group-50.png) · [Skill e inspetor](skill-inspector.png) · [Janela pequena](marketing-small.png) · [Logos no Observatório](logos-observatory-top.png).

O registro anterior está em [mapa da base anterior](../organic-ui/final-map.png).

## Desempenho observado

Apple M2, macOS 26.6.2. No catálogo público completo, a seleção automatizada mediu **27.73 FPS**, intervalo de renderização p95 de **56 ms**, submissão CPU p95 de **1 ms** e atualização da cena p95 de **2 ms**. O host de teste teve CPU mediana de 3.2% e RSS máximo de 47.44 MB. Isso não inclui processos WebKit compartilhados nem mede tempo de GPU.

Na fixture sintética com as mesmas contagens, a expansão ficou em 29,18 FPS; modo econômico em 15,11 FPS; minimizado e com movimento reduzido, nenhum quadro novo foi desenhado no intervalo medido. A atmosfera usa uma cadência menor em repouso. **Não foram observados 60 FPS sustentados.**

[Antes](../../benchmarks/organic-skilltree-before.json) · [Depois, mesma fixture](../../benchmarks/organic-skilltree-after.json) · [Catálogo público e intervalos brutos](../../benchmarks/skilltree-public-expansion.json). As amostras são de uma máquina em uso, não um laboratório isolado. A entrada ficou temporariamente inerte durante os benchmarks, com restauração em `finally`, para evitar interferência e timers abandonados. Pinch físico não foi medido; a ancoragem da câmera foi testada no WKWebView.

## Logos

Sete dos dez serviços conectados retornaram arte própria: Canva, Figma, Firecrawl, GitHub, OpenAI Platform, Plugin Management e Sites. Codex Document Control, Hotline e Safety Settings não forneceram arte própria e mantêm fallback com nome completo. Nenhum recebe o logo de uma dependência. [Inventário e origem das marcas](plugins.json).

## Pacotes locais

- App: `/Users/mateusmpz/.codex/worktrees/a808/ORACLE/dist/Oracle.app`
- DMG: `/Users/mateusmpz/.codex/worktrees/a808/ORACLE/dist/Oracle-0.3.0-arm64.dmg`
- SHA-256 do DMG: `9b7766cf52d218f7487e53cd51f7546effa2aeb1db6a67b0c2f1116ba57f9446`

Assinatura local ad hoc verificada; DMG validado e montado somente para leitura. A montagem anterior conferiu 4933 arquivos; o ajuste posterior da barra lateral foi reempacotado com assinatura e recursos atualizados. O executável distribuído não contém a caixa de testes nativa. [Recibo completo](package.json).

O app pessoal em `/Applications` não foi substituído. Não houve push, publicação de release ou instalação de fontes externas. A versão de pacote permanece 0.3.0 para a tarefa principal decidir a versão consolidada.

## Ajuste final da barra lateral

`a0a6617`: título Meu universo removido; busca à esquerda e botão de reler pasta à direita, alinhados na mesma linha. App e DMG locais atualizados.

`355fe02`: controles superiores reduzidos para 32 px, ícones de 16 px e Atualizações somente com ícone. App/DMG atualizados. As capturas acima precedem os ajustes finais dos controles.

`69c077c`: rótulo lateral Conversas ChatGPT, conforme solicitado.

`ce5be3f`: breadcrumb e retorno contextual nos plugins; detalhe retorna à lista e a lista retorna à origem.

`d6db795`: badges de status translúcidos compartilhados por plugins (lista e detalhe), conexões, atualizações e configuração. Verde: conectado/ativo/concluído; vermelho: desconectado/ausente/erro; cinza: inativo; laranja: pausado/interrompido; amarelo: pendente/autorização/validação; azul: instalado/disponível/informação. Mapeamento de 23 estados verificado, incluindo distinção instalado/conectado e escape de rótulos.

`a7efb59`: busca renomeada para Encontre uma skill; contorno interno removido do campo composto, com uma única borda externa. Foco de campos, editor e configuração padronizado sem contornos extras; botões/links mantêm indicação fina de teclado.

`b28da20` + `5bcff2e`: foco visual separado por mouse/teclado. Cliques e fechamento de painéis não deixam contorno preso; teclado usa indicação interna fina. Aplicado a controles, links, configuração e indicadores de foco do mapa, sem remover seleção real.

`02b5fad`: canvas/SVG ocupam a janela inteira; controles flutuam sobre o gráfico, sem faixas de recorte no topo/base. Área de enquadramento separada da área de desenho, respeitando painéis. WKWebView confirmou canvas 1200×760 em (0,0), área útil reduzida pelo inspetor sem reduzir canvas e nó focal centralizado nessa área. [Pan no topo](full-canvas-top.png) · [Pan na base](full-canvas-bottom.png). Medições de FPS anteriores precedem a ampliação do canvas.

`ec95d0e`: laterais sem fundo, borda, sombra ou blur; cards e controles com superfície branca translúcida leve. Verificação visual em WKWebView com ambas as laterais abertas; estilos computados confirmam fundo transparente e borda zero nas duas laterais. App local e DMG atualizados, assinatura local verificada pelo empacotamento. [Resultado](floating-inspector.png).

`1f1baea` / `a3a89d4`: áreas dedicadas por especialista, transição lateral de saída/entrada e expansão radial; SOL e demais especialistas reaparecem ao voltar ao universo. Gráfico limitado a 50 arquivos, mantendo catálogo integral na navegação e incluindo seleções fora da amostra sem exceder o teto. Grupos alfabéticos equivalentes de empacotamento são unificados; setores separados impedem que grupos desiguais cruzem o centro. Em Ads, 34 arquivos partem diretamente do especialista. Validação: 12 checks de geometria/catálogo, 7 checks nativos de navegação/limite e inspeção visual com janela visível. [Checks](dedicated-scenes.json) · [Ads corrigido](dedicated-ads-fixed.png) · [Cybersecurity limitado](dedicated-cybersecurity.png). Sem nova alegação de FPS.

`8a1568e`: breadcrumb e Voltar compartilhados em todos os modais HTML, etapas de onboarding e trilha nos dois alertas nativos. Retorno conserva consulta, DOM e contexto do editor, com proteção/recuperação de rascunho. [Mapa completo](../../MODAL-NAVIGATION.md) · [Checks](modal-breadcrumb-checks.json) · [Plugins](modal-breadcrumb-plugins.png). Compilação Swift concluída, app local e DMG atualizados.

`e0e27fb`: órbita externa de conhecimento Pessoal/Profissional baseada em arquivos reais; pastas abrem cenas dedicadas, notas abrem o leitor e páginas têm no máximo 50 itens. Ícone branco padrão para plugins sem arte e filtro de três utilitários internos apenas na órbita. Novos planos de onboarding criam/reaproveitam as duas áreas preservando arquivos e confirmação do plano. Skills distribuídas atualizadas. [Detalhes](../../KNOWLEDGE-ORBITS.md) · [Verificação nativa](knowledge-native.json). 18 verificações de geometria, 23 contratos Core, 28 de onboarding, 16 de ciclo de execução e 15 verificações nativas; app e DMG atualizados. Prévia usa notas sintéticas, não incluídas no pacote.

`f2df723`: Meu Universo e Observatório com fundo translúcido, blur e borda suave; plugins em disclosure nativo recolhido por padrão e a cada reabertura do Observatório. Conferidos no WKWebView o estado inicial, expansão, atualização da lista sem fechar a seção manualmente aberta e reabertura recolhida. Preferência de redução de transparência preservada. [Prévia](translucent-sidebars-collapsed-plugins.png). App e DMG atualizados.

`b94b360`: plugins e círculos de conhecimento em movimento orbital, com logos na vertical e separação geométrica. Pastas/notas também se movem nas cenas dedicadas. Hover/foco pausa o anel inteiro; pausa da atmosfera, redução de movimento e janela oculta congelam as fases. Usa o agendador existente. Dois testes de espaçamento e [nove verificações nativas](orbit-motion-native.json) passaram. App e DMG atualizados.

`08f07dc`: fundo sólido do aplicativo em grafite `#1c1e23`, usando o tom sólido das laterais. WKWebView confirmou `rgb(28, 30, 35)` e ausência de imagem de fundo no body; inspeção visual na janela visível. [Prévia](solid-app-background.png). App e DMG atualizados.
