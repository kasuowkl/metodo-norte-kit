---
tipo: adr
sistema: hub-clientes
status: ativa
ultima_revisao: 2026-06-20
---

# ADR 001 — E-mails sempre via fila, nunca envio direto

**Data:** 2026-06-20 · **Decisor:** equipe Aurora (após incidente)

## Contexto

Em junho, o SMTP do provedor ficou instável e o envio direto dentro do request derrubou a criação de faturas: o usuário recebia erro 500 porque o *e-mail* falhou, não a fatura. Além disso, reenvios manuais duplicaram cobranças por e-mail.

## Decisão

**Nenhum módulo chama SMTP diretamente.** Todo e-mail vira um registro na tabela `hub.notificacoes_fila` (com chave de idempotência por evento) e um worker processa a fila com retentativa e backoff. O request do usuário nunca espera o envio.

## Consequências

Criar e-mail novo = criar template + enfileirar evento (não importar o client SMTP). Falha de SMTP degrada para "e-mail atrasado", nunca para erro na operação principal. A chave de idempotência impede duplicar cobrança no retry.

## Referências

`modulos/servicosIntegracoes.md` (padrão de duas camadas) · incidente registrado em `progresso/2026-06.md`.
