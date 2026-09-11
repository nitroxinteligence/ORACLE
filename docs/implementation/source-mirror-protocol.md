# Espelho de fontes — preparação local revisável

## Contrato e fronteira

`scripts/source-mirror.py` prepara uma cópia lógica de `OS/SISTEMA/skills/...` em
`ORACLE-SKILLS/SISTEMA/skills/...`. `--source` recebe a raiz **OS**, como em
`build-skills-release.py`; não recebe diretamente a pasta `skills`. `--destination`
recebe a raiz de um checkout Git independente, com `.git` como diretório local.
As duas raízes e o arquivo de plano são explícitos, separados e sem links.

O comportamento padrão é **dry-run**: somente um novo manifesto `--plan` é escrito.
O programa não publica, não cria release, não faz stage/commit/fetch/push, não
executa arquivos de skills e não solicita download/hydration de iCloud. Não há
serviço, agendador, integração com GitHub ou ação de exclusão de arquivo original.
Os arquivos `build-skills-release.py` e `catalog_safety.py` não foram modificados;
o segundo fornece o preflight de padrões de credenciais, importado diretamente.

**Pré-requisito de privacidade:** `.oracle-source-mirror/` deve estar integralmente
ignorado por uma regra local do checkout (por exemplo, `/.oracle-source-mirror/`
em `.gitignore` ou `.git/info/exclude`) e nenhum item desse diretório pode estar
tracked. O comando só verifica, sem criar/editar regras ou remover algo do índice.
Sem essa proteção, recusa inclusive o planejamento, antes de escrever controle.
`git ls-files` verifica tracked independentemente, antes de `git check-ignore
--no-index`; assim essa opção nunca mascara um controle que já esteja no índice.
Os arquivos de ignore relevantes são vinculados ao plano e mudanças invalidam a
aplicação. Nenhuma regra global de ignore é utilizada como garantia de proteção.

## Revisão e execução

Exemplo de sintaxe; os caminhos e hashes abaixo são marcadores, não autorizações
para executar sobre o vault ou checkout real:

```sh
python3 scripts/source-mirror.py \
  --source /caminho/revisado/OS \
  --destination /caminho/revisado/ORACLE-SKILLS \
  --plan /pasta-de-revisao/plano-novo.json \
  --expected-head <OID_LOCAL_COMPLETO> \
  --remote-base-ref refs/remotes/origin/main \
  --remote-base-head <OID_LOCAL_DA_REF_REMOTA>
```

Revise caminhos, hashes, ações de preservação e os limites deste documento.
Para aplicar, repita os mesmos argumentos acrescentando `--apply
--reviewed-plan-sha256 <plan_sha256>`. O hash é SHA-256 da representação JSON
canônica do plano sem o próprio campo `plan_sha256`: chaves ordenadas,
`ensure_ascii=True`, separadores compactos `,` e `:`. Não é o hash dos bytes
arbitrariamente formatados do arquivo. O plano pode ser relido, mas não alterado
após a revisão; chaves JSON duplicadas são rejeitadas.

O plano contém os inventários completos limitados da origem e do checkout,
incluindo identidades locais, checksums e modos de arquivos, o registro anterior
de propriedade e a identidade Git observada. Aplicar um plano obsoleto recusa a
operação antes de modificar os arquivos de conteúdo. Arquivos de plano já
existentes nunca são sobrescritos durante dry-run. Todo diagnóstico omite os
conteúdos de arquivos e o stderr arbitrário do Git.

## Propriedade e preservação

| Ação | Comportamento |
|---|---|
| `add` | Cria somente um destino ausente, não reivindicado pelo índice Git. |
| `update` | Atualiza somente um arquivo previamente adicionado por este espelho e ainda igual ao checksum/modo registrados. O original é retido no diário. |
| `unchanged` | Mantém o arquivo; não regrava seus bytes. |
| `preserve_unowned` | Não adota nem sobrescreve arquivos anteriores ao espelho, mesmo quando têm bytes idênticos à origem. |
| `preserve_unowned_deleted` | Mantém ausente um arquivo conhecido pelo índice Git, mas removido localmente antes do primeiro espelho. |
| `preserve_user_edit` | Mantém edições ou alterações de permissões no destino. |
| `preserve_destination_deleted` | Não ressuscita um arquivo que o espelho conhecia e o usuário removeu no checkout. |
| `preserve_source_deleted` | Mantém o destino e a última propriedade conhecida quando o original desaparece da origem. |
| `preserve_parent_conflict` / `preserve_spelling_conflict` | Não converte arquivos em diretórios nem mistura nomes conflitantes por caixa ou normalização Unicode. |

