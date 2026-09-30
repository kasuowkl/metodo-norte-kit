---
tipo: modulo
sistema: todos
status: atual
ultima_revisao: AAAA-MM-DD
---

# Ciclo de Desenvolvimento

> **Escopo:** todo desenvolvimento — sistema novo, versão grande, funcionalidade nova, correção e ideia.
> Arquivo único do caminho de desenvolvimento. A IA lê a **Triagem**, identifica a fase e lê **só a seção daquela fase** e da esteira.
> 📝 Ajuste os portões ao seu caso (quem aprova, servidor de teste, produção) e remova este bloco.
> Voltar ao hub: [DocumentacaoPadrao.md](../DocumentacaoPadrao.template.md)

## Modo de trabalho
- **Modo conversa:** só propor; não criar nem alterar arquivo.
- **Modo execução:** só depois do "pode fazer" do usuário, e só o que foi pedido.

## Triagem
- Sistema novo: Fase 0 → 1 → 2 → 3 → 4…
- Versão grande: Fase 0 → 1 → …
- Funcionalidade em sistema existente: Fase 1 (curta) → 3 → 4…
- Correção: Só a esteira
- Ideia: Fase 0, modo conversa

## Fase 0 — Descoberta

> **Objetivo:** decidir se vale construir, antes de gastar código.
> **Saída:** ficha da ideia. **Portão:** aprovar · amadurecer · arquivar com motivo.

### Quando usar
- **Sistema novo** ou **versão grande** de um sistema existente (ex.: a v2 de um sistema existente).
- **Não usar** para funcionalidade nova em sistema existente → ir direto para a Fase 1.
- **Não usar** para correção → seguir só a esteira da entrega.
- Na dúvida, aplicar a regra anti-confusão do hub e **perguntar ao usuário**.

### Papel da IA nesta fase
1. **Só entrevistar.** Uma pergunta por vez, na ordem do questionário.
2. **Não propor** solução, stack, banco, tela ou tabela. Stack é decisão da Fase 2.
3. **Não criar nem alterar arquivo** sem o "pode fazer" do usuário.
4. Ideia da IA vai para "Propostas da IA (não aprovadas)" e só vale quando o usuário aprovar.
5. Registrar a fala do usuário **citada**, sem reescrever.

### Questionário (nesta ordem)
1. Título do sistema
2. Detalhamento: o que é o sistema
3. Objetivo: que dor resolve (nas palavras do usuário, citado)
4. Para quem
5. Como é feito hoje
6. Como saber que deu certo
7. O que fica de fora
8. Apetite: quanto tempo vale investir
9. Já existe pronto no mercado ou em código aberto? (pesquisar e registrar o que foi avaliado)
10. Riscos: LGPD, rede/internet, custo de IA, dependências — **só listar, sem resolver**
11. Quem decide
12. Dúvidas abertas
13. Propostas da IA (não aprovadas)

### Portão
Apresentar a ficha preenchida e perguntar ao usuário (ou a quem decide) uma das três saídas:
- **Aprovar** → ficha passa a *desenvolvimento* e segue para a Fase 1.
- **Amadurecer** → continua ideia; registrar qual dúvida falta responder.
- **Arquivar** → registrar o **motivo** e a data. Se a ideia voltar, retomar daqui, não do zero.

### Onde fica
- A ficha da ideia fica numa **lista única de ideias, separada do catálogo de sistemas**: referencia/ideias.md.
- Quando aprovada, a ideia sai da lista de ideias e entra no catálogo de sistemas.

### Depois do portão
- Ideias em **amadurecer** são revisadas **todo mês**, numa revisão mensal da doc.
- O "como saber que deu certo" é **cobrado na Fase 7**, com data marcada na entrega.

### Bloqueios
- ❌ Escrever código, tabela, rota ou tela na Fase 0.
- ❌ Decidir stack ou banco na Fase 0.
- ❌ Seguir para a Fase 1 sem a decisão do portão.
- ❌ Arquivar sem motivo.
- ❌ Tratar proposta da IA como decidida.

## Fase 1 — Requisitos

> **Objetivo:** transformar a ideia em combinado escrito: o que faz, o que não faz e quando está pronto.
> **Saída:** combinado aprovado. **Portão:** o usuário aprova antes de qualquer desenho técnico.

### Quando usar
- Depois da Fase 0 aprovada (sistema novo ou versão grande).
- **Funcionalidade nova em sistema existente começa aqui.**
- Correção não passa por aqui → seguir só a esteira da entrega.

