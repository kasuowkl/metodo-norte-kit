# Método Norte — Starter Kit

> **Dê um norte à sua IA.**

**Faça a IA desenvolver seus sistemas com consistência — sem alucinar tabelas, sem duplicar código, sem misturar projetos.**

## O problema que este kit resolve

Equipes que usam IA (Claude, Copilot, Cursor…) para desenvolver sistemas enfrentam sempre os mesmos sintomas: a IA inventa tabelas e rotas que não existem, reinventa componentes que o projeto já tem, mistura convenções de projetos diferentes, "esquece" decisões de arquitetura tomadas semanas atrás e refaz do jeito dela, e ninguém sabe dizer o que já foi feito e o que falta.

A causa é uma só: **a IA não tem o contexto certo na hora certa**. Dar contexto demais estoura a janela e polui; dar de menos, ela alucina.

## A solução: um roteador de contexto

Este kit implementa um método testado em produção: uma pasta de documentação que funciona como **sistema operacional de contexto para a IA**. Em vez de a IA ler tudo (ou nada), ela segue um protocolo:

```
1. Lê UM arquivo de entrada (o hub)
2. Identifica QUAL sistema e QUE TIPO de tarefa
3. Lê APENAS os módulos que o índice indica
4. Confirma o plano antes de executar
5. Registra o que fez ao terminar
```

Os pilares do método:

- **Hub roteador** — ponto de entrada único com catálogo de sistemas e índice por assunto
- **Bloqueios explícitos** — cada módulo lista o que a IA NÃO pode fazer (mais eficaz contra alucinação do que só descrever o certo)
- **Fonte única de números** — contagens vivem num só arquivo; o resto linka (documentação que não mente)
- **Catálogo de padrões** — componentes reutilizáveis obrigatórios (a IA adapta, não reinventa)
- **ADRs** — decisões de arquitetura registradas com o *porquê* (a IA não desfaz o que não entende)
- **Estado atual + progresso mensal** — status curto sempre à mão; histórico fatiado que não pesa no contexto
- **Validador automático** — script que confere links, metadados e cobertura do índice (a doc se autotesta)
- **Templates de código** — esqueletos prontos para a IA copiar, não reescrever

## O que tem no kit

| Pasta | Conteúdo |
|-------|----------|
| `template/` | A estrutura completa, vazia, com instruções de preenchimento em cada arquivo |
| `exemplo/` | Uma empresa fictícia ("Aurora Sistemas") com o método preenchido — leia para entender o resultado final |
| `INSTALACAO.md` | Guia de implantação passo a passo + prompt de setup para a IA preencher tudo com você |

## Instalação em 3 passos

1. Copie a pasta `template/` para o local da sua documentação (ex.: raiz do repositório da equipe) e renomeie
2. Abra o `INSTALACAO.md` e siga o questionário — ou cole o **prompt de setup** na sua IA e responda às perguntas dela
3. Rode `node tools/validar-doc.js` — quando der 0 erros, aponte o `CLAUDE.md` dos seus projetos para o hub e comece a usar

## Requisitos

- Qualquer stack (a sua stack é uma variável que você define no setup)
- Qualquer assistente de IA que leia arquivos do projeto (Claude Code, Cursor, Copilot Workspace…)
- Node.js apenas para o validador (opcional, recomendado)

## Origem

Método extraído de um caso real: um portal corporativo em produção (17+ módulos, ~100 tabelas, dois ambientes espelhados) desenvolvido e mantido com IA usando exatamente esta estrutura.

---

## Autor

**Kasuo** — Arquiteto de Soluções com IA, criador do Método Norte.
Método extraído e refinado em produção real; contato para licenciamento, implantação e parcerias: kasuo.wkl@gmail.com

---

*Método Norte v1.0 — 2026-07 · © Kasuo · Licença: comercial proprietária — ver [LICENSE.md](LICENSE.md)*
