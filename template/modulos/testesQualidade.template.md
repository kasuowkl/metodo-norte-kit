---
tipo: modulo
sistema: todos
status: atual
ultima_revisao: AAAA-MM-DD
---

# Testes e Qualidade

> Voltar ao hub: [DocumentacaoPadrao.md](../DocumentacaoPadrao.template.md)

## Princípio

**Validação manual não escala com IA.** A IA produz código rápido demais para o QA humano acompanhar — todo código novo vem com teste automatizado sempre que viável, senão regressão silenciosa é questão de tempo.

## Padrão de teste automatizado

- **Runner:** [defina — recomendação: o nativo da sua stack, zero dependência nova]
- **Local:** [pasta `tests/` na raiz de cada sistema]
- **Execução:** [comando + script no gerenciador de pacotes]
- **Banco:** dados de teste ou transação com rollback — **nunca** teste destrutivo em produção

### O que cobrir (prioridade)

1. **Auth:** login ok/falha, rota protegida sem sessão → 401
2. **Permissões:** acesso **permitido e negado** (os dois!)
3. **CRUD:** caminho feliz + entrada inválida → 4xx com erro claro
4. **Integrações:** smoke de conectividade + comportamento em falha
5. Correção de bug → nasce com teste que **reproduzia o bug**

## Checklist mínimo de validação

1. Funcionalidade principal funciona
2. Testes do caminho alterado passam
3. Sem quebra em autenticação/permissão
4. Logs coerentes; integrações impactadas avaliadas
5. Como foi validado está registrado no progresso

## Bloqueios

- Não considerar tarefa concluída sem validação
- Não usar credencial real em código de teste
