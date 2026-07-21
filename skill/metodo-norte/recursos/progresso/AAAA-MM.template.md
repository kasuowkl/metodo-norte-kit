---
tipo: progresso
sistema: todos
status: atual
ultima_revisao: AAAA-MM-DD
---

# 🕘 Progresso — [Mês/Ano]

> Histórico do mês (mais recente primeiro). Status vivo e pendências: [ESTADO-ATUAL.md](../ESTADO-ATUAL.template.md).
> Um arquivo novo por mês — histórico fatiado não pesa no contexto da IA.
>
> **Formato da entrada (curta e objetiva — máx. ~10 linhas):**
> ```
> ### AAAA-MM-DD (título curto)
> **🗣️ Solicitação [AMBIENTE/ÁREA]:** o que o usuário pediu
> **✅ Feito:** o que foi entregue (arquivos/área) — autor
> ```
> Decisão de arquitetura estável → também criar ADR em [decisoes/](../decisoes/LEIA-ME.md).

### AAAA-MM-DD (exemplo — apagar)
**🗣️ Solicitação [PROD]:** Corrigir o cálculo de frete que arredondava errado.
**✅ Feito:** ajustado `services/freteService.js` (arredondamento p/ 2 casas ANTES de somar); teste `tests/frete.test.js` reproduzindo o bug adicionado; validado com os 3 casos do chamado. — *IA*
