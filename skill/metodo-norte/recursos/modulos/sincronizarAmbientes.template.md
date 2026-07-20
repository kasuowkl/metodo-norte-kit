---
tipo: modulo
sistema: todos
status: atual
ultima_revisao: AAAA-MM-DD
---

# Sincronizar Ambientes Espelhados — com comprovante

> **Escopo:** só se você tem **dois ou mais ambientes espelhados** (o mesmo código rodando em
> lugares diferentes — casa/empresa, matriz/filial, dev/homolog/prod). Se você tem **um só
> ambiente, apague este módulo** e a seção "Ambientes" do hub.
> Voltar ao hub: [DocumentacaoPadrao.md](../DocumentacaoPadrao.template.md)

> 📝 **INSTRUÇÕES DE PREENCHIMENTO (remover ao concluir):** troque os nomes de ambiente, os
> remotes e a lista de "arquivos que não viajam" pelos seus. O método (as regras e o comprovante)
> vale igual pra qualquer par de ambientes.

## O modelo

Ambientes espelhados = **mesmo código**, mas **cada um com seu próprio repositório, servidor e banco**.
Eles começam idênticos e evoluem em paralelo; a sincronização mantém o **código** convergente sem nunca
misturar a **configuração** de um com a do outro.

| Ambiente | Repositório | Onde roda | Banco |
|----------|-------------|-----------|-------|
| [AMBIENTE A] | [repo A] | [servidor A] | [banco A] |
| [AMBIENTE B] | [repo B] | [servidor B] | [banco B] |

## Como o código atravessa (remotes)

Cada cópia de trabalho tem um **remote apontando para o repositório do outro ambiente**. Sincronizar =
`fetch` + `merge` desse remote. Não é `pull` cego: o `merge` é feito com o cuidado da seção abaixo.

```bash
git remote add [outro] [URL do repo do outro ambiente]   # 1ª vez em cada clone
git fetch [outro]
git log --oneline HEAD..[outro]/[branch]                  # o que falta vir (vazio = já em dia)
```

## ⛔ Arquivos que NUNCA viajam entre ambientes

O **gancho da IA** (`CLAUDE.md`) e a **configuração** (`.env` / `.env.example`) são **específicos de cada
ambiente** (caminhos, IPs, portas, nomes de servidor). Eles **não podem** ser sobrescritos pela versão do
outro lado.

> 📝 Liste aqui os arquivos que são por-ambiente no seu projeto (ex.: `CLAUDE.md`, `.env.example`,
> um `config/ambiente.*`).

**⚠️ Armadilha real (já aconteceu):** `-X ours` e o atributo `merge=ours` **NÃO protegem** esses arquivos.
Eles só agem quando **os dois lados** alteraram o arquivo (conflito). Quando **só o outro lado** mexeu — ou
quando o merge vira *fast-forward* — o Git aplica a versão do outro **automaticamente, sem avisar**, e sua
configuração local é trocada pela do outro ambiente.

**Método à prova de bala (testado):** mesclar **sem commitar** e **re-afirmar** os arquivos de ambiente a
partir do `HEAD` local (que, durante um merge não-commitado, ainda é o commit LOCAL de antes do merge):

```bash
git merge --no-ff --no-commit [outro]/[branch]          # traz o código, NÃO commita
git checkout HEAD -- CLAUDE.md .env.example             # re-afirma os arquivos de ambiente LOCAIS
git commit --no-edit                                     # fecha o merge já com os arquivos locais
```

> ✅ **Confira sempre depois:** um `grep` por algo que só existe na SUA config (ex.: o IP/porta deste
> ambiente) tem que continuar aparecendo no `CLAUDE.md`/`.env.example`. Se sumiu, o merge trocou o arquivo —
> refaça o `git checkout HEAD -- ...` e commite.

## O comprovante — provar que sincronizou (carimbo)

Para **nunca ficar na dúvida** se a sincronização realmente chegou, use um **carimbo**: o arquivo
[SINCRONIZACAO.md](../SINCRONIZACAO.template.md) na raiz, com um contador **`SYNC #`** que só cresce
(mais data, sentido e commit de origem). Ele viaja pelo Git como qualquer arquivo.

- **Quem incrementa?** Só **quem ENVIA trabalho novo** pro outro lado. **Quem só se atualiza** (puxa o que o
  outro já carimbou) **não incrementa** — já vê o número/data do outro como prova. Assim o contador não
  fica em ping-pong à toa.
- **A prova:** depois de sincronizar, **abra o carimbo no ambiente de destino**. Se o topo mostra o
  número/data que você acabou de enviar → chegou. Se continua o número antigo → não sincronizou; refaça.

## Conferência de convergência (sem abrir arquivo)

```bash
# em cada lado — vazio = aquele lado tem tudo do outro
git fetch [outro] && git log --oneline HEAD..[outro]/[branch]
```

**Os dois lados com saída vazia = ambientes 100% sincronizados.**

## Bloqueios (o que NÃO fazer)

- **Nunca** empurrar um ambiente no outro por acidente — proteja o sentido perigoso (push desabilitado no
  remote, ou branch protegido). A troca deve ser sempre puxada pelo lado de destino, conscientemente.
- **Nunca** confiar em `-X ours` / `merge=ours` para preservar os arquivos de ambiente — use o
  `--no-commit` + `git checkout HEAD -- ...` acima.
- **Nunca** rodar `git merge --abort` com edições **não commitadas** na pasta — ele descarta tudo que não
  foi commitado, inclusive trabalho fora do merge.
