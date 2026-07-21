---
tipo: estado
sistema: todos
status: atual
ultima_revisao: 2026-07-10
---

# 📊 Estado Atual — Aurora Sistemas

> Onde estamos e o que falta. Histórico: `progresso/` (omitido no recorte).

## Status dos sistemas

| Sistema | Estado | Observação |
|---------|--------|------------|
| `hub-clientes` | 🟢 produção | v2.4 — módulo de faturas entregue 08/07 |
| `site` | 🟢 produção | estável |
| `erp-legado` | 🟡 congelado | só correções pontuais; substituição planejada p/ 2027 |

## Pendências abertas

### hub-clientes
- [ ] Exportação de faturas em lote (pedido do cliente Beta) — em análise
- [ ] Migrar tela de contratos para o componente `TabelaPadrao` (3 telas restantes)

### Go-live / segurança
- [ ] Rotacionar chave SMTP que passou por um commit em jun/2026 ⚠️
- [ ] Rate-limit no login do portal (registrado como risco aceito até sprint 30)

## Rascunhos em revisão

| Documento | Status | Desde |
|-----------|--------|-------|
| `modulos/relatoriosBI.md` | 🟡 rascunho | 05/07 |
