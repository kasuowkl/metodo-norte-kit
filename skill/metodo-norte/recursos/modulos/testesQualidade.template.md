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

## Definition of Ready — antes de começar

**Não escrever código sem estes 4 confirmados.** O "pronto pra começar" é o par do "pronto pra
entregar": *Ready trava a alucinação na ENTRADA (confirmar antes de assumir); Done trava na SAÍDA
(observar antes de afirmar).*

1. **Sistema + ambiente confirmados.** Sei em qual sistema mexo; se houver ambientes espelhados
   (produção/homolog, etc.), sei em qual estou **pela config local** (`.env`), não pelo git remote
   (que engana) — ver Regra de Ouro **#0b ⚠️ ANTI-ALUCINAÇÃO**. Ambiente errado = mexer no lugar errado.
2. **Escopo e desenho confirmados.** Se o usuário **não** especificou o *como* (quais telas, campos,
   comportamento), apresentei minha leitura e **esperei confirmação** antes de codar — acertar o *o quê*
   não dá o direito de decidir o *como*. Investigar para reduzir ambiguidade é esperado; decidir sozinho
   o desenho, não.
3. **Critério de "pronto" declarado.** Antes de agir, disse em 1–2 frases **o que é concluído E como
   será verificado** (qual comando roda, qual tela abre, qual valor deve aparecer). Sem critério de
   verificação declarado, **não começo** (Define Done — ver seção abaixo).
4. **Contexto lido — código real, não suposição.** Localizei os arquivos reais e li os módulos que o
   índice do hub manda — **não invento em cima de suposição** (Regras de Ouro **⚠️ ANTI-ALUCINAÇÃO**
   "não inventar" / "priorizar código real").

> Se algum destes não está claro, **perguntar antes** — não assumir. Um "Ready" incompleto é a origem
> mais comum de retrabalho e de código construído sobre premissa errada.

## Verificar por observação, nunca por inferência

**"Pronto" só vale se foi observado — não deduzido.** Antes de considerar uma tarefa concluída:

- **Defina o "pronto" ANTES de agir** (Define Done): em 1–2 frases, diga o que é concluído **e como será verificado** (qual comando roda, qual tela abre, qual valor deve aparecer). Sem critério de verificação declarado, não comece.
- **Ao final, confirme esse critério por observação:** rodar o teste e ver passar, abrir a tela e ver o resultado, consultar o banco e ver a linha. **Proibido** afirmar sucesso por dedução ("deve funcionar", "a lógica está certa") sem ter visto.
- **Verifique o entorno:** o que funcionava ao redor continua funcionando (não quebrou nada vizinho).

*(Disciplina inspirada no Fable Method — ver [CREDITOS.md](../CREDITOS.template.md).)*

## Gêmeos do defeito (TWINS) — ao corrigir um bug

Um bug quase nunca está sozinho: o mesmo padrão errado costuma se repetir. Ao corrigir, **procure os gêmeos** antes de encerrar e registre literalmente no relatório:

```
TWINS: procurei <padrão/trecho> — achei <N> outros lugares: <lista de arquivos:linha ou "nenhum">
```

Se achar gêmeos, corrija todos (ou registre por que ficaram de fora). Corrigir 1 de 5 ocorrências e reportar "resolvido" é falso-concluído.

## Sandbox sintético NÃO substitui uso real

Bateria verde **não** é prova de que funciona. O sandbox é montado com os dados que a **IA imaginou** —
por isso ele nunca contém o caso que a IA não previu. Quando o usuário usa de verdade, aparece o que
teste nenhum acharia (um arquivo com quebra de linha diferente, uma tela sem link, um acúmulo de
subpixel que só se vê lá pela linha 1.500).

**Como aplicar:**
- Ao reportar, dizer **explicitamente o que NÃO foi exercitado pela interface**. "Testado na camada de
  serviço, não pela tela" é uma frase honesta e necessária.
- Nunca afirmar "está funcionando" apoiado só na bateria. Um boot que passa prova o `CREATE`, não o
  fluxo real.
- Depois que o usuário encontrar um defeito no uso real, **escrever o teste que faltava** — ele vira
  caso permanente na suíte.

*(Complementa "Verificar por observação" acima.)*

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
- **Não afirmar sucesso por inferência** — só "concluído" com o critério observado (rodou/viu), nunca deduzido
- **Não reportar bug corrigido sem a varredura de gêmeos** (linha `TWINS:`)
- **Não insistir além de 3 ciclos** de verificação falha — parar e devolver o estado
- Não usar credencial real em código de teste
