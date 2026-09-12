# Acesso simplificado e retomada — 12 setembro 2026

A tela de acesso contém somente Chave de acesso e Ativar. Foram removidas as seções de convite ORACLEINV2 e pedido deste Mac. A solicitação do usuário substitui o handshake anterior para novas chaves curtas.

O emissor privado gera 16 caracteres aleatórios (80 bits), apresentados em quatro grupos. O hash da chave, o titular e o papel entram numa concessão ORACLE3 assinada com a chave Ed25519 já confiada pelo app. O app procura a concessão em `onboarding/access-grants/<sha256>.license`, exige arquivo regular limitado e valida assinatura e correspondência do hash antes de persistir a licença. Um código sozinho, um vault ou uma flag de preferência nunca concedem acesso. A chave privada e o ledger permanecem fora do pacote.

Emissão local pelo proprietário:

```sh
scripts/oracle-license issue-access --issuer-dir /pasta/privada/do-emissor \
  --to Pessoa --role student \
  --grant-dir /perfil/OracleCompanion/onboarding/access-grants \
  --key-file /pasta/privada/chave.txt
```

O provisionamento entrega a concessão ao perfil destinatário; somente a chave curta é digitada no aplicativo. Não há servidor de resgate nem concessões embutidas no download público. Para outro usuário/Mac, o proprietário deve provisionar sua concessão separadamente. ORACLE3 é uma concessão offline portátil: não exige Secure Enclave, Chaves, pedido de aparelho ou assinatura Developer ID. Não oferece revogação remota ou bloqueio físico de cópia. As validações de ORACLE1/ORACLE2 existentes não foram afrouxadas.

Uma instalação licenciada com vault acessível, sem execução de setup iniciada, pode voltar à interface principal diretamente. O plano existente permanece intacto e não é marcado como concluído; não são inventados recibos de identidade, índice, conectores ou consentimentos. Uma execução realmente iniciada mantém seu fluxo de acompanhamento.

Validação: emissor com chaves efêmeras (18 verificações); WKWebView em 1200×780 e 840×620, mais retomada e ativação sintéticas (21 verificações). A suíte nativa cobre ativação/reabertura sem Chaves, assinatura não confiada, chave desconhecida, hash remapeado, papel inválido, expiração, preservação da licença e retomada sem conclusão fabricada. Perfis sintéticos ficam em `.work`.
