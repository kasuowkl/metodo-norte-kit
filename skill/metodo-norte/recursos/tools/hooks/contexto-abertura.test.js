'use strict';
// Teste do hook de contexto da abertura: índice por contagem + saída do script de verdade numa doc de mentira.
// Uso: node tools/hooks/contexto-abertura.test.js   (sai com código 1 se algum caso falhar)
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const c = require('./contexto-abertura.js');

let falhas = 0;
function caso(nome, ok) { console.log((ok ? '✅ ' : '❌ ') + nome); if (!ok) falhas++; }

const ESTADO = [
  '# Estado', '', '## Status', '- tudo no ar', '',
  '## Pendências abertas', '',
  '### Produção', '- [ ] **Publicar a v2** do sistema A', '- [x] fechada, não conta', '- [ ] Trocar senha padrão ⚠️', '',
  '### Filial', '- [ ] ⤢ vindo da produção: conferir o deploy', '',
  '### Go-live / segurança', '- [ ] Ligar HTTPS', '',
  '## Rascunhos em revisão', '- [ ] isto NÃO é pendência',
].join('\n');

const idx = c.indicePendencias(ESTADO, 'Produção');
caso('1. conta só as [ ] da seção de pendências (4)', idx && idx.total === 4);
caso('2. lista os títulos do ambiente desta máquina', idx.texto.includes('### Produção (ambiente desta máquina) — 2') && idx.texto.includes('Publicar a v2'));
caso('3. conta segurança (⚠️ + seção de segurança) e ⤢', /⚠️ segurança: 2/.test(idx.texto) && /⤢ atravessam ambiente: 1/.test(idx.texto));
caso('4. ESTADO sem a seção → null (não adivinha)', c.indicePendencias('# nada aqui', 'x') === null);

const DOC = fs.mkdtempSync(path.join(os.tmpdir(), 'doc-teste-'));
fs.writeFileSync(path.join(DOC, 'ESTADO-ATUAL.md'), ESTADO);
fs.mkdirSync(path.join(DOC, 'progresso'));
fs.writeFileSync(path.join(DOC, 'progresso', '2026-01.md'), '# Progresso\n\n### 2026-01-10 (entrada mais recente)\ntexto\n');
const saida = execFileSync(process.execPath, [path.join(__dirname, 'contexto-abertura.js')], {
  encoding: 'utf8', env: { ...process.env, DOC_DIR: DOC, AMBIENTE_DOC: 'Filial' },
});
caso('5. script real: pasta sem git → avisa e segue', saida.includes('não é um clone git'));
caso('6. script real: índice + ambiente pela variável + progresso', saida.includes('TOTAL DE PENDÊNCIAS ABERTAS `[ ]`: 4') && saida.includes('### Filial (ambiente desta máquina) — 1') && saida.includes('entrada mais recente'));
caso('7. saída abaixo do teto', saida.length <= c.SAIDA_MAX);
const semDoc = execFileSync(process.execPath, [path.join(__dirname, 'contexto-abertura.js')], {
  encoding: 'utf8', env: { ...process.env, DOC_DIR: path.join(DOC, 'nao-existe') },
});
caso('8. pasta errada → avisa ESTADO não encontrado, não quebra', semDoc.includes('NÃO ENCONTRADO'));

fs.rmSync(DOC, { recursive: true, force: true });
console.log(falhas ? `\n${falhas} caso(s) falharam` : '\nTodos os casos passaram');
process.exit(falhas ? 1 : 0);
