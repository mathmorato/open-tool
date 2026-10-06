/**
 * Open Tool — Bootstrap Principal
 * Inicializa o tema, a toolbar de navegação e a ferramenta ativa.
 * @version v.2.0.0
 */

// Sinaliza ao app.js que ele está sendo usado como sub-módulo (suprime o auto-boot)
window.__openToolRegistryActive = true;

import { APP_CONFIG } from './config.js';
import { initRegistry, renderToolbar } from './tool-registry.js';

// ── Tema ──────────────────────────────────────────────────────────────────

function initTheme() {
  const toggleBtn  = document.getElementById('theme-toggle');
  const iconSun    = document.getElementById('theme-icon-sun');
  const iconMoon   = document.getElementById('theme-icon-moon');

  const media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function readPreference() {
    try { return localStorage.getItem(APP_CONFIG.STORAGE_KEYS.THEME) || 'system'; } catch { return 'system'; }
  }

  // O atributo data-theme sempre recebe o tema efetivo (light/dark), pois o CSS
  // só define tokens para [data-theme="dark"]; a preferência "system" fica no storage.
  function applyTheme(preference) {
    const isDark = preference === 'dark' || (preference !== 'light' && !!media && media.matches);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
    if (iconSun)  iconSun.style.display  = isDark ? 'none' : '';
    if (iconMoon) iconMoon.style.display = isDark ? '' : 'none';
  }

  applyTheme(readPreference());

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(APP_CONFIG.STORAGE_KEYS.THEME, next); } catch { /* storage indisponível */ }
    });
  }

  // Acompanha mudanças do sistema enquanto a preferência for "system"
  if (media) {
    media.addEventListener('change', () => {
      if (readPreference() === 'system') applyTheme('system');
    });
  }
}

// ── Versão ────────────────────────────────────────────────────────────────

function initVersion() {
  const headerVersion = document.getElementById('header-version');
  const footerVersion = document.getElementById('footer-version');
  if (headerVersion) headerVersion.textContent = APP_CONFIG.VERSION;
  if (footerVersion) footerVersion.textContent = APP_CONFIG.VERSION;
}

// ── Bootstrap ─────────────────────────────────────────────────────────────

// ── Drag & Drop global ────────────────────────────────────────────────────

// Arquivo solto fora de uma dropzone não deve fazer o navegador abrir/navegar
// para ele (o que descartaria o estado de qualquer ferramenta).
function initDropGuard() {
  window.addEventListener('dragover', e => e.preventDefault());
  window.addEventListener('drop', e => e.preventDefault());
}

// ── Altura do topbar ──────────────────────────────────────────────────────

// O navbar de ferramentas é sticky logo abaixo do topbar, cuja altura varia
// (modo compacto em telas baixas, quebra de linha em telas estreitas).
function initTopbarOffset() {
  const topbar = document.querySelector('.topbar');
  if (!topbar) return;
  const sync = () => document.documentElement.style.setProperty('--topbar-height', `${topbar.offsetHeight}px`);
  sync();
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(sync).observe(topbar);
}

async function boot() {
  initVersion();
  initTheme();
  initDropGuard();
  initTopbarOffset();

  // Renderiza a toolbar de navegação de ferramentas
  const navbarContainer = document.getElementById('tool-navbar-container');
  if (navbarContainer) {
    renderToolbar(navbarContainer);
  }

  // Inicializa o registry e ativa a ferramenta padrão
  const viewport = document.getElementById('tool-viewport');
  if (viewport) {
    await initRegistry(viewport);
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
}
