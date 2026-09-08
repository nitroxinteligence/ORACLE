# Desempenho do Oracle 0.3

Hardware: Apple M2. macOS 26.6.2. Janela 1200 × 760, Retina 2×. Uma instância de QA, sem gravação de tela durante as amostras.

| Cenário | FPS antes | FPS depois | Mediana depois | P95 depois | CPU host depois | Pico RSS host |
|---|---:|---:|---:|---:|---:|---:|
| Ambiente | 27.6 | 59.7 | 17 ms | 18 ms | 2.2% | 47.6 MB |
| Expansões repetidas | 38.1 | 50.4 | 21 ms | 24 ms | 2.0% | 43.9 MB |
| Timelapse | 33.2 | 60.0 | 17 ms | 17 ms | 2.7% | 41.7 MB |
| Econômico | 15.1 | 15.0 | 67 ms | 68 ms | 1.9% | 27.4 MB |
| Movimento reduzido | 0.0 | 0.0 | — ms | — ms | 0.1% | 27.9 MB |
| Minimizado | 0.0 | 0.0 | — ms | — ms | 0.3% | 36.2 MB |

A meta de 60 FPS foi alcançada na animação ambiente e no timelapse. Expansões contínuas ficaram em aproximadamente 50 FPS; não se afirma 60 FPS constante. A interface posterior desenha 41 folhas passivas em vez de 9 e usa uma área de mapa maior (886 × 584 contra 668 × 566). As condições de câmera e conteúdo mudaram conforme o redesign; não é um benchmark isolado de shader.

CPU e RSS da tabela pertencem ao host OracleAtlasQA. Processos auxiliares WebKit são registrados separadamente nos JSONs porque também atendem outros apps; não foram somados e atribuídos integralmente ao Oracle. O custo de submissão CPU não mede tempo GPU. O mailbox de QA opera a 10 Hz em ambas as versões.

Arquivos completos: `docs/benchmarks/organic-before.json` e `docs/benchmarks/organic-after.json`.
