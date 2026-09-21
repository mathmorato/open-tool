/**
 * Open Tool — Ferramenta: Image to Vector — Template HTML
 * Inspirado no ut-vector (raster to SVG vectorizer) e ImageTracer.
 * @version v.2.1.0
 */

import { ICONS } from '../../icons.js';

export function getImageToVectorHTML() {
  return `
    <div class="img2vector-tool-root">

      <section class="img2vector-hero">
        <header class="hero-header">
          <div class="img2vector-badge">
            ${ICONS.toolVector(12)}
            Vetorização Curvas Bézier
          </div>
          <h2 class="hero-title">Image to Vector</h2>
          <p class="hero-subtitle">
            Transforme imagens rasterizadas em gráficos vetoriais SVG escaláveis com fidelidade matemática. 100% local — zero tráfego de rede.
          </p>
        </header>
      </section>

      <div class="img2vector-workspace">

        <!-- Coluna Esquerda: Entrada & Controles -->
        <div class="img2vector-controls-panel">

          <!-- Dropzone de Imagem Compacto -->
          <div class="img2vector-dropzone" id="v-dropzone" tabindex="0" role="button" aria-label="Carregar imagem para vetorização">
            <input type="file" id="v-file-input" accept="image/png,image/jpeg,image/webp,image/bmp,image/gif" class="v-hidden-input">
            <div class="v-dropzone-content" id="v-dropzone-prompt">
              <div class="v-dropzone-icon">
                ${ICONS.image(22)}
              </div>
              <div class="v-dropzone-text">
                <p class="v-dropzone-title">Arraste uma imagem ou <span class="v-link">selecione</span></p>
                <p class="v-dropzone-sub">PNG, JPG, WEBP, BMP até 20MB • Ctrl+V</p>
              </div>
            </div>

            <!-- Preview da Imagem Carregada -->
            <div class="v-image-loaded" id="v-image-loaded" style="display: none;">
              <img id="v-preview-img" alt="Imagem original carregada" class="v-thumbnail">
              <div class="v-loaded-info">
                <span class="v-filename" id="v-filename">imagem.png</span>
                <span class="v-filesize" id="v-filesize">0 KB</span>
              </div>
              <button type="button" class="v-remove-btn" id="v-remove-btn" title="Trocar imagem">
                ${ICONS.x(14)}
              </button>
            </div>
          </div>

          <!-- Remoção Inteligente de Fundo (Em Linha Compacta) -->
          <div class="v-bg-remover-card" id="v-bg-remover-card">
            <div class="v-bg-remover-row">
              <div class="v-bg-remover-info">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="v-bg-icon">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
                </svg>
                <div class="v-bg-text-wrap">
                  <span class="v-bg-remover-title">Remover Fundo</span>
                  <span class="v-bg-badge" id="v-bg-badge">Desativado</span>
                </div>
              </div>
              <button type="button" class="v-bg-btn" id="v-remove-bg-btn" disabled>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="9" y1="3" x2="9" y2="21"></line>
                  <path d="m14 8 4 4-4 4"></path>
                </svg>
                <span id="v-remove-bg-btn-text">Ativar Remoção</span>
              </button>
            </div>
          </div>

          <!-- Presets de Vetorização (Grid 3x2 Compacto) -->
          <div class="img2vector-field-group">
            <label class="img2vector-label">Modo / Preset</label>
            <div class="v-preset-grid" id="v-preset-grid">
              <button type="button" class="v-preset-btn v-preset-btn--active" data-preset="bw">
                <div class="v-preset-head">
                  <span class="v-preset-icon">⬛</span>
                  <span class="v-preset-title">Logotipo</span>
                </div>
                <span class="v-preset-desc">2 cores P&B</span>
              </button>
              <button type="button" class="v-preset-btn" data-preset="balanced">
                <div class="v-preset-head">
                  <span class="v-preset-icon">🎨</span>
                  <span class="v-preset-title">Equilibrado</span>
                </div>
                <span class="v-preset-desc">16 cores</span>
              </button>
              <button type="button" class="v-preset-btn" data-preset="detailed">
                <div class="v-preset-head">
                  <span class="v-preset-icon">✨</span>
                  <span class="v-preset-title">Alta Fid.</span>
                </div>
                <span class="v-preset-desc">32 cores</span>
              </button>
              <button type="button" class="v-preset-btn" data-preset="curvy">
                <div class="v-preset-head">
                  <span class="v-preset-icon">〰️</span>
                  <span class="v-preset-title">Curvas</span>
                </div>
                <span class="v-preset-desc">Suaves</span>
              </button>
              <button type="button" class="v-preset-btn" data-preset="posterized">
                <div class="v-preset-head">
                  <span class="v-preset-icon">🖼️</span>
                  <span class="v-preset-title">Poster</span>
                </div>
                <span class="v-preset-desc">Cores sólidas</span>
              </button>
              <button type="button" class="v-preset-btn" data-preset="grayscale">
                <div class="v-preset-head">
                  <span class="v-preset-icon">🩶</span>
                  <span class="v-preset-title">Cinza</span>
                </div>
                <span class="v-preset-desc">Monocromático</span>
              </button>
            </div>
          </div>

          <!-- Ajustes Avançados -->
          <details class="v-advanced-details">
            <summary class="v-advanced-summary">
              <span>Configurações Avançadas de Traçado</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </summary>
            <div class="v-advanced-body">
              <div class="v-range-row">
                <div class="v-range-header">
                  <label for="v-colors-range">Número de Cores</label>
                  <span id="v-colors-val" class="v-val-badge">2</span>
                </div>
                <input type="range" id="v-colors-range" min="2" max="64" value="2" class="v-slider">
              </div>

              <div class="v-range-row">
                <div class="v-range-header">
                  <label for="v-blur-range">Filtro de Ruído / Suavização</label>
                  <span id="v-blur-val" class="v-val-badge">0</span>
                </div>
                <input type="range" id="v-blur-range" min="0" max="8" value="0" class="v-slider">
              </div>

              <div class="v-range-row">
                <div class="v-range-header">
                  <label for="v-omit-range">Omitir Ruídos Menores (pixels)</label>
                  <span id="v-omit-val" class="v-val-badge">8</span>
                </div>
                <input type="range" id="v-omit-range" min="0" max="64" value="8" class="v-slider">
              </div>

              <div class="v-range-row">
                <div class="v-range-header">
                  <label for="v-bgtol-range">Tolerância da Remoção de Fundo</label>
                  <span id="v-bgtol-val" class="v-val-badge">32</span>
                </div>
                <input type="range" id="v-bgtol-range" min="5" max="100" value="32" class="v-slider">
              </div>
            </div>
          </details>

          <!-- Botão Principal de Conversão -->
          <button type="button" id="v-convert-btn" class="img2vector-primary-btn" disabled>
            ${ICONS.toolVector(18)}
            <span>Vetorizar Imagem para SVG</span>
          </button>
        </div>

        <!-- Coluna Direita: Painel de Visualização & Exportação -->
        <div class="img2vector-preview-panel">

          <!-- Estado Vazio -->
          <div class="v-empty-view" id="v-empty-view">
            <div class="v-empty-illustration">
              ${ICONS.toolVector(48)}
            </div>
            <h3 class="v-empty-title">Nenhum vetor gerado</h3>
            <p class="v-empty-desc">Carregue uma imagem rasterizada e clique em "Vetorizar Imagem para SVG" para visualizar o resultado.</p>
          </div>

          <!-- Estado Processando com Barra de Progresso Real -->
          <div class="v-loading-view" id="v-loading-view" style="display: none;">
            <div class="open-tool-progress-panel">
              <div class="open-tool-progress-icon-wrap">
                <div class="open-tool-progress-pulse-ring"></div>
                <div class="open-tool-progress-spinner"></div>
              </div>
              <div class="open-tool-progress-header">
                <h4 class="open-tool-progress-title" id="v-loading-title">Vetorizando imagem para SVG...</h4>
                <span class="open-tool-progress-percentage" id="v-progress-pct">0%</span>
              </div>
              <div class="open-tool-progress-track">
                <div class="open-tool-progress-fill" id="v-progress-fill" style="width: 0%;"></div>
              </div>
              <div class="open-tool-progress-footer">
                <span class="open-tool-progress-desc" id="v-loading-desc">Iniciando análise de contornos e paleta...</span>
                <span class="open-tool-progress-counter" id="v-progress-counter">Etapa 1 / 4</span>
              </div>
            </div>
          </div>

          <!-- Resultado do Vetor -->
          <div class="v-result-view" id="v-result-view" style="display: none;">
            <!-- Barra de Modos de Visualização -->
            <div class="v-view-modes">
              <div class="v-segmented-ctrl">
                <button type="button" class="v-mode-btn v-mode-btn--active" data-mode="vector">Vetor SVG</button>
                <button type="button" class="v-mode-btn" data-mode="original">Original</button>
                <button type="button" class="v-mode-btn" data-mode="side">Lado a Lado</button>
              </div>
              <div class="v-zoom-ctrls">
                <button type="button" id="v-zoom-out" class="v-zoom-btn" title="Diminuir Zoom">−</button>
                <span id="v-zoom-val">100%</span>
                <button type="button" id="v-zoom-in" class="v-zoom-btn" title="Aumentar Zoom">+</button>
              </div>
            </div>

            <!-- Palco de Renderização -->
            <div class="v-stage" id="v-stage">
              <div class="v-stage-content" id="v-stage-content">
                <div id="v-svg-output" class="v-svg-container"></div>
                <img id="v-orig-output" class="v-orig-container" alt="Imagem original" style="display: none;">
              </div>
            </div>

            <!-- Metadados do Vetor -->
            <div class="v-meta-bar">
              <div class="v-meta-item">
                <span class="v-meta-label">Caminhos / Paths:</span>
                <strong id="v-meta-paths" class="v-meta-val">0</strong>
              </div>
              <div class="v-meta-item">
                <span class="v-meta-label">Cores na Paleta:</span>
                <strong id="v-meta-colors" class="v-meta-val">0</strong>
              </div>
              <div class="v-meta-item">
                <span class="v-meta-label">Tamanho SVG:</span>
                <strong id="v-meta-size" class="v-meta-val">0 KB</strong>
              </div>
            </div>

            <!-- Ações de Exportação e Limpeza -->
            <div class="v-actions-bar">
              <button type="button" id="v-clear-btn" class="v-export-btn v-export-btn--secondary" title="Limpar e vetorizar outra imagem">
                ${ICONS.refresh(15)}
                Nova Imagem
              </button>

              <button type="button" id="v-download-svg" class="v-export-btn v-export-btn--primary">
                ${ICONS.download(15)}
                Baixar SVG
              </button>

              <button type="button" id="v-copy-svg" class="v-export-btn v-export-btn--secondary">
                ${ICONS.copy(15)}
                Copiar Código SVG
              </button>
            </div>

            <div id="v-copy-feedback" class="v-copy-feedback" style="display: none;"></div>
          </div>

        </div>

      </div>

    </div>
  `;
}
