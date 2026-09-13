# Second Brain: onboarding, hooks e manutenção

Escopo: Oracle 0.3.7. Sem plugin do Obsidian, captura global de outras tarefas,
importação de contas ChatGPT, publicação de vaults ou substituição do GBrain.

## Instalação

A tela existente oferece manutenção diária (15h, editável), captura das mensagens
do workspace Oracle e envio dessas capturas ao Codex para consolidar a wiki.
Captura e processamento remoto começam desmarcados. A seleção entra no plano
imutável antes de seu hash; retomadas reutilizam o consentimento daquele plano.
A instalação local não depende de login ou inferência. Se a manutenção foi
selecionada, a interface abre o espaço Oracle no Codex ao concluir a parte local.
O cartão permanece visível até a confirmação dos hooks e da tarefa. Ele permite
abrir o Codex, copiar o pedido e verificar o registro. O usuário envia esse pedido
em uma conversa no espaço Oracle; hooks já confiados também o entregam ao agente. Abrir o aplicativo sozinho não executa um turno nem comprova registro.

Os hooks são preparados no workspace do perfil, com um repositório Git local
vazio para o Codex reconhecer a raiz de configuração. Não há commit, remoto ou
publicação. Confiança do projeto e dos hooks continua sob controle do Codex.
A verificação consulta hooks/list e exige os eventos habilitados e confiados;
preparar os arquivos ou abrir o aplicativo não concede essa confiança. SessionStart/UserPromptSubmit entregam o procedimento de registro ao
agente quando há consentimento e falta uma tarefa compatível. O agente usa a
ferramenta oficial do host. Sem essa ferramenta ou sem confiança, a integração
permanece pendente. Copiar o pedido e abrir o Codex é a alternativa visível.
Não se escreve o armazenamento de automações nem a confiança do host.

## Scheduler

Uma tarefa local independente por perfil, GPT-5.6 Sol, esforço médio. O prompt
inclui um marcador do perfil/revisão de consentimento e o comando nativo. O
aplicativo confere, somente por leitura, a configuração real da automação: ID,
marcador, estado ACTIVE, tipo cron, recorrência, modelo e esforço. Ausência,
duplicação ou configuração incompatível não comprova registro. Esse recibo
comprova configuração; a execução é comprovada separadamente por last-run.json.
O computador precisa estar acordado e o Codex aberto. O executor local do Oracle
mantém a retomada das rotinas devidas quando o aplicativo volta a estar disponível.

## Memória e wiki

Mensagens entregues pelos hooks autorizados entram na fila local, com sessão,
turno e papel. Pedidos explícitos de não retenção e padrões de credenciais são
excluídos; não são lidos transcript_path, ferramentas ou raciocínio interno.
O contrato de memória orienta o agente a selecionar declarações duradouras,
criar fontes signals e registrar fatos com remember, entidade e proveniência.
As fontes e fatos exigem readback; uma instrução não comprova que o modelo a seguiu.

A manutenção projeta capturas em INBOX/oracle-history/conversations. A síntese
recebe somente o lote novo e a wiki previamente gerada no mesmo escopo. O modelo
é selecionado por model/list; ausência de Sol ou medium falha sem trocar de modelo.
Sínteses permanecem com fontes em INBOX/oracle-history/syntheses. Quando autorizado,
WIKI/Oracle/memoria-<escopo>.md recebe a consolidação atual. Versões alteradas pelo
usuário são preservadas, e a rotina registra conflito em vez de sobrescrever.
Uma nova autorização após revogação não envia a wiki do escopo anterior ao modelo.
Recibos e hashes permitem repetir a execução sem gerar outra síntese para o mesmo lote.

## Validação

As suítes de manutenção usam perfis isolados, registros de scheduler sintéticos,
mensagens sintéticas e respostas simuladas. A fixture WKWebView usa a interface
real com ponte simulada. A prova opt-in --self-test-maintenance-live usa somente
texto sintético, GPT-5.6 Sol/medium e a conexão oficial do Codex; exige
ORACLE_TEST_ROOT, --state dentro de .work e ORACLE_TEST_ALLOW_MODEL=1.
Uma fixture não comprova confiança ou agendamento em outro Mac.
A conexão de síntese bloqueia a leitura de AGENTS.md/AGENTS.override.md globais
apenas no processo filho, sem copiar credenciais ou alterar a configuração do
usuário. O protocolo deve confirmar instructionSources e ambientes vazios,
perfil de leitura restrito, modelo e esforço antes de receber as capturas.

A publicação pessoal de skills/prompts/tutoriais às 20h fica fora do produto.

## Recibos desta implementação — 12/09/2026

- Manutenção isolada: 9 checagens de scheduler, 36 de captura/wiki e 113 de síntese.
- Onboarding nativo: 65 checagens de licença/consentimento, 70 de ciclo de instalação e 50 de licença v2.
- Interface WKWebView com ponte simulada: 9 casos aprovados, incluindo encaminhamento automático ao Codex.
- MCP real com GBrain/PGLite e notas sintéticas: 68 verificações aprovadas.
- Síntese real: status verified, complete true, gpt-5.6-sol, medium, resposta final recebida para o projeto sintético Aurora.

Logs locais em .work/second-brain-{maintenance,onboarding,ui,mcp,live}.log.
Esses escopos não comprovam confiança dos hooks nem registro da automação no Mac
de outro usuário. O aplicativo mantém esses estados pendentes até o recibo real.

## Correções do onboarding — 13/09/2026

O destino é sempre o vault confirmado no seletor, exibido antes da instalação.
Notas iCloud são solicitadas ao macOS e verificadas antes do inventário. Falhas
interrompem a operação com motivo; não convertem leituras parciais em completas.
O progresso usa fases e recibos, sem avanço por tempo ou barra duplicada. Ícones
de conectores não são projetados no mapa. Ações do fluxo v2 usam o efeito metálico.

O catálogo mantém um único índice por caminho; cópias e pacotes liberam objetos
temporários a cada unidade. A sincronização não varre o vault concorrentemente
com a instalação; retoma ao final. Contratos de arquivos, hashes e visual do mapa
continuam iguais. Testes usam vaults isolados e dados sintéticos.

Uma falha transitória de inicialização PGLite pode receber até três tentativas
somente na leitura de status durante o setup. Escritas, consultas normais e erros
persistentes mantêm seus limites. O Oracle não repara nem apaga o banco por esse
sintoma. Falta de espaço durante indexação é informada explicitamente.
