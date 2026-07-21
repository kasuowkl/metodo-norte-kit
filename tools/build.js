#!/usr/bin/env node
// build.js — build do Método Norte Kit
// Uso: node tools/build.js   (na raiz do kit)
//
// A pasta template/ é a FONTE CANÔNICA. Este script:
//   1. Sincroniza template/ → skill/metodo-norte/recursos/ (cópia espelhada)
//   2. Regera o pacote metodo-norte.skill (zip de skill/metodo-norte/)
//
// Nunca editar recursos/ ou o .skill à mão — editar template/ e rodar o build.

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const RAIZ = path.resolve(__dirname, '..');
const TEMPLATE = path.join(RAIZ, 'template');
const RECURSOS = path.join(RAIZ, 'skill', 'metodo-norte', 'recursos');
const SKILL_DIR = path.join(RAIZ, 'skill', 'metodo-norte');
const PACOTE = path.join(RAIZ, 'metodo-norte.skill');

// --- 1. sincronizar template/ → recursos/ ---
fs.rmSync(RECURSOS, { recursive: true, force: true });
fs.cpSync(TEMPLATE, RECURSOS, { recursive: true });
console.log('✅ template/ → skill/metodo-norte/recursos/ sincronizado');

// --- 2. regerar o .skill (zip com SKILL.md + recursos/ na raiz) ---
const tmpZip = PACOTE + '.zip';
fs.rmSync(tmpZip, { force: true });
try {
  if (process.platform === 'win32') {
    // bsdtar nativo do Windows 10+ (não o tar do Git Bash) gera zip com "/" nos caminhos — portável
    const bsdtar = path.join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'tar.exe');
    execFileSync(bsdtar, ['-a', '-c', '-f', tmpZip, '-C', SKILL_DIR, 'SKILL.md', 'recursos'], { stdio: 'inherit' });
  } else {
    execFileSync('zip', ['-r', '-q', tmpZip, 'SKILL.md', 'recursos'], { cwd: SKILL_DIR, stdio: 'inherit' });
  }
  fs.rmSync(PACOTE, { force: true });
  fs.renameSync(tmpZip, PACOTE);
  console.log('✅ metodo-norte.skill regerado');
} catch (e) {
  fs.rmSync(tmpZip, { force: true });
  console.error('❌ Falha ao zipar. O sync template→recursos foi feito; gere o zip manualmente se necessário.');
  process.exit(1);
}

console.log('\nBuild concluído. Conferir com: git status');
