#!/usr/bin/env node
/**
 * TRAVA DO PASSO 4 (Regra #15 do hub) — hook do Claude Code. Opcional.
 *
 * Por quê: a abertura (ler o hub, o ESTADO e o progresso) não é a leitura inteira. Em uso real a IA leu só a abertura
 * (o hub veio cortado pela ferramenta de leitura e ela seguiu), pulou o Índice por Assunto, o ciclo de desenvolvimento,
 * a segurança e as lições, e construiu várias fatias seguidas sem esperar o teste do usuário. Regra escrita não bastou;
 * esta trava não depende da memória da IA.
 *
 * Dois modos:
 *   (sem argumento)  PreToolUse em Edit|Write|NotebookEdit → NEGA a edição enquanto não existir o arquivo do Passo 4
 *                    desta sessão com os 6 campos (Sistema, Tarefa, Arquivos lidos, Área, Risco, Plano) e, nos arquivos
 *                    lidos, DocumentacaoPadrao.md e licoes-da-ia.md. A negação diz o caminho exato do arquivo.
 *   --lembrete       UserPromptSubmit → injeta, a cada mensagem do usuário, o lembrete do roteamento (Índice por Assunto)
 *                    e da leitura até o fim.
 *
 * Livre sem o Passo 4: o próprio arquivo do Passo 4 e a pasta de memória do Claude Code (.claude/projects/NOME/memory, ou .claude-OUTRA-CONTA/…).
 * Erro interno do script → LIBERA e avisa (defeito da trava não pode travar o trabalho).
 * Instalar / desligar: tools/hooks/LEIA-ME.md.
 */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');

const PASTA = path.join(os.tmpdir(), 'claude-passo4');
const CAMPOS = [
  ['Sistema', /^\W*sistema\b/im],
  ['Tarefa', /^\W*tarefa\b/im],
  ['Arquivos lidos', /^\W*arquivos lidos\b/im],
  ['Área impactada', /^\W*[áa]rea\b/im],
  ['Risco principal', /^\W*risco\b/im],
  ['Plano', /^\W*plano\b/im],
];
// 📝 Arquivos que TODO Passo 4 tem de declarar como lidos — ajuste se o seu hub/lições tiverem outro nome.
const OBRIGATORIOS = ['DocumentacaoPadrao.md', 'licoes-da-ia.md'];

const LEMBRETE = 'REGRA #15 (trava do Passo 4): (1) PEDIDO NOVO? Antes de editar, voltar ao "Passo 2 – Índice por Assunto" do ' +
  'DocumentacaoPadrao.md, citar os módulos que ele manda ler para ESTE pedido (ex.: desenvolver → cicloDesenvolvimento.md; ' +
  'autenticação/permissão → seguranca.md + permissoesAutenticacao.md), LER esses módulos e acrescentar um bloco "Pedido:" ' +
  'no arquivo do Passo 4 desta sessão. (2) Documento obrigatório cortado pela ferramenta de leitura = ler o RESTO antes de ' +
  'qualquer outra ação. (3) Decisão que não está na ficha/combinado = perguntar, não deduzir. (4) Ciclo: uma fatia por vez, ' +
  'plano de 3 linhas, parar para o teste do usuário.';

function arquivoPasso4(sessao) {
  const id = String(sessao || 'sem-sessao').replace(/[^A-Za-z0-9_-]/g, '');
  return path.join(PASTA, id + '.md');
}

/** Pura (testada): o que falta no texto do Passo 4. [] = completo. */
function faltando(texto) {
  const t = String(texto || '');
  const f = CAMPOS.filter(([, re]) => !re.test(t)).map(([n]) => n);
  for (const a of OBRIGATORIOS) if (!t.toLowerCase().includes(a.toLowerCase())) f.push('"' + a + '" nos arquivos lidos');
  return f;
}

/** Pura (testada): caminho que pode ser escrito sem o Passo 4. */
function livre(alvo, passo4) {
  if (!alvo) return false;
  const n = path.resolve(String(alvo)).toLowerCase().replace(/\\/g, '/');
  if (n === path.resolve(passo4).toLowerCase().replace(/\\/g, '/')) return true;
  return /\/\.claude[^/]*\/projects\/[^/]+\/memory\//.test(n);
}

function decidir(entrada) {
  const passo4 = arquivoPasso4(entrada.session_id);
  const ti = entrada.tool_input || {};
  const alvo = ti.file_path || ti.notebook_path || '';
  if (livre(alvo, passo4)) return null;
  let texto = '';
  try { texto = fs.readFileSync(passo4, 'utf8'); } catch (e) { /* não existe */ }
  const f = texto ? faltando(texto) : ['o arquivo inteiro'];
  if (!f.length) return null;
  return 'BLOQUEADO pela Regra #15 (trava do Passo 4). Antes de editar qualquer arquivo, grave o Passo 4 desta sessão em:\n' +
    passo4 + '\ncom: Sistema · Tarefa · Arquivos lidos (incluindo DocumentacaoPadrao.md INTEIRO e referencia/licoes-da-ia.md, ' +
    '+ os módulos que o Índice por Assunto manda para este pedido) · Área impactada · Risco principal · Plano. ' +
    'Faltando agora: ' + f.join(', ') + '. Mostre o Passo 4 ao usuário na resposta.';
}

function main() {
  if (process.argv.includes('--lembrete')) {
    process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: 'UserPromptSubmit', additionalContext: LEMBRETE } }));
    return;
  }
  let bruto = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (d) => { bruto += d; });
  process.stdin.on('end', () => {
    try {
      const motivo = decidir(JSON.parse(bruto || '{}'));
      if (motivo) {
        process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason: motivo } }));
      }
    } catch (e) {
      // defeito da trava não pode travar o trabalho: libera e avisa
      process.stdout.write(JSON.stringify({ systemMessage: 'Trava do Passo 4 com erro interno (liberado): ' + e.message }));
    }
  });
}

if (require.main === module) main();
module.exports = { faltando, livre, arquivoPasso4, decidir, LEMBRETE };
