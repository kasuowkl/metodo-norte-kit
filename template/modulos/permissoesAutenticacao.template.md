---
tipo: modulo
sistema: [id-do-sistema]
status: atual
ultima_revisao: AAAA-MM-DD
---

# Permissões e Autenticação

> **Sistema:** `[id]` · Voltar ao hub: [DocumentacaoPadrao.md](../DocumentacaoPadrao.template.md)

## Quando usar

Permissões, perfis, login, sessão, bloqueio de usuário.

## Autenticação

- Tipos: [local? SSO? LDAP? chave de API server-to-server?]
- Fluxo de login: [descrever o fluxo real, na ordem]
- Sessão: [como persiste, expiração]

## Permissões

- Modelo: [níveis? papéis? grupos? — descrever o modelo REAL, não o desejado]
- **Default:** [aberto ou fechado? recomendado: fechado — recurso novo só aparece p/ admin até conceder]
- Onde se configura: [tela/tabela]

## Regras

- Senhas sempre com hash — nunca texto puro
- Validar autenticação **e** permissão em toda rota protegida
- Testar acesso **permitido e negado** ao mexer em permissão

## Bloqueios

- Não conceder acesso admin por atalho
- Não alterar fluxo de login sem motivo registrado
- Não [seus bloqueios]
