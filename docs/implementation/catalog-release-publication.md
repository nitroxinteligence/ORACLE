# Publicar uma atualização do acervo Oracle

## Causa comprovada em 16/09/2026

Às 22:47 UTC, `nitroxinteligence/ORACLE-SKILLS/main` estava em
`8baee49424ba2d7d5abad2f1fb2c9568539002ce`. A API de Actions retornou **zero
workflows**. A última release continuava sendo `acervo-2026.09.13.1`, publicada
em 13/09/2026 às 17:54 UTC, com alvo
`d1151749a392cfce38820235187b6a4278714dcd` e sequência assinada **3**.

O manifesto público foi baixado por GET e sua assinatura Ed25519 conferida com
a chave pública distribuída no app. Seu SHA-256, igual ao digest da API, é
`850fe3c56caf50c5963567396462be21fe1148b98566c153f47a7a5e39ab3f72`.
Ele entrega 179 skills, 17 prompts e 24 tutoriais. **86 caminhos já presentes nas
bibliotecas do main não estão nessa release**, incluindo as 25 entradas Matt
Pocock por fase e seis novos tutoriais Markdown. Contar caminhos ausentes não
conta alterações de conteúdo em caminhos antigos.

Evidências locais: `.work/update-publication-20260916/{main,tree,workflows,
latest-state,latest-manifest-envelope,delivery-gap}.json`. A árvore retornou
`truncated=false`. Na origem OS, a leitura foi limitada aos 25 SKILL.md e aos seis
tutoriais **já públicos**: um arquivo pôde ser verificado e corresponde ao GitHub;
30 retornaram indisponibilidade. A tentativa seguinte, somente de metadados,
foi bloqueada pela ferramenta. `os-public-scope.json` preserva esse resultado;
não há prova de igualdade integral OS → GitHub nem diagnóstico de dataless,
ausência ou permissões para esses 30 arquivos.

O código confirma a separação: `source-mirror.py` prepara fontes localmente;
`build-skills-release.py --distribution` gera o manifesto assinado e os pacotes;
o Oracle consome **release assinada**, não a árvore de `main`. Um push isolado
não torna o novo acervo instalável.

## Fluxo implementado

`scripts/publish-distribution.py` fecha a etapa depois do builder. Por padrão,
cria um staging local novo e faz somente GETs no GitHub. `--execute` é a única
entrada para criar/retomar draft, subir assets e publicar. **Este trabalho não
executou essa opção contra o GitHub e não instalou nenhum workflow remoto.**

O preflight exige `release-receipt.json` completo, assinatura com a chave pública
do app, inventários coerentes, hashes de cada pacote e arquivo, bibliotecas
completas, versão mínima compatível com os itens, URLs oficiais e uma sequência
superior à da última release assinada. A cópia final aparece por rename exclusivo
somente após validação; diretórios existentes são preservados. Uma falha anterior
ao rename pode deixar apenas uma pasta privada `.oracle-publication-*` incompleta.

Os bytes **finais** dos arquivos publicados precisam corresponder exatamente aos
blobs Git do commit informado, que também deve ser o `main` atual. A comparação
cobre skills, recursos-skills, prompts e Tutoriais; não compara metadados Git nem
o bit executável do espelho. Permissões instaladas continuam assinadas no pacote.
Isso detecta fontes antigas, arquivos retidos pelo mirror e adaptações do builder
ainda não enviadas. A tag, quando já existe, deve resolver para esse mesmo commit.

O upload inclui apenas o manifesto assinado e os pacotes listados nele. Reviews,
relatórios, recibos, snapshot de fontes e chaves nunca entram na lista de upload.
Todos os assets são verificados na API por nome, estado, tamanho, SHA-256 e URL
oficial antes de promover o draft a `latest`. Fonte, tag e release anterior são
rechecadas antes dessa promoção. O readback final verifica `latest`, assets e tag.

Falha durante upload mantém o draft. Para retomá-lo, o operador deve informar
seu ID exato em `--resume-draft ID`; somente os assets ausentes são enviados.
Assets diferentes ou adicionais bloqueiam a retomada; não existe `--clobber` ou
exclusão automática. Falha após tentar a promoção informa
`publication_state=unknown-readback-required`: confira o GitHub antes de repetir.
O programa pressupõe uma release estável anterior; não faz bootstrap de um
repositório sem release. Serialize publicações no operador/CI; GitHub não fornece
uma transação abrangendo simultaneamente branch, tag e definição de latest.

