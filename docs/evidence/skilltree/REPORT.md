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
- SHA-256 do DMG: `d24ef102dfd116d4dd69f94418dc67573a8f790d070ce1d1ee85ded0e1bfa2d9`

Assinatura local ad hoc verificada; DMG validado e montado somente para leitura. A montagem anterior conferiu 4933 arquivos; o ajuste posterior da barra lateral foi reempacotado com assinatura e recursos atualizados. O executável distribuído não contém a caixa de testes nativa. [Recibo completo](package.json).

O app pessoal em `/Applications` não foi substituído. Não houve push, publicação de release ou instalação de fontes externas. A versão de pacote permanece 0.3.0 para a tarefa principal decidir a versão consolidada.

## Ajuste final da barra lateral

`a0a6617`: título Meu universo removido; busca à esquerda e botão de reler pasta à direita, alinhados na mesma linha. App e DMG locais atualizados.

`355fe02`: controles superiores reduzidos para 32 px, ícones de 16 px e Atualizações somente com ícone. App/DMG atualizados. As capturas acima precedem os ajustes finais dos controles.

`69c077c`: rótulo lateral Conversas ChatGPT, conforme solicitado.

`ce5be3f`: breadcrumb e retorno contextual nos plugins; detalhe retorna à lista e a lista retorna à origem.
