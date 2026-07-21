# 🔄 CARIMBO DE SINCRONIZAÇÃO — [AMBIENTE A] ⇄ [AMBIENTE B]

> ## ✅ SYNC #000 · AAAA-MM-DD · **[ORIGEM] ➜ [DESTINO]**
> Se você está no **outro** ambiente e este número/data apareceu depois do seu `merge`,
> **a sincronização CHEGOU de verdade.** Se o número/data continuar o antigo, ainda não sincronizou.

> 📝 **INSTRUÇÕES (remover ao concluir o setup):** este é o comprovante vivo de sincronização. Só existe
> se você tem ambientes espelhados (ver [modulos/sincronizarAmbientes.md](modulos/sincronizarAmbientes.template.md)).
> Deixe o `SYNC #000` como marco inicial. **Quem envia trabalho novo** incrementa o número e commita este
> arquivo junto do merge; **quem só se atualiza não mexe** aqui.

Este arquivo é o **comprovante** de que os ambientes trocaram código. Ele viaja pelo Git. A regra é simples:

- Ao **enviar** trabalho novo pro outro lado, **incremente o `SYNC #`**, atualize data / sentido / origem
  (commit) e **commite este arquivo junto** do merge.
- Depois de sincronizar, **abra este arquivo no ambiente de DESTINO**. Se o topo mostra o número/data que
  você acabou de enviar → funcionou.

---

## Última sincronização

| Campo | Valor |
|-------|-------|
| **Nº** | `#000` |
| **Quando** | AAAA-MM-DD |
| **Sentido** | [ORIGEM] ➜ [DESTINO] |
| **Origem** | `[remote/branch]` @ `[commit]` |
| **Por** | [quem] |
| **Confere assim** | `git fetch [outro] && git log --oneline HEAD..[outro]/[branch]` → **vazio = 100% em dia** |

> ⚠️ **Arquivos que NÃO se sobrescrevem entre ambientes:** `CLAUDE.md` e `.env`/`.env.example` são
> **específicos de cada lado**. Ao mesclar, mantenha a versão do ambiente atual (ver o método à prova de
> bala no módulo de sincronização). Todo o resto do código deve ficar idêntico nos dois.

---

## Histórico de sincronizações

| Nº | Data | Sentido | Origem (commit) | Por |
|----|------|---------|-----------------|-----|
| #000 | AAAA-MM-DD | — | marco inicial | — |
