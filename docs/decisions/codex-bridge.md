# Ponte Codex com cobertura explícita

O Oracle recebe metadados de hooks documentados e preserva recibos. Não consulta bancos privados nem presume acesso ao app-server de uma instância Desktop já aberta.

| Evidência | Estado permitido |
|---|---|
| Hook recebido | Evento observado naquele caminho |
| Stop | Turno encerrado, objetivo não verificado |
| Nenhum evento | Desconhecido |
| Arquivo/pacote encontrado | Presente, sem inferir execução |
| Plugin no catálogo | Conexão não verificada |

O payload persistido exclui prompts, transcrições, argumentos e saídas de ferramentas. A confiança dos hooks pertence ao Codex; instalar a integração não a concede. Ferramentas hospedadas e caminhos especializados podem ficar fora da cobertura. A configuração usa cópia do pedido e abertura do Codex como fallback.

Referência: [documentação oficial de hooks](https://learn.chatgpt.com/docs/hooks), consultada em 7 de setembro de 2026. A observação ao vivo no Desktop do usuário ainda exige ativação e confiança da integração. Fixtures validam o receptor, sem serem apresentadas como eventos reais do Desktop.
