# Oracle — auditoria e proposta visual flat 2D

> **Direção visual substituída:** Mateus rejeitou a simplificação flat/laranja. O inventário e a análise do código continuam como evidência; a composição, paleta e plano de 21 pranchas abaixo são históricos. A direção vigente está em [Universo orbital V2](../2026-09-12-orbital-universe-v2/DIRECAO.md), com uma imagem principal para avaliação antes de continuar.

12 de setembro de 2026 · composição para revisão · aplicativo macOS

## Direção consolidada

O Oracle deve parecer um ambiente de conhecimento que pode ser explorado e utilizado, com leitura confortável e operações claras. A nova composição mantém a marca do planeta com anel, a navegação departamentos → especialistas → skills e o acesso às pastas originais. O fundo passa a ser grafite neutro, com superfícies planas, tipografia de sistema e laranja em seleção, foco, ações principais e atualização. O laranja deixa de ocupar grandes áreas.

A prioridade é tornar o conteúdo mais legível, reduzir a navegação por modais e distinguir estado visual de estado operacional. O Atlas já usa SVG 2D; não é necessário trocar o motor para obter essa direção. O trabalho necessário está na composição, no nível de detalhe, nos rótulos e na relação entre mapa e painéis.

Esta proposta segue a correção final do pedido: minimalismo e laranja em detalhes. Não implementa o redesign no aplicativo. Os dados e contagens das imagens propostas são demonstrativos.

## Escopo e evidência

Foram recebidas **23 imagens**, embora o texto do pedido mencione 20. Todas foram inspecionadas e registradas por caminho, dimensões e SHA-256 em `reference-manifest.json`.

O inventário reúne **64 superfícies lógicas e famílias de estado**, incluindo rotas de navegação, painéis, modais, onboarding, interfaces nativas e uma visualização latente no código. Esse número não representa 64 páginas independentes nem todos os produtos cartesianos possíveis entre estados. Cada família lista suas variantes e sua origem no código. A matriz completa está em `screen-inventory.json` e `screen-inventory.csv`.

Foram examinados os recursos carregados por `Resources/web/index.html`, os renderizadores e coordenadores de interface, os fluxos de edição, bibliotecas, onboarding, status, manutenção, backup, atualizações e os pontos de entrada nativos. A auditoria visual usou uma cópia isolada do preview com dados sintéticos, capturada em 1440×900 e em 840×620. Capturas, incluindo duas em tamanho menor durante a preparação, estão na pasta `evidence`.

**Limite da validação:** `/Applications/Oracle.app` abriu uma janela preta nesta sessão. Não foi possível percorrer a jornada nativa instalada. O manifesto instalado declara versão 0.3.0, build `20260911T214047Z-b648e1840916-6827ea4d`, commit `b648e18409161e9dff6a994d3d16424f0e226c1c`, canal developer. Os hashes de index.html, app.js, onboarding.js, atlas.js, style.css e audit.css conferiram com o checkout. Isso vincula os recursos, mas não prova a saúde da ponte nativa. Causa da janela preta não diagnosticada nesta auditoria visual.

Legenda da matriz: **V** = observado renderizado em preview sintético; **C** = identificado por código; **V+C** = composição observada e variantes adicionais identificadas por código. Recursos de autenticação, instalação, backup, atualizações e permissões não foram executados em contas ou dados pessoais. Nenhum recibo sintético é apresentado como operação real concluída.

## Arquitetura e caminhos reais de navegação

Não existe um roteador de URLs com páginas como `/settings` ou `/memory`. Há uma janela AppKit contendo WKWebView, um documento HTML e transições de estado em JavaScript. Os IDs S01–S64 são identificadores deste relatório, não novas rotas implementadas.

- Shell → Atlas → departamento → especialista → grupo/pasta → skill → leitor → editor → diff ou conflito.
- Shell → árvore → pasta → busca no caminho → nota original.
- Shell → prompts ou tutoriais → pasta → documento → prévia → leitor → editor.
- Shell → busca global → resultado → leitor.
- Ajustes → memória → fonte → resultado → conteúdo derivado e origem.
- Shell → conversas importadas → importar ou ler conversa; Shell → instruções → autorizar projeto ou ler documento.
- Shell/Ajustes → plugins → detalhe; Ajustes → Codex → login externo opcional → modelos disponíveis.
- Ajustes → departamentos, contexto, manutenção, backup, bloqueio, desconexão, atualizações e avançado.
- Configuração → acesso → Obsidian → identidade → objetivos → preferências → revisão → instalação → confirmação de identidade → retomada local.
- Uma solicitação de permissão ou pergunta pode interromper o fluxo operacional. A instalação pode ser pausada, cancelada, interrompida ou falhar e depois ser retomada.

O `renderResults` para lista/pastas existe em app.js, mas o HTML atual não oferece controles `data-view`. É uma superfície latente, não uma rota normal observada. A proposta de explorador deve criar uma entrada deliberada se for implementada, com paginação real em lugar do limite silencioso de 300.

## Leitura das 23 referências