O registro não perde a última propriedade conhecida em exclusões ou conflitos.
Não há adoção automática de um checkout preexistente nem opção de exclusão
propagada. Portanto, este é um **espelho conservador de preparação**, não uma
sincronização destrutiva que promete igualdade exata entre as duas árvores.
Um resultado `applied` pode incluir preservações: examine as contagens e ações.

## Diário antecipado, travamento e retomada

O controle fica em `DESTINATION/.oracle-source-mirror/`, nunca em `.git`:

```text
ownership.json
lock
journal.json
transactions/<plan_sha256>/plan.json
transactions/<plan_sha256>/<índice>.stage
transactions/<plan_sha256>/<índice>.before
transactions/<plan_sha256>/<índice>.receipt.json
```

Esse controle contém caminhos locais, manifesto e backups; é privado, não é fonte
nem release e **nunca deve ser publicado**. A exclusão obrigatória previne inclusão
acidental por um `git add -A` futuro normal; não protege contra `git add -f` nem
contra a remoção deliberada da regra depois da execução. O comando não realiza
nenhuma dessas ações. A saída resumida do CLI não imprime os caminhos privados;
o próprio manifesto solicitado deve permanecer em uma pasta privada de revisão.

Um `flock` local impede duas instâncias cooperantes. Cada mudança de fase do
diário usa arquivo temporário privado, `fsync`, substituição atômica e `fsync` do
diretório. O diário da intenção existe antes de qualquer mudança de conteúdo.
As transferências de arquivos usam rename exclusivo sem sobrescrita (macOS:
`renameatx_np(RENAME_EXCL)`; Linux: `renameat2(RENAME_NOREPLACE)`). Sistemas sem
esse suporte são recusados, sem fallback para substituição destrutiva.

Em um update, o original revisado vai para `.before`, e somente então o arquivo
preparado ocupa seu caminho com rename exclusivo. **Não é uma transação atômica
de toda a árvore**: existe uma janela recuperável na qual esse caminho está
ausente. Os originais arquivados permanecem disponíveis; não há coleta automática.
Arquivos novos são gravados com modo `0644`; scripts são apenas bytes, nunca
executados. Apenas temporários criados pelo próprio método de gravação podem
ser removidos automaticamente.

Após uma interrupção, repita o plano/hash/raízes/HEADs usando `--resume`, em vez
de `--apply`. A retomada exige a mesma origem revisada e aceita no destino somente
as mudanças comprovadas pelo diário, identidades dos arquivos preparados e
recibos. Uma retomada de transação já concluída verifica o resultado e retorna
`already-applied`. Uma transação pendente bloqueia a geração de outro plano.

Mudança da origem, dos HEADs, do índice, do registro de propriedade, de um backup
ou de arquivos não previstos faz a retomada parar. Não há rollback cego: preserve
o diário e `.before` para recuperação manual revisada. Não apague o controle
como tentativa de destravar a publicação. Um editor não cooperante que cria um
arquivo durante a instalação nunca é sobrescrito pelo rename exclusivo. Quando
uma edição concorre com o arquivamento do original, sua identidade é conferida
e a restauração só ocorre se o caminho estiver vazio; caso contrário, o backup
fica preservado para intervenção manual. Pause outros escritores durante o uso.

## Segurança, completude e limites

O preflight usa descritores de diretórios e `O_NOFOLLOW` em todos os componentes,
recusando links simbólicos, arquivos com múltiplos hardlinks, itens não regulares,
paths de travessia, arquivos ocultos da origem, itens sem acesso e flags dataless
antes de ler seu conteúdo. Revalida inventário/identidades após a leitura. Origem
ausente, vazia ou sem `SKILL.md` recusa o plano; um desaparecimento parcial nunca
gera exclusão no destino. Não é possível distinguir toda exclusão intencional de
uma sincronização externa incompleta; o contrato resolve isso preservando ambas.

