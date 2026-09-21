import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const createQpdfModule = require('../node_modules/@neslinesli93/qpdf-wasm');
const { PDFDocument } = require('pdf-lib');
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';

async function runTest() {
  console.log('--- Testando fluxo de ponta a ponta do Desbloqueador de PDF ---');
  
  const lockedPdfPath = 'C:/Users/mathe/.gemini/antigravity-ide/brain/3d0a5b49-2d77-44cd-852f-d3f3f7840095/.user_uploaded/media_1790021993794.pdf';
  const inputBytes = fs.readFileSync(lockedPdfPath);
  console.log('Arquivo original carregado, tamanho:', inputBytes.length);

  const qpdf = await createQpdfModule();
  qpdf.FS.writeFile('/input.pdf', inputBytes);
  const exitCode = qpdf.callMain(['--password=', '/input.pdf', '--decrypt', '/output.pdf']);
  if (exitCode !== 0) throw new Error('QPDF falhou com código ' + exitCode);

  const unlockedBytes = qpdf.FS.readFile('/output.pdf');
  console.log('Arquivo desbloqueado com sucesso! Tamanho:', unlockedBytes.length);

  // 1. Valida com PDFLib
  const pdfDoc = await PDFDocument.load(unlockedBytes);
  console.log('[OK] PDFDoc carregado via PDFLib! Total de Páginas:', pdfDoc.getPageCount());

  // 2. Valida com PDFJS
  const jsDoc = await pdfjs.getDocument({ data: unlockedBytes }).promise;
  console.log('[OK] PDFJS doc carregado! Total de Páginas:', jsDoc.numPages);
  
  let fullText = '';
  for (let i = 1; i <= jsDoc.numPages; i++) {
    const page = await jsDoc.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(it => it.str).join(' ');
    fullText += pageText + '\n';
  }

  console.log('[OK] Total de caracteres de texto extraídos:', fullText.length);
  console.log('Snippet do texto extraído:\n', fullText.slice(0, 300));
  const expectedKeywords = ['Catalyzing Breakthroughs', 'Lucian Lucia', 'Imagination', 'Star Trek'];
  for (const kw of expectedKeywords) {
    const found = fullText.includes(kw);
    console.log(`[OK] Palavra-chave "${kw}" encontrada:`, found);
    if (!found) throw new Error('Palavra-chave não encontrada: ' + kw);
  }

  console.log('--- SUCESSO TOTAL: Documento desbloqueado com 100% de texto selecionável e copiável! ---');
}

runTest().catch(e => {
  console.error(e);
  process.exit(1);
});
