/**
 * Open Tool — Ferramenta: Dividir PDF (pdf-split) — Template HTML
 * Inspirado em docnet e Stirling-PDF (100% Client-Side).
 * @version v.2.4.3
 */

import { ICONS } from '../../icons.js';

export function getPdfSplitHTML() {
  return `
    <div class="pdf-split-root">

      <section class="pdf-tool-hero">
        <header class="hero-header">
          <div class="pdf-tool-badge">
            ${ICONS.toolSplit(14)}
            Divisão &amp; Extração Local
          </div>
          <h2 class="hero-title">Dividir PDF</h2>
          <p class="hero-subtitle">
            Separe páginas, extraia intervalos específicos ou desmembre cada página em arquivos individuais. 100% local — zero envio a servidores.
          </p>
        </header>
      </section>

      <div class="pdf-workspace">

        <!-- Coluna Esquerda: Entrada & Controles de Divisão -->
        <div class="pdf-controls-panel">

          <!-- Dropzone Compacto -->
          <div class="pdf-dropzone" id="s-dropzone" tabindex="0" role="button" aria-label="Carregar arquivo PDF para dividir">
            <input type="file" id="s-file-input" accept="application/pdf,.pdf" class="pdf-hidden-input">
            <div class="pdf-dropzone-content" id="s-dropzone-prompt">
              <div class="pdf-dropzone-icon">
                ${ICONS.filePdf(22)}
              </div>
              <div class="pdf-dropzone-text">
                <p class="pdf-dropzone-title">Arraste um PDF ou <span class="pdf-link">selecione</span></p>
                <p class="pdf-dropzone-sub">Qualquer arquivo .PDF com múltiplas páginas</p>
              </div>
            </div>

            <!-- Preview do Arquivo Carregado -->
            <div class="pdf-file-loaded" id="s-file-loaded" style="display: none;">
              <div class="pdf-icon-badge">PDF</div>
              <div class="pdf-loaded-info">
                <span class="pdf-filename" id="s-filename">documento.pdf</span>
                <span class="pdf-filesize" id="s-filesize">0 KB</span>
              </div>
              <button type="button" class="pdf-remove-btn" id="s-remove-btn" title="Remover e carregar outro">
                ${ICONS.x(14)}
              </button>
            </div>
          </div>

          <!-- Modos de Divisão (4 Opções Compactas) -->
          <div class="pdf-ctrl-group">
            <label class="pdf-label">Modo de Divisão</label>
            <div class="pdf-mode-grid">
              <button type="button" class="pdf-mode-btn pdf-mode-btn--active" data-mode="ranges">
                <span class="pdf-mode-title">Intervalos</span>
                <span class="pdf-mode-desc">Ex: 1-3, 4-6</span>
              </button>
              <button type="button" class="pdf-mode-btn" data-mode="extract">
                <span class="pdf-mode-title">Extrair</span>
                <span class="pdf-mode-desc">Ex: 1, 3, 5</span>
              </button>
              <button type="button" class="pdf-mode-btn" data-mode="all">
                <span class="pdf-mode-title">Todas</span>
                <span class="pdf-mode-desc">1 por página</span>
              </button>
              <button type="button" class="pdf-mode-btn" data-mode="every">
                <span class="pdf-mode-title">A cada N</span>
                <span class="pdf-mode-desc">Blocos fixos</span>
              </button>
            </div>
          </div>

          <!-- Configuração Específica do Modo Ativo -->
          <div class="pdf-ctrl-group" id="s-mode-param-group">
            <div id="s-param-ranges">
              <div class="pdf-field-header">
                <label for="s-ranges-input" class="pdf-label">Intervalos de Páginas</label>
                <span class="pdf-field-hint" id="s-max-pages-hint">Total: - págs</span>
              </div>
              <input type="text" id="s-ranges-input" class="pdf-text-input" placeholder="Ex: 1-2, 3-5" value="1-2">
              <p class="pdf-input-help">Separe intervalos com vírgula (ex: 1-3, 4-6, 7-10).</p>
            </div>

            <div id="s-param-extract" style="display: none;">
              <div class="pdf-field-header">
                <label for="s-extract-input" class="pdf-label">Páginas para Extrair</label>
                <span class="pdf-field-hint" id="s-extract-hint">Total: - págs</span>
              </div>
              <input type="text" id="s-extract-input" class="pdf-text-input" placeholder="Ex: 1, 3, 5" value="1">
              <p class="pdf-input-help">Gera 1 único PDF com as páginas escolhidas.</p>
            </div>

            <div id="s-param-all" style="display: none;">
              <div class="pdf-info-banner">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <span>Cada página será exportada como um PDF separado compactado em um único pacote .ZIP.</span>
              </div>
            </div>

            <div id="s-param-every" style="display: none;">
              <div class="pdf-field-header">
                <label for="s-every-input" class="pdf-label">Dividir a cada quantas páginas?</label>
              </div>
              <div class="pdf-number-row">
                <input type="number" id="s-every-input" class="pdf-number-input" min="1" max="100" value="2">
                <span class="pdf-number-unit">páginas por arquivo</span>
              </div>
            </div>
          </div>

          <!-- Card de Resumo de Saída -->
          <div class="pdf-summary-card" id="s-summary-card">
            <div class="pdf-summary-item">
              <span class="pdf-summary-label">Documento Original</span>
              <span class="pdf-summary-val" id="s-sum-orig-pages">0 páginas</span>
            </div>
            <div class="pdf-summary-divider"></div>
            <div class="pdf-summary-item">
              <span class="pdf-summary-label">Arquivos de Saída</span>
              <span class="pdf-summary-badge" id="s-sum-out-count">0 arquivos</span>
            </div>
          </div>

          <!-- Ações de Entrada: Limpar e Dividir -->
          <div class="pdf-controls-actions" id="s-controls-actions">
            <button type="button" id="s-clear-input-btn" class="pdf-secondary-btn" style="display: none;" title="Limpar arquivo e carregar outro">
              ${ICONS.trash(15)}
              <span>Limpar</span>
            </button>
            <button type="button" id="s-split-btn" class="btn-primary pdf-action-cta" disabled>
              ${ICONS.toolSplit(16)}
              <span id="s-split-btn-text">Dividir PDF Agora</span>
            </button>
          </div>

        </div>

        <!-- Coluna Direita: Pré-visualização & Saída -->
        <div class="pdf-preview-panel">

          <!-- Estado Vazio -->
          <div class="pdf-stage-empty" id="s-empty-view">
            <div class="pdf-empty-icon">
              ${ICONS.toolSplit(36)}
            </div>
            <p class="pdf-empty-text">Carregue um documento PDF à esquerda para configurar as páginas e dividir</p>
          </div>

          <!-- Estado Processando com Barra de Progresso Real -->
          <div class="pdf-stage-loading" id="s-loading-view" style="display: none;">
            <div class="open-tool-progress-panel">
              <div class="open-tool-progress-icon-wrap">
                <div class="open-tool-progress-pulse-ring"></div>
                <div class="open-tool-progress-spinner"></div>
              </div>
              <div class="open-tool-progress-header">
                <h4 class="open-tool-progress-title" id="s-loading-title">Dividindo documento PDF...</h4>
                <span class="open-tool-progress-percentage" id="s-progress-pct">0%</span>
              </div>
              <div class="open-tool-progress-track">
                <div class="open-tool-progress-fill" id="s-progress-fill" style="width: 0%;"></div>
              </div>
              <div class="open-tool-progress-footer">
                <span class="open-tool-progress-desc" id="s-loading-desc">Extração direta na memória local...</span>
                <span class="open-tool-progress-counter" id="s-progress-counter">0 / 0 partes</span>
              </div>
            </div>
          </div>

          <!-- Estado Resultado -->
          <div class="pdf-stage-result" id="s-result-view" style="display: none;">
            <div class="pdf-result-header">
              <div class="pdf-badge pdf-badge--success" id="s-result-badge">Divisão Concluída</div>
              <span class="pdf-result-sub" id="s-result-summary">Arquivos gerados com sucesso</span>
            </div>

            <!-- Canvas com miniatura da primeira página gerada -->
            <div class="pdf-canvas-wrap">
              <canvas id="s-preview-canvas" class="pdf-preview-canvas"></canvas>
            </div>

            <!-- Métricas Técnicas -->
            <div class="pdf-meta-grid">
              <div class="pdf-meta-item">
                <span class="pdf-meta-label">Arquivos Criados</span>
                <span class="pdf-meta-val" id="s-meta-files">1</span>
              </div>
              <div class="pdf-meta-item">
                <span class="pdf-meta-label">Páginas Extraídas</span>
                <span class="pdf-meta-val" id="s-meta-pages">1</span>
              </div>
              <div class="pdf-meta-item">
                <span class="pdf-meta-label">Tamanho do Pacote</span>
                <span class="pdf-meta-val" id="s-meta-size">0 KB</span>
              </div>
            </div>

            <!-- Download e Novo PDF -->
            <div class="pdf-result-actions">
              <button type="button" id="s-result-clear-btn" class="pdf-export-btn pdf-export-btn--secondary" title="Dividir outro documento PDF">
                ${ICONS.refresh(15)}
                <span>Novo PDF</span>
              </button>
              <button type="button" id="s-download-btn" class="btn-primary pdf-download-btn">
                ${ICONS.download(15)}
                <span id="s-download-btn-text">Baixar Arquivos</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  `;
}
