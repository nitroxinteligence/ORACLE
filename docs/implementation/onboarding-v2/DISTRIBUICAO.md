# Preparação da distribuição v3

O instalador consome `oracle-distribution.json`, assinado por Ed25519, e os pacotes listados nesse manifesto. A cópia do OS, a revisão do acervo e a publicação são operações do mantenedor; o aluno apenas baixa e instala. Nenhum comando abaixo publica automaticamente.

## Entradas e revisão

A fonte deve conter somente as três árvores `SISTEMA/skills`, `SISTEMA/prompts` e `SISTEMA/tutoriais`. O snapshot de saída usa `SISTEMA/Tutoriais`, conforme o contrato do aplicativo. A fonte original permanece intacta.

`build-skills-release.py --distribution` encaminha ao novo publisher. O inventário funciona sem chave, conta ou inferência:

```sh
python3 scripts/build-skills-release.py --distribution \
  --source /caminho/da/fonte \
  --inventory-only --report .work/inventario-novo.json
```

Relatórios e destinos precisam ser novos. Arquivos dataless bloqueiam o empacotamento; um pedido de download ao macOS não substitui a leitura e verificação dos bytes.

Para preparar evidências privadas por item, sem aprová-las:

```sh
python3 scripts/review-distribution.py \
  --source /caminho/da/fonte-materializada \
  --output .work/revisao-nova
```

O rascunho associa arquivos de licença por ancestral mais próximo, preserva avisos de dependências aninhadas e aponta manifests e linhas de pré-requisitos. Rótulos MIT/Apache são candidatos encontrados no texto, não uma autorização automática. Ausência de evidência de dependência não significa ausência de requisito. Os campos de aprovação permanecem falsos.

O arquivo de revisão é privado e separado da saída pública. Ele contém:

- `content_reviewed: true` e `source_inventory_sha256`: vinculam a revisão aos bytes exatos, antes das adaptações.
- `licenses`: inventário de licenças efetivamente revisadas, com caminho e identificação da licença.
- `items`: mapa pelo documento de entrada, usando os caminhos de saída. Cada item precisa de `license_reviewed`, `dependencies_reviewed` e `dependencies`. Campos opcionais: `id`, `name` e `department_id`.
- `renames`: objetos com `id`, `from` e `to`. Reutilizar o ID anterior é obrigatório quando se declara um renome. O instalador recusa mudança de caminho do mesmo ID sem o mapeamento correspondente.
- `exclusions`: somente metadados não publicáveis explicitamente identificados pelo inventário, com motivo e hash. `.DS_Store` e os dois metadados reconhecidos de `node_modules` também admitem `metadata_only: true` e tamanho exato. Isso não permite excluir arbitrariamente conteúdo.
- `file_adaptations`: adaptações de texto revisadas, com `path`, `source_sha256`, `result_sha256`, `reason` e `replacements` (`before`, `after`, `count`). Os dois hashes e a quantidade de ocorrências precisam conferir. A auditoria normal também verifica o resultado. O manifesto público registra motivo e hashes, sem incluir o texto original das substituições. O arquivo de revisão continua privado.
- `supplemental_files`: arquivos novos de licença, avisos ou templates upstream preservados, com conteúdo e hash conferidos. Não substituem arquivos existentes nem permitem sair das três bibliotecas.
- `publication_examples`: exemplos públicos ou fixtures não funcionais aprovados pelo hash do arquivo inteiro e pelas contagens exatas dos padrões. Não desativa detectores em pastas ou permite chaves privadas completas.
- `machine_path_reviews`: classificação explícita de caminhos em documentação, fixtures ou registros upstream, vinculada ao hash. Caminhos pessoais efetivos exigem adaptação.

Não preencher os campos de revisão em massa para contornar problemas. Referências fora das três árvores, requisitos não declarados, licenças ausentes e ocorrências detectadas como credenciais precisam de análise. O relatório omite o valor de possíveis segredos. Adaptações do `name` das skills ocorrem apenas na cópia distribuída e incluem proveniência.

## Assinatura e snapshot

A chave Ed25519 privada fica fora do repositório, com permissões exclusivas do mantenedor. A raiz `oracle-distribution-20260912` foi configurada em `Resources/updates/distribution-keys.json`; a chave privada fica em `~/.config/oracle/distribution/private/oracle-distribution-20260912.pem` (0600, diretórios 0700). O par foi conferido por assinatura/verificação local. Não reutiliza a chave de licença e não equivale a Developer ID da Apple.

Fingerprint SHA-256 da chave pública: `4903ac40252d11148a71e065dcdb8a5ae8fc23b730736b887d4d48b9824bddec`. Preservar a chave privada em armazenamento seguro do mantenedor antes da publicação; uma perda posterior exige rotação da raiz por nova versão assinada do app. Nenhum backup externo foi realizado nesta execução.

Após a revisão e a configuração explícita da chave:

```sh
python3 scripts/build-skills-release.py --distribution \
  --source /caminho/da/fonte-materializada \
  --version acervo-VERSAO --sequence NUMERO \
  --review /caminho/privado/revisao.json \
  --gbrain-source vendor/gbrain \
  --signing-key /caminho/privado/distribuicao.pem --key-id ID \
  --output .work/release-nova --snapshot .work/snapshot-revisado \
  --report .work/revisao-release-nova.json
```

O snapshot upstream corresponde ao commit fixado do GBrain; o código não é executado. O marcador `release-receipt.json` é gravado por último. `complete: true` nesse recibo significa pacote local concluído; `published` continua falso.

O espelhador aceita `--libraries all` com o snapshot revisado como fonte. Continua exigindo dry-run, hash exato do plano e revisão do estado Git. Ele não faz commit, push nem release. Antes da publicação, conferir novamente os hashes de todos os assets e a assinatura do manifesto. Publicar somente a cópia revisada e os assets; nunca a revisão privada, a chave ou o restante do OS.

Quando há exemplos aprovados, passar o relatório final do publisher em `--publication-review`. O espelhador revalida os hashes; não aceita a aprovação para outros bytes. Para um repositório inicialmente vazio, conferir a relação exata de arquivos e hashes do snapshot antes do primeiro commit. Publicar a release somente depois de carregar e conferir todos os assets em rascunho.

## Limites efetivos

Pacotes: até 1.000 arquivos, 32 MB expandidos e 44 MB codificados. Distribuição: até 30.000 arquivos e 512 MB. Markdown indexável: 2 MB por arquivo, 128 MB no inventário textual e 60.000 notas. O código upstream, fora do vault, tem orçamento próprio por arquivo. As dependências e serviços externos das skills não são executados pelo instalador.

A homologação da distribuição real, assinatura Developer ID, notarização e qualificação do host continuam descritas em `IMPLEMENTAR.md`. Um bundle developer ad hoc e testes sintéticos não as substituem.
