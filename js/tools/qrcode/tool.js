/**
 * Open Tool — Ferramenta: QR Code
 * Gerador de QR Codes 100% client-side.
 * Usa a biblioteca qrcodegen de Nayuki (MIT) via jsDelivr.
 * @version v.3.0.0
 *
 * API da lib (objeto global `qrcodegen`):
 *   const qr = qrcodegen.QrCode.encodeText(text, ecl);
 *   qr.size            → número de módulos no grid
 *   qr.getModule(x, y) → true = módulo escuro, false = módulo claro
 */

import { getQRCodeHTML } from './ui.js';
import { loadScript } from '../../config.js';

// Biblioteca nayuki — IIFE local (expõe window.qrcodegen)
// Fonte: nayuki-qr-code-generator@1.8.0 + wrapper IIFE para compatibilidade com <script>
const QRCODE_LIB_URL = '/js/lib/qrcodegen.js';

// Descrições dos níveis de correção de erro
const ECL_DESCRIPTIONS = {
  L: 'L — 7% de recuperação (menor densidade)',
  M: 'M — 15% de recuperação (padrão)',
  Q: 'Q — 25% de recuperação (alta)',
  H: 'H — 30% de recuperação (máximo)'
};

// Estado interno
let _activeEcl = 'M';
let _listeners = [];
let _lastQr    = null;  // instância de qrcodegen.QrCode
let _lastFg    = '#000000';
let _lastBg    = '#ffffff';

function _on(el, type, fn) {
  if (!el) return;
  el.addEventListener(type, fn);
  _listeners.push({ el, type, fn });
}

/** Converte a chave UI (L/M/Q/H) para o objeto Ecc do nayuki */
function _getEcc(key) {
  const { QrCode } = window.qrcodegen;
  return {
    L: QrCode.Ecc.LOW,
    M: QrCode.Ecc.MEDIUM,
    Q: QrCode.Ecc.QUARTILE,
    H: QrCode.Ecc.HIGH
  }[key] || QrCode.Ecc.MEDIUM;
}

/**
 * Renderiza um QrCode nayuki num <canvas>.
 * @param {object} qr        Instância de qrcodegen.QrCode
 * @param {HTMLCanvasElement} canvas
 * @param {number} canvasSize  Tamanho em px (width = height)
 * @param {string} fgColor   Cor dos módulos escuros (hex)
 * @param {string} bgColor   Cor do fundo (hex)
 * @param {number} border    Margem em módulos ao redor do QR (default 4)
 */
function _drawQrOnCanvas(qr, canvas, canvasSize, fgColor, bgColor, border = 4) {
  const n     = qr.size;
  const scale = Math.floor(canvasSize / (n + border * 2));
  const off   = Math.floor((canvasSize - scale * n) / 2);

  canvas.width  = canvasSize;
  canvas.height = canvasSize;

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  ctx.fillStyle = fgColor;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (qr.getModule(x, y)) {
        ctx.fillRect(off + x * scale, off + y * scale, scale, scale);
      }
    }
  }
}

/**
 * Gera uma string SVG a partir de um QrCode nayuki.
 * @param {object} qr
 * @param {string} fgColor
 * @param {string} bgColor
 * @param {number} border  Margem em módulos (default 4)
 * @returns {string} SVG completo
 */
