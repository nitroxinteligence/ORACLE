# Oracle

Aplicativo macOS instalável para explorar conhecimento local, memória e procedimentos em um universo Three.js. AppKit hospeda a janela e as operações nativas; o frontend usa assets locais em WKWebView.

A versão **0.2.0** refina os painéis, reúne o timelapse no topo, padroniza os modais e acrescenta busca imediata e atualizações com compatibilidade e recuperação. O sol permanece animado. As sete coleções são Ads, Code, Contents, Customer Finder, Cybersecurity, Marketing e Personal Branding; skills são suas folhas.

![Oracle 0.2 no aplicativo macOS: perfil de validação com notas sintéticas e catálogo público](docs/evidence/oracle-native-0.2.png)

## Executar e empacotar

Requisitos de desenvolvimento: macOS, ferramentas Swift da Apple, Bun e Python 3.

```sh
bun install --frozen-lockfile
bash scripts/bootstrap.sh
bash scripts/build.sh
open dist/Oracle.app
bash scripts/package.sh
```

O pacote é `dist/Oracle-0.2.0-arm64.dmg`. Esta é uma distribuição **de desenvolvimento, com assinatura ad hoc**. Developer ID e notarização Apple não foram concluídos.

Preview visual opcional, sem acesso nativo às fontes:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory Resources/web
```

O preview usa fixtures; a origem permanece identificada nos ajustes. As capturas desta entrega usam perfis isolados com notas sintéticas e/ou skills públicas, sem conteúdo do vault pessoal.

## Comportamentos principais

- Sol e atlas Three.js, conexões animadas, zoom, seleção e arraste persistente; controles acessíveis e fallback SVG.
- Árvore lateral com pastas, documentos, sete coleções e INBOX/oracle, oracle-history e oracle-memory quando presentes na fonte.
- Busca em modal por nome/caminho, incluindo `ads-google`; filtro enquanto digita, setas/Enter, Escape e retorno de foco. Atalho ⌘K.
- Modais com cabeçalho e rodapé estáveis, corpo rolável, campos e botões consistentes. Editor preserva o rascunho, mostra diff e salva versão pessoal com procedência.
- Formação visual determinística: núcleo → especialistas → skills. A reprodução não instala nem modifica arquivos. O journal continua acessível em Recibos e cobertura.
- Barra de instalação de 2px dirigida por recibos e por bloqueio de operação ativo. Estado real separado de pausa/replay.
- Botão Atualizar com consulta real a releases, allowlist de compatibilidade do GBrain, SHA-256, preparação isolada e rollback. Catálogo central configurável, com preservação de edições e remoções.
- Catálogo público de 940 skills integrado. Origem, versão, diagnóstico e cobertura continuam disponíveis nos ajustes.
- MCP sobre GBrain oficial, memória canônica e TTL; sem executor de IA adicional.

## Validação e limites

A entrega tem 19 contratos do núcleo, 27 verificações de atualização, 15 etapas de formação verificadas e round-trips do GBrain/MCP. A QA nativa verificou instalação de 4.902 arquivos, busca da skill original, gravação de versão pessoal, foco/teclado e reprodução sem alterar 4.909 arquivos do perfil de teste. Testes e capturas não comprovam operação na instalação pessoal.

- [Checklist rastreável dos 16 pedidos](docs/implementation/pendencias-16.md)
- [Capturas e validação visual](docs/evidence/oracle-0.2-visuals.md)
- [Contrato do atualizador e catálogo futuro](docs/implementation/updater.md)
- [Avaliação Cognee: manter GBrain por enquanto](docs/decisions/cognee-evaluation.md)

Ainda dependem de decisão ou validação externa: URL do catálogo central, eventual adoção do Cognee, confiança real dos hooks no Codex, conexão à instalação pessoal preexistente, Developer ID/notarização e teste em outro Mac limpo. Nenhum desses estados é inferido a partir da animação ou da presença de arquivos.

O app não usa bancos privados do Codex, tokens de assinatura como API, nem configura confiança de hooks. O cartão Gmail é explicativo. O bloqueio protege a interface, não criptografa o vault. Dependências de terceiros conservam suas licenças; a licença do código original do Oracle ainda não foi definida.
