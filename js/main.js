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

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const isDark = theme === 'dark' ||
      (theme === 'system' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (iconSun)  iconSun.style.display  = isDark  ? 'none' : '';
    if (iconMoon) iconMoon.style.display = isDark  ? '' : 'none';
  }

  const stored = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.THEME) || 'system';
  applyTheme(stored);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'system';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem(APP_CONFIG.STORAGE_KEYS.THEME, next);
    });
  }

  // Observa mudanças no sistema
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      const stored = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.THEME) || 'system';
      if (stored === 'system') applyTheme('system');
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

async function boot() {
  initVersion();
  initTheme();

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
