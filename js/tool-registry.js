/**
 * Open Tool — Tool Registry
 * Sistema central de registro e roteamento de ferramentas plugáveis
 * @version v.2.0.1
 */

import { APP_CONFIG } from './config.js';
import doc2mdTool from './tools/doc2md/tool.js';
import qrcodeTool from './tools/qrcode/tool.js';
import hubTool from './tools/hub/tool.js';

const STORAGE_KEY_ACTIVE_TOOL = 'opentool_active_tool';

// Mapa de ferramentas nativas embarcadas (execução síncrona sem falhas de CORS/file://)
export const BUILTIN_TOOLS = {
  hub: hubTool,
  doc2md: doc2mdTool,
  qrcode: qrcodeTool
};

// Base path para imports dinâmicos caso necessário
const _registryBase = './js/';

// Mapa de módulos pré-carregados (suporte a bundle/file:// sem quebrar contrato modular)
const _preloadedModules = new Map();

/**
 * Registra um módulo de ferramenta pré-carregado no catálogo.
 * @param {string} id
 * @param {object} toolModule
 */
export function registerToolModule(id, toolModule) {
  _preloadedModules.set(id, toolModule);
}

/**
 * Catálogo de ferramentas disponíveis na plataforma (estilo PDF24 Tools).
 */
export const TOOL_CATALOG = [
  {
    id: 'hub',
    label: 'Todas as Ferramentas',
    description: 'Catálogo geral estilo PDF24 Tools com todas as ferramentas disponíveis',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
    </svg>`
  },
  {
    id: 'doc2md',
    label: 'Doc → MD',
    description: 'Converta documentos, planilhas, PDFs e código para Markdown estruturado',
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

// Estado interno
let _activeModule = null;
let _activeToolId = null;
let _viewport = null;

/**
 * Inicializa o registry. Deve ser chamado uma vez no bootstrap.
 * @param {HTMLElement} viewport
 */
export async function initRegistry(viewport) {
  _viewport = viewport;
  const savedTool = localStorage.getItem(STORAGE_KEY_ACTIVE_TOOL);
  const initialTool = TOOL_CATALOG.find(t => t.id === savedTool) || TOOL_CATALOG.find(t => t.id === 'doc2md') || TOOL_CATALOG[0];
  await activateTool(initialTool.id);
}

/**
 * Ativa uma ferramenta pelo seu id.
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

  if (!_viewport && typeof document !== 'undefined') {
    _viewport = document.getElementById('toolViewport');
  }

  // Transição de saída
  if (_viewport) {
    _viewport.classList.add('tool-viewport--transitioning');
    _viewport.style.minHeight = _viewport.offsetHeight + 'px';
  }

  try {
    let mod = null;
    if (BUILTIN_TOOLS[toolId]) {
      mod = { default: BUILTIN_TOOLS[toolId] };
    } else if (_preloadedModules.has(toolId)) {
      mod = { default: _preloadedModules.get(toolId) };
    } else if (typeof window !== 'undefined' && window.__OPEN_TOOL_MODULES__ && window.__OPEN_TOOL_MODULES__[toolId]) {
      mod = { default: window.__OPEN_TOOL_MODULES__[toolId] };
    } else if (toolMeta.modulePath) {
      mod = await import(toolMeta.modulePath);
    }
    _activeModule = mod.default;
    _activeToolId = toolId;

    // Renderiza o HTML da ferramenta no viewport
    if (typeof _activeModule.render === 'function') {
      _activeModule.render(_viewport);
    }

    // Remove o min-height fixo após renderização
    _viewport.style.minHeight = '';

    // Pequeno delay para o browser processar o novo HTML antes de montar
    await new Promise(r => setTimeout(r, 20));

    // Monta a lógica e os event listeners
    if (typeof _activeModule.mount === 'function') {
      await _activeModule.mount(_viewport);
    }

    localStorage.setItem(STORAGE_KEY_ACTIVE_TOOL, toolId);
    _updateNavbar(toolId);

    const raf = typeof requestAnimationFrame !== 'undefined' ? requestAnimationFrame : (cb) => setTimeout(cb, 16);
    raf(() => {
      _viewport.classList.remove('tool-viewport--transitioning');
    });

  } catch (err) {
    console.error(`[ToolRegistry] Falha ao carregar ferramenta "${toolId}":`, err);
    _viewport.classList.remove('tool-viewport--transitioning');
    _viewport.style.minHeight = '';
    _viewport.innerHTML = `<div class="tool-error-state">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--error-color);opacity:.6">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <p>Falha ao carregar <strong>${toolMeta.label}</strong></p>
      <p class="tool-error-detail">${err.message}</p>
    </div>`;
  }
}

/**
 * Renderiza a toolbar de navegação entre ferramentas.
 * @param {HTMLElement} container
 */
export function renderToolbar(container) {
  container.innerHTML = `
    <nav class="tool-navbar" role="tablist" aria-label="Ferramentas disponíveis">
      <div class="tool-navbar-inner">
        ${TOOL_CATALOG.map(tool => `
          <button
            class="tool-nav-btn"
            data-tool-id="${tool.id}"
            role="tab"
            aria-selected="false"
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

  container.querySelectorAll('.tool-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => activateTool(btn.dataset.toolId));
  });
}

function _updateNavbar(activeToolId) {
  if (typeof document === 'undefined' || typeof document.querySelectorAll !== 'function') return;
  document.querySelectorAll('.tool-nav-btn').forEach(btn => {
    const isActive = btn.dataset.toolId === activeToolId;
    btn.classList.toggle('tool-nav-btn--active', isActive);
    btn.setAttribute('aria-selected', String(isActive));
  });
}
