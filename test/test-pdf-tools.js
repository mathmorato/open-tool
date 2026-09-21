/**
 * Teste de validação técnica das 3 ferramentas PDF:
 * pdf-unlock, pdf-compress, pdf-merge
 */

import fs from 'fs';
import path from 'path';

console.log('--- Testando integridade das 3 ferramentas PDF ---');

const tools = ['pdf-unlock', 'pdf-compress', 'pdf-merge'];
for (const t of tools) {
  const uiPath = path.join('js', 'tools', t, 'ui.js');
  const toolPath = path.join('js', 'tools', t, 'tool.js');
  const cssPath = path.join('css', 'tools', t + '.css');

  if (!fs.existsSync(uiPath)) throw new Error('UI não encontrada: ' + uiPath);
  if (!fs.existsSync(toolPath)) throw new Error('Tool não encontrada: ' + toolPath);
  if (!fs.existsSync(cssPath)) throw new Error('CSS não encontrado: ' + cssPath);

  const uiContent = fs.readFileSync(uiPath, 'utf8');
  const toolContent = fs.readFileSync(toolPath, 'utf8');

  // Verifica se accept inclui .pdf
  if (!uiContent.includes('.pdf')) throw new Error(t + ' UI sem .pdf no accept');
  // Verifica se há listener de click no dropzone
  if (!toolContent.includes('fileInput.click()')) throw new Error(t + ' tool sem fileInput.click() no dropzone');
  // Verifica se há suporte a extensão .pdf no drop
  if (!toolContent.includes(".endsWith('.pdf')")) throw new Error(t + ' tool sem fallback .endsWith(\'.pdf\') no drop');

  console.log('[OK] Ferramenta ' + t + ' validada estruturalmente!');
}

console.log('--- Todas as 3 ferramentas PDF estão íntegras e prontas! ---');
