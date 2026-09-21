/**
 * Open Tool — Ferramenta: Dividir PDF (pdf-split)
 * 100% Client-Side via PDF-lib, PDF.js e JSZip
 * @version v.2.4.0
 */

import { getPdfSplitHTML } from './ui.js';
import { APP_CONFIG, loadScript } from '../../config.js';

let _listeners = [];
let _currentFile = null;
let _currentArrayBuffer = null;
let _currentNumPages = 0;
let _currentMode = 'ranges'; // 'ranges' | 'extract' | 'all' | 'every'
let _outputBlob = null;
let _isZip = false;
let _downloadName = 'documentos_divididos.zip';

function _on(element, event, handler) {
  if (!element) return;
  element.addEventListener(event, handler);
  _listeners.push({ element, event, handler });
}

function _formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(2) + ' MB';
}

function _dataUrlToBytes(dataUrl) {
  const parts = dataUrl.split(',');
  const bin = atob(parts[1]);
  const len = bin.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = bin.charCodeAt(i);
  }
  return bytes;
}

async function _ensureLibs() {
  const promises = [];
  if (typeof window === 'undefined' || !window.PDFLib) {
    promises.push(loadScript('js/lib/pdf-lib.min.js').catch(e => console.warn('pdf-lib load:', e)));
  }
  if (typeof window === 'undefined' || !window.pdfjsLib) {
    promises.push(loadScript(APP_CONFIG.CDN.PDFJS).catch(e => console.warn('pdf.js load:', e)));
  }
  if (typeof window === 'undefined' || !window.JSZip) {
    promises.push(loadScript(APP_CONFIG.CDN.JSZIP).catch(e => console.warn('jszip load:', e)));
  }
  if (promises.length > 0) {
    await Promise.all(promises);
  }
  const pdfjsLib = (typeof window !== 'undefined' && window.pdfjsLib) || globalThis.pdfjsLib;
  if (pdfjsLib && pdfjsLib.GlobalWorkerOptions && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = APP_CONFIG.CDN.PDFJS_WORKER;
  }
}

