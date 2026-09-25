#!/usr/bin/env node
// validar-doc.js — valida a Documentação Padrão (Regra de ouro #14)
// Uso: node tools/validar-doc.js   (na raiz da pasta da documentação)
// Verifica: (1) front-matter obrigatório, (2) links .md quebrados,
//           (3) cobertura — todo .md é referenciado por algum outro,
//           (4) árvore do hub cita todos os arquivos.
// Sai com código 1 se houver ERRO (avisos não bloqueiam).

const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const IGNORAR_DIRS = new Set(['.git', 'node_modules', 'tools']);
const SEM_FRONTMATTER_OK = new Set(['CLAUDE.md', 'CLAUDE.template.md', 'SINCRONIZACAO.md', 'SINCRONIZACAO.template.md']);
const CAMPOS_OBRIGATORIOS = ['tipo', 'sistema', 'status', 'ultima_revisao'];
const HUB = fs.existsSync(path.join(__dirname, '..', 'DocumentacaoPadrao.md')) ? 'DocumentacaoPadrao.md' : 'DocumentacaoPadrao.template.md';

const erros = [];
const avisos = [];

// --- coletar todos os .md ---
function coletar(dir) {
  let out = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    if (item.isDirectory()) {
      if (!IGNORAR_DIRS.has(item.name)) out = out.concat(coletar(path.join(dir, item.name)));
    } else if (item.name.endsWith('.md')) {
      out.push(path.relative(RAIZ, path.join(dir, item.name)).replace(/\\/g, '/'));
    }
  }
  return out;
}
const arquivos = coletar(RAIZ);
const conjunto = new Set(arquivos);

// --- 1. front-matter ---
for (const arq of arquivos) {
  if (SEM_FRONTMATTER_OK.has(arq)) continue;
  const txt = fs.readFileSync(path.join(RAIZ, arq), 'utf8');
  if (!txt.startsWith('---')) { erros.push(`[front-matter] ${arq}: sem bloco YAML inicial`); continue; }
  const fim = txt.indexOf('---', 3);
  const bloco = txt.slice(3, fim);
  for (const campo of CAMPOS_OBRIGATORIOS) {
    if (!new RegExp(`^${campo}:\\s*\\S`, 'm').test(bloco)) {
      erros.push(`[front-matter] ${arq}: falta o campo "${campo}"`);
    }
  }
}

