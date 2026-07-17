---
tipo: modulo
sistema: todos
status: atual
ultima_revisao: AAAA-MM-DD
---

# Stack Padrão

> **Escopo:** todo sistema **novo** e toda reconstrução.
> Voltar ao hub: [DocumentacaoPadrao.md](../DocumentacaoPadrao.template.md)

> 📝 A coluna "Proibido" é tão importante quanto a "Tecnologia": é ela que impede a IA
> de sugerir o framework da moda no meio do seu projeto.

## Stack obrigatória

| Camada | Tecnologia | Proibido (sem pedido explícito) |
|--------|------------|----------------------------------|
| Frontend | [...] | [...] |
| Backend | [...] | [...] |
| Banco | [...] | [...] |
| Autenticação/Sessão | [...] | [...] |
| Logs | [...] | — |

## Dependências padrão

```json
{ "exemplo": "liste aqui as dependências aprovadas com versões" }
```

## Estrutura mínima de pastas (sistema novo)

```text
NomeDoSistema/
├── .env                  ← nunca commitar
├── [estrutura padrão da sua equipe]
```

## Convenções de nomenclatura

[Mesma tabela do regrasGerais, se valer para todos os sistemas — ou link para lá]

## Bloqueios absolutos

- Não hardcodar credencial/conexão no código
- Não armazenar senha em texto puro
- Não [seus bloqueios de stack]
