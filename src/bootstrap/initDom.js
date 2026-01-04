import { initDom } from '../ui/dom.js';
import { canvases } from '../render/canvas/canvases.js';

export function initBootstrapDom() {
    initDom();
    canvases.init();
}

