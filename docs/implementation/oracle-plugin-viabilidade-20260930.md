# Oracle como Plugin Extensions: pesquisa de viabilidade

Data: 30/09/2026. Pesquisa somente leitura, com Agent Reach via GitHub CLI/Jina Reader e OpenAI Docs. Nenhum plugin, serviço, runtime ou configuração pessoal foi instalado. A sessão anterior serviu como contexto, não como fonte de autoridade.

## Parecer

É viável levar a **interface visual do Oracle para dentro do ChatGPT Desktop**, usando Plugin Extensions e MCP Apps. É uma mudança de arquitetura, não uma conversão automática do app Swift. **Não está comprovado um produto completo, local, multiplataforma, sem componentes adicionais e sem requisitos de distribuição nativa.** A publicação pública de um MCP puramente local é o principal bloqueador documental. [Extensions](https://developers.openai.com/plugins/build/extensions), [MCP server](https://developers.openai.com/plugins/build/mcp-server).

## Interface e reaproveitamento

As extensões documentadas incluem sidebar/global app, painel de conversa, configurações e visualizador/editor de arquivos. O anúncio de 29/09/2026 confirma essas superfícies, mas informa diferenças por plataforma/plano, incluindo mentions no desktop e Free/Go web ainda anunciado como futuro. Não se deve prometer o mesmo frontend no Codex CLI ou no ChatGPT clássico web. [Extensões](https://developers.openai.com/plugins/build/extensions), [anúncio DevDay](https://learn.chatgpt.com/docs/whats-new/devday-2026).

MCP Apps entrega HTML em iframe e usa JSON-RPC por postMessage. Assim, o HTML/CSS/JavaScript e SVG 2D existentes têm uma base reutilizável. Esta é uma **inferência técnica**: a ponte WKWebView, acesso a arquivos locais, dimensões da janela, recursos e persistência precisam de adaptação. O host exige CSP e allowlists; recursos UI devem ser versionados para evitar cache incompatível. Um iframe não oferece acesso direto às APIs AppKit/Swift. [UI ChatGPT](https://developers.openai.com/plugins/build/chatgpt-ui).

O SDK oficial oferece módulos TypeScript para servidor e UI e módulos Python para servidor. As capacidades devem ser detectadas após initialize, pois extensões podem estar ausentes no host. A especificação distingue Work web de ChatGPT clássico; file entrypoint, file opening, file resources e mentions estão marcados como desktop. Isto não é prova de compatibilidade executada do Oracle. [SDK](https://github.com/openai/mcp-extensions/blob/e314720a0daac326217d1f123fcf51647868fa9f/typescript/README.md), [matriz](https://github.com/openai/mcp-extensions/blob/e314720a0daac326217d1f123fcf51647868fa9f/docs/spec.md#platform-support).

## Vault, filesystem e consentimento

O formulário do SDK aceita recursos adicionados pelo usuário com kind directory, além de arquivos. O resultado é uma URI; a especificação não equivale essa URI a um caminho bruto. Para file entrypoints no desktop, tools/call recebe no servidor o caminho absoluto do arquivo aberto, via metadata do host; a UI usa recursos MCP. Operações maiores e relativas ficam no servidor. [Resource selection](https://github.com/openai/mcp-extensions/blob/e314720a0daac326217d1f123fcf51647868fa9f/docs/spec.md#resource-selection), [filesystem](https://github.com/openai/mcp-extensions/blob/e314720a0daac326217d1f123fcf51647868fa9f/docs/spec.md#filesystem-access).

Há, portanto, base oficial para um seletor de diretórios. Ainda falta uma prova do contrato que Oracle precisa: resolver a seleção para o vault correto, conservar autorização entre reinícios, definir leitura/escrita e impedir escapes por symlink. Não presumir que um picker dá acesso persistente irrestrito. O helper selectFiles é outro recurso: seleciona a biblioteca de arquivos do ChatGPT e retorna fileIds, não um grant nativo de pasta. [Referência](https://developers.openai.com/plugins/reference). Permissões do agente delimitam ações locais e aprovações fora do workspace. [Permissões](https://learn.chatgpt.com/docs/permission-modes).

## MCP local e runtimes

Clientes Codex/Desktop aceitam STDIO com command/args/env/cwd e Streamable HTTP, inclusive endereço loopback no exemplo oficial. STDIO precisa de um processo executável disponível; HTTP precisa de um serviço em execução. As configurações e políticas de aprovação são separadas. Isso não transforma ChatGPT web em leitor de config local nem documenta provisionamento automático de Bun, Node, GBrain ou AI Memory. [MCP local](https://learn.chatgpt.com/docs/extend/mcp).

Para Oracle, eliminar a janela/app visual próprio é compatível com manter um backend local sem janela. Uma possibilidade a avaliar é servidor MCP modular com UI empacotada e adaptadores para vault/GBrain/AI Memory. STDIO pode servir processos independentes; um armazenamento que exige singleton deve usar serviço compartilhado com lifecycle explícito. Nenhuma escolha de transporte autoriza captura, confiança de hooks ou concessões silenciosas. Esta proposta é inferência de arquitetura; não foi implementada nem homologada.

## Distribuição privada, atualização e catálogo público

O pacote portátil usa plugin.json e mcp.json, podendo incluir skills e hooks. Marketplaces Git/local são documentados, com fontes GitHub, refs e catálogo em .agents/plugins/marketplace.json. O host instala uma cópia em cache. A CLI possui marketplace add/list/upgrade/remove; mudar arquivos da origem não prova atualização da cópia instalada. Publicação para workspace exige admin e permanece dentro da organização. Git privado depende do acesso já autorizado ao repositório; não presume distribuição pública nem ausência de autenticação/rede. [Empacotamento e marketplace](https://developers.openai.com/plugins/build/plugins).

Para catálogo público, a documentação atual exige MCP **HTTPS estável e publicamente alcançável**, com Streamable HTTP. Endpoint local, túnel temporário ou Secure MCP Tunnel sozinho não atendem o caminho normal de submissão. O pacote orienta contatar OpenAI quando o MCP não puder ser publicado remotamente. Um proxy público não faz o vault local aparecer automaticamente: ainda exige um desenho autorizado de conectividade e isolamento. [Servidor e publicação](https://developers.openai.com/plugins/build/mcp-server), [pacote](https://developers.openai.com/plugins/build/plugins).

A submissão pública exige identidade individual/empresarial verificada, ZIP, verificações automatizadas e review antes da publicação escolhida pelo responsável. MCP exige verificação de domínio, site/suporte/privacidade/termos e casos de revisão. Atualizações elegíveis de ferramentas hospedadas passam por scans; mudanças de metadata, skills ou configuração do servidor requerem novo ZIP. Não há prova de elegibilidade pública especial para Oracle local. [Submissão](https://developers.openai.com/plugins/deploy/submission).

As leituras atuais HTML e Markdown não dão base para tratar localhost como publicável pelo fluxo normal. A página de submissão é geral; páginas específicas de servidor e pacote exigem HTTPS e encaminham exceções locais ao contato OpenAI. A divergência antiga não é autorização de catálogo.

## macOS, Windows e Developer ID

O host Windows atual suporta plugins e skills e usa agente Windows nativo/PowerShell ou WSL2. Isso confirma o host, não cada dependência do Oracle. Windows e WSL também podem ter homes/configurações Codex distintas. [Windows](https://learn.chatgpt.com/docs/windows/windows-app).

GBrain no pin Oracle 2efaaf8f8a817b5b82e023383618fdcdb1cc5f7d, versão 0.48.4.0, exige Bun >=1.3.10 e seu build:all só declara darwin-arm64/linux-x64. A release atual observada, v0.60.17.0, também só publica esses dois binários. Ausência de asset Windows não prova impossibilidade de portar; impede afirmar suporte pronto. Não foi feita atualização de pin. [Pin](https://github.com/garrytan/gbrain/blob/2efaaf8f8a817b5b82e023383618fdcdb1cc5f7d/package.json), [release atual](https://github.com/garrytan/gbrain/releases/tag/v0.60.17.0).

AI Memory v2.4.2 publica archives macOS/Linux arm64 e x86_64, além de Windows x86_64. Seu README marca Windows nativo como Experimental e WSL2 como Supported. O runtime Oracle atual continua específico: AIMemoryProvisioningEngine.swift seleciona macOS arm64 e valida Mach-O arm64; AIMemoryServiceProcess.swift usa Darwin e launchctl. Portar apenas a UI não resolve provisão, processo singleton, caminhos e lifecycle Windows. [Assets](https://github.com/akitaonrails/ai-memory/releases/tag/v2.4.2), [suporte declarado](https://github.com/akitaonrails/ai-memory/blob/v2.4.2/README.md).

A identidade verificada exigida pela OpenAI é diferente de Apple Developer ID. Um pacote HTML/JS hospedado no app já instalado remove a distribuição do app visual Oracle; a documentação OpenAI não exige Developer ID para esse pacote. Isso não dispensa as proteções do SO para executáveis baixados. Apple documenta Developer ID e notarização para apps externos sob o Gatekeeper padrão. A avaliação de um futuro empacotamento de runtime precisa considerar o artefato exato; não há promessa de instalação nativa sem assinatura ou sem qualquer fricção. [OpenAI](https://developers.openai.com/plugins/deploy/submission), [Apple](https://support.apple.com/en-ie/guide/security/sec3ad8e6e53/web).

## Decisão sugerida e limites

A alternativa sustentada pelas fontes é **plugin privado local primeiro**, mantendo backend explícito, consentimentos e provisão verificável. O piloto mínimo deveria comprovar seleção real do vault, leitura/edição de nota original, UI SVG, reconexão do serviço e atualização instalada no host macOS/Windows escolhido. Catálogo público local-only depende de resposta específica da OpenAI ou outra arquitetura; não prometer aprovação.

O repositório de Reminders citado pelo usuário não foi fornecido. As buscas não identificaram um candidato suficiente; nenhum projeto foi tratado como o exemplo citado por semelhança de nome.

Não foram exercitados instalação/invocation, atualização real, acesso persistente ao vault, runtime Windows, signing do novo formato ou aprovação pública. Nenhum teste de produto foi executado; houve somente consulta a documentação/código/release metadata. A verificação read-only do Agent Reach informou v1.5.0 atual, sem instalar atualização. URLs, commit SDK e digests dos Markdown oficiais estão em report.json.
