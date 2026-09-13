# Skill Oracle e acervo por departamento

A distribuição com `skills_layout: department-specialist-skill` exige Oracle 0.3.3. Mantém os caminhos `SISTEMA/skills/<departamento>/<especialista>/<skill>/SKILL.md`, sem acrescentar outra pasta de departamento. Distribuições anteriores continuam usando o mapeamento legado.

Departamentos: codigo, conversao, entrega, leads, marketing, oferta, sistemas, trafego e vendas. Frontend é um especialista de Código; Impeccable e Richard Design ficam sob esse especialista. Recursos completos compartilhados ficam em `SISTEMA/recursos-skills`; os SKILL.md de templates internos nessa biblioteca não são entradas adicionais do catálogo. Perfis públicos necessários podem ser distribuídos nessa biblioteca, sem escrever na WIKI pessoal. Regras de assinatura, checksum, propriedade e preservação de edições continuam obrigatórias.

O onboarding instala `skills/oracle` diretamente em `~/.agents/skills/oracle`, raiz de descoberta do Codex. Não cria uma cópia no Obsidian. O registro local de perfis vincula o vault escolhido pelo usuário. A mesma instalação pode ser repetida; arquivos alterados pelo usuário e uma skill oracle de outra origem são preservados com erro explícito. `filesInstalled` não significa que uma sessão já carregou a skill.

A skill descobre metadados limitados, deduplica caminhos canônicos, escolhe o mínimo de especialistas necessário e lê os procedimentos relevantes. A lista anunciada pelo Codex complementa a busca em disco, especialmente para plugins. Não acessa históricos privados, não cria ferramentas ausentes e não concede confiança a hooks. Com vários vaults sem escolha clara, pede o destino antes da consulta.

Validação: `python3 scripts/test-oracle-router.py`, `python3 scripts/test-distribution.py`, `node --test scripts/test-departments.mjs` e o teste nativo `--self-test-distribution` com perfil descartável explícito. A instalação da distribuição real deve ser verificada separadamente em `.work/` antes de publicar seus assets.
