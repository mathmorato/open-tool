/**
 * Open Tool — Ferramenta: Comprimir PDF (pdf-compress) — Template HTML
 * Inspirado em OpenToolKit/CompressPDF e Stirling-PDF (100% Client-Side).
 * @version v.2.3.0
 */

export function getPdfCompressHTML() {
  return `
    <div class="pdf-compress-root">

      <section class="pdf-tool-hero">
        <header class="hero-header">
          <div class="pdf-tool-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="4 14 10 14 10 20"></polyline>
              <polyline points="20 10 14 10 14 4"></polyline>
              <line x1="14" y1="10" x2="21" y2="3"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
            Otimização por Renderização &amp; Reamostragem
          </div>
          <h2 class="hero-title">Comprimir PDF</h2>
          <p class="hero-subtitle">
            Reduza drasticamente o tamanho de arquivos PDF pesados e escaneados com reamostragem inteligente de imagens. 100% local no seu navegador.
          </p>
        </header>
      </section>

      <div class="pdf-workspace">

        <!-- Coluna Esquerda: Entrada & Controles de Compressão -->
        <div class="pdf-controls-panel">

          <!-- Dropzone Compacto -->
          <div class="pdf-dropzone" id="c-dropzone" tabindex="0" role="button" aria-label="Carregar arquivo PDF para comprimir">
            <input type="file" id="c-file-input" accept="application/pdf" class="pdf-hidden-input">
            <div class="pdf-dropzone-content" id="c-dropzone-prompt">
              <div class="pdf-dropzone-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="12" y1="18" x2="12" y2="12"></line>
                  <line x1="9" y1="15" x2="15" y2="15"></line>
                </svg>
              </div>
              <div class="pdf-dropzone-text">
                <p class="pdf-dropzone-title">Arraste um PDF ou <span class="pdf-link">selecione</span></p>
                <p class="pdf-dropzone-sub">PDFs escaneados ou volumosos até 1,5 GB</p>
              </div>
            </div>

            <!-- Preview do Arquivo Carregado -->
            <div class="pdf-file-loaded" id="c-file-loaded" style="display: none;">
              <div class="pdf-icon-badge">PDF</div>
              <div class="pdf-loaded-info">
                <span class="pdf-filename" id="c-filename">documento.pdf</span>
                <span class="pdf-filesize" id="c-filesize">0 KB</span>
              </div>
              <button type="button" class="pdf-remove-btn" id="c-remove-btn" title="Trocar arquivo">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          <!-- Nível de Compressão (Presets 3 Colunas) -->
          <div class="pdf-field-group">
            <label class="pdf-label">Nível de Compressão</label>
            <div class="pdf-preset-grid" id="c-preset-grid">
              <button type="button" class="pdf-preset-btn" data-preset="extreme">
                <span class="pdf-preset-icon">⚡</span>
                <span class="pdf-preset-title">Extrema</span>
                <span class="pdf-preset-desc">72 DPI • Menor peso</span>
              </button>
              <button type="button" class="pdf-preset-btn pdf-preset-btn--active" data-preset="balanced">
                <span class="pdf-preset-icon">⚖️</span>
                <span class="pdf-preset-title">Recomendada</span>
                <span class="pdf-preset-desc">100 DPI • Equilibrado</span>
              </button>
              <button type="button" class="pdf-preset-btn" data-preset="light">
                <span class="pdf-preset-icon">💎</span>
                <span class="pdf-preset-title">Alta Nitidez</span>
                <span class="pdf-preset-desc">150 DPI • Mais detalhe</span>
              </button>
            </div>
          </div>

          <!-- Ajustes Manuais Colapsáveis -->
          <details class="pdf-advanced-details">
            <summary class="pdf-advanced-summary">
              <span>Ajustes Finos de Qualidade</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </summary>
            <div class="pdf-advanced-body">
              <div class="pdf-range-row">
                <div class="pdf-range-header">
                  <label for="c-dpi-range">Resolução (DPI)</label>
                  <span id="c-dpi-val" class="pdf-val-badge">100 DPI</span>
                </div>
                <input type="range" id="c-dpi-range" min="50" max="200" value="100" step="10" class="pdf-slider">
              </div>

              <div class="pdf-range-row">
                <div class="pdf-range-header">
                  <label for="c-quality-range">Qualidade da Imagem</label>
                  <span id="c-quality-val" class="pdf-val-badge">70%</span>
                </div>
                <input type="range" id="c-quality-range" min="20" max="95" value="70" step="5" class="pdf-slider">
              </div>
            </div>
          </details>

          <!-- Botão Principal de Compressão -->
          <button type="button" id="c-compress-btn" class="pdf-primary-btn" disabled>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="4 14 10 14 10 20"></polyline>
              <polyline points="20 10 14 10 14 4"></polyline>
              <line x1="14" y1="10" x2="21" y2="3"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
            <span>Comprimir PDF</span>
          </button>

        </div>

        <!-- Coluna Direita: Pré-visualização & Métricas -->
        <div class="pdf-preview-panel">

          <!-- Estado Vazio -->
          <div class="pdf-empty-view" id="c-empty-view">
            <div class="pdf-empty-illustration">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="4 14 10 14 10 20"></polyline>
                <polyline points="20 10 14 10 14 4"></polyline>
                <line x1="14" y1="10" x2="21" y2="3"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
              </svg>
            </div>
            <h3 class="pdf-empty-title">Nenhum PDF comprimido</h3>
            <p class="pdf-empty-desc">Carregue um arquivo e selecione o nível de compressão para otimizar o documento no navegador.</p>
          </div>

          <!-- Estado Processando -->
          <div class="pdf-loading-view" id="c-loading-view" style="display: none;">
            <div class="pdf-spinner"></div>
            <h3 class="pdf-loading-title">Otimizando e reamostrando páginas...</h3>
            <p class="pdf-loading-desc" id="c-loading-progress">Processando página 1...</p>
          </div>

          <!-- Estado Resultado -->
          <div class="pdf-result-view" id="c-result-view" style="display: none;">

            <!-- Comparativo de Tamanhos -->
            <div class="pdf-savings-card">
              <div class="pdf-savings-stat">
                <span class="pdf-savings-label">Original</span>
                <strong id="c-stat-orig" class="pdf-savings-val">0 MB</strong>
              </div>
              <div class="pdf-savings-arrow">→</div>
              <div class="pdf-savings-stat">
                <span class="pdf-savings-label">Comprimido</span>
                <strong id="c-stat-new" class="pdf-savings-val" style="color:var(--accent-primary);">0 MB</strong>
              </div>
              <div class="pdf-savings-badge" id="c-stat-pct">-0%</div>
            </div>

            <!-- Palco de Preview -->
            <div class="pdf-stage" id="c-stage">
              <canvas id="c-preview-canvas" class="pdf-preview-canvas"></canvas>
            </div>

            <!-- Metadados -->
            <div class="pdf-meta-bar">
              <div class="pdf-meta-item">
                <span class="pdf-meta-label">Total de Páginas:</span>
                <strong id="c-meta-pages" class="pdf-meta-val">0</strong>
              </div>
              <div class="pdf-meta-item">
                <span class="pdf-meta-label">Economia:</span>
                <strong id="c-meta-saved" class="pdf-meta-val" style="color:#10b981;">0 KB</strong>
              </div>
            </div>

            <!-- Ação de Download -->
            <div class="pdf-actions-bar">
              <button type="button" id="c-download-btn" class="pdf-export-btn pdf-export-btn--primary">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Baixar PDF Otimizado
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  `;
}
