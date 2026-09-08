# Three.js no atlas completo

Evolução atual: [movimento galáctico, métricas comparáveis e limitações](../evidence/atlas-motion-report.md). As primeiras amostras `atlas-preview.json` e `native-*.json` documentam a versão anterior; a comparação desta revisão usa `atlas-motion-before.json` e `atlas-motion-after.json`.

O atlas usa Three.js 0.185.1 no WebGL2 para sol, núcleos, ligações, órbitas, pontos e atmosfera. Uma camada SVG mantém textos, ícones, áreas de interação e semântica acessível; Lista/Pastas acessam as mesmas fontes. Falha de WebGL preserva um mapa SVG funcional.

A escolha atende à orientação mais recente de Mateus: universo completo em Three.js, sol dominante, constelações coloridas e painéis discretos. O renderer anterior, somente SVG, permanece como fallback. Não há motor de IA no renderer.

## Pesquisa delimitada

Agent Reach foi usado pela rota web/Jina para consultar documentação pública. As skills Three.js Shaders/Fundamentals orientaram a implementação; Gentle Work Unit Commits e Cognitive Doc Design organizam evidências e documentação, não substituem design de interface.

- [WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html): WebGL2, controle de resolução, descarte e estatísticas de renderização.
- [ShaderMaterial](https://threejs.org/docs/pages/ShaderMaterial.html): shader procedural próprio para o sol e superfícies dos núcleos.
- [Rendering on Demand](https://threejs.org/manual/en/rendering-on-demand.html): renderização sob demanda quando o conteúdo não precisa de movimento contínuo.
- [Exemplo oficial Lava](https://threejs.org/examples/webgl_shader_lava.html): demonstração de material animado. O Oracle não copiou seu pipeline de bloom/composer e não carrega texturas externas.
- [WKWebView](https://developer.apple.com/documentation/webkit/wkwebview): container nativo usado pelo aplicativo.

## Orçamento implementado

A cena inicial atual, com sete coleções e 14 folhas visíveis, possui sete draw calls, 1.026 triângulos, seis geometrias e uma textura procedural. O sol é um shader sobre um plano; os sete núcleos são instanciados. Ligações usam fitas Bézier instanciadas, com fluxo no shader. O renderer não desenha 940 planetas. A redução de chamadas não representa redução equivalente de trabalho de GPU; as fitas e halos têm custo próprio.

Movimento ambiental busca aproximadamente 30 Hz; modo econômico limita resolução a 1× e frequência a aproximadamente 15 Hz. Gestos atualizam câmera/geometria por requestAnimationFrame, sem reconstruir árvore ou cena completa. Resolução normal limitada a 1.5×. Uma amostra sustentadamente lenta ativa qualidade econômica. Reduzir movimento produz frames somente quando necessários. Pausa de atmosfera, ocultação/minimização e leitura em modal suspendem o loop.

O tempo de submissão CPU não mede execução GPU nem consumo de bateria. Os números observados estão em `docs/benchmarks/`; não são resultados de 10 mil ou 50 mil notas. RSS e CPU de processos WebKit precisam ser interpretados com cuidado por sua arquitetura multiprocesso.

## Unidade de trabalho e reversão

Comportamento: atlas interativo completo com continuidade espacial e persistência de posições. Validação: janela macOS em vault sintético, seleção, arraste, reinício, zoom, modos e diagnóstico. A reversão pode retirar `packages/atlas/universe.js` e seu bundle e conservar o fallback `Resources/web/atlas.js`; nenhum arquivo do vault é movido ao ajustar posições.
