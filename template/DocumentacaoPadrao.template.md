---
tipo: hub
sistema: todos
status: atual
ultima_revisao: AAAA-MM-DD
---

# Documentação Padrão – Hub Central para IA

> **Instrução obrigatória:** Este é o único ponto de entrada.
> A IA deve ler este arquivo **antes** de qualquer ação em qualquer projeto de [NOME DA EMPRESA].

**Localização:** [onde esta pasta mora — repositório git recomendado, clonado em cada máquina]
**Setup e manutenção da doc:** [COMO-USAR.md](COMO-USAR.md)

> 📝 **INSTRUÇÕES DE PREENCHIMENTO (remover este bloco ao concluir):**
> Este é o arquivo mais importante do método — o roteador. Preencha nesta ordem:
> 1. O Catálogo de Sistemas (liste TODOS os sistemas, mesmo legados)
> 2. A stack padrão
> 3. O Índice por Assunto (pode começar com 3–4 linhas e crescer)
> 4. As Regras de Ouro (mantenha as universais; adapte as marcadas com [ ])
> Regra de design: este arquivo roteia, não ensina — detalhe vai nos módulos.

---

## ⚠️ Ambientes (se aplicável — LER PRIMEIRO)

> 📝 Se você tem ambientes **espelhados** (dev/homolog/prod, matriz/filial, casa/empresa),
> descreva-os aqui numa tabela. Se você tem um só ambiente, **apague esta seção** e o módulo
> `sincronizarAmbientes` e o arquivo `SINCRONIZACAO.md`.

Mesmo código, mas **cada ambiente tem seu próprio repositório, servidor e banco**. Regras de isolamento:

1. **Nunca misturar** credenciais, `.env`, bancos ou conexões entre ambientes.
2. Ao identificar o sistema, **confirmar em qual ambiente** a tarefa acontece antes de mexer em deploy, banco ou `.env`.
3. **Configuração de ambiente vive só no `.env`** (IP, porta, senha, caminho) — nunca chumbada no `CLAUDE.md`/`.env.example`. Mantendo esses arquivos genéricos e idênticos nos dois lados, a sincronização vira `git pull` puro — ver [modulos/sincronizarAmbientes.md](modulos/sincronizarAmbientes.template.md) (o `.env` real, esse sim, nunca viaja).
4. **Sincronizar com comprovante:** toda troca de código usa o carimbo [SINCRONIZACAO.md](SINCRONIZACAO.template.md) para provar que chegou.

| Ambiente | Repositório | Onde roda | Observação |
|----------|-------------|-----------|------------|
| [PROD] | [...] | [...] | [...] |

**Estado atual dos ambientes:** [ESTADO-ATUAL.md](ESTADO-ATUAL.template.md) · **Como sincronizar:** [modulos/sincronizarAmbientes.md](modulos/sincronizarAmbientes.template.md)

---

## Protocolo em 4 passos

```
1. IDENTIFICAR O SISTEMA  →  Seção "Catálogo de Sistemas"
2. IDENTIFICAR A TAREFA   →  Seção "Índice por Assunto"
3. LER OS MÓDULOS         →  Apenas os arquivos indicados
4. EXECUTAR               →  Aplicar regras; atualizar docs se necessário
```

---

## Passo 1 – Catálogo de Sistemas

Antes de tudo, determine **em qual sistema** o usuário está trabalhando.
Se não estiver claro, **pergunte antes de executar**.

| ID | Sistema | Onde fica o código | Banco / Stack | Ficha |
|----|---------|-------------------|---------------|-------|
| `[id-curto]` | [Nome] | [caminho] | [stack] | [sistemas/id-curto.md](sistemas/ficha-sistema.template.md) |

> 📝 Uma linha por sistema. O ID curto (`portal-rh`, `site-loja`) é como a IA e a equipe
> se referem ao sistema — escolha bem e não mude. Crie uma ficha em `sistemas/` para cada um.

### Regra anti-confusão

