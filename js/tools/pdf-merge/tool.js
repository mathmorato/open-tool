/**
 * Open Tool — Ferramenta: Mesclar PDF (pdf-merge)
 * 100% Client-Side via PDF-lib e PDF.js
 * @version v.2.3.0
 */

import { getPdfMergeHTML } from './ui.js';
import { APP_CONFIG, loadScript } from '../../config.js';

let _listeners = [];
let _filesQueue = [];
let _mergedPdfBlob = null;

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

export default {
  id: 'pdf-merge',
  label: 'Mesclar PDF',

  render(container) {
    container.innerHTML = getPdfMergeHTML();
  },

  async mount(container) {
    _listeners = [];
    _filesQueue = [];
    _mergedPdfBlob = null;

    const dropzone      = container.querySelector('#m-dropzone');
    const fileInput     = container.querySelector('#m-file-input');
    const fileList      = container.querySelector('#m-file-list');
    const listEmpty     = container.querySelector('#m-list-empty');
    const countBadge    = container.querySelector('#m-count-badge');
    const clearBtn      = container.querySelector('#m-clear-btn');
    const mergeBtn      = container.querySelector('#m-merge-btn');

    const emptyView     = container.querySelector('#m-empty-view');
    const loadingView   = container.querySelector('#m-loading-view');
    const resultView    = container.querySelector('#m-result-view');

    const previewCanvas = container.querySelector('#m-preview-canvas');
    const metaDocs      = container.querySelector('#m-meta-docs');
    const metaPages     = container.querySelector('#m-meta-pages');
    const metaSize      = container.querySelector('#m-meta-size');
    const downloadBtn   = container.querySelector('#m-download-btn');

    function _setViewState(state) {
      emptyView.style.display   = state === 'empty'   ? 'flex' : 'none';
      loadingView.style.display = state === 'loading' ? 'flex' : 'none';
      resultView.style.display  = state === 'result'  ? 'flex' : 'none';
    }

    function _renderList() {
      countBadge.textContent = _filesQueue.length;
      clearBtn.style.display = _filesQueue.length > 0 ? 'inline-block' : 'none';
      mergeBtn.disabled = _filesQueue.length < 2;

      if (_filesQueue.length === 0) {
        fileList.innerHTML = '';
        fileList.appendChild(listEmpty);
        listEmpty.style.display = 'block';
        return;
      }

      listEmpty.style.display = 'none';
      fileList.innerHTML = '';

      _filesQueue.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'pdf-merge-item';
        row.innerHTML = `
          <div class="pdf-merge-item-order">${index + 1}</div>
          <div class="pdf-merge-item-info">
            <span class="pdf-merge-item-name" title="${item.file.name}">${item.file.name}</span>
            <span class="pdf-merge-item-size">${_formatBytes(item.file.size)}</span>
          </div>
          <div class="pdf-merge-item-actions">
            <button type="button" class="pdf-item-ctrl-btn btn-up" data-idx="${index}" title="Mover para cima" ${index === 0 ? 'disabled' : ''}>↑</button>
            <button type="button" class="pdf-item-ctrl-btn btn-down" data-idx="${index}" title="Mover para baixo" ${index === _filesQueue.length - 1 ? 'disabled' : ''}>↓</button>
            <button type="button" class="pdf-item-ctrl-btn btn-del" data-idx="${index}" title="Remover">✕</button>
          </div>
        `;
        fileList.appendChild(row);
      });

      // Listeners nos botões de controle
      fileList.querySelectorAll('.btn-up').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const idx = parseInt(btn.dataset.idx, 10);
          if (idx > 0) {
            const temp = _filesQueue[idx];
            _filesQueue[idx] = _filesQueue[idx - 1];
            _filesQueue[idx - 1] = temp;
            _renderList();
          }
        });
      });

      fileList.querySelectorAll('.btn-down').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const idx = parseInt(btn.dataset.idx, 10);
          if (idx < _filesQueue.length - 1) {
            const temp = _filesQueue[idx];
            _filesQueue[idx] = _filesQueue[idx + 1];
            _filesQueue[idx + 1] = temp;
            _renderList();
          }
        });
      });

      fileList.querySelectorAll('.btn-del').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const idx = parseInt(btn.dataset.idx, 10);
          _filesQueue.splice(idx, 1);
          _renderList();
        });
      });
    }

    async function _addFiles(files) {
      for (const file of files) {
        if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
          const buffer = await file.arrayBuffer();
          _filesQueue.push({ file, buffer });
        }
      }
      _renderList();
    }

    async function _doMerge() {
      if (_filesQueue.length < 2) return;

      _setViewState('loading');
      await new Promise(r => setTimeout(r, 20));

      await _ensureLibs();
      const PDFLib = (typeof window !== 'undefined' && window.PDFLib) || globalThis.PDFLib;
      const pdfjsLib = (typeof window !== 'undefined' && window.pdfjsLib) || globalThis.pdfjsLib;

      if (!PDFLib) {
        alert('Biblioteca PDFLib não disponível.');
        _setViewState('empty');
        return;
      }

      try {
        const mergedDoc = await PDFLib.PDFDocument.create();
        let totalPages = 0;

        for (const item of _filesQueue) {
          try {
            const srcDoc = await PDFLib.PDFDocument.load(item.buffer.slice(0), { ignoreEncryption: true });
            const pageIndices = srcDoc.getPageIndices();
            const copiedPages = await mergedDoc.copyPages(srcDoc, pageIndices);
            copiedPages.forEach(page => mergedDoc.addPage(page));
            totalPages += pageIndices.length;
          } catch (loadErr) {
            // Se falhar no pdf-lib direto (ex: criptografia forte), tenta com pdf.js
            if (pdfjsLib) {
              const loadingTask = pdfjsLib.getDocument({ data: item.buffer.slice(0) });
              const jsDoc = await loadingTask.promise;
              const numPgs = jsDoc.numPages;
              for (let p = 1; p <= numPgs; p++) {
                const page = await jsDoc.getPage(p);
                const vp = page.getViewport({ scale: 1.5 });
                const canvas = document.createElement('canvas');
                canvas.width = vp.width;
                canvas.height = vp.height;
                const ctx = canvas.getContext('2d');
                await page.render({ canvasContext: ctx, viewport: vp }).promise;

                const imgDataUrl = canvas.toDataURL('image/jpeg', 0.90);
                const parts = imgDataUrl.split(',');
                const bin = atob(parts[1]);
                const bytes = new Uint8Array(bin.length);
                for (let k = 0; k < bin.length; k++) bytes[k] = bin.charCodeAt(k);

                const embedded = await mergedDoc.embedJpg(bytes);
                const newPg = mergedDoc.addPage([vp.width, vp.height]);
                newPg.drawImage(embedded, { x: 0, y: 0, width: vp.width, height: vp.height });
                totalPages++;
              }
            } else {
              throw loadErr;
            }
          }
        }

        const mergedBytes = await mergedDoc.save();
        _mergedPdfBlob = new Blob([mergedBytes], { type: 'application/pdf' });

        metaDocs.textContent = _filesQueue.length;
        metaPages.textContent = totalPages;
        metaSize.textContent = _formatBytes(_mergedPdfBlob.size);

        // Renderiza thumbnail da primeira página no canvas
        if (pdfjsLib) {
          try {
            const previewDoc = await pdfjsLib.getDocument({ data: mergedBytes.slice(0) }).promise;
            const firstPage = await previewDoc.getPage(1);
            const stageVp = firstPage.getViewport({ scale: 1 });
            const scale = Math.min(260 / stageVp.width, 230 / stageVp.height);
            const scaledVp = firstPage.getViewport({ scale: Math.max(scale, 0.4) });

            previewCanvas.width = scaledVp.width;
            previewCanvas.height = scaledVp.height;
            const ctx = previewCanvas.getContext('2d');
            await firstPage.render({ canvasContext: ctx, viewport: scaledVp }).promise;
          } catch (e) {
            console.warn('Erro ao renderizar miniatura mesclada:', e);
          }
        }

        _setViewState('result');

      } catch (err) {
        console.error('Falha ao mesclar PDFs:', err);
        _setViewState('empty');
        alert('Erro ao mesclar documentos. Um dos arquivos pode ter criptografia pesada.');
      }
    }

    _on(dropzone, 'click', () => {
      fileInput.click();
    });

    _on(dropzone, 'keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        fileInput.click();
      }
    });

    _on(fileInput, 'change', (e) => {
      if (e.target.files && e.target.files.length) {
        _addFiles(Array.from(e.target.files));
        fileInput.value = '';
      }
    });

    _on(dropzone, 'dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('pdf-drag-over');
    });

    _on(dropzone, 'dragleave', () => dropzone.classList.remove('pdf-drag-over'));

    _on(dropzone, 'drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('pdf-drag-over');
      const files = e.dataTransfer?.files;
      if (files && files.length) {
        _addFiles(Array.from(files));
      }
    });

    _on(clearBtn, 'click', () => {
      _filesQueue = [];
      _renderList();
      _setViewState('empty');
    });

    _on(mergeBtn, 'click', _doMerge);

    _on(downloadBtn, 'click', () => {
      if (!_mergedPdfBlob) return;
      const outName = 'documentos_mesclados.pdf';
      const url = URL.createObjectURL(_mergedPdfBlob);
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
    _filesQueue = [];
    _mergedPdfBlob = null;
  }
};
