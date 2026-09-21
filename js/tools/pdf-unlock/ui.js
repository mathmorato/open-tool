/**
 * Open Tool — Ferramenta: Desbloquear PDF (pdf-unlock) — Template HTML
 * Inspirado em fadeltd/pdfunlock e Stirling-PDF (100% Client-Side).
 * @version v.2.4.3
 */

import { ICONS } from '../../icons.js';

export function getPdfUnlockHTML() {
  return `
    <div class="pdf-unlock-root">

      <section class="pdf-tool-hero">
        <header class="hero-header">
          <div class="pdf-tool-badge">
            ${ICONS.unlock(12)}
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
            <input type="file" id="u-file-input" accept="application/pdf,.pdf" class="pdf-hidden-input">
            <div class="pdf-dropzone-content" id="u-dropzone-prompt">
              <div class="pdf-dropzone-icon">
                ${ICONS.filePdf(22)}
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
            </div>
          </div>

          <!-- Botão Limpar abaixo do PDF -->
          <button type="button" id="u-clear-input-btn" class="pdf-file-clear-btn" style="display: none;" title="Limpar arquivo e carregar outro">
            ${ICONS.trash(14)}
            <span>Limpar PDF</span>
          </button>

          <!-- Card de Status da Proteção -->
          <div class="pdf-status-card" id="u-status-card">
            <div class="pdf-status-header">
              <div class="pdf-status-title-wrap">
                <span class="pdf-status-icon">${ICONS.lock(16)}</span>
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
                ${ICONS.eye(16)}
              </button>
            </div>
            <span class="pdf-hint">A senha será testada exclusivamente no seu navegador para descriptografar os streams.</span>
          </div>

          <!-- Botão Principal de Desbloqueio (100% de largura) -->
          <button type="button" id="u-unlock-btn" class="pdf-primary-btn" disabled>
            ${ICONS.unlock(16)}
            <span id="u-unlock-btn-text">Desbloquear PDF Agora</span>
          </button>

        </div>

        <!-- Coluna Direita: Painel de Pré-visualização & Download -->
        <div class="pdf-preview-panel">

          <!-- Estado Vazio -->
          <div class="pdf-empty-view" id="u-empty-view">
            <div class="pdf-empty-illustration">
              ${ICONS.unlock(44)}
            </div>
            <h3 class="pdf-empty-title">Nenhum PDF processado</h3>
            <p class="pdf-empty-desc">Carregue um arquivo PDF protegido para visualizar a prévia da página e remover as restrições.</p>
          </div>

          <!-- Estado Processando com Barra de Progresso Real -->
          <div class="pdf-loading-view" id="u-loading-view" style="display: none;">
            <div class="open-tool-progress-panel">
              <div class="open-tool-progress-icon-wrap">
                <div class="open-tool-progress-pulse-ring"></div>
                <div class="open-tool-progress-spinner"></div>
              </div>
              <div class="open-tool-progress-header">
                <h4 class="open-tool-progress-title" id="u-loading-title">Descriptografando documento...</h4>
                <span class="open-tool-progress-percentage" id="u-progress-pct">0%</span>
              </div>
              <div class="open-tool-progress-track">
                <div class="open-tool-progress-fill" id="u-progress-fill" style="width: 0%;"></div>
              </div>
              <div class="open-tool-progress-footer">
                <span class="open-tool-progress-desc" id="u-loading-desc">Iniciando análise de permissões...</span>
                <span class="open-tool-progress-counter" id="u-progress-counter">0 / 0</span>
              </div>
            </div>
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

            <!-- Ações de Download, Cópia e Limpeza para Novo Arquivo -->
            <div class="pdf-actions-bar">
              <button type="button" id="u-result-clear-btn" class="pdf-export-btn pdf-export-btn--secondary" title="Limpar e desbloquear outro PDF">
                ${ICONS.refresh(15)}
                <span>Novo PDF</span>
              </button>
              <button type="button" id="u-copy-text-btn" class="pdf-export-btn pdf-export-btn--secondary" title="Copiar todo o texto do PDF">
                ${ICONS.copy(15)}
                <span id="u-copy-btn-text">Copiar Texto</span>
              </button>
              <button type="button" id="u-download-btn" class="pdf-export-btn pdf-export-btn--primary" title="Baixar arquivo PDF totalmente desbloqueado">
                ${ICONS.download(15)}
                <span>Baixar PDF</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  `;
}
