---
tipo: modulo
sistema: todos
status: atual
ultima_revisao: AAAA-MM-DD
---

# Criar ou Alterar Módulos e Funcionalidades

> **Ler também:** [regrasGerais.md](regrasGerais.template.md)
> Voltar ao hub: [DocumentacaoPadrao.md](../DocumentacaoPadrao.template.md)

## Quando usar

Criar módulo/feature novo, ou alterar funcionalidade existente. É o caminho mais comum — mantenha
este arquivo o mais concreto possível para o seu projeto.

## Passos

1. Definir nome técnico e onde vive (rota, tela, serviço, script de banco)
2. Criar/estender a rota
3. Criar/estender a tela
4. Criar serviço de apoio se houver integração
5. Definir tabelas → [bancoDeDados.md](bancoDeDados.template.md)
6. Definir permissões → [permissoesAutenticacao.md](permissoesAutenticacao.template.md)
7. Registrar logs/auditoria nas operações que alteram dados

## Exemplo de rota CRUD (molde)

> 📝 Substitua pelo molde **real do seu projeto** — copie de uma rota que já funciona. O objetivo é a
> IA copiar a **forma** (validar → parametrizar → retornar padrão → tratar erro), não reinventar por rota.

```javascript
// POST /api/<recurso>  — criar
router.post('/api/<recurso>', verificarLogin, async (req, res) => {
  const usuario = /* quem está logado */;
  const { nome } = req.body;

  if (!nome?.trim())                              // 1. validar ANTES de tocar no banco
    return res.status(400).json({ erro: 'Informe o nome.' });

  try {
    const criado = await /* INSERT parametrizado — NUNCA concatenar dados do usuário na query */;
    registrarLog({ usuario, acao: 'CRIACAO', detalhes: `<recurso> "${nome}" criado` }); // 2. log após sucesso
    res.json({ sucesso: true, mensagem: 'Criado.', item: criado });
  } catch (erro) {
    logErro(erro);                                // 3. catch loga o erro real
    res.status(500).json({ erro: 'Erro ao criar.' }); //    e devolve msg genérica
  }
});
```

## Padrão de resposta e erro (obrigatório)

Todo endpoint responde no **mesmo formato** — não invente o seu por rota:

| Situação | Resposta |
|----------|----------|
| Sucesso com dado | `{ sucesso: true, <chave>: dado }` |
| Sucesso sem dado | `{ sucesso: true, mensagem: '...' }` |
| Entrada inválida | `400 { erro: '...' }` |
| Sem autenticação | `401` |
| Sem permissão | `403 { erro: '...' }` |
| Não encontrado | `404 { erro: '...' }` |
| Erro de servidor | `500 { erro: '...' }` — mensagem **genérica**; o erro real só no log |

> **Falha de serviço externo (timeout/5xx) nunca vira "lista vazia"** — propague o erro. Retornar `[]`
> quando a integração caiu faz o sistema "parecer OK" e esconde o problema.

## 🚫 Anti-padrões (o que NÃO fazer)

- **SQL/comando com dados do usuário concatenados** → injeção. Use parâmetros/prepared statements.
- **Duplicar componente-padrão** (seu próprio toast/modal/escape/export) → use/adapte o do catálogo de
  padrões (Regra de Ouro "usar os padrões existentes"). Se não atende, **evolua o padrão**.
- **Esquecer o log** em operação que altera dados → some a auditoria.
- **`catch` que engole o erro** e devolve sucesso/lista vazia → mascara falha; o entorno "parece OK".
- **Contar recursos no seu `.md`** (nº de módulos/tabelas) → a fonte é o catálogo de implementações
  (Regra "números têm UMA fonte").

## ✅ Checklist — antes de dar por pronto

- [ ] Rota segue o molde (validar → parametrizar → resposta padrão → try/catch com log)
- [ ] Rota registrada no bootstrap do app
- [ ] Tela usando os **componentes-padrão** (não duplicados)
- [ ] Permissão validada — acesso **permitido e negado** ([permissoesAutenticacao.md](permissoesAutenticacao.template.md))
- [ ] Log nas operações que alteram dados
- [ ] **Teste automatizado** do caminho criado/alterado ([testesQualidade.md](testesQualidade.template.md))
- [ ] **Verificado por observação** (rodou/viu), não deduzido — e dito o que NÃO foi exercitado pela tela
- [ ] Catálogo de implementações atualizado; registrado no progresso

## Bloqueios

- Não misturar a lógica de dois módulos no mesmo backend
- Não acessar dados internos de outro módulo sem a camada apropriada
- Módulo deve ser pensável como ativável/desativável
