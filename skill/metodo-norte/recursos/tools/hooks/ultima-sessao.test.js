'use strict';
// Teste do hook do fim da sessão anterior (Regra #16): roda o script DE VERDADE como o Claude Code roda (stdin JSON → stdout).
// Uso: node tools/hooks/ultima-sessao.test.js   (sai com código 1 se algum caso falhar)
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const u = require('./ultima-sessao.js');

const SCRIPT = path.join(__dirname, 'ultima-sessao.js');
const PASTA = fs.mkdtempSync(path.join(os.tmpdir(), 'ultima-sessao-'));
const env = { ...process.env, NOME_USUARIO: '' };
delete env.NOME_USUARIO;
const rodar = (entrada) => JSON.parse(execFileSync(process.execPath, [SCRIPT], { input: JSON.stringify(entrada), encoding: 'utf8', env }))
  .hookSpecificOutput.additionalContext;
const j = (o) => JSON.stringify(o);
const user = (texto, extra = {}) => j({ type: 'user', timestamp: '2026-10-27T13:23:42Z', message: { role: 'user', content: [{ type: 'text', text: texto }] }, ...extra });
const ia = (texto, extra = {}) => j({ type: 'assistant', timestamp: '2026-10-27T13:23:46Z', message: { role: 'assistant', content: [{ type: 'text', text: texto }] }, ...extra });

let falhas = 0;
function caso(nome, ok) { console.log((ok ? '✅ ' : '❌ ') + nome); if (!ok) falhas++; }

// sessão anterior: falas reais + tudo o que NÃO pode entrar
fs.writeFileSync(path.join(PASTA, 'anterior.jsonl'), [
  user('salve tudo desta sessao <system-reminder>lembrete interno</system-reminder>'),
  j({ type: 'assistant', message: { role: 'assistant', content: [{ type: 'tool_use', name: 'Bash', input: { command: 'rm -rf segredo' } }] } }),
  j({ type: 'user', message: { role: 'user', content: [{ type: 'tool_result', content: 'SAIDA-DE-FERRAMENTA' }] } }),
  j({ type: 'assistant', message: { role: 'assistant', content: [{ type: 'thinking', thinking: 'RACIOCINIO-INTERNO' }] } }),
  user('# Skill EXPANSAO', { isMeta: true }),
  ia('fala do subagente', { isSidechain: true }),
  j({ type: 'attachment', timestamp: '2026-10-27T13:19:57Z', attachment: { type: 'queued_command', origin: { kind: 'human' }, prompt: [{ type: 'text', text: 'depois que terminar salve tudo' }] } }),
  ia('A correção (1.2.3) já está no repositório. a senha=Abc#123 ficou no .env'),
  ia('A correção (1.2.3) já está no repositório. a senha=Abc#123 ficou no .env'),
  user('depois'),
  ia('Combinado, a publicação fica para depois.'),
].join('\n'));
// sessão atual (mais recente) — tem de ser ignorada
fs.writeFileSync(path.join(PASTA, 'atual.jsonl'), user('onde paramos?'));

const saida = rodar({ session_id: 'atual', transcript_path: path.join(PASTA, 'atual.jsonl') });
caso('1. traz a última fala do usuário e a da IA, literais', saida.includes('**Usuário**') && saida.includes(': depois') && saida.includes('a publicação fica para depois'));
caso('2. traz a mensagem mandada no meio do trabalho (queued_command)', saida.includes('depois que terminar salve tudo'));
caso('3. ignora a sessão ATUAL', !saida.includes('onde paramos?'));
caso('4. não entra ferramenta, resultado, raciocínio, skill nem subagente',
  !/rm -rf|SAIDA-DE-FERRAMENTA|RACIOCINIO-INTERNO|EXPANSAO|subagente/.test(saida));
caso('5. tira o <system-reminder> da fala', saida.includes('salve tudo desta sessao') && !saida.includes('lembrete interno'));
caso('6. fala gravada 2× entra 1×', saida.split('já está no repositório').length === 2);
caso('7. segredo mascarado', !saida.includes('Abc#123') && saida.includes('senha=[oculto]'));

// teto: sessão enorme não passa de SAIDA_MAX e diz quantas falas omitiu
fs.writeFileSync(path.join(PASTA, 'anterior.jsonl'), Array.from({ length: 200 }, (_, i) => user('pedido ' + i + ' ' + 'x'.repeat(300))).join('\n'));
const grande = rodar({ session_id: 'atual', transcript_path: path.join(PASTA, 'atual.jsonl') });
caso('8. respeita o teto e avisa o que omitiu', grande.length <= u.SAIDA_MAX && /falas anteriores omitidas/.test(grande) && grande.includes('pedido 199'));

caso('9. pasta inexistente → avisa, não quebra', /não encontrada/.test(rodar({ session_id: 'x', transcript_path: path.join(os.tmpdir(), 'nao', 'existe', 'x.jsonl') })));
const quebrada = execFileSync(process.execPath, [SCRIPT], { input: 'nao-json', encoding: 'utf8' });
caso('10. entrada quebrada → avisa erro, não quebra a abertura', /erro no hook/.test(JSON.parse(quebrada).hookSpecificOutput.additionalContext));

fs.rmSync(PASTA, { recursive: true, force: true });
console.log(falhas ? `\n${falhas} caso(s) falharam` : '\nTodos os casos passaram');
process.exit(falhas ? 1 : 0);
