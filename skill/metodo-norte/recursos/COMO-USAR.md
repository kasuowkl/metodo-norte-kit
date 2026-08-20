---
tipo: guia
sistema: todos
status: atual
ultima_revisao: AAAA-MM-DD
---

# Como usar esta documentação

> O hub [DocumentacaoPadrao.md](DocumentacaoPadrao.template.md) é a referência completa. Esta página é
> o **mapa de 1 tela** para se orientar rápido — "por onde começo?".

---

## 🗺️ Mapa rápido (1 página)

### O que é cada pasta

| Pasta / arquivo | Para que serve | Quando abrir |
|-----------------|----------------|--------------|
| **DocumentacaoPadrao.md** | Hub: regras de ouro + índice por assunto | **Sempre, primeiro** |
| **ESTADO-ATUAL.md** | Onde o projeto está + pendências | Ao iniciar a sessão |
| **progresso/** | Diário do que foi feito (por mês) | Ao iniciar + ao encerrar (registrar) |
| **modulos/** | Regras por assunto (criar, alterar, manter, banco, segurança…) | O índice do hub diz qual ler |
| **decisoes/** (ADRs) | **Por que** é assim (decisão + porquê) | "Por que fizeram desse jeito?" |
| **referencia/** | Catálogo, padrões, números (fonte única) | Contagens, componentes repetíveis |
| **sistemas/** | Ficha de cada sistema | Detalhe de um sistema específico |
| **tools/** | `validar-doc.js` | Ao mexer na doc (regra do validador) |

### Fluxo típico (do pedido à entrega)

```
1. Ler o hub + ESTADO-ATUAL + progresso do mês         (abertura de sessão — Regra #0)
2. Identificar SISTEMA (+ ambiente, se houver espelhados)   ⚠️ não assumir (Regra #0b)
3. Definition of Ready: escopo/desenho confirmado + critério de "pronto" declarado
4. O Índice por Assunto do hub manda os módulos a ler   (carregar só o necessário)
5. Construir seguindo os padrões e o código real         (não inventar — Regras #2/#3)
6. Definition of Done: verificar POR OBSERVAÇÃO (rodou/viu), procurar TWINS do bug
7. Registrar no progresso/ + ESTADO-ATUAL + rodar validador
```

### Atalhos por intenção

| Situação | Vá direto para |
|----------|----------------|
| **IA numa sessão nova** | Ritual de abertura no topo do hub |
| **Criar sistema do zero** | modulos/stackPadrao.md |
| **Criar/alterar módulo** | modulos/criarAlterar.md |
| **Deprecar / remover / limpar** | modulos/manutencao.md |
| **Mexer em banco/tabelas** | modulos/bancoDeDados.md |
| **Toquei em senha/segredo** | modulos/seguranca.md (bloqueante) |
| **Entender uma decisão** | decisoes/ (ADRs) |

### Os inegociáveis (nunca pular)

O mínimo vital — o resto está nas Regras de Ouro (ler **inteiras**):

1. **⚠️ Ambiente pela config local, não pelo git remote** (se há espelhados) — Regra #0b.
2. **⚠️ Não inventar** tabela/coluna/rota; priorizar **código real** — Regras #2/#3.
3. **Config crítica (senha/IP) só no `.env`** — nunca no código/doc.
4. **Verificar por observação** — "pronto" só se rodou/viu, nunca deduzido.
5. **Registrar no progresso** ao terminar + rodar o validador ao mexer na doc.

---

## Ativação nos projetos

1. Cada projeto de código tem um `CLAUDE.md` (ou regra equivalente da sua IA) na raiz apontando para o hub `DocumentacaoPadrao.md` desta pasta
2. Abra a IA **na pasta do projeto** — ela carrega o gancho e segue o protocolo
3. Teste: peça uma tarefa real e confira se a IA responde "Sistema identificado / Arquivos lidos / Plano" antes de executar

### Ritual de abertura (Regra #0 — opcional)

Se você manteve a **Regra #0** no hub, a IA passa a, **no início de cada sessão** e sem você pedir,
ler `ESTADO-ATUAL.md` + o `progresso/` do mês e **te devolver um resumo das pendências abertas**
(as de segurança em destaque) — e, se você tem ambientes espelhados, confirmar em qual está antes de
agir. É o que faz a doc "trabalhar por você" logo na abertura. Para o comportamento ser confiável:

- mantenha o `ESTADO-ATUAL.md` **curto e atual** (é dele que sai o resumo);
- se sua IA suportar um gatilho de início de sessão (ex.: hook `SessionStart` no Claude Code),
  aponte-o para o hub/`ESTADO-ATUAL.md` — assim a Regra #0 dispara mesmo que a IA "esqueça".

## Fluxo de trabalho

```
Usuário pede alteração
        ↓
IA lê DocumentacaoPadrao.md (hub)
        ↓
Identifica sistema → identifica assunto
        ↓
Lê apenas os .md indicados
        ↓
Confirma plano → Executa → Registra no progresso/
```

## Manutenção (o que mantém a doc viva)

Ao alterar estrutura de um sistema ou criar sistema novo:

1. Atualizar a ficha em `sistemas/`
2. Atualizar módulo em `modulos/` se regras mudarem
3. Atualizar `referencia/catalogo-implementacoes.md` (fonte única das contagens)
4. Adicionar linha no índice do hub se surgiu assunto novo (+ árvore, se arquivo novo)
5. Registrar em `progresso/AAAA-MM.md` + atualizar `ESTADO-ATUAL.md`
6. Decisão de arquitetura estável → ADR em `decisoes/`
7. Rodar `node tools/validar-doc.js` antes de commitar
8. Se você tem ambientes espelhados: ao trocar código entre eles, siga `modulos/sincronizarAmbientes.md` e atualize o carimbo `SINCRONIZACAO.md`
