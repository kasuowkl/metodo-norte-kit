---
tipo: ficha
sistema: hub-clientes
status: atual
ultima_revisao: 2026-07-10
---

# Ficha do Sistema – Hub de Clientes

> **ID:** `hub-clientes` · **Status:** Produção
> Voltar ao hub: [DocumentacaoPadrao.md](../DocumentacaoPadrao.md)

## Identidade

| Campo | Valor |
|-------|-------|
| Nome | Hub de Clientes Aurora |
| Domínio | Portal onde clientes veem contratos, faturas e chamados |
| Código | `repos/hub-clientes/` (monorepo: `apps/api` + `apps/web`) |
| Stack | NestJS 10, React 18 + Vite, TypeORM |
| Banco | PostgreSQL 16 — schema `hub` |

## Estrutura de pastas

```text
hub-clientes/
├── apps/
│   ├── api/src/modules/     ← um módulo NestJS por área (auth, contratos, faturas, chamados)
│   └── web/src/pages/       ← uma pasta por tela
├── packages/ui/             ← componentes padrão compartilhados (TabelaPadrao, Toast…)
└── migrations/              ← TypeORM, incremental
```

## Módulos ativos

`auth`, `contratos`, `faturas`, `chamados`, `notificacoes` (fila de e-mails — ver [ADR 001](../decisoes/001-fila-de-emails.md))

## Integrações externas

SMTP (via fila), gateway de boletos (BoletoCloud), ERP legado (leitura, via view `vw_clientes_erp`)

## O que NÃO é este sistema

- **Não** é o `erp-legado` — cadastros internos ficam lá; aqui só **leitura** via view
- **Não** usa MySQL nem PHP — se aparecer código assim no contexto, é do ERP, não daqui
- **Não** envia e-mail direto — sempre pela fila `notificacoes`

## Regra para a IA

Sempre confirmar que tabelas citadas existem no schema `hub` (conferir `migrations/`). Componente de tela repetido → usar `packages/ui` antes de criar novo.
