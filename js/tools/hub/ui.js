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

      <!-- Grade de Ferramentas (PDF24 Tools Style) -->
      <div class="hub-grid" id="hub-tools-grid">
        ${tools.map(tool => {
          let badge = 'FERRAMENTA';
          let features = ['Processamento 100% no navegador', 'Zero telemetria de dados'];

          if (tool.id === 'doc2md') {
            badge = 'CONVERSOR';
            features = ['Word (.docx), Excel (.xlsx), PDF, PPTX', 'Extração automática de pacotes .ZIP e .RAR', 'Geração de Markdown limpo e formatado'];
          } else if (tool.id === 'qrcode') {
            badge = 'GERADOR';
            features = ['Geração imediata para Links e Textos', 'Exportação em PNG de alta resolução e SVG', 'Customização de cores, tamanho e margem'];
          } else if (tool.id === 'img2vector') {
            badge = 'VETORIZADOR';
            features = ['Raster para SVG vetorial (PNG, JPG, WEBP, BMP)', 'Curvas Bézier matemáticas e ajuste fino de cores', 'Exportação e cópia direta de código SVG'];
          } else if (tool.id === 'pdf-unlock') {
            badge = 'DESBLOQUEADOR';
            features = ['Remoção de senhas de leitura e restrições', 'Desbloqueio de permissões de cópia e impressão', 'Descriptografia 100% local no navegador'];
          } else if (tool.id === 'pdf-compress') {
            badge = 'COMPRESSOR';
            features = ['Reamostragem inteligente de imagens', 'Presets de 72, 100 e 150 DPI', 'Métricas de redução e economia de bytes'];
          } else if (tool.id === 'pdf-merge') {
            badge = 'MESCLADOR';
            features = ['Junção de múltiplos PDFs em arquivo único', 'Reordenação sequencial de documentos', 'Geração instantânea e download único'];
          } else if (tool.id === 'pdf-split') {
            badge = 'DIVISOR';
            features = ['Separação por intervalos, páginas ou blocos', 'Desmembramento em 1 PDF por página em .ZIP', 'Extração cirúrgica de páginas selecionadas'];
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
                <p class="hub-card-desc">${tool.description}</p>

                <ul class="hub-card-features">
                  ${features.map(f => `
                    <li>
                      ${ICONS.check(14)}
                      <span>${f}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>

              <div class="hub-card-action">
                <button type="button" class="btn btn-primary hub-card-btn" data-open-tool="${tool.id}">
                  <span>Abrir Ferramenta</span>
                  ${ICONS.arrowRight(16)}
                </button>
              </div>
            </article>
          `;
        }).join('')}

        <!-- Card de Extensibilidade (Próximas Ferramentas) -->
        <article class="hub-card hub-card--extensible" title="Arquitetura modular aberta para novas ferramentas">
          <div class="hub-card-top">
            <div class="hub-card-icon-wrap hub-card-icon-wrap--dashed" aria-hidden="true">
              ${ICONS.plus(20)}
            </div>
            <span class="hub-card-badge hub-card-badge--neutral">MODULAR</span>
          </div>

          <div class="hub-card-content">
            <h2 class="hub-card-title">Novas Ferramentas</h2>
            <p class="hub-card-desc">
              Estrutura modular plugável pronta para receber novos utilitários de produtividade, formatação e conversão local.
            </p>
            <div class="hub-card-hint">
              <span>Plug &amp; Play • 100% Client-Side</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  `;
}
