/**
 * Open Tool — Ferramenta: Mesclar PDF (pdf-merge) — Template HTML
 * Inspirado no Stirling-PDF Merge (100% Client-Side).
 * @version v.2.3.0
 */

export function getPdfMergeHTML() {
  return `
    <div class="pdf-merge-root">

      <section class="pdf-tool-hero">
        <header class="hero-header">
          <div class="pdf-tool-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"></path>
              <polyline points="10 9 9 9 8 9"></polyline>
              <line x1="12" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
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
            <input type="file" id="m-file-input" accept="application/pdf" multiple class="pdf-hidden-input">
            <div class="pdf-dropzone-content" id="m-dropzone-prompt">
              <div class="pdf-dropzone-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
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
              <button type="button" id="m-clear-btn" class="pdf-link-btn" style="display: none;">Limpar fila</button>
            </div>
            <div class="pdf-merge-list" id="m-file-list">
              <div class="pdf-merge-empty-list" id="m-list-empty">
                Nenhum PDF adicionado à lista.
              </div>
            </div>
          </div>

          <!-- Botão Principal de Mesclagem -->
          <button type="button" id="m-merge-btn" class="pdf-primary-btn" disabled>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"></path>
              <line x1="12" y1="11" x2="12" y2="17"></line>
              <line x1="9" y1="14" x2="15" y2="14"></line>
            </svg>
            <span>Mesclar PDFs</span>
          </button>

        </div>

        <!-- Coluna Direita: Pré-visualização & Resultado -->
        <div class="pdf-preview-panel">

          <!-- Estado Vazio -->
          <div class="pdf-empty-view" id="m-empty-view">
            <div class="pdf-empty-illustration">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
            </div>
            <h3 class="pdf-empty-title">Nenhum PDF mesclado</h3>
            <p class="pdf-empty-desc">Adicione ao menos dois arquivos na lista e clique em "Mesclar PDFs" para gerar o documento unificado.</p>
          </div>

          <!-- Estado Processando -->
          <div class="pdf-loading-view" id="m-loading-view" style="display: none;">
            <div class="pdf-spinner"></div>
            <h3 class="pdf-loading-title">Combinando páginas dos documentos...</h3>
            <p class="pdf-loading-desc">Organizando páginas sequenciais em novo PDF.</p>
          </div>

          <!-- Estado Resultado -->
          <div class="pdf-result-view" id="m-result-view" style="display: none;">

            <div class="pdf-result-header">
              <span class="pdf-badge pdf-badge--success">✓ PDFs Mesclados</span>
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

            <!-- Ação de Download -->
            <div class="pdf-actions-bar">
              <button type="button" id="m-download-btn" class="pdf-export-btn pdf-export-btn--primary">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Baixar PDF Mesclado
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  `;
}
