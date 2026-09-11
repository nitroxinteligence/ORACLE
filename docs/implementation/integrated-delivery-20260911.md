# Oracle 0.3.0 — integração local de 11/09/2026

Integração do onboarding `7437849` e auditoria completa `b1d5d73` no worktree
`onboarding-implementation-20260910`. Sem reiniciar a auditoria, substituir o
GBrain oficial, instalar provedores ou usar dados pessoais como testes.

## Resultado validado antes do empacotamento

| Escopo | Resultado | Evidência local |
|---|---|---|
| Swift release e seis suítes nativas | 481 verificações aprovadas; fontes estáveis | `.work/validation-20260911/native-result.json` |
| Departamentos, navegação, bibliotecas e leitor | 43 testes aprovados | `.work/integrated-audit-ui/javascript.log` |
| Contratos integrados do Atlas | 8 testes aprovados | `.work/integrated-audit-ui/atlas-audit.log` |
| WKWebView real, ponte simulada | 48 verificações aprovadas | `.work/integrated-audit-ui/result.json` |
| SDK MCP real, adapter compilado, GBrain/PGLite | 68 verificações aprovadas, oito seções completas, rede negada | `.work/mcp-protocol/latest.json` |

As contagens são de escopos diferentes, não uma certificação geral. A execução
MCP final usou perfil novo `state/gbrain/profile`, eventos em `state/events` e
recibo de propriedade versão 2, iguais ao contrato nativo. Os dois testes que
esperavam mensagens antigas de recusa foram alinhados; nenhuma proteção foi
removida. O teste de fechamento da interface aguarda o término da ação assíncrona.

## Comportamento integrado

Instalação e retomada locais não exigem login ou modelo Codex. Readback de
identidade e retomada são ações separadas. A conclusão abre diretamente o gráfico,
sem exercício inicial ou tour obrigatório. Pedidos diretos ORACLE-MAC2 e convites
ORACLEINV2 permanecem disponíveis; licenças assinadas não são substituídas por
preferências de interface nem por um UUID antigo.

Departamentos, especialistas e skills usam o catálogo completo, com paginação,
busca e atribuições salvas. Os caminhos originais são preservados. A escala de
118% vale também para navegação, retorno, resize e foco em uma skill. O renderer
ativo permanece SVG 2D. Leitor, editor com rascunhos concorrentes, bibliotecas e
atualizações conhecidas em falha/offline foram conciliados.

Manutenção local, captura, síntese remota e backup mantêm consentimentos separados.
MCP escreve somente na memória canônica autorizada; leituras derivadas recusam
conteúdo desatualizado. O protocolo real verificou isolamento de fontes, limites,
fila concorrente, persistência, atualização externa e reconexão.

## Limites desta entrega

Pré-lançamento local para macOS 13+ arm64, assinado ad hoc. Não equivale a
Developer ID, notarização, qualificação Intel/segundo Mac ou ativação física de
licença no Keychain. O compilador Bun disponível é 1.3.8; o upstream fixado exige
>=1.3.10 para toolchain suportada. Os testes desta composição passaram, mas essa
diferença impede apresentar o pacote como release qualificado por aquela matriz.

Não foi executada inferência real com uma conta Codex. Indexação e consultas
determinísticas offline não demonstram inferência de IA offline. Agendamento
externo não foi registrado; manutenção temporizada depende do Oracle aberto e
desbloqueado. Backups cobrem o banco, não todos os anexos do vault.

Fontes privadas, perfis sintéticos, logs e cópias de recuperação em `.work` não
integram o Git nem o aplicativo. Cópias antigas de engines e bancos sintéticos
foram retiradas com recibos, preservando fontes, relatórios e dados pessoais.
