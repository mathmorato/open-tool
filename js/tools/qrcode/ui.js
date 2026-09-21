/**
 * Open Tool — Ferramenta: QR Code — Template HTML
 * @version v.2.0.0
 */

export function getQRCodeHTML() {
  return `
    <div class="qrcode-tool-root">

      <section class="qrcode-hero">
        <header class="hero-header">
          <h2 class="hero-title">Gerador de QR Code</h2>
          <p class="hero-subtitle">
            Gere QR Codes a partir de links, textos ou qualquer dado. 100% local — nenhuma informação é enviada para servidores.
          </p>
        </header>
      </section>

      <div class="qrcode-workspace">

        <!-- Coluna Esquerda: Controles -->
        <div class="qrcode-controls-panel">

          <!-- Input de conteúdo -->
          <div class="qrcode-field-group">
            <label class="qrcode-label" for="qr-input">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
              URL ou texto
            </label>
            <div class="qrcode-input-wrap">
              <textarea
                id="qr-input"
                class="qrcode-textarea"
                placeholder="https://exemplo.com.br ou qualquer texto…"
                rows="4"
                maxlength="2000"
                autocomplete="off"
                spellcheck="false"
              ></textarea>
              <div class="qrcode-char-count">
                <span id="qr-char-count">0</span> / 2000
              </div>
            </div>
            <div id="qr-url-feedback" class="qrcode-url-feedback" aria-live="polite"></div>
          </div>

          <!-- Divisor -->
          <div class="qrcode-divider">
            <span>Personalização</span>
          </div>

          <!-- Opções de personalização -->
          <div class="qrcode-options-grid">

            <!-- Tamanho -->
            <div class="qrcode-field-group">
              <label class="qrcode-label" for="qr-size">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M21 21H3V3"/>
                  <path d="m7 17 10-10"/>
                </svg>
                Tamanho
              </label>
              <div class="qrcode-size-control">
                <input type="range" id="qr-size" class="qrcode-range" min="128" max="1024" step="64" value="256">
                <span class="qrcode-size-value"><span id="qr-size-display">256</span> px</span>
              </div>
            </div>

            <!-- Nível de correção de erro -->
            <div class="qrcode-field-group">
              <label class="qrcode-label" for="qr-ecl">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="m12 14 4-4"/>
                  <path d="M3.34 19a10 10 0 1 1 17.32 0"/>
                </svg>
                Correção de Erro
              </label>
              <div class="qrcode-ecl-group" id="qr-ecl">
                <button class="qrcode-ecl-btn" data-ecl="L" title="7% de recuperação">L</button>
                <button class="qrcode-ecl-btn qrcode-ecl-btn--active" data-ecl="M" title="15% de recuperação (padrão)">M</button>
                <button class="qrcode-ecl-btn" data-ecl="Q" title="25% de recuperação">Q</button>
                <button class="qrcode-ecl-btn" data-ecl="H" title="30% de recuperação (máximo)">H</button>
              </div>
              <p class="qrcode-hint" id="qr-ecl-hint">M — 15% de recuperação (padrão)</p>
            </div>

            <!-- Cor do QR (foreground) -->
            <div class="qrcode-field-group">
              <label class="qrcode-label" for="qr-color-fg">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
                  <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
                  <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
                  <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
                </svg>
                Cor dos módulos
              </label>
              <div class="qrcode-color-row">
                <input type="color" id="qr-color-fg" class="qrcode-color-input" value="#0F172A" title="Cor dos módulos">
                <span class="qrcode-color-preview" id="qr-color-fg-preview" style="background:#0F172A;"></span>
                <input type="text" id="qr-color-fg-hex" class="qrcode-hex-input" value="#0F172A" maxlength="7" spellcheck="false">
              </div>
            </div>

            <!-- Cor do fundo (background) -->
            <div class="qrcode-field-group">
              <label class="qrcode-label" for="qr-color-bg">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                </svg>
                Cor do fundo
              </label>
              <div class="qrcode-color-row">
                <input type="color" id="qr-color-bg" class="qrcode-color-input" value="#FFFFFF" title="Cor do fundo">
                <span class="qrcode-color-preview" id="qr-color-bg-preview" style="background:#FFFFFF; border-color: var(--border-subtle);"></span>
                <input type="text" id="qr-color-bg-hex" class="qrcode-hex-input" value="#FFFFFF" maxlength="7" spellcheck="false">
              </div>
            </div>

          </div>

          <!-- Botão gerar -->
          <button id="qr-generate-btn" class="btn btn-primary qrcode-generate-btn" disabled>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="5" y="5" width="3" height="3" fill="currentColor" stroke="none"/>
              <rect x="16" y="5" width="3" height="3" fill="currentColor" stroke="none"/>
              <rect x="5" y="16" width="3" height="3" fill="currentColor" stroke="none"/>
            </svg>
            Gerar QR Code
          </button>

        </div>

        <!-- Coluna Direita: Preview -->
        <div class="qrcode-preview-panel">

          <!-- Estado vazio -->
          <div id="qr-empty-state" class="qrcode-empty-state">
            <div class="qrcode-empty-icon" aria-hidden="true">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" opacity="0.3">
                <rect x="3" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/>
                <rect x="5" y="5" width="3" height="3" fill="currentColor" stroke="none"/>
                <rect x="16" y="5" width="3" height="3" fill="currentColor" stroke="none"/>
                <rect x="5" y="16" width="3" height="3" fill="currentColor" stroke="none"/>
                <path d="M14 14h3v3h-3z" fill="currentColor" stroke="none"/>
                <path d="M17 17h4"/>
                <path d="M17 21v-4"/>
                <path d="M21 17v4"/>
              </svg>
            </div>
            <p class="qrcode-empty-text">Digite uma URL ou texto e clique em <strong>Gerar QR Code</strong></p>
          </div>

          <!-- Estado de loading -->
          <div id="qr-loading-state" class="qrcode-loading-state" style="display:none;" aria-live="polite">
            <svg viewBox="0 0 100 100" class="radial-spinner-svg qrcode-spinner" width="40" height="40">
              <line x1="50" y1="14" x2="50" y2="28" stroke-width="8" stroke-linecap="round" class="ray ray-1" />
              <line x1="68" y1="18.8" x2="61" y2="30.9" stroke-width="8" stroke-linecap="round" class="ray ray-2" />
              <line x1="81.2" y1="32" x2="69.1" y2="39" stroke-width="8" stroke-linecap="round" class="ray ray-3" />
              <line x1="86" y1="50" x2="72" y2="50" stroke-width="8" stroke-linecap="round" class="ray ray-4" />
              <line x1="81.2" y1="68" x2="69.1" y2="61" stroke-width="8" stroke-linecap="round" class="ray ray-5" />
              <line x1="68" y1="81.2" x2="61" y2="69.1" stroke-width="8" stroke-linecap="round" class="ray ray-6" />
              <line x1="50" y1="86" x2="50" y2="72" stroke-width="8" stroke-linecap="round" class="ray ray-7" />
              <line x1="32" y1="81.2" x2="39" y2="69.1" stroke-width="8" stroke-linecap="round" class="ray ray-8" />
              <line x1="18.8" y1="68" x2="30.9" y2="61" stroke-width="8" stroke-linecap="round" class="ray ray-9" />
              <line x1="14" y1="50" x2="28" y2="50" stroke-width="8" stroke-linecap="round" class="ray ray-10" />
              <line x1="18.8" y1="32" x2="30.9" y2="39" stroke-width="8" stroke-linecap="round" class="ray ray-11" />
              <line x1="32" y1="18.8" x2="39" y2="30.9" stroke-width="8" stroke-linecap="round" class="ray ray-12" />
            </svg>
            <span>Gerando QR Code…</span>
          </div>

          <!-- QR Code gerado -->
          <div id="qr-result" class="qrcode-result" style="display:none;">
            <div class="qrcode-canvas-wrap">
              <div id="qr-canvas-container" class="qrcode-canvas-container"></div>
            </div>

            <!-- Metadados -->
            <div class="qrcode-meta-row">
              <span class="qrcode-meta-badge" id="qr-meta-size">256 × 256 px</span>
              <span class="qrcode-meta-badge" id="qr-meta-ecl">ECL: M</span>
              <span class="qrcode-meta-badge" id="qr-meta-chars">0 caracteres</span>
            </div>

            <!-- Ações de exportação -->
            <div class="qrcode-actions-row">
              <button id="qr-download-png" class="btn btn-primary qrcode-action-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Baixar PNG
              </button>

              <button id="qr-download-svg" class="btn btn-secondary qrcode-action-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Baixar SVG
              </button>

              <button id="qr-copy-clipboard" class="btn btn-ghost qrcode-action-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <rect x="9" y="9" width="13" height="13" rx="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                Copiar Imagem
              </button>
            </div>

            <!-- Feedback de cópia -->
            <div id="qr-copy-feedback" class="qrcode-copy-feedback" aria-live="polite" style="display:none;"></div>
          </div>

        </div>
      </div>
    </div>
  `;
}