export default {
  id: 'pdf-split',
  label: 'Dividir PDF',

  render(container) {
    container.innerHTML = getPdfSplitHTML();
  },

  async mount(container) {
    _listeners = [];
    _currentFile = null;
    _currentArrayBuffer = null;
    _currentNumPages = 0;
    _currentMode = 'ranges';
    _outputBlob = null;
    _isZip = false;

    // Elementos DOM
    const dropzone        = container.querySelector('#s-dropzone');
    const fileInput       = container.querySelector('#s-file-input');
    const dropPrompt      = container.querySelector('#s-dropzone-prompt');
    const fileLoadedBox   = container.querySelector('#s-file-loaded');
    const filenameEl      = container.querySelector('#s-filename');
    const filesizeEl      = container.querySelector('#s-filesize');
    const removeBtn       = container.querySelector('#s-remove-btn');

    const modeBtns        = container.querySelectorAll('.pdf-mode-btn');
    const paramRanges     = container.querySelector('#s-param-ranges');
    const paramExtract    = container.querySelector('#s-param-extract');
    const paramAll        = container.querySelector('#s-param-all');
    const paramEvery      = container.querySelector('#s-param-every');

    const rangesInput     = container.querySelector('#s-ranges-input');
    const extractInput    = container.querySelector('#s-extract-input');
    const everyInput      = container.querySelector('#s-every-input');

    const maxPagesHint    = container.querySelector('#s-max-pages-hint');
    const extractHint     = container.querySelector('#s-extract-hint');

    const sumOrigPages    = container.querySelector('#s-sum-orig-pages');
    const sumOutCount     = container.querySelector('#s-sum-out-count');
    const splitBtn        = container.querySelector('#s-split-btn');
    const splitBtnText    = container.querySelector('#s-split-btn-text');
    const clearInputBtn   = container.querySelector('#s-clear-input-btn');
    const resultClearBtn  = container.querySelector('#s-result-clear-btn');

    const emptyView       = container.querySelector('#s-empty-view');
    const loadingView     = container.querySelector('#s-loading-view');
    const loadingProgress = container.querySelector('#s-loading-progress');
    const resultView      = container.querySelector('#s-result-view');

    const resultBadge     = container.querySelector('#s-result-badge');
    const resultSummary   = container.querySelector('#s-result-summary');
    const previewCanvas   = container.querySelector('#s-preview-canvas');
    const metaFiles       = container.querySelector('#s-meta-files');
    const metaPages       = container.querySelector('#s-meta-pages');
    const metaSize        = container.querySelector('#s-meta-size');
    const downloadBtn     = container.querySelector('#s-download-btn');
    const downloadBtnText = container.querySelector('#s-download-btn-text');

    const loadingTitle   = container.querySelector('#s-loading-title');
    const progressPct    = container.querySelector('#s-progress-pct');
    const progressFill   = container.querySelector('#s-progress-fill');
    const loadingDesc    = container.querySelector('#s-loading-desc');
    const progressCounter = container.querySelector('#s-progress-counter');

    function _setViewState(state) {
      emptyView.style.display   = state === 'empty'   ? 'flex' : 'none';
      loadingView.style.display = state === 'loading' ? 'flex' : 'none';
      resultView.style.display  = state === 'result'  ? 'flex' : 'none';
    }

    function _updateProgress(pct, title, desc, counter) {
      if (progressPct) progressPct.textContent = `${pct}%`;
      if (progressFill) progressFill.style.width = `${pct}%`;
      if (title && loadingTitle) loadingTitle.textContent = title;
      if (desc && loadingDesc) loadingDesc.textContent = desc;
      if (counter && progressCounter) progressCounter.textContent = counter;
    }

    // Calcula partições com base no modo ativo
    function _calcPartitions() {
      if (_currentNumPages <= 0) return [];

      if (_currentMode === 'all') {
        const parts = [];
        for (let i = 0; i < _currentNumPages; i++) {
          parts.push({ label: `pag_${i + 1}`, indices: [i] });
        }
        return parts;
      }

      if (_currentMode === 'every') {
        const n = Math.max(1, parseInt(everyInput.value, 10) || 1);
        const parts = [];
        for (let i = 0; i < _currentNumPages; i += n) {
          const end = Math.min(i + n, _currentNumPages);
          const indices = [];
          for (let k = i; k < end; k++) indices.push(k);
          parts.push({ label: `pg${i + 1}-${end}`, indices });
        }
        return parts;
      }

      if (_currentMode === 'extract') {
        const text = extractInput.value.trim();
        if (!text) return [];
        const rawItems = text.split(',');
        const indicesSet = new Set();

        rawItems.forEach(item => {
          const trimmed = item.trim();
          if (trimmed.includes('-')) {
            const [s, e] = trimmed.split('-').map(x => parseInt(x.trim(), 10));
            if (!isNaN(s) && !isNaN(e)) {
              const start = Math.max(1, Math.min(s, e));
              const end = Math.min(_currentNumPages, Math.max(s, e));
              for (let p = start; p <= end; p++) indicesSet.add(p - 1);
            }
          } else {
            const p = parseInt(trimmed, 10);
            if (!isNaN(p) && p >= 1 && p <= _currentNumPages) {
              indicesSet.add(p - 1);
            }
          }
        });

        const sorted = Array.from(indicesSet).sort((a, b) => a - b);
        if (sorted.length === 0) return [];
        return [{ label: 'paginas_selecionadas', indices: sorted }];
      }

      // Modo 'ranges'
      const text = rangesInput.value.trim();
      if (!text) return [];
      const chunks = text.split(',');
      const parts = [];

      chunks.forEach((chk, idx) => {
        const trimmed = chk.trim();
        if (!trimmed) return;
        if (trimmed.includes('-')) {
          const [s, e] = trimmed.split('-').map(x => parseInt(x.trim(), 10));
          if (!isNaN(s) && !isNaN(e)) {
            const start = Math.max(1, Math.min(s, e));
            const end = Math.min(_currentNumPages, Math.max(s, e));
            const indices = [];
            for (let p = start; p <= end; p++) indices.push(p - 1);
            if (indices.length > 0) parts.push({ label: `parte_${idx + 1}_pg${start}-${end}`, indices });
          }
        } else {
          const p = parseInt(trimmed, 10);
          if (!isNaN(p) && p >= 1 && p <= _currentNumPages) {
            parts.push({ label: `parte_${idx + 1}_pg${p}`, indices: [p - 1] });
          }
        }
      });

      return parts;
    }

    function _updateSummary() {
      sumOrigPages.textContent = _currentNumPages > 0 ? `${_currentNumPages} páginas` : '0 páginas';
      const parts = _calcPartitions();
      const count = parts.length;
      sumOutCount.textContent = `${count} ${count === 1 ? 'arquivo' : 'arquivos'}`;

      if (_currentNumPages > 0 && count > 0) {
        splitBtn.disabled = false;
        splitBtnText.textContent = count === 1 ? 'Extrair PDF Agora' : `Dividir em ${count} PDFs`;
      } else {
        splitBtn.disabled = true;
        splitBtnText.textContent = 'Dividir PDF';
      }
    }

    function _switchMode(newMode) {
      _currentMode = newMode;
      modeBtns.forEach(btn => {
        btn.classList.toggle('pdf-mode-btn--active', btn.dataset.mode === newMode);
      });

      paramRanges.style.display  = newMode === 'ranges'  ? 'block' : 'none';
      paramExtract.style.display = newMode === 'extract' ? 'block' : 'none';
      paramAll.style.display     = newMode === 'all'     ? 'block' : 'none';
      paramEvery.style.display   = newMode === 'every'   ? 'block' : 'none';

      _updateSummary();
    }

    async function _handleFile(file) {
      _currentFile = file;
      _currentArrayBuffer = await file.arrayBuffer();

      filenameEl.textContent = file.name;
      filesizeEl.textContent = _formatBytes(file.size);
      dropPrompt.style.display = 'none';
      fileLoadedBox.style.display = 'flex';
      if (clearInputBtn) clearInputBtn.style.display = 'inline-flex';

      await _ensureLibs();
      const pdfjsLib = (typeof window !== 'undefined' && window.pdfjsLib) || globalThis.pdfjsLib;

      try {
        const copyBuf = _currentArrayBuffer.slice(0);
        let numPgs = 1;

        if (pdfjsLib) {
          const task = pdfjsLib.getDocument({ data: copyBuf });
          const doc = await task.promise;
          numPgs = doc.numPages;

          // Renderiza miniatura da primeira página
          try {
            const firstPage = await doc.getPage(1);
            const stageVp = firstPage.getViewport({ scale: 1 });
            const scale = Math.min(260 / stageVp.width, 230 / stageVp.height);
            const scaledVp = firstPage.getViewport({ scale: Math.max(scale, 0.4) });

            previewCanvas.width = scaledVp.width;
            previewCanvas.height = scaledVp.height;
            const ctx = previewCanvas.getContext('2d');
            await firstPage.render({ canvasContext: ctx, viewport: scaledVp }).promise;
          } catch (e) {
            console.warn('Miniatura preview não disponível:', e);
          }
        } else {
          const PDFLib = (typeof window !== 'undefined' && window.PDFLib) || globalThis.PDFLib;
          if (PDFLib) {
            const pdfDoc = await PDFLib.PDFDocument.load(copyBuf, { ignoreEncryption: true });
            numPgs = pdfDoc.getPageCount();
          }
        }

        _currentNumPages = numPgs;
        maxPagesHint.textContent = `Total: ${numPgs} págs`;
        extractHint.textContent = `Total: ${numPgs} págs`;

        // Preenche sugestão de intervalos com base nas páginas reais
        if (numPgs === 1) {
          rangesInput.value = '1';
          extractInput.value = '1';
        } else if (numPgs <= 3) {
          rangesInput.value = `1, 2-${numPgs}`;
          extractInput.value = '1';
        } else {
          const mid = Math.floor(numPgs / 2);
          rangesInput.value = `1-${mid}, ${mid + 1}-${numPgs}`;
          extractInput.value = `1, ${numPgs}`;
        }

        _updateSummary();

      } catch (err) {
        console.error('Erro ao ler PDF:', err);
        alert('Não foi possível ler as páginas do documento. O arquivo pode estar protegido por senha.');
        _reset();
      }
    }

    function _reset() {
      _currentFile = null;
      _currentArrayBuffer = null;
      _currentNumPages = 0;
      _outputBlob = null;
      _isZip = false;

      fileInput.value = '';
      dropPrompt.style.display = 'flex';
      fileLoadedBox.style.display = 'none';
      if (clearInputBtn) clearInputBtn.style.display = 'none';

      maxPagesHint.textContent = 'Total: - págs';
      extractHint.textContent = 'Total: - págs';
      splitBtn.disabled = true;
      splitBtnText.textContent = 'Dividir PDF';

      _updateSummary();
      _setViewState('empty');
    }

    async function _doSplit() {
      const partitions = _calcPartitions();
      if (!_currentArrayBuffer || partitions.length === 0) return;

      _setViewState('loading');
      _updateProgress(5, 'Iniciando divisão...', 'Carregando documento e estruturando partições...', `0 / ${partitions.length} partes`);
      await new Promise(r => setTimeout(r, 25));

      await _ensureLibs();
      const PDFLib = (typeof window !== 'undefined' && window.PDFLib) || globalThis.PDFLib;
      const pdfjsLib = (typeof window !== 'undefined' && window.pdfjsLib) || globalThis.pdfjsLib;
      const JSZip = (typeof window !== 'undefined' && window.JSZip) || globalThis.JSZip;

      if (!PDFLib) {
        alert('Biblioteca PDFLib não disponível.');
        _setViewState('empty');
        return;
      }

      try {
        const copyBuf = _currentArrayBuffer.slice(0);
        let srcDoc = null;
        let usePdfJsFallback = false;

        try {
          srcDoc = await PDFLib.PDFDocument.load(copyBuf, { ignoreEncryption: true });
        } catch (loadErr) {
          usePdfJsFallback = true;
        }

        const generatedFiles = [];
        let totalPagesExtracted = 0;
        const baseName = _currentFile ? _currentFile.name.replace(/\.pdf$/i, '') : 'documento';

        // Processa cada partição
        for (let i = 0; i < partitions.length; i++) {
          const part = partitions[i];
          const currentPct = Math.round(5 + ((i / partitions.length) * 85));
          _updateProgress(
            currentPct,
            `Gerando arquivo ${i + 1} de ${partitions.length}...`,
            `Extraindo ${part.indices.length} página(s) (${part.label})`,
            `${i + 1} / ${partitions.length} partes`
          );
          await new Promise(r => setTimeout(r, 15));

          const newDoc = await PDFLib.PDFDocument.create();

          if (!usePdfJsFallback && srcDoc) {
            const copiedPages = await newDoc.copyPages(srcDoc, part.indices);
            copiedPages.forEach(p => newDoc.addPage(p));
          } else if (pdfjsLib) {
            // Fallback via PDF.js caso a criptografia do arquivo impeça cópia nativa
            const loadingTask = pdfjsLib.getDocument({ data: copyBuf.slice(0) });
            const jsDoc = await loadingTask.promise;

            for (const pageIdx of part.indices) {
              const page = await jsDoc.getPage(pageIdx + 1);
              const viewport = page.getViewport({ scale: 1.5 });
              const canvas = document.createElement('canvas');
              canvas.width = viewport.width;
              canvas.height = viewport.height;
              const ctx = canvas.getContext('2d');
              await page.render({ canvasContext: ctx, viewport }).promise;

              const imgDataUrl = canvas.toDataURL('image/jpeg', 0.90);
              const bytes = _dataUrlToBytes(imgDataUrl);
              const embedded = await newDoc.embedJpg(bytes);

              const newPage = newDoc.addPage([viewport.width, viewport.height]);
              newPage.drawImage(embedded, {
                x: 0,
                y: 0,
                width: viewport.width,
                height: viewport.height
              });
            }
          }

          const outBytes = await newDoc.save();
          const fileName = `${baseName}_${part.label}.pdf`;
          generatedFiles.push({ name: fileName, bytes: outBytes });
          totalPagesExtracted += part.indices.length;
        }

        // Se produziu apenas 1 arquivo, disponibiliza diretamente como .PDF
        if (generatedFiles.length === 1) {
          _outputBlob = new Blob([generatedFiles[0].bytes], { type: 'application/pdf' });
          _isZip = false;
          _downloadName = generatedFiles[0].name;

          resultBadge.textContent = '1 Arquivo Extraído';
          resultSummary.textContent = `${totalPagesExtracted} página(s) extraída(s)`;
          downloadBtnText.textContent = 'Baixar Documento (.PDF)';
        } else {
          // Múltiplos arquivos: empacota em .ZIP via JSZip
          if (!JSZip) {
            throw new Error('Biblioteca JSZip necessária para pacote compactado.');
          }
          _updateProgress(92, 'Empacotando arquivos...', `Compactando ${generatedFiles.length} arquivos PDF em .ZIP...`, `${partitions.length} / ${partitions.length} partes`);
          await new Promise(r => setTimeout(r, 20));

          const zip = new JSZip();
          generatedFiles.forEach(f => {
            zip.file(f.name, f.bytes);
          });
          const zipBlob = await zip.generateAsync({ type: 'blob' });
          _outputBlob = zipBlob;
          _isZip = true;
          _downloadName = `${baseName}_dividido.zip`;

          resultBadge.textContent = `${generatedFiles.length} Arquivos Gerados`;
          resultSummary.textContent = `${totalPagesExtracted} páginas distribuídas em ${generatedFiles.length} arquivos`;
          downloadBtnText.textContent = `Baixar Pacote (${generatedFiles.length} PDFs em .ZIP)`;
        }

        _updateProgress(100, 'Divisão concluída com sucesso!', 'Preparando visualização...', `${partitions.length} / ${partitions.length} partes`);
        await new Promise(r => setTimeout(r, 20));

        metaFiles.textContent = generatedFiles.length;
        metaPages.textContent = totalPagesExtracted;
        metaSize.textContent = _formatBytes(_outputBlob.size);

        // Renderiza thumbnail da primeira página do primeiro arquivo gerado
        if (pdfjsLib && generatedFiles[0]) {
          try {
            const previewTask = pdfjsLib.getDocument({ data: generatedFiles[0].bytes.slice(0) });
            const previewDoc = await previewTask.promise;
            const firstPage = await previewDoc.getPage(1);
            const stageVp = firstPage.getViewport({ scale: 1 });
            const scale = Math.min(260 / stageVp.width, 230 / stageVp.height);
            const scaledVp = firstPage.getViewport({ scale: Math.max(scale, 0.4) });

            previewCanvas.width = scaledVp.width;
            previewCanvas.height = scaledVp.height;
            const ctx = previewCanvas.getContext('2d');
            await firstPage.render({ canvasContext: ctx, viewport: scaledVp }).promise;
          } catch (e) {
            console.warn('Erro ao renderizar thumbnail gerada:', e);
          }
        }

        _setViewState('result');

      } catch (err) {
        console.error('Falha ao dividir PDF:', err);
        _setViewState('empty');
        alert('Erro ao processar a divisão do PDF. Verifique os intervalos informados.');
      }
    }

    // Eventos
    _on(dropzone, 'click', (e) => {
      if (e.target !== removeBtn && !removeBtn?.contains(e.target)) {
        fileInput.click();
      }
    });

    _on(dropzone, 'keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        fileInput.click();
      }
    });

    _on(fileInput, 'change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) _handleFile(file);
    });

    _on(dropzone, 'dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('pdf-drag-over');
    });

    _on(dropzone, 'dragleave', () => dropzone.classList.remove('pdf-drag-over'));

    _on(dropzone, 'drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('pdf-drag-over');
      const file = e.dataTransfer?.files?.[0];
      if (file && (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf'))) {
        _handleFile(file);
      }
    });

    _on(removeBtn, 'click', (e) => {
      e.stopPropagation();
      _reset();
    });

    modeBtns.forEach(btn => {
      _on(btn, 'click', () => {
        _switchMode(btn.dataset.mode);
      });
    });

    _on(rangesInput, 'input', _updateSummary);
    _on(extractInput, 'input', _updateSummary);
    _on(everyInput, 'input', _updateSummary);

    _on(splitBtn, 'click', _doSplit);
    if (clearInputBtn) _on(clearInputBtn, 'click', _reset);
    if (resultClearBtn) _on(resultClearBtn, 'click', _reset);

    _on(downloadBtn, 'click', () => {
      if (!_outputBlob) return;
      const url = URL.createObjectURL(_outputBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = _downloadName;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 500);
    });

    // Inicia carregamento assíncrono em background sem travar o mount
    _ensureLibs().catch(err => console.warn('Carregamento de bibliotecas PDF:', err));
  },

  unmount() {
    _listeners.forEach(({ element, event, handler }) => {
      if (element) element.removeEventListener(event, handler);
    });
    _listeners = [];
    _currentFile = null;
    _currentArrayBuffer = null;
    _currentNumPages = 0;
    _outputBlob = null;
    _isZip = false;
  }
};
