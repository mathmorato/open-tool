/**
 * Open Tool — Ferramenta: Mesclar PDF (pdf-merge) — Template HTML
 * Inspirado no Stirling-PDF Merge (100% Client-Side).
 * @version v.2.4.3
 */

import { ICONS } from '../../icons.js';

export function getPdfMergeHTML() {
  return `
    <div class="pdf-merge-root">

      <section class="pdf-tool-hero">
        <header class="hero-header">
          <div class="pdf-tool-badge">
            ${ICONS.toolMerge(14)}
            Junção Sequencial de Documentos
          </div>
          <h2 class="hero-title">Mesclar PDF</h2>
          <p class="hero-subtitle">
            Combine múltiplos documentos PDF em um único arquivo ordenado. Reorganize a sequência e junte tudo instantaneamente no seu navegador.
          </p>
        </header>
      </section>

      <div class="pdf-workspace">

        <!-- Coluna Esquerda: Entrada & Fila de Mesclagem -->
        <div class="pdf-controls-panel">

          <!-- Dropzone para múltiplos arquivos -->
          <div class="pdf-dropzone" id="m-dropzone" tabindex="0" role="button" aria-label="Adicionar arquivos PDF para mesclar">
            <input type="file" id="m-file-input" accept="application/pdf,.pdf" multiple class="pdf-hidden-input">
            <div class="pdf-dropzone-content" id="m-dropzone-prompt">
              <div class="pdf-dropzone-icon">
                ${ICONS.plus(22)}
              </div>
              <div class="pdf-dropzone-text">
                <p class="pdf-dropzone-title">Adicione PDFs ou <span class="pdf-link">selecione</span></p>
                <p class="pdf-dropzone-sub">Selecione 2 ou mais arquivos para juntar</p>
              </div>
            </div>
          </div>

          <!-- Lista Compacta de Arquivos -->
          <div class="pdf-merge-list-wrap">
            <div class="pdf-merge-list-header">
              <span class="pdf-label">Fila de Documentos (<span id="m-count-badge">0</span>)</span>
              <button type="button" id="m-clear-btn" class="pdf-link-btn" style="display: none;" title="Limpar todos os arquivos da lista">
                ${ICONS.trash(13)}
                <span>Limpar fila</span>
              </button>
            </div>
            <div class="pdf-merge-list" id="m-file-list">
              <div class="pdf-merge-empty-list" id="m-list-empty">
                Nenhum PDF adicionado à lista.
              </div>
            </div>
          </div>

          <!-- Botão Principal de Mesclagem -->
          <button type="button" id="m-merge-btn" class="pdf-primary-btn" disabled>
            ${ICONS.toolMerge(16)}
            <span>Mesclar PDFs</span>
          </button>

        </div>

        <!-- Coluna Direita: Pré-visualização & Resultado -->
        <div class="pdf-preview-panel">

          <!-- Estado Vazio -->
          <div class="pdf-empty-view" id="m-empty-view">
            <div class="pdf-empty-illustration">
              ${ICONS.toolMerge(40)}
            </div>
            <h3 class="pdf-empty-title">Nenhum PDF mesclado</h3>
            <p class="pdf-empty-desc">Adicione ao menos dois arquivos na lista e clique em "Mesclar PDFs" para gerar o documento unificado.</p>
          </div>

          <!-- Estado Processando com Barra de Progresso Real -->
          <div class="pdf-loading-view" id="m-loading-view" style="display: none;">
            <div class="open-tool-progress-panel">
              <div class="open-tool-progress-icon-wrap">
                <div class="open-tool-progress-pulse-ring"></div>
                <div class="open-tool-progress-spinner"></div>
              </div>
              <div class="open-tool-progress-header">
                <h3 class="open-tool-progress-title" id="m-loading-title">Combinando páginas dos documentos...</h3>
                <span class="open-tool-progress-percentage" id="m-progress-pct">0%</span>
              </div>
              <div class="open-tool-progress-track">
                <div class="open-tool-progress-fill" id="m-progress-fill" style="width: 0%;"></div>
              </div>
              <div class="open-tool-progress-footer">
                <span class="open-tool-progress-desc" id="m-loading-desc">Iniciando leitura dos arquivos...</span>
                <span class="open-tool-progress-counter" id="m-progress-counter">0 / 0</span>
              </div>
            </div>
          </div>

          <!-- Estado Resultado -->
          <div class="pdf-result-view" id="m-result-view" style="display: none;">

            <div class="pdf-result-header">
              <span class="pdf-badge pdf-badge--success">${ICONS.check(13)} PDFs Mesclados</span>
              <span class="pdf-result-summary" id="m-result-summary">Documento unificado com sucesso</span>
            </div>

            <!-- Palco de Preview -->
            <div class="pdf-stage" id="m-stage">
              <canvas id="m-preview-canvas" class="pdf-preview-canvas"></canvas>
            </div>

            <!-- Metadados -->
            <div class="pdf-meta-bar">
              <div class="pdf-meta-item">
                <span class="pdf-meta-label">Arquivos Unidos:</span>
                <strong id="m-meta-docs" class="pdf-meta-val">0</strong>
              </div>
              <div class="pdf-meta-item">
                <span class="pdf-meta-label">Total de Páginas:</span>
                <strong id="m-meta-pages" class="pdf-meta-val">0</strong>
              </div>
              <div class="pdf-meta-item">
                <span class="pdf-meta-label">Tamanho Final:</span>
                <strong id="m-meta-size" class="pdf-meta-val">0 KB</strong>
              </div>
            </div>

            <!-- Ações do Resultado: Baixar e Novos PDFs -->
            <div class="pdf-actions-bar">
              <button type="button" id="m-result-clear-btn" class="pdf-export-btn pdf-export-btn--secondary" title="Mesclar outros documentos PDF">
                ${ICONS.refresh(15)}
                <span>Novos PDFs</span>
              </button>
              <button type="button" id="m-download-btn" class="pdf-export-btn pdf-export-btn--primary">
                ${ICONS.download(15)}
                <span>Baixar PDF Mesclado</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  `;
}
