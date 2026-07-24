---
tipo: modulo
sistema: [id-do-sistema-principal]
status: atual
ultima_revisao: AAAA-MM-DD
---

# Regras Gerais – [Sistema Principal]

> **Sistema:** `[id]` · **Ler sempre** antes de qualquer outro módulo deste sistema.
> Voltar ao hub: [DocumentacaoPadrao.md](../DocumentacaoPadrao.template.md)

> 📝 Este módulo é o "sempre leia" do seu sistema mais mexido. As seções que mais
> reduzem erro da IA são **Nomenclatura** e **Bloqueios absolutos** — capriche nelas.

---

## Visão do sistema

[2–4 linhas: o que o sistema faz, tecnologias em uso, papel central]

## Estrutura principal

```text
[árvore real de pastas do projeto — copie do repositório, não invente]
```

## Regras obrigatórias

- [ex.: separar frontend e backend em pastas X e Y]
- [ex.: toda ação relevante gera log/auditoria]
- [ex.: toda rota protegida valida sessão E permissão]

## Nomenclatura

| Item | Padrão | Exemplo |
|------|--------|---------|
| Variáveis | [camelCase?] | |
| Tabelas/colunas | [snake_case?] | |
| Rotas API | [/api/<modulo>/...?] | |

## Bloqueios absolutos

> 📝 O formato "Não fazer X" é a defesa mais eficaz contra alucinação. Liste tudo que a IA
> já errou ou pode errar: estruturas que não existem, convenções erradas, stacks proibidas.

- Não inventar entidades no lugar das tabelas reais
- Não [bloqueio específico do seu projeto]
- Não [outro]

## Decisão da IA antes de executar

1. Confirmar que a solicitação é para **este** sistema
2. Verificar arquivos reais nas pastas antes de citar/alterar
3. Validar impacto em autenticação, permissão, banco e integrações
4. Priorizar o padrão real do código sobre arquitetura conceitual

## Retry limitado — não insistir em loop

Ao tentar concluir/consertar algo, se a **verificação falhar 3 vezes seguidas** (ou houver bloqueio externo: falta de credencial, serviço fora, decisão que só o usuário toma), **PARE e devolva ao usuário** o estado: o que tentou, o que falhou e a hipótese. Não fique em loop tentando variações da mesma correção — três ciclos sem sucesso significam que falta contexto ou decisão, não mais uma tentativa. Distinguir: erro **mecânico** → corrigir e re-verificar; **contradição/surpresa** (o código diz uma coisa, o esperado diz outra) → parar e expor, a contradição é o achado. *(Disciplina inspirada no Fable Method — ver [CREDITOS.md](../CREDITOS.template.md).)*
