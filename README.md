# Oracle

Oracle 0.3 é um aplicativo macOS para explorar conhecimento local, editar notas do Obsidian e configurar um Second Brain com o GBrain oficial. AppKit e WKWebView usam recursos locais; o mapa ativo é SVG 2D, organizado em departamentos → especialistas → skills. Código WebGL histórico não é o renderer ativo desta branch.

Pessoal, Profissional e Prompts têm cores estáveis. A escala é fixada em 118% do enquadramento do contexto, incluindo navegação e redimensionamento; a translação continua disponível. Estrelas e círculos de expansão são decorativos. O mapa e as bibliotecas usam páginas limitadas, sem ocultar definitivamente os itens restantes. A organização de departamentos é visual: não move arquivos. A taxonomia final ainda exige revisão do proprietário.

**Estado desta branch:** implementação e validação isoladas. Não substitui o aplicativo instalado nem libera o piloto por si só. Os testes físicos de licença, migração do proprietário, distribuição assinada e inferência offline têm critérios separados. A publicação e a instalação dependem da integração conjunta com a outra sessão.

## Usar

1. Use seu convite individual `ORACLEINV2` para gerar uma solicitação `ORACLEREQ2` neste Mac. Receba do proprietário a resposta assinada `ORACLE2` e importe-a. O app não precisa consultar um servidor.
2. Escolha a pasta original do Obsidian e preencha o contexto mínimo. Para conectar um GBrain existente, escolha também seu workspace e perfil local explicitamente; esse modo não inicializa nem migra o banco existente.
3. Revise o plano e clique em **Instalar localmente**. O executor nativo prepara a estrutura e o GBrain oficial sem conta Codex ou chamada de modelo.
4. Confira o readback, clique em **Confirmar identidade** e, em uma ação separada, **Retomar localmente**. Somente recibos reais de estrutura, identidade, índice e integração local permitem concluir.

Não existe primeira experiência, exercício didático ou entrega de treinamento obrigatória, durante ou depois da instalação. Conectar ao Codex é opcional e explícito. Confiança de hooks, descoberta da skill e disponibilidade de ferramentas externas não são inferidas da instalação local. A inferência de IA sempre offline ainda requer homologação separada em hardware-alvo; consultas por palavras-chave e indexação sem modelo não a comprovam.

Perfis existentes são preservados, mas não recebem acesso administrativo por conter um vault ou um UUID antigo. Antes de substituir a instalação do proprietário, revise as chaves públicas confiadas e a ativação owner assinada. Não existe bypass legado permanente.

**Editar → Salvar** atualiza o `.md` original e preserva rascunhos, inclusive digitação durante uma gravação em andamento. O índice é derivado: alterações locais/externas provocam verificação limitada em fila separada. Leitura parcial não autoriza purgar exclusões; abrir uma página derivada verifica sua atualidade. O bloqueio da interface não criptografa o vault.

Plugins vêm do inventário público do app-server Codex. Apenas ferramentas confirmadas como disponíveis aparecem na órbita do SOL; presença de pacote ou imagem não comprova conexão. Ícones fornecidos pelo catálogo/pacote são apresentados em monocromático, com iniciais quando não há um ícone disponível.

## Emitir um código

Somente no computador do proprietário, com diretório privado explícito **fora do repositório**:

```sh
scripts/oracle-license init --issuer-dir /caminho/privado/novo-emissor
scripts/oracle-license export-public --issuer-dir /caminho/privado/novo-emissor
scripts/oracle-license invite --issuer-dir /caminho/privado/novo-emissor --to 'Nome do aluno'
scripts/oracle-license issue --issuer-dir /caminho/privado/novo-emissor --request-file solicitacao.txt
```

A chave privada e o ledger nunca entram no app, DMG ou Git. Convite consumido fica vinculado à chave de um dispositivo; repetição da mesma solicitação recupera a resposta original, e outra chave é recusada. A licença é permanente, sem `--days`. Student não emite licenças nem administra a fonte oficial. Owner é um papel assinado, não uma preferência de interface. O emissor exige um ledger autoritativo; restauração deliberada de um backup antigo não é exclusão global garantida. Uma máquina permanentemente offline não recebe revogação remota. [Contratos e limites](docs/implementation/native-access-validation.md).

## Compilar e empacotar

Alvo atual: macOS 13+, arm64, ferramentas Swift da Apple, Bun e Python 3. Dependências e o GBrain devem estar previamente provisionados nos pins revisados. Build não instala dependências, não executa bootstrap, não lê sua identidade de assinatura automaticamente e não altera `/Applications`.

```sh
bash scripts/build.sh --channel developer --preflight
bash scripts/build.sh --channel developer
bash scripts/package.sh --channel developer --preflight
```

Bundle de desenvolvimento: `.work/build/developer/Oracle.app`, com assinatura ad hoc, manifesto de origem e inventário dos recursos. Isso não equivale a um release notarizado ou ativação física homologada. Empacotamento usa `dist/<versão-buildID-canal-arquitetura>/`. A etapa release exige fonte limpa, configuração explícita de Developer ID, entitlements e perfil de notarização. `scripts/release.sh` executa somente preflight por padrão; nenhum desses scripts instala ou publica o app. [Pipeline completo](docs/implementation/distribution-pipeline.md).

## Verificação

- [Rastreabilidade da implementação atual](docs/implementation/audit-full-20260910.md).
- [Bridge e sequência de instalação local](docs/implementation/native-access-integration.md).
- [Memória, preservação de dados e limites de trabalho](docs/implementation/data-reliability-20260910.md).

Regressões atuais: `scripts/test-audit-ui.js` (WKWebView com respostas sintéticas), `scripts/test-native-ui.py` (serviços reais com identidade efêmera), `scripts/run-audit-integration.py` (fixture adicional com gravação atrasada) e `scripts/test-mcp-offline.py` (cliente MCP real). Resultados e limitações devem ser lidos por execução, não somados como jornadas únicas. As suítes nativas exigem `--state` descartável explícito. Os documentos antigos em `docs/evidence` são evidência histórica, não homologação automática desta branch.

As validações usam perfis isolados e notas sintéticas. A configuração pessoal não é reinstalada pelos testes. A confiança de hooks permanece no mecanismo oficial do Codex; nenhum teste habilita essa confiança automaticamente. O código não lê bancos privados do Codex nem usa tokens da assinatura como uma API paralela.
