# Instruções para IA – [NOME DA EMPRESA]

> 📝 Este arquivo vai na RAIZ de cada projeto de código (ou é referenciado por ele).
> É o gancho que faz a IA entrar no método. Ajuste os caminhos e remova este bloco.

## Regra principal

Antes de **qualquer** criação, alteração, correção, análise ou remoção em qualquer projeto:

1. Leia `DocumentacaoPadrao.md` em [caminho da pasta da documentação]
2. Identifique o **sistema** e o **tipo de tarefa** (+ **ambiente**, se houver mais de um)
3. Leia **apenas** os módulos indicados pelo índice
4. Confirme ao usuário: sistema, arquivos lidos e ação planejada

## Stack obrigatória para sistemas novos

Todo sistema **novo** deve usar: **[STACK PADRÃO]**.
Não usar [TECNOLOGIAS PROIBIDAS] sem pedido explícito do usuário.

## Ao concluir qualquer ação relevante

1. Entrada curta no topo de `progresso/AAAA-MM.md` (mês corrente)
2. Atualizar `ESTADO-ATUAL.md` se status ou pendências mudaram
3. Se mexeu na doc: rodar `node tools/validar-doc.js` antes de commitar

## Resposta esperada

```text
Li DocumentacaoPadrao.md, identifiquei o sistema [NOME] e o tipo de tarefa [TIPO].
Arquivos lidos: [lista].
Vou executar conforme essas regras.
```
