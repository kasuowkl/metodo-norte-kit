#!/usr/bin/env node
/**
 * CONTEXTO DA ABERTURA (Regras #0 e #16 do hub) — hook SessionStart do Claude Code. Opcional.
 * Injeta no contexto, a cada início de sessão:
 *   0. SINCRONIA COM O REMOTO — confere se o clone git da doc está atualizado; `git pull --ff-only` SÓ quando seguro
 *      (atrás, sem commit local e sem alteração); senão só avisa.
 *   1. Lembrete curto do protocolo (4 passos + Regras #15 e #16).
 *   2. ÍNDICE DAS PENDÊNCIAS do ESTADO-ATUAL.md, GERADO POR CONTAGEM: total de `- [ ]`, quantas por seção, os títulos
 *      do ambiente desta máquina e quantas são de segurança (⚠️) ou atravessam ambiente (⤢). A IA bate o relatório da
 *      abertura com esses números — item faltando fica visível na hora.
 *   3. Títulos das entradas mais recentes do progresso do mês corrente (detectado sozinho).
 *
 * TETO DA SAÍDA: acima de ~10 mil caracteres o Claude Code NÃO injeta a saída do hook — grava num arquivo e entrega só
 * uma prévia de ~2 KB (medido em uso real: 83 KB gerados, ~2 KB recebidos; segurança e progresso nunca chegavam).
 * Por isso entrega um ÍNDICE, não o texto: o texto completo a IA lê nos arquivos (Regra #0).
 *
 * Configuração (sem editar o script):
 *   DOC_DIR       pasta da doc (o clone git). Padrão: duas pastas acima deste arquivo (tools/hooks → raiz da doc).
 *   AMBIENTE_DOC  título da seção "### ..." do ESTADO cujas pendências são listadas uma a uma (ex.: Produção, Filial).
 *                 Vazio = só as contagens.
 * Nunca falha a abertura da sessão (exit 0). Instalar / desligar: tools/hooks/LEIA-ME.md.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SAIDA_MAX = 9000;
const TITULO_MAX = 75;

function safeRead(p) {
  try { return fs.readFileSync(p, 'utf8'); } catch { return null; }
}

/** Pura (testada): índice das pendências abertas a partir do texto do ESTADO. null = seção não encontrada. */
function indicePendencias(estado, ambiente) {
  const linhas = String(estado).split(/\r?\n/);
  const iPend = linhas.findIndex((l) => /^##\s+Pend(ê|e)ncias abertas/i.test(l));
  if (iPend === -1) return null;
  let fim = linhas.length;
  for (let i = iPend + 1; i < linhas.length; i++) {
    if (/^##\s+/.test(linhas[i]) && !/^###/.test(linhas[i])) { fim = i; break; }
  }
  const grupos = [];
  let atual = { titulo: '(sem seção)', itens: [] };
  const atravessam = [];
  const seguranca = [];
  for (const linha of linhas.slice(iPend, fim)) {
    const mh = /^###\s+(.+?)\s*$/.exec(linha);
    if (mh) { if (atual.itens.length) grupos.push(atual); atual = { titulo: mh[1], itens: [] }; continue; }
    if (!/^-\s*\[ \]/.test(linha)) continue;           // só ABERTAS; [x] é histórico
    let t = linha.replace(/^-\s*\[ \]\s*/, '').replace(/\*\*/g, '').replace(/`/g, '').trim();
    if (t.length > TITULO_MAX) t = t.slice(0, TITULO_MAX) + '…';
    atual.itens.push(t);
    if (/⤢/.test(linha)) atravessam.push(t);
    if (/⚠️|segurança/i.test(linha) || /seguran/i.test(atual.titulo)) seguranca.push(t);
  }
  if (atual.itens.length) grupos.push(atual);
  const total = grupos.reduce((s, g) => s + g.itens.length, 0);
  const out = [];
  out.push('## 🔢 ÍNDICE DAS PENDÊNCIAS ABERTAS — gerado por contagem, não por leitura', '');
  out.push('**TOTAL DE PENDÊNCIAS ABERTAS `[ ]`: ' + total + '**', '');
  out.push('Por seção: ' + (grupos.map((g) => g.titulo.replace(/\s*\(.*$/, '') + ' ' + g.itens.length).join(' · ') || 'nenhuma'), '');
  const doAmbiente = grupos.find((g) => ambiente && g.titulo.toLowerCase() === ambiente.toLowerCase());
  if (doAmbiente) {
    out.push('### ' + doAmbiente.titulo + ' (ambiente desta máquina) — ' + doAmbiente.itens.length + ' aberta(s)');
    doAmbiente.itens.forEach((t, i) => out.push('  ' + (i + 1) + '. ' + t));
    out.push('');
  }
  out.push('**⚠️ segurança: ' + seguranca.length + '** · **⤢ atravessam ambiente: ' + atravessam.length + '** — reportar SEMPRE, junto com as do ambiente atual.', '');
  out.push('> 📋 **OBRIGATÓRIO:** este é só o ÍNDICE. Ler o ESTADO-ATUAL.md completo e reportar na 1ª resposta, no formato da Regra #16.');
  out.push('> O relatório tem de bater com os números deste índice. Faltou item = relatório errado, não "resumo".', '');
  return { total, texto: out.join('\n') };
}

function sincronia(docDir) {
  const git = (args, timeout = 15000) => execSync('git ' + args, {
    cwd: docDir, encoding: 'utf8', timeout, stdio: ['ignore', 'pipe', 'pipe'],
    env: Object.assign({}, process.env, { GIT_TERMINAL_PROMPT: '0' }),
  }).trim();
  const out = ['## Sincronia da doc com o repositório remoto'];
  try { git('rev-parse --is-inside-work-tree', 5000); } catch {
    out.push('ℹ️ ' + docDir + ' não é um clone git (ou git indisponível) — pulei a checagem de atualização.', '');
    return out;
  }
  const branch = (() => { try { return git('rev-parse --abbrev-ref HEAD', 5000); } catch { return '?'; } })();
  try { git('rev-parse --abbrev-ref --symbolic-full-name @{u}', 5000); } catch {
    out.push('⚠️ Branch `' + branch + '` sem upstream — não dá para comparar com o remoto.', '');
    return out;
  }
  try { git('fetch --quiet'); } catch {
    out.push('⚠️ Não consegui contatar o remoto (offline ou sem credencial em cache). Trabalhando com a cópia local.', '');
    return out;
  }
  const num = (cmd) => { try { return parseInt(git(cmd, 5000), 10) || 0; } catch { return 0; } };
  const atras = num('rev-list --count HEAD..@{u}');
  const frente = num('rev-list --count @{u}..HEAD');
  const sujo = (() => { try { return git('status --porcelain', 5000).length > 0; } catch { return false; } })();
  if (atras === 0 && frente === 0 && !sujo) out.push('✅ Doc EM DIA com o remoto (branch `' + branch + '`).');
  if (atras > 0) {
    if (frente === 0 && !sujo) {
      try { git('pull --ff-only --quiet'); out.push('🔄 Doc estava ' + atras + ' commit(s) atrás — atualizei sozinho (fast-forward).'); }
      catch { out.push('⚠️ Doc ' + atras + ' commit(s) ATRÁS e o pull automático falhou. Rode: git pull'); }
    } else {
      out.push('⚠️ Doc ' + atras + ' commit(s) ATRÁS e NÃO atualizei (' + (sujo ? 'há alterações locais' : 'há commit local divergente') + '). Perguntar ao usuário antes do pull.');
    }
  }
  if (frente > 0) out.push('⬆️ ' + frente + ' commit(s) local(is) NÃO enviados — perguntar se faz o push.');
  if (sujo) out.push('✏️ Há alterações não commitadas na doc.');
  out.push('');
  return out;
}

/** Monta a saída inteira (testada com uma pasta de doc de mentira). */
function gerar(docDir, ambiente, { comGit = true } = {}) {
  const out = ['=== CONTEXTO AUTOMÁTICO DA DOCUMENTAÇÃO (hook SessionStart) ===', ''];
  if (comGit) out.push(...sincronia(docDir));
  out.push([
    '## Protocolo obrigatório (antes de QUALQUER ação)',
    '1. Ler o hub DocumentacaoPadrao.md INTEIRO (se a ferramenta cortar, ler o resto — Regra #15) + ESTADO + progresso + lições.',
    '2. A CADA PEDIDO: identificar sistema e tarefa e ler os módulos que o Índice por Assunto manda.',
    '3. Antes da 1ª edição: gravar e mostrar o Passo 4 (Sistema · Tarefa · Arquivos lidos · Área · Risco · Plano).',
    '4. 1ª resposta no formato fixo da Regra #16: Onde paramos · ✅ Feito · 👉 Falta EU fazer · ⏳ Falta VOCÊ · 🔴 Pendências com o total.',
    '',
  ].join('\n'));
  const estado = safeRead(path.join(docDir, 'ESTADO-ATUAL.md'));
  if (!estado) out.push('## ESTADO-ATUAL.md — NÃO ENCONTRADO em ' + docDir + ' (confira DOC_DIR)', '');
  else {
    const idx = indicePendencias(estado, ambiente);
    out.push(idx ? idx.texto : '## ESTADO-ATUAL.md — seção "## Pendências abertas" NÃO encontrada; ler o arquivo inteiro.\n');
  }
  const agora = new Date();
  const mes = agora.getFullYear() + '-' + String(agora.getMonth() + 1).padStart(2, '0');
  const dirProg = path.join(docDir, 'progresso');
  let arq = path.join(dirProg, mes + '.md');
  let prog = safeRead(arq);
  if (!prog) {
    try {
      const lista = fs.readdirSync(dirProg).filter((f) => /^\d{4}-\d{2}\.md$/.test(f)).sort();
      if (lista.length) { arq = path.join(dirProg, lista[lista.length - 1]); prog = safeRead(arq); }
    } catch { /* sem pasta */ }
  }
  if (prog) {
    out.push('## Progresso mais recente — ' + path.basename(arq) + ' (títulos; ler o arquivo)', '');
    prog.split(/\r?\n/).filter((l) => l.startsWith('### ')).slice(0, 6).forEach((t) => out.push('- ' + t.replace(/^###\s+/, '').slice(0, 110)));
    out.push('');
  } else out.push('## Progresso — nenhum arquivo encontrado em progresso/', '');
  let saida = out.join('\n');
  if (saida.length > SAIDA_MAX) {
    saida = saida.slice(0, SAIDA_MAX - 200) + '\n\n[…índice cortado em ' + SAIDA_MAX + ' caracteres para caber na injeção — ler ESTADO-ATUAL.md e o progresso do mês]\n';
  }
  return saida;
}

if (require.main === module) {
  try {
    const docDir = process.env.DOC_DIR || path.resolve(__dirname, '..', '..');
    process.stdout.write(gerar(docDir, process.env.AMBIENTE_DOC || ''));
  } catch (e) {
    process.stdout.write('## CONTEXTO DA ABERTURA — erro no hook contexto-abertura.js: ' + e.message + '. Ler hub, ESTADO e progresso à mão.\n');
  }
  process.exit(0);   // nunca falhar o arranque da sessão
}
module.exports = { indicePendencias, gerar, SAIDA_MAX };
