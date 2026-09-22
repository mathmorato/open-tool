/**
 * Open Tool — Hub: Todas as Ferramentas (Template HTML)
 * Interface visual inspirada no PDF24 Tools com catálogo em cards modernos
 * @version v.2.4.3
 */

import { ICONS } from '../../icons.js';

export function getHubHTML(catalog = []) {
  const tools = catalog.filter(t => t.id !== 'hub');

  return `
    <div class="hub-root">
      <!-- Cabeçalho Principal do Hub -->
      <section class="hub-hero">
        <div class="hub-hero-badge">
          ${ICONS.shield(14)}
          Plataforma 100% Local &amp; Segura
        </div>
        <h1 class="hub-hero-title">Todas as Ferramentas Open Tool</h1>
        <p class="hub-hero-subtitle">
          Soluções práticas e universais executadas inteiramente no seu navegador. Seus dados nunca saem do seu computador.
        </p>
      </section>

      <!-- Grade de Ferramentas Compactas (Hub Grid) -->
      <div class="hub-grid" id="hub-tools-grid">
        ${tools.map(tool => {
          let badge = 'UTILITÁRIO';

          if (tool.id === 'doc2md') {
            badge = 'CONVERSOR';
          } else if (tool.id === 'qrcode') {
            badge = 'GERADOR';
          } else if (tool.id === 'img2vector') {
            badge = 'VETORIZADOR';
          } else if (tool.id === 'pdf-unlock') {
            badge = 'DESBLOQUEADOR';
          } else if (tool.id === 'pdf-compress') {
            badge = 'COMPRESSOR';
          } else if (tool.id === 'pdf-merge') {
            badge = 'MESCLADOR';
          } else if (tool.id === 'pdf-split') {
            badge = 'DIVISOR';
          }

          return `
            <article class="hub-card" data-tool-card="${tool.id}" tabindex="0" role="button" aria-label="Abrir ferramenta ${tool.label}">
              <div class="hub-card-top">
                <div class="hub-card-icon-wrap" aria-hidden="true">
                  ${tool.icon}
                </div>
                <span class="hub-card-badge">${badge}</span>
              </div>

              <div class="hub-card-content">
                <h2 class="hub-card-title">${tool.label}</h2>
              </div>

              <div class="hub-card-action">
                <button type="button" class="btn btn-primary hub-card-btn" data-open-tool="${tool.id}">
                  <span>Abrir Ferramenta</span>
                  ${ICONS.arrowRight(14)}
                </button>
              </div>
            </article>
          `;
        }).join('')}

        <!-- Card de Extensibilidade (Próximas Ferramentas) -->
        <article class="hub-card hub-card--extensible" title="Arquitetura modular aberta para novas ferramentas">
          <div class="hub-card-top">
            <div class="hub-card-icon-wrap hub-card-icon-wrap--dashed" aria-hidden="true">
              ${ICONS.plus(18)}
            </div>
            <span class="hub-card-badge hub-card-badge--neutral">MODULAR</span>
          </div>

          <div class="hub-card-content">
            <h2 class="hub-card-title">Novas Ferramentas</h2>
          </div>

          <div class="hub-card-action">
            <div class="hub-card-hint">
              <span>Em breve novas adições</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  `;
}
