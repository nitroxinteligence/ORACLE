# Cognee no Oracle: avaliação concluída, adoção pendente

Verificação: 7 de setembro de 2026, horário de Recife. Pesquisa com Agent Reach / GitHub CLI e documentação primária. Cognee: release `v1.5.4` (`20e0bd88746de2d96e99b4b122361dfc3dad21bc`); documentação/código atual em `e93a4f0c76e6af27142c25189f14c200e1749d51`. Integrações em `0f14b9d0368b44d7e465caf66767695b0cf0ed9b`. GBrain integrado: `v0.48.4.0`, commit `2efaaf8f8a817b5b82e023383618fdcdb1cc5f7d`.

## Recomendação

**Manter GBrain como memória do Oracle e não adicionar Cognee à instalação pessoal agora.** Cognee merece um experimento posterior para recuperação por relações extraídas e contexto de código, limitado a um projeto sintético. Isso é uma recomendação técnica, não uma decisão de adoção tomada pelo usuário.

A integração atual já preserva Markdown canônico, escopo de fonte, TTL, leitura com origem e uma ponte MCP testada. Cognee acrescentaria outra captura, outro índice, outro ciclo de retenção e outro sistema de migrações antes de haver evidência de que melhora as perguntas reais do Oracle. A principal vantagem potencial é enriquecer relações que não estão explicitamente nos documentos. Esse ganho depende de extração por modelo e precisa ser medido; a existência de um grafo não demonstra precisão.

## Comparação para este aplicativo

| Dimensão | GBrain no Oracle atual | Cognee | Implicação |
|---|---|---|---|
| Consulta | Adaptador atual expõe busca textual, páginas e relações explícitas; o motor GBrain possui capacidades além desse subconjunto | Ingestão transforma documentos e código em memória conectada; recuperação combina contextos | Cognee pode ampliar a experiência, mas parte da comparação é entre adaptadores/configurações, não apenas motores |
| Codex | MCP já foi validado neste produto; hooks dependem da confiança oficial | Há plugin específico para Codex CLI e servidor MCP | Documentação de integração não prova instalação nem funcionamento no Codex Desktop de Mateus |
| Captura | Fluxo do Oracle tem contratos delimitados e preserva procedência | Plugin descreve captura de prompts, rastros de ferramentas e respostas, com sincronização posterior | Não ativar ambos sobre as mesmas conversas; revisar minimização antes de qualquer adoção |
| Modelos | Adaptador distribuído funciona sem inferência e sem chave | Padrão usa provedores hospedados; processamento e respostas podem chamar modelos | Não usar configuração padrão neste ambiente sem decisão explícita |
| Operação local | Motor e adaptador compilados; perfil próprio separado da instalação externa | Pipeline documentado com Ollama para geração e embeddings | “Local” exige configurar ambas as partes; trocar apenas o LLM deixa embeddings no provedor padrão |
| Dependências | Binários já incorporados ao pacote | Python 3.10–3.14, dependências de extração, SQL, vetores e grafo; UI/MCP têm caminhos adicionais | Aumenta superfície de empacotamento e manutenção do aplicativo nativo |
| Armazenamento | Perfil de teste do app isolado; instalação pessoal preexistente preservada | SQLite, LanceDB e grafo embarcado são uma opção local; Postgres também é configurável | Mesmo usando Postgres, não compartilhar as tabelas ou o banco do GBrain |
| Origem | Fonte canônica, hash e relações explícitas disponíveis no app | Há procedência de execução, ledger opcional e evidência por aresta, como mecanismos distintos | Não presumir equivalência automática com `canonical_path`, supersessão e TTL do Oracle |
| Custo | Consulta local do adaptador não usa API de modelo | Código Apache-2.0; modelos locais evitam tarifa por chamada, mas consomem memória, CPU/GPU, energia e operação | Não há base para estimar gasto mensal ou desempenho sem corpus e medição |
| Migração | Nenhuma migração necessária para esta entrega | Banco e contratos próprios; a API pode executar migrações no startup | Um rollback de executável não garante reversão do schema |

