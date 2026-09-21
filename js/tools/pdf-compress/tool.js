/**
 * Open Tool — Ferramenta: Comprimir PDF (pdf-compress)
 * 100% Client-Side via PDF-lib e PDF.js com reamostragem em Canvas
 * @version v.2.3.0
 */

import { getPdfCompressHTML } from './ui.js';
import { APP_CONFIG, loadScript } from '../../config.js';

let _listeners = [];
let _currentFile = null;
let _currentArrayBuffer = null;
let _compressedPdfBlob = null;
let _currentPreset = 'balanced';

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
  if (promises.length > 0) {
    await Promise.all(promises);
  }
  const pdfjsLib = (typeof window !== 'undefined' && window.pdfjsLib) || globalThis.pdfjsLib;
  if (pdfjsLib && pdfjsLib.GlobalWorkerOptions && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = APP_CONFIG.CDN.PDFJS_WORKER;
  }
}

const PRESETS = {
  extreme:  { dpi: 72,  quality: 0.50 },
  balanced: { dpi: 100, quality: 0.70 },
  light:    { dpi: 150, quality: 0.85 }
};

export default {
  id: 'pdf-compress',
  label: 'Comprimir PDF',

  render(container) {
    container.innerHTML = getPdfCompressHTML();
  },

  async mount(container) {
    _listeners = [];
    _currentFile = null;
    _currentArrayBuffer = null;
    _compressedPdfBlob = null;
    _currentPreset = 'balanced';

    // Elementos DOM
    const dropzone        = container.querySelector('#c-dropzone');
    const fileInput       = container.querySelector('#c-file-input');
    const dropPrompt      = container.querySelector('#c-dropzone-prompt');
    const fileLoadedBox   = container.querySelector('#c-file-loaded');
    const filenameEl      = container.querySelector('#c-filename');
    const filesizeEl      = container.querySelector('#c-filesize');
    const removeBtn       = container.querySelector('#c-remove-btn');

    const presetBtns      = container.querySelectorAll('.pdf-preset-btn');
    const dpiRange        = container.querySelector('#c-dpi-range');
    const dpiVal          = container.querySelector('#c-dpi-val');
    const qualityRange    = container.querySelector('#c-quality-range');
    const qualityVal      = container.querySelector('#c-quality-val');

    const compressBtn     = container.querySelector('#c-compress-btn');

    const emptyView       = container.querySelector('#c-empty-view');
    const loadingView     = container.querySelector('#c-loading-view');
    const loadingProgress = container.querySelector('#c-loading-progress');
    const resultView      = container.querySelector('#c-result-view');

    const statOrig        = container.querySelector('#c-stat-orig');
    const statNew         = container.querySelector('#c-stat-new');
    const statPct         = container.querySelector('#c-stat-pct');
    const previewCanvas   = container.querySelector('#c-preview-canvas');
    const metaPages       = container.querySelector('#c-meta-pages');
    const metaSaved       = container.querySelector('#c-meta-saved');
    const downloadBtn     = container.querySelector('#c-download-btn');

    function _setViewState(state) {
      emptyView.style.display   = state === 'empty'   ? 'flex' : 'none';
      loadingView.style.display = state === 'loading' ? 'flex' : 'none';
      resultView.style.display  = state === 'result'  ? 'flex' : 'none';
    }

    function _syncPresetControls(presetKey) {
      const cfg = PRESETS[presetKey];
      if (!cfg) return;
      dpiRange.value = cfg.dpi;
      dpiVal.textContent = cfg.dpi + ' DPI';
      qualityRange.value = Math.round(cfg.quality * 100);
      qualityVal.textContent = Math.round(cfg.quality * 100) + '%';
    }

    async function _handleFile(file) {
      _currentFile = file;
      _currentArrayBuffer = await file.arrayBuffer();

      filenameEl.textContent = file.name;
      filesizeEl.textContent = _formatBytes(file.size);
      dropPrompt.style.display = 'none';
      fileLoadedBox.style.display = 'flex';
      compressBtn.disabled = false;
    }

    function _reset() {
      _currentFile = null;
      _currentArrayBuffer = null;
      _compressedPdfBlob = null;

      fileInput.value = '';
      dropPrompt.style.display = 'flex';
      fileLoadedBox.style.display = 'none';
      compressBtn.disabled = true;

      _setViewState('empty');
    }

    async function _doCompress() {
      if (!_currentArrayBuffer) return;

      _setViewState('loading');
      await new Promise(r => setTimeout(r, 20));

      await _ensureLibs();
      const PDFLib = (typeof window !== 'undefined' && window.PDFLib) || globalThis.PDFLib;
      const pdfjsLib = (typeof window !== 'undefined' && window.pdfjsLib) || globalThis.pdfjsLib;

      if (!PDFLib || !pdfjsLib) {
        alert('Bibliotecas de processamento de PDF indisponíveis.');
        _setViewState('empty');
        return;
      }

      const dpi = parseInt(dpiRange.value, 10) || 100;
      const quality = (parseInt(qualityRange.value, 10) || 70) / 100;
      const renderScale = dpi / 72; // 72 DPI é a escala base do PDF

      try {
        const copyBuf = _currentArrayBuffer.slice(0);
        const loadingTask = pdfjsLib.getDocument({ data: copyBuf });
        const jsDoc = await loadingTask.promise;
        const numPages = jsDoc.numPages;

        const newPdfDoc = await PDFLib.PDFDocument.create();

        for (let i = 1; i <= numPages; i++) {
          if (loadingProgress) {
            loadingProgress.textContent = `Otimizando página ${i} de ${numPages}...`;
          }

          const page = await jsDoc.getPage(i);
          const viewport = page.getViewport({ scale: renderScale });
          const baseViewport = page.getViewport({ scale: 1 });

          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext('2d');
          await page.render({ canvasContext: ctx, viewport }).promise;

          const imgDataUrl = canvas.toDataURL('image/jpeg', quality);
          const imgBytes = _dataUrlToBytes(imgDataUrl);
          const embeddedImg = await newPdfDoc.embedJpg(imgBytes);

          const newPage = newPdfDoc.addPage([baseViewport.width, baseViewport.height]);
          newPage.drawImage(embeddedImg, {
            x: 0,
            y: 0,
            width: baseViewport.width,
            height: baseViewport.height
          });
        }

        const compressedBytes = await newPdfDoc.save();
        _compressedPdfBlob = new Blob([compressedBytes], { type: 'application/pdf' });

        // Atualiza Métricas
        const origSize = _currentFile.size;
        const newSize = _compressedPdfBlob.size;
        const diff = origSize - newSize;
        const pct = origSize > 0 ? Math.round((diff / origSize) * 100) : 0;

        statOrig.textContent = _formatBytes(origSize);
        statNew.textContent = _formatBytes(newSize);

        if (pct >= 0) {
          statPct.textContent = `-${pct}%`;
          statPct.style.background = 'color-mix(in srgb, #10b981 18%, transparent)';
          statPct.style.color = '#10b981';
          metaSaved.textContent = _formatBytes(Math.max(0, diff));
        } else {
          statPct.textContent = `+${Math.abs(pct)}%`;
          statPct.style.background = 'color-mix(in srgb, #f59e0b 18%, transparent)';
          statPct.style.color = '#f59e0b';
          metaSaved.textContent = '0 B';
        }

        metaPages.textContent = numPages;

        // Renderiza thumbnail da primeira página comprimida
        try {
          const previewDoc = await pdfjsLib.getDocument({ data: compressedBytes.slice(0) }).promise;
          const firstPage = await previewDoc.getPage(1);
          const stageVp = firstPage.getViewport({ scale: 1 });
          const scale = Math.min(260 / stageVp.width, 230 / stageVp.height);
          const scaledVp = firstPage.getViewport({ scale: Math.max(scale, 0.4) });

          previewCanvas.width = scaledVp.width;
          previewCanvas.height = scaledVp.height;
          const ctx = previewCanvas.getContext('2d');
          await firstPage.render({ canvasContext: ctx, viewport: scaledVp }).promise;
        } catch (e) {
          console.warn('Erro ao renderizar miniatura comprimida:', e);
        }

        _setViewState('result');

      } catch (err) {
        console.error('Falha ao comprimir PDF:', err);
        _setViewState('empty');
        alert('Erro ao comprimir o PDF. O arquivo pode estar corrompido ou protegido por senha.');
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

    presetBtns.forEach(btn => {
      _on(btn, 'click', () => {
        presetBtns.forEach(b => b.classList.remove('pdf-preset-btn--active'));
        btn.classList.add('pdf-preset-btn--active');
        _currentPreset = btn.dataset.preset;
        _syncPresetControls(_currentPreset);
      });
    });

    _on(dpiRange, 'input', () => {
      dpiVal.textContent = dpiRange.value + ' DPI';
    });

    _on(qualityRange, 'input', () => {
      qualityVal.textContent = qualityRange.value + '%';
    });

    _on(compressBtn, 'click', _doCompress);

    _on(downloadBtn, 'click', () => {
      if (!_compressedPdfBlob) return;
      const originalName = _currentFile ? _currentFile.name.replace(/\.pdf$/i, '') : 'documento';
      const outName = `${originalName}_comprimido.pdf`;

      const url = URL.createObjectURL(_compressedPdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = outName;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 500);
    });

    // Inicia carregamento em background sem travar o mount
    _ensureLibs().catch(err => console.warn('Carregamento de bibliotecas PDF:', err));
  },

  unmount() {
    _listeners.forEach(({ element, event, handler }) => {
      if (element) element.removeEventListener(event, handler);
    });
    _listeners = [];
    _currentFile = null;
    _currentArrayBuffer = null;
    _compressedPdfBlob = null;
  }
};
