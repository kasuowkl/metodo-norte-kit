# Processo de Melhorias — do Feedback do Piloto ao Kit v1.x

> Como transformar cada `FEEDBACK-PILOTO.md` preenchido em melhoria concreta do kit.
> Regra de ouro: **feedback não processado em 1 semana esfria** — triar logo que chegar.

## Fluxo

```
Piloto devolve FEEDBACK-PILOTO.md preenchido
        ↓
1. TRIAGEM  — classificar cada item (tabela abaixo)
        ↓
2. CORREÇÃO — aplicar no arquivo certo do kit
        ↓
3. REGISTRO — CHANGELOG.md + nova versão
        ↓
4. RETORNO  — avisar o piloto o que mudou por causa dele
```

## 1. Triagem — classificar cada travada/sugestão

| Tipo | Sinal no feedback | Onde corrigir |
|------|-------------------|---------------|
| **Instrução confusa** | "não entendi o que preencher em X" | Bloco 📝 do template correspondente — reescrever com exemplo |
| **Lacuna do guia** | "travei no passo Y da implantação" | `INSTALACAO.md` — adicionar passo/aviso |
| **Prompt de setup falhou** | "a IA pulou/errou a pergunta N" | Prompt no `INSTALACAO.md` + Passo 1 da skill (`skill/metodo-norte/SKILL.md`) |
| **Template faltando** | "meu caso precisava de módulo Z" | Criar `template/modulos/Z.template.md` (avaliar se é geral ou nicho) |
| **Template inútil** | "não usei o arquivo W" | Não remover na 1ª ocorrência — marcar; remover se 2+ pilotos ignorarem |
| **Validador** | "erro do validador não ficou claro" | Mensagem em `template/tools/validar-doc.js` |
| **Método não pegou** | perguntas 6–8 negativas | Caso sério: investigar com o piloto ONDE a IA desobedeceu; quase sempre vira bloqueio novo ou linha de índice no hub template |
| **Preço/posicionamento** | pergunta 10 | Anotar em planilha própria — não muda o kit, muda a oferta |

Prioridade: o que **impediu** o piloto de avançar > o que confundiu > o que faltou > cosmético.

## 2. Correção

- Corrigir **no template**, não só explicar ao piloto — o próximo comprador não pode tropeçar no mesmo lugar
- **`template/` é a fonte canônica** — nunca editar `skill/metodo-norte/recursos/` nem o `.skill` à mão
- Cada travada corrigida deve responder: "se o próximo piloto chegar aqui, ele passa direto?"
- Rodar `node template/tools/validar-doc.js` após mexer nos templates
- Após qualquer mudança em `template/` ou no `SKILL.md`: **rodar `node tools/build.js`** — sincroniza `template/` → `recursos/` e regera o `metodo-norte.skill`

## 3. Registro

- Entrada no `CHANGELOG.md` (formato lá dentro), incrementando versão: correção = 1.0.x · template/seção nova = 1.x.0
- Commit: `fix(kit): <o que> — feedback piloto <nome>`

## 4. Retorno ao piloto

Mensagem curta: "seu feedback virou as melhorias X, Y, Z na v1.0.1 — obrigado". Piloto que vê o próprio impacto vira o primeiro divulgador (e possivelmente o primeiro cliente).

## Critério de "pronto para vender"

O kit está pronto quando **um piloto implanta do zero, sem nenhuma ajuda, em menos de 2 horas, e a IA dele passa no teste de fogo** (responde no formato Sistema/Arquivos/Plano). Até lá, cada piloto é investimento em produto.