| # | Referência | O que contribui | Decisão para o Oracle | Aplicação |
|---|---|---|---|---|
| 1 | Solar system | A estrutura central com ramificações torna a ideia de universo reconhecível. | Usar proximidade e hierarquia; retirar nebulosas, estrelas, esferas e miniestatísticas. | Atlas geral |
| 2 | Achievement route | O caminho pode comunicar ordem e progresso. | Aplicar somente a etapas e recibos reais; retirar neon, medalhas e gamificação. | Instalação e retomada |
| 3 | Rede circular plana | É a referência mais próxima da direção 2D; tamanhos distinguem importância. | Preservar nós planos e conectores finos; reduzir cruzamentos e mostrar apenas o contexto necessário. | Atlas e foco |
| 4 | Data asset overview | Densidade e convergência representam um grande conjunto de fontes. | Usar agrupamento progressivo; não reproduzir milhares de partículas nem gráficos sem função. | Agrupamento de skills |
| 5 | AI search citations | Rótulos, tipos de relação e legenda deixam a rede explicável. | Usar legenda discreta e proveniência verificável; substituir brilhos por contorno de seleção. | Memória e origem |
| 6 | Brain / signals | A ordem fontes → processamento → resultado explica um fluxo. | Aplicar a recibos do índice; retirar cérebro 3D e indicadores fictícios de processamento. | Sincronização |
| 7 | Cortex XSIAM | Separa entradas, processamento e resolução, com estados específicos. | Aproveitar direção e agrupamento; não transformar Oracle em painel SOC nem adicionar KPIs. | Manutenção e histórico |
| 8 | Hub com ícones | Ícones simples e ramificações limitadas ajudam a reconhecer categorias. | Usar traço uniforme e poucos nós; eliminar volume, vidro e halo elétrico. | Departamentos |
| 9 | Ramificação de quatro cards | Boa separação espacial entre origem e destinos. | Usar curvatura suave para evitar cruzamentos; não transportar caixas translúcidas e marcadores decorativos. | Especialistas e grupos |
| 10 | Webflow University | Título, descrição e metadados permitem escolher um conteúdo. | Aplicar à lista/prévia de tutoriais; não criar plataforma de cursos, trilhas ou progresso inexistentes. | Biblioteca de tutoriais |
| 11 | AI powered workflow | Órbitas de espessura pequena e ícones organizam o conjunto. | Aproveitar distribuição; eliminar fundo roxo, esferas e texto de marketing. | Atlas geral |
| 12 | Loopverses | A marca central serve como âncora do universo. | Preservar o planeta com anel já existente no Oracle; nenhuma troca por infinito ou novo símbolo. | Marca e centro do Atlas |
| 13 | Orbit shift | A direção do fluxo é imediatamente reconhecível. | Aproveitar apenas orientação; não usar tubos grossos, volume ou funcionalidades financeiras. | Proveniência e processamento |
| 14 | Five tools. One system. | A integração é explicada com ícones conectados. | Aplicar à relação com plugins existentes; não adicionar CRM, contatos ou campanhas. | Conexões |
| 15 | Review card com recortes | Borda discreta dá identidade à superfície. | Usar detalhe curto de borda; retirar recortes orgânicos, depoimentos, estrelas, QR e fundo luminoso. | Avisos pontuais |
| 16 | Choose offer type | Uma pergunta por vez, alternativas claras e rodapé estável. | Referência principal para onboarding; reduzir sombras, texturas e espaço ornamental. | Identidade, objetivos e preferências |
| 17 | Experience rating | Hierarquia direta entre pergunta, escolhas e fechamento. | Aproveitar a estrutura da pergunta; não acrescentar avaliação por estrelas ou pesquisa de satisfação. | Solicitações e confirmação |
| 18 | Second brain | Pastas, busca e organização são funções identificáveis. | Usar esses conceitos em navegação real; eliminar cérebro 3D, holograma e promessas vagas. | Pastas, busca e memória |
| 19 | Data updated / gráfico de conversão | Atualização e borda luminosa atraem o olhar. | Usar apenas um segmento de gradiente laranja em atualização disponível; não importar gráfico ou 400% fictícios. | Atualizações |
| 20 | Settings list | Linhas, ícones e agrupamentos produzem navegação previsível. | Referência principal dos Ajustes; trocar vidro e halo por divisores e hover plano. | Ajustes |
| 21 | Voice interface practice | Controle primário isolado em um componente compacto. | Apenas hierarquia e proporção: a imagem tem 235×294 e não suporta inferência tipográfica precisa; não adicionar voz. | Cartão de continuidade |
| 22 | Mobile AI voice | Compositor inferior e área de conteúdo simples. | Aproveitar só a economia visual; Oracle auditado é desktop e não possui esse fluxo de voz/chat. | Restrições de escopo |
| 23 | Sandra AI landing | Gradiente localizado pode marcar uma área de atenção. | Reduzir a uma borda ou faixa curta; descartar landing page, esfera de partículas e formulário comercial. | Acentos de atualização |

A síntese combina sobretudo a rede plana da referência 3, a legibilidade semântica da 5, a hierarquia de conteúdo da 10 e as estruturas simples das 16 e 20. As demais ajudam a definir limites: preservar relações e identidade, sem importar efeitos de landing pages, hologramas, dashboards ou funcionalidades que o Oracle não possui.

## Diagnóstico do aplicativo

