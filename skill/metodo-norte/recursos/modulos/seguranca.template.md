---
tipo: modulo
sistema: todos
status: atual
ultima_revisao: AAAA-MM-DD
---

# Segurança — Baseline Obrigatório e Hardening

> **Escopo:** todos os sistemas. **Segurança é bloqueante** (Regra de ouro #12).
> Voltar ao hub: [DocumentacaoPadrao.md](../DocumentacaoPadrao.template.md)

## Baseline (vale sempre, em qualquer código)

- **Nunca** senha em texto puro — sempre hash
- **Nunca** token/segredo no frontend, na doc ou no código — só `.env`/config central; versionar apenas `.env.example`
- Credencial existe em **UM lugar só** (ver padrão de duas camadas)
- Segredo que vazou (commit, log) = **rotacionar**, não só remover — o histórico do git preserva
- Queries **sempre parametrizadas** — nunca concatenar entrada do usuário em SQL
- Escapar HTML de entrada do usuário (usar o componente padrão do catálogo)
- Erro para o usuário é genérico; detalhe técnico vai para o log
- Não remover logs/auditoria de operações sensíveis

## Checklist de hardening (go-live) — TODOS antes de expor

- [ ] Senhas default/seed trocadas
- [ ] Segredo de sessão único de produção
- [ ] Segredos que passaram por git/logs rotacionados
- [ ] Conexões de autenticação criptografadas (TLS/LDAPS/etc.)
- [ ] Serviços internos fora do proxy público
- [ ] HTTPS na borda
- [ ] Backup automático **+ retenção/limpeza** (backup sem limpeza derruba serviço por disco cheio)
- [ ] Rate-limit/lockout no login (ou risco registrado)
- [ ] Permissões default fechadas

## Dívidas de segurança conhecidas

> 📝 Tabela viva — ao mexer perto de uma dívida, aproveitar para corrigi-la.

| Dívida | Onde | Status |
|--------|------|--------|
| [...] | [...] | ⚠️ aberto |
