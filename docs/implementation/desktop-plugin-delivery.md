# Entrega local do Oracle System como plugin desktop

Estado desta implementação: fonte portátil do plugin, empacotador e registro reversível implementados. A interface e o serviço são fornecidos pelos módulos `Resources/web/plugin-bridge.js`, `Sources/Oracle/DesktopPluginServer.swift` e `packages/oracle-desktop-plugin/server.mjs`. A presença destes arquivos não comprova equivalência funcional no host.

## Contrato de distribuição

O nome exibido é **Oracle System**; o identificador portátil é `oracle-desktop`. O pacote usa `plugin.json` e `mcp.json` no formato Agent Plugins 1.0. O MCP local usa STDIO e retorna uma interface MCP App, sem inventar IDs de apps registrados. O launcher resolve todos os caminhos dentro do próprio pacote.

O pacote final contém o servidor JavaScript e o módulo de atualização sem dependências npm, o Bun macOS arm64 já provisionado no pin 1.3.10 e o bundle Oracle completo em `runtime/Oracle.app`. Os recursos web, catálogos, método, public keys, engines, notices e recibo de build permanecem nesse bundle. O processo nativo recebe `--plugin-server`; `ORACLE_DESKTOP_STATE`, quando definido pelo operador, seleciona um perfil explícito. Não existe dependência de `/Applications/Oracle.app`, Node instalado ou checkout do repositório.

O suporte atual é macOS 13+, Apple Silicon. Windows, Linux, web e mobile não executam esse bundle. Um upload de plugin não instala o runtime em outros dispositivos. Não apresentar esta entrega como portabilidade completa ou equivalência visual e funcional antes da verificação no host.

## Criar o pacote

Use um bundle atual que inclua o servidor nativo. O empacotador não compila nem provisiona dependências. Escolha uma saída nova:

```sh
python3 scripts/package-desktop-plugin.py \
  --channel developer \
  --app .work/build/developer/Oracle.app \
  --bun .work/readiness-provision/toolchains/bun-1.3.10/bun \
  --output .work/distribution/oracle-system/oracle-desktop
```

O empacotador compara commit e sourceHash do bundle com o snapshot atual antes e depois da cópia, verifica o entrypoint `--plugin-server` com uma chamada JSONL real de `boot` em perfil novo dentro de `.work/`, depois da verificação do manifesto e da assinatura e exige manifesto válido, canal e arquitetura correspondentes, assinatura verificada e Bun no pin compatível com o manifesto. O canal release também exige ticket stapled do bundle. Guarda hashes de todos os arquivos em `package-receipt.json`, preserva o commit e build ID do bundle e recusa sobrescrever a saída. O recibo verifica integridade local; não substitui assinatura autenticada do plugin nem notarização do container.

O Bun transportado inclui o documento de licenças oficial do pin em `licenses/BUN-LICENSE.md`; notices de GBrain e suas dependências permanecem em `runtime/Oracle.app/Contents/Resources/engine/`. A versão e SHA-256 do Bun constam do recibo. O ícone é o símbolo aprovado existente, copiado sem redesign.

Para entregar um arquivo comprimido, crie um ZIP ou tar.gz fora da pasta, contendo apenas o diretório `oracle-desktop`. Esse artefato é local; publicar no diretório público exige o fluxo de submissão próprio e suporte explícito para MCP local ou um endpoint HTTPS real.

## Registrar e ativar

O registro pessoal é uma ação distinta da instalação no host:

```sh
python3 scripts/install-desktop-plugin.py \
  --package .work/distribution/oracle-system/oracle-desktop
```

O instalador verifica a lista exata de arquivos e os hashes antes de editar. Copia o pacote para `~/plugins/oracle-desktop` e adiciona ou atualiza apenas sua entrada em `~/.agents/plugins/marketplace.json`. Preserva o nome, campos extras e entradas de outros plugins. A política é `AVAILABLE`; não configura instalação obrigatória, acesso owner, credenciais, ativação automática ou confiança de hooks.

Cada registro guarda o catálogo anterior e, se existir, o pacote anterior em `~/.codex/plugin-backups/oracle-desktop-<data>/`, com `rollback.json` indicando os destinos e quais existiam. Para recuperar, restaure esses arquivos aos destinos anotados e atualize ou reinstale o plugin pelo fluxo do host. Preserve quaisquer entradas adicionadas depois do backup; não substitua um catálogo posterior sem conferir seu diff.

Quando a ativação estiver autorizada, use a UI do host ou acrescente `--activate`; esta opção executa o comando real `codex plugin add oracle-desktop@<nome-do-marketplace> --json`. Ela não edita diretamente cache/config nem confia hooks. O host deve descobrir a interface e as ferramentas em uma nova conversa. Falha na ativação deixa o pacote registrado e seu backup disponível.

Para testes, forneça `--home .work/<perfil-sintético>`. A ativação CLI recebe `HOME` e `CODEX_HOME` desse perfil, mas a descoberta do marketplace deve ser verificada no CLI instalado, pois alguns hosts podem resolver o home pelo sistema operacional. Não ativar em um perfil sintético sem confirmar esse isolamento. A suíte unitária não usa a ativação nem toca no perfil pessoal.

