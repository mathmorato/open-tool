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
let _busy = false;

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
  if (typeof window === 'undefined' || !window.__QPDF_WASM_BYTES__) {
    promises.push(loadScript('js/lib/qpdf-wasm-binary.js').catch(e => console.warn('qpdf-wasm-binary load:', e)));
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
    _busy = false;

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
    const clearInputBtn   = container.querySelector('#u-clear-input-btn');
    const resultClearBtn  = container.querySelector('#u-result-clear-btn');

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
      const pdfjsData = () => new Uint8Array(_currentArrayBuffer.slice(0)); // pdf.js transfere o buffer ao worker
      try {
        _currentFile = file;
        _currentArrayBuffer = await file.arrayBuffer();
      } catch (err) {
        console.error('Falha ao ler o arquivo:', err);
        alert('Não foi possível ler o arquivo selecionado.');
        _reset();
        return;
      }

      // Um novo arquivo invalida qualquer resultado anterior
      _unlockedPdfBlob = null;
      _setViewState('empty');

      filenameEl.textContent = file.name;
      filesizeEl.textContent = _formatBytes(file.size);
      dropPrompt.style.display = 'none';
      fileLoadedBox.style.display = 'flex';
      if (clearInputBtn) clearInputBtn.style.display = 'inline-flex';

      _requiresPassword = false;
      passwordGroup.style.display = 'none';
      passwordInput.value = '';

      const showPasswordRequired = () => {
        _requiresPassword = true;
        lockBadge.textContent = 'Senha de Abertura';
        lockBadge.className = 'pdf-badge pdf-badge--warning';
        statusDesc.textContent = 'Este arquivo exige senha para ser aberto. Insira a senha abaixo para descriptografar.';
        passwordGroup.style.display = 'flex';
        unlockBtn.disabled = false;
        unlockBtnText.textContent = 'Descriptografar com Senha';
        passwordInput.focus();
      };
      const showReady = (badge, badgeClass, desc, btnText) => {
        lockBadge.textContent = badge;
        lockBadge.className = badgeClass;
        statusDesc.textContent = desc;
        unlockBtn.disabled = false;
        unlockBtnText.textContent = btnText;
      };

      try {
        await _ensureLibs();
      } catch (err) {
        console.warn('Bibliotecas PDF indisponíveis:', err);
      }
      const pdfjsLib = (typeof window !== 'undefined' && window.pdfjsLib) || globalThis.pdfjsLib;

      if (!pdfjsLib) {
        showReady('PDF Carregado', 'pdf-badge', 'Pronto para remoção de restrições de impressão e edição.', 'Desbloquear PDF');
        return;
      }

      const loadingTask = pdfjsLib.getDocument({ data: pdfjsData() });
      // Sem senha não há como abrir: encerra a tarefa (rejeita a promise) e pede a senha
      loadingTask.onPassword = () => {
        showPasswordRequired();
        loadingTask.destroy();
      };
      try {
        await loadingTask.promise;
        showReady('Restrição de Permissões', 'pdf-badge pdf-badge--info',
          'Documento protegido contra cópia/edição ou sem restrição de leitura. Pronto para desbloqueio.', 'Desbloquear PDF Agora');
      } catch (err) {
        if (err.name === 'PasswordException' || _requiresPassword) {
          showPasswordRequired();
        } else {
          showReady('PDF Carregado', 'pdf-badge', 'Pronto para remoção de restrições de impressão e edição.', 'Desbloquear PDF');
        }
      } finally {
        loadingTask.destroy();
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
      if (clearInputBtn) clearInputBtn.style.display = 'none';
      unlockBtn.disabled = true;
      unlockBtnText.textContent = 'Desbloquear PDF';

      _setViewState('empty');
    }

    // Processo de Desbloqueio
    async function _doUnlock() {
      if (!_currentArrayBuffer || _busy) return;
      _busy = true;
      unlockBtn.disabled = true;
      const pdfjsData = () => new Uint8Array(_currentArrayBuffer.slice(0)); // pdf.js transfere o buffer ao worker

      _setViewState('loading');
      _updateProgress(10, 'Iniciando desbloqueio criptográfico...', 'Carregando motor nativo WebAssembly...', 'Etapa 1 / 3');
      await new Promise(r => setTimeout(r, 20));

      // Espaços são caracteres válidos de senha; apenas um campo vazio significa "sem senha"
      const password = passwordInput.value;
      let passwordRejected = false;

      try {
        await _ensureLibs();
        const PDFLib = (typeof window !== 'undefined' && window.PDFLib) || globalThis.PDFLib;
        const pdfjsLib = (typeof window !== 'undefined' && window.pdfjsLib) || globalThis.pdfjsLib;
        const createQpdf = (typeof window !== 'undefined' && window.createQpdfModule) || globalThis.createQpdfModule;

        let unlockedBytes = null;
        let pageCount = 1;

        // 1. Motor Primário: QPDF WebAssembly (100% nativo C++, preserva texto vetorial e OCR perfeitamente)
        if (createQpdf) {
          _updateProgress(35, 'Descriptografando fluxos e permissões...', 'Removendo travas de cópia, seleção e impressão (QPDF C++/Wasm)...', 'Etapa 2 / 3');
          await new Promise(r => setTimeout(r, 25));

          try {
            const wasmBytes = (typeof window !== 'undefined' && window.__QPDF_WASM_BYTES__) || (typeof globalThis !== 'undefined' && globalThis.__QPDF_WASM_BYTES__) || undefined;
            const qpdf = await createQpdf({
              wasmBinary: wasmBytes,
              locateFile: (file) => (file.endsWith('.wasm') ? 'js/lib/qpdf.wasm' : 'js/lib/' + file)
            });

            const inPath = '/input.pdf';
            const outPath = '/output.pdf';
            const pwdArg = `--password=${password}`;
            qpdf.FS.writeFile(inPath, new Uint8Array(_currentArrayBuffer));

            // Código de saída: 0 = ok, 3 = ok com avisos, 2 = erro (inclui senha ausente/incorreta)
            let rc = 2;
            try {
              rc = qpdf.callMain(['--warning-exit-0', pwdArg, inPath, '--decrypt', outPath]);
            } catch (cErr) {
              console.warn('QPDF callMain:', cErr);
            }
            if (rc === 0 || rc === 3) {
              try {
                const cand = qpdf.FS.readFile(outPath);
                if (cand && cand.length > 100) unlockedBytes = cand;
              } catch (_) {}
            }

            // Limpeza de buffers temporários no FS virtual
            try { qpdf.FS.unlink(inPath); } catch (_) {}
            try { qpdf.FS.unlink(outPath); } catch (_) {}
          } catch (qErr) {
            const qMsg = (qErr && qErr.message) || String(qErr);
            if (qMsg.includes('memory') || qMsg.includes('alloc') || qMsg.includes('Cannot enlarge')) {
              throw new Error('OUT_OF_MEMORY');
            }
            console.warn('Motor QPDF falhou, tentando fallback:', qErr);
          }
        }

        // 2. Fallback via PDF-Lib direto (sem perda de qualidade) — só vale para PDFs sem criptografia,
        //    pois com ignoreEncryption o PDF-Lib regravaria os fluxos ainda cifrados
        if (!unlockedBytes && PDFLib && _currentArrayBuffer.byteLength < 120 * 1024 * 1024) {
          _updateProgress(55, 'Processando via PDF-Lib...', 'Reconstruindo árvore de objetos sem flags de proteção...', 'Etapa 2 / 3');
          await new Promise(r => setTimeout(r, 20));
          try {
            const srcDoc = await PDFLib.PDFDocument.load(new Uint8Array(_currentArrayBuffer), { ignoreEncryption: true });
            if (!srcDoc.isEncrypted) {
              unlockedBytes = await srcDoc.save();
            } else if (createQpdf && _requiresPassword) {
              // O QPDF descriptografa qualquer PDF que abra; se falhou num arquivo com senha de
              // abertura, a senha está ausente ou incorreta
              passwordRejected = true;
            }
          } catch (eLib) {
            console.warn('PDF-Lib direto falhou:', eLib);
          }
        }

        if (passwordRejected) throw new Error('PASSWORD_REQUIRED');

        // 3. Fallback Gráfico via PDF.js (para arquivos pequenos < 30 MB com restrição de permissão)
        if (!unlockedBytes && pdfjsLib && PDFLib && _currentArrayBuffer.byteLength < 30 * 1024 * 1024) {
          _updateProgress(65, 'Liberando permissões via motor gráfico...', 'Reconstruindo páginas para documento 100% desbloqueado...', 'Etapa 2 / 3');
          await new Promise(r => setTimeout(r, 20));
          const loadingTask = pdfjsLib.getDocument({ data: pdfjsData(), password: password || undefined });
          loadingTask.onPassword = () => { passwordRejected = true; loadingTask.destroy(); };
          try {
            const jsDoc = await loadingTask.promise;
            pageCount = jsDoc.numPages;

            if (pageCount <= 30) {
              const newDoc = await PDFLib.PDFDocument.create();
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d', { alpha: false });

              for (let p = 1; p <= pageCount; p++) {
                const page = await jsDoc.getPage(p);
                const pageVp = page.getViewport({ scale: 1 });   // dimensões reais da página (pt)
                const renderVp = page.getViewport({ scale: 1.5 }); // resolução da rasterização
                canvas.width = renderVp.width;
                canvas.height = renderVp.height;
                await page.render({ canvasContext: ctx, viewport: renderVp }).promise;

                const imgBytes = _dataUrlToBytes(canvas.toDataURL('image/jpeg', 0.88));
                const embedded = await newDoc.embedJpg(imgBytes);

                const newPage = newDoc.addPage([pageVp.width, pageVp.height]);
                newPage.drawImage(embedded, { x: 0, y: 0, width: pageVp.width, height: pageVp.height });
              }

              unlockedBytes = await newDoc.save();
            }
          } catch (eFallback) {
            console.warn('Fallback gráfico falhou:', eFallback);
          } finally {
            loadingTask.destroy();
          }
        }

        if (!unlockedBytes) {
          if (passwordRejected || _requiresPassword) throw new Error('PASSWORD_REQUIRED');
          throw new Error('Falha ao descriptografar documento.');
        }

        _updateProgress(85, 'Validando documento...', 'Confirmando texto selecionável e páginas...', 'Etapa 3 / 3');
        await new Promise(r => setTimeout(r, 20));

        // Obter contagem de páginas levemente
        if (PDFLib && unlockedBytes.byteLength < 100 * 1024 * 1024) {
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

        // Renderiza thumbnail da primeira página no canvas via PDF.js
        if (pdfjsLib) {
          const previewTask = pdfjsLib.getDocument({ data: unlockedBytes.slice(0) });
          try {
            const previewDoc = await previewTask.promise;
            pageCount = previewDoc.numPages || pageCount;
            metaPages.textContent = pageCount;

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
          } finally {
            previewTask.destroy();
          }
        }

        _setViewState('result');

      } catch (err) {
        _setViewState('empty');
        if (err.message === 'PASSWORD_REQUIRED') {
          console.warn('Desbloqueio: senha de abertura ausente ou incorreta.');
          _requiresPassword = true;
          passwordGroup.style.display = 'flex';
          unlockBtnText.textContent = 'Descriptografar com Senha';
          passwordInput.focus();
          alert(password
            ? 'Senha incorreta. Verifique a senha de abertura do documento e tente novamente.'
            : 'Este documento exige senha de abertura. Por favor, insira a senha no campo correspondente.');
        } else if (err.message === 'OUT_OF_MEMORY' || (err.message && err.message.toLowerCase().includes('memory')) || err.name === 'RangeError') {
          console.error('Falha ao desbloquear PDF:', err);
          const sizeStr = _currentFile ? _formatBytes(_currentFile.size) : '';
          alert(`Memória do navegador insuficiente para processar este PDF de ${sizeStr}. Recomendamos fechar outras abas para liberar memória.`);
        } else {
          console.error('Falha ao desbloquear PDF:', err);
          alert('Erro ao desbloquear o PDF. Verifique se o arquivo está corrompido ou se a senha está correta.');
        }
      } finally {
        _busy = false;
        unlockBtn.disabled = !_currentArrayBuffer;
      }
    }

    // Eventos
    _on(dropzone, 'click', (e) => {
      if (!_currentFile) {
        fileInput.click();
      }
    });

    _on(dropzone, 'keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (!_currentFile) fileInput.click();
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

    _on(togglePwdBtn, 'click', () => {
      passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    });

    _on(unlockBtn, 'click', _doUnlock);

    _on(copyTextBtn, 'click', async () => {
      const pdfjsLib = (typeof window !== 'undefined' && window.pdfjsLib) || globalThis.pdfjsLib;
      if (!_unlockedPdfBlob || !pdfjsLib) return;
      const originalText = copyBtnText ? copyBtnText.textContent : 'Copiar Texto';
      let task = null;
      try {
        if (copyBtnText) copyBtnText.textContent = 'Copiando...';
        const arr = await _unlockedPdfBlob.arrayBuffer();
        task = pdfjsLib.getDocument({ data: new Uint8Array(arr) });
        const doc = await task.promise;
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
      } finally {
        if (task) task.destroy();
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

    _on(clearInputBtn, 'click', _reset);
    _on(resultClearBtn, 'click', _reset);

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
