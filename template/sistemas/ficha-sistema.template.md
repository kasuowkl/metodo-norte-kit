---
tipo: ficha
sistema: [id-curto]
status: atual
ultima_revisao: AAAA-MM-DD
---

# Ficha do Sistema – [Nome]

> **ID:** `[id-curto]` · **Status:** [produção / desenvolvimento / legado]
> Voltar ao hub: [DocumentacaoPadrao.md](../DocumentacaoPadrao.template.md)

> 📝 Uma ficha por sistema. O objetivo: a IA ler ISTO e saber onde mexer sem confundir
> com outro sistema. A seção "O que NÃO é este sistema" evita as confusões conhecidas.

## Identidade

| Campo | Valor |
|-------|-------|
| Nome | [...] |
| Domínio | [o que o sistema faz, 1 linha] |
| Código | [caminho do repositório/pasta] |
| Stack | [...] |
| Banco | [...] |

## Estrutura de pastas

```text
[árvore real — copiar do repositório]
```

## Módulos/áreas ativas

[lista — ou link para o catálogo de implementações se for o sistema principal]

## Integrações externas

[lista]

## Documentação a usar neste sistema

1. Sempre: [modulos/regrasGerais.md](../modulos/regrasGerais.template.md)
2. Por assunto: índice do [hub](../DocumentacaoPadrao.template.md)

## O que NÃO é este sistema

- **Não** é [sistema parecido com o qual pode ser confundido]
- **Não** usa [stack/estrutura que a IA pode presumir errado]

## Regra para a IA

Ao trabalhar aqui, **sempre** confirmar que está usando tabelas, rotas e pastas **deste** sistema.