## Matt Pocock: contrato explícito, sem mover arquivos

Antes, o builder reconhecia apenas seis componentes:
`SISTEMA/skills/departamento/especialista/skill/SKILL.md`. As 25 entradas novas
têm sete, por exemplo:
`SISTEMA/skills/codigo/matt-pocock/01-getting-started/ask-matt/SKILL.md`.

O builder agora aceita esse formato de **uma fase intermediária** somente quando
`review.items[caminho]` declara `entry_role: "skill"`, `source_sha256` exato,
`license_reviewed: true`, `dependencies_reviewed: true` e um `reason` não vazio.
Esses valores dependem de revisão real; nenhum foi preenchido para o acervo real
nesta tarefa. O hash dessa classificação é dos bytes após adaptações explícitas
e antes da adaptação automática do nome para o host.

O item assinado recebe `entry_layout: "reviewed-nested"`; o manifesto mantém
`skills_layout: "department-specialist-skill"` e passa a exigir
`minimum_oracle: "0.3.14"`. Departamento e especialista continuam nas posições
originais. `required_files` da entrada por fase fica limitado à pasta dessa skill.
Os caminhos originais e seus recursos permanecem no snapshot; fontes do OS não
são regravadas. O suporte do validador nativo deve estar integrado e validado no
Oracle 0.3.14 antes de publicar um acervo com esse contrato.

Um SKILL.md interno a uma skill canônica continua recurso, sem virar outra
entrada. Documentos SKILL.md fora de uma entrada reconhecida exigem classificação;
`entry_role: "resource"` também requer hash, justificativa e revisão individual.
Não classifique as 25 skills reais como recursos para contornar o gate. Árvores
ainda mais profundas precisam de outra qualificação explícita.

`review-distribution.py --skills-layout department-specialist-skill` produz um
**rascunho privado sem aprovações**, separando candidatos por fase de templates
já pertencentes a uma skill e dos templates em recursos-skills.

## Ativação pelo mantenedor

São necessários Python 3 com `cryptography` e PyYAML já provisionados, `gh`, o
snapshot completo revisado, o GBrain local no pin suportado, e uma chave Ed25519
explicitamente selecionada pelo mantenedor fora do repositório. O identificador
público atual é `oracle-distribution-20260912`, em
`Resources/updates/distribution-keys.json`. O builder exige arquivo de chave
owner-only. Não houve busca/leitura de chave privada real, criação de credencial nem
aprovação de licenças reais nesta tarefa. Para publicar, `gh` precisa de acesso
de escrita a releases/conteúdo do ORACLE-SKILLS; as consultas feitas aqui usaram
somente leitura. Não coloque a chave nem o review em um checkout público.

1. **Revisar a fonte completa.** Escolha `CATALOG_SOURCE`, `CATALOG_REVIEW_DIR` e
   os demais caminhos explícitos abaixo. O diretório do rascunho deve ser novo e
   ficar fora da fonte. Revise licenças, dependências, exclusões, adaptações e cada
   candidato por fase. O rascunho nunca é uma autorização de publicação.

   ```sh
   python3 scripts/review-distribution.py \
     --source "$CATALOG_SOURCE" --output "$CATALOG_REVIEW_DIR" \
     --skills-layout department-specialist-skill
   ```

2. **Gerar uma release local assinada.** Selecione uma tag inédita e sequência
   maior que 3 (baseline observado; o publisher reconsulta). `CATALOG_REVIEW`
   aponta para a revisão concluída, `CATALOG_GBRAIN_SOURCE` para o repositório
   local provisionado, e `CATALOG_SIGNING_KEY` para a chave escolhida pelo owner.
   Report, output e snapshot devem ser caminhos novos e separados da fonte.

   ```sh
   python3 scripts/build-skills-release.py --distribution \
     --source "$CATALOG_SOURCE" --review "$CATALOG_REVIEW" \
     --version "$CATALOG_TAG" --sequence "$CATALOG_SEQUENCE" \
     --gbrain-source "$CATALOG_GBRAIN_SOURCE" \
     --key-id oracle-distribution-20260912 --signing-key "$CATALOG_SIGNING_KEY" \
     --report "$CATALOG_REPORT" --output "$CATALOG_ARTIFACTS" \
     --snapshot "$CATALOG_SNAPSHOT"
   ```