### Onde fica o combinado
- **Arquivo por entrega** no repositório do sistema: docs/entregas/AAAA-MM-DD-assunto.md, com pedido, requisitos, fora do escopo, pronto quando, fatias e retomada.
- **Seção "Requisitos" na ficha do sistema**: só o que é estável no sistema.

### Papel da IA
1. Registrar o pedido do usuário **citado**, sem reescrever. A leitura da IA vem logo abaixo, separada.
2. Perguntar até cada requisito ter um **"pronto quando…" verificável**.
3. Não desenhar solução técnica nesta fase.

### Conteúdo obrigatório do combinado
1. Pedido (citado)
2. Leitura da IA
3. Requisitos funcionais (RF-01, RF-02…)
4. Requisitos não funcionais (RNF-01…): segurança, rede, desempenho, disponibilidade, LGPD
5. Pronto quando… — um por requisito; formato EARS opcional
6. **Fora do escopo**

### Portão
- Apresentar o combinado e perguntar: "Posso seguir para a Fase 2 com este combinado?"
- Sem aprovação, não avança.
- Dali em diante, **antes de cada fatia, reler o arquivo do combinado** — não o resumo do chat.

### Bloqueios
- ❌ Começar a Fase 2 sem o combinado aprovado.
- ❌ Combinado sem "fora do escopo".
- ❌ Requisito sem critério verificável.
- ❌ Reescrever a fala do usuário.

## Fase 2 — Arquitetura

> **Objetivo:** decidir como o sistema será construído.
> **Entrada:** combinado aprovado (os RNF alimentam esta fase). **Portão:** o usuário aprova o modelo de dados e o desenho de rede.

### O que produzir
1. **Fluxo do processo** em Mermaid.
2. **Diagrama de sequência** — só quando houver integração (AD, SMTP, Telegram, ERP, API de IA).
3. **Desenho de infraestrutura e rede**: servidor, porta, acesso (rede interna ou internet), regras de firewall, onde ficam os segredos.
4. **Modelo de dados**: tabelas, campos principais, ligações e prefixo. O usuário revisa antes da primeira migration.
5. **ADR** para toda escolha em que havia alternativa real.

### Formato
- Mermaid no arquivo da entrega.

