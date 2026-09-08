# Oracle

Oracle 0.3 é um aplicativo macOS para explorar seu conhecimento local, editar notas do Obsidian e acompanhar a configuração do Second Brain pelo Codex. A janela usa AppKit e WKWebView com recursos locais; o grafo usa Three.js/WebGL2 e mantém uma alternativa SVG acessível.

A interface reúne controles flutuantes em preto, branco e cinza, identidade planetária V3 com Michroma, especialistas coloridos e ramificações orgânicas. Observatório e timelapse começam recolhidos. Acima de 50% de zoom, cada especialista mostra no mínimo 10 skills e, ao selecionar, 50, respeitando a quantidade real disponível.

**Distribuição local de desenvolvimento:** assinatura ad hoc, sem Developer ID ou notarização. O app e o DMG consolidados são gerados em `dist/`.

## Usar

1. Abra o Oracle e cole um código de acesso emitido por Mateus.
2. Conecte sua conta ChatGPT no Codex.
3. Escolha a pasta original do Obsidian, revise a configuração e clique em **Instalar Oracle**.
4. O Codex executa a skill de instalação. O Oracle exibe somente progresso confirmado, oferece as solicitações de autorização e permite cancelar ou retomar.

Perfis Oracle já existentes são preservados. A edição **Editar → Salvar** atualiza o mesmo `.md` do vault, guarda rascunho/cópia de recuperação e detecta mudanças externas. A pasta de espelho do indexador não é editável. A animação do timelapse não executa a instalação nem regrava arquivos.

Plugins vêm do inventário público do app-server Codex. Apenas ferramentas confirmadas como disponíveis aparecem na órbita do SOL; presença de pacote ou imagem não comprova conexão. Ícones fornecidos pelo catálogo/pacote são apresentados em monocromático, com iniciais quando não há um ícone disponível.

## Emitir um código

No Mac emissor, a partir da pasta ORACLE:

```sh
scripts/oracle-license issue --to 'Nome da pessoa' --days 365
```

A chave privada fica no diretório privado do emissor e não entra no app, no DMG ou no Git. O cliente contém só a chave pública. [Comandos, vínculo opcional, uso offline e limites de revogação](docs/implementation/onboarding-2026-09-08.md).

## Compilar e empacotar

Requisitos: macOS, ferramentas Swift da Apple, Bun e Python 3.

```sh
bun install --frozen-lockfile
bash scripts/bootstrap.sh
bash scripts/build.sh
bash scripts/package.sh
```

Saídas: `dist/Oracle.app`, `dist/Oracle-0.3.0-arm64.dmg` e SHA-256. O build recompila o adaptador GBrain e gera o ICNS diretamente dos assets V3; não reutiliza a identidade V1 rejeitada.

## Verificação

- [Rastreabilidade dos 23 pedidos](docs/implementation/organic-ui-acceptance.md).
- [Materiais, zoom, edição e limites técnicos](docs/implementation/organic-ui-design.md).
- [Onboarding, contratos Codex e instalação real em fixture](docs/implementation/onboarding-2026-09-08.md).
- [Contratos consolidados](docs/evidence/organic-ui/contracts.json).
- [Desempenho antes/depois](docs/benchmarks/organic-report.md).
- [Capturas da versão consolidada](docs/evidence/organic-ui/gallery.json).
- [Matriz nativa consolidada de 72 cenários de zoom](docs/evidence/organic-ui/native-matrix.json).

As validações usam perfis isolados e notas sintéticas. A configuração pessoal não é reinstalada pelos testes. A confiança de hooks permanece no mecanismo oficial do Codex; nenhum teste habilita essa confiança automaticamente. O código não lê bancos privados do Codex nem usa tokens da assinatura como uma API paralela.
