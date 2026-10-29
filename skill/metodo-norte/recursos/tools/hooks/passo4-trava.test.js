'use strict';
// Teste da trava do Passo 4 (Regra #15): roda o script DE VERDADE como o Claude Code roda (stdin JSON → stdout).
// Uso: node tools/hooks/passo4-trava.test.js   (sai com código 1 se algum caso falhar)
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const t = require('./passo4-trava.js');

const SCRIPT = path.join(__dirname, 'passo4-trava.js');
const SESSAO = 'teste-trava-' + process.pid;
const P4 = t.arquivoPasso4(SESSAO);
const BASE = path.join(os.tmpdir(), 'projeto-teste');
const rodar = (entrada, args = []) => execFileSync(process.execPath, [SCRIPT, ...args], { input: entrada, encoding: 'utf8' });
const editar = (alvo) => rodar(JSON.stringify({ session_id: SESSAO, tool_name: 'Edit', tool_input: { file_path: alvo } }));
const negou = (saida) => { try { return JSON.parse(saida).hookSpecificOutput.permissionDecision === 'deny'; } catch (e) { return false; } };

let falhas = 0;
function caso(nome, ok) { console.log((ok ? '✅ ' : '❌ ') + nome); if (!ok) falhas++; }

fs.mkdirSync(path.dirname(P4), { recursive: true });
try { fs.unlinkSync(P4); } catch (e) { /* não existia */ }

const codigo = path.join(BASE, 'a.js');
caso('1. sem Passo 4 → nega e diz o caminho', negou(editar(codigo)) && editar(codigo).includes(SESSAO));
fs.writeFileSync(P4, 'Sistema: x\nTarefa: y\nArquivos lidos: DocumentacaoPadrao.md\n');
const inc = editar(codigo);
caso('2. incompleto → nega e lista o que falta (área, risco, plano, lições)', negou(inc) && /Área/.test(inc) && /Risco/.test(inc) && /Plano/.test(inc) && /licoes-da-ia/.test(inc));
fs.writeFileSync(P4, 'Sistema: x\nTarefa: y\nArquivos lidos: DocumentacaoPadrao.md, referencia/licoes-da-ia.md\nÁrea impactada: z\nRisco principal: r\nPlano: p\n');
caso('3. completo → libera (saída vazia)', editar(codigo) === '');
fs.unlinkSync(P4);
caso('4. pasta de memória sem Passo 4 → libera', editar(path.join(os.homedir(), '.claude', 'projects', 'abc', 'memory', 'x.md')) === '');
caso('5. o próprio arquivo do Passo 4 → libera', editar(P4) === '');
caso('6. memória de OUTRO lugar não engana (…/memory fora de .claude/projects) → nega', negou(editar(path.join(BASE, 'memory', 'a.js'))));
caso('7. --lembrete injeta o roteamento', JSON.parse(rodar('', ['--lembrete'])).hookSpecificOutput.additionalContext.includes('Índice por Assunto'));
caso('8. entrada quebrada → libera com aviso (não trava o trabalho)', /erro interno/.test(rodar('nao-json')));

console.log(falhas ? `\n${falhas} caso(s) falharam` : '\nTodos os casos passaram');
process.exit(falhas ? 1 : 0);
