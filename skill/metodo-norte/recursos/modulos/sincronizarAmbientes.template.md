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
`fetch` + `merge` desse remote.

```bash
git remote add [outro] [URL do repo do outro ambiente]   # 1ª vez em cada clone
git fetch [outro]
git log --oneline HEAD..[outro]/[branch]                  # o que falta vir (vazio = já em dia)
```

## ✅ A regra de ouro: configuração vive SÓ no `.env` (não em arquivo versionado)

**A causa de quase toda dor na sincronização de ambientes é UMA:** versionar arquivos cujo conteúdo
**difere por ambiente** — tipicamente o gancho da IA (`CLAUDE.md`) e a config (`.env.example`) com IPs,
portas, caminhos e senhas chumbados. Como o Git existe pra fazer arquivos **convergirem**, todo merge
tenta trocar esses arquivos → e você entra numa guerra pra "protegê-los".

**A solução que elimina o problema pela raiz: não deixe esses arquivos divergirem.** Tire deles todo valor
específico de ambiente e mande pro **`.env` local** (que nunca é versionado). O `CLAUDE.md` e o
`.env.example` ficam **genéricos e idênticos** nos dois lados — apontando pra variáveis (`DEPLOY_HOST`,
`PORTA_APP`, `DB_SERVER`, `PM2_NAME`…) em vez de valores.

> 📝 No `CLAUDE.md`/`.env.example`, troque `192.168.0.80` por "`DEPLOY_HOST` do `.env`", `porta 3132` por
> "`PORTA_APP`", a senha de deploy por "ler do `.env`", e assim por diante. O `.env` real de cada ambiente
> preenche os valores; ele fica só no servidor/máquina, no `.gitignore`.

**Com os arquivos idênticos nos dois lados, a sincronização vira `git pull` puro** — sem cerimônia, sem
risco de trocar sua config, igual a sincronizar qualquer repo comum:

```bash
git fetch [outro]
git log --oneline HEAD..[outro]/[branch]     # o que falta (vazio = em dia)
git merge [outro]/[branch]                    # fast-forward / merge limpo — nada especial
git push origin [seu-branch]
```

> 🔒 **A regra que mantém isso funcionando:** nunca voltar a chumbar IP/porta/senha/caminho no `CLAUDE.md`
> ou `.env.example`. Precisou de um valor por ambiente? Crie uma variável no `.env`. É o que some da
> divergência que mantém o sync simples — e de quebra tira segredos de dentro de arquivo versionado.

## 🅱️ Plano B — quando um arquivo PRECISA mesmo divergir

Se, por uma restrição real, algum arquivo **tem** que ter conteúdo diferente por ambiente e **não** dá pra
jogar a diferença no `.env`, então esse arquivo vira "arquivo que não viaja", e aí — **só aí** — vale o
método defensivo abaixo.

> 📝 Liste aqui os arquivos que precisam divergir no seu projeto. Se a lista está vazia (o ideal), você não
> precisa de nada desta seção — use o `git pull` puro acima.

**⚠️ Armadilha real (já aconteceu):** `-X ours` e o atributo `merge=ours` **NÃO protegem** esses arquivos.
Eles só agem quando **os dois lados** alteraram o arquivo (conflito). Quando **só o outro lado** mexeu — ou
quando o merge vira *fast-forward* — o Git aplica a versão do outro **automaticamente, sem avisar**.

**Método à prova de bala (testado):** mesclar **sem commitar** e **re-afirmar** os arquivos divergentes a
partir do `HEAD` local (que, durante um merge não-commitado, ainda é o commit LOCAL de antes do merge):

```bash
git merge --no-ff --no-commit [outro]/[branch]          # traz o código, NÃO commita
git checkout HEAD -- [arquivo-que-diverge] ...          # re-afirma a versão LOCAL desses arquivos
git commit --no-edit                                     # fecha o merge já com os arquivos locais
```

> ✅ **Confira sempre depois:** um `grep` por algo que só existe na SUA config (ex.: o IP/porta deste
> ambiente) tem que continuar aparecendo no arquivo. Se sumiu, o merge trocou o arquivo — refaça o
> `git checkout HEAD -- ...` e commite.

> 💡 **Antes de adotar o Plano B, pergunte-se:** esse valor não caberia no `.env`? Na prática, quase sempre
> cabe — e aí você volta pro caminho simples. O Plano B é exceção, não o padrão.

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
- **Nunca** voltar a chumbar valor de ambiente (IP, porta, senha, caminho) num arquivo versionado — é o que
  quebra a simplicidade do `git pull` e traz de volta a necessidade do Plano B.
- **Nunca** commitar o `.env` real (segredos) — só o `.env.example` genérico viaja.
- **Nunca** rodar `git merge --abort` com edições **não commitadas** na pasta — ele descarta tudo que não
  foi commitado, inclusive trabalho fora do merge.
