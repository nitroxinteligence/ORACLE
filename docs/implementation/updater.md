# Atualizador Oracle 0.2

O botão no canto inferior direito consulta as fontes e aplica somente versões compatíveis nessa execução. O trabalho usa uma fila nativa separada; abrir notas, acompanhar o progresso e fechar a janela de atualizações não bloqueia a operação. Não existe agenda de atualização contínua.

## Fontes

- Second Brain: `https://github.com/garrytan/gbrain`, releases oficiais. A versão integrada `0.48.4.0` está na matriz de compatibilidade `Resources/updates/sources.json`. A consulta de 7 de setembro confirmou essa versão como atual.
- Cognee: `https://github.com/topoteretes/cognee`, avaliação concluída; não adotado. Não há execução/instalação.
- Repositório central de skills: **não configurado**. O URL futuro não foi inventado. Há um campo nos ajustes de atualizações para registrá-lo quando existir.
- Os cinco repositórios do catálogo já integrado continuam identificados nos detalhes; nenhum é apresentado como o futuro repositório de Mateus.

## Atualização do motor

A matriz é uma allowlist explícita de tag, commit do adaptador, plataforma, versão mínima do Oracle e SHA-256 do artefato oficial. Uma versão nova não aprovada aparece como “Compatibilidade pendente”. O usuário precisa de um build Oracle com adaptador validado antes de atravessar essa fronteira.

O download ocorre em HTTPS a partir dos hosts GitHub permitidos, sem cookies ou credenciais. O hash precisa corresponder ao release e à matriz local. O binário é preparado em um diretório novo sob o estado próprio do app, junto ao adaptador compilado correspondente. `--version` roda em um ambiente mínimo e isolado. A ativação usa um único recibo/ponteiro gravado atomicamente; uma interrupção anterior mantém a versão anterior ativa. Slots preparados ficam disponíveis para inspeção.

A consulta verifica os hashes do runtime ativo antes de executá-lo. Uma edição externa causa erro, sem sobrescrever o arquivo. A recuperação restaura o ponteiro anterior e retém o slot modificado. Não executa migração de banco. Instalação externa selecionada pelo usuário não é atualizada por esse caminho. Sessões MCP já abertas continuam com seu processo; configurações MCP existentes não são reescritas silenciosamente.

## Contrato do futuro catálogo

Repositório GitHub com releases públicos. O release mais recente precisa incluir um único asset `oracle-skills.json`, com digest SHA-256 fornecido pelo GitHub. O conteúdo:

```json
{
  "schema_version": 1,
  "oracle_compatibility": "0.2",
  "version": "2026.09.1",
  "files": [
    {
      "path": "SISTEMA/skills/ads/exemplo/SKILL.md",
      "sha256": "sha256 do conteúdo decodificado",
      "content_base64": "conteúdo do arquivo em base64"
    }
  ]
}
```

A ausência de arquivo compactado evita extração com links simbólicos e caminhos maliciosos. O importador verifica todos os hashes e destinos antes de gravar. Limites: 5.000 arquivos, 2 MB por arquivo, 50 MB de conteúdo e 72 MB no transporte. Extensões permitidas estão em `skillPathAllowed`; scripts são copiados, nunca executados. Caminhos só podem pertencer às sete coleções existentes.

Gerador local, sem publicação automática:

```sh
python3 scripts/build-skills-release.py \
  --source /caminho/do/catalogo \
  --version 2026.09.1 \
  --output /caminho/da/saida/oracle-skills.json
```

O operador deve publicar somente conteúdo com licença e origem adequadas. Configurar um repositório privado sem autenticação produz erro de acesso; suporte a credenciais não faz parte desta entrega.

## Preservação e recuperação de skills

O app só substitui um arquivo quando há um recibo de propriedade Oracle e o hash atual corresponde à versão anterior. Recibos do instalador existente podem fornecer essa propriedade. Arquivos pessoais não reconhecidos, alterações e remoções feitas pelo usuário são preservados. Arquivos omitidos no release não são apagados. Repetir a mesma atualização não apaga o último ponto útil de recuperação.

Antes de qualquer mutação, o atualizador grava payload, preimagem e intenção em um journal. Cada gravação é verificada. Ao detectar falha, tenta reverter a transação; uma execução posterior recupera intenção interrompida antes de aplicar outro catálogo. Rollback só altera arquivos que ainda possuem o hash instalado. Edições posteriores permanecem no vault; backups/journals ficam no estado do app. Diretórios vazios criados pelo catálogo podem permanecer após recuperação.

Os bloqueios de atualização, configuração e GBrain evitam duas operações Oracle concorrentes no mesmo perfil. Editores externos não usam necessariamente esses bloqueios: a comparação do hash imediatamente antes da gravação detecta alterações observáveis; isto não promete uma transação global envolvendo Obsidian e todos os editores externos.

## Verificação

Testes nativos em `Sources/Oracle/UpdateTests.swift`; recibo final em `docs/evidence/update-contract.json`. O teste do motor usa o binário oficial real, em perfil descartável, com um sentinela de banco que precisa permanecer idêntico. A consulta real ao release está em `docs/evidence/update-network.json`. O futuro catálogo foi testado com conteúdo sintético; publicação/acesso a um repositório central real depende do URL ainda ausente.
