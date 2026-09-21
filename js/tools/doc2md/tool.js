/**
 * Open Tool — Ferramenta: Doc → MD
 * Wrapper modular que encapsula o app.js existente no contrato de ferramenta plugável.
 * @version v.2.0.0
 */

import { getDoc2mdHTML } from './ui.js';

// Referência ao módulo principal do conversor (importado sob demanda)
let _appModule = null;
// Guarda listeners para cleanup no unmount
let _cleanupFns = [];

const tool = {
  id: 'doc2md',
  label: 'Doc → MD',

  /**
   * Injeta o HTML da ferramenta no viewport.
   * @param {HTMLElement} container
   */
  render(container) {
    container.innerHTML = getDoc2mdHTML();
  },

  /**
   * Inicializa toda a lógica do conversor.
   * A lógica vive no app.js original — este método garante que ela seja inicializada
   * após o HTML estar no DOM.
   * @param {HTMLElement} container
   */
  async mount(container) {
    _cleanupFns = [];

    // Carrega o módulo principal do conversor (que já tem toda a lógica)
    if (!_appModule) {
      _appModule = await import('../../app-doc2md.js');
    }

    // Inicializa o controlador do conversor
    if (typeof _appModule.initDoc2md === 'function') {
      const cleanup = await _appModule.initDoc2md(container);
      if (typeof cleanup === 'function') {
        _cleanupFns.push(cleanup);
      }
    }
  },

  /**
   * Limpa event listeners e estado quando a ferramenta é desativada.
   */
  unmount() {
    _cleanupFns.forEach(fn => { try { fn(); } catch (e) { /* ignore */ } });
    _cleanupFns = [];
  }
};

export default tool;