Fontes dos fatos de Cognee: [README e operações](https://github.com/topoteretes/cognee/blob/e93a4f0c76e6af27142c25189f14c200e1749d51/README.md), [dependências e licença](https://github.com/topoteretes/cognee/blob/e93a4f0c76e6af27142c25189f14c200e1749d51/pyproject.toml), [plugin Codex](https://github.com/topoteretes/cognee-integrations/blob/0f14b9d0368b44d7e465caf66767695b0cf0ed9b/integrations/codex/README.md), [MCP](https://github.com/topoteretes/cognee/blob/e93a4f0c76e6af27142c25189f14c200e1749d51/cognee-mcp/README.md), [pipeline Ollama](https://docs.cognee.ai/guides/local-ollama), [configuração de procedência](https://github.com/topoteretes/cognee/blob/e93a4f0c76e6af27142c25189f14c200e1749d51/.env.template). As afirmações sobre a implementação Oracle vêm de `packages/gbrain-adapter/read.ts`, `mcp.ts`, `Sources/Oracle/GBrain.swift` e seus recibos em `docs/evidence/`.

### Uma ressalva concreta sobre “um Postgres para tudo”

O README apresenta a consolidação em Postgres. A documentação de configuração consultada, porém, qualifica o adaptador de grafo `postgres_demo` como demonstração e menciona uma alternativa de produção licenciada. Não contar com um grafo Postgres de produção gratuito somente a partir da frase do README. Metadados Postgres e pgvector são uma decisão diferente do adaptador de grafo. [Documentação primária de bancos relacionais](https://docs.cognee.ai/setup-configuration/relational-databases)

## Compatibilidade e duplicidade

MCP torna a conexão tecnicamente plausível. Não torna os modelos de dados intercambiáveis. Não foi identificado, na amostra examinada, um migrador GBrain → Cognee que preserve conjuntamente fontes, hashes canônicos, correções/supersessão, TTL, links e recibos. Isso é uma limitação da investigação, não prova de inexistência em todo o ecossistema.

Se houver adoção, Obsidian permanece canônico. Um adaptador separado deve indexar uma cópia autorizada, com identificador `source + canonical_path + hash`, e tratar extrações como afirmações derivadas com evidência. Apenas um caminho deve escrever fatos pessoais. Correções, exclusões e expiração precisam de testes nas duas projeções; nenhuma sincronização bidirecional automática deve ser inferida. São propostas de arquitetura, não funcionalidades entregues.

## Prova isolada: decisão desta entrega

**Não executei Cognee nem instalei seu plugin, runtime, modelos ou serviços.** A inspeção estática já demonstrou a sobreposição e as dependências que sustentam a recomendação atual. Uma demonstração mínima com três frases não resolveria a questão relevante: qualidade de recuperação com correções e fontes. Nenhum dado privado foi enviado a Cognee ou a outro serviço de pesquisa; nenhuma API paga foi ativada.

Critério proposto para um futuro experimento, caso Mateus escolha avançar: corpus sintético de 30 documentos, 20 perguntas com respostas e fontes previamente anotadas, incluindo contradições, correções e expiração. Executar ambos localmente com versões fixas e sem captura de conversas pessoais. Medir acerto com citação válida, afirmações sem suporte, latência p50/p95, consumo de memória e reconstrução após reinício. Só recomendar adoção se houver ganho útil sobre a implementação existente e preservação de 100% das fronteiras de origem e retenção. Esses números definem o experimento; não são resultados medidos.

## Efeito no produto

O atualizador mostra **Cognee — não adotado** e mantém seu repositório identificado. Não baixa nem executa Cognee. Uma futura adoção exige seu próprio adaptador, matriz de compatibilidade e recuperação de banco; alterar um booleano não ativa um motor sem implementação.
