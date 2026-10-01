# Recuperação da integração Codex após atualizar o Oracle

O Oracle 0.3.20 mudou o manifesto do método distribuído com o app. Uma integração preparada por uma versão anterior podia continuar com arquivos intactos e mostrar a mensagem “O pacote oficial mudou; prepare novamente a ponte preservando edições.” A interface oferecia abrir, copiar e verificar, sem oferecer o repreparo necessário.

A correção da 0.3.21 expõe **Atualizar integração local** quando a ligação preparada usa outro manifesto ou executáveis indisponíveis. A ação exige acesso de configuração, ausência de instalação em andamento e validações próprias. Ela atualiza somente os arquivos e recibos gerenciados da ponte. O plano confirmado não é convertido em um novo onboarding.

Instalação inicial e atualização da ponte são contratos diferentes. As etapas de instalar, indexar e concluir continuam exigindo os hashes fixados no plano. O reparo admite o adapter do app atual e um runtime oficial já aprovado pelo atualizador, com assinatura, procedência, propriedade e hashes conferidos. A mudança dos arquivos da ponte fica registrada separadamente.

O índice pode ter sido atualizado depois da instalação. Seu recibo atual de sincronização deve corresponder aos bytes do manifesto integral do mesmo vault. O manifesto inicial não é tratado como o estado permanente do índice. Sem prova integral, diante de uma transação pendente, pacote incompatível ou conflito com edição humana, o reparo deve recusar a atualização e preservar os arquivos.

A conferência no aplicativo instalado revelou também uma retomada sem avanço na conclusão de um índice com mais de dois mil documentos. Os imports já estavam verificados, mas a preparação das relações recomeçava a cada janela de 25 segundos. As retomadas por limite de tempo agora podem solicitar uma janela explícita de 120, 240 ou 480 segundos, com timeout de processo correspondente. O coordenador mantém o limite de oito tentativas, reinicia a janela quando o snapshot muda e libera uma nova rodada depois de uma conclusão integral. Notificações sem mudança real não renovam tentativas de uma indexação parcial. Cancelamento, conflitos, verificação integral e transação única continuam obrigatórios; um checkpoint parcial nunca certifica a ponte.

Preparar arquivos não concede confiança a hooks, captura de conversas, execução pelo modelo, manutenção externa ou backup remoto. Essas verificações e permissões continuam separadas. O reparo não altera o requisito AI Memory de planos anteriores nem inicializa uma nova memória por conta própria.

As verificações desta correção usam vaults, licenças e perfis sintéticos em `.work`. O diagnóstico do perfil pessoal e suas cópias de recuperação ficam fora da publicação. O pacote de desenvolvimento continua arm64, macOS 13+, com assinatura ad hoc e sem notarização Apple.

Em 1 de outubro de 2026, a compilação do candidato passou com Bun 1.3.10 e verificação de assinatura local. A suíte real isolada de distribuição e onboarding passou 142 checagens: as 124 existentes e 18 específicas de repreparo. Os casos novos incluem índice integral com geração zero, pacote com arquivos adicionados e removidos, interrupção depois do manifesto novo, edição humana preservada, índice parcial ou adulterado recusado, pin incompatível recusado e plano/consentimentos intactos. Os quatro testes focais da interface também passaram, cobrindo ação nativa, bloqueio de cliques duplicados, conflito e resposta tardia.

Para a retomada do índice, seis cenários adicionais passaram com o PGLite oficial real, incluindo conclusão após uma janela esgotada sem novos imports, rollback diante de edição concorrente, falha na transação e recuperação com o snapshot verificado. A política de orçamento também passou verificações focais TypeScript e Swift.

Esse resultado comprova os cenários exercitados pelo harness. A assinatura, instalação e funcionamento da versão final no Mac são verificações posteriores e separadas. Não comprova confiança de hooks nem captura de conversas pessoais no Codex.