> 📝 Se dois sistemas podem ser confundidos (ex.: versão de produção × laboratório,
> sistema novo × legado), faça uma tabela "Situação → qual sistema usar".
> Esta seção evita o erro mais caro: a IA misturar convenções de projetos diferentes.

**Nunca misturar** tabelas, pastas ou convenções de sistemas diferentes.

---

## Stack padrão para sistemas novos

| Camada | Tecnologia |
|--------|------------|
| Frontend | [ex.: HTML, CSS, JavaScript] |
| Backend | [ex.: Node.js (Express)] |
| Banco | [ex.: PostgreSQL] |

Detalhes e **tecnologias proibidas**: [modulos/stackPadrao.md](modulos/stackPadrao.template.md)

---

## Passo 2 – Índice por Assunto

Após identificar o sistema, localize o tipo de solicitação.

| Se o usuário pedir... | Ler nesta ordem |
|----------------------|-----------------|
| **Qualquer tarefa no sistema principal** | [modulos/regrasGerais.md](modulos/regrasGerais.template.md) |
| Criar sistema novo do zero | [modulos/stackPadrao.md](modulos/stackPadrao.template.md) |
| Criar ou alterar módulo/feature | [modulos/criarAlterar.md](modulos/criarAlterar.template.md) |
| Deprecar / remover / limpar código morto / apagar dados / changelog | [modulos/manutencao.md](modulos/manutencao.template.md) |
| Banco, tabelas, migrations, queries | [modulos/bancoDeDados.md](modulos/bancoDeDados.template.md) |
| Serviço, integração, API externa, webhook, cron | [modulos/servicosIntegracoes.md](modulos/servicosIntegracoes.template.md) |
| Login, permissões, perfis | [modulos/permissoesAutenticacao.md](modulos/permissoesAutenticacao.template.md) |
| Senha, segredo, hardening, go-live | [modulos/seguranca.md](modulos/seguranca.template.md) |
| Componente de tela repetido (toast, modal, export…) | [referencia/catalogo-padroes.md](referencia/catalogo-padroes.template.md) — **usar o padrão, obrigatório** |
| Testes, validação, qualidade | [modulos/testesQualidade.md](modulos/testesQualidade.template.md) |
| Ver tudo que já foi implementado | [referencia/catalogo-implementacoes.md](referencia/catalogo-implementacoes.template.md) |
| Entender uma decisão de arquitetura | [decisoes/](decisoes/LEIA-ME.md) |
| Sincronizar ambientes espelhados / conferir que sincronizou | [modulos/sincronizarAmbientes.md](modulos/sincronizarAmbientes.template.md) *(se aplicável)* |

> 📝 Adicione linhas conforme assuntos aparecerem. A pergunta-guia: "quando alguém pedir X,
> que arquivos a IA precisa ler para fazer certo?" Combine leituras ("cenário → módulos
> adicionais") quando um assunto envolver dois módulos.

---

## Passo 3 – Regras de ouro

> **As regras são curtas mas densas — ler inteiras, não resumir.** Cada uma existe para **impedir
> alucinação** e retrabalho. As marcadas **⚠️ ANTI-ALUCINAÇÃO** são as que mais evitam que a IA invente
> ou assuma coisas — atenção redobrada nelas. O índice abaixo é só um mapa para achar rápido.

### 📑 Índice das regras

