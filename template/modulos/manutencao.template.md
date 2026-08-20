---
tipo: modulo
sistema: todos
status: atual
ultima_revisao: AAAA-MM-DD
---

# Manutenção — deprecar, limpar código morto, remover dados e versionar

> O "outro lado" do ciclo de vida. A doc cobre bem **criar** e **alterar**
> ([criarAlterar.md](criarAlterar.template.md)) — este módulo cobre **manter e aposentar** com segurança.
> Voltar ao hub: [DocumentacaoPadrao.md](../DocumentacaoPadrao.template.md)

## Princípio

**Remover é mais perigoso que criar.** Um `CREATE` que dá errado você percebe na hora; um `DROP`/delete
errado você descobre depois, sem volta. Toda remoção é **soft-first, reversível e confirmada**. A
regra-mãe: *antes de apagar ou sobrescrever, olhe o alvo* — se o que você encontra contradiz como foi
descrito, ou você não criou aquilo, **pare e exponha** em vez de prosseguir.

## 1. 🗑️ Deprecar / aposentar um sistema ou módulo

1. **Marcar inativo (soft), não remover.** Registro → flag `ativo = 0`. Módulo → desregistrar do
   bootstrap antes de deletar arquivos.
2. **Mapear quem depende.** Antes de tirar, responder "o que quebra se isto sumir?": telas/rotas que
   chamam, tabelas que outras rotas leem, serviços/tarefas agendadas que referenciam.
3. **Aguardar validação** com o item já inativo — confirmar que ninguém sentiu falta.
4. **Só então remover**, num commit próprio ("remove X — inativo desde AAAA-MM-DD, validado"). Registrar.

**Anti-padrão:** apagar direto "porque parece que ninguém usa". Parece ≠ é.

## 2. 🧹 Código morto e dívida técnica

Código morto = arquivo/função que **ninguém importa nem chama**. Ele engana (a IA lê e "aprende" o
padrão errado) e infla o repo.

**Como identificar:**
- Arquivo não aparece em nenhum import/registro → candidato a morto.
- Dois arquivos fazem "a mesma coisa" → um é o vivo, outro é resíduo. Achar qual roda de verdade antes de mexer.
- Config (ex.: `package.json`) apontando para arquivo inexistente → config morta.

**O que fazer:** se comprovadamente morto → remover num commit próprio explicando por quê. Se **não dá
pra remover agora** → **registrar a dívida antes de sair** (1 linha no progresso/estado). Dívida
não-registrada é dívida que volta a surpreender.

## 3. ⚠️ Remoção segura de dados e tabelas

1. **Preferir soft-delete** onde existe (`ativo = 0` / `deletado_em`).
2. **Backup ANTES de todo `DROP`/`DELETE` em massa.**
3. **Escrita em produção confirma antes e lê de volta:** mostrar o que será apagado, confirmar,
   executar e **reler** para provar o efeito real.
4. **`DELETE`/`UPDATE` sempre com `WHERE` conferido** — rodar antes o `SELECT COUNT(*)` do mesmo filtro.
5. **Dados de teste podem virar histórico** — não apagar por reflexo; alguns viram base de relatório. Perguntar.

## 4. 📜 Changelog e versionamento por sistema

O progresso é o **diário** (o que foi feito, quando). Falta o **histórico do produto**: o que mudou
para o *usuário* daquele sistema, versão a versão.

- **`CHANGELOG.md` na raiz** (quando o sistema é entregável). Formato: `## vX.Y.Z (AAAA-MM-DD)` +
  bullets `[add]`/`[fix]`/`[doc]`/`[break]`.
- **Semver:** `patch` (correção sem mudar uso) · `minor` (recurso novo compatível) · `major` (mudança
  estrutural / quebra).
- **Progresso × Changelog:** o progresso registra *toda* sessão; o changelog só o que **muda para quem
  usa**. Um não substitui o outro.

## Checklist de manutenção

- [ ] Deprecação: inativei (soft) antes de remover; mapeei dependências; aguardei validação
- [ ] Código morto: confirmei que é morto antes de apagar; ou registrei a dívida
- [ ] Dados: backup antes de `DROP`/delete em massa; `WHERE` conferido; confirmei e reli (produção)
- [ ] Changelog atualizado (se entregável); versão bumpada conforme semver
- [ ] Registrado no progresso + estado se pendência mudou

## Bloqueios

- Não apagar sistema/módulo sem soft-delete e validação
- Não remover código só por "parecer" não-usado — comprovar
- Não rodar `DROP`/`DELETE` em produção sem backup e sem confirmar
- Não deixar dívida técnica sem registro ao sair
