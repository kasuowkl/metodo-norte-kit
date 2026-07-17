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