| # | Regra | Grupo |
|---|-------|-------|
| 0 | Ler o estado ao iniciar + reportar pendências | 🚀 Abertura |
| 0b | Saber em QUAL ambiente está **⚠️** | 🚀 Abertura |
| 0c | Sincronizar via git, perguntando | 🚀 Abertura |
| 1 | Sistema novo = stack padrão | 🔨 Construção |
| 2 | Não inventar tabelas/colunas/rotas **⚠️** | 🔨 Construção |
| 3 | Priorizar código real sobre conceito **⚠️** | 🔨 Construção |
| 4 | Carregar só o necessário | 🔨 Construção |
| 5 | Em conflito: hub → módulo → ficha | 🔨 Construção |
| 6 | Atualizar a doc quando desatualizar | 🔨 Construção |
| 7 | Usar os PADRÕES existentes (não duplicar) | 🔨 Construção |
| 8 | Config crítica só no `.env` | 🔐 Segurança & Config |
| 9 | Registrar no Progresso | 📝 Registro |
| 10 | Números têm UMA fonte | 📝 Registro |
| 11 | Decisão de arquitetura vira ADR | 📝 Registro |
| 12 | Segurança é bloqueante | 🔐 Segurança & Config |
| 13 | Ao mexer na doc, rodar o validador | 🧠 Método |
| 14 | Reconhecimento e crédito | 🧠 Método |