| Prioridade | Achado e evidência | Efeito | Proposta |
|---|---|---|---|
| P1 | `app.js:679`: “Verificar” chama `check-apply`, assim como “Instalar atualização”. | O rótulo não comunica o possível efeito de instalação. | Separar consulta de instalação na integração; até isso existir, não usar um rótulo que prometa somente verificar. |
| P1 visual | Biblioteca → leitor → editor → diff acumula até seis posições no breadcrumb do modal. Capturas 05–10. | O usuário perde a relação com a área de trabalho e atravessa várias molduras. | Bibliotecas e leitura passam a áreas principais; edição é um modo da mesma nota. Modal apenas para decisões pontuais. |
| P1 visual | No Atlas geral, pequenos nós de especialistas não exibem todos os rótulos; estrelas e órbitas competem com os vínculos úteis. Capturas 01 e 17. | O mapa comunica ambiente antes de comunicar conteúdo. | Rótulos estáveis, 2 níveis expostos por padrão, expansão progressiva e conectores neutros. |
| P1 visual | Em 840×620, o inspetor aberto ocupa parte importante da região do grafo e há corte de contexto. Captura 20. | A janela mínima torna a navegação espacial difícil. | Recalcular área útil e alternar explorador/inspetor. Não sobrepor painel ao nó selecionado. |
| P2 | Observatório junta contexto, conexões e ajustes gráficos. Capturas 17–19. | O usuário precisa filtrar controles globais ao consultar um item. | Inspetor contém só o item; conexões ficam em seu destino e visualização fica no menu do mapa/Ajustes. |
| P2 | A árvore e metadados usam tipografia pequena; várias ações globais são apenas ícones. `style.css`, index e capturas. | Descoberta depende de hover e leitura de detalhes pequenos. | Texto em destinos principais, ícones com nome acessível e alvos de interação maiores. |
| P2 | O zoom é apresentado como 118%, mas não oferece o comportamento usual de escala ajustável nos controles visíveis. | A porcentagem parece uma ação indisponível. | Mostrar “Enquadrar” e “Voltar”; só apresentar percentual quando a implementação permitir controle coerente. |
| P2 | Ajustes são uma longa lista em modal rolável. | Configuração local, conexão e rotinas ficam no mesmo fluxo vertical. | Janela/área de Ajustes com navegação lateral curta e conteúdo por categoria. |
| P2 | Origem e conexões de uma nota derivada ficam em detalhes com JSON. | É difícil entender a origem sem abrir material técnico. | Expor fonte, atualidade e “Abrir original”; hashes e JSON ficam em detalhes avançados. |
| P2 | Atualizações têm muitos estados válidos e recuperação por fonte. | Uma única cor ou mensagem global pode ocultar estado parcial. | Uma linha por fonte, estado textual e ação específica. Laranja marca disponibilidade/atenção; sucesso permanece semanticamente distinto. |
| P2 | Backup, captura, rotina e síntese remota têm consentimentos separados e explicações extensas. | Simplificação visual pode apagar diferenças importantes. | Manter controles separados; introduzir descrição curta e detalhes expansíveis sem esconder o efeito essencial. |
| P2 | Formação visual, histórico de eventos e recibos operacionais convivem. | Uma animação pode ser interpretada como trabalho real concluído. | Nomear “Formação do mapa” e “Histórico registrado”; progresso operacional apenas por evidências retornadas. |
| P3 | Contornos, transparências, raios 20/24 e sombras grandes aparecem em superfícies encaixadas. | O excesso de molduras reduz contraste de hierarquia. | Uma superfície principal, divisores internos e raios 8/12. Sombra pequena reservada a overlay. |

A abertura preta da janela nativa é um impedimento de validação, não um achado de causa comprovada no design. A prévia também não executa salvar/descartar via ponte nativa: o erro observado nesse ponto pertence ao ambiente de demonstração. A apresentação Markdown de fallback na prévia não é suficiente para afirmar defeito do leitor em produção.

## Nova composição

### Shell

Barra superior de 48–52 px com a marca existente, título/caminho da área e busca. Navegação lateral de aproximadamente 224 px integrada à janela, sem um card flutuante com segunda borda. Conteúdo ocupa a área restante. Rodapé da navegação contém Ajustes e um estado resumido quando houver algo que demande atenção.

Destinos principais: Atlas, Pastas, Prompts, Tutoriais, Memória, Conversas, Projetos e Ferramentas. “Pastas” e Memória como destino direto são reorganizações propostas de capacidades já existentes; precisam de ligação explícita quando implementadas. Evitar adicionar dashboards, cursos, chat ou voz.

No Atlas, o inspetor aparece à direita somente quando útil, com 280–304 px. Nas bibliotecas, a mesma área de trabalho comporta lista e leitor. A árvore da biblioteca usa a navegação contextual, evitando duas barras laterais completas simultâneas.

### Atlas 2D

