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
  if (typeof window === 'undefined' || !window.createQpdfModule) {
    promises.push(loadScript('js/lib/qpdf.js').catch(e => console.warn('qpdf load:', e)));
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
    const copyTextBtn     = container.querySelector('#u-copy-text-btn');
    const copyBtnText     = container.querySelector('#u-copy-btn-text');

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
      _updateProgress(10, 'Iniciando desbloqueio criptográfico...', 'Carregando motor nativo WebAssembly...', 'Etapa 1 / 3');
      await new Promise(r => setTimeout(r, 20));

      await _ensureLibs();
      const PDFLib = (typeof window !== 'undefined' && window.PDFLib) || globalThis.PDFLib;
      const pdfjsLib = (typeof window !== 'undefined' && window.pdfjsLib) || globalThis.pdfjsLib;
      const createQpdf = (typeof window !== 'undefined' && window.createQpdfModule) || globalThis.createQpdfModule;

      const password = passwordInput.value.trim();

      try {
        let unlockedBytes = null;
        let pageCount = 1;
        const copyBuf = _currentArrayBuffer.slice(0);

        // 1. Motor Primário: QPDF WebAssembly (100% nativo, sem perda de texto vetorial, idêntico a iLovePDF)
        if (createQpdf) {
          _updateProgress(35, 'Descriptografando fluxos e permissões...', 'Removendo travas de cópia, seleção e impressão (QPDF C++/Wasm)...', 'Etapa 2 / 3');
          await new Promise(r => setTimeout(r, 25));

          const qpdf = await createQpdf({
            locateFile: (file) => {
              if (file.endsWith('.wasm')) return 'js/lib/qpdf.wasm';
              return 'js/lib/' + file;
            }
          });

          const inPath = '/input.pdf';
          const outPath = '/output.pdf';
          qpdf.FS.writeFile(inPath, new Uint8Array(copyBuf));

          const args = [];
          if (password && password.length > 0) {
            args.push(`--password=${password}`);
          } else {
            args.push('--password=');
          }
          args.push(inPath, '--decrypt', outPath);

          let stderr = '';
          qpdf.printErr = (t) => { stderr += t + '\n'; };

          const exitCode = qpdf.callMain(args);
          if (exitCode === 0) {
            unlockedBytes = qpdf.FS.readFile(outPath);
            try { qpdf.FS.unlink(inPath); } catch (_) {}
            try { qpdf.FS.unlink(outPath); } catch (_) {}
          } else {
            try { qpdf.FS.unlink(inPath); } catch (_) {}
            try { qpdf.FS.unlink(outPath); } catch (_) {}
            if (exitCode === 2 || stderr.toLowerCase().includes('invalid password') || stderr.toLowerCase().includes('password')) {
              _requiresPassword = true;
              passwordGroup.style.display = 'flex';
              passwordInput.focus();
              throw new Error('PASSWORD_REQUIRED');
            }
            console.warn('QPDF falhou com código', exitCode, stderr);
          }
        }

        // 2. Fallback via PDF-Lib direto se QPDF não estiver disponível
        if (!unlockedBytes && PDFLib) {
          _updateProgress(55, 'Processando via PDF-Lib...', 'Reconstruindo árvore de objetos sem flags de proteção...', 'Etapa 2 / 3');
          await new Promise(r => setTimeout(r, 20));
          try {
            const srcDoc = await PDFLib.PDFDocument.load(copyBuf, { ignoreEncryption: true });
            unlockedBytes = await srcDoc.save();
          } catch (eLib) {
            console.warn('PDF-Lib direto falhou:', eLib);
          }
        }

        if (!unlockedBytes) {
          throw new Error('Falha ao descriptografar documento.');
        }

        _updateProgress(85, 'Validando documento...', 'Confirmando texto selecionável e páginas...', 'Etapa 3 / 3');
        await new Promise(r => setTimeout(r, 20));

        if (PDFLib) {
          try {
            const checkDoc = await PDFLib.PDFDocument.load(unlockedBytes);
            pageCount = checkDoc.getPageCount();
          } catch (_) {}
        }

        _updateProgress(100, 'PDF Desbloqueado com Sucesso!', 'Permissões e texto selecionável liberados.', '100%');
        await new Promise(r => setTimeout(r, 20));

        _unlockedPdfBlob = new Blob([unlockedBytes], { type: 'application/pdf' });

        metaPages.textContent = pageCount;
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
        if (err.message === 'PASSWORD_REQUIRED') {
          alert('Este documento exige senha de abertura válida. Por favor, insira a senha no campo correspondente.');
        } else {
          alert('Erro ao desbloquear o PDF. Verifique se o arquivo está corrompido ou se a senha está correta.');
        }
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

    _on(copyTextBtn, 'click', async () => {
      if (!_unlockedPdfBlob || !pdfjsLib) return;
      const originalText = copyBtnText ? copyBtnText.textContent : 'Copiar Texto';
      try {
        if (copyBtnText) copyBtnText.textContent = 'Copiando...';
        const arr = await _unlockedPdfBlob.arrayBuffer();
        const doc = await pdfjsLib.getDocument({ data: new Uint8Array(arr) }).promise;
        let allText = '';
        for (let i = 1; i <= doc.numPages; i++) {
          const page = await doc.getPage(i);
          const content = await page.getTextContent();
          const pageStr = content.items.map(it => it.str).join(' ');
          allText += `--- Página ${i} ---\n${pageStr}\n\n`;
        }
        await navigator.clipboard.writeText(allText.trim());
        if (copyBtnText) copyBtnText.textContent = 'Copiado!';
        setTimeout(() => {
          if (copyBtnText) copyBtnText.textContent = originalText;
        }, 2000);
      } catch (err) {
        console.error('Erro ao copiar texto:', err);
        if (copyBtnText) copyBtnText.textContent = originalText;
        alert('Falha ao extrair texto para a área de transferência.');
      }
    });

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
