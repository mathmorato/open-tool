/**
 * Open Tool — Tool Registry
 * Sistema central de registro e roteamento de ferramentas plugáveis
 * @version v.2.0.0
 */

import { APP_CONFIG } from './config.js';

const STORAGE_KEY_ACTIVE_TOOL = 'opentool_active_tool';

/**
 * Catálogo de ferramentas disponíveis na plataforma.
 * Cada entrada declara: id, label, description, icon SVG e
 * o caminho para o módulo da ferramenta (carregado via import() lazy).
 */
export const TOOL_CATALOG = [
  {
    id: 'doc2md',
    label: 'Doc → MD',
    description: 'Converta documentos, planilhas, PDFs e código para Markdown estruturado',
    modulePath: './tools/doc2md/tool.js',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>`
  },
  {
    id: 'qrcode',
    label: 'QR Code',
    description: 'Gere QR Codes a partir de links e texto — 100% local, sem servidores',
    modulePath: './tools/qrcode/tool.js',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <rect x="5" y="5" width="3" height="3" fill="currentColor" stroke="none"/>
      <rect x="16" y="5" width="3" height="3" fill="currentColor" stroke="none"/>
      <rect x="5" y="16" width="3" height="3" fill="currentColor" stroke="none"/>
      <path d="M14 14h3v3h-3z" fill="currentColor" stroke="none"/>
      <path d="M17 17h4"/>
      <path d="M17 21v-4"/>
      <path d="M21 17v4"/>
    </svg>`
  }
];

// Módulo da ferramenta atualmente ativa
let _activeModule = null;
let _activeToolId = null;
let _viewport = null;

/**
 * Inicializa o registry. Deve ser chamado uma vez no bootstrap.
 * @param {HTMLElement} viewport - Container onde o HTML de cada ferramenta será injetado
 */
export async function initRegistry(viewport) {
  _viewport = viewport;

  // Determina qual ferramenta ativar (última salva ou a primeira do catálogo)
  const savedTool = localStorage.getItem(STORAGE_KEY_ACTIVE_TOOL);
  const initialTool = TOOL_CATALOG.find(t => t.id === savedTool) || TOOL_CATALOG[0];

  await activateTool(initialTool.id);
}

/**
 * Ativa uma ferramenta pelo seu id.
 * Faz unmount da ferramenta anterior, carrega o módulo novo e executa render+mount.
 * @param {string} toolId
 */
export async function activateTool(toolId) {
  if (toolId === _activeToolId) return;

  const toolMeta = TOOL_CATALOG.find(t => t.id === toolId);
  if (!toolMeta) {
    console.error(`[ToolRegistry] Ferramenta desconhecida: ${toolId}`);
    return;
  }

  // Unmount da ferramenta anterior
  if (_activeModule && typeof _activeModule.unmount === 'function') {
    try { _activeModule.unmount(); } catch (e) { /* ignore */ }
  }

  // Transição de saída
  _viewport.classList.add('tool-viewport--transitioning');

  // Carregamento lazy do módulo
  try {
    const mod = await import(toolMeta.modulePath);
    _activeModule = mod.default;
    _activeToolId = toolId;

    // Aguarda o frame para aplicar fade suave
    await new Promise(r => requestAnimationFrame(r));

    // Renderiza o HTML da ferramenta no viewport
    if (typeof _activeModule.render === 'function') {
      _activeModule.render(_viewport);
    }

    // Monta a lógica e os event listeners
    if (typeof _activeModule.mount === 'function') {
      await _activeModule.mount(_viewport);
    }

    // Persiste a ferramenta ativa
    localStorage.setItem(STORAGE_KEY_ACTIVE_TOOL, toolId);

    // Atualiza estado visual da navbar
    _updateNavbar(toolId);

    // Remove a classe de transição
    requestAnimationFrame(() => {
      _viewport.classList.remove('tool-viewport--transitioning');
    });

  } catch (err) {
    console.error(`[ToolRegistry] Falha ao carregar ferramenta "${toolId}":`, err);
    _viewport.classList.remove('tool-viewport--transitioning');
    _viewport.innerHTML = `<div class="tool-error-state">
      <p>Falha ao carregar a ferramenta <strong>${toolMeta.label}</strong>.</p>
      <p class="tool-error-detail">${err.message}</p>
    </div>`;
  }
}

/**
 * Renderiza a toolbar de navegação entre ferramentas no elemento alvo.
 * @param {HTMLElement} container
 */
export function renderToolbar(container) {
  container.innerHTML = `
    <nav class="tool-navbar" role="tablist" aria-label="Ferramentas disponíveis">
      <div class="tool-navbar-inner">
        ${TOOL_CATALOG.map(tool => `
          <button
            class="tool-nav-btn${tool === TOOL_CATALOG[0] ? ' tool-nav-btn--active' : ''}"
            data-tool-id="${tool.id}"
            role="tab"
            aria-selected="${tool === TOOL_CATALOG[0]}"
            title="${tool.description}"
            id="tool-tab-${tool.id}"
          >
            <span class="tool-nav-icon" aria-hidden="true">${tool.icon}</span>
            <span class="tool-nav-label">${tool.label}</span>
          </button>
        `).join('')}
      </div>
    </nav>
  `;

  // Registra eventos de clique
  container.querySelectorAll('.tool-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activateTool(btn.dataset.toolId);
    });
  });
}

/**
 * Atualiza o estado visual (active) dos botões da toolbar.
 * @param {string} activeToolId
 */
function _updateNavbar(activeToolId) {
  document.querySelectorAll('.tool-nav-btn').forEach(btn => {
    const isActive = btn.dataset.toolId === activeToolId;
    btn.classList.toggle('tool-nav-btn--active', isActive);
    btn.setAttribute('aria-selected', isActive);
  });
}