1. Núcleo Oracle como símbolo plano, pequeno, sem brilho, esfera ou círculo de expansão decorativo.
2. Departamentos como nós de 40–48 px com rótulo persistente; especialistas como nós de 28–36 px; skills como pontos de 8–12 px com área clicável ampliada e rótulo ao entrar no contexto.
3. Cor não codifica todos os departamentos. Nome, ícone, forma/tamanho e posição comunicam hierarquia. Apenas nó, ramo e item de navegação ativos recebem laranja.
4. Relações representam pertencimento ou vínculo documentado. Não inferir conexão semântica entre duas skills porque estão próximas visualmente.
5. No overview, mostrar departamentos e especialistas, com contagens agregadas. Ao focar, mostrar o caminho e o grupo selecionado; demais elementos ficam secundários ou recolhidos.
6. Conectores de 1 px neutros; seleção de 1,5–2 px. Pequenos grupos com distância suficiente para rótulos; fallback em lista quando há densidade excessiva.
7. Pan e enquadramento consideram a área realmente livre entre painéis. “Voltar” retorna ao contexto anterior e devolve o foco. Reorganizar visualmente mantém os arquivos no lugar.
8. Retirar animação ambiente como padrão da nova composição. Transições de 150–220 ms apenas para indicar mudança de contexto, respeitando preferências de movimento reduzido.

### Pastas, bibliotecas e notas

A estrutura física permanece no Obsidian. A árvore mostra caminhos existentes; Pessoal/Profissional ausentes recebem explicação e acesso à escolha de pasta, sem fingir que foram criados. Agrupamentos Conhecimento (AREAS/WIKI/FONTES) e Departamentos são apresentados como organização da navegação. Cada item mostra título e caminho suficiente para distinguir homônimos.

Prompts e Tutoriais compartilham layout: árvore contextual de 224 px, lista de 300–340 px e leitor flexível. Busca local filtra o escopo atual, com contador e paginação. Raiz ausente, múltiplas raízes, pasta vazia, busca vazia e leitura parcial são mensagens diferentes. A ação principal segue o estado: selecionar fonte, limpar filtro, tentar leitura novamente ou abrir original.

Leitura utiliza coluna de 68–80 caracteres, tamanho 15–16 px e entrelinha 1,55–1,65. Edição mantém nome, caminho e posição de navegação. Salvar informa que altera o original. Estado de rascunho é persistente enquanto relevante. O diff usa sinais +/−, títulos e cores sem depender só de cor; conflito mostra duas versões e conserva o texto do usuário.

### Ajustes e operações

Ajustes passam a categorias: Geral; Departamentos; Conexões; Sincronização; Backup; Atualizações; Avançado. Contexto/identidade continuam vinculados ao fluxo oficial de revisão. Bloqueio e acesso a pastas ficam em Geral/Privacidade.

Sincronização mostra o último resultado completo, fases pendentes e a diferença entre índice local e processamento remoto. Manutenção, captura e síntese têm controles próprios. Preparar pedido de agendamento termina em “Pedido preparado; registro pendente”, nunca “Agendado”.

Backup informa de forma visível “Banco local; não inclui notas e anexos”, além do destino e resultado. Integridade e restauração de teste são linhas distintas. “Testar restauração” abre confirmação com a informação de que usa um estado novo. Não chamar esse backup de criptografado ou upload na nuvem: o fluxo auditado não oferece isso.

Atualizações usam lista de fontes. Estado disponível pode receber borda curta com gradiente âmbar → laranja. Progresso indeterminado é usado quando não houver total verificável. Offline e erro não equivalem a “atualizado”. Recuperação e personalizações preservadas permanecem visíveis.

### Onboarding

Uma pergunta ou grupo coerente por tela. Navegação textual entre Acesso, Obsidian, Identidade, Objetivos, Preferências e Revisão. Esse indicador representa etapas do formulário, não uma porcentagem fictícia de instalação.

O readback permanece um passo próprio e sua confirmação não retoma implicitamente a instalação. Depois de confirmar, a ação de retomada é explícita. A conclusão existente fecha automaticamente a configuração; a proposta mostra o resultado no shell por um recibo discreto, sem inventar uma nova etapa obrigatória. Conexão Codex e modelo permanecem opcionais para o uso local.

## Sistema visual proposto

| Token | Valor | Uso |
|---|---|---|
| canvas | #141517 | Fundo geral |
| surface | #1B1D20 | Navegação e áreas de conteúdo |
| raised | #22252A | Menus e overlays |
| border-subtle | #34383E | Divisores sem função interativa |
| control-border | #666D78 | Limite de campos e controles quando necessário |
| text-primary | #F2F2F3 | Títulos e corpo |
| text-secondary | #A5A9B0 | Metadados e descrições |
| accent | #F29A59 | Seleção, ação principal, foco |
| accent-hover | #FDB477 | Hover/foco |
| accent-ink | #171717 | Texto em botão laranja |
| success | #86B99A | Verificado, com ícone e texto |
| warning | #D8B76D | Pendente/atenção, com ícone e texto |
| danger | #E59595 | Erro/remoção, com ícone e texto |

Laranja ocupa aproximadamente 5–8% da superfície como objetivo de composição, não como uma regra matemática de renderização. Gradientes ficam restritos a pequenos sinais de atualização, nunca ao fundo inteiro do app. O sucesso não fica laranja por obrigação de marca.

Fonte de interface: sistema macOS/SF, com fallback `-apple-system, BlinkMacSystemFont, sans-serif`. A marca mantém Michroma e o símbolo existente. Mono somente para código, caminhos extensos e comparação. Escala: título 24/30, seção 18/24, corpo 15/24, controle 14/20, metadado 12/18. Aumentar densidade reduz espaçamento antes de reduzir o texto.

