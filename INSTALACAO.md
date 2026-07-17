# Guia de Instalação e Implantação

Este guia leva sua equipe do zero até a documentação funcionando. Tempo típico: 1–2 horas para a primeira versão útil.

---

## Caminho rápido (recomendado): a IA preenche com você

Copie a pasta `template/` para onde sua documentação vai morar, renomeie (ex.: `Documentacao-Padrao-MinhaEmpresa`), abra a pasta na sua IA (Claude Code, Cursor…) e cole este prompt:

```text
Você vai me ajudar a implantar o Método Documentação-IA nesta pasta.

Faça-me as perguntas do questionário abaixo, UMA POR VEZ, e use minhas
respostas para preencher os arquivos .template.md (removendo o sufixo
".template" ao salvar). Em cada arquivo, siga as instruções marcadas
com 📝 e remova esses blocos de instrução ao concluir.

QUESTIONÁRIO:
1. Nome da empresa/equipe?
2. Quais SISTEMAS vocês têm hoje? Para cada um: nome, um ID curto
   (ex.: "portal-rh"), onde fica o código, qual banco usa, e se está
   em produção, desenvolvimento ou é legado.
3. Qual a STACK PADRÃO para sistemas novos? (frontend, backend, banco,
   e o que é PROIBIDO sem pedido explícito)
4. Existem AMBIENTES separados (dev/homolog/prod, matriz/filial)?
   Como os segredos de cada um são gerenciados?
5. Quais INTEGRAÇÕES externas existem? (e-mail, mensageria, ERP, APIs)
6. Como funciona AUTENTICAÇÃO e PERMISSÃO hoje?
7. Quais CONVENÇÕES de código já existem? (nomenclatura de tabelas,
   rotas, pastas — se não houver, proponha e eu aprovo)
8. Que COMPONENTES reutilizáveis já existem no código? (toast, modal,
   export CSV… — se souber onde ficam, me diga os caminhos)
9. Existem DECISÕES de arquitetura importantes que a IA nunca deve
   desfazer? (vou transformá-las em ADRs)
10. Quem valida o trabalho da IA e como? (testes automatizados? manual?)

Ao terminar: rode node tools/validar-doc.js, corrija o que apontar,
e me entregue um resumo do que foi criado.
```

A IA monta a primeira versão; você revisa e ajusta. **A documentação nasce ~80% certa e melhora com o uso** — a regra de manutenção (registrar toda ação no `progresso/`) faz o resto.

---

## Caminho manual

Se preferir preencher à mão, esta é a ordem que funciona melhor:

1. **`DocumentacaoPadrao.md` (hub)** — comece pelo Catálogo de Sistemas (liste o que existe) e pela stack padrão. O Índice por Assunto pode começar pequeno (3–4 linhas) e crescer.
2. **`sistemas/`** — uma ficha por sistema, usando `ficha-sistema.template.md`. Priorize o sistema mais mexido.
3. **`modulos/regrasGerais.md`** — convenções e bloqueios do sistema principal. **Capriche nos bloqueios**: cada "não faça X" evita uma classe inteira de erro da IA.
4. **`modulos/stackPadrao.md`** — stack obrigatória + o que é proibido.
5. **`ESTADO-ATUAL.md`** — status de agora + pendências abertas.
6. Os demais módulos (`bancoDeDados`, `servicosIntegracoes`, `seguranca`, `testesQualidade`…) conforme a necessidade aparecer — não precisa tudo no dia 1.
7. **`CLAUDE.md`** — ajuste e copie/referencie na raiz de cada projeto de código.

## Checklist de implantação

- [ ] Pasta copiada e renomeada; arquivos `.template.md` renomeados ao preencher
- [ ] Hub com catálogo de sistemas real (mínimo: todos os sistemas listados com ID)
- [ ] Ficha do sistema principal criada
- [ ] Regras gerais com pelo menos 5 bloqueios explícitos
- [ ] Stack padrão definida (com a lista de proibidos)
- [ ] `ESTADO-ATUAL.md` refletindo o momento real
- [ ] `node tools/validar-doc.js` → 0 erros
- [ ] `CLAUDE.md` (ou equivalente) apontando para o hub em cada projeto
- [ ] Teste de fogo: peça à IA uma tarefa real e confira se ela responde no formato "Sistema identificado / Arquivos lidos / Plano" antes de executar
- [ ] Regra de manutenção combinada com a equipe: **toda ação relevante gera entrada no `progresso/AAAA-MM.md`**

## Como saber que está funcionando

Nas primeiras 2 semanas, observe: a IA parou de inventar tabelas/rotas? Parou de sugerir stack proibida? Consegue retomar contexto de dias atrás pelo `ESTADO-ATUAL.md`? Quando a resposta for sim para os três, o método pegou. Quando for não, a causa quase sempre é: falta bloqueio explícito no módulo certo, ou o índice do hub não roteia aquele assunto — corrija a doc, não repreenda a IA.
