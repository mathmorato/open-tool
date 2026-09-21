/**
 * Open Tool — Ferramenta: Todas as Ferramentas (Hub)
 * Catálogo visual estilo PDF24 Tools
 * @version v.2.0.2
 */

import { getHubHTML } from './ui.js';
import { TOOL_CATALOG, activateTool } from '../../tool-registry.js';

let _listeners = [];

const tool = {
  id: 'hub',
  label: 'Todas as Ferramentas',

  render(container) {
    container.innerHTML = getHubHTML(TOOL_CATALOG);
  },

  async mount(container) {
    _listeners = [];

    // Delegação de cliques em botões e cards de ferramentas
    const grid = container.querySelector('#hub-tools-grid');
    if (grid) {
      const handleCardClick = (e) => {
        const btn = e.target.closest('[data-open-tool]');
        if (btn) {
          e.preventDefault();
          const targetId = btn.dataset.openTool;
          if (targetId) activateTool(targetId);
          return;
        }

        const card = e.target.closest('[data-tool-card]');
        if (card && !e.target.closest('button, a')) {
          const targetId = card.dataset.toolCard;
          if (targetId) activateTool(targetId);
        }
      };

      const handleKey = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          const card = e.target.closest('[data-tool-card]');
          if (card) {
            e.preventDefault();
            const targetId = card.dataset.toolCard;
            if (targetId) activateTool(targetId);
          }
        }
      };

      grid.addEventListener('click', handleCardClick);
      grid.addEventListener('keydown', handleKey);

      _listeners.push(
        () => grid.removeEventListener('click', handleCardClick),
        () => grid.removeEventListener('keydown', handleKey)
      );
    }
  },

  unmount() {
    _listeners.forEach(fn => { try { fn(); } catch (e) { /* ignore */ } });
    _listeners = [];
  }
};

export default tool;