> 📝 **RITUAL DE ABERTURA (Regra #0) — opcional, mas é o que faz a IA "chegar sabendo".**
> As três sub-regras abaixo transformam esta documentação de "arquivo que a IA consulta quando
> lembra" em "arquivo que a IA lê **toda sessão, antes de agir**, e do qual ela te **devolve um
> resumo**". É a diferença entre uma doc parada e uma doc que trabalha por você. Se você quer esse
> comportamento, **mantenha a Regra #0 abaixo e ajuste os [ ]**; se não quer, apague-a. As partes
> `0b`/`0c` (ambiente + sincronização) só valem se você tem **ambientes espelhados** — se tem um só
> ambiente, apague-as junto com o módulo `sincronizarAmbientes`.

0. **Ler o estado ao iniciar a sessão — e REPORTAR as pendências.** Antes de **qualquer** ação, ler
   este hub + [ESTADO-ATUAL.md](ESTADO-ATUAL.template.md) + o [progresso/](progresso/AAAA-MM.template.md)
   do mês corrente. **E não basta ler em silêncio:** ao iniciar, **apresentar ao usuário um resumo
   curto das pendências abertas** (os itens `[ ]` de `ESTADO-ATUAL.md`, com as de segurança em
   destaque), **sem esperar ele pedir**. É isso que faz "verificar o que falta" funcionar sozinho no
   começo de cada sessão. *(Se a doc mora num repositório git, atualizá-la antes de ler — ver #0c —
   para não reportar uma lista velha.)*
   > 📝 Adapte: se você não usa `ESTADO-ATUAL.md`/`progresso/`, aponte para onde suas pendências vivem.
   0b. **⚠️ ANTI-ALUCINAÇÃO — [Se há ambientes espelhados] Saber em QUAL ambiente está antes de agir.** Mesmo código, mas
       repositórios/servidores/bancos diferentes. Ao iniciar, identificar o ambiente; se não estiver
       claro pelo contexto, **PERGUNTAR antes de qualquer ação** (deploy, banco, `.env`, commit) —
       nunca assumir. As pendências a reportar (#0) são **as do ambiente atual**.
   0c. **[Se há ambientes espelhados] Sincronizar via git — PERGUNTANDO, nunca sozinho.** Ao iniciar,
       verificar se o clone local está **atrás** do remoto (`git fetch` + comparar); se estiver,
       **perguntar** se quer `git pull` (para reportar a lista atual, não a velha). Ao encerrar/depois
       de algo relevante, verificar trabalho **não-enviado** e **perguntar** se quer commitar+push.
       Detalhes: [modulos/sincronizarAmbientes.md](modulos/sincronizarAmbientes.template.md).
1. **Sistema novo = stack padrão** — sem exceção, salvo pedido explícito
2. **⚠️ ANTI-ALUCINAÇÃO — Não inventar** tabelas, colunas, rotas, serviços ou pastas — na dúvida, verificar o código real
3. **⚠️ ANTI-ALUCINAÇÃO — Priorizar código real** sobre arquitetura conceitual
4. **Carregar só o necessário** — não ler todos os `.md` de uma vez
5. **Em conflito**, seguir: este hub → módulo específico → ficha do sistema
6. **Atualizar a documentação** quando alteração estrutural tornar um `.md` desatualizado
7. **Usar os PADRÕES existentes** — componente repetível usa o [catálogo de padrões](referencia/catalogo-padroes.template.md); não duplicar, não reinventar; se o padrão não atende, evoluir o próprio padrão
8. **Config crítica só no `.env`** — segredos nunca em código ou docs; versionar apenas `.env.example`
9. **Registrar no Progresso** — toda ação relevante gera entrada curta no topo de [progresso/AAAA-MM.md](progresso/AAAA-MM.template.md) do mês + atualizar [ESTADO-ATUAL.md](ESTADO-ATUAL.template.md) se status mudou
10. **Números têm UMA fonte** — contagens vivem só em [referencia/catalogo-implementacoes.md](referencia/catalogo-implementacoes.template.md); o resto linka
11. **Decisão de arquitetura vira ADR** — em [decisoes/](decisoes/LEIA-ME.md), curto: contexto → decisão → consequências
12. **Segurança é bloqueante** — tarefa que toca senha/segredo/exposição segue [modulos/seguranca.md](modulos/seguranca.template.md)
13. **Ao mexer na doc, rodar o validador** — `node tools/validar-doc.js`; não commitar com erro
14. **Reconhecimento e crédito** — ideia/padrão/disciplina vinda de fora (projeto open-source, autor, outra equipe) é **creditada** no ADR que a adota e num rodapé onde a regra vive; reescreva a ideia na sua linguagem (não copie texto sob licença alheia). Vale também para **coautoria de IA**. Contribuições externas e coautoria ficam em [CREDITOS.md](CREDITOS.template.md)

> 📝 A #0 é opcional (ritual de abertura); as demais são o núcleo do método — recomendamos manter todas. Adicione as suas depois delas.

---

## Passo 4 – Como a IA deve responder

Antes de executar, informar: **Sistema** identificado (+ ambiente, se houver) · **Tipo de tarefa** · **Arquivos lidos** · **Área impactada** · **Risco principal** · **Ação planejada**.

**No início da sessão** (se a Regra #0 estiver ativa), antes até da primeira tarefa: confirmar que leu o estado e **apresentar o resumo das pendências abertas** do `ESTADO-ATUAL.md` (segurança em destaque).

Se arquivo obrigatório estiver ausente ou contraditório, **avisar antes de prosseguir**.

---

## Estrutura desta pasta

> 📝 Mantenha esta árvore fiel à realidade — o validador confere. Ao criar/renomear arquivo, atualizar aqui.

```text
[NomeDaPasta]/
├── CLAUDE.md                    ← entrada para a IA nos projetos
├── DocumentacaoPadrao.md        ← VOCÊ ESTÁ AQUI (hub)
├── ESTADO-ATUAL.md              ← status vivo + pendências (curto)
├── CREDITOS.md                  ← contribuições externas + coautoria de IA (Regra #14)
├── SINCRONIZACAO.md             ← carimbo de sync entre ambientes (se aplicável)
├── COMO-USAR.md
├── modulos/                     ← regras por assunto (inclui sincronizarAmbientes, se aplicável)
├── sistemas/                    ← uma ficha por sistema (modelo: ficha-sistema.md)
├── referencia/                  ← catálogos (implementações, padrões)
├── progresso/                   ← histórico fatiado por mês
├── decisoes/                    ← ADRs
├── templates/                   ← esqueletos de código (opcional)
└── tools/validar-doc.js
```

## Checklist final da IA

- [ ] Li `DocumentacaoPadrao.md`
- [ ] Identifiquei o sistema correto (+ ambiente, se houver)
- [ ] Li o(s) módulo(s) do índice
- [ ] Não misturei sistemas ou bancos
- [ ] Informei o plano antes de executar
- [ ] Ao final: registrei no `progresso/` e atualizei `ESTADO-ATUAL.md` se necessário