## Validação e limites

```sh
python3 scripts/test-desktop-plugin-package.py
node --test scripts/test-desktop-plugin-update.mjs
```

Os dez testes do pacote usam bundle e Bun sintéticos, com validação externa substituída apenas nesse teste. Exercitam preservação de entradas/config, backup do pacote anterior, rollback após falha de escrita, rejeição de pacote alterado, catálogo inválido, escape por symlink e recusa de fonte divergente do build e validação exata do probe nativo, com recusa de execução após assinatura inválida. Não comprovam assinatura real, runtime nativo, renderização da interface ou a jornada pessoal.

A entrega completa exige evidências separadas de build atual, startup do pacote fora do repositório, `initialize`, descoberta de ferramentas, chamada inofensiva, recurso MCP App, renderização no host e todas as áreas do produto. Reutilizar os recursos e handlers existentes é necessário, mas não comprova sozinho que diálogos, clipboard, download, drag-and-drop, agendamento e outras capacidades do host têm comportamento equivalente.

## Referências verificadas em 2 de outubro de 2026

- [Documentação oficial de plugins e marketplaces](https://developers.openai.com/plugins/build/plugins): manifesto portátil, caminhos, STDIO, marketplace pessoal, cache e requisitos de submissão pública.
- [Plugins no Codex](https://developers.openai.com/codex/plugins): superfícies e limitações de desktop/hook.
- [Schema portátil MCP Agent Plugins 1.0](https://agent-plugins.org/schemas/1.0.0/mcp.schema.json): transporte e campos do servidor.
- Plugin Creator instalado: `skills/create-plugin/references/local-plugins.md` e `plugin-packages.md`, versão 0.1.22. Leitura confirma pacote autossuficiente, manifesto portátil e verificação no host.
- CLI instalado: `codex plugin --help`, `codex plugin marketplace --help` e `codex plugin add --help` confirmam os comandos disponíveis. Disponibilidade do comando não comprova instalação.

Validação atual do CLI em perfil sintético: `HOME` e `CODEX_HOME` existentes isolaram a descoberta ao marketplace sintético. `codex plugin add` aceitou o manifesto portátil sem overlay de compatibilidade e `codex plugin list --json` retornou `installed: true` e `enabled: true`. Evidência em `.work/desktop-plugin-cli-isolation/`. Esse fixture contém somente fonte de manifestos/skills; não é o pacote funcional e não inicia o runtime.

## Atualização do plugin

`packages/oracle-desktop-plugin/update.mjs` fornece `inspectPluginUpdate` e `applyPluginUpdate`. O servidor aplica os gates nativos de licença e desbloqueio antes de chamar o instalador de atualização. O módulo usa o marketplace efetivamente registrado no CLI, valida que o caminho da fonte corresponde à entrada local, verifica inventário completo, hashes, arquitetura, canal e a procedência do build nativo. Não usa o ZIP de atualização do aplicativo standalone.

A aplicação verifica a assinatura do bundle com `codesign --verify --deep --strict`. Recusa mudanças implícitas entre os canais developer e release. No canal release exige Developer ID com o mesmo TeamIdentifier do runtime instalado e ticket stapled válido. A assinatura do bundle não autentica por si só os arquivos JavaScript externos; essa confiança ainda depende da fonte local registrada e controlada pelo operador. O recibo é uma evidência de integridade e procedência, não uma assinatura de publicação.

O módulo guarda uma cópia completa do plugin em execução e o catálogo anterior em `CODEX_HOME/plugin-backups/`, verifica novamente o candidato contra alterações concorrentes e chama apenas `codex plugin add <pluginId-real> --json`. Depois valida o recibo da cópia instalada no cache do host. Não sobrescreve o cache em execução nem modifica confiança de hooks. Retorna `restartRequired: true`; uma nova interface/conversa usa a nova versão. Se o host já instalou a versão nova, informa somente a necessidade de reabrir.

Não há uma fonte remota assinada do plugin completo configurada nesta entrega. `refreshMarketplace: true` é recusado explicitamente. Isso é uma limitação real da atualização remota; um repositório com apenas o servidor JavaScript não substitui o bundle e o runtime que precisam ser distribuídos. O comando de atualização de marketplaces do CLI se aplica a fontes Git e recusa o marketplace pessoal local.

A pesquisa do CLI 0.157.1 em perfil sintético confirmou que `plugin list --json` mantém a versão instalada antiga e não expõe automaticamente a nova versão do manifesto da fonte; `plugin add` instalou a versão nova em outro diretório de cache. Recibos em `.work/desktop-plugin-cli-isolation/plugin-update-list.json` e `plugin-reinstall.json`. Os oito testes de atualização usam pacotes sintéticos e um runner substituto para os comandos externos; cobrem o contrato, integridade, backup, recusa de assinatura, emissor release diferente e procedência divergente, sem instalar no perfil pessoal.
