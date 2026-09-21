/**
 * Open Tool — Ferramenta: Desbloquear PDF (pdf-unlock) — Template HTML
 * Inspirado em fadeltd/pdfunlock e Stirling-PDF (100% Client-Side).
 * @version v.2.3.0
 */

export function getPdfUnlockHTML() {
  return `
    <div class="pdf-unlock-root">

      <section class="pdf-tool-hero">
        <header class="hero-header">
          <div class="pdf-tool-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
            </svg>
            Desbloqueio Criptográfico Local
          </div>
          <h2 class="hero-title">Desbloquear PDF</h2>
          <p class="hero-subtitle">
            Remova senhas e restrições de permissões (edição, cópia, impressão) de documentos PDF. 100% local — zero envio a servidores.
          </p>
        </header>
      </section>

      <div class="pdf-workspace">

        <!-- Coluna Esquerda: Entrada & Controles -->
        <div class="pdf-controls-panel">

          <!-- Dropzone Compacto -->
          <div class="pdf-dropzone" id="u-dropzone" tabindex="0" role="button" aria-label="Carregar arquivo PDF para desbloquear">
            <input type="file" id="u-file-input" accept="application/pdf" class="pdf-hidden-input">
            <div class="pdf-dropzone-content" id="u-dropzone-prompt">
              <div class="pdf-dropzone-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
              </div>
              <div class="pdf-dropzone-text">
                <p class="pdf-dropzone-title">Arraste um PDF ou <span class="pdf-link">selecione</span></p>
                <p class="pdf-dropzone-sub">Qualquer arquivo .PDF protegido ou restrito</p>
              </div>
            </div>

            <!-- Preview do Arquivo Carregado -->
            <div class="pdf-file-loaded" id="u-file-loaded" style="display: none;">
              <div class="pdf-icon-badge">PDF</div>
              <div class="pdf-loaded-info">
                <span class="pdf-filename" id="u-filename">documento.pdf</span>
                <span class="pdf-filesize" id="u-filesize">0 KB</span>
              </div>
              <button type="button" class="pdf-remove-btn" id="u-remove-btn" title="Trocar arquivo">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          <!-- Card de Status da Proteção -->
          <div class="pdf-status-card" id="u-status-card">
            <div class="pdf-status-header">
              <div class="pdf-status-title-wrap">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="pdf-status-icon">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span class="pdf-status-title">Status da Criptografia</span>
              </div>
              <span class="pdf-badge" id="u-lock-badge">Aguardando Arquivo</span>
            </div>
            <p class="pdf-status-desc" id="u-status-desc">
              Carregue um PDF para inspecionar permissões de impressão, cópia e proteção por chave criptográfica.
            </p>
          </div>

          <!-- Campo de Senha (Condicional/Dinâmico) -->
          <div class="pdf-password-group" id="u-password-group" style="display: none;">
            <label for="u-password-input" class="pdf-label">Senha de Abertura do Documento</label>
            <div class="pdf-password-wrap">
              <input type="password" id="u-password-input" class="pdf-input" placeholder="Digite a senha do PDF...">
              <button type="button" id="u-toggle-pwd-btn" class="pdf-pwd-toggle" title="Exibir/ocultar senha">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
            <span class="pdf-hint">A senha será testada exclusivamente no seu navegador para descriptografar os streams.</span>
          </div>

          <!-- Botão Principal de Desbloqueio -->
          <button type="button" id="u-unlock-btn" class="pdf-primary-btn" disabled>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
            </svg>
            <span id="u-unlock-btn-text">Desbloquear PDF</span>
          </button>

        </div>

        <!-- Coluna Direita: Painel de Pré-visualização & Download -->
        <div class="pdf-preview-panel">

          <!-- Estado Vazio -->
          <div class="pdf-empty-view" id="u-empty-view">
            <div class="pdf-empty-illustration">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
              </svg>
            </div>
            <h3 class="pdf-empty-title">Nenhum PDF processado</h3>
            <p class="pdf-empty-desc">Carregue um arquivo PDF protegido para visualizar a prévia da página e remover as restrições.</p>
          </div>

          <!-- Estado Processando -->
          <div class="pdf-loading-view" id="u-loading-view" style="display: none;">
            <div class="pdf-spinner"></div>
            <h3 class="pdf-loading-title">Descriptografando fluxos do documento...</h3>
            <p class="pdf-loading-desc">Removendo certificados de restrição e gerando versão desprotegida.</p>
          </div>

          <!-- Estado Concluído / Resultado -->
          <div class="pdf-result-view" id="u-result-view" style="display: none;">
            
            <div class="pdf-result-header">
              <span class="pdf-badge pdf-badge--success">✓ 100% Desbloqueado</span>
              <span class="pdf-result-summary" id="u-result-summary">Pronto para salvar sem senha</span>
            </div>

            <!-- Palco de Renderização de Página -->
            <div class="pdf-stage" id="u-stage">
              <canvas id="u-preview-canvas" class="pdf-preview-canvas"></canvas>
            </div>

            <!-- Metadados do Arquivo Desbloqueado -->
            <div class="pdf-meta-bar">
              <div class="pdf-meta-item">
                <span class="pdf-meta-label">Páginas:</span>
                <strong id="u-meta-pages" class="pdf-meta-val">0</strong>
              </div>
              <div class="pdf-meta-item">
                <span class="pdf-meta-label">Permissões:</span>
                <strong class="pdf-meta-val" style="color:#10b981;">Totais</strong>
              </div>
              <div class="pdf-meta-item">
                <span class="pdf-meta-label">Tamanho:</span>
                <strong id="u-meta-size" class="pdf-meta-val">0 KB</strong>
              </div>
            </div>

            <!-- Ação de Download -->
            <div class="pdf-actions-bar">
              <button type="button" id="u-download-btn" class="pdf-export-btn pdf-export-btn--primary">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Baixar PDF Desbloqueado
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  `;
}