3. **Enviar o snapshot final pelo processo já usado pelo mantenedor.** O mirror
   deve receber `CATALOG_SNAPSHOT`, `--libraries all` e
   `--publication-review "$CATALOG_REPORT"`; seu plano/hash/HEADs e preservações
   seguem [o protocolo do mirror](source-mirror-protocol.md). Ele não faz commit
   nem push, e `applied` não garante igualdade quando há preservações. Depois do
   commit/push autorizado das fontes finais, obtenha o SHA completo e informe-o
   como `CATALOG_COMMIT`. O publisher confirmará a igualdade sem confiar só no
   recibo de mirror. Não use o commit antigo `8baee494...` depois de enviar novas
   adaptações ou outras alterações.

   O checkout deve ser independente e ignorar integralmente
   `.oracle-source-mirror/`, conforme o protocolo. Informe os HEADs completos
   já conferidos (`CATALOG_LOCAL_HEAD` e `CATALOG_REMOTE_BASE_HEAD`). O plano
   fica fora do checkout e do snapshot. Gere o plano, revise-o e só então defina
   `CATALOG_PLAN_SHA256` com o `plan_sha256` aprovado para a segunda chamada.

   ```sh
   python3 scripts/source-mirror.py \
     --source "$CATALOG_SNAPSHOT" --libraries all \
     --destination "$CATALOG_CHECKOUT" --plan "$CATALOG_MIRROR_PLAN" \
     --expected-head "$CATALOG_LOCAL_HEAD" \
     --remote-base-ref refs/remotes/origin/main \
     --remote-base-head "$CATALOG_REMOTE_BASE_HEAD" \
     --publication-review "$CATALOG_REPORT"

   python3 scripts/source-mirror.py \
     --source "$CATALOG_SNAPSHOT" --libraries all \
     --destination "$CATALOG_CHECKOUT" --plan "$CATALOG_MIRROR_PLAN" \
     --expected-head "$CATALOG_LOCAL_HEAD" \
     --remote-base-ref refs/remotes/origin/main \
     --remote-base-head "$CATALOG_REMOTE_BASE_HEAD" \
     --publication-review "$CATALOG_REPORT" \
     --apply --reviewed-plan-sha256 "$CATALOG_PLAN_SHA256"
   ```

4. **Conferir e publicar explicitamente.** `CATALOG_NOTES` é um arquivo de notas
   públicas revisadas. O pai de cada staging precisa existir. A primeira chamada
   não publica. A segunda é a ação de publicação, somente com autorização real;
   use outro staging novo. Redirecione a saída para um recibo privado para guardar
   o resultado e o ID do draft em caso de erro.

   ```sh
   python3 scripts/publish-distribution.py \
     --artifacts "$CATALOG_ARTIFACTS" --staging "$CATALOG_PREFLIGHT_STAGE" \
     --source-commit "$CATALOG_COMMIT" --notes "$CATALOG_NOTES"

   python3 scripts/publish-distribution.py \
     --artifacts "$CATALOG_ARTIFACTS" --staging "$CATALOG_PUBLISH_STAGE" \
     --source-commit "$CATALOG_COMMIT" --notes "$CATALOG_NOTES" --execute
   ```

Para automatizar futuras entregas, o processo que hoje envia as fontes precisa
invocar essas etapas após revisão/assinatura, com um único publicador por vez.
Um job protegido pode chamar o mesmo wrapper; o script local sozinho **não**
instala esse job. Nunca assine `main` indiscriminadamente após todo push. Falta
configurar esse acionamento, a revisão real, o signer escolhido e a primeira nova
release. O canal de releases do aplicativo ORACLE é independente deste publisher
de acervo; atualizar só um aplicativo local também não publica uma nova versão.

## Validação e referências

```sh
python3 scripts/test-distribution.py
python3 scripts/test-publish-distribution.py
```

As suítes usam fontes e chaves descartáveis. Exercitam inclusão explícita por
fase, templates preservados, gates de revisão, recursos, assinatura, hashes,
atomicidade, sequência, divergência remota, upload interrompido, retomada e
readback. As mutações GitHub são simuladas; os GETs do manifesto público são
evidência separada. Logs desta execução ficam em
`.work/update-publication-20260916/*tests-final.log`.

Contratos oficiais consultados: [Releases REST](https://docs.github.com/en/rest/releases/releases),
[assets REST](https://docs.github.com/en/rest/releases/assets) e
[GitHub CLI release create](https://cli.github.com/manual/gh_release_create).
