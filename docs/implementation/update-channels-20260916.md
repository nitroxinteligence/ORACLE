# Atualizações: Oracle, acervo e Second Brain — 0.3.14

## Comportamento

O modal mantém três canais independentes: **Oracle** (aplicativo), **Acervo**
(skills, prompts e tutoriais) e **Second Brain · GBrain** (motor).
O recibo dos atalhos locais do Codex aparece dentro do acervo; não representa uma
quarta atualização de software nem confirma que o Codex reconheceu as skills.

A consulta automática é somente `check-only`: na abertura elegível, ao voltar à
janela e, com ela visível/desbloqueada, após uma hora desde a consulta bem-sucedida.
Um único timer de 60 segundos confere se chegou a hora; ele não consulta a rede
em cada tick. Erros usam intervalo progressivo de 5 minutos a 1 hora. Uma consulta
adiada por ocupação não consome tentativas de instalação/indexação. A instalação
continua explícita. Editor aberto e instalação em execução adiam consultas automáticas.
Confiança de hooks Codex e uma instalação antiga pausada não impedem a detecção.

`updateStart` e `updateStatus` continuam vinculados a requestID e revisão. Respostas
antigas não substituem o progresso atual. Somente o executor admitido publica
progresso compartilhado; bloqueios reais, cancelamento da espera e recibos são preservados.

## Fontes e limites

- Oracle: `nitroxinteligence/ORACLE/releases/latest`. Compara a versão instalada
  com a release estável. Valida metadados, nome, arquitetura, tamanho, digest e URL
  do instalador. **Baixar Oracle** abre o download oficial por ação explícita; não
  substitui o app nem declara que o arquivo baixado foi instalado ou notarizado.
- Acervo: `nitroxinteligence/ORACLE-SKILLS/releases/latest`. O arquivo
  `oracle-distribution.json` precisa coincidir com o digest/tamanho/tag da release
  e passar pela assinatura Ed25519 e pelo contrato nativo existentes. Skills,
  prompts e tutoriais seguem a mesma transação verificada e seus recibos.
- GBrain: `garrytan/gbrain/releases/latest`, separado do aplicativo. Detecção não
  substitui a verificação de compatibilidade da ativação em cópia do perfil.

Uma comparação limitada de árvores da branch main com a tag publicada identifica
**Publicação pendente**. Código na branch não é convertido em atualização instalável.
Consulta online com falha não usa silenciosamente o cache como se fosse a release
mais recente. O fallback autenticado de instalação offline permanece separado.

## Causa de novas bibliotecas não chegarem

Os GETs públicos de 16/09/2026 encontraram a release `acervo-2026.09.13.1`,
sequência 3, com 179 skills, 17 prompts e 24 tutoriais. O manifesto foi verificado
com a chave pública do app. **86 arquivos da branch main não estavam no pacote**,
incluindo 25 entradas SKILL.md do Matt Pocock e seis tutoriais Markdown.
Também foram encontrados zero workflows no repositório ORACLE-SKILLS. Um push
isolado não publicava uma distribuição nova.

O aplicativo Oracle publicado estava em v0.3.1; a instalação de desenvolvimento
do mantenedor já estava em 0.3.13. Atualizar o Mac do mantenedor não publica um
novo instalador para os demais usuários.

As evidências públicas e a limitação da comparação com o OS ficam em
`.work/update-publication-20260916/`. Foram consultados 31 caminhos já públicos no
OS: apenas um foi legível e coincidiu com o GitHub; 30 estavam indisponíveis.
Isso não comprova a igualdade integral OS → GitHub e não identifica a causa da
indisponibilidade. Nenhum arquivo pessoal foi usado nos testes.

## Publicação

O procedimento está em `catalog-release-publication.md`. O novo
`scripts/publish-distribution.py` verifica os artefatos assinados e o commit exato
do snapshot final. Sem `--execute`, faz somente preflight. A execução explícita
publica primeiro como draft, verifica todos os assets e só então promove a release.
**Não foi instalado workflow remoto nem publicada release por esta correção.**
Faltam o snapshot real completamente revisado, a assinatura com chave externa
autorizada e a publicação para entregar os 86 arquivos aos usuários.

Skills estruturadas em subpasta de fase têm contrato limitado a sete componentes,
`entry_layout: reviewed-nested`, revisão individual e `minimum_oracle >= 0.3.14`.
Seus recursos permanecem na pasta da entrada. Templates SKILL.md não declarados
como item assinado não são promovidos automaticamente pelo publicador.

## Validação

```sh
node --test scripts/test-update-notice.mjs scripts/test-departments.mjs
python3 scripts/test-update-coordination-web-native.py
python3 scripts/test-distribution.py
python3 scripts/test-publish-distribution.py
```

As suítes nativas `--self-test-update-channels` e `--self-test-update-admission`
exigem `--state` em `.work` e `ORACLE_TEST_ROOT` explícito. As fixtures WebKit usam
interface real com ponte simulada; testes de canais usam transportes sintéticos e
respostas públicas previamente capturadas. Nenhuma dessas provas, isoladamente,
equivale à publicação e instalação de uma release nova no perfil pessoal.
