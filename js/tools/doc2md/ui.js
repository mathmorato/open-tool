/**
 * Open Tool — Doc2MD — Template HTML
 * Retorna o HTML completo da ferramenta de conversão de documentos para Markdown.
 * Extraído de index.html v.1.9.0 e adaptado para injeção dinâmica.
 * @version v.2.0.0
 */

import { ICONS } from '../../icons.js';

export function getDoc2mdHTML() {
  return `
    <div class="doc2md-tool-root">

      <!-- Seção de Apresentação & Dropzone -->
      <section class="hero-section">
        <!-- Cabeçalho Principal -->
        <header class="hero-header">
          <h2 class="hero-title">Conversor Universal &amp; Mesclador de Documentos para Markdown</h2>
          <p class="hero-subtitle">
            Converta, descompacte e unifique documentos, planilhas, apresentações, PDFs e pacotes (.zip/.rar) diretamente no navegador. 100% privado, local e sem dependência de servidores.
          </p>
        </header>

        <!-- Área da Dropzone -->
        <div class="dropzone-container">
          <label for="file-input" class="dropzone" id="dropzone" tabindex="0">
            <div class="dropzone-icon dropzone-icon-wrap" aria-hidden="true">
              ${ICONS.upload(28, 'upload-icon-svg')}
            </div>

            <p class="dropzone-main-text dropzone-prompt">
              Arraste e solte seus arquivos ou pacotes (.zip, .rar) aqui, ou clique no botão abaixo
            </p>

            <button type="button" id="btn-browse" class="btn btn-primary btn-browse">
              ${ICONS.upload(16)}
              Selecionar Arquivo do Computador
            </button>

            <p class="dropzone-subtext dropzone-subprompt">
              Suporta upload em lote, descompactação automática e colagem de arquivos/texto (Ctrl+V)
            </p>

            <div class="format-badges-list format-tags">
              <span class="format-badge format-tag">.docx</span>
              <span class="format-badge format-tag">.xlsx</span>
              <span class="format-badge format-tag">.csv</span>
              <span class="format-badge format-tag">.ods</span>
              <span class="format-badge format-tag">.pptx</span>
              <span class="format-badge format-tag">.pdf</span>
              <span class="format-badge format-tag">.txt</span>
              <span class="format-badge format-tag">.json</span>
              <span class="format-badge format-tag">.yml</span>
              <span class="format-badge format-tag">.yaml</span>
              <span class="format-badge format-tag">.html</span>
              <span class="format-badge format-tag">.rtf</span>
              <span class="format-badge format-tag">.js</span>
              <span class="format-badge format-tag">.py</span>
              <span class="format-badge format-tag">.m</span>
              <span class="format-badge format-tag">.lua</span>
              <span class="format-badge format-tag">.cpp</span>
              <span class="format-badge format-tag">.rs</span>
              <span class="format-badge format-tag">.sh</span>
              <span class="format-badge format-tag">.zip</span>
              <span class="format-badge format-tag">.rar</span>
              <span class="format-badge format-tag highlight">+algumas linguagens de código</span>
            </div>

            <div class="limit-indicator limit-badge" title="Tamanho máximo suportado por documento">
              <span class="icon-info">ⓘ</span>
              <span>Limite máximo: <strong>1,5 GB</strong> por arquivo ou pacote compactado</span>
            </div>

            <input type="file" id="file-input" class="visually-hidden" multiple style="position: absolute; left: -9999px; opacity: 0;" aria-label="Selecionar arquivos" />
          </label>
        </div>

        <!-- Telemetria e Diagnóstico Visual Técnico (oculto por padrão) -->
        <div id="debug-status" class="debug-status" aria-live="polite" style="display: none;"></div>
      </section>

      <!-- Fila de Documentos & Progresso em Lote (File Queue Section) -->
      <section id="file-queue-section" class="file-queue-section" style="display: none;" aria-label="Fila de arquivos para conversão">
        <div class="file-queue-card">
          <div class="file-queue-header queue-header">
            <!-- LINHA 1: BARRA SUPERIOR FIXA E IMUTÁVEL -->
            <div class="queue-header-main">
              <div class="file-queue-title-wrap queue-header-title">
                <div class="file-queue-icon icon-queue" aria-hidden="true">
                  ${ICONS.fileText(18)}
                </div>
                <h3 class="file-queue-title">
                  Fila de Documentos
                  <span class="file-queue-counter badge-count" id="queue-counter">0 arquivos</span>
                </h3>
              </div>

              <div class="queue-header-actions queue-header-controls">
                <label class="toggle-switch" for="toggle-merge-markdown" title="Compilar todos os arquivos convertidos em um único documento Markdown consolidado">
                  <input type="checkbox" id="toggle-merge-markdown">
                  <span class="toggle-slider"></span>
                  <span class="toggle-label">Mesclar arquivos em um único .md</span>
                </label>

                <div class="queue-buttons-group queue-static-buttons">
                  <button type="button" id="btn-queue-download-all" class="btn btn-secondary btn-sm" title="Baixar todos os documentos convertidos em arquivo .zip">
                    ${ICONS.download(14)}
                    Baixar Todos (.zip)
                  </button>
                  <button type="button" id="btn-queue-clear" class="btn btn-ghost btn-sm" title="Limpar todos os arquivos da fila">
                    ${ICONS.trash(14)}
                    Limpar Todos
                  </button>
                </div>
              </div>
            </div>

            <!-- LINHA 2: ÁREA EXCLUSIVA PARA DOWNLOAD UNIFICADO & ORDENAÇÃO (SURGE ABAIXO) -->
            <div id="unified-action-row" class="unified-action-row unified-download-container" style="display: none;">
              <div class="merge-sort-container">
                <button type="button" id="btn-sort-files" class="btn-sort" title="Classificar arquivos por ordem alfabética">
                  <svg class="sort-icon icon-desc" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: none;">
                    <line x1="5" y1="4" x2="5" y2="20" />
                    <polyline points="2 17 5 20 8 17" />
                    <line x1="11" y1="5" x2="21" y2="5" />
                    <line x1="11" y1="10" x2="18" y2="10" />
                    <line x1="11" y1="15" x2="15" y2="15" />
                    <line x1="11" y1="20" x2="13" y2="20" />
                  </svg>
                  <svg class="sort-icon icon-asc" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="5" y1="20" x2="5" y2="4" />
                    <polyline points="2 7 5 4 8 7" />
                    <line x1="11" y1="5" x2="13" y2="5" />
                    <line x1="11" y1="10" x2="15" y2="10" />
                    <line x1="11" y1="15" x2="18" y2="15" />
                    <line x1="11" y1="20" x2="21" y2="20" />
                  </svg>
                  <span id="sort-files-label">Classificar A-Z</span>
                </button>
              </div>
              <button type="button" id="btn-download-unified" class="btn btn-primary btn-sm btn-unified btn-unified-pulse btn-queue-download-merged" title="Baixar todos os documentos mesclados em um único arquivo .md">
                <span class="icon-merge">
                  ${ICONS.download(14)}
                </span>
                Baixar Markdown Unificado (.md)
              </button>

              <!-- CARD DE TELEMETRIA DE TOTAL DE BYTES DO MD -->
              <div id="queue-total-bytes-card" class="queue-total-bytes-card">
                <span class="total-bytes-icon" aria-hidden="true">
                  ${ICONS.fileText(16)}
                </span>
                <span class="total-bytes-label">Tamanho do MD:</span>
                <span class="total-bytes-values">
                  <strong id="live-total-bytes-counter" class="live-total-bytes-counter">0</strong>
                  <span id="live-total-formatted-unit" class="live-total-formatted-unit">kB</span>
                </span>
              </div>
            </div>

            <!-- BARRA DE PROGRESSO DE CONSOLIDAÇÃO & EXPORTAÇÃO ASSÍNCRONA -->
            <div id="consolidation-progress" class="consolidation-progress-bar" style="display: none;">
              <div class="consolidation-header">
                <span class="consolidation-label">
                  <span class="consolidation-spinner-icon" id="consolidation-spinner-icon" aria-hidden="true">
                    <svg viewBox="0 0 100 100" class="radial-spinner-svg">
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
                  </span>
                  <span id="consolidation-status-text">Consolidando:</span>
                </span>
                <strong id="consolidation-counter" class="consolidation-counter">0 / 0 (0%)</strong>
              </div>
              <div class="consolidation-track">
                <div id="consolidation-fill" class="consolidation-fill" style="width: 0%;"></div>
              </div>
            </div>
          </div>

          <!-- BARRA DE CARREGAMENTO / PROGRESSO GLOBAL PARA LOTES (> 10 ARQUIVOS) -->
          <div id="batch-global-progress" class="batch-global-progress" style="display: none;">
            <div class="global-progress-header">
              <span class="global-progress-label">
                <span class="batch-spinner-icon" id="batch-spinner-icon" aria-hidden="true">
                  <svg viewBox="0 0 100 100" class="radial-spinner-svg">
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
                  <svg viewBox="0 0 24 24" class="batch-success-check-svg" style="display: none;" width="18" height="18" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                Progresso do Lote
              </span>
              <span id="global-progress-counter" class="global-progress-counter">0 / 0 concluídos (0%)</span>
            </div>
            <div class="global-progress-track">
              <div id="global-progress-fill" class="global-progress-fill" style="width: 0%;"></div>
            </div>
          </div>

          <div id="file-queue-list" class="file-queue-list" role="list">
            <!-- Itens da fila renderizados dinamicamente -->
          </div>
        </div>
      </section>

    </div>
  `;
}
