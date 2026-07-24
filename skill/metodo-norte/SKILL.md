---
name: metodo-norte
description: >
  Método Norte — dê um norte à sua IA. Implanta e opera uma documentação padrão que
  funciona como roteador de contexto para desenvolvimento com IA. Use quando o usuário
  pedir para: implantar/configurar o Método Norte, criar uma "documentação padrão" para
  IA desenvolver sistemas, organizar contexto de projetos para IA, ou quando existir uma
  pasta com DocumentacaoPadrao.md no workspace (nesse caso, seguir o protocolo de operação
  antes de qualquer tarefa de código).
---

# Método Norte

**© Kasuo — Arquiteto de Soluções com IA, criador do Método Norte.** Uso conforme LICENSE.md do kit.

Esta skill tem **dois modos**. Detecte qual se aplica:

- O workspace **já tem** um `DocumentacaoPadrao.md` (ou o usuário diz que o método está implantado) → **MODO OPERAÇÃO**
- O usuário quer **implantar** o método (não existe hub ainda) → **MODO IMPLANTAÇÃO**

---

## MODO OPERAÇÃO — trabalhar num projeto que usa o método

Antes de **qualquer** criação, alteração, correção, análise ou remoção de código:

0. **Ritual de abertura (se o hub tiver a Regra #0):** no **início da sessão**, antes da primeira
   tarefa, leia `ESTADO-ATUAL.md` + o `progresso/` do mês corrente e **apresente ao usuário um resumo
   curto das pendências abertas** (itens `[ ]`, segurança em destaque) — **sem esperar ele pedir**. Se
   houver **ambientes espelhados**, saiba/**pergunte em qual ambiente** você está antes de agir (as
   pendências a reportar são as dele) e, se a doc mora em git, verifique se o clone está atrás do
   remoto e **pergunte** antes de dar `git pull` (para reportar a lista atual). Nunca puxar/subir sozinho.
1. **Leia o hub** `DocumentacaoPadrao.md` da pasta de documentação do projeto
2. **Identifique o sistema** no Catálogo de Sistemas (+ o **ambiente**, se houver mais de um). Se não estiver claro, **pergunte antes de executar**
3. **Identifique a tarefa** no Índice por Assunto e leia **apenas** os arquivos indicados (não leia tudo)
4. **Confirme o plano** antes de executar, neste formato:
   - Sistema identificado (+ ambiente) · Tipo de tarefa · Arquivos lidos · Área impactada · Risco principal · Ação planejada
   - **Define Done:** declare em 1–2 frases o que é "concluído" **e como será verificado** (qual comando/tela/valor prova). Sem critério de verificação, não comece.
5. **Execute** respeitando as Regras de Ouro do hub — em especial: não inventar tabelas/rotas/pastas (verificar o código real), usar os componentes do catálogo de padrões em vez de criar novos, segredos só no `.env`. Se corrigir um bug, **procure os gêmeos** (mesmo padrão em outros lugares — linha `TWINS:`). Se a verificação falhar **3 vezes**, pare e devolva o estado (não fique em loop).
6. **Verifique por observação** (não por inferência): confirme o "Define Done" **rodando/vendo** o resultado, não deduzindo. Só então, **ao concluir:** entrada curta no topo de `progresso/AAAA-MM.md` do mês corrente + atualizar `ESTADO-ATUAL.md` se status/pendências mudaram + se mexeu na doc, rodar `node tools/validar-doc.js` (não commitar com erro)
7. Decisão de arquitetura estável tomada durante a tarefa → criar ADR curto em `decisoes/` (contexto → decisão → consequências)

Se um arquivo obrigatório estiver ausente ou contraditório, **avise antes de prosseguir**.

---

## MODO IMPLANTAÇÃO — montar a documentação do zero

Os arquivos-modelo estão em `recursos/` dentro desta skill (estrutura completa: hub, módulos, fichas, referências, progresso, decisões, validador).

### Passo 1 — Questionário

Faça as perguntas abaixo **uma por vez** (aguarde cada resposta):

1. Nome da empresa/equipe?
2. Quais SISTEMAS existem hoje? Para cada um: nome, ID curto (ex.: `portal-rh`), onde fica o código, banco, e status (produção/desenvolvimento/legado)
3. Qual a STACK PADRÃO para sistemas novos? E o que é PROIBIDO sem pedido explícito?
4. Existem AMBIENTES separados (dev/prod, matriz/filial, casa/empresa)? Como os segredos de cada um são gerenciados? Eles são **espelhados** (mesmo código sincronizado entre eles)? Se sim, como o código atravessa (git remote/pull)?
5. Quais INTEGRAÇÕES externas existem (e-mail, mensageria, ERP, APIs)?
6. Como funciona AUTENTICAÇÃO e PERMISSÃO hoje?
7. Quais CONVENÇÕES de código existem (tabelas, rotas, pastas)? Se não houver, proponha e peça aprovação
8. Que COMPONENTES reutilizáveis já existem no código (toast, modal, export…)? Onde ficam?
9. Existem DECISÕES de arquitetura que a IA nunca deve desfazer? (virarão ADRs)
10. Quem valida o trabalho da IA e como (testes automatizados? manual?)

### Passo 2 — Gerar a documentação

1. Crie a pasta de documentação (nome sugerido: `Documentacao-Padrao-<Empresa>`) com a estrutura de `recursos/`
2. Copie cada `*.template.md`, **removendo o sufixo `.template`** do nome, e preencha com as respostas
3. Siga as instruções 📝 dentro de cada arquivo e **remova esses blocos** ao concluir
4. Se o código dos sistemas estiver acessível: **verifique no código real** (árvore de pastas, nomes de tabelas) em vez de confiar só na memória do usuário — e varra por funções duplicadas para popular o catálogo de padrões
5. Capriche nos **Bloqueios absolutos** de `regrasGerais.md`: cada erro que o usuário relatar da IA vira um "Não fazer X"
6. **Ambientes:** se forem espelhados (pergunta 4), mantenha e preencha `modulos/sincronizarAmbientes.template.md` + o carimbo `SINCRONIZACAO.template.md`. Se for **ambiente único**, remova esses dois e a seção "Ambientes" do hub
7. Transforme as respostas da pergunta 9 em ADRs numerados em `decisoes/`
8. Copie `tools/validar-doc.js`, rode `node tools/validar-doc.js` e corrija até 0 erros
9. Gere o `CLAUDE.md` de cada projeto de código apontando para o hub

### Passo 3 — Entrega

Entregue um resumo: sistemas catalogados, módulos criados, bloqueios registrados, ADRs, resultado do validador — e instrua o usuário a testar pedindo uma tarefa real (a resposta deve vir no formato do MODO OPERAÇÃO, passo 4).
