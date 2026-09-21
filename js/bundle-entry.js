/**
 * Open Tool — Bundle Entry Point
 * Agrupa os módulos desacoplados em um bundle autocontido para suporte universal
 * (funciona tanto em servidores HTTP/HTTPS quanto em abertura direta via file:// no Windows).
 * @version v.2.0.2
 */

// Sinaliza ao app.js que o registry está ativo
if (typeof window !== 'undefined') {
  window.__openToolRegistryActive = true;
}

// Executa o bootstrap do app
import './main.js';
