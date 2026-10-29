---
tipo: modulo
sistema: todos
status: atual
ultima_revisao: AAAA-MM-DD
---

# Ciclo de Desenvolvimento

> **Escopo:** todo desenvolvimento — sistema novo, versão grande, funcionalidade nova, correção e ideia.
> Arquivo único do caminho de desenvolvimento. A IA lê a **Triagem**, identifica a fase e lê **só a seção daquela fase**, as **Decisões declaradas**, as **Regras entre Fases** e a esteira.
> 📝 Ajuste ao seu caso — as opções marcadas com ★ (o **seu** padrão), quem aprova, o servidor de teste, a produção, as integrações das listas — e remova este bloco. As listas de opções são exemplos: troque pelas que existem na sua empresa.
> Voltar ao hub: [DocumentacaoPadrao.md](../DocumentacaoPadrao.template.md)

## Modo de trabalho
- **Modo conversa:** só propor; não criar nem alterar arquivo.
- **Modo execução:** só depois do "pode fazer" do usuário, e só o que foi pedido.

## Triagem
- Sistema novo: Fase 1 → 2 → 3 → 4 → 5…
- Versão grande: Fase 1 → 2 → …
- Funcionalidade em sistema existente: Fase 2 (curta) → 4 → 5…
- Correção: só a esteira
- Ideia: Fase 1, modo conversa

## As 8 Fases

| # | Fase | O que faz | Aprovação |
|---|---|---|---|
| 1 | **Planejamento** | o que é, pra que serve, para quem, decisões de base (stack, ligações), apetite, riscos | aprovar · amadurecer · arquivar |
| 2 | **Requisitos** | o que faz exatamente: funções, telas, regras, "pronto quando" | combinado aprovado |
| 3 | **Arquitetura** | pastas, banco, tabelas, integrações, rede | modelo de dados + desenho de rede |
| 4 | **Modularização** | peças padrão, funções reutilizáveis, fatias | peças + funções + fatias + fatia 1 |
| 5 | **Construção** | fatia por fatia | plano de 3 linhas de cada fatia |
| 6 | **Validação** | IA verifica com evidência; o usuário testa | fatia aprovada pelo usuário |
| 7 | **Entrega** | publicar e registrar | "pode publicar" na hora |
| 8 | **Manutenção** | operar, cobrar o sucesso, triar pedidos, aposentar | — (fica 🟢 Em operação) |

- **Aprovação** é o ponto de parada no fim de cada Fase: a Fase termina, a IA mostra o resultado e **para** até o usuário aprovar. Sem aprovação, não avança.
- **Nova função não é Fase — é caminho em loop:** Manutenção → Triagem → Requisitos → Arquitetura (se mexer nela) → Modularização → …

## Decisões declaradas

> *"Não quero ser perfeito, mas quero poder ser o mais perfeito possível!"* — Kasuo Lehmann, autor do Método Norte

O padrão resolve o caso comum; o **"Outro"** deixa a porta aberta quando o projeto pede diferente. Nenhuma decisão de projeto é tomada em silêncio.

1. **Formato:** cada pergunta aparece **sozinha, em cartão de seleção** — pergunta curta, opções com uma linha de explicação e sempre **"Outro"**. O padrão do usuário (★) vem como primeira opção. Texto livre só onde a resposta é única do projeto; mesmo ali, oferecer sugestões ou exemplo.
2. **Uma pergunta por vez.** Na conversa, a IA usa cartões de seleção (se a ferramenta tiver) ou uma pergunta numerada por mensagem.
3. **Quem responde é o usuário.** A IA **lê** a ficha; não entrevista além das perguntas da Fase nem deduz o que não foi respondido.
4. **A resposta fica gravada na ficha.** A IA não altera uma escolha registrada sem perguntar.
5. **Stack:** é escolhida pelo usuário na Fase 1 (o padrão vem marcado). A IA não altera essa escolha sem perguntar. Se a Arquitetura (Fase 3) mostrar que ela precisa mudar, a IA aponta o motivo e espera a decisão.
6. **Desvio do ★ ou "Outro"** em decisão de arquitetura vira **ADR**.

