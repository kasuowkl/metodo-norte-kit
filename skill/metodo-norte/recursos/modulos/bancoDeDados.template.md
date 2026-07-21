---
tipo: modulo
sistema: [id-do-sistema]
status: atual
ultima_revisao: AAAA-MM-DD
---

# Banco de Dados

> **Sistema:** `[id]` · **Banco:** [SGBD]
> Voltar ao hub: [DocumentacaoPadrao.md](../DocumentacaoPadrao.template.md)

## Quando usar

Criar/alterar tabelas, colunas, relacionamentos, migrations, queries.

## Conexão e migrations

- Conexão: [como o projeto conecta — pool, arquivo de config, variáveis `DB_*`]
- Migrations: [padrão do projeto — ex.: incremental idempotente, ferramenta usada]
- **Nunca** hardcodar string de conexão

## Convenções

| Item | Padrão |
|------|--------|
| Tabelas/colunas | [...] |
| Chave primária | [...] |
| Datas | [...] |
| FKs | [...] |

## Tabelas base

[Liste as tabelas núcleo que todo módulo pode referenciar — usuários, logs, config…]

**Contagem e schema completo:** [referencia/catalogo-implementacoes.md](../referencia/catalogo-implementacoes.template.md) (fonte única — Regra #10)

## Bloqueios

- Não apagar tabela/coluna sem avaliar impacto
- Não duplicar entidades existentes — verificar antes de criar
- Não sugerir outro SGBD
- Não [seus bloqueios]
