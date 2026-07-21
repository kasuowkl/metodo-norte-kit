# Changelog — Método Norte

Formato de cada entrada:

```
## vX.Y.Z — AAAA-MM-DD
- [tipo: fix/novo/doc] o que mudou — origem (feedback piloto <nome> / interno)
```

Versionamento: correção = 1.0.x · template ou seção nova = 1.x.0 · mudança estrutural do método = 2.0.0.

---

## v1.2.0 — 2026-07-21

- [novo] **Ritual de abertura (Regra #0)** no hub (`DocumentacaoPadrao.template.md`): opcional, mas é o que faz a IA **ler o estado ao iniciar a sessão e REPORTAR as pendências abertas** ao usuário (itens `[ ]` do `ESTADO-ATUAL.md`, segurança em destaque) **sem ele pedir** — transforma a doc de "consultada quando a IA lembra" em "lida toda sessão, com resumo devolvido". Sub-regras `0b` (saber/perguntar o ambiente antes de agir) e `0c` (sincronizar via git perguntando) ficam **condicionais a ambientes espelhados**. Marcada `[ ]` para o cliente ativar/adaptar — interno (lição de produção: o relatório de início virou o momento mais útil do método)
- [novo] Skill `metodo-norte` (MODO OPERAÇÃO): **passo 0** espelhando o ritual — ler `ESTADO-ATUAL.md`/`progresso/` e apresentar o resumo de pendências antes da primeira tarefa; se há ambientes espelhados, confirmar qual antes de agir e perguntar antes de `git pull` — interno
- [doc] `COMO-USAR.md`: seção "Ritual de abertura (Regra #0)" — como ativar, manter `ESTADO-ATUAL.md` curto e (se a IA suportar) apontar um gatilho de início de sessão (ex.: hook `SessionStart`) para reforçar — interno

## v1.1.1 — 2026-07-20

- [fix] Módulo `sincronizarAmbientes`: **inverte a recomendação** — o método principal passa a ser **unificar** `CLAUDE.md`/`.env.example` (genéricos e idênticos nos 2 lados, config só no `.env`), com o que o sync vira **`git pull` puro**. A cerimônia `--no-ff --no-commit` + `checkout HEAD -- ...` foi rebaixada a **"Plano B"** (só quando um arquivo PRECISA divergir e não cabe no `.env`). Motivo: em produção descobriu-se que "proteger no merge" resolve o sintoma, mas **unificar elimina a causa** — mais simples pro cliente e ainda tira segredos de arquivo versionado — interno (lição de produção)

## v1.1.0 — 2026-07-20

- [novo] Módulo `modulos/sincronizarAmbientes.template.md` — sincronizar ambientes espelhados (mesmo código, repos/servidores/bancos separados) com **comprovante**: padrão de remotes, arquivos que não viajam entre ambientes, e o **método à prova de bala** para preservar `CLAUDE.md`/`.env` no merge (`--no-ff --no-commit` + `git checkout HEAD -- ...`) — interno (lição de produção)
- [novo] Carimbo `SINCRONIZACAO.template.md` — comprovante vivo de sincronização (contador `SYNC #`, quem incrementa vs quem só se atualiza, como conferir no destino) — interno
- [novo] Hub: seção "Ambientes" reforçada (isolamento + link p/ o módulo de sync + carimbo), linha no Índice por Assunto, entrada na árvore "Estrutura da pasta" e passo 8 no `COMO-USAR.md` — interno
- [fix] Validador (`tools/validar-doc.js`): `SINCRONIZACAO.md`/`.template.md` dispensados de front-matter (é comprovante, não documento) — interno

## v1.0.1 — 2026-07-17

- [fix] Nome unificado no prompt de setup do `INSTALACAO.md` ("Método Documentação-IA" → "Método Norte") — interno
- [fix] Removido arquivo órfão `ziDdTn9Z` (cópia acidental do `.skill`) — interno
- [novo] `tools/build.js`: `template/` vira fonte canônica; o build sincroniza `template/` → `skill/metodo-norte/recursos/` e regera o `metodo-norte.skill` num comando (elimina divergência entre as duas cópias) — interno
- [doc] `PROCESSO-MELHORIAS.md` atualizado com o passo de build — interno

## v1.0.0 — 2026-07-17

- [novo] Starter kit inicial: 17 templates com instruções 📝, guia de instalação com prompt de setup, exemplo Aurora Sistemas, validador, licença comercial — interno
- [novo] Skill `metodo-norte` para Claude Code (modo implantação + modo operação, templates embutidos em `recursos/`) — interno
- [novo] Esteira de melhorias: `FEEDBACK-PILOTO.md` + `PROCESSO-MELHORIAS.md` + este changelog — interno