## Regras entre Fases
- **Escopo × apetite:** aviso **antecipado, sem bloquear**, na Aprovação da Fase 2 (ex.: *"11 requisitos e 2 integrações para 1 semana — atenção"*). O **bloqueio** fica na Fase 4 (soma das fatias × apetite).
- **Fase que afeta outra já aprovada:** cartão *"Isso afeta a Fase N (campo X). O que fazer?"* → **Atualizar a Fase N** · **Anotar como dúvida** · **Desfazer esta resposta**.
- **Fase alterada:** o checklist mostra **"alterada pela Fase N em dd/mm"**. Reaprovação **depende do que mudou**: acréscimo (ligação, risco) só registra; mudança de **stack, escopo ou apetite reabre a Aprovação**.
- **Pendências ⚠️:** viram itens abertos debaixo da Fase e **só bloqueiam a fatia que precisa delas** (ex.: "números do painel" segura só a fatia do painel).

## Checklist de andamento
- **Nível 1:** as 8 Fases com status: ✅ concluída · 🟡 em andamento · ⬜ não iniciada (Fase 8: 🟢 em operação) + "N de 8".
- **Nível 2:** dentro da Fase atual, cada pergunta + a **Aprovação** como último item. A Fase só fica ✅ com a Aprovação concedida.
- A IA retoma lendo o checklist e a ficha — nunca o resumo do chat.

## Fase 1 — Planejamento

> **Objetivo:** decidir se vale construir e tomar as decisões de base, antes de gastar código.
> **Saída:** ficha da ideia. **Aprovação:** aprovar · amadurecer · arquivar com motivo.

### Quando usar
- **Sistema novo** ou **versão grande** de um sistema existente.
- **Não usar** para funcionalidade nova em sistema existente → ir direto para a Fase 2 (curta).
- **Não usar** para correção → seguir só a esteira da entrega.
- Na dúvida, aplicar a regra anti-confusão do hub e **perguntar ao usuário**.

### Papel da IA
1. Apresentar as perguntas abaixo, **uma por vez**, em cartão.
2. **Pode propor** tela, tabela ou solução técnica — sempre em "Propostas da IA (não aprovadas)". Só vale quando o usuário aprovar.
3. **Não criar nem alterar arquivo** sem o "pode fazer" do usuário.
4. Ideia da IA vai para "Propostas da IA (não aprovadas)" e só vale quando o usuário aprovar.
5. Registrar a fala do usuário **citada**, sem reescrever.

### Perguntas (nesta ordem; ★ = padrão)

| # | Pergunta | Tipo | Opções |
|---|---|---|---|
| 1 | Nome do sistema | texto | — |
| 2 | O que é o sistema | texto | — |
| 3 | Pra que ele serve (que dor resolve) | texto | com exemplo: *"Ex.: hoje ninguém sabe o saldo real e a compra é feita no escuro"* — puxar para a **dor**, não para as funções |
| 4 | Para quem | única | Um setor · Vários setores · Empresa toda · Externo (cliente/fornecedor) · Outro |
| 5 | Como é feito hoje | múltipla | Planilha · Papel · WhatsApp/e-mail · Outro sistema (→ **"Qual?"**) · Não é feito · Outro |
| 6 | Como saber que deu certo | múltipla | A planilha/papel deixou de ser usada · Os números batem com a realidade · A tarefa leva menos tempo (de __ para __) · Ninguém precisa perguntar a ninguém (está no sistema) · Outro — *é o que a Fase 8 cobra* |
| 7 | O que fica de fora | lista | cada item com **Entra na v1 / Fica de fora**; sugestões: integração com ERP · app de celular · importar dados antigos · nota fiscal · acesso externo · + Adicionar item |
| 8 | Como será desenvolvido | única | ★ Padrão ([stackPadrao.md](stackPadrao.template.md)) · Outro |
| 9 | Liga a outro sistema ou serviço? | múltipla | 📝 *troque pelos seus:* Login central · E-mail (SMTP) · WhatsApp · AD/LDAP · ERP · Sistema de processos/BPM · Nota fiscal · Consulta de CNPJ · Nenhum · Outro |
| 10 | Apetite (tempo que vale investir) | única | Até 1 semana · 2 a 4 semanas · 1 a 3 meses · Outro |
| 11 | Já existe pronto no mercado ou em código aberto? | única | Não pesquisado · Pesquisado, não serve · Existe, mas quero próprio · Outro (registrar o que foi avaliado) |
| 12 | Riscos (só listar, sem resolver) | múltipla | LGPD/dados pessoais · Depende de internet · Custo de IA · Depende de sistema externo · Certificado digital · Outro |
| 13 | Quem decide | única | *(sem padrão — perguntado a cada projeto)* Eu · Diretoria · Gestor do setor · Outro |
| 14 | Dúvidas abertas | texto | — |
| 15 | Propostas da IA (não aprovadas) | preenchido pela IA | — |

