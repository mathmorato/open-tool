/**
 * Open Tool — Ferramenta: Image to Vector (img2vector)
 * Vetorização de imagens rasterizadas para SVG (100% Client-Side).
 * Inspirado nos algoritmos do ut-vector e ImageTracer.
 * @version v.2.1.0
 */

import { getImageToVectorHTML } from './ui.js';
import { loadScript } from '../../config.js';

const IMAGETRACER_LIB_URL = 'js/lib/imagetracer.js';

let _listeners = [];
let _activePreset = 'bw';
let _currentFile = null;
let _currentImageSrc = null;
let _currentSvgString = null;
let _currentZoom = 1;

function _on(element, event, handler) {
  if (!element) return;
  element.addEventListener(event, handler);
  _listeners.push({ element, event, handler });
}

export default {
  id: 'img2vector',
  label: 'Image to Vector',

  render(container) {
    container.innerHTML = getImageToVectorHTML();
  },

  async mount(container) {
    _listeners = [];
    _activePreset = 'bw';
    _currentFile = null;
    _currentImageSrc = null;
    _currentSvgString = null;
    _currentZoom = 1;

    // Garante que a biblioteca ImageTracer está carregada
    if (typeof window !== 'undefined' && !window.ImageTracer) {
      try {
        await loadScript(IMAGETRACER_LIB_URL);
      } catch (err) {
        console.warn('[img2vector] Falha ao carregar imagetracer:', err);
      }
    }

    // Elementos DOM
    const dropzone      = container.querySelector('#v-dropzone');
    const fileInput     = container.querySelector('#v-file-input');
    const dropPrompt    = container.querySelector('#v-dropzone-prompt');
    const loadedBox     = container.querySelector('#v-image-loaded');
    const previewImg    = container.querySelector('#v-preview-img');
    const filenameEl    = container.querySelector('#v-filename');
    const filesizeEl    = container.querySelector('#v-filesize');
    const removeBtn     = container.querySelector('#v-remove-btn');
    const convertBtn    = container.querySelector('#v-convert-btn');
    const presetGrid    = container.querySelector('#v-preset-grid');

    const colorsRange   = container.querySelector('#v-colors-range');
    const colorsVal     = container.querySelector('#v-colors-val');
    const blurRange     = container.querySelector('#v-blur-range');
    const blurVal       = container.querySelector('#v-blur-val');
    const omitRange     = container.querySelector('#v-omit-range');
    const omitVal       = container.querySelector('#v-omit-val');

    const emptyView     = container.querySelector('#v-empty-view');
    const loadingView   = container.querySelector('#v-loading-view');
    const resultView    = container.querySelector('#v-result-view');
    const stageContent  = container.querySelector('#v-stage-content');
    const svgOutput     = container.querySelector('#v-svg-output');
    const origOutput    = container.querySelector('#v-orig-output');

    const metaPaths     = container.querySelector('#v-meta-paths');
    const metaColors    = container.querySelector('#v-meta-colors');
    const metaSize      = container.querySelector('#v-meta-size');

    const downloadSvg   = container.querySelector('#v-download-svg');
    const copySvg       = container.querySelector('#v-copy-svg');
    const copyFeedback  = container.querySelector('#v-copy-feedback');

    const zoomIn        = container.querySelector('#v-zoom-in');
    const zoomOut       = container.querySelector('#v-zoom-out');
    const zoomVal       = container.querySelector('#v-zoom-val');
    const modeBtns      = container.querySelectorAll('.v-mode-btn');

    // ── Predefinições de Configurações ───────────────────────────────────────
    const PRESET_CONFIGS = {
      bw: {
        colors: 2,
        blur: 0,
        omit: 8,
        options: { colorsampling: 2, numberofcolors: 2, colorquantcycles: 2, pathomit: 8, ltres: 1, qtres: 1, strokewidth: 0.5 }
      },
      balanced: {
        colors: 16,
        blur: 0,
        omit: 8,
        options: { colorsampling: 2, numberofcolors: 16, colorquantcycles: 3, pathomit: 8, ltres: 1, qtres: 1, strokewidth: 0.5 }
      },
      detailed: {
        colors: 32,
        blur: 0,
        omit: 6,
        options: { colorsampling: 2, numberofcolors: 32, colorquantcycles: 3, pathomit: 6, ltres: 0.5, qtres: 0.5, roundcoords: 2, strokewidth: 0.5 }
      },
      curvy: {
        colors: 16,
        blur: 2,
        omit: 8,
        options: { colorsampling: 2, ltres: 0.01, linefilter: true, rightangleenhance: false, numberofcolors: 16, blurradius: 2, strokewidth: 0.5 }
      },
      posterized: {
        colors: 6,
        blur: 3,
        omit: 12,
        options: { colorsampling: 2, numberofcolors: 6, blurradius: 3, pathomit: 12, strokewidth: 0 }
      },
      grayscale: {
        colors: 8,
        blur: 0,
        omit: 8,
        options: { colorsampling: 0, colorquantcycles: 1, numberofcolors: 8, pathomit: 8, strokewidth: 0.5 }
      }
    };

    function _syncPresetControls(presetKey) {
      const conf = PRESET_CONFIGS[presetKey];
      if (!conf) return;
      colorsRange.value = conf.colors;
      colorsVal.textContent = conf.colors;
      blurRange.value = conf.blur;
      blurVal.textContent = conf.blur;
      omitRange.value = conf.omit;
      omitVal.textContent = conf.omit;
    }

    // ── Gestão de Arquivo Carregado ──────────────────────────────────────────
    function _handleFile(file) {
      if (!file || !file.type.startsWith('image/')) {
        alert('Por favor selecione um arquivo de imagem válido (PNG, JPG, WEBP, BMP, etc.).');
        return;
      }
      _currentFile = file;

      if (_currentImageSrc) {
        URL.revokeObjectURL(_currentImageSrc);
      }
      _currentImageSrc = URL.createObjectURL(file);

      previewImg.src = _currentImageSrc;
      origOutput.src = _currentImageSrc;
      filenameEl.textContent = file.name;
      filesizeEl.textContent = _formatBytes(file.size);

      dropPrompt.style.display = 'none';
      loadedBox.style.display = 'flex';
      convertBtn.disabled = false;
    }

    function _resetFile() {
      _currentFile = null;
      if (_currentImageSrc) {
        URL.revokeObjectURL(_currentImageSrc);
        _currentImageSrc = null;
      }
      fileInput.value = '';
      previewImg.src = '';
      origOutput.src = '';
      dropPrompt.style.display = 'flex';
      loadedBox.style.display = 'none';
      convertBtn.disabled = true;

      _setViewState('empty');
      _currentSvgString = null;
    }

    function _formatBytes(bytes) {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / 1048576).toFixed(2) + ' MB';
    }

    function _setViewState(state) {
      emptyView.style.display   = state === 'empty'   ? 'flex' : 'none';
      loadingView.style.display = state === 'loading' ? 'flex' : 'none';
      resultView.style.display  = state === 'result'  ? 'flex' : 'none';
    }

    // ── Vetorização do Imagem ────────────────────────────────────────────────
    async function _vectorize() {
      if (!_currentImageSrc) return;

      _setViewState('loading');
      await new Promise(r => setTimeout(r, 20));

      const tracer = (typeof window !== 'undefined' && window.ImageTracer) ? window.ImageTracer : null;
      if (!tracer) {
        alert('Biblioteca de vetorização não inicializada. Tente recarregar a página.');
        _setViewState('empty');
        return;
      }

      const numColors = parseInt(colorsRange.value, 10);
      const blurRad   = parseInt(blurRange.value, 10);
      const omitPx    = parseInt(omitRange.value, 10);

      const baseOpts = (PRESET_CONFIGS[_activePreset] && PRESET_CONFIGS[_activePreset].options) || {};
      const options = Object.assign({}, baseOpts, {
        numberofcolors: numColors,
        blurradius: blurRad,
        pathomit: omitPx,
        viewbox: true,
        scale: 1,
        roundcoords: 1
      });

      // Carrega imagem em elemento Image para extrair ImageData
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        try {
          // Otimiza resolução máxima para processamento fluido no navegador
          let targetW = img.naturalWidth || img.width;
          let targetH = img.naturalHeight || img.height;
          const maxDim = 1200;
          if (targetW > maxDim || targetH > maxDim) {
            if (targetW > targetH) {
              targetH = Math.round((targetH * maxDim) / targetW);
              targetW = maxDim;
            } else {
              targetW = Math.round((targetW * maxDim) / targetH);
              targetH = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = targetW;
          canvas.height = targetH;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, targetW, targetH);

          const imgData = ctx.getImageData(0, 0, targetW, targetH);
          const svgStr = tracer.imagedataToSVG(imgData, options);
          _currentSvgString = svgStr;

          // Injeta SVG e assegura dimensões explícitas no elemento SVG
          svgOutput.innerHTML = svgStr;
          const svgEl = svgOutput.querySelector('svg');
          if (svgEl) {
            svgEl.setAttribute('width', targetW);
            svgEl.setAttribute('height', targetH);
            svgEl.setAttribute('viewBox', `0 0 ${targetW} ${targetH}`);
            svgEl.style.width = '100%';
            svgEl.style.height = '100%';
            svgEl.style.maxWidth = '100%';
            svgEl.style.maxHeight = '380px';
            svgEl.style.display = 'block';
          }

          // Calcula estatísticas
          const pathMatches = svgStr.match(/<path /gi);
          const pathCount = pathMatches ? pathMatches.length : 0;
          const svgBytes = new Blob([svgStr], { type: 'image/svg+xml' }).size;

          metaPaths.textContent = pathCount.toLocaleString('pt-BR');
          metaColors.textContent = numColors;
          metaSize.textContent = _formatBytes(svgBytes);

          _setViewState('result');
          _applyViewMode('vector');
        } catch (err) {
          console.error('[img2vector] Erro ao processar:', err);
          alert('Erro ao vetorizar a imagem: ' + (err.message || err));
          _setViewState('empty');
        }
      };

      img.onerror = () => {
        alert('Falha ao decodificar os pixels da imagem.');
        _setViewState('empty');
      };

      img.src = _currentImageSrc;
    }

    // ── Modos de Visualização & Zoom ─────────────────────────────────────────
    function _applyViewMode(mode) {
      modeBtns.forEach(btn => {
        btn.classList.toggle('v-mode-btn--active', btn.dataset.mode === mode);
      });

      if (mode === 'vector') {
        svgOutput.style.display = 'flex';
        origOutput.style.display = 'none';
        stageContent.style.flexDirection = 'row';
      } else if (mode === 'original') {
        svgOutput.style.display = 'none';
        origOutput.style.display = 'block';
        stageContent.style.flexDirection = 'row';
      } else if (mode === 'side') {
        svgOutput.style.display = 'flex';
        origOutput.style.display = 'block';
        stageContent.style.flexDirection = 'row';
      }
    }

    function _setZoom(val) {
      _currentZoom = Math.min(Math.max(val, 0.4), 3.0);
      stageContent.style.transform = `scale(${_currentZoom})`;
      zoomVal.textContent = `${Math.round(_currentZoom * 100)}%`;
    }

    // ── Exportação ───────────────────────────────────────────────────────────
    function _downloadSvgFile() {
      if (!_currentSvgString) return;
      const blob = new Blob([_currentSvgString], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const baseName = _currentFile ? _currentFile.name.replace(/\.[^/.]+$/, '') : 'vetor';
      a.download = `${baseName}-vector.svg`;
      a.href = url;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    }

    async function _copySvgCode() {
      if (!_currentSvgString) return;
      try {
        await navigator.clipboard.writeText(_currentSvgString);
        _showCopyFeedback('✓ Código SVG copiado para a área de transferência!');
      } catch {
        _showCopyFeedback('⚠ Não foi possível copiar. Baixe o arquivo SVG.');
      }
    }

    function _showCopyFeedback(msg) {
      copyFeedback.textContent = msg;
      copyFeedback.style.display = 'block';
      setTimeout(() => { copyFeedback.style.display = 'none'; }, 3500);
    }

    // ── Listeners ────────────────────────────────────────────────────────────

    // Drag & Drop
    _on(dropzone, 'click', (e) => {
      if (e.target !== removeBtn && !removeBtn.contains(e.target)) {
        fileInput.click();
      }
    });

    _on(fileInput, 'change', () => {
      if (fileInput.files && fileInput.files[0]) {
        _handleFile(fileInput.files[0]);
      }
    });

    _on(dropzone, 'dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('v-drag-over');
    });

    _on(dropzone, 'dragleave', () => {
      dropzone.classList.remove('v-drag-over');
    });

    _on(dropzone, 'drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('v-drag-over');
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
        _handleFile(e.dataTransfer.files[0]);
      }
    });

    // Paste de Imagem na Dropzone ou Container
    _on(container, 'paste', (e) => {
      if (e.clipboardData && e.clipboardData.files && e.clipboardData.files.length > 0) {
        for (const f of e.clipboardData.files) {
          if (f.type.startsWith('image/')) {
            e.preventDefault();
            _handleFile(f);
            break;
          }
        }
      }
    });

    _on(removeBtn, 'click', (e) => {
      e.stopPropagation();
      _resetFile();
    });

    // Presets
    presetGrid.querySelectorAll('.v-preset-btn').forEach(btn => {
      _on(btn, 'click', () => {
        _activePreset = btn.dataset.preset;
        presetGrid.querySelectorAll('.v-preset-btn').forEach(b =>
          b.classList.toggle('v-preset-btn--active', b === btn)
        );
        _syncPresetControls(_activePreset);
      });
    });

    // Sliders
    _on(colorsRange, 'input', () => { colorsVal.textContent = colorsRange.value; });
    _on(blurRange, 'input', () => { blurVal.textContent = blurRange.value; });
    _on(omitRange, 'input', () => { omitVal.textContent = omitRange.value; });

    // Conversão
    _on(convertBtn, 'click', _vectorize);

    // Zoom & Visualização
    modeBtns.forEach(btn => {
      _on(btn, 'click', () => _applyViewMode(btn.dataset.mode));
    });

    _on(zoomIn, 'click', () => _setZoom(_currentZoom + 0.2));
    _on(zoomOut, 'click', () => _setZoom(_currentZoom - 0.2));

    // Exportação
    _on(downloadSvg, 'click', _downloadSvgFile);
    _on(copySvg, 'click', _copySvgCode);

    // Inicialização do estado dos sliders
    _syncPresetControls('bw');
  },

  unmount() {
    _listeners.forEach(({ element, event, handler }) => {
      try { element.removeEventListener(event, handler); } catch (e) { /* ignore */ }
    });
    _listeners = [];
    if (_currentImageSrc) {
      try { URL.revokeObjectURL(_currentImageSrc); } catch (e) { /* ignore */ }
      _currentImageSrc = null;
    }
  }
};
