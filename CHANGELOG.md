# Changelog — Método Norte

Formato de cada entrada:

```
## vX.Y.Z — AAAA-MM-DD
- [tipo: fix/novo/doc] o que mudou — origem (feedback piloto <nome> / interno)
```

Versionamento: correção = 1.0.x · template ou seção nova = 1.x.0 · mudança estrutural do método = 2.0.0.

---

## v1.0.1 — 2026-07-17

- [fix] Nome unificado no prompt de setup do `INSTALACAO.md` ("Método Documentação-IA" → "Método Norte") — interno
- [fix] Removido arquivo órfão `ziDdTn9Z` (cópia acidental do `.skill`) — interno
- [novo] `tools/build.js`: `template/` vira fonte canônica; o build sincroniza `template/` → `skill/metodo-norte/recursos/` e regera o `metodo-norte.skill` num comando (elimina divergência entre as duas cópias) — interno
- [doc] `PROCESSO-MELHORIAS.md` atualizado com o passo de build — interno

## v1.0.0 — 2026-07-17

- [novo] Starter kit inicial: 17 templates com instruções 📝, guia de instalação com prompt de setup, exemplo Aurora Sistemas, validador, licença comercial — interno
- [novo] Skill `metodo-norte` para Claude Code (modo implantação + modo operação, templates embutidos em `recursos/`) — interno
- [novo] Esteira de melhorias: `FEEDBACK-PILOTO.md` + `PROCESSO-MELHORIAS.md` + este changelog — interno
