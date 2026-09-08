# Navegação dos modais do Oracle

Todos os modais HTML usam um breadcrumb com **Voltar**, ancestrais clicáveis e identificação da tela atual. O caminho reflete a navegação realizada, começando no universo. Fechar encerra a sequência; Voltar recupera a tela anterior.

| Superfície | Caminho / retorno |
| --- | --- |
| Busca de notas e skills | Universo → Busca → Documento; retorna com consulta, resultados e seleção preservados |
| Leitor de documento e links internos | Origem → Documento → Documento relacionado; volta ao leitor anterior |
| Editor, comparação e recuperação de rascunho | Documento → Editor → Suas alterações; voltar ao editor mantém o texto; sair dele respeita a proteção do rascunho |
| Ajustes | Universo → Ajustes do Oracle |
| Codex e plugins | Ajustes → Codex e plugins → Plugins → Detalhe; abertura direta usa a origem real |
| Conversas importadas | Universo → Conversas → Conversa |
| Instruções de projetos | Universo → Instruções dos projetos → Instrução encontrada |
| Memória e notas da memória | Origem → Memória → Nota; consulta e resultados são preservados |
| Revisão de contexto | Origem → Revisar contexto; voltar não confirma o contexto |
| Desconexão de pastas | Ajustes → Desconectar pastas; voltar não desconecta |
| Histórico técnico e diagnóstico do atlas | Origem → Histórico técnico / Diagnóstico do atlas |
| Atualizações | Origem → Atualizações; voltar não instala atualização |
| Retomada da configuração | Origem → Continuar sua configuração |
| Configuração inicial | Universo / Ajustes → Configuração → Acesso, Codex, Obsidian, Identidade, Objetivos, Preferências e Revisão |
| Execução da configuração | Configuração → Progresso → Confirmação / Solicitação do Codex; voltar não aprova nem cancela trabalho |
| Sobre o Oracle (alerta nativo) | Oracle → Sobre o Oracle; botão Voltar |
| Falha ao guardar rascunho na saída (alerta nativo) | Oracle → Editor → Rascunho; botão Voltar ao editor |

Os seletores de arquivos e prompts de autenticação pertencem ao macOS e preservam seus controles nativos.

## Implementação

- `Resources/web/app.js`: navegação central em `modal`, `modalBreadcrumb` e `modalBack`. Mantém os nós DOM das telas anteriores, seus controles, rolagem e contexto do editor. Atualizações da mesma tela não criam degraus duplicados. Respostas assíncronas continuam vinculadas à tela que as iniciou.
- `Resources/web/onboarding.js`: breadcrumb em todas as chamadas de `frame`, com retorno por etapa e preservação das respostas. A navegação não executa instalação, aprovação ou confirmação.
- `Resources/web/style.css`: apresentação compartilhada, rolagem horizontal para caminhos extensos e semântica de navegação com `aria-current`.
- `Sources/Oracle/main.swift`: trilha nos dois alertas nativos do aplicativo.

## Verificação

Verificação no AppKit/WKWebView: cadeia de plugins, retorno da busca com consulta e resultados, editor ↔ comparação, proteção de alterações não salvas e recuperação do rascunho. Configuração exercitada com bridge de teste: 12 verificações, sem instalar, conceder permissão ou confirmar identidade. Compilação Swift concluída.
