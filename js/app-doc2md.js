/**
 * Open Tool — Bridge: Doc2MD ↔ App.js
 * Adapta o app.js existente (que chama boot() no DOMContentLoaded) para
 * o contrato initDoc2md() exigido pelo tool wrapper modular.
 *
 * Estratégia: o app.js original chama boot() automaticamente.
 * Quando a ferramenta é montada dinamicamente (após o DOMContentLoaded),
 * chamamos boot() manualmente para reinicializar os event listeners.
 * @version v.2.0.0
 */

// Importa o módulo principal do conversor para garantir que seja carregado
import { boot } from './app.js';

/**
 * Inicializa a ferramenta doc2md após o HTML ter sido injetado no viewport.
 * Chamado pelo tool wrapper (tools/doc2md/tool.js).
 * @param {HTMLElement} container - O viewport onde o HTML foi injetado
 * @returns {Function} cleanup - Função de limpeza para unmount
 */
export async function initDoc2md(container) {
  // Garante que o DOM processou o HTML recém-injetado
  await new Promise(r => (typeof requestAnimationFrame !== 'undefined' ? requestAnimationFrame(r) : setTimeout(r, 16)));

  // Chama boot() que inicializa initDropzone() e initQueueEvents()
  // Os elementos agora existem no DOM (renderizados pelo tool.render())
  try {
    boot();
  } catch (e) {
    console.warn('[app-doc2md] Falha parcial na inicialização:', e.message);
  }

  // Retorna função de cleanup (app.js usa delegação global no document)
  return function cleanup() {
    // A delegação de eventos no document é reutilizável entre montagens
    // via o flag document.__openMarkGlobalClickAttached
  };
}
