---
tipo: modulo
sistema: [id-do-sistema]
status: atual
ultima_revisao: AAAA-MM-DD
---

# Serviços e Integrações

> **Sistema:** `[id]` · Voltar ao hub: [DocumentacaoPadrao.md](../DocumentacaoPadrao.template.md)

## Quando usar

Criar serviço interno, integrar API externa, e-mail, webhook, bot, mensageria ou tarefa agendada.

## 🧭 PADRÃO DE DUAS CAMADAS — "Conexão central, comportamento por sistema"

Toda integração externa separa a configuração em duas camadas, cada uma com dono claro:

**Camada 1 — CONEXÃO (central):** credenciais e endereço da API (token, URL, key) vivem em **UM lugar só** (config central + fallback `.env`), expostos por um serviço que todo módulo chama. A tela central da integração tem apenas: liga/desliga, credenciais e **Testar conexão (server-side)**.

**Camada 2 — COMPORTAMENTO (no próprio módulo):** quais eventos disparam, para quem, com que template — configurado **na tela do próprio módulo**, que lê a credencial da camada 1 (nunca a duplica).

Consequências: ❌ proibido módulo ter cópia própria de token/URL · ❌ proibido comportamento de módulo na config central · ✅ toggle na tela só existe se houver disparo real no backend · ✅ teste de conexão nunca expõe o token ao navegador.

### Mapa de integrações (manter atualizado)

| Integração | Camada 1 (onde) | Camada 2 (onde) | Conforme? |
|-----------|------------------|------------------|-----------|
| [ex.: SMTP] | [...] | [...] | ✅/⚠️ |

## Regra de API externa (criar / alterar / integrar)

1. **Antes de codar:** ler a documentação oficial da API — parâmetros obrigatórios, formatos, limites, rate-limit. Registrar a regra em comentário no serviço (link + data). Não assumir formato por tentativa.
2. **Resiliência:** retentativa com backoff para 429/5xx; timeout explícito em toda chamada; **falha de transporte nunca vira "lista vazia"** — logar e sinalizar fonte indisponível.
3. **Diagnóstico — nosso erro × erro deles:** ler o corpo do erro, não só o status. `400` = quase sempre nosso; `401/403` = credencial; `429` = ritmo; `5xx`/timeout = instabilidade deles (aguardar/retentar, não "corrigir" nosso código).
4. **Observabilidade:** logar URL (sem credencial), status e resumo do payload; expor na tela a última execução.

## Bloqueios

- Não conectar frontend a serviço externo sensível
- Não criar integração sem log, tratamento de erro e retentativa
- Não [seus bloqueios]