### Aprovação
Apresentar a ficha preenchida e perguntar ao usuário (ou a quem decide):
- **Aprovar** → ficha passa a *desenvolvimento* e segue para a Fase 2.
- **Amadurecer** → continua ideia; registrar qual dúvida falta responder.
- **Arquivar** → registrar o **motivo** e a data. Se a ideia voltar, retomar daqui, não do zero.

### Onde fica
- A ficha fica na **lista única de ideias, separada do catálogo de sistemas**: [referencia/ideias.md](../referencia/ideias.template.md).
- Quando aprovada, a ideia sai da lista de ideias e entra no catálogo de sistemas.
- Ideias em **amadurecer** são revisadas **todo mês**, na revisão periódica da doc.

### Bloqueios
- ❌ Construir código, tabela, rota ou tela na Fase 1 (propor pode; construir não).
- ❌ Seguir para a Fase 2 sem a Aprovação.
- ❌ Arquivar sem motivo.
- ❌ Tratar proposta da IA como decidida.

## Fase 2 — Requisitos

> **Objetivo:** transformar a ideia em combinado escrito: o que faz, o que não faz e quando está pronto.
> **Saída:** combinado aprovado. **Aprovação:** o usuário aprova antes de qualquer desenho técnico.

### Quando usar
- Depois da Fase 1 aprovada (sistema novo ou versão grande).
- **Funcionalidade nova em sistema existente começa aqui** (versão curta: só as perguntas que a funcionalidade toca).
- Correção não passa por aqui → seguir só a esteira da entrega.

### Perguntas (modelo Cadastrar → Validar → Usar; ★ = padrão)

| # | Pergunta | Tipo | Opções |
|---|---|---|---|
| 1 | Pedido (nas palavras do usuário) | texto | — |
| 2 | **Cadastrar** — O que o sistema guarda? | múltipla | sugestões tiradas do pedido + Outro |
| 3 | **Cadastrar** — O que dá para fazer com cada cadastro? | múltipla | ★ Criar · ★ Listar/buscar · ★ Editar · ★ Excluir (lógico) · Histórico de alterações · Anexar arquivo · Importar planilha · Outro |
| 4 | **Validar** — Validação na entrada | múltipla | ★ Campos obrigatórios · Formato (CPF/CNPJ, e-mail, data) · Não duplicar · Faixa de valores · Outro |
| 5 | **Validar** — Confere com fonte externa? | múltipla | ★ Nenhuma · 📝 *as suas fontes (AD, ERP, Receita…)* · Outro |
| 6 | **Usar** — Como a informação é usada? | múltipla | ★ Lista/relatório na tela · Exportar CSV/PDF · Notificação (sino/e-mail/WhatsApp → perguntar canais) · Rotina agendada · Painel/dashboard · Outro sistema consome · Outro |
| 7 | **Pessoas** — Quem pode fazer o quê? | múltipla | ★ Usuário comum · ★ Administrador · Aprovador · Só leitura · Outro (papel próprio do sistema) |
| 8 | **Pessoas** — Tem fluxo de aprovação? | única | ★ Não · Sim (quem aprova: ___) · Outro |
| 9 | **Como precisa funcionar** — Não funcionais | múltipla | ★ Só rede interna · Acesso pela internet · ★ Login obrigatório · ★ Registro de log · Dados pessoais (LGPD) · Uso no celular · Outro |
| 10 | Fora do escopo | lista | vem preenchido da Fase 1, revisável |

