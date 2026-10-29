---
tipo: ferramenta
sistema: todos
status: atual
ultima_revisao: AAAA-MM-DD
---

# Hooks opcionais — as regras que não dependem da memória da IA

> **Para quem usa o Claude Code** (CLI, VS Code ou desktop). Outras ferramentas de IA: as Regras #0, #15 e #16 do hub
> valem do mesmo jeito, só não há trava automática. Os três hooks são **opcionais** e independentes — instale só o que quiser.
> Voltar ao hub: [DocumentacaoPadrao.md](../../DocumentacaoPadrao.template.md)

| Hook | Evento | O que faz | Regra |
|---|---|---|---|
| `contexto-abertura.js` | `SessionStart` | sincroniza a doc com o remoto (pull só quando seguro) e injeta o **índice das pendências gerado por contagem** + protocolo + títulos do progresso | #0 |
| `ultima-sessao.js` | `SessionStart` | injeta as **últimas falas literais** (suas e da IA) da sessão anterior, com segredo mascarado — é delas que se responde "onde paramos" | #16 |
| `passo4-trava.js` | `PreToolUse` (Edit/Write) + `UserPromptSubmit` (`--lembrete`) | **nega a edição** até o Passo 4 da sessão estar gravado; a cada mensagem, lembra o roteamento pelo Índice | #15 |

Requisito: **Node.js 18+** no PATH. Nenhuma dependência externa.

## 1. Onde registrar (leia antes — é o erro que mais custa)

Registre no **settings do PROJETO** onde você trabalha com a IA: `<pasta do projeto>/.claude/settings.local.json`.
Assim vale para qualquer conta do Claude Code que abrir aquela pasta.

> ⚠️ **Hook registrado na conta errada roda à mão e NUNCA é chamado na sessão — e falha em silêncio.** Se você preferir o
> settings global (`~/.claude/settings.json`), confira em **qual pasta de conta** o Claude Code está rodando (quem usa
> mais de uma conta tem mais de uma pasta `~/.claude*`). Em uso real um hook ficou meses registrado na conta que não era a
> usada, e ninguém percebeu.

## 2. O que colar

Junte (não substitua) dentro do `"hooks"` do seu `settings.local.json`. Troque `<DOC>` pelo caminho da sua documentação
(use `/` mesmo no Windows; caminho com espaço vai entre aspas escapadas, como abaixo). Modelo pronto:
[settings.exemplo.json](settings.exemplo.json).

```json
{
  "hooks": {
    "SessionStart": [{ "hooks": [
      { "type": "command", "command": "node \"<DOC>/tools/hooks/contexto-abertura.js\"", "timeout": 30 },
      { "type": "command", "command": "node \"<DOC>/tools/hooks/ultima-sessao.js\"", "timeout": 10 }
    ] }],
    "PreToolUse": [{ "matcher": "Edit|Write|NotebookEdit", "hooks": [
      { "type": "command", "command": "node \"<DOC>/tools/hooks/passo4-trava.js\"", "timeout": 10 }
    ] }],
    "UserPromptSubmit": [{ "hooks": [
      { "type": "command", "command": "node \"<DOC>/tools/hooks/passo4-trava.js\" --lembrete", "timeout": 10 }
    ] }]
  }
}
```

**Ajustes sem editar código** (variáveis de ambiente, opcionais):

| Variável | Hook | Para quê |
|---|---|---|
| `DOC_DIR` | contexto-abertura | pasta da doc, se o script não estiver em `<DOC>/tools/hooks/` |
| `AMBIENTE_DOC` | contexto-abertura | título da seção `### …` do ESTADO cujas pendências são listadas uma a uma (ex.: `Produção`) |
| `NOME_USUARIO` | ultima-sessao | como o seu nome aparece no bloco das falas (padrão: "Usuário") |

No Windows, por exemplo: `"command": "set AMBIENTE_DOC=Produção&& node \"<DOC>/tools/hooks/contexto-abertura.js\""`.

## 3. Testar

```bash
node tools/hooks/passo4-trava.test.js        # 8 casos
node tools/hooks/ultima-sessao.test.js       # 10 casos
node tools/hooks/contexto-abertura.test.js   # 8 casos
```

⚠️ **Rodar à mão NÃO prova que o hook está ativo na sessão** — prova só que o script funciona. A prova real:

- **contexto-abertura / ultima-sessao:** abra uma sessão nova; a 1ª resposta da IA tem de citar o total do índice e a
  última fala da sessão anterior.
- **passo4-trava:** numa sessão nova, a 1ª edição tem de ser **negada** com o caminho do arquivo do Passo 4; depois de a IA
  gravá-lo, liberada.

## 4. Limites que valem saber

- **Teto de ~10 mil caracteres** por saída de hook: acima disso o Claude Code grava num arquivo e entrega só uma prévia.
  Por isso o contexto vai como **índice** (9 mil) e as falas com teto de 6 mil. Ao mexer nos scripts, meça o tamanho.
- **A trava garante que o Passo 4 existe, não que a leitura declarada foi feita.** Você confere pela lista de arquivos lidos.
- Erro interno de qualquer hook **não trava** nada: a trava libera e avisa; os de abertura viram uma linha de aviso.
- O arquivo do Passo 4 fica na pasta temporária do sistema (`claude-passo4/<id-da-sessão>.md`) e não precisa ser guardado.

## 5. Desligar

Tirar o bloco correspondente do `settings.local.json` (ou usar `/hooks` no Claude Code). Nada mais precisa ser desfeito.
