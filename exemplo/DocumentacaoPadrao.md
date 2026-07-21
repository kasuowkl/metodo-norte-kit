---
tipo: hub
sistema: todos
status: atual
ultima_revisao: 2026-07-10
---

# Documentação Padrão – Hub Central para IA (Aurora Sistemas)

> **Instrução obrigatória:** Este é o único ponto de entrada.
> A IA deve ler este arquivo **antes** de qualquer ação em qualquer projeto da Aurora Sistemas.

**Localização:** repositório `aurora/doc-padrao`, clonado na raiz do workspace de cada dev.

---

## Protocolo em 4 passos

```
1. IDENTIFICAR O SISTEMA  →  Catálogo de Sistemas
2. IDENTIFICAR A TAREFA   →  Índice por Assunto
3. LER OS MÓDULOS         →  Apenas os indicados
4. EXECUTAR               →  Aplicar regras; atualizar docs
```

## Passo 1 – Catálogo de Sistemas

| ID | Sistema | Onde fica o código | Banco / Stack | Ficha |
|----|---------|-------------------|---------------|-------|
| `hub-clientes` | Hub de Clientes (produção) | `repos/hub-clientes/` | PostgreSQL, NestJS, React | [sistemas/hub-clientes.md](sistemas/hub-clientes.md) |
| `site` | Site institucional | `repos/site-aurora/` | Estático (Astro) | *(ficha omitida no recorte)* |
| `erp-legado` | ERP interno (legado, PHP) | `repos/erp/` | MySQL 5.7 | *(ficha omitida no recorte)* |

### Regra anti-confusão (crítica)

| Situação | O que fazer |
|----------|-------------|
| Tela/API do portal que o **cliente** acessa | `hub-clientes` |
| Cadastro de produtos, notas, estoque (uso **interno**) | `erp-legado` — **NUNCA aplicar convenções do hub aqui** |
| Página pública de marketing | `site` |

**O `erp-legado` é intocável salvo correção pontual** — não modernizar, não refatorar, não "aproveitar para melhorar" sem pedido explícito.

## Stack padrão para sistemas novos

| Camada | Tecnologia | Proibido sem pedido |
|--------|------------|---------------------|
| Frontend | React + Vite | Angular, Vue |
| Backend | NestJS | Express puro, PHP |
| Banco | PostgreSQL | MySQL, MongoDB |

## Passo 2 – Índice por Assunto (recorte)

| Se o usuário pedir... | Ler |
|----------------------|-----|
| Qualquer tarefa no `hub-clientes` | `modulos/regrasGerais.md` |
| Banco, migrations (TypeORM) | `modulos/bancoDeDados.md` |
| E-mail, notificação, integração externa | `modulos/servicosIntegracoes.md` + [ADR 001](decisoes/001-fila-de-emails.md) |
| Login, perfis (cliente × operador × admin) | `modulos/permissoesAutenticacao.md` |
| Ver o que já existe | `referencia/catalogo-implementacoes.md` |

## Passo 3 – Regras de ouro (recorte)

1. Sistema novo = stack padrão, sem exceção salvo pedido explícito
2. Não inventar tabelas, colunas, rotas ou módulos — verificar o código real
3. Carregar só o necessário
4. E-mails **sempre via fila** — nunca envio direto no request ([ADR 001](decisoes/001-fila-de-emails.md))
5. Registrar toda ação relevante no `progresso/` + atualizar [ESTADO-ATUAL.md](ESTADO-ATUAL.md)

## Passo 4 – Como a IA deve responder

Antes de executar: **Sistema** · **Tipo de tarefa** · **Arquivos lidos** · **Área impactada** · **Risco** · **Plano**.

> *Recorte de demonstração — numa implantação real, este hub teria a árvore completa de arquivos e o índice cheio. Ver `template/` no kit.*
