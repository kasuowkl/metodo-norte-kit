#!/usr/bin/env node
/**
 * FIM DA SESSÃO ANTERIOR (Regra #16 do hub) — hook SessionStart do Claude Code. Opcional.
 *
 * Por quê: numa sessão nova o usuário perguntou "onde paramos?" e "o que está pronto?". A IA respondeu pelo resumo da
 * documentação e montou uma tabela de 🟡/⏳ — mas a sessão anterior tinha terminado com ela dizendo que a correção já
 * estava no repositório e que só a publicação ficava para depois. A fala literal estava no disco (o .jsonl da conversa)
 * e nada a entregava à sessão nova.
 *
 * O que faz: lê o registro (.jsonl) MAIS RECENTE da pasta do projeto que não é o da sessão atual e injeta as últimas
 * falas do usuário e da IA, literais, cortadas no teto de saída (acima de ~10 mil caracteres o Claude Code não injeta a
 * saída de um hook). Só falas: nada de ferramenta, resultado, raciocínio, subagente nem expansão de skill.
 * Valor de segredo colado no chat sai mascarado.
 *
 * Entrada (stdin, do Claude Code): { session_id, transcript_path, source }. Teste: --pasta <dir> no lugar do transcript_path.
 * Nunca falha a abertura: qualquer erro vira uma linha de aviso e exit 0.
 * Instalar / desligar: tools/hooks/LEIA-ME.md.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const SAIDA_MAX = 6000;     // junto com o hook de contexto (~9 mil) os dois ficam longe do teto de ~10 mil cada
const FALA_USUARIO = 600;
const FALA_IA = 900;
const ULTIMA_IA = 1800;     // a última fala da IA costuma ser o "onde paramos" — vai mais inteira
const USUARIO = process.env.NOME_USUARIO || 'Usuário';   // 📝 como o seu nome aparece no bloco (opcional)

/** Pura (testada): tira lembretes do sistema, seleção da IDE e afins; devolve o texto que a pessoa escreveu. */
function limpar(texto) {
  return String(texto || '')
    .replace(/<(system-reminder|ide_selection|ide_opened_file|command-[\w-]+|local-command-[\w-]+)[^>]*>[\s\S]*?<\/\1>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Pura (testada): mascara valor de segredo colado no chat (segredo se lê, não se copia). */
function mascarar(texto) {
  return texto
    .replace(/\b(sk-ant-[\w-]{6})[\w-]+/g, '$1…[oculto]')
    .replace(/\b(sk-[\w]{6})[\w-]{10,}/g, '$1…[oculto]')
    .replace(/\b(ghp_|github_pat_)\w{8,}/g, '$1…[oculto]')
    .replace(/\b(senha|password|passwd|pass|token|secret)(\s*[:=]\s*)("[^"]*"|'[^']*'|\S+)/gi, '$1$2[oculto]');
}

function textos(conteudo) {
  if (typeof conteudo === 'string') return [conteudo];
  if (!Array.isArray(conteudo)) return [];
  return conteudo.filter((c) => c && c.type === 'text').map((c) => c.text);
}

/** Pura (testada): do conteúdo de um .jsonl, as falas em ordem: [{ quem: 'usuario'|'ia', texto, quando }]. */
function extrairFalas(bruto) {
  const falas = [];
  for (const linha of String(bruto).split('\n')) {
    if (!linha.trim()) continue;
    let o;
    try { o = JSON.parse(linha); } catch (e) { continue; }
    if (o.isSidechain || o.isMeta) continue;
    let quem = null;
    let partes = [];
    if (o.type === 'user' && o.message) { quem = 'usuario'; partes = textos(o.message.content); }
    else if (o.type === 'assistant' && o.message) { quem = 'ia'; partes = textos(o.message.content); }
    else if (o.type === 'attachment' && o.attachment && o.attachment.type === 'queued_command' &&
             (!o.attachment.origin || o.attachment.origin.kind === 'human')) {
      quem = 'usuario'; partes = textos(o.attachment.prompt);   // mensagem mandada no meio do trabalho da IA
    }
    if (!quem) continue;
    const texto = limpar(partes.join(' '));
    if (!texto) continue;
    const anterior = falas[falas.length - 1];
    if (anterior && anterior.quem === quem && anterior.texto === texto) continue;  // mesma fala gravada 2×
    falas.push({ quem, texto, quando: o.timestamp || '' });
  }
  return falas;
}

/** O .jsonl mais recente da pasta, sem ser o da sessão atual, que tenha pelo menos uma fala do usuário. */
function sessaoAnterior(pasta, idAtual) {
  const arquivos = fs.readdirSync(pasta)
    .filter((f) => f.endsWith('.jsonl') && path.basename(f, '.jsonl') !== idAtual)
    .map((f) => ({ f, t: fs.statSync(path.join(pasta, f)).mtimeMs }))
    .sort((a, b) => b.t - a.t);
  for (const { f } of arquivos) {
    const falas = extrairFalas(fs.readFileSync(path.join(pasta, f), 'utf8'));
    if (falas.some((x) => x.quem === 'usuario')) return { id: path.basename(f, '.jsonl'), falas };
  }
  return null;
}

function hora(iso) {
  const d = new Date(iso);
  return isNaN(d) ? '' : d.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
}

/** Pura (testada): monta o texto injetado, do fim para o começo, até o teto. */
function montar(anterior) {
  const cab = '## 🧵 FIM DA SESSÃO ANTERIOR — falas LITERAIS (hook ultima-sessao.js)\n' +
    'Sessão ' + anterior.id.slice(0, 8) + ' · última fala ' + hora(anterior.falas[anterior.falas.length - 1].quando) + '\n' +
    '> OBRIGATÓRIO (Regra #16): a 1ª resposta e todo "onde paramos" / "o que está pronto" partem DESTAS falas, conferidas no ' +
    'git/servidor — não só do resumo da doc — no formato: Onde paramos (última fala do usuário, literal) · ✅ Feito · ' +
    '👉 Falta EU fazer · ⏳ Falta VOCÊ (teste/decisão do usuário, separado) · 🔴 Pendências com o total do índice.\n';
  const linhas = [];
  let usado = cab.length + 80;
  const ultimaIA = anterior.falas.map((x) => x.quem).lastIndexOf('ia');
  for (let i = anterior.falas.length - 1; i >= 0; i--) {
    const x = anterior.falas[i];
    const teto = x.quem === 'usuario' ? FALA_USUARIO : (i === ultimaIA ? ULTIMA_IA : FALA_IA);
    let t = mascarar(x.texto);
    if (t.length > teto) t = t.slice(0, teto) + '…';
    const l = '- **' + (x.quem === 'usuario' ? USUARIO : 'IA') + '** (' + hora(x.quando) + '): ' + t;
    if (usado + l.length + 1 > SAIDA_MAX) break;
    linhas.unshift(l);
    usado += l.length + 1;
  }
  const omitidas = anterior.falas.length - linhas.length;
  return cab + (omitidas > 0 ? '(…' + omitidas + ' falas anteriores omitidas pelo teto — ler o .jsonl se precisar)\n' : '') +
    linhas.join('\n') + '\n';
}

function responder(texto) {
  process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: 'SessionStart', additionalContext: texto } }));
}

function main() {
  let bruto = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (d) => { bruto += d; });
  process.stdin.on('end', () => {
    try {
      const entrada = bruto.trim() ? JSON.parse(bruto) : {};
      const iArg = process.argv.indexOf('--pasta');
      const pasta = iArg > -1 ? process.argv[iArg + 1] : (entrada.transcript_path ? path.dirname(entrada.transcript_path) : '');
      if (!pasta || !fs.existsSync(pasta)) return responder('## 🧵 FIM DA SESSÃO ANTERIOR — pasta dos registros não encontrada (' + pasta + '). Avisar o usuário.');
      const anterior = sessaoAnterior(pasta, entrada.session_id);
      if (!anterior) return responder('## 🧵 FIM DA SESSÃO ANTERIOR — nenhuma sessão anterior com falas nesta pasta.');
      responder(montar(anterior));
    } catch (e) {
      responder('## 🧵 FIM DA SESSÃO ANTERIOR — erro no hook ultima-sessao.js: ' + e.message + '. Avisar o usuário e ler o .jsonl à mão.');
    }
  });
}

if (require.main === module) main();
module.exports = { limpar, mascarar, extrairFalas, sessaoAnterior, montar, SAIDA_MAX };
