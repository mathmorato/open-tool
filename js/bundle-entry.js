/**
 * Open Tool — Bundle Entry Point
 * Agrupa os módulos desacoplados em um bundle autocontido para suporte universal
 * (funciona tanto em servidores HTTP/HTTPS quanto em abertura direta via file:// no Windows).
 * @version v.2.0.0
 */

// Sinaliza ao app.js que o registry está ativo
if (typeof window !== 'undefined') {
  window.__openToolRegistryActive = true;
}

import { registerToolModule } from './tool-registry.js';
import doc2mdTool from './tools/doc2md/tool.js';
import qrcodeTool from './tools/qrcode/tool.js';

// Registra os módulos das ferramentas
registerToolModule('doc2md', doc2mdTool);
registerToolModule('qrcode', qrcodeTool);

// Executa o bootstrap do app
import './main.js';
