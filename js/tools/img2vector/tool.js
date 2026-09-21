/**
 * Open Tool — Ferramenta: Image to Vector (img2vector)
 * Vetorização de imagens rasterizadas para SVG (100% Client-Side).
 * Inspirado nos algoritmos do ut-vector e ImageTracer.
 * @version v.2.2.0
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
let _bgRemovalActive = false;
let _cutoutDataUrl = null;
let _tolTimeout = null;

function _on(element, event, handler) {
  if (!element) return;
  element.addEventListener(event, handler);
  _listeners.push({ element, event, handler });
}

/**
 * Remoção inteligente de fundo via flood-fill perimétrico com BFS.
 * Identifica o plano de fundo externo contíguo a partir das 4 bordas,
 * preservando elementos internos brancos/claros (como olhos, textos ou miolo de logos)
 * e marcando o fundo com alpha = 0 (transparência total).
 */
function removeBackgroundIntelligent(imgData, tolerance = 32) {
  const width = imgData.width;
  const height = imgData.height;
  const data = imgData.data;
  const totalPixels = width * height;
  const visited = new Uint8Array(totalPixels);
  const queue = new Int32Array(totalPixels);
  let qHead = 0;
  let qTail = 0;

  // 1. Amostragem representativa das bordas
  const edgeSamples = [];
  const stepX = Math.max(1, Math.floor(width / 24));
  const stepY = Math.max(1, Math.floor(height / 24));

  for (let x = 0; x < width; x += stepX) {
    const top = x * 4;
    const bot = ((height - 1) * width + x) * 4;
    if (data[top + 3] > 0) edgeSamples.push([data[top], data[top + 1], data[top + 2]]);
    if (data[bot + 3] > 0) edgeSamples.push([data[bot], data[bot + 1], data[bot + 2]]);
  }
  for (let y = 0; y < height; y += stepY) {
    const left = (y * width) * 4;
    const right = (y * width + (width - 1)) * 4;
    if (data[left + 3] > 0) edgeSamples.push([data[left], data[left + 1], data[left + 2]]);
    if (data[right + 3] > 0) edgeSamples.push([data[right], data[right + 1], data[right + 2]]);
  }

  if (edgeSamples.length === 0) {
    return imgData; // Imagem já transparente
  }

  // Média ponderada da borda
  let rSum = 0, gSum = 0, bSum = 0;
  for (let i = 0; i < edgeSamples.length; i++) {
    rSum += edgeSamples[i][0];
    gSum += edgeSamples[i][1];
    bSum += edgeSamples[i][2];
  }
  const bgR = Math.round(rSum / edgeSamples.length);
  const bgG = Math.round(gSum / edgeSamples.length);
  const bgB = Math.round(bSum / edgeSamples.length);

  // Amostras dos 4 cantos para gradientes suaves de fundo
  const corners = [
    [data[0], data[1], data[2]],
    [data[(width - 1) * 4], data[(width - 1) * 4 + 1], data[(width - 1) * 4 + 2]],
    [data[((height - 1) * width) * 4], data[((height - 1) * width) * 4 + 1], data[((height - 1) * width) * 4 + 2]],
    [data[((height - 1) * width + width - 1) * 4], data[((height - 1) * width + width - 1) * 4 + 1], data[((height - 1) * width + width - 1) * 4 + 2]]
  ];

  function isBgColor(idx) {
    if (data[idx + 3] === 0) return true;

    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];

    const dr = r - bgR;
    const dg = g - bgG;
    const db = b - bgB;
    if (Math.sqrt(dr * dr + dg * dg + db * db) <= tolerance) {
      return true;
    }

    for (let c = 0; c < corners.length; c++) {
      const cr = r - corners[c][0];
      const cg = g - corners[c][1];
      const cb = b - corners[c][2];
      if (Math.sqrt(cr * cr + cg * cg + cb * cb) <= tolerance * 0.85) {
        return true;
      }
    }
    return false;
  }

  // 2. Semear pixels externos que coincidem com a cor de fundo
  for (let x = 0; x < width; x++) {
    const topIdx = x;
    if (!visited[topIdx] && isBgColor(topIdx * 4)) {
      visited[topIdx] = 1;
      queue[qTail++] = topIdx;
    }
    const botIdx = (height - 1) * width + x;
    if (!visited[botIdx] && isBgColor(botIdx * 4)) {
      visited[botIdx] = 1;
      queue[qTail++] = botIdx;
    }
  }

  for (let y = 0; y < height; y++) {
    const leftIdx = y * width;
    if (!visited[leftIdx] && isBgColor(leftIdx * 4)) {
      visited[leftIdx] = 1;
      queue[qTail++] = leftIdx;
    }
    const rightIdx = y * width + (width - 1);
    if (!visited[rightIdx] && isBgColor(rightIdx * 4)) {
      visited[rightIdx] = 1;
      queue[qTail++] = rightIdx;
    }
  }

  // 3. Flood-fill BFS contíguo para o interior do plano de fundo
  while (qHead < qTail) {
    const p = queue[qHead++];
    const px = p % width;
    const py = (p / width) | 0;

    if (px > 0) {
      const np = p - 1;
      if (!visited[np] && isBgColor(np * 4)) {
        visited[np] = 1;
        queue[qTail++] = np;
      }
    }
    if (px < width - 1) {
      const np = p + 1;
      if (!visited[np] && isBgColor(np * 4)) {
        visited[np] = 1;
        queue[qTail++] = np;
      }
    }
    if (py > 0) {
      const np = p - width;
      if (!visited[np] && isBgColor(np * 4)) {
        visited[np] = 1;
        queue[qTail++] = np;
      }
    }
    if (py < height - 1) {
      const np = p + width;
      if (!visited[np] && isBgColor(np * 4)) {
        visited[np] = 1;
        queue[qTail++] = np;
      }
    }
  }

  // 4. Transformar todos os pixels do fundo contíguo em transparentes
  for (let i = 0; i < totalPixels; i++) {
    if (visited[i] === 1) {
      data[i * 4 + 3] = 0;
    }
  }

  return imgData;
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
    _bgRemovalActive = false;
    _cutoutDataUrl = null;
    _tolTimeout = null;

    // Garante que a biblioteca ImageTracer está carregada
    if (typeof window !== 'undefined' && !window.ImageTracer) {
      try {
        await loadScript(IMAGETRACER_LIB_URL);
      } catch (err) {
        console.warn('[img2vector] Falha ao carregar imagetracer:', err);
      }
    }

    // Elementos DOM
    const dropzone        = container.querySelector('#v-dropzone');
    const fileInput       = container.querySelector('#v-file-input');
    const dropPrompt      = container.querySelector('#v-dropzone-prompt');
    const loadedBox       = container.querySelector('#v-image-loaded');
    const previewImg      = container.querySelector('#v-preview-img');
    const filenameEl      = container.querySelector('#v-filename');
    const filesizeEl      = container.querySelector('#v-filesize');
    const removeBtn       = container.querySelector('#v-remove-btn');
    const convertBtn      = container.querySelector('#v-convert-btn');
    const presetGrid      = container.querySelector('#v-preset-grid');

    const removeBgBtn     = container.querySelector('#v-remove-bg-btn');
    const removeBgBtnText = container.querySelector('#v-remove-bg-btn-text');
    const bgBadge         = container.querySelector('#v-bg-badge');
    const bgTolRange      = container.querySelector('#v-bgtol-range');
    const bgTolVal        = container.querySelector('#v-bgtol-val');

    const colorsRange     = container.querySelector('#v-colors-range');
    const colorsVal       = container.querySelector('#v-colors-val');
    const blurRange       = container.querySelector('#v-blur-range');
    const blurVal         = container.querySelector('#v-blur-val');
    const omitRange       = container.querySelector('#v-omit-range');
    const omitVal         = container.querySelector('#v-omit-val');

    const emptyView       = container.querySelector('#v-empty-view');
    const loadingView     = container.querySelector('#v-loading-view');
    const resultView      = container.querySelector('#v-result-view');
    const stageContent    = container.querySelector('#v-stage-content');
    const svgOutput       = container.querySelector('#v-svg-output');
    const origOutput      = container.querySelector('#v-orig-output');

    const loadingTitle    = container.querySelector('#v-loading-title');
    const progressPct     = container.querySelector('#v-progress-pct');
    const progressFill    = container.querySelector('#v-progress-fill');
    const loadingDesc     = container.querySelector('#v-loading-desc');
    const progressCounter = container.querySelector('#v-progress-counter');

    function _updateProgress(pct, title, desc, counter) {
      if (progressPct) progressPct.textContent = `${pct}%`;
      if (progressFill) progressFill.style.width = `${pct}%`;
      if (title && loadingTitle) loadingTitle.textContent = title;
      if (desc && loadingDesc) loadingDesc.textContent = desc;
      if (counter && progressCounter) progressCounter.textContent = counter;
    }

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
      _bgRemovalActive = false;
      _cutoutDataUrl = null;

      if (_currentImageSrc) {
        URL.revokeObjectURL(_currentImageSrc);
      }
      _currentImageSrc = URL.createObjectURL(file);

      previewImg.src = _currentImageSrc;
      origOutput.src = _currentImageSrc;
      filenameEl.textContent = file.name;
      filesizeEl.textContent = _formatBytes(file.size);

      removeBgBtn.disabled = false;
      removeBgBtn.classList.remove('v-bg-btn--active');
      removeBgBtnText.textContent = 'Remover Fundo';
      bgBadge.textContent = 'Desativado';
      bgBadge.classList.remove('v-bg-badge--active');

      dropPrompt.style.display = 'none';
      loadedBox.style.display = 'flex';
      convertBtn.disabled = false;
    }

    function _resetFile() {
      _currentFile = null;
      _bgRemovalActive = false;
      _cutoutDataUrl = null;

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

      removeBgBtn.disabled = true;
      removeBgBtn.classList.remove('v-bg-btn--active');
      removeBgBtnText.textContent = 'Remover Fundo';
      bgBadge.textContent = 'Desativado';
      bgBadge.classList.remove('v-bg-badge--active');

      _setViewState('empty');
      _currentSvgString = null;
    }

    function _updateCutoutPreviews() {
      if (!_currentImageSrc) return;
      const tol = parseInt(bgTolRange.value, 10) || 32;
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        let w = img.naturalWidth || img.width;
        let h = img.naturalHeight || img.height;
        const maxDim = 800;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        const c = document.createElement('canvas');
        c.width = w;
        c.height = h;
        const cx = c.getContext('2d');
        cx.drawImage(img, 0, 0, w, h);
        let imgData = cx.getImageData(0, 0, w, h);
        imgData = removeBackgroundIntelligent(imgData, tol);
        cx.putImageData(imgData, 0, 0);

        _cutoutDataUrl = c.toDataURL('image/png');
        previewImg.src = _cutoutDataUrl;
        origOutput.src = _cutoutDataUrl;
      };
      img.src = _currentImageSrc;
    }

    function _toggleBgRemoval() {
      if (!_currentFile && !_currentImageSrc) return;

      _bgRemovalActive = !_bgRemovalActive;

      if (_bgRemovalActive) {
        bgBadge.textContent = '✓ Fundo Removido';
        bgBadge.classList.add('v-bg-badge--active');
        removeBgBtn.classList.add('v-bg-btn--active');
        removeBgBtnText.textContent = 'Restaurar Fundo';
        _updateCutoutPreviews();
        if (_currentSvgString) {
          _vectorize();
        }
      } else {
        bgBadge.textContent = 'Desativado';
        bgBadge.classList.remove('v-bg-badge--active');
        removeBgBtn.classList.remove('v-bg-btn--active');
        removeBgBtnText.textContent = 'Remover Fundo';
        _cutoutDataUrl = null;
        previewImg.src = _currentImageSrc;
        origOutput.src = _currentImageSrc;
        if (_currentSvgString) {
          _vectorize();
        }
      }
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
      _updateProgress(15, 'Preparando imagem...', 'Amostrando pixels e normalizando dimensões...', 'Etapa 1 / 4');
      await new Promise(r => setTimeout(r, 25));

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

      img.onload = async () => {
        try {
          _updateProgress(35, 'Quantizando paleta...', `Agrupando em ${numColors} cores indexadas...`, 'Etapa 2 / 4');
          await new Promise(r => setTimeout(r, 20));

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

          let imgData = ctx.getImageData(0, 0, targetW, targetH);

          // Se a remoção inteligente de fundo estiver ativa, torna o fundo transparente
          if (_bgRemovalActive) {
            _updateProgress(50, 'Isolando plano de fundo...', 'Removendo fundo por inundação inteligente...', 'Etapa 2 / 4');
            await new Promise(r => setTimeout(r, 20));

            const tol = parseInt(bgTolRange.value, 10) || 32;
            imgData = removeBackgroundIntelligent(imgData, tol);
            ctx.putImageData(imgData, 0, 0);
          }

          _updateProgress(70, 'Traçando curvas Bézier...', 'Calculando splines cúbicas e nós vetoriais...', 'Etapa 3 / 4');
          await new Promise(r => setTimeout(r, 20));

          const svgStr = tracer.imagedataToSVG(imgData, options);
          _currentSvgString = svgStr;

          _updateProgress(95, 'Otimizando nós e caminhos...', 'Formatando marcação SVG escalável...', 'Etapa 4 / 4');
          await new Promise(r => setTimeout(r, 20));

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

          _updateProgress(100, 'Vetorização Concluída!', 'Renderizando SVG...', 'Pronto');
          await new Promise(r => setTimeout(r, 20));

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

    // Exportação e Limpeza
    const clearBtn = container.querySelector('#v-clear-btn');
    if (clearBtn) _on(clearBtn, 'click', _resetFile);
    _on(downloadSvg, 'click', _downloadSvgFile);
    _on(copySvg, 'click', _copySvgCode);

    // Remoção Inteligente de Fundo
    _on(removeBgBtn, 'click', _toggleBgRemoval);

    _on(bgTolRange, 'input', () => {
      bgTolVal.textContent = bgTolRange.value;
      if (_bgRemovalActive) {
        clearTimeout(_tolTimeout);
        _tolTimeout = setTimeout(() => {
          if (_bgRemovalActive) {
            _updateCutoutPreviews();
            if (_currentSvgString) {
              _vectorize();
            }
          }
        }, 200);
      }
    });

    // Inicialização do estado dos sliders
    _syncPresetControls('bw');
  },

  unmount() {
    if (_tolTimeout) {
      clearTimeout(_tolTimeout);
      _tolTimeout = null;
    }
    _listeners.forEach(({ element, event, handler }) => {
      try { element.removeEventListener(event, handler); } catch (e) { /* ignore */ }
    });
    _listeners = [];
    if (_currentImageSrc) {
      try { URL.revokeObjectURL(_currentImageSrc); } catch (e) { /* ignore */ }
      _currentImageSrc = null;
    }
    _cutoutDataUrl = null;
    _bgRemovalActive = false;
  }
};