// --- 2. links .md quebrados + grafo de referências ---
const referenciados = new Set();
const reLink = /\]\(([^)#\s]+\.md)(#[^)]*)?\)/g;
for (const arq of arquivos) {
  const txt = fs.readFileSync(path.join(RAIZ, arq), 'utf8');
  const dirArq = path.dirname(arq);
  let m;
  while ((m = reLink.exec(txt)) !== null) {
    const alvoBruto = decodeURIComponent(m[1]);
    if (/^[a-z]+:\/\//i.test(alvoBruto)) continue; // link externo
    const alvo = path.normalize(path.join(dirArq, alvoBruto)).replace(/\\/g, '/');
    if (alvo.startsWith('..')) {
      avisos.push(`[link externo ao repo] ${arq} → ${m[1]} (não verificado — aponta p/ outro repositório)`);
    } else if (!conjunto.has(alvo)) {
      erros.push(`[link quebrado] ${arq} → ${m[1]}`);
    } else {
      referenciados.add(alvo);
    }
  }
}

// --- 3. cobertura: todo .md deve ser referenciado por algum outro ---
const RAIZ_OK = new Set([HUB, 'CLAUDE.md', 'CLAUDE.template.md']); // pontos de entrada não precisam de referência
for (const arq of arquivos) {
  if (RAIZ_OK.has(arq)) continue;
  if (!referenciados.has(arq)) avisos.push(`[órfão] ${arq}: nenhum outro .md aponta para ele (adicionar ao índice/hub?)`);
}

// --- 4. árvore do hub cita todos os arquivos (por nome-base) ---
const hubTxt = fs.readFileSync(path.join(RAIZ, HUB), 'utf8');
for (const arq of arquivos) {
  const nome = path.basename(arq).replace('.template.md', '.md');
  // arquivos de progresso/decisões entram por pasta, não um a um
  if (arq.startsWith('progresso/') || arq.startsWith('decisoes/')) continue;
  if (!hubTxt.includes(nome)) avisos.push(`[árvore do hub] ${nome} não aparece em ${HUB} (atualizar "Estrutura desta pasta")`);
}

// --- (v1.5.0) Número de ADR repetido: erro ---
const porNumero = {};
for (const arq of arquivos) {
  const m = arq.match(/^decisoes\/(\d{3})-/);
  if (m) (porNumero[m[1]] = porNumero[m[1]] || []).push(arq);
}
for (const [n, lista] of Object.entries(porNumero)) {
  if (lista.length > 1) erros.push(`[ADR duplicada] número ${n} usado por: ${lista.join(', ')}`);
}

// --- (v1.5.0) Tamanho do que é lido em TODA sessão: aviso ---
// Arquivo grande demais é lido em recorte, e o que fica fora do recorte a IA "esquece".
const TETO_KB = { 'ESTADO-ATUAL.md': 60, 'DocumentacaoPadrao.md': 70 };
for (const [arq, kb] of Object.entries(TETO_KB)) {
  const p = path.join(RAIZ, arq);
  if (!fs.existsSync(p)) continue;
  const tam = Math.round(fs.statSync(p).size / 1024);
  if (tam > kb) avisos.push(`[tamanho] ${arq} tem ${tam} KB (teto ${kb} KB) — mover itens fechados e detalhe para fora`);
}
for (const arqP of arquivos.filter(a => /^progresso\/\d{4}-\d{2}\.md$/.test(a))) {
  const blocos = fs.readFileSync(path.join(RAIZ, arqP), 'utf8').split(/\n(?=### \d{4}-\d{2}-\d{2})/).slice(1);
  const longas = blocos.filter(b => b.length > 3000).length;
  if (longas) avisos.push(`[tamanho] ${arqP}: ${longas} entrada(s) com mais de 3.000 caracteres (formato pede ~10 linhas)`);
}

// --- (v1.5.0) ultima_revisao × último commit: aviso (só se a pasta for repositório git) ---
try {
  const { execSync } = require('child_process');
  const log = execSync('git log --format=@%ad --date=short --name-only --relative', { cwd: RAIZ, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 * 1024 * 1024 });
  const ultimo = {};
  let dataAtual = null;
  for (const l of log.split('\n')) {
    if (l.startsWith('@')) { dataAtual = l.slice(1); continue; }
    const nome = l.trim().replace(/^"|"$/g, '');
    if (nome && !(nome in ultimo)) ultimo[nome] = dataAtual;
  }
  for (const arq of arquivos) {
    if (arq.startsWith('progresso/')) continue;
    const m = fs.readFileSync(path.join(RAIZ, arq), 'utf8').match(/^ultima_revisao:\s*(\d{4}-\d{2}-\d{2})/m);
    const c = ultimo[arq];
    if (!m || !c) continue;
    const dias = (new Date(c) - new Date(m[1])) / 86400000;
    if (dias > 30) avisos.push(`[revisão] ${arq}: ultima_revisao ${m[1]}, último commit ${c} (${Math.round(dias)} dias depois) — conferir e atualizar a data`);
  }
} catch (e) { /* sem git: checagem pulada */ }

// --- resultado ---
console.log(`\nValidação da Documentação Padrão — ${arquivos.length} arquivos .md\n`);
for (const e of erros) console.log('  ❌ ' + e);
for (const a of avisos) console.log('  ⚠️  ' + a);
if (!erros.length && !avisos.length) console.log('  ✅ Tudo certo: front-matter ok, 0 links quebrados, 0 órfãos.');
console.log(`\nResumo: ${erros.length} erro(s), ${avisos.length} aviso(s).`);
process.exit(erros.length ? 1 : 0);
