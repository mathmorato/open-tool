/**
 * Teste de ponta a ponta do motor de desbloqueio (QPDF WebAssembly).
 * Gera os próprios PDFs criptografados (senha de abertura e restrição de proprietário)
 * e valida o contrato de códigos de saída usado em js/tools/pdf-unlock/tool.js:
 * 0/3 = descriptografado, 2 = falha (inclui senha ausente/incorreta).
 */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const createQpdfModule = require('../node_modules/@neslinesli93/qpdf-wasm');
const { PDFDocument, StandardFonts } = require('pdf-lib');
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';

const MARKER = 'Texto selecionavel Open Tool';

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
  console.log(`[OK] ${msg}`);
}

async function extractText(bytes) {
  const task = pdfjs.getDocument({ data: new Uint8Array(bytes) });
  try {
    const doc = await task.promise;
    let text = '';
    for (let i = 1; i <= doc.numPages; i++) {
      const content = await (await doc.getPage(i)).getTextContent();
      text += content.items.map(it => it.str).join(' ') + '\n';
    }
    return text;
  } finally {
    await task.destroy();
  }
}

async function runTest() {
  console.log('--- Testando fluxo de ponta a ponta do Desbloqueador de PDF ---');

  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  doc.addPage([595, 842]).drawText(MARKER, { x: 60, y: 760, size: 18, font });
  const plain = await doc.save();

  const qpdf = await createQpdfModule();
  qpdf.FS.writeFile('/plain.pdf', plain);
  assert(qpdf.callMain(['--encrypt', 'user1', 'owner1', '256', '--', '/plain.pdf', '/user.pdf']) === 0, 'PDF com senha de abertura gerado');
  assert(qpdf.callMain(['--encrypt', '', 'owner1', '256', '--print=none', '--modify=none', '--', '/plain.pdf', '/owner.pdf']) === 0, 'PDF com restrição de proprietário gerado');

  const decrypt = (file, password) => {
    try { qpdf.FS.unlink('/out.pdf'); } catch (_) {}
    const rc = qpdf.callMain(['--warning-exit-0', `--password=${password}`, file, '--decrypt', '/out.pdf']);
    return { rc, ok: rc === 0 || rc === 3 };
  };

  assert(!decrypt('/user.pdf', '').ok, 'Senha ausente é rejeitada');
  assert(!decrypt('/user.pdf', 'errada').ok, 'Senha incorreta é rejeitada');

  for (const [file, password] of [['/user.pdf', 'user1'], ['/owner.pdf', '']]) {
    const { ok } = decrypt(file, password);
    assert(ok, `${file} descriptografado`);
    const bytes = qpdf.FS.readFile('/out.pdf');
    const out = await PDFDocument.load(bytes);
    assert(!out.isEncrypted && out.getPageCount() === 1, `${file}: saída sem criptografia e com 1 página`);
    assert((await extractText(bytes)).includes(MARKER), `${file}: texto continua selecionável`);
  }

  // O fallback PDF-Lib da ferramenta só pode aceitar documentos realmente sem criptografia
  const encrypted = await PDFDocument.load(qpdf.FS.readFile('/user.pdf'), { ignoreEncryption: true });
  assert(encrypted.isEncrypted, 'PDF-Lib sinaliza isEncrypted (fallback não aceita saída ainda cifrada)');

  console.log('--- SUCESSO TOTAL: desbloqueio validado com senha, sem senha e com senha incorreta ---');
}

runTest().catch(e => {
  console.error(e);
  process.exit(1);
});