Os tipos de arquivo e limites individuais seguem a referência do builder de
release: texto até 2 MB e imagens até 5 MB, com 5.000 arquivos/50 MB por origem.
O inventário do destino é limitado a 10.000 arquivos/200 MB, 32 MB por arquivo e
20.000 entradas; checkouts maiores são recusados. Novos nomes reais de
especialistas são permitidos no espelho, mas isso **não** amplia automaticamente
a compatibilidade da release, que continua sujeita ao seu próprio validador.

O scanner compartilhado bloqueia padrões comuns de credenciais e chaves privadas,
não todos os dados pessoais ou segredos possíveis. Revisão humana de conteúdo e
licenças continua obrigatória. Arquivos não pertencentes ao espelho permanecem no
checkout e não recebem uma certificação de publicação. O manifesto não é assinado
e o controle não é uma fronteira contra um invasor que pode alterar arquivos como
o mesmo usuário. Não houve qualificação de filesystem remoto ou perda física de
energia; os testes de falha injetam interrupções em fronteiras do protocolo.

## Git e situação remota

As únicas leituras executadas são `git rev-parse`, `git ls-files --cached -z` e
`git check-ignore --no-index -z --stdin`,
com ambiente Git reconstruído, configuração global/sistema desativada,
`GIT_OPTIONAL_LOCKS=0`, `GIT_NO_LAZY_FETCH=1`, hooks/fsmonitor desativados e
protocolos de transporte negados. O programa compara HEAD, referência de branch,
índice, configuração, `.gitignore`, `.git/info/exclude` e o OID da ref remota
**já armazenada localmente**. `core.excludesFile=/dev/null` impede que exclusões
globais ou externas sejam confundidas com uma proteção do próprio checkout.
Checkout com `.git` indireto, alternates ou configuração incluída/estendida exige
qualificação separada e é recusado nesta versão conservadora.

`--remote-base-head` não consulta rede e não prova que o remoto permaneceu igual.
Todos os resultados declaram **`remote_sync: "unverified-no-fetch"`**. Uma futura
verificação oficial por fetch e a decisão de publicar requerem outra autorização
e outra revisão; não fazem parte deste comando. O espelho não verifica histórico,
assinatura de commits ou identidade de um repositório remoto.

Referências de contrato consultadas: documentação oficial Git (`git-rev-parse`,
`git`, opções de bloqueios opcionais/lazy fetch) e Python (`os`, descritores de
diretório, `fsync` e substituição atômica). Não se usa conteúdo de skills como
instrução executável para a ferramenta.

## Evidência reproduzível

`scripts/test-source-mirror.py` usa somente `.work/publisher-worker`. O Git real
lê referências e um índice **fictícios**, escritos pelo teste como dados de
protocolo; não se chama `init`, `add`, `commit`, `update-ref`, `fetch` ou `push`,
nem se cria histórico Git. Dataless é simulado, sem tocar iCloud. Os casos cobrem
planejamento/aplicação, propriedade, exclusões preservadas, planos/HEADs obsoletos,
paths inseguros, segredos sem vazamento, concorrência e retomada em dez pontos
de interrupção, além de ENOSPC anterior à primeira mudança de conteúdo.

O relatório do último run fica em `.work/publisher-worker/result.json`, com
contagens reais, hashes de scripts e caminho descartável da execução. O log é
`.work/publisher-worker/tests.log`. Os testes desta entrega foram executados com
sandbox macOS negando rede, dados privados fora do worktree e escritas fora desse
scratch, com HOME/TMPDIR explícitos. A primeira execução foi bloqueada ao abrir
descritores de diretórios ancestrais; o perfil foi corrigido somente para os nomes
literais desses diretórios, sem liberar seus arquivos privados. O segundo run
passou os primeiros 24 casos; o relatório final inclui os casos adicionais.

Não houve execução sobre o OS real, ORACLE-SKILLS real, Core, aplicativo instalado
ou arquivos de outra sessão. Somente `.work/publisher-worker` é descartável nesta
frente; os três arquivos novos de código/teste/protocolo são a entrega.
