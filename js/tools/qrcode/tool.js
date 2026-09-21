/**
 * Open Tool — Ferramenta: QR Code
 * Gerador de QR Codes 100% client-side.
 * Utiliza a biblioteca QRCode.js via CDN (carregamento lazy).
 * @version v.2.0.0
 */

import { getQRCodeHTML } from './ui.js';
import { loadScript } from '../../config.js';

// CDN da biblioteca QRCode.js (leve, sem dependências)
const QRCODE_LIB_URL = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';

// Mapeamento de nível de correção de erro para descrição
const ECL_DESCRIPTIONS = {
  L: 'L — 7% de recuperação (menor densidade)',
  M: 'M — 15% de recuperação (padrão)',
  Q: 'Q — 25% de recuperação (alta)',
  H: 'H — 30% de recuperação (máximo)'
};

// Estado interno da ferramenta
let _qrInstance = null;
let _activeEcl = 'M';
let _listeners = []; // array de { el, type, fn } para cleanup

/**
 * Registra um event listener e armazena para cleanup.
 */
function _on(el, type, fn) {
  if (!el) return;
  el.addEventListener(type, fn);
  _listeners.push({ el, type, fn });
}

const tool = {
  id: 'qrcode',
  label: 'QR Code',

  render(container) {
    container.innerHTML = getQRCodeHTML();
  },

  async mount(container) {
    _listeners = [];
    _qrInstance = null;
    _activeEcl = 'M';

    // Carrega a biblioteca QRCode.js de forma lazy
    await loadScript(QRCODE_LIB_URL);

    // Referências aos elementos do DOM
    const inputEl       = container.querySelector('#qr-input');
    const charCountEl   = container.querySelector('#qr-char-count');
    const urlFeedback   = container.querySelector('#qr-url-feedback');
    const sizeRangeEl   = container.querySelector('#qr-size');
    const sizeDisplayEl = container.querySelector('#qr-size-display');
    const eclGroup      = container.querySelector('#qr-ecl');
    const eclHint       = container.querySelector('#qr-ecl-hint');
    const colorFgEl     = container.querySelector('#qr-color-fg');
    const colorFgHexEl  = container.querySelector('#qr-color-fg-hex');
    const colorFgPrev   = container.querySelector('#qr-color-fg-preview');
    const colorBgEl     = container.querySelector('#qr-color-bg');
    const colorBgHexEl  = container.querySelector('#qr-color-bg-hex');
    const colorBgPrev   = container.querySelector('#qr-color-bg-preview');
    const generateBtn   = container.querySelector('#qr-generate-btn');
    const emptyState    = container.querySelector('#qr-empty-state');
    const loadingState  = container.querySelector('#qr-loading-state');
    const resultEl      = container.querySelector('#qr-result');
    const canvasContainer = container.querySelector('#qr-canvas-container');
    const metaSizeEl    = container.querySelector('#qr-meta-size');
    const metaEclEl     = container.querySelector('#qr-meta-ecl');
    const metaCharsEl   = container.querySelector('#qr-meta-chars');
    const downloadPng   = container.querySelector('#qr-download-png');
    const downloadSvg   = container.querySelector('#qr-download-svg');
    const copyClipboard = container.querySelector('#qr-copy-clipboard');
    const copyFeedback  = container.querySelector('#qr-copy-feedback');

    // ── Helpers ──────────────────────────────────────────────────────────────

    function _isValidUrl(str) {
      try { return Boolean(new URL(str)); } catch { return false; }
    }

    function _updateUrlFeedback(val) {
      if (!val.trim()) {
        urlFeedback.textContent = '';
        urlFeedback.className = 'qrcode-url-feedback';
        return;
      }
      if (_isValidUrl(val.trim())) {
        urlFeedback.textContent = '✓ URL válida';
        urlFeedback.className = 'qrcode-url-feedback qrcode-url-feedback--valid';
      } else {
        urlFeedback.textContent = 'Texto livre (não é uma URL)';
        urlFeedback.className = 'qrcode-url-feedback qrcode-url-feedback--text';
      }
    }

    function _syncColor(colorInput, hexInput, previewEl) {
      const val = colorInput.value;
      hexInput.value = val.toUpperCase();
      previewEl.style.background = val;
    }

    function _syncColorFromHex(hexInput, colorInput, previewEl) {
      const val = hexInput.value.trim();
      if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
        colorInput.value = val;
        previewEl.style.background = val;
      }
    }

    function _showState(state) {
      emptyState.style.display   = state === 'empty'   ? '' : 'none';
      loadingState.style.display = state === 'loading' ? '' : 'none';
      resultEl.style.display     = state === 'result'  ? '' : 'none';
    }

    // ── Geração do QR Code ───────────────────────────────────────────────────

    function _generate() {
      const text = inputEl.value.trim();
      if (!text) return;

      const size   = parseInt(sizeRangeEl.value, 10);
      const fgColor = colorFgEl.value;
      const bgColor = colorBgEl.value;

      _showState('loading');

      // Micro delay para o loading state aparecer antes do processamento
      setTimeout(() => {
        try {
          // Limpa instância anterior
          canvasContainer.innerHTML = '';
          _qrInstance = null;

          /* global QRCode */
          _qrInstance = new QRCode(canvasContainer, {
            text,
            width: size,
            height: size,
            colorDark: fgColor,
            colorLight: bgColor,
            correctLevel: QRCode.CorrectLevel[_activeEcl]
          });

          // Atualiza metadados
          metaSizeEl.textContent  = `${size} × ${size} px`;
          metaEclEl.textContent   = `ECL: ${_activeEcl}`;
          metaCharsEl.textContent = `${text.length} caractere${text.length !== 1 ? 's' : ''}`;

          _showState('result');

          // Scroll suave para o resultado
          resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        } catch (err) {
          console.error('[QR Code] Falha na geração:', err);
          _showState('empty');
          urlFeedback.textContent = '⚠ Falha ao gerar o QR Code. Verifique o conteúdo inserido.';
          urlFeedback.className = 'qrcode-url-feedback qrcode-url-feedback--error';
        }
      }, 80);
    }

    // ── Download PNG ─────────────────────────────────────────────────────────

    function _downloadPng() {
      const canvas = canvasContainer.querySelector('canvas');
      if (!canvas) return;
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `qrcode-${Date.now()}.png`;
      link.click();
    }

    // ── Download SVG ─────────────────────────────────────────────────────────

    function _downloadSvg() {
      const canvas = canvasContainer.querySelector('canvas');
      if (!canvas) return;

      const size    = canvas.width;
      const fgColor = colorFgEl.value;
      const bgColor = colorBgEl.value;

      // Converte o canvas para uma imagem embutida no SVG
      const imgData = canvas.toDataURL('image/png');
      const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${bgColor}"/>
  <image href="${imgData}" width="${size}" height="${size}"/>
</svg>`;
      const blob = new Blob([svgContent], { type: 'image/svg+xml' });
      const url  = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href  = url;
      link.download = `qrcode-${Date.now()}.svg`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    }

    // ── Copiar para Área de Transferência ────────────────────────────────────

    async function _copyToClipboard() {
      const canvas = canvasContainer.querySelector('canvas');
      if (!canvas) return;

      try {
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        _showCopyFeedback('✓ Imagem copiada para a área de transferência!', 'success');
      } catch (err) {
        // Fallback: copia o link do data URL
        try {
          await navigator.clipboard.writeText(canvas.toDataURL('image/png'));
          _showCopyFeedback('✓ Data URL copiado para a área de transferência.', 'success');
        } catch {
          _showCopyFeedback('⚠ Não foi possível copiar. Use "Baixar PNG".', 'error');
        }
      }
    }

    function _showCopyFeedback(message, type) {
      copyFeedback.textContent = message;
      copyFeedback.className = `qrcode-copy-feedback qrcode-copy-feedback--${type}`;
      copyFeedback.style.display = '';
      setTimeout(() => { copyFeedback.style.display = 'none'; }, 3000);
    }

    // ── Event Listeners ───────────────────────────────────────────────────────

    // Input de texto
    _on(inputEl, 'input', () => {
      const val = inputEl.value;
      charCountEl.textContent = val.length;
      generateBtn.disabled = !val.trim();
      _updateUrlFeedback(val);
    });

    // Enter no textarea (Ctrl+Enter gera)
    _on(inputEl, 'keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (!generateBtn.disabled) _generate();
      }
    });

    // Slider de tamanho
    _on(sizeRangeEl, 'input', () => {
      sizeDisplayEl.textContent = sizeRangeEl.value;
    });

    // Botões de ECL
    eclGroup.querySelectorAll('.qrcode-ecl-btn').forEach(btn => {
      _on(btn, 'click', () => {
        _activeEcl = btn.dataset.ecl;
        eclGroup.querySelectorAll('.qrcode-ecl-btn').forEach(b =>
          b.classList.toggle('qrcode-ecl-btn--active', b === btn)
        );
        eclHint.textContent = ECL_DESCRIPTIONS[_activeEcl];
      });
    });

    // Cor FG
    _on(colorFgEl, 'input', () => _syncColor(colorFgEl, colorFgHexEl, colorFgPrev));
    _on(colorFgHexEl, 'input', () => _syncColorFromHex(colorFgHexEl, colorFgEl, colorFgPrev));

    // Cor BG
    _on(colorBgEl, 'input', () => _syncColor(colorBgEl, colorBgHexEl, colorBgPrev));
    _on(colorBgHexEl, 'input', () => _syncColorFromHex(colorBgHexEl, colorBgEl, colorBgPrev));

    // Botão gerar
    _on(generateBtn, 'click', _generate);

    // Ações de exportação
    _on(downloadPng,   'click', _downloadPng);
    _on(downloadSvg,   'click', _downloadSvg);
    _on(copyClipboard, 'click', _copyToClipboard);
  },

  unmount() {
    // Remove todos os event listeners registrados
    _listeners.forEach(({ el, type, fn }) => {
      try { el.removeEventListener(type, fn); } catch { /* ignore */ }
    });
    _listeners = [];
    _qrInstance = null;
  }
};

export default tool;