### Papel da IA
1. Registrar o pedido do usuário **citado**, sem reescrever. A leitura da IA vem logo abaixo, separada, e o usuário confirma.
2. **Não entrevistar além das perguntas.** Com as respostas, a IA escreve o combinado e o usuário aprova ou corrige.
3. Cada requisito tem um **"pronto quando…" verificável**. O que ficar indefinido vira pendência ⚠️.
4. **Pode propor** solução técnica — sempre em "Propostas da IA (não aprovadas)". Só vale quando o usuário aprovar; o desenho técnico é feito na Fase 3.
5. **Exceção sem a fala do usuário é proposta da IA.** Item do combinado ou de ADR que abre exceção à stack/padrão precisa da fala dele **citada**; um "sim" ao pacote inteiro não aprova uma exceção que ele não pediu.

### Conteúdo obrigatório do combinado
1. Pedido (citado)
2. Leitura da IA
3. Requisitos funcionais (RF-01, RF-02…)
4. Requisitos não funcionais (RNF-01…): segurança, rede, desempenho, disponibilidade, LGPD
5. Pronto quando… — um por requisito; formato EARS opcional
6. **Fora do escopo**
7. Pendências ⚠️ (se houver)

### Onde fica o combinado
- **Arquivo por entrega** no repositório do sistema: `docs/entregas/AAAA-MM-DD-assunto.md`, com pedido, requisitos, fora do escopo, pronto quando, fatias e retomada.
- **Seção "Requisitos" na ficha do sistema**: só o que é estável no sistema.
- **O combinado vale a cada pedido, não só na 1ª entrega:** todo pedido novo do mesmo sistema vira linha no combinado (fala dele, "pronto quando…", plano de 3 linhas) **antes** de codar, e a Retomada se mantém. Combinado que parou na fatia 4 enquanto o sistema seguiu 30 versões é combinado morto.

### Aprovação
- Mostrar o combinado + o **aviso de escopo × apetite** (se houver) + o que a Fase 2 **mudou na Fase 1** (Regras entre Fases).
- Perguntar: "Posso seguir para a Fase 3 com este combinado?" Sem aprovação, não avança.
- Dali em diante, **antes de cada fatia, reler o arquivo do combinado** — não o resumo do chat.

### Bloqueios
- ❌ Começar a Fase 3 sem o combinado aprovado.
- ❌ Combinado sem "fora do escopo".
- ❌ Requisito sem critério verificável (ou sem pendência ⚠️ declarada).
- ❌ Reescrever a fala do usuário.

## Fase 3 — Arquitetura

> **Objetivo:** decidir como o sistema será construído.
> **Entrada:** combinado aprovado (os RNF alimentam esta Fase). **Aprovação:** o usuário aprova o **modelo de dados** (tabelas e campos) e o **desenho de rede** (onde roda e quem acessa).

### Perguntas (★ = padrão)

| # | Pergunta | Tipo | Opções |
|---|---|---|---|
| 1 | Onde o sistema vive? | única | 📝 *ajuste:* ★ Módulo dentro do sistema principal (portal/intranet) · Satélite (usa o login do principal) · Independente (login próprio) · Outro |
| 2 | Em qual ambiente? | única | 📝 *os seus ambientes (se houver mais de um)* · Os dois · Outro |
| 3 | Organização das pastas | única | ★ Estrutura mínima ([stackPadrao.md](stackPadrao.template.md)) · Outro |
| 4 | Banco de dados | única | ★ Base própria do sistema · Dentro da base do sistema principal · Outro |
| 5 | Prefixo das tabelas | única | sugestões a partir do nome do sistema (ex.: `est_` · `estq_`) · Sem prefixo · Outro |
| 6 | Acesso | única | vem da Fase 2 — ★ Só rede interna · Pela internet · Outro |
| 7 | Onde será publicado | única | ★ 📝 *o seu servidor padrão* (porta no `.env`) · Servidor próprio · Outro |

### O que a IA produz (sem perguntar)
1. **Modelo de dados**: tabelas, campos principais, ligações e prefixo — a partir do "O que o sistema guarda" da Fase 2.
2. **Fluxo do processo** em Mermaid.
3. **Diagrama de sequência** — só quando houver integração (Fase 1, pergunta 9).
4. **Desenho de infraestrutura e rede**: servidor, porta, acesso, regras de firewall, onde ficam os segredos.
5. **ADR** para cada desvio do ★ ou "Outro".

