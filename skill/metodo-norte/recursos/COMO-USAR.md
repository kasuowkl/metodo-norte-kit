---
tipo: guia
sistema: todos
status: atual
ultima_revisao: AAAA-MM-DD
---

# Como usar esta documentação

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