function _qrToSvgString(qr, fgColor, bgColor, border = 4) {
  const n   = qr.size;
  const dim = n + border * 2;
  const parts = [];

  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (qr.getModule(x, y)) {
        parts.push(`M${x + border},${y + border}h1v1h-1z`);
      }
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 ${dim} ${dim}" stroke="none">
  <rect width="${dim}" height="${dim}" fill="${bgColor}"/>
  <path d="${parts.join(' ')}" fill="${fgColor}"/>
</svg>`;
}

const tool = {
  id: 'qrcode',
  label: 'QR Code',

  render(container) {
    container.innerHTML = getQRCodeHTML();
  },

  async mount(container) {
    _listeners = [];
    _activeEcl = 'M';
    _lastQr    = null;

    // Carrega a biblioteca nayuki de forma lazy
    await loadScript(QRCODE_LIB_URL);

    // Aguarda o global `qrcodegen` estar disponível
    await new Promise(resolve => {
      const check = () =>
        (typeof window.qrcodegen !== 'undefined' ? resolve() : setTimeout(check, 50));
      check();
    });

    // Referências DOM
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
    const canvasWrap    = container.querySelector('#qr-canvas-container');
    const metaSizeEl    = container.querySelector('#qr-meta-size');
    const metaEclEl     = container.querySelector('#qr-meta-ecl');
    const metaCharsEl   = container.querySelector('#qr-meta-chars');
    const downloadPng   = container.querySelector('#qr-download-png');
    const downloadSvg   = container.querySelector('#qr-download-svg');
    const copyClipboard = container.querySelector('#qr-copy-clipboard');
    const copyFeedback  = container.querySelector('#qr-copy-feedback');

    // ── Helpers ────────────────────────────────────────────────────────────

    function _isUrl(str) {
      try { return Boolean(new URL(str)); } catch { return false; }
    }

    function _updateUrlFeedback(val) {
      if (!val.trim()) {
        urlFeedback.textContent = '';
        urlFeedback.className = 'qrcode-url-feedback';
        return;
      }
      if (_isUrl(val.trim())) {
        urlFeedback.textContent = '✓ URL válida detectada';
        urlFeedback.className = 'qrcode-url-feedback qrcode-url-feedback--valid';
      } else {
        urlFeedback.textContent = 'Texto livre (não é uma URL)';
        urlFeedback.className = 'qrcode-url-feedback qrcode-url-feedback--text';
      }
    }

    function _syncColorFromPicker(pickerEl, hexEl, prevEl) {
      const val = pickerEl.value;
      hexEl.value = val.toUpperCase();
      prevEl.style.background = val;
    }

    function _syncColorFromHex(hexEl, pickerEl, prevEl) {
      const val = hexEl.value.trim();
      if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
        pickerEl.value = val;
        prevEl.style.background = val;
      }
    }

    function _setState(state) {
      emptyState.style.display   = state === 'empty'   ? '' : 'none';
      loadingState.style.display = state === 'loading' ? '' : 'none';
      resultEl.style.display     = state === 'result'  ? '' : 'none';
    }

    // ── Geração do QR Code ──────────────────────────────────────────────────

    async function _generate() {
      const text = inputEl.value.trim();
      if (!text) return;

      const size    = parseInt(sizeRangeEl.value, 10);
      const fgColor = colorFgEl.value;
      const bgColor = colorBgEl.value;
      const ecl     = _getEcc(_activeEcl);

      _setState('loading');

      // Cede o controle ao browser para exibir o spinner antes de processar
      await new Promise(r => setTimeout(r, 10));

      try {
        // Gera o QR Code com a API do nayuki
        const qr = qrcodegen.QrCode.encodeText(text, ecl);
        _lastQr = qr;
        _lastFg = fgColor;
        _lastBg = bgColor;

        // Cria e pinta o canvas
        const canvas = document.createElement('canvas');
        _drawQrOnCanvas(qr, canvas, size, fgColor, bgColor);

        // Substitui o conteúdo do container
        canvasWrap.innerHTML = '';
        canvasWrap.appendChild(canvas);

        // Atualiza metadados
        metaSizeEl.textContent  = `${size} × ${size} px`;
        metaEclEl.textContent   = `ECL: ${_activeEcl}`;
        metaCharsEl.textContent = `${text.length} caractere${text.length !== 1 ? 's' : ''}`;

        _setState('result');
        resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      } catch (err) {
        console.error('[QR Code] Falha na geração:', err);
        _setState('empty');
        urlFeedback.textContent = `⚠ Erro: ${err.message || 'Falha ao gerar QR Code'}`;
        urlFeedback.className = 'qrcode-url-feedback qrcode-url-feedback--error';
      }
    }

    // ── Downloads ────────────────────────────────────────────────────────────

    function _downloadPng() {
      if (!_lastQr) return;
      const canvas = canvasWrap.querySelector('canvas');
      if (!canvas) return;
      const link = document.createElement('a');
      link.download = `qrcode-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }

    function _downloadSvg() {
      if (!_lastQr) return;
      try {
        const svgString = _qrToSvgString(_lastQr, _lastFg, _lastBg);
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        const url  = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `qrcode-${Date.now()}.svg`;
        link.href = url;
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 10000);
      } catch (err) {
        console.error('[QR Code] Falha ao exportar SVG:', err);
      }
    }

    async function _copyToClipboard() {
      const canvas = canvasWrap.querySelector('canvas');
      if (!canvas) return;
      try {
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        _showCopyFeedback('✓ Imagem copiada para a área de transferência!', 'success');
      } catch {
        try {
          await navigator.clipboard.writeText(canvas.toDataURL('image/png'));
          _showCopyFeedback('✓ Data URL copiado.', 'success');
        } catch {
          _showCopyFeedback('⚠ Não foi possível copiar. Use "Baixar PNG".', 'error');
        }
      }
    }

    function _showCopyFeedback(msg, type) {
      copyFeedback.textContent = msg;
      copyFeedback.className = `qrcode-copy-feedback qrcode-copy-feedback--${type}`;
      copyFeedback.style.display = '';
      setTimeout(() => { copyFeedback.style.display = 'none'; }, 3000);
    }

    // ── Event Listeners ───────────────────────────────────────────────────────

    _on(inputEl, 'input', () => {
      const val = inputEl.value;
      charCountEl.textContent = val.length;
      generateBtn.disabled = !val.trim();
      _updateUrlFeedback(val);
    });

    _on(inputEl, 'keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (!generateBtn.disabled) _generate();
      }
    });

    _on(sizeRangeEl, 'input', () => {
      sizeDisplayEl.textContent = sizeRangeEl.value;
    });

    // Botões ECL
    eclGroup.querySelectorAll('.qrcode-ecl-btn').forEach(btn => {
      _on(btn, 'click', () => {
        _activeEcl = btn.dataset.ecl;
        eclGroup.querySelectorAll('.qrcode-ecl-btn').forEach(b =>
          b.classList.toggle('qrcode-ecl-btn--active', b === btn)
        );
        eclHint.textContent = ECL_DESCRIPTIONS[_activeEcl];
      });
    });

    // Cores
    _on(colorFgEl, 'input', () => _syncColorFromPicker(colorFgEl, colorFgHexEl, colorFgPrev));
    _on(colorFgHexEl, 'input', () => _syncColorFromHex(colorFgHexEl, colorFgEl, colorFgPrev));
    _on(colorBgEl, 'input', () => _syncColorFromPicker(colorBgEl, colorBgHexEl, colorBgPrev));
    _on(colorBgHexEl, 'input', () => _syncColorFromHex(colorBgHexEl, colorBgEl, colorBgPrev));

    // Botão gerar
    _on(generateBtn, 'click', _generate);

    // Exportação
    _on(downloadPng,   'click', _downloadPng);
    _on(downloadSvg,   'click', _downloadSvg);
    _on(copyClipboard, 'click', _copyToClipboard);

    // Regenera automaticamente ao mudar opções (se já tiver QR gerado)
    const _regenerateIfActive = () => { if (_lastQr) _generate(); };
    _on(sizeRangeEl, 'change', _regenerateIfActive);
    _on(colorFgEl,   'change', _regenerateIfActive);
    _on(colorBgEl,   'change', _regenerateIfActive);
  },

  unmount() {
    _listeners.forEach(({ el, type, fn }) => {
      try { el.removeEventListener(type, fn); } catch { /* ignore */ }
    });
    _listeners = [];
    _lastQr    = null;
  }
};

export default tool;