### Regras que já valem
- Stack padrão (Regra #1) · config só no .env (Regra #8) · bancoDeDados.md · seguranca.md

### Bloqueios
- ❌ Escrever código antes do modelo de dados revisado.
- ❌ Expor na internet o que não está no desenho de rede.

## Fase 3 — Modularização e Plano

> **Objetivo:** quebrar o sistema em módulos e fatias, na ordem certa, antes de codar.
> **Saída:** lista de fatias com status. **Portão:** o usuário aprova a lista de fatias e a fatia 1.

### O que produzir
1. **Módulos em ordem de dependência** (o que cada um precisa antes).
2. **Lista de fatias com status**, no mesmo arquivo do combinado. Cada fatia entrega algo que o usuário consegue usar e testar.
3. **Fatia 1 = esqueleto ponta a ponta**: login, uma tela, uma tabela e publicação no servidor de teste.

### Antes de cada fatia
- Plano de 3 linhas: **o que muda · como verifico · como desfaço**.
- Entrega grande: o mesmo plano vai para o arquivo.

### Bloqueios
- ❌ Começar fatia sem o plano de 3 linhas.
- ❌ Fatia que o usuário não consegue testar.

## Fase 4 — Construção

> **Objetivo:** implementar fatia por fatia, seguindo as Regras de Ouro. Aqui roda a esteira de cada entrega.

### Modo de trabalho
- **Modo conversa:** só propor. Não criar nem alterar arquivo.
- **Modo execução:** só depois do "pode fazer" do usuário, e só o que foi pedido.
- A IA diz em qual modo está.

### Em cada fatia
1. **Reler** o arquivo do combinado e a lista de fatias.
2. Apresentar o plano de 3 linhas (Fase 3).
3. Construir seguindo a esteira única da entrega, em modulos/cicloDesenvolvimento.md.
4. Regras de Ouro de construção: #1–#3, #7, #8, #12.
5. Verificar (Fase 5).
6. Parar e esperar o retorno do usuário antes da próxima fatia.

### Ao fechar a sessão com trabalho no meio
- Deixar a **retomada**: onde paramos · o que está no ar · próxima ação. Fica como seção no fim do arquivo da entrega (Fase 1 · proposta 7).

### Rascunhos
- Proposta ainda não aprovada **nunca** vai para a pasta da Documentação Padrão. Fica só como página até o "aprovado".

### Bloqueios
- ❌ Alterar arquivo em modo conversa.
- ❌ Começar fatia sem reler o combinado.
- ❌ Fechar sessão no meio sem arquivo de retomada.

## Fase 5 — Qualidade e Segurança

> **Objetivo:** provar que funciona e que está seguro antes de entregar.

### Verificação
1. Cada **"pronto quando…"** do combinado vira uma verificação, com evidência.
2. Observar, não deduzir · navegador real · TWINS · retry 3× · dizer o que não foi exercitado.

### Segurança pela exposição
- **Só rede interna:** baseline (segredos, sessão, SQL parametrizado).
- **Internet:** baseline + checklist de hardening inteiro (seguranca.md) antes de publicar.

### Revisão por outro olhar
- Obrigatória quando a mudança toca **segurança, banco, permissão ou produção**.
- Revisor em contexto limpo; achado só vale depois de reproduzido nos dados reais (lição 9).

### Relatório de verificação
- Toda fatia termina com: **testei · evidência · não exercitado**.

### Bloqueios
- ❌ Dar como pronto sem evidência de cada critério.
- ❌ Publicar na internet sem o hardening completo.

## Fase 6 — Entrega

> **Objetivo:** publicar com segurança e com caminho de volta.

### Publicar
1. Servidor de teste: segue o plano aprovado.
2. **Produção: só com o "pode publicar" do usuário naquela hora.**
3. Deploy por script versionado, com MD5 e rollback impresso.
4. Sistema novo: na primeira publicação, **ensaiar o rollback** no servidor de teste.

### Entregar ao usuário
- Roteiro de teste: onde abrir · o que testar em 3–5 passos · o que o teste da IA não cobriu.
- Criar a pendência "⏳ teste dele".

### Registrar
- Subir a versão e escrever a linha do changelog.
- Progresso, ESTADO, ADR, validador (Regras #9, #11, #13).

### Bloqueios
- ❌ Publicar em produção sem o "pode publicar".
- ❌ Entregar sem roteiro de teste.

## Fase 7 — Operação e Manutenção

> **Objetivo:** manter o sistema vivo: corrigir, evoluir, registrar e aprender.

### Monitoramento mínimo
- Todo sistema em produção responde: **está no ar? · está dando erro? · quem é avisado?**

### Triagem de todo pedido novo
- **Correção** → só a esteira da entrega.
- **Melhoria pequena** → Fase 1 curta.
- **Mudança grande** → volta para a Fase 0.

### Cobrar o sucesso
- Na entrega, marcar a data de conferir o "como saber que deu certo" da ficha da ideia (ex.: 30 dias depois).

### Manter e aposentar
- Deprecar, código morto, remoção segura de dados, changelog: manutencao.md.
- Lição nova → licoes-da-ia.md; revisão periódica da doc.

### Fora deste manual
- Peso da leitura na abertura da sessão vira pendência separada.

### Bloqueios
- ❌ Tratar mudança grande como correção.
- ❌ Sistema em produção sem saber quem é avisado quando cai.

## Esteira de cada entrega
1. **Abrir a sessão** — Sincronizar a doc, ler hub → ESTADO → progresso → lições; identificar o ambiente (se houver mais de um).
2. **Identificar sistema e tarefa** — Catálogo + regra anti-confusão + Índice por Assunto.
3. **Triagem do pedido** — Correção → esteira · melhoria pequena → Fase 1 curta · sistema novo ou mudança grande → Fase 0.
4. **Modo conversa ou execução** — Dizer o modo. Em conversa, nenhum arquivo é tocado.
5. **Reler o combinado** — Ler docs/entregas/… e a lista de fatias — nunca o resumo do chat.
6. **Combinar (se ainda não existe)** — Pedido citado, RF/RNF, pronto quando, fora do escopo → arquivo da entrega. Portão: o usuário aprova.
7. **Plano de 3 linhas** — O que muda · como verifico · como desfaço.
8. **Construir a fatia** — Regras de Ouro #1–#3, #7, #8, #12.
9. **Verificar** — Cada pronto quando com evidência; relatório testei · evidência · não exercitado.
10. **Revisão por outro olhar** — Só se tocar segurança, banco, permissão ou produção.
11. **Publicar** — Teste segue o plano; produção só com "pode publicar". Script com MD5 e rollback.
12. **Entregar para teste** — Roteiro: onde abrir, 3–5 passos, o que não foi coberto → "⏳ teste dele".
13. **Registrar** — Versão + changelog; progresso, ESTADO, ADR; marcar fatia como feita.
14. **Retomada (se parar no meio)** — Seção Retomada no arquivo da entrega: onde paramos · no ar · próxima ação.
15. **Aprender** — Lição nova → licoes-da-ia.md; revisão periódica da doc (inclui ideias paradas).