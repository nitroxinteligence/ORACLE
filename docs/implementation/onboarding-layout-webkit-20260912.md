# Altura do onboarding no WKWebView

O contêiner `.ob-content` usava `flex: 1` dentro de um diálogo com altura automática. No WKWebView nativo, a base de 0% reduzia o conteúdo a zero e o diálogo a uma linha de 2 px; a árvore de acessibilidade continuava expondo seus controles.

A base explícita `flex: 1 1 auto` preserva a altura intrínseca do conteúdo, o limite de altura da janela e a rolagem do corpo. O mesmo cenário nativo passou de 2 px para 696 px, com o campo de acesso dentro do diálogo.

Validação com o host sintético existente:

```sh
swiftc scripts/audit-ui-host.swift -o .work/onboarding-layout-host
.work/onboarding-layout-host "$PWD/Resources/web" "$PWD/scripts/test-onboarding-layout.js" "$PWD/.work/onboarding-layout-regression.json"
```

Resultado: 16 verificações passaram para acesso, identidade e revisão, em 1200 × 780 e 840 × 620. O teste usa uma ponte simulada e não ativa licença, acessa Keychain nem altera perfil pessoal.
