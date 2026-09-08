# Oracle: navegação por contexto e grupos

Implementação local de 08/09/2026, sobre a base `a2c730f`. Referência visual: [SkillTree preview](https://skilltree.altari.ai/preview), observado ao vivo em visão global, Marketing e ficha de trabalho. O briefing, README e inventário de movimentos em `oracle-skilltree-reference-2026-09-08` foram lidos integralmente; os trechos de câmera/fit em `source/map.html` também foram conferidos. Nenhum código, texto de produto ou asset da Altari foi incorporado.

## Estrutura

O mapa mantém Three.js para a galáxia, SOL, planetas, conexões e folhas. SVG fornece alvos, símbolos, rótulos e caminhos curtos do detalhe. Os controles continuam em AppKit/WKWebView; não há migração de stack nem dashboard.

A relação é SOL → especialista → grupo → arquivo. `leaf.source` identifica o grupo de pertencimento, nunca a skill anterior. Pastas organizadas preservam seu caminho de origem; contêineres de empacotamento chamados `skills` usam faixas alfabéticas explícitas. Essas faixas servem à navegação, sem afirmar assunto, precedência ou dependência. Caminhos distintos continuam distintos, inclusive arquivos com nomes iguais. O vault não é reorganizado.

O global apresenta uma amostra distribuída de `min(10,total)` por especialista. O selecionado apresenta `min(50,total)`, com expansão adicional pelo controle de detalhes. Abaixo ou em 50% as skills recolhem. O catálogo completo permanece indexado: não há limite de especialistas nem truncamento para 137 arquivos. Grupos grandes têm páginas de 50; a última pode repetir itens da anterior para manter o mínimo solicitado, e a união das páginas cobre todos os arquivos. A busca existente continua disponível.

O leque do especialista distribui espaço angular proporcionalmente aos membros mostrados. No grupo, arquivos usam ramificações laterais curtas sobre traços de distribuição sem rótulo ou semântica própria. Nenhum arquivo está sobre uma conexão para outro arquivo. Faixas e caminhos são derivados dos dados, sem mover ou renomear documentos.

## Câmera e entrada

Global, especialista, grupo e skill são contextos explícitos. O histórico guarda até 32 contextos com câmera e escala. Voltar/Escape restaura o anterior; uma skill abre o inspetor e permanece no centro da área útil quando o painel redimensiona o mapa. Um inspetor aberto pela seleção fecha ao retornar; um painel previamente aberto pelo usuário permanece disponível.

Fit usa a área efetiva do mapa, incluindo os painéis laterais, 56 px para a navegação contextual e margens. O enquadramento do especialista inclui o SOL inteiro. O zoom percentual é relativo ao fit daquele contexto. A viagem de câmera mantém a visibilidade lógica enquanto muda a escala de referência.

- Arrasto: pan; Alt + arrasto: reorganização manual existente.
- Scroll simples: pan, sem mudar de contexto.
- Ctrl/Command + scroll e gesto de ampliação: zoom ancorado ao ponteiro.
- + / −: zoom; 0: fit; Escape/Voltar: contexto anterior.
- Setas esquerda/direita no mapa: outro especialista; Enter: explorar; Espaço em skill: abrir Markdown.

Posições e escala interpolam por `1-exp(-dt/tau)`, com constantes de 95/130 ms. Novas folhas têm entrada escalonada curta; folhas recolhidas retornam ao grupo com fade. O estado continua controlável durante a transição. Não há bloqueio de interação por uma sequência longa de timers.

## Movimento e recursos

A formação distingue SOL, conectores, especialistas, grupos e skills. Pause/resume/replay usam a mesma cena e não executam instalação, skills ou gravações de arquivos. O renderer mantém buffers reutilizáveis e até sete chamadas de desenho, sem pós-processamento.

A atmosfera tem alvo de 24 Hz em repouso e 15 Hz na qualidade econômica; interação e formação podem solicitar 60 Hz. Esses valores são alvos, não resultado medido. Reduce Motion deixa a cena estática após assentar. Minimização, ocultação e bloqueio conservam a suspensão existente. Medidas, hardware e limites estão no relatório de evidências.

## Marcas

`CodexBridge` conserva a evidência de conexão do runtime. Campo de logo escuro nulo passa corretamente ao logo padrão. A decoração resolve o ID exato do app ou o ID do pacote, incluindo SVGs originais de Sites e Plugin Management e o PNG do Canva. Dependências não herdam o logo do pacote proprietário: Codex Document Control não recebe a arte de Spreadsheets.

Os filtros de grayscale foram retirados do anel do SOL e do Observatório. Variantes oficiais para fundo escuro são usadas quando fornecidas; não há recoloração por CSS. Um serviço sem arte própria mantém o fallback e o nome completo.

O loader aceita arquivos de até 2 MB, dimensões de até 4096 px e exporta PNG de até 96 px. Apenas assinaturas PNG/JPEG/WebP entram no decoder raster. SVG passa antes por XML com lista restrita de geometria: scripts, eventos, CSS, imagens, entidades, DTD, processing instructions, referências externas e `use` recursivo são rejeitados. A rasterização usa AppKit/Core Graphics, sem WebView. Downloads são efêmeros, sem cookies ou credenciais, limitados a `files.openai.com` e à pasta pública de imagens de ecossistema de `chatgpt.com`, inclusive após redirects.

## Reprodução

```sh
bun run build:atlas
node --test scripts/test-organic-layout.mjs scripts/test-skilltree-layout.mjs scripts/test-atlas-motion.mjs
python3 scripts/test-plugin-icons.py
python3 scripts/make-skilltree-fixture.py
python3 scripts/build-atlas-qa.py
# In another terminal, start the QA app with ORACLE_ATLAS_QA_DIR and --state .work/public-gallery/state.
python3 scripts/test-skilltree-native.py
bash scripts/build.sh
bash scripts/package.sh
```

O teste nativo requer a fixture pública isolada descrita em `docs/evidence/skilltree/public-catalog.json`, o app QA e sua caixa de testes ativa. A caixa de testes é compilada somente no app QA; não integra o executável distribuído. O app pessoal em `/Applications` não é substituído por esses comandos.