Espaçamento 4/8/12/16/24/32/48; linhas de navegação 36–40 px; botões 36–40 px; ícones 18–20 px com alvo de 32–40 px. Raio 8 para controles, 12 para modal, 4 para seleção em lista. Tabelas/listas usam divisores; evitar card dentro de card.

Os contrastes nominais foram calculados no arquivo `contrast-check.json`. A implementação ainda precisa medir composições reais, texto sobre transparência, estados disabled, foco e os limites de controles. Um arquivo de tokens não certifica acessibilidade.

## Componentes e estados a preservar

| Família | Variantes necessárias | Regra |
|---|---|---|
| Navegação | normal, hover, ativa, foco, recolhida, item longo | Localização por texto e caminho; seleção não depende apenas de cor. |
| Árvore | expandida, fechada, folha, vazia, grupo parcial, mais itens | Setas de teclado, níveis reconhecíveis e acesso ao conjunto completo. |
| Botão | primário, secundário, discreto, destrutivo, disabled, busy | Uma ação principal por contexto; verbo descreve efeito real. |
| Campo | vazio, preenchido, foco, inválido, read-only, sigiloso | Label sempre presente; erro associado ao campo; não guardar segredos em rascunho. |
| Busca | inicial, filtrada, vazia, carregando, erro, paginação | Anunciar número de resultados e preservar escopo. |
| Badge | verificado, instalado, conectado, não verificado, pendente, externo, erro | Texto com evidência e data quando disponível; sem promoção indevida de estado. |
| Modal | decisão curta, permissão, conflito, restauração | Foco preso, Escape quando aplicável, origem restaurada e título acessível. |
| Toast / alerta | sucesso local, erro recuperável, aviso persistente | Mensagem acionável; alerta persistente quando depende de decisão. |
| Progresso | indeterminado, contagem real, pausado, parcial, falhou, concluído | Não usar animação como recibo. |
| Leitor | parágrafos, títulos, listas, citação, tabela, código, links e imagens | Coluna legível; caminhos e hashes em detalhes. |
| Editor | limpo, alterado, rascunho, salvando, erro, conflito | Salvar conserva alterações feitas durante operação assíncrona. |
| Overlay / tooltip | hover, foco, fechamento e reposicionamento | Não ocultar ação crítica atrás de tooltip; contexto disponível por teclado. |

## Janela compacta e interfaces do macOS

O aplicativo declara tamanho inicial 1440×900 e mínimo 840×620. A proposta é desktop. Na largura mínima, só um painel contextual fica aberto; a lista pode alternar com a leitura, preservando seleção e retorno. Não comprimir três colunas e um mapa simultaneamente. Footer de ações continua visível e o conteúdo rola dentro da área útil.

NSOpenPanel, NSSavePanel, autenticação Touch ID/senha e menus seguem o macOS. O redesign deve alinhar títulos e explicações de entrada, não redesenhar o desafio de segurança com campos próprios. Seleção, cancelamento e falha devem devolver o usuário ao contexto anterior. O modal Sobre mostra versão/build de verdade. Exportação PNG não prova sincronização ou publicação.

## Pesquisa e aplicação das skills

- **Richard Design / revenue-centric-design**, fonte canônica: `/Users/mateusmpz/Documents/Obsidian Vault/OS/SISTEMA/skills/richard-design/SKILL.md`, com referências de estratégia e onboarding. Aplicação: hierarquia de atenção, núcleo do produto e exposição progressiva de opções avançadas. Não foram adotadas estatísticas sem fonte nem progresso artificial.
- **Impeccable**, `/Users/mateusmpz/.agents/skills/impeccable/SKILL.md` e coleção equivalente no Obsidian OS. Aplicação: contexto do produto, consistência, contraste, menos molduras e feedback acessível. `PRODUCT.md` registra o contexto usado; os tokens deste relatório são proposta, não aprovação prévia.
- **Frontend Design**, `/Users/mateusmpz/.agents/skills/frontend-design/SKILL.md`, e **redesign-existing-projects**, `/Users/mateusmpz/Documents/Obsidian Vault/OS/SISTEMA/skills/frontend/skills/redesign-skill/SKILL.md`. Aplicação: composição específica para este produto e preservação de recursos existentes. A fonte de sistema é uma escolha deliberada para macOS.
- **Matt Pocock**, `/Users/mateusmpz/.agents/skills/ask-matt/SKILL.md` e sua skill `design-an-interface`: o material consultado trata interfaces de software/APIs. Foi usado para delimitar a aplicação; não é fonte de uma estética visual nem justificativa para instalar pacotes ou mudar a arquitetura.

