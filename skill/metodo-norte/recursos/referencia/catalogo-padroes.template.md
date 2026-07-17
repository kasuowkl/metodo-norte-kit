---
tipo: referencia
sistema: [id-do-sistema-principal]
status: atual
ultima_revisao: AAAA-MM-DD
---

# Catálogo de Padrões (componentes reutilizáveis)

> ## 🚨 REGRA OBRIGATÓRIA
> Ao **criar ou alterar** função de: [feedback ao usuário, escape de HTML, modal, exportação,
> busca de pessoas — liste os SEUS componentes repetidos] — é **OBRIGATÓRIO usar ou adaptar
> o padrão abaixo.** NÃO criar função própria, NÃO duplicar, NÃO reinventar.
>
> - Se o padrão não atende: **evoluir o próprio padrão** (todos ganham), não fazer versão local
> - Ao tocar módulo com versão antiga duplicada: **migrar para o padrão**
> - Padrão novo: **registrar aqui**

> 📝 Como montar: peça à IA para varrer o código procurando funções duplicadas
> (toast/alerta, escapeHtml, abrir/fechar modal, exportar CSV, formatar data…).
> Cada função repetida ≥3 vezes é candidata a virar componente padrão.

## Convenção

- [Onde os padrões moram — ex.: `public/js/padroes/`, sufixo no nome]
- Cada padrão é autossuficiente e idempotente

## Padrões existentes

| Padrão | Arquivo | O que faz | Status |
|--------|---------|-----------|--------|
| [Toast] | [...] | [...] | ✅ |

## Candidatos mapeados (a padronizar)

| Candidato | Repetições no código | Vira |
|-----------|----------------------|------|
| [...] | [n]x | [...] |