### Formato
- Mermaid no arquivo da entrega.

### Regras que já valem
- Stack padrão (Regra #1) · config só no `.env` (Regra #8) · [bancoDeDados.md](bancoDeDados.template.md) · [seguranca.md](seguranca.template.md)

### Bloqueios
- ❌ Escrever código antes do modelo de dados aprovado.
- ❌ Expor na internet o que não está no desenho de rede.
- ❌ Desvio do ★ sem ADR.

## Fase 4 — Modularização

> **Objetivo:** decidir o que se reaproveita e quebrar o sistema em fatias, na ordem certa, antes de codar.
> **Saída:** peças + funções + lista de fatias com status. **Aprovação:** peças + funções + lista de fatias (v1/depois) + fatia 1.

### Bloco A — Peças padrão ([catálogo de padrões](../referencia/catalogo-padroes.template.md))
- Ninguém responde uma lista longa: as peças **se marcam sozinhas** pelas respostas anteriores; o usuário revisa.
- **Obrigatórias** (login, layout, mensagens, logs — 📝 as suas) vêm ★ *usa o padrão*.
- **"Se houver"** vêm pré-marcadas pelas respostas: F2 Listar/buscar → Lista · Criar/editar → Modal + Formulário · Excluir → Confirmação · Papéis → Busca de pessoas · datas/valores → Formato · Relatório/CSV → Relatório · Anexar → Anexos · Notificação → Notificação · F1 risco "custo de IA" → IA.
- Cada peça: *usa o padrão · não precisa · exceção (motivo)*.
- Avisos: 🔨 peça sem padrão pronto → se já houve 1º uso, **o padrão nasce agora** · ⚠️ padrão com defeito ou cópias divergentes → corrigir antes de espalhar.

### Bloco B — Funções reutilizáveis
- **Padrões** (catálogo de padrões) = peças de tela/infra (Bloco A). **Funções** = lógica de negócio em `services/` (Bloco B).
- A IA lista as funções que os requisitos pedem e procura nos catálogos:
  - ✅ **Já existe** → usa, sem pergunta.
  - 🆕 **Nova** → cartão: *Só para este sistema* (fica no `services/` dele) · *Pode servir para outros* (fica no sistema e entra no catálogo como **candidata**).
  - 🔁 **Nova, mas outro sistema já tem parecido** → **2º uso: o padrão nasce agora** (não copiar).
- Toda função nova ganha **ficha curta**: `nome` (verbo + objeto, camelCase) · `grupo` · `papel` (analisa / decide / age) · `recebe` · `devolve` · `o que faz` · `onde mora`.

### Bloco C — Fatias
1. **Módulos em ordem de dependência** (o que cada um precisa antes).
2. A IA propõe as fatias com **tamanho em dias** (editável pelo usuário). Cada fatia: **Entra na v1 / Fica para depois**.
3. A soma da v1 é comparada com o **apetite da Fase 1** → se passar, **não aprova** sem o usuário decidir: tirar fatia da v1 ou aumentar o prazo.
4. **Fatia 1 = esqueleto ponta a ponta**: login, uma tela, uma tabela e publicação no servidor de teste.
5. Cada fatia entrega algo que o usuário consegue usar e testar. A lista fica no mesmo arquivo do combinado.

### Bloqueios
- ❌ Peça própria quando há padrão, sem motivo escrito.
- ❌ Copiar função que já existe em outro sistema (2º uso → padrão).
- ❌ Aprovar a v1 com soma de dias maior que o apetite, sem decisão do usuário.
- ❌ Fatia que o usuário não consegue testar.

## Fase 5 — Construção

> **Objetivo:** implementar fatia por fatia, seguindo as Regras de Ouro. Gira junto com a Fase 6, uma fatia por vez.

### Modo de trabalho
- A IA diz em qual modo está (conversa ou execução).
- **"Faça tudo" não suspende o ciclo:** pedido para fazer várias etapas segue uma fatia por vez, com o teste do usuário entre elas.

### Checklist da Fase = lista de fatias
⬜ não iniciada · 🔨 em construção · 🧪 aguardando teste do usuário · ✅ aprovada

### Em cada fatia
| Momento | O que acontece |
|---|---|
| **Antes** | Reler o combinado e a lista de fatias. Plano de 3 linhas (**o que muda · como verifico · como desfaço**) → *Pode fazer* · *Ajustar* · *Adiar fatia* |
| **Durante — decisão não prevista** | A IA **para e pergunta** em cartão (padrão, se houver, + "Outro"). **A resposta é gravada na ficha** — nunca perguntada de novo nem deduzida em outra fatia |
| **Durante — falhou 3×** | A IA **para** e mostra: o que tentou · o que falhou · hipótese → *Tentar outra abordagem* · *Eu resolvo* · *Adiar fatia* |
| **Depois** | Fatia vai para 🧪 com roteiro curto (onde abrir · 3–5 passos · o que **não** foi testado) → Fase 6. **Ao dizer "no ar", dizer junto o que do pedido ainda NÃO existe e em qual fatia vem**: "✅ no ar: X · ⏳ ainda não existe: Y (fatia N)" — "pronto" sem "falta" faz o usuário achar que o pedido foi mal entendido |
| **Sessão fechando no meio** | Retomada no fim do arquivo da entrega: onde paramos · o que está no ar · próxima ação |

- Regras de Ouro de construção: #1–#3, #7, #8, #12.
- Parar e esperar o retorno do usuário antes da próxima fatia.

### Rascunhos
- Proposta ainda não aprovada **nunca** vai para a pasta da documentação. Fica só como rascunho/página até o "aprovado".

### Bloqueios
- ❌ Alterar arquivo em modo conversa.
- ❌ Começar fatia sem reler o combinado.
- ❌ Decidir por dedução o que não está na ficha.
- ❌ Fechar sessão no meio sem retomada.

## Fase 6 — Validação

> **Objetivo:** provar que funciona e que está seguro, fatia por fatia. Duas partes: a IA valida, depois o usuário valida.

### Parte 1 — a IA valida (sem perguntas, tudo derivado)
1. Cada **"pronto quando…"** da fatia vira item de checklist: ✅ com evidência · ❌ falhou · ⚠️ não exercitado.
2. Observar, não deduzir · navegador real · TWINS (bug achado → procurar os gêmeos) · retry 3×.
3. **Segurança pela exposição** (Fase 3, pergunta 6): só rede interna → baseline (segredos, sessão, SQL parametrizado) · internet → baseline + hardening inteiro ([seguranca.md](seguranca.template.md)) antes de publicar.
4. **Revisão por outro olhar** acionada sozinha quando a fatia toca **segurança, banco, permissão ou produção**. Revisor em contexto limpo; achado só vale depois de reproduzido nos dados reais.
5. Relatório da fatia: **testei · evidência · não exercitado**.

### Parte 2 — o usuário valida
Cartão com o roteiro (onde abrir · 3–5 passos · o que a IA não testou) →
**Aprovada** · **Aprovada com ressalva** (anota) · **Reprovada** (*motivo obrigatório*).
- **Reprovada** → a fatia volta para 🔨 Construção e o motivo vira decisão gravada na ficha.
- **Aprovada** = gatilho de registro (concluído + testado).

### Bloqueios
- ❌ Dar como pronto sem evidência de cada critério.
- ❌ Reprovação sem motivo.
- ❌ Publicar na internet sem o hardening completo.

## Fase 7 — Entrega

> **Objetivo:** publicar com segurança e com caminho de volta.

### Decisões (cartão)
1. **Quando vai para produção?** → ★ Quando a v1 estiver completa · A cada fatia aprovada · Outro
2. **Quando conferir se deu certo?** (na 1ª publicação em produção) → ★ 30 dias · 60 dias · 90 dias · Outro — a data vai para a Fase 8.

### Publicar
1. Servidor de teste: segue o plano aprovado.
2. **Produção: só com o "pode publicar" do usuário naquela hora** — sempre cartão na hora, **nunca** padrão marcado.
3. Deploy por script versionado, com MD5 e rollback impresso.
4. **Deploy só com teste verde:** o script de publicação **trava se o teste não passou** — conferir o resultado exato (ex.: `R=$(node --test 2>&1); echo "$R" | grep -q "^# fail 0$" || exit 1`). `npm test | grep fail && deploy` publica com teste vermelho: o `grep` acha "# fail 1" e dá sucesso.
5. Sistema novo: na primeira publicação, **ensaiar o rollback** no servidor de teste.

### Registrar (checklist que se preenche sozinho)
- Versão + linha do changelog.
- Progresso, ESTADO, ADR (Regras #9, #11, #13).
- Data de conferir o sucesso marcada.

### Bloqueios
- ❌ Publicar em produção sem o "pode publicar".
- ❌ Publicar com teste vermelho.
- ❌ Entregar sem roteiro de teste.

## Fase 8 — Manutenção

> **Objetivo:** manter o sistema vivo: operar, corrigir, evoluir, registrar e aprender. Nunca fica ✅ — fica **🟢 Em operação**.

### Ao entrar em operação (uma vez)
- **Quem é avisado quando cair?** → 📝 o responsável · Outro *(sem ★ — cada sistema tem seu responsável)*
- **Por qual canal?** → Sino · E-mail · WhatsApp · Telegram *(múltipla)*
- Todo sistema em produção responde: **está no ar? · está dando erro? · quem é avisado?**

### Cobrar o sucesso
- Na data marcada na Fase 7, cartão com a resposta da Fase 1 ("como saber que deu certo") → **Deu certo** · **Em parte** (o que falta vira pedido) · **Não** (motivo vira pedido).

### Triagem de todo pedido novo
- **Correção** → só a esteira.
- **Melhoria pequena** → Fase 2 curta.
- **Mudança grande** → volta para a Fase 1.

### Manter e aposentar
- Aposentar → cartão que abre o checklist de [manutencao.md](manutencao.template.md) (deprecar, código morto, remoção segura de dados, changelog).
- Lição nova → [licoes-da-ia.md](../referencia/licoes-da-ia.template.md); revisão periódica da doc.

### Bloqueios
- ❌ Tratar mudança grande como correção.
- ❌ Sistema em produção sem saber quem é avisado quando cai.

## Esteira de cada entrega
1. **Abrir a sessão** — Sincronizar a doc, ler hub → ESTADO → progresso → lições; identificar o ambiente (se houver mais de um). Responder a abertura no formato fixo (Regra #16 do hub).
2. **Identificar sistema e tarefa** — Catálogo + regra anti-confusão + Índice por Assunto, **a cada pedido** (não só no início da sessão) — e gravar o Passo 4 antes de editar (Regra #15 do hub).
3. **Triagem do pedido** — Correção → esteira · melhoria pequena → Fase 2 curta · sistema novo ou mudança grande → Fase 1.
4. **Modo conversa ou execução** — Dizer o modo. Em conversa, nenhum arquivo é tocado.
5. **Reler o combinado** — Ler `docs/entregas/…`, a ficha e a lista de fatias — nunca o resumo do chat.
6. **Combinar (se ainda não existe)** — Perguntas da Fase 2 → combinado no arquivo da entrega. Aprovação do usuário.
7. **Plano de 3 linhas** — O que muda · como verifico · como desfaço.
8. **Construir a fatia** — Regras de Ouro #1–#3, #7, #8, #12. Decisão não prevista → cartão → ficha.
9. **Verificar** — Cada pronto quando com evidência; relatório testei · evidência · não exercitado.
10. **Revisão por outro olhar** — Só se tocar segurança, banco, permissão ou produção.
11. **Publicar** — Teste segue o plano; produção só com "pode publicar". Script com MD5, rollback e **trava de teste verde**.
12. **Entregar para teste** — Roteiro: onde abrir, 3–5 passos, o que não foi coberto, **o que do pedido ainda falta** → cartão Aprovada · com ressalva · Reprovada (motivo).
13. **Registrar** — Versão + changelog; progresso, ESTADO, ADR; marcar fatia como feita.
14. **Retomada (se parar no meio)** — Seção Retomada no arquivo da entrega: onde paramos · no ar · próxima ação.
15. **Aprender** — Lição nova → licoes-da-ia.md; revisão periódica da doc (inclui ideias paradas).

---
> Origem: ciclo v1 (Fases 0–7) de 30/09/2026 e **ciclo v2 (8 Fases + decisões declaradas) de 22/10/2026**, desenhados e aprovados por Kasuo Lehmann na documentação real que deu origem ao Método Norte; generalizado para o kit na v2.0.0.