A documentação do [Impeccable](https://impeccable.style/designing/) e seu guia de [layout](https://impeccable.style/docs/layout/) reforçam a escolha de composição orientada ao uso. As [diretrizes da Apple para macOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-macos/) fundamentam a preservação de navegação, janelas e controles do sistema.

Os critérios de [contraste mínimo WCAG](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [tamanho mínimo de alvo](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) e o padrão de [diálogo modal WAI-ARIA](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) servem de referência para contraste, foco e operação por teclado. Usar 32–40 px como alvo de projeto dá margem ao mínimo WCAG de 24×24 CSS px sujeito às exceções do critério; não confundir meta de projeto com certificação.

A OpenAI publicou o anúncio de [ChatGPT Images 2.5](https://openai.com/index/introducing-chatgpt-images-2-5/). A geração desta proposta usa a ferramenta integrada de imagens disponível na sessão; a ferramenta não expõe seletor nem confirmação de versão do modelo. Portanto, não é possível atestar por essa interface que cada arquivo foi produzido especificamente na versão 2.5. Nenhuma API paga externa foi utilizada.

## Critérios de aceitação para uma futura implementação

1. Todo destino do inventário tem entrada e retorno identificáveis, inclusive estados vazios e erros. Nenhuma função desaparece por simplificação visual.
2. Atlas geral e contexto com muitos nós permanecem legíveis em 1440×900 e 840×620; rótulos selecionados não ficam sob o inspetor.
3. Tab, Shift+Tab, setas, Enter, Espaço e Escape funcionam conforme cada componente; o fechamento devolve o foco.
4. Atualizações distinguem verificar, instalar e recuperar; estado offline/erro nunca é apresentado como versão atual.
5. Leitura mostra origem; salvar altera o original e preserva rascunhos/conflitos. Nenhuma operação visual move arquivos.
6. Instalação e índice só concluem com recibos completos. Readback, retomada, confiança de hooks e conexão externa permanecem verificações separadas.
7. Consentimentos de manutenção, captura, síntese e backup permanecem distintos e compreensíveis.
8. Não introduzir chat, voz, dashboards de receita, ratings, cursos ou outras funções extraídas das imagens de referência.
9. Validar no WKWebView instalado após resolver a abertura preta. Preview, screenshot e mockup não substituem uma jornada nativa.

## Plano das imagens

A proposta será apresentada em 21 pranchas: Atlas; departamento/skill; pastas; bibliotecas; leitor/editor; revisão/conflito/rascunho; busca/memória; origem/conversas/projetos; ajustes/departamentos; manutenção/backup; atualizações; plugins/Codex; acesso/Obsidian; identidade/revisão; readback/instalação; solicitações; pausa/continuidade; confirmações; estados vazios/erros; janela compacta/nativo; histórico/avançado.

Pranchas com múltiplas telas agrupam apenas a mesma família ou etapas relacionadas. O inventário mapeia todas as 64 famílias para essas pranchas. Estados que reutilizam o mesmo componente também são especificados no relatório, sem exigir uma imagem repetida de cada combinação.

As imagens são estudos de composição. Textos pequenos e ícones gerados podem variar; tokens, contratos e textos críticos descritos neste documento prevalecem para implementação. O arquivo `generation-manifest.json` registrará prompts, arquivos e cobertura efetivamente produzida.

## Matriz completa

A fonte abreviada abaixo usa `Resources/web/` para arquivos web e `Sources/Oracle/` para Swift.

| ID | Superfície | Conteúdo e ações | Estados | Evidência | Fonte | Pranchas |
|---|---|---|---|---|---|---|
| S01 | Janela e navegação global | Logo, árvore, busca, Atlas, observatório, bibliotecas, ajustes, atualização e bloqueio | aberta; recolhida; foco de teclado; 1440x900; 840x620 | V | index.html:1; app.js:133 | 01, 03, 20 |
| S02 | Atlas geral | Departamentos, especialistas, Pessoal, Profissional, prompts, conectores | sem seleção; carregando; vazio; parcial; indisponível; fallback SVG | V+C | app.js:180; atlas.js; flat-universe.js | 01, 19 |
| S03 | Departamento | Código, Marketing, Conteúdo, Vendas, Outros; contagem e busca no escopo | selecionado; sem especialistas; especialistas agrupados | V | app.js:188; atlas.js | 02 |
| S04 | Especialista e grupos de skills | Coleção, grupos por pasta/letra, skills, voltar e enquadrar | selecionado; grupo expandido; mais itens; sem skills | V+C | app.js:188; app.js:530; atlas.js | 02 |
| S05 | Skill e inspetor | Ler procedimento, editar, enquadrar coleção | nó selecionado; nota ausente; leitura em curso | C | app.js:530 | 02, 05 |
| S06 | Árvore de pastas | Pessoal, Profissional, INBOX, PROJETOS, Conhecimento, SISTEMA e raízes reais | fechada; expandida; selecionada; vazia; Ver todos | V | app.js:161 | 03 |
| S07 | Pasta no grafo e busca por caminho | Subpastas/notas e caminho de origem | vazia; nota selecionada; pasta ainda não criada | V+C | app.js:177; flat-universe.js | 03 |
| S08 | Controles do Atlas | Enquadrar, voltar, densidade 0–6, reduzir movimento/transparência, economia, restaurar posições | mouse; teclado; pausa visual; preferência do sistema | V+C | index.html; app.js:464; app.js:718 | 01, 20 |
| S09 | Observatório geral/contextual | Contexto selecionado + conexões + controles gráficos | aberto; recolhido; geral; departamento; coleção; grupo; skill | V | app.js:188; app.js:700 | 01, 02 |
| S10 | Timelapse e formação | Reproduzir, pausar, cursor, velocidade, reiniciar e voltar ao vivo | ao vivo; formação; pausado; concluído; controles indisponíveis | V+C | app.js:410 | 21 |
| S11 | Replay de recibos | Histórico real projetado separadamente da formação visual | sem eventos; reproduzindo; pausado; fim; retorno ao vivo | C | app.js:428; app.js:452; replay.js | 21 |
| S12 | Busca global | Nome/caminho de notas e skills; escopo; 100 resultados por página | com resultados; nenhum resultado; teclado; página seguinte | V+C | app.js:574 | 07 |
| S13 | Biblioteca de prompts | Pastas reais, busca, lista e prévia; 80 documentos por página | inicial; selecionado; carregando; vazio; sem correspondência; erro; retry | V+C | app.js:325; library.js | 04, 19 |
| S14 | Biblioteca de tutoriais | Mesmo componente; fontes SISTEMA/Tutoriais e variantes reconhecidas | pastas; documento; vazio; fonte ambígua; ausência de raiz; leitura parcial | V+C | app.js:326; library.js | 04, 19 |
| S15 | Prévia Markdown | Prévia, copiar, abrir nota original | carregando; pronto; erro; link local/wiki/externo | V+C | library.js; reader.js | 04 |
| S16 | Leitor da nota original | Texto original, metadados, Finder e editar | Markdown; código; tabelas; imagens; link ambíguo; nota removida | V+C | app.js:219; reader.js | 05 |
| S17 | Editor | Textarea, reler, descartar, ver alterações, salvar no .md original | limpo; alterado; salvando; salvo; erro; digitação durante save | V+C | app.js:229; app.js:250 | 05 |
| S18 | Diff | Linhas adicionadas/removidas e decisão salvar/voltar | sem diferença; com diferença; conteúdo longo | V | app.js:272 | 06 |
| S19 | Conflito de edição | Comparar versão atual em disco com rascunho; adotar base | arquivo alterado por fora; preservar texto; tentar novamente | C | app.js:241 | 06 |
| S20 | Rascunho e saída | Recuperar rascunho; continuar, guardar e fechar, descartar | rascunho recuperável; saída com alterações; falha ao guardar | V+C | app.js:219; app.js:278; main.swift:146 | 06 |
| S21 | Memória / fontes | Selecionar fonte, listar/buscar e atualizar índice local | conectando; lista; busca; vazio; erro; fonte trocada | V+C | app.js:483 | 07 |
| S22 | Nota derivada e proveniência | Texto, origem canônica, hash indexado e conexões | origem conhecida/ausente; grafo disponível/indisponível | C | app.js:516 | 08 |
| S23 | Atualidade do índice | Estado local associado à fonte | current; stale; partial; external; unavailable; indexing | C | app.js:139; app.js:523 | 07, 19 |
| S24 | Conversas importadas | Lista e importação explícita de Oracle Conversations v1 | vazia; preenchida; importando; JSON inválido; erro | V+C | app.js:311 | 08 |
| S25 | Leitura de conversa | Mensagens por papel; somente leitura de importação | conteúdo longo; conversa vazia | C | app.js:311 | 08 |
| S26 | Instruções de projetos | Lista por projeto autorizado; autorizar pasta | vazio; lista; erro de permissão | V+C | app.js:318 | 08 |
| S27 | Leitura de instrução | AGENTS.md ou override encontrado, fonte e texto | encontrada; ausência; acesso revogado | C | app.js:318 | 08 |
| S28 | Plugins / ferramentas | Lista, ícone, estado, abrir Codex | conectado; desconectado; instalado; precisa de login; não verificado; erro; indisponível | V+C | app.js:300; app.js:305 | 12 |
| S29 | Detalhe de plugin | Origem do estado, evidência e data de verificação | available; installed; unverified; disabled; pending; running; error | C | app.js:305; status-badges.js | 12 |
| S30 | Ajustes | Seu Oracle; conexões/privacidade; aplicativo; avançado | licença comum; owner; preferência persistida; falha de gravação | V+C | app.js:348 | 09 |
| S31 | Organizar departamentos | Associar especialistas aos departamentos sem mover arquivos | lista; vazio; alteração; salvando; erro | V+C | app.js:332 | 09 |
| S32 | Revisar contexto | Leitura do contexto e acesso à configuração | disponível; não preparado; erro | C | app.js:528 | 14 |
| S33 | Sincronização e manutenção | Índice, último resultado, horário/fuso e consentimentos separados | habilitado; pausado; externo; parcial; erro; pendente; rotina completa | C | app.js:387 | 10 |
| S34 | Pedido de agendamento | Texto a copiar; pedido preparado ainda sem tarefa registrada | preparado; copiado; registro pendente | C | app.js:408 | 10 |
| S35 | Backup privado do banco | Consentimento, criar, verificar e testar restauração | não autorizado; indisponível; criado; integridade verificada; restauração testada; falha | C | app.js:769 | 10 |
| S36 | Confirmar restauração de teste | Explicar estado novo e preservação do banco ativo | aguardando confirmação; em andamento; verificado; erro | C | app.js:777 | 18 |
| S37 | Codex e plugins | Conexão opcional; plugins; abrir Codex; conexão/modelo | não verificada; conectada; indisponível | C | app.js:567 | 12 |
| S38 | Desconectar pastas | Confirmar perda de acesso, preservando documentos | cancelar; confirmar; erro | C | app.js:385 | 18 |
| S39 | Atualizações | Fontes Second Brain/skills, versões, disponibilidade, instalar e recuperação | not_checked; current; available; updated; offline; error; external; compatibility_required; preserved_edits; not_configured; interrupted | C | app.js:673 | 11, 19 |
| S40 | Restaurar atualização anterior | Restaurar Second Brain / skills conforme backup disponível | disponível; executando; concluída; falha | C | app.js:690 | 11 |
| S41 | Fonte oficial de skills / owner | Repositório HTTPS; capacidade administrativa assinada | owner; proibido; URL inválida; salva; erro | C | app.js:341 | 21 |
| S42 | Diagnóstico do Atlas | Métricas da janela e renderer; detalhes técnicos | SVG; fallback; falha de renderização | C | app.js:532 | 21 |
| S43 | Histórico técnico | Até 50 registros recentes; hooks recebidos; reproduzir | sem recibos; eventos presentes; observação parcial | C | app.js:319 | 21 |
| S44 | Ativação individual | Código ORACLE2, acesso offline, erro associado ao campo | sem licença; validando; inválida; ativada | C | onboarding.js:85 | 13 |
| S45 | Pedido de acesso / convite | ORACLE-MAC2; convite ORACLEINV2 e solicitação ORACLEREQ2 | recolhido; expandido; gerado; copiado; dispositivo incompatível; erro | C | onboarding.js:85 | 13 |
| S46 | Escolha do Obsidian | Pasta original; criar estrutura; conectar GBrain existente | sem pasta; selecionada; criar; anexar; cancelado | C | onboarding.js:98 | 13 |
| S47 | Workspace e perfil existentes | Seleção explícita; preservar instalação externa | workspace escolhido; perfil escolhido; acesso negado | C | onboarding.js:98; OnboardingUIBridge.swift:14 | 13, 20 |
| S48 | Identidade | Nome do Oracle, nome da pessoa, fuso | vazio; preenchido; validando; erro ao guardar rascunho | C | onboarding.js:104 | 14 |
| S49 | Objetivos | Propósito e tarefas importantes | preenchido; limites do campo; voltar preserva respostas | C | onboarding.js:104 | 14 |
| S50 | Preferências | Contexto profissional; forma de comunicação; manutenção opcional | preenchido; consentimento marcado/desmarcado | C | onboarding.js:104 | 14 |
| S51 | Revisão do plano | Respostas, pastas e plano antes de instalar | pronto; plano mudou; editar; instalar localmente | C | onboarding.js:111 | 14 |
| S52 | Confirmar identidade / readback | Leitura oficial e confirmação vinculada ao hash | aguardando; confirmado; revisão alterada; erro | C | onboarding.js:116 | 15 |
| S53 | Instalação e retomada local | Recibos confirmados; skills verificadas; pausar/retomar | starting; running; cancelling; paused; cancelled; interrupted; failed; completed | C | onboarding.js:150 | 15, 17 |
| S54 | Cartão de continuidade e progresso no shell | Estado pequeno persistente fora do diálogo | em curso; precisa responder; precisa revisar; pausa; desaparece ao concluir | C | onboarding.js:155; installation-visual.js; app.js:198 | 15, 17 |
| S55 | Permissão pontual | Motivo, ação, diretório; permitir uma vez ou recusar | aguardando; permitida; recusada; cancelada | C | onboarding.js:122 | 16 |
| S56 | Perguntas do Codex | Até 3 perguntas; opções e texto livre; campo sigiloso sem rascunho | incompleta; válida; enviada; nova geração; cancelada | C | onboarding.js:122 | 16 |
| S57 | Conexão Codex opcional | Login externo no Codex; verificar/cancelar autorização | desconectado; aguardando; conectado; erro | C | onboarding.js:139 | 12, 17 |
| S58 | Modelo disponível na conta | Select dos modelos recebidos; esforço padrão compatível | lista; selecionado; ausente; seleção inválida | C | onboarding.js:144 | 12 |
| S59 | Bloqueio Oracle | Tela de bloqueio e botão de desbloquear | bloqueado; autenticando; desbloqueado; cancelado/erro | C | index.html:9; app.js:101; main.swift:189 | 20 |
| S60 | Autenticação nativa | LocalAuthentication; Touch ID ou senha do Mac | desafio do sistema; sucesso; falha; cancelamento | C | main.swift:189 | 20 |
| S61 | Seletores nativos | Pasta vault/projeto/GBrain, importar JSON, exportar PNG | seleção; cancelamento; falha de acesso | C | main.swift:230; main.swift:259; main.swift:267; OnboardingUIBridge.swift:14 | 20 |
| S62 | Menus e Sobre | Oracle, Editar, Janela; Sobre com build | menu aberto; janela Sobre; minimizar/tela cheia | C | main.swift:156; main.swift:173 | 20 |
| S63 | Avisos, campos e feedback transversais | Tooltip, toast, alertas, detalhes, radio/checkbox/select, botões e foco | normal; hover; foco; selecionado; disabled; busy; sucesso; aviso; erro | V+C | app.js:41; app.js:605; onboarding.js:20 | 18, 19 |
| S64 | Lista/pastas legadas sem entrada no shell | renderResults existe, mas não há controles data-view no HTML atual | implementado sem navegação visível; limite de 300 | C · latente | app.js:185; app.js:186; index.html | 03 |
