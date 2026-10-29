---
tipo: referencia
sistema: todos
status: atual
ultima_revisao: AAAA-MM-DD
---

# 🧠 Lições da IA — o que já deu errado e não pode se repetir

> **Uma página, lida em toda sessão (Regra #0).** Cada correção que você fizer na IA e que valer para o
> futuro vira **uma linha aqui**, com o porquê. A memória automática das ferramentas de IA fica presa a
> uma conta/máquina; esta página vale para **todas** as frentes (editor, app, outra máquina, outro colega).
>
> 📝 Formato: `N. **`nome-curto`** — a lição em 1 frase (o que fazer), com o caso que a originou em poucas palavras.`
> Agrupe por tema. Quando passar de ~40 linhas, condense lições parecidas.

## 0. Como trabalhar com [SEU NOME]

1. **Uma coisa de cada vez** — entregar uma fatia e esperar retorno antes da próxima.
2. **Não deduzir — confirmar** — investigar é bom; decidir o *como* sem perguntar, não.
3. **Registrar assim que termina e está testado** — sessão que fecha leva o que não foi escrito.
4. **Teste sintético não substitui uso real** — dizer o que a tela **não** exercitou.

## ✅ Validar de verdade

1. **`validar-onde-o-usuario-olha`** — corrigir no clone local não é corrigir para quem abre o servidor; validar lá.
2. **`medicao-que-distingue`** — só declarar sucesso se a medição separaria o certo do errado.
3. **`validar-onde-a-ia-recebe`** — hook/automação: medir o que **chega** ao contexto, não o que o script gera.

## 🔀 Git e ambientes

1. **`medir-antes-de-afirmar`** — "quem está à frente" se responde com `git`, não com a doc (a doc envelhece).
2. **`pendencia-antiga-nao-e-diagnostico`** — texto de pendência é o que era verdade quando foi escrito; medir de novo antes de dizer "confirmado".

## 🧭 Método e escopo

1. **`fazer-o-pedido-nao-a-melhoria`** — entregar o que foi pedido; melhoria adjacente vira uma frase de oferta.
2. **`abertura-nao-e-a-leitura-inteira`** — ler os documentos da abertura não é ler a documentação: a cada pedido, voltar ao Índice, ler os módulos dele e gravar o Passo 4 (Regra #15). A ferramenta cortou o hub e a IA seguiu com a metade.
3. **`combinado-vale-a-cada-pedido`** — todo pedido novo vira linha no combinado da entrega **antes** de codar; combinado que parou na 1ª entrega enquanto o sistema seguiu 30 versões é combinado morto.
4. **`excecao-sem-fala-dele-e-proposta-minha`** — exceção à stack/padrão sem a fala do usuário citada é proposta da IA, mesmo que ele tenha dito "sim" ao pacote inteiro.
5. **`fatia-no-ar-diz-o-que-falta`** — ao dizer "no ar", dizer junto o que do pedido ainda não existe: "✅ no ar: X · ⏳ ainda não existe: Y (fatia N)". "Pronto" sem "falta" fez o usuário achar que o pedido inteiro foi mal entendido.

## 🚀 Abertura e status

1. **`onde-paramos-se-responde-pelas-falas`** — "onde paramos?" se responde pelo que foi **dito** no fim da sessão anterior, conferido no git/servidor, no formato da Regra #16; responder pela doc com tabela de 🟡/⏳ fez trabalho pronto parecer incompleto.
2. **`hook-registrado-nao-e-hook-rodando`** — conferir que o hook de abertura **chegou** ao contexto antes de dizer que "os hooks rodaram"; um hook ficou meses sem registro em nenhuma conta.

## 🚢 Publicação

1. **`deploy-so-com-teste-verde`** — o deploy encadeado trava no resultado exato do teste (`grep -q "^# fail 0$" || exit 1`); `npm test | grep fail && deploy` publica com teste vermelho porque o `grep` acha "# fail 1" e dá sucesso. Aconteceu duas vezes antes de virar regra.
