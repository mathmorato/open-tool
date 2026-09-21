/**
 * Open Tool — Hub: Todas as Ferramentas (Template HTML)
 * Interface visual inspirada no PDF24 Tools com catálogo em cards modernos
 * @version v.2.0.2
 */

export function getHubHTML(catalog = []) {
  const tools = catalog.filter(t => t.id !== 'hub');

  return `
    <div class="hub-root">
      <!-- Cabeçalho Principal do Hub -->
      <section class="hub-hero">
        <div class="hub-hero-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
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
          const badge = tool.id === 'doc2md' ? 'CONVERSOR' : (tool.id === 'qrcode' ? 'GERADOR' : (tool.id === 'img2vector' ? 'VETORIZADOR' : 'FERRAMENTA'));
          const features = tool.id === 'doc2md'
            ? ['Word (.docx), Excel (.xlsx), PDF, PPTX', 'Extração automática de pacotes .ZIP e .RAR', 'Geração de Markdown limpo e formatado']
            : (tool.id === 'qrcode'
              ? ['Geração imediata para Links e Textos', 'Exportação em PNG de alta resolução e SVG', 'Customização de cores, tamanho e margem']
              : (tool.id === 'img2vector'
                ? ['Raster para SVG vetorial (PNG, JPG, WEBP, BMP)', 'Curvas Bézier matemáticas e ajuste fino de cores', 'Exportação e cópia direta de código SVG']
                : ['Processamento 100% no navegador', 'Zero telemetria de dados']));

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
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span>${f}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>

              <div class="hub-card-action">
                <button type="button" class="btn btn-primary hub-card-btn" data-open-tool="${tool.id}">
                  <span>Abrir Ferramenta</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
              </div>
            </article>
          `;
        }).join('')}

        <!-- Card de Extensibilidade (Próximas Ferramentas) -->
        <article class="hub-card hub-card--extensible" title="Arquitetura modular aberta para novas ferramentas">
          <div class="hub-card-top">
            <div class="hub-card-icon-wrap hub-card-icon-wrap--dashed" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
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
