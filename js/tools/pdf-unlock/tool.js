/**
 * Open Tool — Ferramenta: Desbloquear PDF (pdf-unlock)
 * 100% Client-Side via PDF-lib e PDF.js
 * @version v.2.3.0
 */

import { getPdfUnlockHTML } from './ui.js';
import { APP_CONFIG, loadScript } from '../../config.js';

let _listeners = [];
let _currentFile = null;
let _currentArrayBuffer = null;
let _unlockedPdfBlob = null;
let _requiresPassword = false;

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

export default {
  id: 'pdf-unlock',
  label: 'Desbloquear PDF',

  render(container) {
    container.innerHTML = getPdfUnlockHTML();
  },

  async mount(container) {
    _listeners = [];
    _currentFile = null;
    _currentArrayBuffer = null;
    _unlockedPdfBlob = null;
    _requiresPassword = false;

    // Elementos DOM
    const dropzone        = container.querySelector('#u-dropzone');
    const fileInput       = container.querySelector('#u-file-input');
    const dropPrompt      = container.querySelector('#u-dropzone-prompt');
    const fileLoadedBox   = container.querySelector('#u-file-loaded');
    const filenameEl      = container.querySelector('#u-filename');
    const filesizeEl      = container.querySelector('#u-filesize');
    const removeBtn       = container.querySelector('#u-remove-btn');

    const statusCard      = container.querySelector('#u-status-card');
    const lockBadge       = container.querySelector('#u-lock-badge');
    const statusDesc      = container.querySelector('#u-status-desc');

    const passwordGroup   = container.querySelector('#u-password-group');
    const passwordInput   = container.querySelector('#u-password-input');
    const togglePwdBtn    = container.querySelector('#u-toggle-pwd-btn');

    const unlockBtn       = container.querySelector('#u-unlock-btn');
    const unlockBtnText   = container.querySelector('#u-unlock-btn-text');

    const emptyView       = container.querySelector('#u-empty-view');
    const loadingView     = container.querySelector('#u-loading-view');
    const resultView      = container.querySelector('#u-result-view');

    const previewCanvas   = container.querySelector('#u-preview-canvas');
    const metaPages       = container.querySelector('#u-meta-pages');
    const metaSize        = container.querySelector('#u-meta-size');
    const downloadBtn     = container.querySelector('#u-download-btn');

    const loadingTitle   = container.querySelector('#u-loading-title');
    const progressPct    = container.querySelector('#u-progress-pct');
    const progressFill   = container.querySelector('#u-progress-fill');
    const loadingDesc    = container.querySelector('#u-loading-desc');
    const progressCounter = container.querySelector('#u-progress-counter');

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

    async function _inspectPdf(file) {
      _currentFile = file;
      _currentArrayBuffer = await file.arrayBuffer();

      filenameEl.textContent = file.name;
      filesizeEl.textContent = _formatBytes(file.size);
      dropPrompt.style.display = 'none';
      fileLoadedBox.style.display = 'flex';

      _requiresPassword = false;
      passwordGroup.style.display = 'none';
      passwordInput.value = '';

      await _ensureLibs();
      const pdfjsLib = (typeof window !== 'undefined' && window.pdfjsLib) || globalThis.pdfjsLib;

      if (!pdfjsLib) {
        lockBadge.textContent = 'PDF Carregado';
        lockBadge.className = 'pdf-badge';
        statusDesc.textContent = 'Pronto para remoção de restrições de impressão e edição.';
        unlockBtn.disabled = false;
        unlockBtnText.textContent = 'Desbloquear PDF';
        return;
      }

      try {
        const loadingTask = pdfjsLib.getDocument({ data: _currentArrayBuffer.slice(0) });
        loadingTask.onPassword = (callback, reason) => {
          _requiresPassword = true;
          lockBadge.textContent = 'Senha de Abertura';
          lockBadge.className = 'pdf-badge pdf-badge--warning';
          statusDesc.textContent = 'Este arquivo possui uma senha de leitura. Digite a senha abaixo para descriptografar.';
          passwordGroup.style.display = 'flex';
          unlockBtn.disabled = false;
          unlockBtnText.textContent = 'Descriptografar com Senha';
          passwordInput.focus();
        };

        const doc = await loadingTask.promise;
        lockBadge.textContent = 'Restrição de Permissões';
        lockBadge.className = 'pdf-badge pdf-badge--info';
        statusDesc.textContent = 'Documento protegido contra cópia/edição ou sem restrição de leitura. Pronto para desbloqueio.';
        unlockBtn.disabled = false;
        unlockBtnText.textContent = 'Desbloquear PDF Agora';

      } catch (err) {
        if (err.name === 'PasswordException' || _requiresPassword) {
          _requiresPassword = true;
          lockBadge.textContent = 'Senha de Abertura';
          lockBadge.className = 'pdf-badge pdf-badge--warning';
          statusDesc.textContent = 'Este arquivo exige senha para ser aberto. Insira a senha abaixo.';
          passwordGroup.style.display = 'flex';
          unlockBtn.disabled = false;
          unlockBtnText.textContent = 'Descriptografar com Senha';
        } else {
          lockBadge.textContent = 'PDF Carregado';
          lockBadge.className = 'pdf-badge';
          statusDesc.textContent = 'Pronto para remoção de restrições de impressão e edição.';
          unlockBtn.disabled = false;
          unlockBtnText.textContent = 'Desbloquear PDF';
        }
      }
    }

    function _reset() {
      _currentFile = null;
      _currentArrayBuffer = null;
      _unlockedPdfBlob = null;
      _requiresPassword = false;

      fileInput.value = '';
      dropPrompt.style.display = 'flex';
      fileLoadedBox.style.display = 'none';

      lockBadge.textContent = 'Aguardando Arquivo';
      lockBadge.className = 'pdf-badge';
      statusDesc.textContent = 'Carregue um PDF para inspecionar permissões de impressão, cópia e proteção por chave criptográfica.';

      passwordGroup.style.display = 'none';
      passwordInput.value = '';
      unlockBtn.disabled = true;
      unlockBtnText.textContent = 'Desbloquear PDF';

      _setViewState('empty');
    }

    // Processo de Desbloqueio
    async function _doUnlock() {
      if (!_currentArrayBuffer) return;

      _setViewState('loading');
      _updateProgress(5, 'Iniciando descriptografia...', 'Carregando chaves de segurança e tabelas xref...', 'Iniciando');
      await new Promise(r => setTimeout(r, 25));

      await _ensureLibs();
      const PDFLib = (typeof window !== 'undefined' && window.PDFLib) || globalThis.PDFLib;
      const pdfjsLib = (typeof window !== 'undefined' && window.pdfjsLib) || globalThis.pdfjsLib;

      if (!PDFLib) {
        alert('Biblioteca PDFLib não carregada.');
        _setViewState('empty');
        return;
      }

      const password = passwordInput.value.trim();

      try {
        let pdfDoc = null;
        let unlockedBytes = null;
        const copyBuf = _currentArrayBuffer.slice(0);

        if (_requiresPassword) {
          // Descriptografa com a senha fornecida via PDF.js e reconstrói via PDFLib
          _updateProgress(15, 'Verificando senha criptográfica...', 'Autenticando credenciais no stream...', 'Validando');
          await new Promise(r => setTimeout(r, 20));

          const loadingTask = pdfjsLib.getDocument({ data: copyBuf, password });
          const jsDoc = await loadingTask.promise;
          const numPages = jsDoc.numPages;

          pdfDoc = await PDFLib.PDFDocument.create();

          for (let i = 1; i <= numPages; i++) {
            const currentPct = Math.round(15 + (((i - 1) / numPages) * 75));
            _updateProgress(
              currentPct,
              `Descriptografando página ${i} de ${numPages}...`,
              'Removendo senhas e decodificando fluxos criptografados...',
              `${i} / ${numPages} págs`
            );
            await new Promise(r => setTimeout(r, 15));

            const page = await jsDoc.getPage(i);
            const viewport = page.getViewport({ scale: 1.5 });
            const canvas = document.createElement('canvas');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            const ctx = canvas.getContext('2d');
            await page.render({ canvasContext: ctx, viewport }).promise;

            const imgDataUrl = canvas.toDataURL('image/jpeg', 0.92);
            const imgBytes = _dataUrlToBytes(imgDataUrl);
            const embeddedImg = await pdfDoc.embedJpg(imgBytes);

            const newPage = pdfDoc.addPage([viewport.width, viewport.height]);
            newPage.drawImage(embeddedImg, {
              x: 0,
              y: 0,
              width: viewport.width,
              height: viewport.height
            });
          }
          _updateProgress(94, 'Finalizando PDF descriptografado...', 'Consolidando páginas e removendo flags de bloqueio...', `${numPages} / ${numPages} págs`);
          await new Promise(r => setTimeout(r, 20));
          unlockedBytes = await pdfDoc.save();
        } else {
          // Tenta desbloqueio direto de restrições
          _updateProgress(25, 'Inspecionando permissões...', 'Analisando dicionário de segurança (/Encrypt)...', '1 / 3 etapas');
          await new Promise(r => setTimeout(r, 20));

          try {
            _updateProgress(55, 'Removendo restrições de permissão...', 'Limpando flags de edição, cópia e impressão...', '2 / 3 etapas');
            await new Promise(r => setTimeout(r, 20));

            pdfDoc = await PDFLib.PDFDocument.load(copyBuf, { ignoreEncryption: true });

            _updateProgress(88, 'Reconstruindo documento sem travas...', 'Salvando árvore de objetos PDF limpa...', '3 / 3 etapas');
            await new Promise(r => setTimeout(r, 20));

            unlockedBytes = await pdfDoc.save();
          } catch (errIgnore) {
            // Fallback: se pdf-lib não conseguir salvar por causa de criptografia nos fluxos internos, usa PDF.js
            if (pdfjsLib) {
              _updateProgress(35, 'Usando decodificador raster...', 'Extraindo páginas com permissão de leitura...', 'Modo seguro');
              await new Promise(r => setTimeout(r, 20));

              const loadingTask = pdfjsLib.getDocument({ data: copyBuf });
              const jsDoc = await loadingTask.promise;
              const numPages = jsDoc.numPages;

              pdfDoc = await PDFLib.PDFDocument.create();

              for (let i = 1; i <= numPages; i++) {
                const currentPct = Math.round(35 + (((i - 1) / numPages) * 55));
                _updateProgress(
                  currentPct,
                  `Processando página ${i} de ${numPages}...`,
                  'Reconstruindo página sem restrições...',
                  `${i} / ${numPages} págs`
                );
                await new Promise(r => setTimeout(r, 15));

                const page = await jsDoc.getPage(i);
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = document.createElement('canvas');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                const ctx = canvas.getContext('2d');
                await page.render({ canvasContext: ctx, viewport }).promise;

                const imgDataUrl = canvas.toDataURL('image/jpeg', 0.92);
                const imgBytes = _dataUrlToBytes(imgDataUrl);
                const embeddedImg = await pdfDoc.embedJpg(imgBytes);

                const newPage = pdfDoc.addPage([viewport.width, viewport.height]);
                newPage.drawImage(embeddedImg, {
                  x: 0,
                  y: 0,
                  width: viewport.width,
                  height: viewport.height
                });
              }
              _updateProgress(94, 'Finalizando PDF desprotegido...', 'Gravando novo arquivo sem restrições...', `${numPages} / ${numPages} págs`);
              await new Promise(r => setTimeout(r, 20));
              unlockedBytes = await pdfDoc.save();
            } else {
              throw errIgnore;
            }
          }
        }

        _updateProgress(100, 'PDF Desbloqueado com Sucesso!', 'Preparando visualização...', '100%');
        await new Promise(r => setTimeout(r, 20));

        _unlockedPdfBlob = new Blob([unlockedBytes], { type: 'application/pdf' });

        metaPages.textContent = pdfDoc.getPageCount ? pdfDoc.getPageCount() : '1+';
        metaSize.textContent = _formatBytes(_unlockedPdfBlob.size);

        // Renderiza thumbnail da primeira página no canvas
        if (pdfjsLib) {
          try {
            const previewTask = pdfjsLib.getDocument({ data: unlockedBytes.slice(0) });
            const previewDoc = await previewTask.promise;
            const firstPage = await previewDoc.getPage(1);
            const stageViewport = firstPage.getViewport({ scale: 1 });
            const scale = Math.min(260 / stageViewport.width, 240 / stageViewport.height);
            const scaledViewport = firstPage.getViewport({ scale: Math.max(scale, 0.4) });

            previewCanvas.width = scaledViewport.width;
            previewCanvas.height = scaledViewport.height;
            const ctx = previewCanvas.getContext('2d');
            await firstPage.render({ canvasContext: ctx, viewport: scaledViewport }).promise;
          } catch (e) {
            console.warn('Miniatura preview não disponível:', e);
          }
        }

        _setViewState('result');

      } catch (err) {
        console.error('Falha ao desbloquear PDF:', err);
        _setViewState('empty');
        alert('Senha incorreta ou PDF com proteção não suportada pelo navegador.');
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
      if (file) _inspectPdf(file);
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
        _inspectPdf(file);
      }
    });

    _on(removeBtn, 'click', (e) => {
      e.stopPropagation();
      _reset();
    });

    _on(togglePwdBtn, 'click', () => {
      passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    });

    _on(unlockBtn, 'click', _doUnlock);

    _on(downloadBtn, 'click', () => {
      if (!_unlockedPdfBlob) return;
      const originalName = _currentFile ? _currentFile.name.replace(/\.pdf$/i, '') : 'documento';
      const outName = `${originalName}_desbloqueado.pdf`;

      const url = URL.createObjectURL(_unlockedPdfBlob);
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
    _unlockedPdfBlob = null;
  }
};
