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
