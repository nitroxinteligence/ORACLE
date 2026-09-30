# Oracle 0.3.20: pacote developer para o feed existente

O artefato desta atualização usa assinatura ad hoc, canal `developer`, macOS 13+
e arm64. Não possui Developer ID, notarização Apple ou homologação Gatekeeper.
A publicação do código e do ZIP no GitHub não equivale a essas qualificações.
Os gates de `scripts/release.sh` continuam obrigatórios para o canal Apple release.

O feed atual consulta a última release estável do repositório ORACLE. Ele exige
versão numérica superior, release sem draft/prerelease, URL oficial, asset único
`Oracle-0.3.20-macos-arm64.zip`, tamanho e digest SHA-256 publicados pelo GitHub.
O instalador confere identidade, fonte limpa, commit, assinatura íntegra e arm64.
O contrato existente aceita assinatura ad hoc; nenhum gate foi modificado.
Uma prerelease fica disponível para download, mas não propaga nesse feed.

As fontes de versão são `package.json` e `Resources/updates/sources.json`.
`CFBundleVersion` vem de `ORACLE_BUILD_NUMBER` ou da contagem dos commits em HEAD.
O build anterior tinha número 115. O novo número precisa ser superior a 115;
após um único novo commit a contagem será 116. A proveniência deve identificar
o commit final, e não o candidato anterior com `dirty:true`.

Depois da revisão e commit explícito das alterações autorizadas, o coordenador
executa o build clean existente. Nenhuma instalação de dependências é implícita:

```sh
export ORACLE_BUN_BIN="$PWD/.work/readiness-provision/toolchains/bun-1.3.10/bun"
export ORACLE_BUILD_NUMBER="$(git rev-list --count HEAD)"
bash scripts/build.sh --channel developer
bash scripts/package-developer-update.sh --channel developer --preflight
bash scripts/package-developer-update.sh --channel developer
```

O empacotador só aceita um bundle sob `.work`, fonte limpa e manifest developer
correspondente ao commit/hash atual e aos pins provisionados. Confere assinatura
ad hoc e arm64 dos três executáveis, limites do atualizador, ausência de arquivos
privados e symlinks pela política existente, estrutura do ZIP e bundle extraído.
Reconfere a fonte antes de publicar localmente, sem sobrescrever artefatos.

A saída fica em `dist/Oracle-<versão>-<buildID>-developer-arm64/`, com o ZIP de
nome canônico, `SHA256SUMS.txt` e `developer-update-report.json`. O relatório
mantém `developerIDSigned`, `notarizationAccepted` e `gatekeeperQualified` falsos.
Não contém caminhos de perfis pessoais, licenças ou dados do vault.

O script não faz commit, push, release GitHub, instalação ou mudança do feed.
Essas operações pertencem ao coordenador e à autorização correspondente.
Uma release estável deve declarar expressamente a assinatura ad hoc e a ausência
de notarização. A propagação depende da consulta e ação explícita de cada usuário;
Gatekeeper e a primeira abertura em outro Mac precisam de evidência separada.

O pipeline Apple permanece separado: fonte limpa, identidade Developer ID,
entitlements revisados, hardened runtime, timestamp, notarização Accepted,
stapling e verificações Gatekeeper. Não renomear o pacote developer como release
nem preencher recibos Apple sem resultados reais.
