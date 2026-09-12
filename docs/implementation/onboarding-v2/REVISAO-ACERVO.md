# Revisão do acervo — 12/09/2026

O usuário autorizou distribuir o acervo sob sua licença própria. Os termos e avisos de terceiros foram preservados. A [release assinada `acervo-2026.09.12`](https://github.com/nitroxinteligence/ORACLE-SKILLS/releases/tag/acervo-2026.09.12) foi publicada e contém 1.058 itens: 1.017 skills, 17 prompts e 24 tutoriais.

## Conteúdo preparado

Os 8.657 arquivos originais foram preservados na cópia materializada. O snapshot distribuível aplica 33 adaptações explícitas, vinculadas aos hashes dos arquivos, e acrescenta dez arquivos de licença, avisos e templates originais. São 8.667 arquivos nas três bibliotecas, mais 4.834 arquivos do snapshot GBrain fixado: 13.501 arquivos em 20 pacotes. O OS original não foi alterado.

As adaptações removem diretórios pessoais, tornam parâmetros de máquina explícitos, corrigem referências e declaram recursos externos ausentes. Os dois templates de skills receberam uma variante instalável; o conteúdo upstream completo foi preservado em arquivos auxiliares. Adaptações dos nomes de skills mantêm aviso de modificação.

Os 12 alertas de credenciais correspondem a exemplos públicos ou fixtures não funcionais. As exceções exigem hash exato e contagem de todas as ocorrências; os detectores continuam ativos. Os 141 arquivos restantes com caminhos de máquina foram classificados como documentação, fixtures ou registros upstream, também com hashes. Nenhum desses scripts é executado pelo instalador.

## Licenças e requisitos

Os 830 arquivos de licença originais continuam no snapshot. Os 53 itens sem licença associada receberam cobertura da autorização autoral ou da origem correspondente, preservando atribuições e condições de terceiros. As três bibliotecas incluem a autorização de cópia/distribuição. Impeccable inclui LICENSE e NOTICE do commit `cb56ed6c19a07329a9fa0cd4e657bee040156593`; isso não declara equivalência byte a byte entre toda a cópia local e esse commit. Richard Design conserva seus termos próprios, inclusive a restrição de uso em apostas.

Os requisitos por item distinguem leitura, busca e edição locais de execução por um agente, ferramentas externas, contas e recursos adicionais. A distribuição não declara esses provedores conectados nem as 1.017 skills executadas. Personal branding informa explicitamente os insumos externos de que depende.

## Assinatura e validação

A chave privada está fora do repositório, com permissão 0600. A raiz pública `oracle-distribution-20260912` está embarcada no app. Manifesto assinado: `c539a96c730efebaf5bd7ea27ceb81eeea1e649526348adcb156db842b695f20`.

O publisher passou 23 testes e o espelhador, 35. A instalação real identificou slugs de basename em tutoriais e YAML de templates upstream: o adapter agora mantém a identidade pelo caminho completo e indexa o texto integral dos templates sem executar variáveis ou reescrever os originais. A instalação completa passou após a correção: 13.501 arquivos conferidos, 4.006 documentos e 1.775 links indexados sem falhas, com reabertura verificada. Recibo e limites em VALIDACAO.md.

## Recibos locais

- `.work/onboarding-v2/review-continuation-20260912/release-review-v1/`: revisão final, licença autorizada, adaptações e auditoria.
- `.work/onboarding-v2/acervo-2026.09.12-final-release/`: manifesto, pacotes e hashes.
- `.work/onboarding-v2/acervo-2026.09.12-final-snapshot/`: snapshot completo para publicação.
- `.work/onboarding-v2/publisher-final-corpus-tests.log` e `mirror-reviewed-examples-tests.log`: verificações do publisher/espelhador.
- `.work/onboarding-v2/index-source-tests.log` e `full-corpus-index-preflight.json`: regressão e leitura do acervo.

O estado de publicação, instalação e entrega está em [VALIDACAO.md](VALIDACAO.md). Os rascunhos anteriores foram preservados como histórico, sem substituir esta revisão final.
